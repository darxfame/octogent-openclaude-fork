import type { IncomingMessage } from "node:http";
import type { WebSocket } from "ws";
import type { TerminalServerMessage, TerminalSession } from "./types";
export declare const getTerminalId: (request: IncomingMessage) => string | null;
export declare const sendMessage: (client: WebSocket, message: TerminalServerMessage) => void;
export declare const broadcastMessage: (session: TerminalSession, message: TerminalServerMessage) => void;
//# sourceMappingURL=protocol.d.ts.map