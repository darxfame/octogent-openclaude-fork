import type { ConversationSearchResult, ConversationSessionDetail, ConversationSessionSummary, ConversationTurn } from "@octogent/core";
import type { AgentRuntimeState } from "../agentStateDetection";
export type ConversationTranscriptEventBase = {
    eventId: string;
    sessionId: string;
    tentacleId: string;
    timestamp: string;
};
export type SessionStartTranscriptEvent = ConversationTranscriptEventBase & {
    type: "session_start";
};
export type InputSubmitTranscriptEvent = ConversationTranscriptEventBase & {
    type: "input_submit";
    submitId: string;
    text: string;
};
export type OutputChunkTranscriptEvent = ConversationTranscriptEventBase & {
    type: "output_chunk";
    chunkId: string;
    text: string;
};
export type StateChangeTranscriptEvent = ConversationTranscriptEventBase & {
    type: "state_change";
    state: AgentRuntimeState;
};
export type SessionEndTranscriptEvent = ConversationTranscriptEventBase & {
    type: "session_end";
    reason: "pty_exit" | "session_close" | "operator_stop" | "operator_kill";
    exitCode?: number;
    signal?: number | string;
};
export type ConversationTranscriptEvent = SessionStartTranscriptEvent | InputSubmitTranscriptEvent | OutputChunkTranscriptEvent | StateChangeTranscriptEvent | SessionEndTranscriptEvent;
export type ConversationTranscriptEventPayload = Omit<SessionStartTranscriptEvent, "eventId" | "sessionId" | "tentacleId"> | Omit<InputSubmitTranscriptEvent, "eventId" | "sessionId" | "tentacleId"> | Omit<OutputChunkTranscriptEvent, "eventId" | "sessionId" | "tentacleId"> | Omit<StateChangeTranscriptEvent, "eventId" | "sessionId" | "tentacleId"> | Omit<SessionEndTranscriptEvent, "eventId" | "sessionId" | "tentacleId">;
export type { ConversationTurn };
export declare const transcriptFilenameForSession: (sessionId: string) => string;
export declare const readConversationSession: (transcriptDirectoryPath: string, sessionId: string) => ConversationSessionDetail | null;
export declare const listConversationSessions: (transcriptDirectoryPath: string) => ConversationSessionSummary[];
export declare const ensureTranscriptDirectory: (transcriptDirectoryPath: string) => void;
export declare const deleteConversation: (transcriptDirectoryPath: string, sessionId: string) => void;
export declare const deleteAllConversations: (transcriptDirectoryPath: string) => void;
export declare const storeClaudeTranscriptTurns: (transcriptDirectoryPath: string, sessionId: string, turns: ConversationTurn[]) => void;
export declare const searchConversations: (transcriptDirectoryPath: string, query: string) => ConversationSearchResult;
export declare const conversationExportMarkdown: (conversation: ConversationSessionDetail) => string;
//# sourceMappingURL=conversations.d.ts.map