import type { DeckAvailableSkill } from "@octogent/core";
export declare const readAvailableClaudeSkills: (workspaceCwd: string) => DeckAvailableSkill[];
export declare const parseSuggestedSkillsFromContext: (content: string) => string[];
export declare const applySuggestedSkillsToContext: (content: string, skills: readonly string[]) => string;
//# sourceMappingURL=claudeSkills.d.ts.map