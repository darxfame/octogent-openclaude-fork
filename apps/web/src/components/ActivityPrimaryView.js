import { GitHubPrimaryView } from "./GitHubPrimaryView";
import { UsageBarChart } from "./UsageHeatmap";
export const ActivityPrimaryView = ({ usageChartProps, githubPrimaryViewProps, }) => {
    return (<section className="activity-view" aria-label="Activity primary view">
      <UsageBarChart {...usageChartProps}/>
      <GitHubPrimaryView {...githubPrimaryViewProps}/>
    </section>);
};
//# sourceMappingURL=ActivityPrimaryView.js.map