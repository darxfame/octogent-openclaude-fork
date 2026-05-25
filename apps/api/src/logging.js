const isEnabled = (value) => value === "1";
export const isVerboseLoggingEnabled = () => isEnabled(process.env.OCTOGENT_VERBOSE_LOGS);
export const logVerbose = (...args) => {
    if (isVerboseLoggingEnabled()) {
        console.log(...args);
    }
};
//# sourceMappingURL=logging.js.map