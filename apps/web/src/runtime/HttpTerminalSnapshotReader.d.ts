import type { TerminalSnapshot, TerminalSnapshotReader } from "@octogent/core";
type HttpResponse = {
    ok: boolean;
    status: number;
    json: () => Promise<unknown>;
};
type HttpRequestInit = {
    method: "GET";
    headers: Record<string, string>;
    signal?: AbortSignal | null;
};
type HttpFetcher = (input: string, init: HttpRequestInit) => Promise<HttpResponse>;
type HttpTerminalSnapshotReaderOptions = {
    endpoint: string;
    fetcher?: HttpFetcher;
    signal?: AbortSignal;
};
export declare class HttpTerminalSnapshotReader implements TerminalSnapshotReader {
    private readonly endpoint;
    private readonly fetcher;
    private readonly signal;
    constructor({ endpoint, fetcher, signal }: HttpTerminalSnapshotReaderOptions);
    listTerminalSnapshots(): Promise<TerminalSnapshot[]>;
}
export {};
//# sourceMappingURL=HttpTerminalSnapshotReader.d.ts.map