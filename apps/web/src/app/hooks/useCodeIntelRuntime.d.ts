import { type CodeIntelEvent, type CouplingData, type TreemapNode } from "../codeIntelAggregation";
type CodeIntelRuntimeResult = {
    events: CodeIntelEvent[];
    treemapRoot: TreemapNode | null;
    couplingData: CouplingData | null;
    isLoading: boolean;
    error: string | null;
    refresh: () => void;
};
export declare const useCodeIntelRuntime: (enabled: boolean) => CodeIntelRuntimeResult;
export {};
//# sourceMappingURL=useCodeIntelRuntime.d.ts.map