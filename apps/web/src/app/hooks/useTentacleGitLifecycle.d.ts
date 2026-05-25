import type { Dispatch, SetStateAction } from "react";
import type { TentacleGitStatusSnapshot, TentaclePullRequestSnapshot, TerminalView } from "../types";
type UseTentacleGitLifecycleOptions = {
    columns: TerminalView;
};
type UseTentacleGitLifecycleResult = {
    gitStatusByTentacleId: Record<string, TentacleGitStatusSnapshot>;
    gitStatusLoadingByTentacleId: Record<string, boolean>;
    pullRequestByTentacleId: Record<string, TentaclePullRequestSnapshot>;
    pullRequestLoadingByTentacleId: Record<string, boolean>;
    openGitTentacleId: string | null;
    openGitTentacleStatus: TentacleGitStatusSnapshot | null;
    openGitTentaclePullRequest: TentaclePullRequestSnapshot | null;
    gitCommitMessageDraft: string;
    gitDialogError: string | null;
    isGitDialogLoading: boolean;
    isGitDialogMutating: boolean;
    setGitCommitMessageDraft: Dispatch<SetStateAction<string>>;
    openTentacleGitActions: (tentacleId: string) => void;
    closeTentacleGitActions: () => void;
    commitTentacleChanges: () => Promise<void>;
    commitAndPushTentacleBranch: () => Promise<void>;
    pushTentacleBranch: () => Promise<void>;
    syncTentacleBranch: () => Promise<void>;
    mergeTentaclePullRequest: () => Promise<void>;
};
export declare const useTentacleGitLifecycle: ({ columns, }: UseTentacleGitLifecycleOptions) => UseTentacleGitLifecycleResult;
export {};
//# sourceMappingURL=useTentacleGitLifecycle.d.ts.map