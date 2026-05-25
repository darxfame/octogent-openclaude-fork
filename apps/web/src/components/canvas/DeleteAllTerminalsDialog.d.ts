import type { GraphNode } from "../../app/canvas/types";
import type { TerminalView } from "../../app/types";
type DeleteAllTerminalsDialogProps = {
    columns: TerminalView;
    nodes: GraphNode[];
    onCancel: () => void;
    onDeleted: (result: {
        hadFailures: boolean;
    }) => void;
};
export declare const DeleteAllTerminalsDialog: ({ columns, nodes, onCancel, onDeleted, }: DeleteAllTerminalsDialogProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=DeleteAllTerminalsDialog.d.ts.map