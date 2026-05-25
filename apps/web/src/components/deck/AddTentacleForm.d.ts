import type { DeckAvailableSkill } from "@octogent/core";
import type { OctopusAccessory, OctopusExpression } from "../EmptyOctopus";
export type OctopusAppearancePayload = {
    animation: string;
    expression: string;
    accessory: string;
    hairColor: string;
};
export type AddTentacleFormProps = {
    onSubmit: (name: string, description: string, color: string, octopus: OctopusAppearancePayload, suggestedSkills: string[]) => void;
    onCancel: () => void;
    isSubmitting: boolean;
    error: string | null;
    availableSkills: DeckAvailableSkill[];
};
export declare const EXPRESSION_OPTIONS: {
    value: OctopusExpression;
    label: string;
}[];
export declare const ACCESSORY_OPTIONS: {
    value: OctopusAccessory;
    label: string;
}[];
export declare const HAIR_COLORS: string[];
export declare const AddTentacleForm: ({ onSubmit, onCancel, isSubmitting, error, availableSkills, }: AddTentacleFormProps) => import("react").JSX.Element;
//# sourceMappingURL=AddTentacleForm.d.ts.map