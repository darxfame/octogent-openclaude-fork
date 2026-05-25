import { type ReactNode } from "react";
import type { WorkspaceSetupSnapshot, WorkspaceSetupStepId } from "@octogent/core";
export type { OctopusAppearancePayload } from "./deck/AddTentacleForm";
type DeckPrimaryViewProps = {
    onSidebarContent?: ((content: ReactNode) => void) | undefined;
    workspaceSetup: WorkspaceSetupSnapshot | null;
    isWorkspaceSetupLoading: boolean;
    workspaceSetupError: string | null;
    onRefreshWorkspaceSetup: () => Promise<WorkspaceSetupSnapshot | null>;
    onRunWorkspaceSetupStep: (stepId: WorkspaceSetupStepId) => Promise<WorkspaceSetupSnapshot | null>;
    suppressWorkspaceSetupCard?: boolean;
};
export declare const DeckPrimaryView: ({ onSidebarContent, workspaceSetup, isWorkspaceSetupLoading, workspaceSetupError, onRefreshWorkspaceSetup, onRunWorkspaceSetupStep, suppressWorkspaceSetupCard, }: DeckPrimaryViewProps) => import("react").JSX.Element;
//# sourceMappingURL=DeckPrimaryView.d.ts.map