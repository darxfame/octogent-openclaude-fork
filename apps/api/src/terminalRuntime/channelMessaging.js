import { logVerbose } from "../logging";
export const createChannelMessaging = (deps) => {
    const { terminals, sessions, writeInput } = deps;
    const channelQueues = new Map();
    let channelMessageCounter = 0;
    const deliverChannelMessages = (terminalId) => {
        const queue = channelQueues.get(terminalId);
        if (!queue || queue.length === 0) {
            return 0;
        }
        const session = sessions.get(terminalId);
        if (!session) {
            return 0;
        }
        const undelivered = queue.filter((m) => !m.delivered);
        if (undelivered.length === 0) {
            return 0;
        }
        // Compose all pending messages into a single prompt injection.
        const lines = undelivered.map((m) => `[Channel message from ${m.fromTerminalId}]: ${m.content}`);
        const prompt = `${lines.join("\n")}\r`;
        logVerbose(`[Channel] Delivering ${undelivered.length} message(s) to ${terminalId}`);
        for (const m of undelivered) {
            m.delivered = true;
        }
        writeInput(terminalId, prompt);
        return undelivered.length;
    };
    return {
        sendChannelMessage(toTerminalId, fromTerminalId, content) {
            if (!terminals.has(toTerminalId)) {
                return null;
            }
            channelMessageCounter += 1;
            const message = {
                messageId: `msg-${channelMessageCounter}`,
                fromTerminalId,
                toTerminalId,
                content,
                timestamp: new Date().toISOString(),
                delivered: false,
            };
            const queue = channelQueues.get(toTerminalId) ?? [];
            queue.push(message);
            channelQueues.set(toTerminalId, queue);
            logVerbose(`[Channel] Queued message ${message.messageId} from=${fromTerminalId} to=${toTerminalId}`);
            // If the target session is idle, deliver immediately.
            const targetSession = sessions.get(toTerminalId);
            if (targetSession && targetSession.agentState === "idle") {
                deliverChannelMessages(toTerminalId);
            }
            return message;
        },
        listChannelMessages(terminalId) {
            return channelQueues.get(terminalId) ?? [];
        },
        deliverChannelMessages,
    };
};
//# sourceMappingURL=channelMessaging.js.map