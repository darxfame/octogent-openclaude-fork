import type { TerminalSnapshot } from "../domain/terminal";
import type { TerminalSnapshotReader } from "../ports/TerminalSnapshotReader";
export declare class InMemoryTerminalSnapshotReader implements TerminalSnapshotReader {
    private readonly snapshots;
    constructor(snapshots: TerminalSnapshot[]);
    listTerminalSnapshots(): Promise<TerminalSnapshot[]>;
}
//# sourceMappingURL=InMemoryTerminalSnapshotReader.d.ts.map