import { Minus, X } from "lucide-react";
import { useCallback, useState } from "react";
import { AgentStateBadge } from "../AgentStateBadge";
import { Terminal } from "../Terminal";
export const CanvasTerminalColumn = ({ node, terminals, layoutVersion, isFocused, onMinimize, onClose, onFocus, panelRef, onTerminalRenamed, onTerminalActivity, }) => {
    const [agentState, setAgentState] = useState("idle");
    const terminal = terminals.find((t) => t.terminalId === node.sessionId);
    const rawName = terminal?.tentacleName ?? node.tentacleId;
    const tentacleName = rawName.length > 24 ? `${rawName.slice(0, 24)}...` : rawName;
    const workspaceMode = terminal?.workspaceMode ?? "shared";
    const handleFocus = useCallback(() => {
        onFocus?.();
    }, [onFocus]);
    if (!node.sessionId)
        return null;
    return (<section ref={panelRef} className={`canvas-terminal-column${isFocused ? " canvas-terminal-column--focused" : ""}`} tabIndex={-1} onPointerDown={handleFocus} onFocusCapture={handleFocus}>
      <div className="canvas-terminal-column-header">
        <div className="canvas-terminal-column-heading">
          <h2>
            <span className="canvas-terminal-column-name">{tentacleName}</span>
            {workspaceMode === "worktree" && (<span className="canvas-terminal-column-badge">WT</span>)}
          </h2>
        </div>
        <div className="canvas-terminal-column-actions">
          <span className="canvas-terminal-column-tentacle-tag" style={{ background: node.color }}>
            {node.tentacleId}
          </span>
          <AgentStateBadge state={agentState}/>
          <button type="button" className="canvas-terminal-column-minimize" onClick={onMinimize} aria-label="Minimize terminal panel" title="Minimize terminal panel">
            <Minus size={14}/>
          </button>
          <button type="button" className="canvas-terminal-column-close" onClick={onClose} aria-label="Close terminal session" title="Close terminal session">
            <X size={14}/>
          </button>
        </div>
      </div>
      <div className="canvas-terminal-column-body">
        <Terminal terminalId={node.sessionId} terminalLabel={node.label} {...(layoutVersion === undefined ? {} : { layoutVersion })} onAgentRuntimeStateChange={setAgentState} {...(onTerminalRenamed ? { onTerminalRenamed } : {})} {...(onTerminalActivity ? { onTerminalActivity } : {})}/>
      </div>
    </section>);
};
//# sourceMappingURL=CanvasTerminalColumn.js.map