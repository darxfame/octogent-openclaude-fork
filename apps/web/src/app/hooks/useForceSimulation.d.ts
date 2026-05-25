import type { GraphEdge, GraphNode } from "../canvas/types";
type ForceParams = {
    repelStrength: number;
    repelDistanceMax: number;
    linkDistance: number;
    linkStrength: number;
    positionStrength: number;
    collisionPadding: number;
    velocityDecay: number;
    alphaDecay: number;
};
export declare const DEFAULT_FORCE_PARAMS: ForceParams;
export declare const WORLD_W = 1400;
export declare const WORLD_H = 800;
type UseForceSimulationOptions = {
    nodes: GraphNode[];
    edges: GraphEdge[];
    centerX: number;
    centerY: number;
    params?: ForceParams;
};
type UseForceSimulationResult = {
    simulatedNodes: GraphNode[];
    pinNode: (id: string) => void;
    unpinNode: (id: string) => void;
    moveNode: (id: string, x: number, y: number) => void;
    reheat: () => void;
};
export declare const useForceSimulation: ({ nodes, edges, centerX, centerY, params, }: UseForceSimulationOptions) => UseForceSimulationResult;
export {};
//# sourceMappingURL=useForceSimulation.d.ts.map