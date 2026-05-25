type TerminalActiveBufferLike = {
    baseY?: number;
    type?: string;
    viewportY?: number;
};
export declare const wheelDeltaToScrollLines: (deltaY: number, deltaMode: number) => number;
export declare const shouldUseManualWheelScroll: (activeBuffer: TerminalActiveBufferLike | null | undefined) => boolean;
export declare const readViewportY: (activeBuffer: TerminalActiveBufferLike | null | undefined) => number | null;
export {};
//# sourceMappingURL=terminalWheel.d.ts.map