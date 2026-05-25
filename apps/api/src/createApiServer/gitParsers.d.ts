export declare const parseTentacleCommitMessage: (payload: unknown) => {
    message: string | null;
    error: string | null;
};
export declare const parseTentacleSyncBaseRef: (payload: unknown) => {
    baseRef: string | null;
    error: string | null;
};
export declare const parseTentaclePullRequestCreateInput: (payload: unknown) => {
    title: string | null;
    body: string;
    baseRef: string | null;
    error: string | null;
};
//# sourceMappingURL=gitParsers.d.ts.map