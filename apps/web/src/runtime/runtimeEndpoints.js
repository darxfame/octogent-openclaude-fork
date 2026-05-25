const readRuntimeBaseUrl = () => {
    const value = import.meta.env.VITE_OCTOGENT_API_ORIGIN;
    if (typeof value !== "string") {
        return null;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
};
const withTrailingSlash = (value) => (value.endsWith("/") ? value : `${value}/`);
const buildAbsoluteUrl = (baseUrl, pathname) => {
    const normalizedPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    return new URL(normalizedPath, withTrailingSlash(baseUrl)).toString();
};
const localWebSocketUrl = (location, tentacleId) => {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${location.host}/api/terminals/${tentacleId}/ws`;
};
const localRuntimeWebSocketUrl = (location, pathname) => {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${location.host}${pathname}`;
};
const toWebSocketBase = (runtimeBaseUrl) => {
    try {
        const url = new URL(runtimeBaseUrl);
        if (url.protocol === "https:") {
            url.protocol = "wss:";
            return url.toString();
        }
        if (url.protocol === "http:") {
            url.protocol = "ws:";
            return url.toString();
        }
        return null;
    }
    catch {
        return null;
    }
};
export const buildTerminalSnapshotsUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/terminal-snapshots";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/terminal-snapshots");
};
export const buildTerminalEventsSocketUrl = (runtimeBaseUrl = readRuntimeBaseUrl(), location = window.location) => {
    if (!runtimeBaseUrl) {
        return localRuntimeWebSocketUrl(location, "/api/terminal-events/ws");
    }
    const websocketBase = toWebSocketBase(runtimeBaseUrl);
    if (!websocketBase) {
        return localRuntimeWebSocketUrl(location, "/api/terminal-events/ws");
    }
    return buildAbsoluteUrl(websocketBase, "/api/terminal-events/ws");
};
export const buildTerminalsUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/terminals";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/terminals");
};
export const buildCodexUsageUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/codex/usage";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/codex/usage");
};
export const buildClaudeUsageUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/claude/usage";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/claude/usage");
};
export const buildGithubSummaryUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/github/summary";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/github/summary");
};
export const buildUiStateUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/ui-state";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/ui-state");
};
export const buildWorkspaceSetupUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/setup";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/setup");
};
export const buildWorkspaceSetupStepUrl = (stepId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/setup/steps/${encodeURIComponent(stepId)}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildMonitorConfigUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/monitor/config";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/monitor/config");
};
export const buildMonitorFeedUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/monitor/feed";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/monitor/feed");
};
export const buildMonitorRefreshUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/monitor/refresh";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/monitor/refresh");
};
export const buildUsageHeatmapUrl = (scope = "all", runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/analytics/usage-heatmap?scope=${scope}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildConversationsUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/conversations";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/conversations");
};
export const buildConversationSearchUrl = (query, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/conversations/search?q=${encodeURIComponent(query)}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildConversationSessionUrl = (sessionId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedSessionId = encodeURIComponent(sessionId);
    const path = `/api/conversations/${encodedSessionId}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildConversationExportUrl = (sessionId, format, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedSessionId = encodeURIComponent(sessionId);
    const path = `/api/conversations/${encodedSessionId}/export?format=${format}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildTentacleRenameUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedTentacleId = encodeURIComponent(tentacleId);
    if (!runtimeBaseUrl) {
        return `/api/tentacles/${encodedTentacleId}`;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, `/api/tentacles/${encodedTentacleId}`);
};
const buildTentacleGitActionUrl = (tentacleId, action, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedTentacleId = encodeURIComponent(tentacleId);
    const path = `/api/tentacles/${encodedTentacleId}/git/${action}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildTentacleGitStatusUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => buildTentacleGitActionUrl(tentacleId, "status", runtimeBaseUrl);
export const buildTentacleGitCommitUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => buildTentacleGitActionUrl(tentacleId, "commit", runtimeBaseUrl);
export const buildTentacleGitPushUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => buildTentacleGitActionUrl(tentacleId, "push", runtimeBaseUrl);
export const buildTentacleGitSyncUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => buildTentacleGitActionUrl(tentacleId, "sync", runtimeBaseUrl);
export const buildTentacleGitPullRequestUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedTentacleId = encodeURIComponent(tentacleId);
    const path = `/api/tentacles/${encodedTentacleId}/git/pr`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildTentacleGitPullRequestMergeUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedTentacleId = encodeURIComponent(tentacleId);
    const path = `/api/tentacles/${encodedTentacleId}/git/pr/merge`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckTentaclesUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/deck/tentacles";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/deck/tentacles");
};
export const buildDeckSkillsUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/deck/skills";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/deck/skills");
};
export const buildDeckTentacleUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedTentacleId = encodeURIComponent(tentacleId);
    const path = `/api/deck/tentacles/${encodedTentacleId}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckTentacleSkillsUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/deck/tentacles/${encodeURIComponent(tentacleId)}/skills`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckVaultFileUrl = (tentacleId, fileName, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedTentacleId = encodeURIComponent(tentacleId);
    const encodedFileName = encodeURIComponent(fileName);
    const path = `/api/deck/tentacles/${encodedTentacleId}/files/${encodedFileName}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckTodoToggleUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/deck/tentacles/${encodeURIComponent(tentacleId)}/todo/toggle`;
    if (!runtimeBaseUrl)
        return path;
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckTodoEditUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/deck/tentacles/${encodeURIComponent(tentacleId)}/todo/edit`;
    if (!runtimeBaseUrl)
        return path;
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckTodoAddUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/deck/tentacles/${encodeURIComponent(tentacleId)}/todo`;
    if (!runtimeBaseUrl)
        return path;
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckTodoDeleteUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/deck/tentacles/${encodeURIComponent(tentacleId)}/todo/delete`;
    if (!runtimeBaseUrl)
        return path;
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildDeckTodoSolveUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const path = `/api/deck/tentacles/${encodeURIComponent(tentacleId)}/todo/solve`;
    if (!runtimeBaseUrl)
        return path;
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildPromptsUrl = (runtimeBaseUrl = readRuntimeBaseUrl()) => {
    if (!runtimeBaseUrl) {
        return "/api/prompts";
    }
    return buildAbsoluteUrl(runtimeBaseUrl, "/api/prompts");
};
export const buildPromptItemUrl = (name, runtimeBaseUrl = readRuntimeBaseUrl()) => {
    const encodedName = encodeURIComponent(name);
    const path = `/api/prompts/${encodedName}`;
    if (!runtimeBaseUrl) {
        return path;
    }
    return buildAbsoluteUrl(runtimeBaseUrl, path);
};
export const buildTerminalSocketUrl = (tentacleId, runtimeBaseUrl = readRuntimeBaseUrl(), location = window.location) => {
    const encodedTentacleId = encodeURIComponent(tentacleId);
    if (!runtimeBaseUrl) {
        return localWebSocketUrl(location, encodedTentacleId);
    }
    const webSocketBase = toWebSocketBase(runtimeBaseUrl);
    if (!webSocketBase) {
        return localWebSocketUrl(location, encodedTentacleId);
    }
    return buildAbsoluteUrl(webSocketBase, `/api/terminals/${encodedTentacleId}/ws`);
};
//# sourceMappingURL=runtimeEndpoints.js.map