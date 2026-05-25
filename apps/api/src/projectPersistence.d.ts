export declare const GLOBAL_OCTOGENT_DIR: string;
export declare const PROJECTS_FILE: string;
export declare const PROJECT_CONFIG_RELATIVE_PATH: string;
type ProjectConfigDocument = {
    version: 1;
    projectId: string;
    displayName: string;
    createdAt: string;
};
export type ProjectRegistryEntry = {
    id: string;
    name: string;
    path: string;
    createdAt: string;
    lastOpenedAt?: string;
};
export type ProjectsRegistry = {
    projects: ProjectRegistryEntry[];
};
export declare const ensureGlobalOctogentDir: () => void;
export declare const loadProjectsRegistry: () => ProjectsRegistry;
export declare const saveProjectsRegistry: (registry: ProjectsRegistry) => void;
export declare const resolveProjectConfigPath: (workspaceCwd: string) => string;
export declare const deriveProjectIdFromWorkspace: (workspaceCwd: string) => string;
export declare const loadProjectConfig: (workspaceCwd: string) => ProjectConfigDocument | null;
export declare const ensureProjectConfig: (workspaceCwd: string, preferredName?: string, preferredProjectId?: string) => ProjectConfigDocument;
export declare const registerProject: (workspaceCwd: string, preferredName?: string) => ProjectRegistryEntry;
export declare const resolveGlobalProjectDir: (projectId: string) => string;
export declare const resolveEphemeralProjectStateDir: (workspaceCwd: string) => string;
export declare const resolveProjectStateDir: (workspaceCwd: string, preferredName?: string) => string;
export declare const ensureProjectScaffold: (workspaceCwd: string, preferredName?: string, preferredProjectId?: string) => ProjectConfigDocument;
export declare const hasOctogentGitignoreEntry: (workspaceCwd: string) => boolean;
export declare const ensureOctogentGitignoreEntry: (workspaceCwd: string) => {
    changed: boolean;
};
export declare const migrateStateToGlobal: (workspaceCwd: string, projectStateDir: string) => void;
export {};
//# sourceMappingURL=projectPersistence.d.ts.map