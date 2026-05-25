export const parseMonitorConfigPatch = (payload) => {
    if (payload === null || payload === undefined || typeof payload !== "object") {
        return {
            patch: null,
            error: "Expected a JSON object body.",
        };
    }
    const record = payload;
    const patch = {};
    if (record.providerId !== undefined) {
        if (record.providerId !== "x") {
            return {
                patch: null,
                error: "providerId must be 'x'.",
            };
        }
        patch.providerId = "x";
    }
    if (record.queryTerms !== undefined) {
        if (!Array.isArray(record.queryTerms)) {
            return {
                patch: null,
                error: "queryTerms must be an array of strings.",
            };
        }
        const queryTerms = record.queryTerms.filter((term) => typeof term === "string");
        if (queryTerms.length !== record.queryTerms.length) {
            return {
                patch: null,
                error: "queryTerms must be an array of strings.",
            };
        }
        patch.queryTerms = queryTerms;
    }
    if (record.refreshPolicy !== undefined) {
        if (record.refreshPolicy === null ||
            typeof record.refreshPolicy !== "object" ||
            Array.isArray(record.refreshPolicy)) {
            return {
                patch: null,
                error: "refreshPolicy must be an object.",
            };
        }
        const refreshPolicyRecord = record.refreshPolicy;
        if (refreshPolicyRecord.maxCacheAgeMs !== undefined &&
            (typeof refreshPolicyRecord.maxCacheAgeMs !== "number" ||
                !Number.isFinite(refreshPolicyRecord.maxCacheAgeMs) ||
                refreshPolicyRecord.maxCacheAgeMs <= 0)) {
            return {
                patch: null,
                error: "refreshPolicy.maxCacheAgeMs must be a positive number.",
            };
        }
        if (refreshPolicyRecord.maxPosts !== undefined &&
            (typeof refreshPolicyRecord.maxPosts !== "number" ||
                !Number.isFinite(refreshPolicyRecord.maxPosts) ||
                refreshPolicyRecord.maxPosts <= 0)) {
            return {
                patch: null,
                error: "refreshPolicy.maxPosts must be a positive number.",
            };
        }
        if (refreshPolicyRecord.searchWindowDays !== undefined &&
            (typeof refreshPolicyRecord.searchWindowDays !== "number" ||
                !Number.isFinite(refreshPolicyRecord.searchWindowDays) ||
                ![1, 3, 7].includes(Math.floor(refreshPolicyRecord.searchWindowDays)))) {
            return {
                patch: null,
                error: "refreshPolicy.searchWindowDays must be one of: 1, 3, 7.",
            };
        }
        patch.refreshPolicy = {};
        if (refreshPolicyRecord.maxCacheAgeMs !== undefined) {
            patch.refreshPolicy.maxCacheAgeMs = refreshPolicyRecord.maxCacheAgeMs;
        }
        if (refreshPolicyRecord.maxPosts !== undefined) {
            patch.refreshPolicy.maxPosts = refreshPolicyRecord.maxPosts;
        }
        if (refreshPolicyRecord.searchWindowDays !== undefined) {
            patch.refreshPolicy.searchWindowDays = Math.floor(refreshPolicyRecord.searchWindowDays);
        }
    }
    if (record.credentials !== undefined) {
        if (record.credentials === null ||
            typeof record.credentials !== "object" ||
            Array.isArray(record.credentials)) {
            return {
                patch: null,
                error: "credentials must be an object.",
            };
        }
        patch.credentials = record.credentials;
    }
    if (record.validateCredentials !== undefined) {
        if (typeof record.validateCredentials !== "boolean") {
            return {
                patch: null,
                error: "validateCredentials must be a boolean.",
            };
        }
        patch.validateCredentials = record.validateCredentials;
    }
    return { patch, error: null };
};
//# sourceMappingURL=monitorParsers.js.map