import { StatusBadge } from "./ui/StatusBadge";
export { isAgentRuntimeState } from "@octogent/core";
const stateLabel = (state) => {
    switch (state) {
        case "waiting_for_permission":
            return "PERMISSION";
        case "waiting_for_user":
            return "WAITING";
        default:
            return state.toUpperCase();
    }
};
const stateTone = (state) => {
    switch (state) {
        case "waiting_for_permission":
        case "waiting_for_user":
            return "warning";
        default:
            return state;
    }
};
export const AgentStateBadge = ({ state }) => (<StatusBadge className="terminal-state-badge" label={stateLabel(state)} compactLabel={state === "waiting_for_permission"
        ? "PERM"
        : state === "waiting_for_user"
            ? "WAIT"
            : state === "processing"
                ? "PROC"
                : state.toUpperCase()} tone={stateTone(state)}/>);
//# sourceMappingURL=AgentStateBadge.js.map