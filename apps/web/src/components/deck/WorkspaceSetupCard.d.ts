import type { WorkspaceSetupSnapshot, WorkspaceSetupStepId } from "@octogent/core";
type WorkspaceSetupCardProps = {
    compact?: boolean;
    workspaceSetup: WorkspaceSetupSnapshot | null;
    isLoading: boolean;
    error: string | null;
    onRunStep: (stepId: WorkspaceSetupStepId) => void;
    onLaunchClaudeCode: () => void;
    isLaunchingAgent?: boolean;
    isRunningStepId?: WorkspaceSetupStepId | null;
};
export declare const WorkspaceSetupCard: ({ compact, workspaceSetup, isLoading, error, onRunStep, onLaunchClaudeCode, isLaunchingAgent, isRunningStepId, }: WorkspaceSetupCardProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=WorkspaceSetupCard.d.ts.map