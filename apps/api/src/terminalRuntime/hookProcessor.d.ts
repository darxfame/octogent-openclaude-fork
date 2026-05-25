import type { PersistedTerminal, TerminalSession } from "./types";
export declare const createHookProcessor: (deps: {
    terminals: Map<string, PersistedTerminal>;
    sessions: Map<string, TerminalSession>;
    transcriptDirectoryPath: string;
    getApiBaseUrl: () => string;
    persistRegistry: () => void;
    deliverChannelMessages: (terminalId: string) => number;
    releaseSessionKeepAlive: (terminalId: string) => boolean;
    onStateChange?: (terminalId: string, state: TerminalSession["agentState"], toolName?: string) => void;
}) => {
    handleHook: (hookName: string, payload: unknown, octogentSessionId?: string) => {
        ok: boolean;
    };
    installHooksInDirectory: (targetCwd: string) => void;
};
//# sourceMappingURL=hookProcessor.d.ts.map