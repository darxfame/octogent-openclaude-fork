export declare class MockWebSocket {
    static instances: MockWebSocket[];
    readonly url: string;
    private listeners;
    close: any;
    send: any;
    constructor(url: string);
    addEventListener(type: string, listener: (event: {
        data: unknown;
    }) => void): void;
    removeEventListener(type: string, listener: (event: {
        data: unknown;
    }) => void): void;
    emit(type: string, data?: unknown): void;
}
export declare const resetAppTestHarness: () => void;
export declare const jsonResponse: (payload: unknown, status?: number) => Response;
export declare const notFoundResponse: () => Response;
//# sourceMappingURL=appTestHarness.d.ts.map