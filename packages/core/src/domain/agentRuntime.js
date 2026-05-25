export const isAgentRuntimeState = (value) => value === "idle" ||
    value === "processing" ||
    value === "waiting_for_permission" ||
    value === "waiting_for_user";
export const TERMINAL_AGENT_PROVIDERS = ["codex", "claude-code"];
export const isTerminalAgentProvider = (value) => typeof value === "string" && TERMINAL_AGENT_PROVIDERS.includes(value);
//# sourceMappingURL=agentRuntime.js.map