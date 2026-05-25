import type { TentacleGitStatusSnapshot, TentaclePullRequestSnapshot } from "../app/types";
type TentacleGitActionsDialogProps = {
    tentacleId: string;
    tentacleName: string;
    gitStatus: TentacleGitStatusSnapshot | null;
    gitPullRequest: TentaclePullRequestSnapshot | null;
    gitCommitMessage: string;
    isLoading: boolean;
    isMutating: boolean;
    errorMessage: string | null;
    onCommitMessageChange: (value: string) => void;
    onClose: () => void;
    onCommit: () => void;
    onCommitAndPush: () => void;
    onPush: () => void;
    onSync: () => void;
    onMergePullRequest: () => void;
    onCleanupWorktree: () => void;
};
export declare const TentacleGitActionsDialog: ({ tentacleId, tentacleName, gitStatus, gitPullRequest, gitCommitMessage, isLoading, isMutating, errorMessage, onCommitMessageChange, onClose, onCommit, onCommitAndPush, onPush, onSync, onMergePullRequest, onCleanupWorktree, }: TentacleGitActionsDialogProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=TentacleGitActionsDialog.d.ts.map