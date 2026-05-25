import { createFileMonitorRepository } from "./repository";
import { createXMonitorProvider } from "./xProvider";
export class MonitorInputError extends Error {
}
const normalizeQueryTerms = (queryTerms) => {
    const normalized = queryTerms.map((term) => term.trim()).filter((term) => term.length > 0);
    return [...new Set(normalized)];
};
const normalizeDateMs = (value) => {
    if (!value) {
        return null;
    }
    const ms = Date.parse(value);
    return Number.isFinite(ms) ? ms : null;
};
const queryTermsMatch = (left, right) => {
    if (left.length !== right.length) {
        return false;
    }
    return left.every((term, index) => term === right[index]);
};
export const isMonitorCacheStale = ({ now, maxCacheAgeMs, lastFetchedAt, cachedQueryTerms, currentQueryTerms, }) => {
    if (!queryTermsMatch(cachedQueryTerms, currentQueryTerms)) {
        return true;
    }
    const fetchedAtMs = normalizeDateMs(lastFetchedAt);
    if (fetchedAtMs === null) {
        return true;
    }
    return now.getTime() - fetchedAtMs >= maxCacheAgeMs;
};
const toRankDedupeKey = (post) => `${post.source}:${post.id}`;
export const rankAndLimitPostsByLikes = (posts, limit = 30) => {
    const dedupedById = new Map();
    for (const post of posts) {
        const key = toRankDedupeKey(post);
        const existing = dedupedById.get(key);
        if (!existing) {
            dedupedById.set(key, post);
            continue;
        }
        if (post.likeCount > existing.likeCount) {
            dedupedById.set(key, post);
            continue;
        }
        if (post.likeCount === existing.likeCount) {
            const postCreatedAtMs = normalizeDateMs(post.createdAt) ?? 0;
            const existingCreatedAtMs = normalizeDateMs(existing.createdAt) ?? 0;
            if (postCreatedAtMs > existingCreatedAtMs) {
                dedupedById.set(key, post);
            }
        }
    }
    return [...dedupedById.values()]
        .sort((left, right) => {
        if (left.likeCount !== right.likeCount) {
            return right.likeCount - left.likeCount;
        }
        const leftMs = normalizeDateMs(left.createdAt) ?? 0;
        const rightMs = normalizeDateMs(right.createdAt) ?? 0;
        return rightMs - leftMs;
    })
        .slice(0, Math.max(1, limit));
};
const buildStaleAfter = (lastFetchedAt, maxCacheAgeMs) => {
    const fetchedAtMs = normalizeDateMs(lastFetchedAt);
    if (fetchedAtMs === null) {
        return null;
    }
    return new Date(fetchedAtMs + maxCacheAgeMs).toISOString();
};
const sanitizeConfig = (config, providers) => {
    const provider = providers.get(config.providerId);
    if (!provider) {
        throw new MonitorInputError(`Unsupported monitor provider: ${config.providerId}`);
    }
    return {
        providerId: config.providerId,
        queryTerms: [...config.queryTerms],
        refreshPolicy: {
            maxCacheAgeMs: config.refreshPolicy.maxCacheAgeMs,
            maxPosts: config.refreshPolicy.maxPosts,
            searchWindowDays: config.refreshPolicy.searchWindowDays,
        },
        providers: {
            x: {
                credentials: provider.summarizeCredentials(config.providers.x.credentials),
            },
        },
    };
};
const toFeedSnapshot = (config, cache, now) => {
    const isStale = isMonitorCacheStale({
        now,
        maxCacheAgeMs: config.refreshPolicy.maxCacheAgeMs,
        lastFetchedAt: cache.fetchedAt,
        cachedQueryTerms: cache.queryTerms,
        currentQueryTerms: config.queryTerms,
    });
    return {
        providerId: config.providerId,
        queryTerms: [...config.queryTerms],
        refreshPolicy: {
            maxCacheAgeMs: config.refreshPolicy.maxCacheAgeMs,
            maxPosts: config.refreshPolicy.maxPosts,
            searchWindowDays: config.refreshPolicy.searchWindowDays,
        },
        lastFetchedAt: cache.fetchedAt,
        staleAfter: buildStaleAfter(cache.fetchedAt, config.refreshPolicy.maxCacheAgeMs),
        isStale,
        lastError: cache.lastError,
        posts: [...cache.posts],
        usage: cache.usage,
    };
};
export const createMonitorService = ({ projectStateDir, repository = createFileMonitorRepository(projectStateDir), providers = [createXMonitorProvider()], }) => {
    const providersById = new Map(providers.map((provider) => [provider.providerId, provider]));
    const resolveProvider = (providerId) => {
        const provider = providersById.get(providerId);
        if (!provider) {
            throw new MonitorInputError(`Unsupported monitor provider: ${providerId}`);
        }
        return provider;
    };
    return {
        async readConfig() {
            const config = repository.readConfig();
            return sanitizeConfig(config, providersById);
        },
        async patchConfig(patch) {
            const now = new Date();
            const config = repository.readConfig();
            if (patch.providerId) {
                config.providerId = patch.providerId;
            }
            if (patch.queryTerms) {
                const queryTerms = normalizeQueryTerms(patch.queryTerms);
                if (queryTerms.length === 0) {
                    throw new MonitorInputError("At least one monitor query term is required.");
                }
                config.queryTerms = queryTerms;
            }
            if (patch.refreshPolicy?.maxCacheAgeMs !== undefined) {
                const maxCacheAgeMs = Math.floor(patch.refreshPolicy.maxCacheAgeMs);
                if (!Number.isFinite(maxCacheAgeMs) || maxCacheAgeMs <= 0) {
                    throw new MonitorInputError("refreshPolicy.maxCacheAgeMs must be a positive number.");
                }
                config.refreshPolicy.maxCacheAgeMs = maxCacheAgeMs;
            }
            if (patch.refreshPolicy?.maxPosts !== undefined) {
                const maxPosts = Math.floor(patch.refreshPolicy.maxPosts);
                if (!Number.isFinite(maxPosts) || maxPosts <= 0) {
                    throw new MonitorInputError("refreshPolicy.maxPosts must be a positive number.");
                }
                config.refreshPolicy.maxPosts = maxPosts;
            }
            if (patch.refreshPolicy?.searchWindowDays !== undefined) {
                const searchWindowDays = Math.floor(patch.refreshPolicy.searchWindowDays);
                if (searchWindowDays !== 1 && searchWindowDays !== 3 && searchWindowDays !== 7) {
                    throw new MonitorInputError("refreshPolicy.searchWindowDays must be one of: 1, 3, 7.");
                }
                config.refreshPolicy.searchWindowDays = searchWindowDays;
            }
            if (patch.credentials !== undefined) {
                const provider = resolveProvider(config.providerId);
                let credentials;
                try {
                    ({ credentials } = provider.saveCredentials(patch.credentials, now));
                }
                catch (error) {
                    const message = error instanceof Error ? error.message : "Unable to save monitor credentials.";
                    throw new MonitorInputError(message);
                }
                if (patch.validateCredentials !== false) {
                    const validation = await provider.validateCredentials(credentials);
                    if (!validation.ok) {
                        throw new MonitorInputError(validation.error ?? "Monitor credentials are invalid.");
                    }
                }
                config.providers.x.credentials =
                    credentials;
            }
            repository.writeConfig(config);
            return sanitizeConfig(config, providersById);
        },
        async readFeed(options = {}) {
            const now = new Date();
            const config = repository.readConfig();
            const cache = repository.readCache();
            const provider = resolveProvider(config.providerId);
            const shouldRefresh = options.forceRefresh === true ||
                (options.refreshIfStale !== false &&
                    isMonitorCacheStale({
                        now,
                        maxCacheAgeMs: config.refreshPolicy.maxCacheAgeMs,
                        lastFetchedAt: cache.fetchedAt,
                        cachedQueryTerms: cache.queryTerms,
                        currentQueryTerms: config.queryTerms,
                    }));
            if (!shouldRefresh) {
                return toFeedSnapshot(config, cache, now);
            }
            if (!config.providers.x.credentials) {
                const nextCache = {
                    ...cache,
                    providerId: config.providerId,
                    queryTerms: [...config.queryTerms],
                    lastError: "X credentials are not configured.",
                };
                repository.writeCache(nextCache);
                return toFeedSnapshot(config, nextCache, now);
            }
            if (config.queryTerms.length === 0) {
                const nextCache = {
                    ...cache,
                    providerId: config.providerId,
                    queryTerms: [...config.queryTerms],
                    lastError: "At least one monitor query term is required.",
                };
                repository.writeCache(nextCache);
                return toFeedSnapshot(config, nextCache, now);
            }
            try {
                const [posts, usage] = await Promise.all([
                    provider.fetchRecentPosts({
                        credentials: config.providers.x.credentials,
                        queryTerms: config.queryTerms,
                        postLimit: config.refreshPolicy.maxPosts,
                        searchWindowDays: config.refreshPolicy.searchWindowDays,
                        now,
                    }),
                    provider.fetchUsage({
                        credentials: config.providers.x.credentials,
                        now,
                    }),
                ]);
                const nextCache = {
                    version: 1,
                    providerId: config.providerId,
                    queryTerms: [...config.queryTerms],
                    fetchedAt: now.toISOString(),
                    lastError: null,
                    posts: rankAndLimitPostsByLikes(posts, config.refreshPolicy.maxPosts),
                    usage,
                };
                repository.writeCache(nextCache);
                return toFeedSnapshot(config, nextCache, now);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "Unable to refresh monitor feed.";
                const nextCache = {
                    ...cache,
                    providerId: config.providerId,
                    queryTerms: [...config.queryTerms],
                    lastError: message,
                };
                repository.writeCache(nextCache);
                return toFeedSnapshot(config, nextCache, now);
            }
        },
    };
};
//# sourceMappingURL=service.js.map