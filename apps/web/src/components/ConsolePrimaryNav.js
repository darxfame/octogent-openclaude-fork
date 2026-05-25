import { PRIMARY_NAV_ITEMS } from "../app/constants";
export const ConsolePrimaryNav = ({ activePrimaryNav, onPrimaryNavChange, }) => (<nav className="console-primary-nav" aria-label="Primary navigation">
    <div className="console-primary-nav-tabs">
      {PRIMARY_NAV_ITEMS.map((item) => (<button aria-current={item.index === activePrimaryNav ? "page" : undefined} className="console-primary-nav-tab" data-active={item.index === activePrimaryNav ? "true" : "false"} key={item.index} onClick={() => {
            onPrimaryNavChange(item.index);
        }} type="button">
          [{item.index}] {item.label}
        </button>))}
    </div>
    <p className="console-primary-nav-hint">Press 1-{PRIMARY_NAV_ITEMS.length} to navigate</p>
  </nav>);
//# sourceMappingURL=ConsolePrimaryNav.js.map