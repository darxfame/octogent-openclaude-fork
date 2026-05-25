import type { CreateApiServerOptions } from "./createApiServer/types";
export declare const createApiServer: ({ workspaceCwd, projectStateDir, promptsDir, webDistDir, apiBaseUrl, gitClient, readClaudeUsageSnapshot, readClaudeOauthUsageSnapshot, readClaudeCliUsageSnapshot, readCodexUsageSnapshot, readGithubRepoSummary, scanUsageHeatmap, monitorService, invalidateClaudeUsageCache, allowRemoteAccess, }?: CreateApiServerOptions) => {
    server: import("node:http").Server<typeof import("node:http").IncomingMessage, typeof import("node:http").ServerResponse>;
    start(port?: number, host?: string): Promise<{
        host: string;
        port: number;
    }>;
    stop(): Promise<void>;
};
//# sourceMappingURL=createApiServer.d.ts.map