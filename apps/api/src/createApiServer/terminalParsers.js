import { isTerminalAgentProvider, } from "../terminalRuntime";
const isTerminalNameOrigin = (value) => value === "generated" || value === "user" || value === "prompt";
export const parseTerminalName = (payload) => {
    if (payload === null || payload === undefined) {
        return {
            provided: false,
            name: undefined,
            error: null,
        };
    }
    if (typeof payload !== "object") {
        return {
            provided: true,
            name: undefined,
            error: "Expected a JSON object body.",
        };
    }
    const rawName = payload.name;
    if (rawName === undefined) {
        return {
            provided: false,
            name: undefined,
            error: null,
        };
    }
    if (typeof rawName !== "string") {
        return {
            provided: true,
            name: undefined,
            error: "Terminal name must be a string.",
        };
    }
    const trimmed = rawName.trim();
    if (trimmed.length === 0) {
        return {
            provided: true,
            name: undefined,
            error: "Terminal name cannot be empty.",
        };
    }
    return {
        provided: true,
        name: trimmed,
        error: null,
    };
};
export const parseTerminalWorkspaceMode = (payload) => {
    if (payload === null || payload === undefined) {
        return {
            workspaceMode: "shared",
            error: null,
        };
    }
    if (typeof payload !== "object") {
        return {
            workspaceMode: "shared",
            error: "Expected a JSON object body.",
        };
    }
    const rawWorkspaceMode = payload.workspaceMode;
    if (rawWorkspaceMode === undefined) {
        return {
            workspaceMode: "shared",
            error: null,
        };
    }
    if (rawWorkspaceMode !== "shared" && rawWorkspaceMode !== "worktree") {
        return {
            workspaceMode: "shared",
            error: "Terminal workspace mode must be either 'shared' or 'worktree'.",
        };
    }
    return {
        workspaceMode: rawWorkspaceMode,
        error: null,
    };
};
export const parseTerminalAgentProvider = (payload) => {
    if (payload === null || payload === undefined) {
        return {
            agentProvider: undefined,
            error: null,
        };
    }
    if (typeof payload !== "object") {
        return {
            agentProvider: undefined,
            error: "Expected a JSON object body.",
        };
    }
    const rawAgentProvider = payload.agentProvider;
    if (rawAgentProvider === undefined) {
        return {
            agentProvider: undefined,
            error: null,
        };
    }
    if (!isTerminalAgentProvider(rawAgentProvider)) {
        return {
            agentProvider: undefined,
            error: "Terminal agent provider must be either 'codex' or 'claude-code'.",
        };
    }
    return {
        agentProvider: rawAgentProvider,
        error: null,
    };
};
export const parseTerminalNameOrigin = (payload) => {
    if (payload === null || payload === undefined) {
        return {
            nameOrigin: undefined,
            error: null,
        };
    }
    if (typeof payload !== "object") {
        return {
            nameOrigin: undefined,
            error: "Expected a JSON object body.",
        };
    }
    const rawNameOrigin = payload.nameOrigin;
    if (rawNameOrigin === undefined) {
        return {
            nameOrigin: undefined,
            error: null,
        };
    }
    if (!isTerminalNameOrigin(rawNameOrigin)) {
        return {
            nameOrigin: undefined,
            error: "Terminal name origin must be 'generated', 'user', or 'prompt'.",
        };
    }
    return {
        nameOrigin: rawNameOrigin,
        error: null,
    };
};
//# sourceMappingURL=terminalParsers.js.map