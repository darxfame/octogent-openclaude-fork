import type { ReactNode } from "react";
type ConfirmationDialogProps = {
    title: string;
    ariaLabel: string;
    message: ReactNode;
    warning: string;
    confirmLabel: string;
    isConfirmDisabled: boolean;
    isBusy: boolean;
    cancelAriaLabel?: string;
    onCancel: () => void;
    onConfirm: () => void;
    children?: ReactNode;
};
export declare const ConfirmationDialog: ({ title, ariaLabel, message, warning, confirmLabel, isConfirmDisabled, isBusy, cancelAriaLabel, onCancel, onConfirm, children, }: ConfirmationDialogProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ConfirmationDialog.d.ts.map