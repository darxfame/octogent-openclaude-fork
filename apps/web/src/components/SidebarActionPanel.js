import { DeleteTentacleDialog } from "./DeleteTentacleDialog";
import { TentacleGitActionsDialog } from "./TentacleGitActionsDialog";
export const SidebarActionPanel = ({ pendingDeleteTerminal, isDeletingTerminalId, clearPendingDeleteTerminal, confirmDeleteTerminal, openGitTentacleId, columns, openGitTentacleStatus, openGitTentaclePullRequest, gitCommitMessageDraft, gitDialogError, isGitDialogLoading, isGitDialogMutating, setGitCommitMessageDraft, closeTentacleGitActions, commitTentacleChanges, commitAndPushTentacleBranch, pushTentacleBranch, syncTentacleBranch, mergeTentaclePullRequest, requestDeleteTerminal, }) => {
    const openGitTentacleTerminal = openGitTentacleId !== null
        ? columns.find((terminal) => terminal.tentacleId === openGitTentacleId)
        : null;
    if (pendingDeleteTerminal) {
        return (<DeleteTentacleDialog isDeletingTerminalId={isDeletingTerminalId} onCancel={clearPendingDeleteTerminal} onConfirmDelete={() => {
                void confirmDeleteTerminal();
            }} pendingDeleteTerminal={pendingDeleteTerminal}/>);
    }
    if (openGitTentacleTerminal && openGitTentacleTerminal.workspaceMode === "worktree") {
        return (<TentacleGitActionsDialog errorMessage={gitDialogError} gitCommitMessage={gitCommitMessageDraft} gitPullRequest={openGitTentaclePullRequest} gitStatus={openGitTentacleStatus} isLoading={isGitDialogLoading} isMutating={isGitDialogMutating} onClose={closeTentacleGitActions} onCommit={() => {
                void commitTentacleChanges();
            }} onCommitAndPush={() => {
                void commitAndPushTentacleBranch();
            }} onCommitMessageChange={setGitCommitMessageDraft} onMergePullRequest={() => {
                void mergeTentaclePullRequest();
            }} onPush={() => {
                void pushTentacleBranch();
            }} onSync={() => {
                void syncTentacleBranch();
            }} onCleanupWorktree={() => {
                requestDeleteTerminal(openGitTentacleTerminal.terminalId, openGitTentacleTerminal.tentacleName ?? openGitTentacleTerminal.tentacleId, {
                    workspaceMode: openGitTentacleTerminal.workspaceMode ?? "shared",
                    intent: "cleanup-worktree",
                });
                closeTentacleGitActions();
            }} tentacleId={openGitTentacleTerminal.tentacleId} tentacleName={openGitTentacleTerminal.tentacleName ?? openGitTentacleTerminal.tentacleId}/>);
    }
    return null;
};
//# sourceMappingURL=SidebarActionPanel.js.map