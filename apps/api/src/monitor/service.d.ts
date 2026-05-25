import type { MonitorPost, MonitorProviderAdapter, MonitorRepository, MonitorService } from "./types";
export declare class MonitorInputError extends Error {
}
export declare const isMonitorCacheStale: ({ now, maxCacheAgeMs, lastFetchedAt, cachedQueryTerms, currentQueryTerms, }: {
    now: Date;
    maxCacheAgeMs: number;
    lastFetchedAt: string | null;
    cachedQueryTerms: string[];
    currentQueryTerms: string[];
}) => boolean;
export declare const rankAndLimitPostsByLikes: (posts: MonitorPost[], limit?: number) => MonitorPost[];
export declare const createMonitorService: ({ projectStateDir, repository, providers, }: {
    projectStateDir: string;
    repository?: MonitorRepository;
    providers?: MonitorProviderAdapter[];
}) => MonitorService;
//# sourceMappingURL=service.d.ts.map