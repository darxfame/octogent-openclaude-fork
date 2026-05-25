import type { GraphNode } from "../../app/canvas/types";
type SessionNodeProps = {
    node: GraphNode;
    isSelected: boolean;
    onPointerDown: (e: React.PointerEvent, nodeId: string) => void;
    onClick: (nodeId: string) => void;
};
export declare const SessionNode: ({ node, isSelected, onPointerDown, onClick }: SessionNodeProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=SessionNode.d.ts.map