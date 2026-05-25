import type { IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";
import type { WebSocketServer } from "ws";
import { type AgentRuntimeState } from "../agentStateDetection";
import type { DirectSessionListener, PersistedTerminal, TerminalSession, TerminalSessionEndDetails, TerminalSessionStartDetails } from "./types";
type CreateSessionRuntimeOptions = {
    websocketServer: WebSocketServer;
    terminals: Map<string, PersistedTerminal>;
    sessions: Map<string, TerminalSession>;
    resolveTerminalSession?: (terminalId: string) => {
        sessionId: string;
        tentacleId: string;
    } | null;
    getTentacleWorkspaceCwd: (tentacleId: string) => string;
    isDebugPtyLogsEnabled: boolean;
    ptyLogDir: string;
    transcriptDirectoryPath: string;
    sessionIdleGraceMs?: number;
    scrollbackMaxBytes?: number;
    maxConcurrentSessions?: number;
    onStateChange?: (terminalId: string, state: AgentRuntimeState, toolName?: string) => void;
    onSessionStart?: (terminalId: string, details: TerminalSessionStartDetails) => void;
    onSessionEnd?: (terminalId: string, details: TerminalSessionEndDetails) => void;
};
export declare const createSessionRuntime: ({ websocketServer, terminals, sessions, resolveTerminalSession, getTentacleWorkspaceCwd, isDebugPtyLogsEnabled, ptyLogDir, transcriptDirectoryPath, sessionIdleGraceMs, scrollbackMaxBytes, maxConcurrentSessions, onStateChange, onSessionStart, onSessionEnd, }: CreateSessionRuntimeOptions) => {
    closeSession: (sessionId: string) => boolean;
    stopSession: (sessionId: string) => boolean;
    killSession: (sessionId: string, signal?: string) => boolean;
    handleUpgrade: (request: IncomingMessage, socket: Duplex, head: Buffer) => boolean;
    connectDirect: (terminalId: string, listener: DirectSessionListener) => (() => void) | null;
    startSession: (terminalId: string) => boolean;
    writeInput: (terminalId: string, data: string) => boolean;
    resizeSession: (terminalId: string, cols: number, rows: number) => boolean;
    releaseSessionKeepAlive: (terminalId: string) => boolean;
    close: () => void;
    getSessionCapacity: () => {
        active: number;
        max: number;
    };
};
export {};
//# sourceMappingURL=sessionRuntime.d.ts.map