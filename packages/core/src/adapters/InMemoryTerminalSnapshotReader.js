export class InMemoryTerminalSnapshotReader {
    snapshots;
    constructor(snapshots) {
        this.snapshots = snapshots;
    }
    async listTerminalSnapshots() {
        return this.snapshots;
    }
}
//# sourceMappingURL=InMemoryTerminalSnapshotReader.js.map