type UsePollingDataOptions<T> = {
    fetchUrl: string;
    intervalMs: number;
    normalize: (raw: unknown) => T | null;
    fallback: () => T;
    enabled?: boolean;
};
export declare const usePollingData: <T>(options: UsePollingDataOptions<T>) => {
    data: any;
    isLoading: any;
    refresh: any;
};
export {};
//# sourceMappingURL=usePollingData.d.ts.map