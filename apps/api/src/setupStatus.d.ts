import type { WorkspaceSetupSnapshot } from "@octogent/core";
export declare const initializeWorkspaceFiles: (workspaceCwd: string, projectStateDir: string) => {
    projectConfig: {
        version: 1;
        projectId: string;
        displayName: string;
        createdAt: string;
    };
    projectStateDir: string;
};
export declare const ensureWorkspaceGitignore: (workspaceCwd: string) => {
    changed: boolean;
};
export declare const readWorkspaceSetupSnapshot: (workspaceCwd: string, projectStateDir: string) => WorkspaceSetupSnapshot;
//# sourceMappingURL=setupStatus.d.ts.map