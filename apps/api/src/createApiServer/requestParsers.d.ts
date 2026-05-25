import type { IncomingMessage } from "node:http";
export declare class RequestBodyTooLargeError extends Error {
}
export declare const readJsonBody: (request: IncomingMessage) => Promise<unknown>;
//# sourceMappingURL=requestParsers.d.ts.map