import type { UsageChartData } from "../app/hooks/useUsageHeatmapPolling";
type UsageChartSectionProps = {
    data: UsageChartData | null;
    isLoading: boolean;
    onRefresh: () => void;
};
export declare const UsageBarChart: ({ data, isLoading, onRefresh }: UsageChartSectionProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=UsageHeatmap.d.ts.map