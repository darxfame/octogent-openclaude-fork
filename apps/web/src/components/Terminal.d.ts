import { type AgentRuntimeState } from "./AgentStateBadge";
import "xterm/css/xterm.css";
type TerminalProps = {
    terminalId: string;
    terminalLabel?: string;
    layoutVersion?: string | number;
    isSelected?: boolean;
    initialPrompt?: string;
    hidePromptPicker?: boolean;
    onSelectTerminal?: (terminalId: string) => void;
    onAgentRuntimeStateChange?: (state: AgentRuntimeState) => void;
    onTerminalRenamed?: ((terminalId: string, tentacleName: string) => void) | undefined;
    onTerminalActivity?: ((terminalId: string) => void) | undefined;
};
export declare const Terminal: ({ terminalId, terminalLabel, layoutVersion, isSelected, initialPrompt, hidePromptPicker, onSelectTerminal, onAgentRuntimeStateChange, onTerminalRenamed, onTerminalActivity, }: TerminalProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=Terminal.d.ts.map