import { type Ref } from "react";
import type { DeckTentacleSummary, TentacleWorkspaceMode } from "@octogent/core";
import type { GraphNode } from "../../app/canvas/types";
import type { ConversationSessionSummary } from "../../app/types";
type CanvasTentaclePanelProps = {
    node: GraphNode;
    isFocused?: boolean;
    onClose: () => void;
    onFocus?: () => void;
    panelRef?: Ref<HTMLDivElement> | undefined;
    tentacle: DeckTentacleSummary | null;
    sessions: ConversationSessionSummary[];
    onCreateAgent?: ((tentacleId: string) => void) | undefined;
    onSolveTodoItem?: ((tentacleId: string, itemIndex: number) => void) | undefined;
    onSpawnSwarm?: ((tentacleId: string, workspaceMode: TentacleWorkspaceMode) => void) | undefined;
    onNavigateToConversation?: ((sessionId: string) => void) | undefined;
    onRefreshTentacleData?: (() => Promise<void>) | undefined;
};
export declare const CanvasTentaclePanel: ({ node, isFocused, onClose, onFocus, panelRef, tentacle, sessions, onCreateAgent, onSolveTodoItem, onSpawnSwarm, onNavigateToConversation, onRefreshTentacleData, }: CanvasTentaclePanelProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=CanvasTentaclePanel.d.ts.map