import type { TerminalSnapshot } from "../domain/terminal";
export interface TerminalSnapshotReader {
    listTerminalSnapshots(): Promise<TerminalSnapshot[]>;
}
//# sourceMappingURL=TerminalSnapshotReader.d.ts.map