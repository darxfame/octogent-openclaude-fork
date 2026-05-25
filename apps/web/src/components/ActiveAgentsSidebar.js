import { useRef } from "react";
import { clampSidebarWidth } from "../app/uiStateNormalizers";
export const ActiveAgentsSidebar = ({ sidebarWidth, onSidebarWidthChange, actionPanel = null, bodyContent, }) => {
    const sidebarRef = useRef(null);
    const handleResizeMouseDown = (event) => {
        event.preventDefault();
        const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
        const handleMouseMove = (event) => {
            onSidebarWidthChange(clampSidebarWidth(event.clientX - sidebarLeft));
        };
        const stopResize = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", stopResize);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", stopResize);
    };
    return (<div className="dashboard-deck-shell">
      <aside aria-label="Active Agents sidebar" className="active-agents-sidebar" ref={sidebarRef} style={{ width: `${sidebarWidth}px` }}>
        {actionPanel ? (<div className="active-agents-action-panel">{actionPanel}</div>) : (<div className="active-agents-body">{bodyContent}</div>)}
        <div className="active-agents-border-resizer" data-testid="active-agents-border-resizer" onMouseDown={handleResizeMouseDown}/>
      </aside>
    </div>);
};
//# sourceMappingURL=ActiveAgentsSidebar.js.map