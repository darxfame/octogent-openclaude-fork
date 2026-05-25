import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
export const createCodeIntelStore = (projectStateDir) => {
    const filePath = join(projectStateDir, "state", "code-intel-events.jsonl");
    return {
        async append(event) {
            const dir = join(projectStateDir, "state");
            await mkdir(dir, { recursive: true });
            await appendFile(filePath, `${JSON.stringify(event)}\n`, "utf-8");
        },
        async readAll() {
            let raw;
            try {
                raw = await readFile(filePath, "utf-8");
            }
            catch {
                return [];
            }
            const events = [];
            for (const line of raw.split("\n")) {
                if (line.trim().length === 0)
                    continue;
                try {
                    events.push(JSON.parse(line));
                }
                catch {
                    // skip malformed lines
                }
            }
            return events;
        },
    };
};
//# sourceMappingURL=codeIntelStore.js.map