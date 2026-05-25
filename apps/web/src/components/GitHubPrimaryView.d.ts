import type { GitHubCommitSparkPoint, GitHubRecentCommit } from "../app/types";
type GitHubPrimaryViewProps = {
    githubRepoLabel: string;
    githubStatusPill: string;
    isRefreshingGitHubSummary: boolean;
    onRefresh: () => void;
    githubStarCountLabel: string;
    githubOpenIssuesLabel: string;
    githubOpenPrsLabel: string;
    githubRecentCommits: GitHubRecentCommit[];
    githubCommitCount30d: number;
    githubOverviewHoverLabel: string;
    githubOverviewGraphPolylinePoints: string;
    githubOverviewGraphSeries: GitHubCommitSparkPoint[];
    hoveredGitHubOverviewPointIndex: number | null;
    onHoveredGitHubOverviewPointIndexChange: (index: number | null) => void;
};
export declare const GitHubPrimaryView: ({ githubRepoLabel, githubStatusPill, isRefreshingGitHubSummary, onRefresh, githubStarCountLabel, githubOpenIssuesLabel, githubOpenPrsLabel, githubRecentCommits, githubCommitCount30d, githubOverviewHoverLabel, githubOverviewGraphPolylinePoints, githubOverviewGraphSeries, hoveredGitHubOverviewPointIndex, onHoveredGitHubOverviewPointIndexChange, }: GitHubPrimaryViewProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=GitHubPrimaryView.d.ts.map