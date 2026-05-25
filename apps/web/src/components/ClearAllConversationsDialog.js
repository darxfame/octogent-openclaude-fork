import { ConfirmationDialog } from "./ui/ConfirmationDialog";
export const ClearAllConversationsDialog = ({ sessionCount, isClearing, onCancel, onConfirm, }) => (<ConfirmationDialog title="Clear All Conversations" ariaLabel="Clear all conversations confirmation" message={<>
        Delete all <strong>{sessionCount}</strong> conversation
        {sessionCount === 1 ? "" : "s"} and their transcript data.
      </>} warning="This action cannot be undone." confirmLabel={isClearing ? "Clearing..." : "Clear All"} isConfirmDisabled={isClearing} isBusy={isClearing} cancelAriaLabel="Cancel clear all" onCancel={onCancel} onConfirm={onConfirm}/>);
//# sourceMappingURL=ClearAllConversationsDialog.js.map