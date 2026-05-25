export const StatusBadge = ({ tone, label, compactLabel, className }) => {
    const classes = ["status-badge", "pill", tone, className]
        .filter((value) => Boolean(value))
        .join(" ");
    const fullLabel = label ?? tone.toUpperCase();
    return (<span className={classes}>
      <span className="status-badge__full">{fullLabel}</span>
      {compactLabel && compactLabel !== fullLabel ? (<span className="status-badge__compact">{compactLabel}</span>) : null}
    </span>);
};
//# sourceMappingURL=StatusBadge.js.map