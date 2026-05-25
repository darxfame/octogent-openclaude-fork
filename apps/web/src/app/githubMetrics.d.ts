import type { GitHubCommitPoint, GitHubCommitSparkPoint, GitHubRepoSummarySnapshot } from "./types";
export declare const formatGitHubCommitHoverLabel: (point: GitHubCommitPoint) => string;
export declare const buildGitHubStatusPill: (summary: GitHubRepoSummarySnapshot | null) => "GitHub loading" | "GitHub live" | "GitHub unavailable" | "GitHub error";
export declare const buildGitHubCommitSeries: (summary: GitHubRepoSummarySnapshot | null) => any[];
export declare const buildGitHubCommitSparkPoints: (series: GitHubCommitPoint[], width: number, height: number) => GitHubCommitSparkPoint[];
export declare const buildGitHubSparkPolylinePoints: (series: GitHubCommitSparkPoint[]) => string;
export declare const buildGitHubCommitCount: (series: GitHubCommitPoint[]) => GitHubCommitPoint;
//# sourceMappingURL=githubMetrics.d.ts.map