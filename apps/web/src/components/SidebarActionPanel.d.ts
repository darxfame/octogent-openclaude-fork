import type { PendingDeleteTerminal } from "../app/hooks/useTerminalMutations";
import type { TentacleGitStatusSnapshot, TentaclePullRequestSnapshot, TerminalView } from "../app/types";
type SidebarActionPanelProps = {
    pendingDeleteTerminal: PendingDeleteTerminal | null;
    isDeletingTerminalId: string | null;
    clearPendingDeleteTerminal: () => void;
    confirmDeleteTerminal: () => Promise<void>;
    openGitTentacleId: string | null;
    columns: TerminalView;
    openGitTentacleStatus: TentacleGitStatusSnapshot | null;
    openGitTentaclePullRequest: TentaclePullRequestSnapshot | null;
    gitCommitMessageDraft: string;
    gitDialogError: string | null;
    isGitDialogLoading: boolean;
    isGitDialogMutating: boolean;
    setGitCommitMessageDraft: (value: string) => void;
    closeTentacleGitActions: () => void;
    commitTentacleChanges: () => Promise<void>;
    commitAndPushTentacleBranch: () => Promise<void>;
    pushTentacleBranch: () => Promise<void>;
    syncTentacleBranch: () => Promise<void>;
    mergeTentaclePullRequest: () => Promise<void>;
    requestDeleteTerminal: (tentacleId: string, tentacleName: string, options: {
        workspaceMode: "shared" | "worktree";
        intent: "delete-terminal" | "cleanup-worktree";
    }) => void;
};
export declare const SidebarActionPanel: ({ pendingDeleteTerminal, isDeletingTerminalId, clearPendingDeleteTerminal, confirmDeleteTerminal, openGitTentacleId, columns, openGitTentacleStatus, openGitTentaclePullRequest, gitCommitMessageDraft, gitDialogError, isGitDialogLoading, isGitDialogMutating, setGitCommitMessageDraft, closeTentacleGitActions, commitTentacleChanges, commitAndPushTentacleBranch, pushTentacleBranch, syncTentacleBranch, mergeTentaclePullRequest, requestDeleteTerminal, }: SidebarActionPanelProps) => import("react").JSX.Element | null;
export {};
//# sourceMappingURL=SidebarActionPanel.d.ts.map