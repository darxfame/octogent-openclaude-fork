import { type ClaudeUsageSnapshot } from "@octogent/core";
export type { ClaudeUsageSnapshot };
type ClaudeUsageDependencies = {
    now?: () => Date;
    readCredentialsJson?: () => Promise<unknown>;
    fetchImpl?: typeof fetch;
    spawnCliUsage?: () => Promise<string | null>;
    projectStateDir?: string;
    backgroundRefreshOnly?: boolean;
};
export declare const stripAnsiCodes: (text: string) => string;
type ParsedCliUsage = {
    primaryUsedPercent: number | null;
    secondaryUsedPercent: number | null;
    sonnetUsedPercent: number | null;
};
export declare const parseCliUsageOutput: (rawOutput: string) => ParsedCliUsage;
/** Exported for testing — resets the snapshot cache. */
export declare const resetCliSession: () => void;
/** Clears the cached usage snapshot so the next read triggers a fresh fetch. */
export declare const invalidateUsageCache: () => void;
export declare const readClaudeOauthUsageSnapshot: (dependencies?: ClaudeUsageDependencies) => Promise<ClaudeUsageSnapshot>;
export declare const readClaudeCliUsageSnapshot: (dependencies?: ClaudeUsageDependencies) => Promise<ClaudeUsageSnapshot>;
export declare const readClaudeUsageSnapshot: (dependencies?: ClaudeUsageDependencies) => Promise<ClaudeUsageSnapshot>;
//# sourceMappingURL=claudeUsage.d.ts.map