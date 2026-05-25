export type OctopusAnimation = "idle" | "sway" | "walk" | "jog" | "swim-up" | "bounce" | "float";
export type OctopusExpression = "normal" | "happy" | "sleepy" | "angry" | "surprised";
export type OctopusAccessory = "none" | "long" | "mohawk" | "side-sweep" | "curly";
type OctopusGlyphProps = {
    animation?: OctopusAnimation;
    expression?: OctopusExpression;
    accessory?: OctopusAccessory;
    /** Hair color override. Default: dark brown. */
    hairColor?: string;
    /** Override the pixel scale (CSS px per sprite pixel). Default: 14. */
    scale?: number;
    className?: string;
    color?: string;
    testId?: string;
};
export declare const OctopusGlyph: ({ animation, expression, accessory, hairColor, scale, className, color, testId, }: OctopusGlyphProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=EmptyOctopus.d.ts.map