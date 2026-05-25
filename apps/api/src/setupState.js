import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const SETUP_STATE_RELATIVE_PATH = join("state", "setup.json");
const VERIFIED_SETUP_STEP_IDS = ["check-claude", "check-git", "check-curl"];
const isVerifiedSetupStepId = (value) => VERIFIED_SETUP_STEP_IDS.includes(value);
export const readSetupState = (stateDir) => {
    const filePath = join(stateDir, SETUP_STATE_RELATIVE_PATH);
    if (!existsSync(filePath)) {
        return { version: 1 };
    }
    try {
        const raw = JSON.parse(readFileSync(filePath, "utf-8"));
        const verifiedSteps = {};
        const rawVerifiedSteps = raw.verifiedSteps;
        if (rawVerifiedSteps && typeof rawVerifiedSteps === "object") {
            for (const stepId of VERIFIED_SETUP_STEP_IDS) {
                const checkedAt = rawVerifiedSteps[stepId];
                if (typeof checkedAt === "string") {
                    verifiedSteps[stepId] = checkedAt;
                }
            }
        }
        return {
            version: 1,
            ...(typeof raw.tentaclesInitializedAt === "string"
                ? { tentaclesInitializedAt: raw.tentaclesInitializedAt }
                : {}),
            ...(Object.keys(verifiedSteps).length > 0 ? { verifiedSteps } : {}),
        };
    }
    catch {
        return { version: 1 };
    }
};
export const writeSetupState = (stateDir, state) => {
    mkdirSync(join(stateDir, "state"), { recursive: true });
    writeFileSync(join(stateDir, SETUP_STATE_RELATIVE_PATH), `${JSON.stringify(state, null, 2)}\n`);
};
export const markSetupStepVerified = (stateDir, stepId) => {
    if (!isVerifiedSetupStepId(stepId)) {
        return;
    }
    const currentState = readSetupState(stateDir);
    writeSetupState(stateDir, {
        ...currentState,
        verifiedSteps: {
            ...currentState.verifiedSteps,
            [stepId]: new Date().toISOString(),
        },
    });
};
export const markTentaclesInitialized = (stateDir) => {
    const currentState = readSetupState(stateDir);
    if (currentState.tentaclesInitializedAt) {
        return;
    }
    writeSetupState(stateDir, {
        ...currentState,
        tentaclesInitializedAt: new Date().toISOString(),
    });
};
//# sourceMappingURL=setupState.js.map