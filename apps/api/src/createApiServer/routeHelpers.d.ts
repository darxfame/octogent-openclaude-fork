import type { IncomingMessage, ServerResponse } from "node:http";
import type { UsageChartResponse } from "../claudeSessionScanner";
import type { ClaudeUsageSnapshot } from "../claudeUsage";
import type { CodeIntelStore } from "../codeIntelStore";
import type { CodexUsageSnapshot } from "../codexUsage";
import type { GitHubRepoSummarySnapshot } from "../githubRepoSummary";
import type { MonitorService } from "../monitor";
export type TerminalRuntime = ReturnType<typeof import("../terminalRuntime").createTerminalRuntime>;
export type RouteHandlerDependencies = {
    runtime: TerminalRuntime;
    workspaceCwd: string;
    projectStateDir: string;
    promptsDir: string;
    userPromptsDir: string;
    getApiBaseUrl: () => string;
    getApiPort: () => string;
    readClaudeUsageSnapshot: () => Promise<ClaudeUsageSnapshot>;
    readClaudeOauthUsageSnapshot: () => Promise<ClaudeUsageSnapshot>;
    readClaudeCliUsageSnapshot: () => Promise<ClaudeUsageSnapshot>;
    readCodexUsageSnapshot: () => Promise<CodexUsageSnapshot>;
    readGithubRepoSummary: () => Promise<GitHubRepoSummarySnapshot>;
    scanUsageHeatmap: (scope: "all" | "project") => Promise<UsageChartResponse>;
    monitorService: MonitorService;
    invalidateClaudeUsageCache: () => void;
    codeIntelStore: CodeIntelStore;
};
export type RouteHandlerContext = {
    request: IncomingMessage;
    response: ServerResponse;
    requestUrl: URL;
    corsOrigin: string | null;
};
type JsonBodyReadResult = {
    ok: true;
    payload: unknown;
} | {
    ok: false;
};
export type ApiRouteHandler = (context: RouteHandlerContext, dependencies: RouteHandlerDependencies) => Promise<boolean>;
export declare const writeJson: (response: ServerResponse, status: number, payload: unknown, corsOrigin: string | null) => void;
export declare const writeText: (response: ServerResponse, status: number, payload: string, contentType: string, corsOrigin: string | null) => void;
export declare const writeNoContent: (response: ServerResponse, status: number, corsOrigin: string | null) => void;
export declare const writeMethodNotAllowed: (response: ServerResponse, corsOrigin: string | null) => void;
export declare const readJsonBodyOrWriteError: (request: IncomingMessage, response: ServerResponse, corsOrigin: string | null) => Promise<JsonBodyReadResult>;
export {};
//# sourceMappingURL=routeHelpers.d.ts.map