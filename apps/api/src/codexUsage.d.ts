import { type CodexUsageSnapshot } from "@octogent/core";
export type { CodexUsageSnapshot };
type CodexUsageDependencies = {
    env?: NodeJS.ProcessEnv;
    now?: () => Date;
    readFileText?: (path: string) => Promise<string>;
    writeFileText?: (path: string, contents: string) => Promise<void>;
    fetchImpl?: typeof fetch;
};
export declare const readCodexUsageSnapshot: (dependencies?: CodexUsageDependencies) => Promise<CodexUsageSnapshot>;
//# sourceMappingURL=codexUsage.d.ts.map