export type RuntimeMetadata = {
    apiBaseUrl: string;
    host: string;
    port: number;
    pid: number;
    startedAt: string;
    workspaceCwd: string;
};
export declare const resolveRuntimeMetadataPath: (projectStateDir: string) => string;
export declare const readRuntimeMetadata: (projectStateDir: string) => RuntimeMetadata | null;
export declare const writeRuntimeMetadata: (projectStateDir: string, metadata: RuntimeMetadata) => void;
export declare const clearRuntimeMetadata: (projectStateDir: string) => void;
//# sourceMappingURL=runtimeMetadata.d.ts.map