import type { DeckTentacleSummary } from "@octogent/core";
import type { OctopusAccessory, OctopusAnimation, OctopusExpression } from "../EmptyOctopus";
export declare const OCTOPUS_COLORS: string[];
export declare const ANIMATIONS: OctopusAnimation[];
export declare const EXPRESSIONS: OctopusExpression[];
export declare const ACCESSORIES: OctopusAccessory[];
export declare function hashString(str: string): number;
export declare function seededRandom(seed: number): () => number;
export type OctopusVisuals = {
    color: string;
    animation: OctopusAnimation;
    expression: OctopusExpression;
    accessory: OctopusAccessory;
    hairColor?: string | undefined;
};
export declare function deriveOctopusVisuals(tentacle: DeckTentacleSummary): OctopusVisuals;
//# sourceMappingURL=octopusVisuals.d.ts.map