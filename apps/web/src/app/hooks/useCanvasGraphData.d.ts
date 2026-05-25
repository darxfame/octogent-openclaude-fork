import type { DeckTentacleSummary } from "@octogent/core";
import type { GraphEdge, GraphNode } from "../canvas/types";
import type { ConversationSessionSummary, TerminalView } from "../types";
import type { AgentRuntimeStateInfo } from "./useAgentRuntimeStates";
export declare const OCTOBOSS_ID = "__octoboss__";
type UseCanvasGraphDataOptions = {
    columns: TerminalView;
    enabled: boolean;
    agentRuntimeStates?: Map<string, AgentRuntimeStateInfo>;
};
type UseCanvasGraphDataResult = {
    nodes: GraphNode[];
    edges: GraphEdge[];
    tentacleById: ReadonlyMap<string, DeckTentacleSummary>;
    sessionsByTentacleId: ReadonlyMap<string, ConversationSessionSummary[]>;
    refresh: () => Promise<void>;
    refreshDeckTentacles: () => Promise<void>;
};
export declare const useCanvasGraphData: ({ columns, enabled, agentRuntimeStates, }: UseCanvasGraphDataOptions) => UseCanvasGraphDataResult;
export {};
//# sourceMappingURL=useCanvasGraphData.d.ts.map