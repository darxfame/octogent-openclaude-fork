export const TERMINAL_COMPLETION_SOUND_IDS = [
    "soft-chime",
    "retro-beep",
    "double-beep",
    "bell",
    "pop",
    "silent",
];
export const isTerminalCompletionSoundId = (value) => typeof value === "string" &&
    TERMINAL_COMPLETION_SOUND_IDS.includes(value);
//# sourceMappingURL=completionSound.js.map