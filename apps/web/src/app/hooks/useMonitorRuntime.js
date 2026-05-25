import { useCallback, useEffect, useRef, useState } from "react";
import { buildMonitorConfigUrl, buildMonitorFeedUrl, buildMonitorRefreshUrl, } from "../../runtime/runtimeEndpoints";
import { MONITOR_SCAN_INTERVAL_MS } from "../constants";
import { normalizeMonitorConfigSnapshot, normalizeMonitorFeedSnapshot, } from "../monitorNormalizers";
const buildMonitorErrorMessage = (fallback, error) => {
    if (error instanceof Error && error.message.length > 0) {
        return error.message;
    }
    return fallback;
};
export const useMonitorRuntime = ({ enabled = true, } = {}) => {
    const [monitorConfig, setMonitorConfig] = useState(null);
    const [monitorFeed, setMonitorFeed] = useState(null);
    const [isRefreshingMonitorFeed, setIsRefreshingMonitorFeed] = useState(false);
    const [isSavingMonitorConfig, setIsSavingMonitorConfig] = useState(false);
    const [monitorError, setMonitorError] = useState(null);
    const inFlightFeedRef = useRef(false);
    const loadMonitorConfig = useCallback(async () => {
        if (!enabled) {
            return;
        }
        const response = await fetch(buildMonitorConfigUrl(), {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Unable to read monitor config (${response.status})`);
        }
        const parsed = normalizeMonitorConfigSnapshot(await response.json());
        if (!parsed) {
            throw new Error("Monitor config payload is invalid.");
        }
        setMonitorConfig(parsed);
    }, [enabled]);
    const refreshMonitorFeed = useCallback(async (manual = false) => {
        if (!enabled) {
            return;
        }
        if (inFlightFeedRef.current) {
            return;
        }
        inFlightFeedRef.current = true;
        setIsRefreshingMonitorFeed(true);
        try {
            const url = manual ? buildMonitorRefreshUrl() : buildMonitorFeedUrl();
            const method = manual ? "POST" : "GET";
            const response = await fetch(url, {
                method,
                headers: {
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Unable to read monitor feed (${response.status})`);
            }
            const parsed = normalizeMonitorFeedSnapshot(await response.json());
            if (!parsed) {
                throw new Error("Monitor feed payload is invalid.");
            }
            setMonitorFeed(parsed);
            setMonitorError(null);
        }
        catch (error) {
            setMonitorError(buildMonitorErrorMessage("Unable to read monitor feed.", error));
        }
        finally {
            inFlightFeedRef.current = false;
            setIsRefreshingMonitorFeed(false);
        }
    }, [enabled]);
    const patchMonitorConfig = useCallback(async (patch) => {
        if (!enabled) {
            return false;
        }
        setIsSavingMonitorConfig(true);
        try {
            const response = await fetch(buildMonitorConfigUrl(), {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patch),
            });
            if (!response.ok) {
                const payload = (await response.json().catch(() => ({})));
                throw new Error(payload.error ?? `Unable to save monitor config (${response.status})`);
            }
            const parsed = normalizeMonitorConfigSnapshot(await response.json());
            if (!parsed) {
                throw new Error("Monitor config response is invalid.");
            }
            setMonitorConfig(parsed);
            setMonitorError(null);
            return true;
        }
        catch (error) {
            setMonitorError(buildMonitorErrorMessage("Unable to save monitor config.", error));
            return false;
        }
        finally {
            setIsSavingMonitorConfig(false);
        }
    }, [enabled]);
    useEffect(() => {
        if (!enabled) {
            inFlightFeedRef.current = false;
            setMonitorConfig(null);
            setMonitorFeed(null);
            setIsRefreshingMonitorFeed(false);
            setIsSavingMonitorConfig(false);
            setMonitorError(null);
            return;
        }
        let isDisposed = false;
        const hydrateMonitor = async () => {
            try {
                await loadMonitorConfig();
                if (!isDisposed) {
                    await refreshMonitorFeed(false);
                }
            }
            catch (error) {
                if (!isDisposed) {
                    setMonitorError(buildMonitorErrorMessage("Unable to initialize monitor runtime.", error));
                }
            }
        };
        void hydrateMonitor();
        const timerId = window.setInterval(() => {
            void refreshMonitorFeed(false);
        }, MONITOR_SCAN_INTERVAL_MS);
        return () => {
            isDisposed = true;
            window.clearInterval(timerId);
        };
    }, [enabled, loadMonitorConfig, refreshMonitorFeed]);
    return {
        monitorConfig,
        monitorFeed,
        isRefreshingMonitorFeed,
        isSavingMonitorConfig,
        monitorError,
        refreshMonitorFeed,
        patchMonitorConfig,
    };
};
//# sourceMappingURL=useMonitorRuntime.js.map