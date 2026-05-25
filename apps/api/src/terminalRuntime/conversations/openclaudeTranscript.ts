import { logVerbose } from "../../logging";

export type OpenClaudeMessageType =
  | "user"
  | "assistant"
  | "tool_use"
  | "tool_result"
  | "system"
  | "error";

export interface OpenClaudeMessage {
  type: OpenClaudeMessageType;
  timestamp?: string;
  content?: string;
  tool_name?: string;
  tool_input?: Record<string, unknown>;
  tool_output?: Record<string, unknown> | string;
}

export type ConversationTurn = {
  turnId: string;
  role: "user" | "assistant";
  content: string;
  startedAt: string;
  endedAt: string;
};

/**
 * Parse OpenClaude JSONL transcript format.
 *
 * OpenClaude format (flat structure):
 * {"type": "user", "timestamp": "...", "content": "..."}
 * {"type": "tool_use", "timestamp": "...", "tool_name": "...", "tool_input": {...}}
 * {"type": "tool_result", "timestamp": "...", "tool_name": "...", "tool_output": {...}}
 * {"type": "assistant", "timestamp": "...", "content": "..."}
 *
 * Unlike Claude Code which uses nested message.wrapper,
 * OpenClaude uses flat structure with type discriminator.
 */
export const parseOpenClaudeTranscript = (content: string): ConversationTurn[] => {
  const lines = content.trim().split("\n");
  const turns: ConversationTurn[] = [];

  let currentUserContent = "";
  let currentUserStartTime = "";
  let currentAssistantContent = "";
  let currentAssistantStartTime = "";

  const closeCurrentUser = (endTime: string) => {
    if (currentUserContent.trim()) {
      turns.push({
        turnId: `turn-${turns.length + 1}`,
        role: "user",
        content: currentUserContent.trim(),
        startedAt: currentUserStartTime || endTime,
        endedAt: endTime,
      });
      currentUserContent = "";
      currentUserStartTime = "";
    }
  };

  const closeCurrentAssistant = (endTime: string) => {
    if (currentAssistantContent.trim()) {
      turns.push({
        turnId: `turn-${turns.length + 1}`,
        role: "assistant",
        content: currentAssistantContent.trim(),
        startedAt: currentAssistantStartTime || endTime,
        endedAt: endTime,
      });
      currentAssistantContent = "";
      currentAssistantStartTime = "";
    }
  };

  for (const line of lines) {
    if (!line.trim()) continue;

    try {
      const msg: OpenClaudeMessage = JSON.parse(line);
      const timestamp = msg.timestamp || new Date().toISOString();

      switch (msg.type) {
        case "user":
          // User message - collect content
          closeCurrentAssistant(timestamp);
          if (!currentUserStartTime) currentUserStartTime = timestamp;
          if (typeof msg.content === "string") {
            currentUserContent += (currentUserContent ? "\n" : "") + msg.content;
          }
          break;

        case "assistant":
          // Assistant message - this terminates user input collection
          closeCurrentUser(timestamp);
          if (!currentAssistantStartTime) currentAssistantStartTime = timestamp;
          if (typeof msg.content === "string") {
            currentAssistantContent += (currentAssistantContent ? "\n" : "") + msg.content;
          }
          break;

        case "tool_use":
          // Tool call - append to current assistant message
          if (currentAssistantContent) {
            currentAssistantContent +=
              `\n[TOOL: ${msg.tool_name || "unknown"}] ${JSON.stringify(msg.tool_input || {})}`;
          } else if (!currentAssistantStartTime) {
            // If no assistant content yet, this might be the first message
            currentAssistantStartTime = timestamp;
            currentAssistantContent = `[TOOL: ${msg.tool_name || "unknown"}] ${JSON.stringify(msg.tool_input || {})}`;
          }
          break;

        case "tool_result":
          // Tool result - append to current assistant message
          if (currentAssistantContent) {
            const output = formatToolOutput(msg.tool_output);
            currentAssistantContent += `\n[TOOL RESULT: ${msg.tool_name || "unknown"}] ${output}`;
          }
          break;

        case "system":
          // System messages - skip or treat as user if meaningful
          if (msg.content && !msg.content.startsWith("[") && !msg.content.startsWith("(")) {
            if (!currentUserStartTime) currentUserStartTime = timestamp;
            currentUserContent += (currentUserContent ? "\n\n" : "") + msg.content;
          }
          break;

        case "error":
          logVerbose(`[OpenClaude Transcript] Error message: ${msg.content}`);
          break;

        default:
          logVerbose(`[OpenClaude Transcript] Unknown message type: ${msg.type}`);
      }
    } catch (err) {
      logVerbose(`[OpenClaude Transcript] Failed to parse line: ${err}`);
      // Continue with next line
    }
  }

  // Close any remaining content
  const finalTime = new Date().toISOString();
  closeCurrentUser(finalTime);
  closeCurrentAssistant(finalTime);

  return turns;
};

/**
 * Format tool output for display in transcript
 */
const formatToolOutput = (output: Record<string, unknown> | string | undefined): string => {
  if (!output) return "(empty)";
  if (typeof output === "string") return output.slice(0, 500);
  if (typeof output === "object") {
    const outputObj = output as Record<string, unknown>;
    if (outputObj.output && typeof outputObj.output === "string") {
      return outputObj.output.slice(0, 500);
    }
    return JSON.stringify(output).slice(0, 500);
  }
  return String(output).slice(0, 500);
};