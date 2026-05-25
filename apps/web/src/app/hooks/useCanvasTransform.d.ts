type CanvasTransform = {
    translateX: number;
    translateY: number;
    scale: number;
};
type UseCanvasTransformResult = {
    transform: CanvasTransform;
    isPanning: boolean;
    svgRef: React.RefObject<SVGSVGElement | null>;
    handleWheel: (e: React.WheelEvent<SVGSVGElement>) => void;
    handlePointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
    handlePointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
    handlePointerUp: (e: React.PointerEvent<SVGSVGElement>) => void;
    screenToGraph: (screenX: number, screenY: number) => {
        x: number;
        y: number;
    };
    graphToScreen: (graphX: number, graphY: number) => {
        x: number;
        y: number;
    };
    zoomIn: () => void;
    zoomOut: () => void;
    fitAll: (nodes: {
        x: number;
        y: number;
    }[]) => void;
};
export declare const useCanvasTransform: () => UseCanvasTransformResult;
export {};
//# sourceMappingURL=useCanvasTransform.d.ts.map