import type { Dispatch, SetStateAction } from "react";
import type { FrontendUiStateSnapshot, TerminalView } from "../types";
type UseInitialColumnsHydrationOptions = {
    readColumns: (signal?: AbortSignal) => Promise<TerminalView>;
    readUiState: (signal?: AbortSignal) => Promise<FrontendUiStateSnapshot | null>;
    applyHydratedUiState: (snapshot: FrontendUiStateSnapshot | null, nextColumns: TerminalView) => void;
    setColumns: Dispatch<SetStateAction<TerminalView>>;
    setLoadError: Dispatch<SetStateAction<string | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setIsUiStateHydrated: Dispatch<SetStateAction<boolean>>;
};
export declare const useInitialColumnsHydration: ({ readColumns, readUiState, applyHydratedUiState, setColumns, setLoadError, setIsLoading, setIsUiStateHydrated, }: UseInitialColumnsHydrationOptions) => void;
export {};
//# sourceMappingURL=useInitialColumnsHydration.d.ts.map