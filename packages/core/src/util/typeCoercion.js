export const asRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value)
    ? value
    : null;
export const asString = (value) => typeof value === "string" ? value : null;
export const asNumber = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === "string") {
        const parsed = Number.parseFloat(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
};
//# sourceMappingURL=typeCoercion.js.map