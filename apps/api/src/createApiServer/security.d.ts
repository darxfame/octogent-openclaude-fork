export declare const withCors: (headers: Record<string, string>, corsOrigin: string | null) => Record<string, string>;
export declare const isAllowedOriginHeader: (origin: string | undefined, allowRemoteAccess: boolean) => boolean;
export declare const isAllowedHostHeader: (host: string | undefined, allowRemoteAccess: boolean) => boolean;
export declare const readHeaderValue: (header: string | string[] | undefined) => string | undefined;
export declare const getRequestCorsOrigin: (origin: string | undefined, allowRemoteAccess: boolean) => string | null;
//# sourceMappingURL=security.d.ts.map