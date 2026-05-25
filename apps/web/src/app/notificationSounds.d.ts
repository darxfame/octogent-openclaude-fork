import { type TerminalCompletionSoundId, isTerminalCompletionSoundId } from "@octogent/core";
export { type TerminalCompletionSoundId, isTerminalCompletionSoundId };
export declare const DEFAULT_TERMINAL_COMPLETION_SOUND: TerminalCompletionSoundId;
export declare const TERMINAL_COMPLETION_SOUND_OPTIONS: Array<{
    id: TerminalCompletionSoundId;
    label: string;
    description: string;
}>;
export declare const buildTerminalCompletionSoundDataUrl: (soundId: TerminalCompletionSoundId) => string | null;
//# sourceMappingURL=notificationSounds.d.ts.map