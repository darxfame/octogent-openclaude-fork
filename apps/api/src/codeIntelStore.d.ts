export type CodeIntelEvent = {
    ts: string;
    sessionId: string;
    tool: string;
    file: string;
};
export type CodeIntelStore = {
    append: (event: CodeIntelEvent) => Promise<void>;
    readAll: () => Promise<CodeIntelEvent[]>;
};
export declare const createCodeIntelStore: (projectStateDir: string) => CodeIntelStore;
//# sourceMappingURL=codeIntelStore.d.ts.map