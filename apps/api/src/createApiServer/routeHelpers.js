import { RequestBodyTooLargeError, readJsonBody } from "./requestParsers";
import { withCors } from "./security";
export const writeJson = (response, status, payload, corsOrigin) => {
    response.writeHead(status, withCors({ "Content-Type": "application/json" }, corsOrigin));
    response.end(JSON.stringify(payload));
};
export const writeText = (response, status, payload, contentType, corsOrigin) => {
    response.writeHead(status, withCors({ "Content-Type": contentType }, corsOrigin));
    response.end(payload);
};
export const writeNoContent = (response, status, corsOrigin) => {
    response.writeHead(status, withCors({}, corsOrigin));
    response.end();
};
export const writeMethodNotAllowed = (response, corsOrigin) => {
    writeJson(response, 405, { error: "Method not allowed" }, corsOrigin);
};
export const readJsonBodyOrWriteError = async (request, response, corsOrigin) => {
    try {
        const payload = await readJsonBody(request);
        return { ok: true, payload };
    }
    catch (error) {
        if (error instanceof RequestBodyTooLargeError) {
            writeJson(response, 413, { error: "Request body too large." }, corsOrigin);
            return { ok: false };
        }
        writeJson(response, 400, { error: "Invalid JSON body." }, corsOrigin);
        return { ok: false };
    }
};
//# sourceMappingURL=routeHelpers.js.map