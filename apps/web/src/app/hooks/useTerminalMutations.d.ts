import type { Dispatch, SetStateAction } from "react";
import type { TerminalAgentProvider, TerminalView, TerminalWorkspaceMode } from "../types";
export type PendingDeleteTerminal = {
    terminalId: string;
    tentacleName: string;
    workspaceMode: TerminalWorkspaceMode;
    intent: "close-terminal" | "delete-terminal" | "cleanup-worktree";
};
type UseTerminalMutationsOptions = {
    readColumns: () => Promise<TerminalView>;
    setColumns: Dispatch<SetStateAction<TerminalView>>;
    setLoadError: Dispatch<SetStateAction<string | null>>;
    setMinimizedTerminalIds: Dispatch<SetStateAction<string[]>>;
};
type UseTerminalMutationsResult = {
    editingTerminalId: string | null;
    terminalNameDraft: string;
    isCreatingTerminal: boolean;
    isDeletingTerminalId: string | null;
    pendingDeleteTerminal: PendingDeleteTerminal | null;
    setTerminalNameDraft: Dispatch<SetStateAction<string>>;
    setEditingTerminalId: Dispatch<SetStateAction<string | null>>;
    beginTerminalNameEdit: (terminalId: string, currentTerminalName: string) => void;
    submitTerminalRename: (terminalId: string, currentTerminalName: string) => Promise<void>;
    createTerminal: (workspaceMode: TerminalWorkspaceMode, agentProvider?: TerminalAgentProvider, tentacleId?: string) => Promise<string | undefined>;
    requestDeleteTerminal: (terminalId: string, terminalName: string, options?: {
        workspaceMode?: TerminalWorkspaceMode;
        intent?: "close-terminal" | "delete-terminal" | "cleanup-worktree";
    }) => void;
    confirmDeleteTerminal: () => Promise<void>;
    clearPendingDeleteTerminal: () => void;
    cancelTerminalRename: () => void;
};
export declare const useTerminalMutations: ({ readColumns, setColumns, setLoadError, setMinimizedTerminalIds, }: UseTerminalMutationsOptions) => UseTerminalMutationsResult;
export {};
//# sourceMappingURL=useTerminalMutations.d.ts.map