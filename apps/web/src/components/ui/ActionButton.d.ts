import type { ButtonHTMLAttributes, ReactNode } from "react";
type ActionButtonVariant = "primary" | "accent" | "info" | "danger";
type ActionButtonSize = "compact" | "dense";
type ActionButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    children: ReactNode;
    variant?: ActionButtonVariant;
    size?: ActionButtonSize;
};
export declare const ActionButton: ({ children, className, variant, size, type, ...buttonProps }: ActionButtonProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ActionButton.d.ts.map