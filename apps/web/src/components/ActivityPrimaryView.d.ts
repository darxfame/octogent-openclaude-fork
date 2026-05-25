import type { ComponentProps } from "react";
import { GitHubPrimaryView } from "./GitHubPrimaryView";
import { UsageBarChart } from "./UsageHeatmap";
type ActivityPrimaryViewProps = {
    usageChartProps: ComponentProps<typeof UsageBarChart>;
    githubPrimaryViewProps: ComponentProps<typeof GitHubPrimaryView>;
};
export declare const ActivityPrimaryView: ({ usageChartProps, githubPrimaryViewProps, }: ActivityPrimaryViewProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ActivityPrimaryView.d.ts.map