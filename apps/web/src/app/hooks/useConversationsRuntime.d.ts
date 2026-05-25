import type { ConversationSearchHit, ConversationSessionDetail, ConversationSessionSummary } from "../types";
type ConversationExportFormat = "json" | "md";
type ConversationExportResult = {
    filename: string;
    contentType: string;
    content: string;
};
type UseConversationsRuntimeOptions = {
    enabled?: boolean;
};
type UseConversationsRuntimeResult = {
    sessions: ConversationSessionSummary[];
    selectedSessionId: string | null;
    selectedSession: ConversationSessionDetail | null;
    isLoadingSessions: boolean;
    isLoadingSelectedSession: boolean;
    isExporting: boolean;
    isClearing: boolean;
    isSearching: boolean;
    searchQuery: string;
    searchHits: ConversationSearchHit[];
    highlightedTurnId: string | null;
    errorMessage: string | null;
    selectSession: (sessionId: string) => void;
    refreshSessions: () => Promise<void>;
    clearAllSessions: () => Promise<void>;
    deleteSession: (sessionId: string) => Promise<void>;
    exportSession: (sessionId: string, format: ConversationExportFormat) => Promise<ConversationExportResult | null>;
    searchConversations: (query: string) => Promise<void>;
    clearSearch: () => void;
    navigateToSearchHit: (hit: ConversationSearchHit) => void;
};
export declare const useConversationsRuntime: ({ enabled, }?: UseConversationsRuntimeOptions) => UseConversationsRuntimeResult;
export {};
//# sourceMappingURL=useConversationsRuntime.d.ts.map