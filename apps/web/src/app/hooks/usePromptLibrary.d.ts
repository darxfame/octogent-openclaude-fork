import type { PromptDetail, PromptLibraryEntry } from "../types";
type UsePromptLibraryOptions = {
    enabled?: boolean;
};
type UsePromptLibraryResult = {
    prompts: PromptLibraryEntry[];
    selectedPromptName: string | null;
    selectedPromptDetail: PromptDetail | null;
    isLoadingPrompts: boolean;
    isLoadingDetail: boolean;
    isEditing: boolean;
    editDraft: string;
    errorMessage: string | null;
    refreshPrompts: () => Promise<void>;
    selectPrompt: (name: string) => void;
    savePrompt: (name: string, content: string) => Promise<boolean>;
    deletePrompt: (name: string) => Promise<boolean>;
    startEditing: () => void;
    cancelEditing: () => void;
    setEditDraft: (draft: string) => void;
    submitEdit: () => Promise<boolean>;
};
export declare const usePromptLibrary: ({ enabled, }?: UsePromptLibraryOptions) => UsePromptLibraryResult;
export {};
//# sourceMappingURL=usePromptLibrary.d.ts.map