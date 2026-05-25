import type { MonitorProviderAdapter } from "./types";
export declare const buildXRecentSearchQuery: (queryTerms: string[]) => string;
export declare const createXMonitorProvider: ({ fetchFn, apiBaseUrl, usageEndpointPath, }?: {
    fetchFn?: typeof fetch;
    apiBaseUrl?: string;
    usageEndpointPath?: string;
}) => MonitorProviderAdapter;
//# sourceMappingURL=xProvider.d.ts.map