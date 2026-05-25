import type { ComponentProps, ReactNode } from "react";
import type { PrimaryNavIndex } from "../app/constants";
import type { UseMonitorRuntimeResult } from "../app/hooks/useMonitorRuntime";
import { ActivityPrimaryView } from "./ActivityPrimaryView";
import { CanvasPrimaryView } from "./CanvasPrimaryView";
import { DeckPrimaryView } from "./DeckPrimaryView";
import { SettingsPrimaryView } from "./SettingsPrimaryView";
type PrimaryViewRouterProps = {
    activePrimaryNav: PrimaryNavIndex;
    deckPrimaryViewProps: ComponentProps<typeof DeckPrimaryView>;
    isMonitorVisible: boolean;
    activityPrimaryViewProps: ComponentProps<typeof ActivityPrimaryView>;
    settingsPrimaryViewProps: ComponentProps<typeof SettingsPrimaryView>;
    canvasPrimaryViewProps: ComponentProps<typeof CanvasPrimaryView>;
    monitorRuntime: Pick<UseMonitorRuntimeResult, "monitorConfig" | "monitorFeed" | "monitorError" | "isRefreshingMonitorFeed" | "isSavingMonitorConfig" | "refreshMonitorFeed" | "patchMonitorConfig">;
    conversationsEnabled: boolean;
    onConversationsSidebarContent: (content: ReactNode) => void;
    onConversationsActionPanel: (content: ReactNode) => void;
    promptsEnabled: boolean;
    onPromptsSidebarContent: (content: ReactNode) => void;
};
export declare const PrimaryViewRouter: ({ activePrimaryNav, deckPrimaryViewProps, isMonitorVisible, activityPrimaryViewProps, settingsPrimaryViewProps, canvasPrimaryViewProps, monitorRuntime, conversationsEnabled, onConversationsSidebarContent, onConversationsActionPanel, promptsEnabled, onPromptsSidebarContent, }: PrimaryViewRouterProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=PrimaryViewRouter.d.ts.map