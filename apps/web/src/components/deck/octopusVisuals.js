// ─── Octopus visual derivation (seeded from tentacle id) ────────────────────
export const OCTOPUS_COLORS = [
    "#ff6b2b",
    "#ff2d6b",
    "#00ffaa",
    "#bf5fff",
    "#00c8ff",
    "#ffee00",
    "#39ff14",
    "#ff4df0",
    "#00fff7",
    "#ff9500",
];
export const ANIMATIONS = ["sway", "walk", "jog", "bounce", "float", "swim-up"];
export const EXPRESSIONS = ["normal", "happy", "angry", "surprised"];
export const ACCESSORIES = [
    "none",
    "none",
    "long",
    "mohawk",
    "side-sweep",
    "curly",
];
export function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
}
export function seededRandom(seed) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}
export function deriveOctopusVisuals(tentacle) {
    const rng = seededRandom(hashString(tentacle.tentacleId));
    const stored = tentacle.octopus;
    return {
        color: tentacle.color ??
            OCTOPUS_COLORS[hashString(tentacle.tentacleId) % OCTOPUS_COLORS.length],
        animation: stored?.animation ??
            ANIMATIONS[Math.floor(rng() * ANIMATIONS.length)],
        expression: stored?.expression ??
            EXPRESSIONS[Math.floor(rng() * EXPRESSIONS.length)],
        accessory: stored?.accessory ??
            ACCESSORIES[Math.floor(rng() * ACCESSORIES.length)],
        hairColor: stored?.hairColor ?? undefined,
    };
}
//# sourceMappingURL=octopusVisuals.js.map