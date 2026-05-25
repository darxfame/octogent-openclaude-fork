import type { DeckAvailableSkill, DeckTentacleSummary } from "@octogent/core";
import type { OctopusVisuals } from "./octopusVisuals";
export declare const STATUS_LABELS: Record<DeckTentacleSummary["status"], string>;
export declare const TodoList: ({ items, tentacleId, onToggle, }: {
    items: {
        text: string;
        done: boolean;
    }[];
    tentacleId: string;
    onToggle?: ((tentacleId: string, itemIndex: number, done: boolean) => void) | undefined;
}) => import("react").JSX.Element;
export type TentaclePodProps = {
    tentacle: DeckTentacleSummary;
    visuals: OctopusVisuals;
    isFocused: boolean;
    activeFileName?: string | undefined;
    onVaultFileClick?: (fileName: string) => void;
    onVaultBrowse?: () => void;
    onClose?: () => void;
    onDelete?: () => void;
    isDeleting?: boolean | undefined;
    onTodoToggle?: (tentacleId: string, itemIndex: number, done: boolean) => void;
    availableSkills: DeckAvailableSkill[];
    isSavingSkills?: boolean | undefined;
    onSaveSuggestedSkills?: ((tentacleId: string, suggestedSkills: string[]) => Promise<boolean>) | undefined;
};
export declare const TentaclePod: ({ tentacle, visuals, isFocused, activeFileName, onVaultFileClick, onVaultBrowse, onClose, onDelete, isDeleting, onTodoToggle, availableSkills, isSavingSkills, onSaveSuggestedSkills, }: TentaclePodProps) => import("react").JSX.Element;
//# sourceMappingURL=TentaclePod.d.ts.map