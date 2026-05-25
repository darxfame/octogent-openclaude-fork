import type { IncomingMessage } from "node:http";
import type { Socket } from "node:net";
type TerminalRuntime = ReturnType<typeof import("../terminalRuntime").createTerminalRuntime>;
type CreateUpgradeHandlerOptions = {
    runtime: TerminalRuntime;
    allowRemoteAccess: boolean;
};
export declare const createUpgradeHandler: ({ runtime, allowRemoteAccess, }: CreateUpgradeHandlerOptions) => (request: IncomingMessage, socket: Socket, head: Buffer) => void;
export {};
//# sourceMappingURL=upgradeHandler.d.ts.map