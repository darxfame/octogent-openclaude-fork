import type { UseMonitorRuntimeResult } from "../app/hooks/useMonitorRuntime";
type MonitorPrimaryViewProps = {
    monitorRuntime: Pick<UseMonitorRuntimeResult, "monitorConfig" | "monitorFeed" | "monitorError" | "isRefreshingMonitorFeed" | "isSavingMonitorConfig" | "refreshMonitorFeed" | "patchMonitorConfig">;
};
export declare const MonitorPrimaryView: ({ monitorRuntime }: MonitorPrimaryViewProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=MonitorPrimaryView.d.ts.map