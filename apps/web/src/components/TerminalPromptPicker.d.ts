type TerminalPromptPickerProps = {
    isOpen: boolean;
    anchorRef: React.RefObject<HTMLButtonElement | null>;
    onClose: () => void;
    onSelectPrompt: (content: string) => void;
};
export declare const TerminalPromptPicker: ({ isOpen, anchorRef, onClose, onSelectPrompt, }: TerminalPromptPickerProps) => import("react").JSX.Element | null;
export {};
//# sourceMappingURL=TerminalPromptPicker.d.ts.map