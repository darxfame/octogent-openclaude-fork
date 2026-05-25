import type { GitHubRepoSummarySnapshot } from "@octogent/core";
type CommandResult = {
    stdout: string;
    stderr: string;
};
type RunCommand = (command: string, args: string[], options: {
    cwd: string;
    env?: NodeJS.ProcessEnv;
}) => Promise<CommandResult>;
export type { GitHubRepoSummarySnapshot };
type GitHubRepoSummaryDependencies = {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    now?: () => Date;
    runCommand?: RunCommand;
};
export declare const readGithubRepoSummary: (dependencies?: GitHubRepoSummaryDependencies) => Promise<GitHubRepoSummarySnapshot>;
//# sourceMappingURL=githubRepoSummary.d.ts.map