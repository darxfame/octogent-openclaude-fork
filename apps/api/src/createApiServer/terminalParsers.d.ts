import { type TentacleWorkspaceMode, type TerminalAgentProvider, type TerminalNameOrigin } from "../terminalRuntime";
export declare const parseTerminalName: (payload: unknown) => {
    provided: boolean;
    name: string | undefined;
    error: string | null;
};
export declare const parseTerminalWorkspaceMode: (payload: unknown) => {
    workspaceMode: TentacleWorkspaceMode;
    error: string | null;
};
export declare const parseTerminalAgentProvider: (payload: unknown) => {
    agentProvider: TerminalAgentProvider | undefined;
    error: string | null;
};
export declare const parseTerminalNameOrigin: (payload: unknown) => {
    nameOrigin: TerminalNameOrigin | undefined;
    error: string | null;
};
//# sourceMappingURL=terminalParsers.d.ts.map