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
export type UsageChartData = {
    days: UsageDayEntry[];
    projects: string[];
    models: string[];
};
export declare const useUsageHeatmapPolling: (options: {
    enabled: boolean;
}) => {
    heatmapData: any;
    isLoadingHeatmap: any;
    refreshHeatmap: any;
};
//# sourceMappingURL=useUsageHeatmapPolling.d.ts.map