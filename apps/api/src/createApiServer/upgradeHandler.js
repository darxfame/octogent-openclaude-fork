import { isAllowedHostHeader, isAllowedOriginHeader, readHeaderValue } from "./security";
export const createUpgradeHandler = ({ runtime, allowRemoteAccess, }) => {
    return (request, socket, head) => {
        const originHeader = readHeaderValue(request.headers.origin);
        const hostHeader = readHeaderValue(request.headers.host);
        if (!isAllowedHostHeader(hostHeader, allowRemoteAccess)) {
            socket.destroy();
            return;
        }
        if (!isAllowedOriginHeader(originHeader, allowRemoteAccess)) {
            socket.destroy();
            return;
        }
        try {
            if (!runtime.handleUpgrade(request, socket, head)) {
                socket.destroy();
            }
        }
        catch {
            socket.destroy();
        }
    };
};
//# sourceMappingURL=upgradeHandler.js.map