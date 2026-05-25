import type { PersistedTerminal, PersistedUiState } from "./types";
type TerminalRegistryState = {
    terminals: Map<string, PersistedTerminal>;
    uiState: PersistedUiState;
};
export declare const pruneUiStateTerminalReferences: (uiState: PersistedUiState, terminals: Map<string, PersistedTerminal>) => PersistedUiState;
export declare const loadTerminalRegistry: (registryPath: string) => {
    terminals: Map<string, PersistedTerminal>;
    uiState: PersistedUiState;
};
export declare const persistTerminalRegistry: (registryPath: string, state: TerminalRegistryState) => void;
export declare const createTerminalRegistryPersistence: (registryPath: string) => {
    schedulePersist(state: TerminalRegistryState): void;
    flush: () => Promise<void>;
    close(): Promise<void>;
};
export {};
//# sourceMappingURL=registry.d.ts.map