export type StatusBadgeTone = "live" | "idle" | "processing" | "queued" | "blocked" | "warning";
type StatusBadgeProps = {
    tone: StatusBadgeTone;
    label?: string;
    compactLabel?: string;
    className?: string;
};
export declare const StatusBadge: ({ tone, label, compactLabel, className }: StatusBadgeProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=StatusBadge.d.ts.map