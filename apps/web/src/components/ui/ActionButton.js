export const ActionButton = ({ children, className, variant = "accent", size = "dense", type = "button", ...buttonProps }) => {
    const classes = [
        "action-button",
        `action-button--${variant}`,
        `action-button--${size}`,
        className,
    ]
        .filter((value) => Boolean(value))
        .join(" ");
    return (<button className={classes} type={type} {...buttonProps}>
      {children}
    </button>);
};
//# sourceMappingURL=ActionButton.js.map