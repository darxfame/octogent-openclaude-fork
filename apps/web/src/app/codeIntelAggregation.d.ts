export type CodeIntelEvent = {
    ts: string;
    sessionId: string;
    tool: string;
    file: string;
};
export type TreemapNode = {
    name: string;
    path: string;
    value: number;
    children: TreemapNode[];
};
export type TreemapRect = {
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    path: string;
    value: number;
    depth: number;
};
/** Build a flat list of files with edit counts, wrapped in a root node for the treemap layout. */
export declare const buildTreemapTree: (events: CodeIntelEvent[], workspaceCwd: string) => TreemapNode;
/** Squarified treemap layout — returns flat array of positioned rectangles. */
export declare const layoutTreemap: (root: TreemapNode, width: number, height: number) => TreemapRect[];
export type CouplingPair = {
    fileA: string;
    fileB: string;
    coSessions: number;
    totalSessions: number;
    strength: number;
};
export type CouplingFile = {
    file: string;
    edits: number;
    sessions: number;
};
export type CouplingData = {
    files: CouplingFile[];
    pairs: CouplingPair[];
};
/** Find files that co-occur in the same session. */
export declare const buildCouplingData: (events: CodeIntelEvent[], workspaceCwd: string) => CouplingData;
export declare const heatColor: (value: number, maxValue: number) => string;
//# sourceMappingURL=codeIntelAggregation.d.ts.map