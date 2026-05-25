import type { WorkspaceSetupStepId } from "@octogent/core";
declare const VERIFIED_SETUP_STEP_IDS: readonly ["check-claude", "check-git", "check-curl"];
type VerifiedSetupStepId = (typeof VERIFIED_SETUP_STEP_IDS)[number];
export type SetupState = {
    version: 1;
    tentaclesInitializedAt?: string;
    verifiedSteps?: Partial<Record<VerifiedSetupStepId, string>>;
};
export declare const readSetupState: (stateDir: string) => SetupState;
export declare const writeSetupState: (stateDir: string, state: SetupState) => void;
export declare const markSetupStepVerified: (stateDir: string, stepId: WorkspaceSetupStepId) => void;
export declare const markTentaclesInitialized: (stateDir: string) => void;
export {};
//# sourceMappingURL=setupState.d.ts.map