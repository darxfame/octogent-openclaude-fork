export type AgentRuntimeState = "idle" | "processing" | "waiting_for_permission" | "waiting_for_user";
export declare const isAgentRuntimeState: (value: unknown) => value is AgentRuntimeState;
export type TerminalAgentProvider = "codex" | "claude-code";
export declare const TERMINAL_AGENT_PROVIDERS: TerminalAgentProvider[];
export declare const isTerminalAgentProvider: (value: unknown) => value is TerminalAgentProvider;
//# sourceMappingURL=agentRuntime.d.ts.map