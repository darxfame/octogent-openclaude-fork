import type { UsageChartData } from "../app/hooks/useUsageHeatmapPolling";
import type { ClaudeUsageSnapshot } from "../app/types";
type RuntimeStatusStripProps = {
    sparklinePoints: string;
    usageData: UsageChartData | null;
    claudeUsage: ClaudeUsageSnapshot | null;
    isRefreshingClaudeUsage?: boolean;
    onRefreshClaudeUsage?: () => void;
};
export declare const RuntimeStatusStrip: ({ sparklinePoints, usageData, claudeUsage, isRefreshingClaudeUsage, onRefreshClaudeUsage, }: RuntimeStatusStripProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=RuntimeStatusStrip.d.ts.map