import type { Dispatch, SetStateAction } from "react";
import type { GitHubCommitSparkPoint, GitHubRecentCommit, GitHubRepoSummarySnapshot } from "../types";
type UseGitHubPrimaryViewModelOptions = {
    githubRepoSummary: GitHubRepoSummarySnapshot | null;
    hoveredGitHubOverviewPointIndex: number | null;
    setHoveredGitHubOverviewPointIndex: Dispatch<SetStateAction<number | null>>;
};
type GitHubPrimaryViewModel = {
    githubCommitCount30d: number;
    sparklinePoints: string;
    githubOverviewGraphSeries: GitHubCommitSparkPoint[];
    githubOverviewGraphPolylinePoints: string;
    githubOverviewHoverLabel: string;
    githubStatusPill: string;
    githubRepoLabel: string;
    githubStarCountLabel: string;
    githubOpenIssuesLabel: string;
    githubOpenPrsLabel: string;
    githubRecentCommits: GitHubRecentCommit[];
};
export declare const useGitHubPrimaryViewModel: ({ githubRepoSummary, hoveredGitHubOverviewPointIndex, setHoveredGitHubOverviewPointIndex, }: UseGitHubPrimaryViewModelOptions) => GitHubPrimaryViewModel;
export {};
//# sourceMappingURL=useGitHubPrimaryViewModel.d.ts.map