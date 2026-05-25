import { describe, expect, it, vi } from "vitest";
import { createUpgradeHandler } from "../src/createApiServer/upgradeHandler";
describe("createUpgradeHandler", () => {
    it("destroys socket when runtime upgrade handling throws", () => {
        const runtime = {
            handleUpgrade: () => {
                throw new Error("boom");
            },
        };
        const handler = createUpgradeHandler({
            runtime: runtime,
            allowRemoteAccess: true,
        });
        const socket = {
            destroy: vi.fn(),
        };
        expect(() => handler({
            headers: {
                host: "127.0.0.1:8787",
                origin: "http://127.0.0.1:5173",
            },
        }, socket, Buffer.alloc(0))).not.toThrow();
        expect(socket.destroy).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=upgradeHandler.test.js.map