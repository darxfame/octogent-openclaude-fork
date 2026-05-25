import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
const { spawnMock } = vi.hoisted(() => ({
    spawnMock: vi.fn(),
}));
vi.mock("node-pty", () => ({
    spawn: spawnMock,
}));
import { createApiServer } from "../src/createApiServer";
class FakeGitClient {
    worktrees = new Map();
    branches = new Set();
    assertAvailable() { }
    isRepository() {
        return true;
    }
    addWorktree({ cwd, path, branchName, baseRef, }) {
        if (this.worktrees.has(path)) {
            throw new Error(`Worktree already exists: ${path}`);
        }
        mkdirSync(path, { recursive: true });
        this.branches.add(branchName);
        this.worktrees.set(path, { cwd, branchName, baseRef });
    }
    removeWorktree({ path }) {
        this.worktrees.delete(path);
    }
    removeBranch({ branchName }) {
        this.branches.delete(branchName);
    }
    readWorktreeStatus() {
        return {
            branchName: "octogent/tentacle-1",
            upstreamBranchName: null,
            isDirty: false,
            aheadCount: 0,
            behindCount: 0,
            insertedLineCount: 0,
            deletedLineCount: 0,
            hasConflicts: false,
            changedFiles: [],
            defaultBaseBranchName: "main",
        };
    }
    commitAll() { }
    pushCurrentBranch() { }
    syncWithBase() { }
    readCurrentBranchPullRequest() {
        return null;
    }
    createPullRequest() {
        return null;
    }
    mergeCurrentBranchPullRequest() { }
}
describe("monitor API routes", () => {
    let stopServer = null;
    const temporaryDirectories = [];
    afterEach(async () => {
        if (stopServer) {
            await stopServer();
            stopServer = null;
        }
        for (const directory of temporaryDirectories) {
            rmSync(directory, { recursive: true, force: true });
        }
        temporaryDirectories.length = 0;
    });
    const startServer = async (options = {}) => {
        const workspaceCwd = options.workspaceCwd ??
            (() => {
                const directory = mkdtempSync(join(tmpdir(), "octogent-monitor-api-test-"));
                temporaryDirectories.push(directory);
                return directory;
            })();
        const apiServer = createApiServer({
            workspaceCwd,
            gitClient: options.gitClient ?? new FakeGitClient(),
            ...options,
        });
        const address = await apiServer.start(0, "127.0.0.1");
        stopServer = () => apiServer.stop();
        return `http://${address.host}:${address.port}`;
    };
    it("returns empty query terms for a fresh workspace config", async () => {
        const baseUrl = await startServer();
        const response = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        expect(response.status).toBe(200);
        await expect(response.json()).resolves.toMatchObject({
            providerId: "x",
            queryTerms: [],
            refreshPolicy: {
                maxPosts: 30,
                searchWindowDays: 7,
            },
        });
    });
    it("saves credentials even when query terms have not been configured yet", async () => {
        const baseUrl = await startServer();
        const patchResponse = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                providerId: "x",
                validateCredentials: false,
                credentials: {
                    bearerToken: "x-example-secret-token",
                },
            }),
        });
        expect(patchResponse.status).toBe(200);
        await expect(patchResponse.json()).resolves.toMatchObject({
            providerId: "x",
            queryTerms: [],
            refreshPolicy: {
                maxPosts: 30,
                searchWindowDays: 7,
            },
            providers: {
                x: {
                    credentials: {
                        isConfigured: true,
                    },
                },
            },
        });
        const feedResponse = await fetch(`${baseUrl}/api/monitor/feed`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        expect(feedResponse.status).toBe(200);
        await expect(feedResponse.json()).resolves.toMatchObject({
            providerId: "x",
            queryTerms: [],
            lastError: "At least one monitor query term is required.",
        });
    });
    it("saves monitor credentials and returns redacted config", async () => {
        const baseUrl = await startServer();
        const patchResponse = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                providerId: "x",
                validateCredentials: false,
                queryTerms: ["AI Engineering", "Codex"],
                credentials: {
                    bearerToken: "x-example-secret-token",
                    apiKey: "x-api-key-value",
                    apiSecret: "x-api-secret-value",
                },
            }),
        });
        expect(patchResponse.status).toBe(200);
        const patchPayload = (await patchResponse.json());
        expect(patchPayload.providerId).toBe("x");
        expect(patchPayload.queryTerms).toEqual(["AI Engineering", "Codex"]);
        expect(patchPayload.refreshPolicy
            ?.maxPosts).toBe(30);
        expect(patchPayload.refreshPolicy
            ?.searchWindowDays).toBe(7);
        const providers = patchPayload.providers;
        const provider = providers.x;
        const credentials = provider.credentials;
        expect(credentials.isConfigured).toBe(true);
        expect(typeof credentials.bearerTokenHint).toBe("string");
        expect(credentials.bearerTokenHint.endsWith("oken")).toBe(true);
        expect(typeof credentials.apiKeyHint).toBe("string");
        expect(credentials.apiKeyHint.endsWith("alue")).toBe(true);
        expect(Object.hasOwn(credentials, "bearerToken")).toBe(false);
        expect(Object.hasOwn(credentials, "apiSecret")).toBe(false);
        const getResponse = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        expect(getResponse.status).toBe(200);
        await expect(getResponse.json()).resolves.toEqual(patchPayload);
    });
    it("returns 400 for invalid monitor config patch payload", async () => {
        const baseUrl = await startServer();
        const response = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                queryTerms: "AI Engineering",
            }),
        });
        expect(response.status).toBe(400);
        await expect(response.json()).resolves.toEqual({
            error: "queryTerms must be an array of strings.",
        });
    });
    it("returns 400 for invalid refreshPolicy.maxPosts in monitor config patch payload", async () => {
        const baseUrl = await startServer();
        const response = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshPolicy: {
                    maxPosts: 0,
                },
            }),
        });
        expect(response.status).toBe(400);
        await expect(response.json()).resolves.toEqual({
            error: "refreshPolicy.maxPosts must be a positive number.",
        });
    });
    it("returns 400 for invalid refreshPolicy.searchWindowDays in monitor config patch payload", async () => {
        const baseUrl = await startServer();
        const response = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshPolicy: {
                    searchWindowDays: 2,
                },
            }),
        });
        expect(response.status).toBe(400);
        await expect(response.json()).resolves.toEqual({
            error: "refreshPolicy.searchWindowDays must be one of: 1, 3, 7.",
        });
    });
    it("persists configurable maxPosts in monitor refresh policy", async () => {
        const baseUrl = await startServer();
        const patchResponse = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshPolicy: {
                    maxPosts: 12,
                    searchWindowDays: 3,
                },
            }),
        });
        expect(patchResponse.status).toBe(200);
        await expect(patchResponse.json()).resolves.toMatchObject({
            refreshPolicy: {
                maxPosts: 12,
                searchWindowDays: 3,
            },
        });
        const getResponse = await fetch(`${baseUrl}/api/monitor/config`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        expect(getResponse.status).toBe(200);
        await expect(getResponse.json()).resolves.toMatchObject({
            refreshPolicy: {
                maxPosts: 12,
                searchWindowDays: 3,
            },
        });
    });
    it("uses non-forced read for feed and forced read for manual refresh", async () => {
        const readFeedCalls = [];
        const monitorService = {
            readConfig: async () => ({
                providerId: "x",
                queryTerms: ["Codex"],
                refreshPolicy: {
                    maxCacheAgeMs: 24 * 60 * 60 * 1000,
                    maxPosts: 30,
                    searchWindowDays: 7,
                },
                providers: {
                    x: {
                        credentials: {
                            isConfigured: true,
                            bearerTokenHint: "***oken",
                            apiKeyHint: null,
                            hasApiSecret: false,
                            hasAccessToken: false,
                            hasAccessTokenSecret: false,
                            updatedAt: "2026-02-28T12:00:00.000Z",
                        },
                    },
                },
            }),
            patchConfig: async () => {
                throw new Error("not implemented");
            },
            readFeed: async (options) => {
                readFeedCalls.push(options ?? {});
                return {
                    providerId: "x",
                    queryTerms: ["Codex"],
                    refreshPolicy: {
                        maxCacheAgeMs: 24 * 60 * 60 * 1000,
                        maxPosts: 30,
                        searchWindowDays: 7,
                    },
                    lastFetchedAt: "2026-02-28T12:00:00.000Z",
                    staleAfter: "2026-03-01T12:00:00.000Z",
                    isStale: false,
                    lastError: null,
                    posts: [],
                    usage: null,
                };
            },
        };
        const baseUrl = await startServer({
            monitorService: monitorService,
        });
        const feedResponse = await fetch(`${baseUrl}/api/monitor/feed`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        expect(feedResponse.status).toBe(200);
        const manualRefreshResponse = await fetch(`${baseUrl}/api/monitor/refresh`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        });
        expect(manualRefreshResponse.status).toBe(200);
        expect(readFeedCalls).toEqual([
            {
                forceRefresh: false,
                refreshIfStale: true,
            },
            {
                forceRefresh: true,
                refreshIfStale: true,
            },
        ]);
    });
});
//# sourceMappingURL=monitorApi.test.js.map