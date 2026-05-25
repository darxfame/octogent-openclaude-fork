import type { WorkspaceSetupSnapshot, WorkspaceSetupStepId } from "@octogent/core";
type UseWorkspaceSetupResult = {
    workspaceSetup: WorkspaceSetupSnapshot | null;
    isWorkspaceSetupLoading: boolean;
    workspaceSetupError: string | null;
    refreshWorkspaceSetup: () => Promise<WorkspaceSetupSnapshot | null>;
    runWorkspaceSetupStep: (stepId: WorkspaceSetupStepId) => Promise<WorkspaceSetupSnapshot | null>;
};
export declare const useWorkspaceSetup: () => UseWorkspaceSetupResult;
export {};
//# sourceMappingURL=useWorkspaceSetup.d.ts.map