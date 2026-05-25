import { type TerminalCompletionSoundId } from "../app/notificationSounds";
type SettingsPrimaryViewProps = {
    terminalCompletionSound: TerminalCompletionSoundId;
    isRuntimeStatusStripVisible: boolean;
    isMonitorVisible: boolean;
    onTerminalCompletionSoundChange: (soundId: TerminalCompletionSoundId) => void;
    onPreviewTerminalCompletionSound: (soundId: TerminalCompletionSoundId) => void;
    onRuntimeStatusStripVisibilityChange: (visible: boolean) => void;
    onMonitorVisibilityChange: (visible: boolean) => void;
};
export declare const SettingsPrimaryView: ({ terminalCompletionSound, isRuntimeStatusStripVisible, isMonitorVisible, onTerminalCompletionSoundChange, onPreviewTerminalCompletionSound, onRuntimeStatusStripVisibilityChange, onMonitorVisibilityChange, }: SettingsPrimaryViewProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=SettingsPrimaryView.d.ts.map