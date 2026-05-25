import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const RUNTIME_METADATA_FILENAME = "runtime.json";
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
export const resolveRuntimeMetadataPath = (projectStateDir) => join(projectStateDir, "state", RUNTIME_METADATA_FILENAME);
export const readRuntimeMetadata = (projectStateDir) => {
    const filePath = resolveRuntimeMetadataPath(projectStateDir);
    if (!existsSync(filePath)) {
        return null;
    }
    try {
        const parsed = JSON.parse(readFileSync(filePath, "utf8"));
        if (!isRecord(parsed) ||
            typeof parsed.apiBaseUrl !== "string" ||
            typeof parsed.host !== "string" ||
            typeof parsed.port !== "number" ||
            !Number.isFinite(parsed.port) ||
            typeof parsed.pid !== "number" ||
            !Number.isFinite(parsed.pid) ||
            typeof parsed.startedAt !== "string" ||
            typeof parsed.workspaceCwd !== "string") {
            return null;
        }
        return {
            apiBaseUrl: parsed.apiBaseUrl,
            host: parsed.host,
            port: parsed.port,
            pid: parsed.pid,
            startedAt: parsed.startedAt,
            workspaceCwd: parsed.workspaceCwd,
        };
    }
    catch {
        return null;
    }
};
export const writeRuntimeMetadata = (projectStateDir, metadata) => {
    const filePath = resolveRuntimeMetadataPath(projectStateDir);
    mkdirSync(join(projectStateDir, "state"), { recursive: true });
    writeFileSync(filePath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
};
export const clearRuntimeMetadata = (projectStateDir) => {
    const filePath = resolveRuntimeMetadataPath(projectStateDir);
    if (!existsSync(filePath)) {
        return;
    }
    rmSync(filePath, { force: true });
};
//# sourceMappingURL=runtimeMetadata.js.map