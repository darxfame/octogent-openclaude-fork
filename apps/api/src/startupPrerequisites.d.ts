import { execFileSync } from "node:child_process";
export type StartupPrerequisiteSeverity = "error" | "warning";
export type StartupPrerequisiteIssue = {
    command: string;
    severity: StartupPrerequisiteSeverity;
    summary: string;
    guidance: string;
};
export type StartupPrerequisiteAvailability = Record<"claude" | "codex" | "git" | "gh" | "curl", boolean>;
export type StartupPrerequisiteReport = {
    availability: StartupPrerequisiteAvailability;
    errors: StartupPrerequisiteIssue[];
    warnings: StartupPrerequisiteIssue[];
};
type CommandAvailabilityChecker = (command: string) => boolean;
type CommandAvailabilityOptions = {
    platform?: NodeJS.Platform;
    execFileSyncImpl?: typeof execFileSync;
};
export declare const isCommandAvailable: (command: string, options?: CommandAvailabilityOptions) => boolean;
export declare const collectStartupPrerequisiteReport: (isAvailable?: CommandAvailabilityChecker) => StartupPrerequisiteReport;
export declare const formatStartupPrerequisiteReport: (report: StartupPrerequisiteReport) => string[];
export {};
//# sourceMappingURL=startupPrerequisites.d.ts.map