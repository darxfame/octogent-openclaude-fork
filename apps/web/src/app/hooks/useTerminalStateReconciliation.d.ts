import type { Dispatch, SetStateAction } from "react";
import type { TerminalView } from "../types";
type UseTerminalStateReconciliationOptions = {
    columns: TerminalView;
    setMinimizedTerminalIds: Dispatch<SetStateAction<string[]>>;
    onActiveTerminalIdsChange?: (activeTerminalIds: ReadonlySet<string>) => void;
};
export declare const useTerminalStateReconciliation: ({ columns, setMinimizedTerminalIds, onActiveTerminalIdsChange, }: UseTerminalStateReconciliationOptions) => void;
export {};
//# sourceMappingURL=useTerminalStateReconciliation.d.ts.map