import type { MonitorConfigSnapshot, MonitorFeedSnapshot } from "../types";
export type MonitorConfigPatchRequest = {
    providerId?: "x";
    queryTerms?: string[];
    refreshPolicy?: {
        maxCacheAgeMs?: number;
        maxPosts?: number;
        searchWindowDays?: 1 | 3 | 7;
    };
    credentials?: {
        bearerToken?: string;
        apiKey?: string;
        apiSecret?: string;
        accessToken?: string;
        accessTokenSecret?: string;
    };
    validateCredentials?: boolean;
};
export type UseMonitorRuntimeResult = {
    monitorConfig: MonitorConfigSnapshot | null;
    monitorFeed: MonitorFeedSnapshot | null;
    isRefreshingMonitorFeed: boolean;
    isSavingMonitorConfig: boolean;
    monitorError: string | null;
    refreshMonitorFeed: (manual?: boolean) => Promise<void>;
    patchMonitorConfig: (patch: MonitorConfigPatchRequest) => Promise<boolean>;
};
type UseMonitorRuntimeOptions = {
    enabled?: boolean;
};
export declare const useMonitorRuntime: ({ enabled, }?: UseMonitorRuntimeOptions) => UseMonitorRuntimeResult;
export {};
//# sourceMappingURL=useMonitorRuntime.d.ts.map