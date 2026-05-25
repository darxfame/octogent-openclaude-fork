import type { PendingDeleteTerminal } from "../app/hooks/useTerminalMutations";
type DeleteTentacleDialogProps = {
    pendingDeleteTerminal: PendingDeleteTerminal;
    isDeletingTerminalId: string | null;
    onCancel: () => void;
    onConfirmDelete: () => void;
};
export declare const DeleteTentacleDialog: ({ pendingDeleteTerminal, isDeletingTerminalId, onCancel, onConfirmDelete, }: DeleteTentacleDialogProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=DeleteTentacleDialog.d.ts.map