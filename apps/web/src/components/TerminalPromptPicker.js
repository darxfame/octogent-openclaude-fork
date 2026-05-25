import { useCallback, useEffect, useRef, useState } from "react";
import { buildPromptItemUrl, buildPromptsUrl } from "../runtime/runtimeEndpoints";
export const TerminalPromptPicker = ({ isOpen, anchorRef, onClose, onSelectPrompt, }) => {
    const [prompts, setPrompts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const popoverRef = useRef(null);
    const [style, setStyle] = useState({});
    useEffect(() => {
        if (!isOpen || !anchorRef.current)
            return;
        const rect = anchorRef.current.getBoundingClientRect();
        setStyle({
            position: "fixed",
            top: rect.bottom + 2,
            right: window.innerWidth - rect.right,
        });
    }, [isOpen, anchorRef]);
    useEffect(() => {
        if (!isOpen)
            return;
        setIsLoading(true);
        fetch(buildPromptsUrl())
            .then(async (res) => {
            if (!res.ok)
                return;
            const data = (await res.json());
            setPrompts(data.prompts);
        })
            .catch(() => {
            // Silently fail
        })
            .finally(() => {
            setIsLoading(false);
        });
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen)
            return;
        const handleClickOutside = (e) => {
            if (popoverRef.current &&
                !popoverRef.current.contains(e.target) &&
                anchorRef.current &&
                !anchorRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, anchorRef]);
    const handleSelectPrompt = useCallback(async (name) => {
        try {
            const res = await fetch(buildPromptItemUrl(name));
            if (!res.ok)
                return;
            const data = (await res.json());
            onSelectPrompt(data.content);
            onClose();
        }
        catch {
            // Silently fail
        }
    }, [onSelectPrompt, onClose]);
    if (!isOpen)
        return null;
    const userPrompts = prompts.filter((p) => p.source === "user");
    const builtinPrompts = prompts.filter((p) => p.source === "builtin");
    return (<div className="prompt-picker-popover" ref={popoverRef} style={style}>
      <div className="prompt-picker-header">Insert Prompt</div>
      {isLoading ? (<div className="prompt-picker-loading">Loading...</div>) : prompts.length === 0 ? (<div className="prompt-picker-empty">No prompts available</div>) : (<div className="prompt-picker-list">
          {userPrompts.length > 0 && (<div className="prompt-picker-group">
              <div className="prompt-picker-group-label">My Prompts</div>
              {userPrompts.map((p) => (<button key={p.name} type="button" className="prompt-picker-item" onClick={() => {
                        void handleSelectPrompt(p.name);
                    }}>
                  {p.name}.md
                </button>))}
            </div>)}
          {builtinPrompts.length > 0 && (<div className="prompt-picker-group">
              <div className="prompt-picker-group-label">Built-in</div>
              {builtinPrompts.map((p) => (<button key={p.name} type="button" className="prompt-picker-item" onClick={() => {
                        void handleSelectPrompt(p.name);
                    }}>
                  {p.name}.md
                </button>))}
            </div>)}
        </div>)}
    </div>);
};
//# sourceMappingURL=TerminalPromptPicker.js.map