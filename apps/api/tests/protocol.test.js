import { describe, expect, it } from "vitest";
import { getTerminalId } from "../src/terminalRuntime/protocol";
describe("getTerminalId", () => {
    it("returns null for malformed percent-encoding in terminal id", () => {
        const request = {
            url: "/api/terminals/%E0%A4%A/ws",
        };
        expect(getTerminalId(request)).toBeNull();
    });
});
//# sourceMappingURL=protocol.test.js.map