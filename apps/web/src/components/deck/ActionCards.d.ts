import type { TerminalAgentProvider } from "../../app/types";
export declare const AGENT_PROVIDER_OPTIONS: {
    value: TerminalAgentProvider;
    label: string;
}[];
export type ActionCardsProps = {
    compact?: boolean;
    selectedAgent: TerminalAgentProvider;
    setSelectedAgent: (agent: TerminalAgentProvider) => void;
    agentMenuOpen: boolean;
    setAgentMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
    agentMenuRef: React.RefObject<HTMLDivElement | null>;
    onAddManually: () => void;
    onLaunchAgent: () => void;
    isLaunchingAgent?: boolean;
};
export declare const ActionCards: ({ compact, selectedAgent, setSelectedAgent, agentMenuOpen, setAgentMenuOpen, agentMenuRef, onAddManually, onLaunchAgent, isLaunchingAgent, }: ActionCardsProps) => import("react").JSX.Element;
//# sourceMappingURL=ActionCards.d.ts.map