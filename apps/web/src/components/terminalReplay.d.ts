type ReplayViewport = Pick<HTMLElement, "clientHeight" | "scrollHeight" | "scrollTop">;
type ReplayTerminal = {
    reset: () => void;
    write: (value: string, callback?: () => void) => void;
    clearSelection?: () => void;
    refresh?: (start: number, end: number) => void;
    rows?: number;
};
export declare const replayTerminalHistory: (terminal: ReplayTerminal, history: string, viewport: ReplayViewport | null) => void;
export {};
//# sourceMappingURL=terminalReplay.d.ts.map