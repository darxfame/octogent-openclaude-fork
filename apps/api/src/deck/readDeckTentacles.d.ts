import type { DeckAvailableSkill, DeckOctopusAppearance, DeckTentacleSummary } from "@octogent/core";
export declare const parseTodoProgress: (content: string) => {
    total: number;
    done: number;
    items: {
        text: string;
        done: boolean;
    }[];
};
export declare const readDeckTentacles: (workspaceCwd: string, projectStateDir?: string) => DeckTentacleSummary[];
export declare const readDeckVaultFile: (workspaceCwd: string, tentacleId: string, fileName: string) => string | null;
/**
 * Toggle a todo checkbox in a tentacle's todo.md by item index.
 */
export declare const toggleTodoItem: (workspaceCwd: string, tentacleId: string, itemIndex: number, done: boolean) => {
    total: number;
    done: number;
    items: {
        text: string;
        done: boolean;
    }[];
} | null;
/**
 * Edit the text of a todo item in a tentacle's todo.md by item index.
 */
export declare const editTodoItem: (workspaceCwd: string, tentacleId: string, itemIndex: number, text: string) => {
    total: number;
    done: number;
    items: {
        text: string;
        done: boolean;
    }[];
} | null;
/**
 * Add a new todo item to a tentacle's todo.md.
 */
export declare const addTodoItem: (workspaceCwd: string, tentacleId: string, text: string) => {
    total: number;
    done: number;
    items: {
        text: string;
        done: boolean;
    }[];
} | null;
/**
 * Delete a todo item from a tentacle's todo.md by item index.
 */
export declare const deleteTodoItem: (workspaceCwd: string, tentacleId: string, itemIndex: number) => {
    total: number;
    done: number;
    items: {
        text: string;
        done: boolean;
    }[];
} | null;
type CreateDeckTentacleInput = {
    name: string;
    description: string;
    color: string;
    octopus: DeckOctopusAppearance;
    suggestedSkills?: string[];
};
type CreateDeckTentacleResult = {
    ok: true;
    tentacle: DeckTentacleSummary;
} | {
    ok: false;
    error: string;
};
export declare const createDeckTentacle: (workspaceCwd: string, input: CreateDeckTentacleInput, projectStateDir?: string) => CreateDeckTentacleResult;
export declare const listDeckAvailableSkills: (workspaceCwd: string) => DeckAvailableSkill[];
export declare const updateDeckTentacleSuggestedSkills: (workspaceCwd: string, tentacleId: string, suggestedSkills: string[], projectStateDir?: string) => DeckTentacleSummary | null;
export declare const deleteDeckTentacle: (workspaceCwd: string, tentacleId: string, projectStateDir?: string) => {
    ok: true;
} | {
    ok: false;
    error: string;
};
export {};
//# sourceMappingURL=readDeckTentacles.d.ts.map