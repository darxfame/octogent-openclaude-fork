import type { GitClient, PersistedTerminal } from "./types";
type CreateWorktreeManagerOptions = {
    workspaceCwd: string;
    gitClient: GitClient;
    terminals: Map<string, PersistedTerminal>;
};
type RemoveTentacleWorktreeOptions = {
    bestEffort?: boolean;
};
export declare const createWorktreeManager: ({ workspaceCwd, gitClient, terminals, }: CreateWorktreeManagerOptions) => {
    getTentacleWorkspaceCwd: (worktreeIdentifier: string) => string;
    createTentacleWorktree: (tentacleId: string, baseRef?: string) => void;
    hasTentacleWorktree: (tentacleId: string) => boolean;
    removeTentacleWorktree: (tentacleId: string, options?: RemoveTentacleWorktreeOptions) => void;
};
export {};
//# sourceMappingURL=worktreeManager.d.ts.map