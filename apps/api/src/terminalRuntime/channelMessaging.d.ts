import type { ChannelMessage, PersistedTerminal, TerminalSession } from "./types";
export declare const createChannelMessaging: (deps: {
    terminals: Map<string, PersistedTerminal>;
    sessions: Map<string, TerminalSession>;
    writeInput: (terminalId: string, data: string) => boolean;
}) => {
    sendChannelMessage(toTerminalId: string, fromTerminalId: string, content: string): ChannelMessage | null;
    listChannelMessages(terminalId: string): ChannelMessage[];
    deliverChannelMessages: (terminalId: string) => number;
};
//# sourceMappingURL=channelMessaging.d.ts.map