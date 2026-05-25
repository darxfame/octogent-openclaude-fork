export const getTerminalId = (request) => {
    if (!request.url) {
        return null;
    }
    let url;
    try {
        url = new URL(request.url, "http://localhost");
    }
    catch {
        return null;
    }
    const match = url.pathname.match(/^\/api\/terminals\/([^/]+)\/ws$/);
    if (!match) {
        return null;
    }
    try {
        return decodeURIComponent(match[1] ?? "");
    }
    catch {
        return null;
    }
};
export const sendMessage = (client, message) => {
    if (client.readyState !== 1) {
        return;
    }
    client.send(JSON.stringify(message));
};
export const broadcastMessage = (session, message) => {
    for (const client of session.clients) {
        sendMessage(client, message);
    }
    for (const listener of session.directListeners) {
        listener(message);
    }
};
//# sourceMappingURL=protocol.js.map