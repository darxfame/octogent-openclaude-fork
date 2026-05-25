export type UsageSlice = {
    key: string;
    tokens: number;
};
export type UsageDayEntry = {
    date: string;
    totalTokens: number;
    projects: UsageSlice[];
    models: UsageSlice[];
    sessions: number;
};
export type UsageChartResponse = {
    days: UsageDayEntry[];
    projects: string[];
    models: string[];
};
export declare const scanClaudeUsageChart: (scope: "all" | "project", workspaceCwd: string) => Promise<UsageChartResponse>;
//# sourceMappingURL=claudeSessionScanner.d.ts.map