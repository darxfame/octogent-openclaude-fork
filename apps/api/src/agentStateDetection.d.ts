import type { AgentRuntimeState } from "@octogent/core";
export type { AgentRuntimeState };
export declare class AgentStateTracker {
    private readonly maxBufferLength;
    private readonly idleAfterMs;
    private carry;
    private state;
    private idleDeadlineAt;
    constructor({ initialState, maxBufferLength, idleAfterMs, }?: {
        initialState?: AgentRuntimeState;
        maxBufferLength?: number;
        idleAfterMs?: number;
    });
    get currentState(): AgentRuntimeState;
    private enterProcessing;
    forceState(nextState: AgentRuntimeState, now?: number): boolean;
    observeSubmit(now?: number): AgentRuntimeState | null;
    observeChunk(chunk: string, now?: number): AgentRuntimeState | null;
    poll(now?: number): AgentRuntimeState | null;
}
//# sourceMappingURL=agentStateDetection.d.ts.map