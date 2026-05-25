import type { AgentRuntimeState } from "@octogent/core";
import type { TerminalView } from "./types";
export type TerminalRuntimeStateInfo = {
    state: AgentRuntimeState;
    toolName?: string;
};
type Listener = () => void;
type TerminalRuntimeStateMap = Record<string, TerminalRuntimeStateInfo>;
export declare const getTerminalRuntimeStateInfo: (terminal: Pick<TerminalView[number], "agentRuntimeState">, toolName?: string) => TerminalRuntimeStateInfo | undefined;
export declare const stripTerminalRuntimeState: (terminal: TerminalView[number]) => TerminalView[number];
export declare const stripTerminalRuntimeStates: (terminals: TerminalView) => TerminalView;
export declare const createTerminalRuntimeStateStore: () => {
    subscribe: (listener: Listener, terminalIds?: Iterable<string>) => () => void;
    getSnapshot(): TerminalRuntimeStateMap;
    getRuntimeState: (terminalId: string) => TerminalRuntimeStateInfo | undefined;
    getRuntimeStates: (terminalIds: Iterable<string>) => Map<string, TerminalRuntimeStateInfo>;
    syncFromTerminals(terminals: TerminalView): void;
    setRuntimeState(terminalId: string, state: TerminalRuntimeStateInfo | undefined): void;
    retainTerminalIds(activeTerminalIds: ReadonlySet<string>): void;
    removeTerminal(terminalId: string): void;
};
export type TerminalRuntimeStateStore = ReturnType<typeof createTerminalRuntimeStateStore>;
export declare const useTerminalRuntimeStates: (runtimeStateStore: TerminalRuntimeStateStore, terminalIds: string[]) => Map<string, TerminalRuntimeStateInfo>;
export {};
//# sourceMappingURL=terminalRuntimeStateStore.d.ts.map