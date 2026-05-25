import type { GraphNode } from "../../app/canvas/types";
type OctopusNodeProps = {
    node: GraphNode;
    connectedNodes: GraphNode[];
    isSelected: boolean;
    selectedNodeId: string | null;
    selectedNodeColor: string | null;
    onPointerDown: (e: React.PointerEvent, nodeId: string) => void;
    onClick: (nodeId: string) => void;
};
export declare const OctopusNode: ({ node, connectedNodes, isSelected, selectedNodeId, selectedNodeColor, onPointerDown, onClick, }: OctopusNodeProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=OctopusNode.d.ts.map