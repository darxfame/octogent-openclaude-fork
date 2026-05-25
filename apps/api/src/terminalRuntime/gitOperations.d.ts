import type { GitClient, PersistedTerminal, TentacleGitStatusSnapshot, TentaclePullRequestSnapshot } from "./types";
import type { createWorktreeManager } from "./worktreeManager";
type WorktreeManager = ReturnType<typeof createWorktreeManager>;
export declare const createGitOperations: (deps: {
    terminals: Map<string, PersistedTerminal>;
    worktreeManager: WorktreeManager;
    gitClient: GitClient;
}) => {
    readTentacleGitStatus(tentacleId: string): TentacleGitStatusSnapshot | null;
    commitTentacleWorktree(tentacleId: string, message: string): TentacleGitStatusSnapshot | null;
    pushTentacleWorktree(tentacleId: string): TentacleGitStatusSnapshot | null;
    syncTentacleWorktree(tentacleId: string, baseRef?: string): TentacleGitStatusSnapshot | null;
    readTentaclePullRequest(tentacleId: string): TentaclePullRequestSnapshot | null;
    createTentaclePullRequest(tentacleId: string, input: {
        title: string;
        body?: string;
        baseRef?: string;
    }): TentaclePullRequestSnapshot | null;
    mergeTentaclePullRequest(tentacleId: string): TentaclePullRequestSnapshot | null;
};
export {};
//# sourceMappingURL=gitOperations.d.ts.map