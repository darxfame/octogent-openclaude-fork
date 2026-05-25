import { type Ref } from "react";
import type { GraphNode } from "../../app/canvas/types";
import type { TerminalView } from "../../app/types";
type CanvasTerminalColumnProps = {
    node: GraphNode;
    terminals: TerminalView;
    layoutVersion?: string | number;
    isFocused?: boolean;
    onMinimize: () => void;
    onClose: () => void;
    onFocus?: () => void;
    panelRef?: Ref<HTMLElement> | undefined;
    onTerminalRenamed?: ((terminalId: string, tentacleName: string) => void) | undefined;
    onTerminalActivity?: ((terminalId: string) => void) | undefined;
};
export declare const CanvasTerminalColumn: ({ node, terminals, layoutVersion, isFocused, onMinimize, onClose, onFocus, panelRef, onTerminalRenamed, onTerminalActivity, }: CanvasTerminalColumnProps) => import("react").JSX.Element | null;
export {};
//# sourceMappingURL=CanvasTerminalColumn.d.ts.map