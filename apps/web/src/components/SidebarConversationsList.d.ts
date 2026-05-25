import type { ConversationSearchHit, ConversationSessionSummary } from "../app/types";
type SidebarConversationsListProps = {
    sessions: ConversationSessionSummary[];
    selectedSessionId: string | null;
    isLoadingSessions: boolean;
    isSearching: boolean;
    searchQuery: string;
    searchHits: ConversationSearchHit[];
    onSelectSession: (sessionId: string) => void;
    onRefresh: () => void;
    onClearAll: () => void;
    onSearch: (query: string) => void;
    onClearSearch: () => void;
    onNavigateToHit: (hit: ConversationSearchHit) => void;
};
export declare const SidebarConversationsList: ({ sessions, selectedSessionId, isLoadingSessions, isSearching, searchQuery, searchHits, onSelectSession, onRefresh, onClearAll, onSearch, onClearSearch, onNavigateToHit, }: SidebarConversationsListProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=SidebarConversationsList.d.ts.map