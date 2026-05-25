import { asNumber, asRecord, asString } from "@octogent/core";
const normalizeMonitorUsageSnapshot = (value) => {
    const record = asRecord(value);
    if (!record) {
        return null;
    }
    const status = record.status;
    if (status !== "ok" && status !== "unavailable" && status !== "error") {
        return null;
    }
    return {
        status,
        source: record.source === "x-api" ? "x-api" : "none",
        fetchedAt: asString(record.fetchedAt) ?? new Date().toISOString(),
        message: asString(record.message),
        cap: asNumber(record.cap),
        used: asNumber(record.used),
        remaining: asNumber(record.remaining),
        resetAt: asString(record.resetAt),
    };
};
const normalizeMonitorPost = (value) => {
    const record = asRecord(value);
    if (!record) {
        return null;
    }
    const id = asString(record.id);
    const text = asString(record.text);
    const author = asString(record.author);
    const createdAt = asString(record.createdAt);
    const permalink = asString(record.permalink);
    const likeCount = asNumber(record.likeCount);
    const matchedQueryTerm = asString(record.matchedQueryTerm);
    if (!id || !text || !author || !createdAt || !permalink || likeCount === null) {
        return null;
    }
    return {
        source: "x",
        id,
        text,
        author,
        createdAt,
        permalink,
        likeCount: Math.max(0, Math.floor(likeCount)),
        matchedQueryTerm,
    };
};
export const normalizeMonitorConfigSnapshot = (value) => {
    const record = asRecord(value);
    if (!record || record.providerId !== "x") {
        return null;
    }
    const queryTerms = Array.isArray(record.queryTerms)
        ? record.queryTerms.filter((term) => typeof term === "string")
        : [];
    const refreshPolicy = asRecord(record.refreshPolicy);
    const searchWindowDaysRaw = asNumber(refreshPolicy?.searchWindowDays);
    const searchWindowDays = searchWindowDaysRaw === 1 || searchWindowDaysRaw === 3 || searchWindowDaysRaw === 7
        ? searchWindowDaysRaw
        : 7;
    const providers = asRecord(record.providers);
    const xProvider = providers ? asRecord(providers.x) : null;
    const credentials = xProvider ? asRecord(xProvider.credentials) : null;
    if (!credentials) {
        return null;
    }
    return {
        providerId: "x",
        queryTerms,
        refreshPolicy: {
            maxCacheAgeMs: asNumber(refreshPolicy?.maxCacheAgeMs) ?? 24 * 60 * 60 * 1000,
            maxPosts: asNumber(refreshPolicy?.maxPosts) ?? 30,
            searchWindowDays,
        },
        providers: {
            x: {
                credentials: {
                    isConfigured: credentials.isConfigured === true,
                    bearerTokenHint: asString(credentials.bearerTokenHint),
                    apiKeyHint: asString(credentials.apiKeyHint),
                    hasApiSecret: credentials.hasApiSecret === true,
                    hasAccessToken: credentials.hasAccessToken === true,
                    hasAccessTokenSecret: credentials.hasAccessTokenSecret === true,
                    updatedAt: asString(credentials.updatedAt),
                },
            },
        },
    };
};
export const normalizeMonitorFeedSnapshot = (value) => {
    const record = asRecord(value);
    if (!record || record.providerId !== "x") {
        return null;
    }
    const queryTerms = Array.isArray(record.queryTerms)
        ? record.queryTerms.filter((term) => typeof term === "string")
        : [];
    const refreshPolicy = asRecord(record.refreshPolicy);
    const searchWindowDaysRaw = asNumber(refreshPolicy?.searchWindowDays);
    const searchWindowDays = searchWindowDaysRaw === 1 || searchWindowDaysRaw === 3 || searchWindowDaysRaw === 7
        ? searchWindowDaysRaw
        : 7;
    const posts = Array.isArray(record.posts)
        ? record.posts
            .map((post) => normalizeMonitorPost(post))
            .filter((post) => post !== null)
        : [];
    return {
        providerId: "x",
        queryTerms,
        refreshPolicy: {
            maxCacheAgeMs: asNumber(refreshPolicy?.maxCacheAgeMs) ?? 24 * 60 * 60 * 1000,
            maxPosts: asNumber(refreshPolicy?.maxPosts) ?? 30,
            searchWindowDays,
        },
        lastFetchedAt: asString(record.lastFetchedAt),
        staleAfter: asString(record.staleAfter),
        isStale: record.isStale === true,
        lastError: asString(record.lastError),
        posts,
        usage: normalizeMonitorUsageSnapshot(record.usage),
    };
};
//# sourceMappingURL=monitorNormalizers.js.map