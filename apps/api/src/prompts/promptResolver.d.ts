/**
 * Interpolate `{{key}}` placeholders in a template string with values from the
 * provided variables map. Unknown placeholders are left as-is.
 */
export declare const interpolatePrompt: (template: string, variables: Record<string, string>) => string;
/**
 * Read a prompt template from `<promptsDir>/<name>.md` and return the raw
 * template string. Returns `undefined` if the file does not exist.
 */
export declare const readPromptTemplate: (promptsDir: string, name: string) => Promise<string | undefined>;
/**
 * Read and resolve a prompt template, interpolating the given variables.
 * Returns `undefined` if the template does not exist.
 */
export declare const resolvePrompt: (promptsDir: string, name: string, variables: Record<string, string>) => Promise<string | undefined>;
/**
 * List all available prompt template names (file basenames without `.md`).
 */
export declare const listPromptTemplates: (promptsDir: string) => Promise<string[]>;
type PromptEntry = {
    name: string;
    source: "builtin" | "user";
};
/**
 * List prompts from both built-in and user directories.
 * User prompts shadow built-in prompts with the same name.
 */
export declare const listAllPrompts: (builtinDir: string, userDir: string) => Promise<PromptEntry[]>;
/**
 * Read a prompt from user dir first, falling back to builtin dir.
 */
export declare const readPromptFromDirs: (builtinDir: string, userDir: string, name: string) => Promise<{
    name: string;
    source: "builtin" | "user";
    content: string;
} | undefined>;
/**
 * Write a user prompt to the user prompts directory.
 */
export declare const writeUserPrompt: (userDir: string, name: string, content: string) => Promise<boolean>;
/**
 * Delete a user prompt from the user prompts directory.
 */
export declare const deleteUserPrompt: (userDir: string, name: string) => Promise<boolean>;
export {};
//# sourceMappingURL=promptResolver.d.ts.map