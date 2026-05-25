import type { PromptLibraryEntry } from "../app/types";
type SidebarPromptsListProps = {
    prompts: PromptLibraryEntry[];
    selectedPromptName: string | null;
    isLoadingPrompts: boolean;
    onSelectPrompt: (name: string) => void;
    onRefresh: () => void;
    onNewPrompt: () => void;
    activeTerminalId: string | null;
    onRestoreTerminal: () => void;
    onCloseTerminal: () => void;
};
export declare const SidebarPromptsList: ({ prompts, selectedPromptName, isLoadingPrompts, onSelectPrompt, onRefresh, onNewPrompt, activeTerminalId, onRestoreTerminal, onCloseTerminal, }: SidebarPromptsListProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=SidebarPromptsList.d.ts.map