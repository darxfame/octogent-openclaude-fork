const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
export const withCors = (headers, corsOrigin) => {
    const nextHeaders = {
        ...headers,
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
    if (corsOrigin) {
        nextHeaders["Access-Control-Allow-Origin"] = corsOrigin;
        nextHeaders.Vary = "Origin";
    }
    return nextHeaders;
};
const isLoopbackHostname = (hostname) => LOOPBACK_HOSTNAMES.has(hostname.toLowerCase());
const parseHostname = (value, withScheme) => {
    try {
        const url = new URL(withScheme ? value : `http://${value}`);
        return url.hostname;
    }
    catch {
        return null;
    }
};
export const isAllowedOriginHeader = (origin, allowRemoteAccess) => {
    if (allowRemoteAccess || origin === undefined) {
        return true;
    }
    const hostname = parseHostname(origin, true);
    return hostname !== null && isLoopbackHostname(hostname);
};
export const isAllowedHostHeader = (host, allowRemoteAccess) => {
    if (allowRemoteAccess) {
        return true;
    }
    if (!host) {
        return false;
    }
    const hostname = parseHostname(host, false);
    return hostname !== null && isLoopbackHostname(hostname);
};
export const readHeaderValue = (header) => {
    if (typeof header !== "string") {
        return undefined;
    }
    const trimmed = header.trim();
    return trimmed.length > 0 ? trimmed : undefined;
};
export const getRequestCorsOrigin = (origin, allowRemoteAccess) => {
    if (!origin) {
        return null;
    }
    if (!allowRemoteAccess && !isAllowedOriginHeader(origin, allowRemoteAccess)) {
        return null;
    }
    return origin;
};
//# sourceMappingURL=security.js.map