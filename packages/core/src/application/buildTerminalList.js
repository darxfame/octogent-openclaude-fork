const byCreatedAtAscending = (a, b) => new Date(a).getTime() - new Date(b).getTime();
export const buildTerminalList = async (reader) => {
    const snapshots = await reader.listTerminalSnapshots();
    return [...snapshots].sort((left, right) => byCreatedAtAscending(left.createdAt, right.createdAt));
};
//# sourceMappingURL=buildTerminalList.js.map