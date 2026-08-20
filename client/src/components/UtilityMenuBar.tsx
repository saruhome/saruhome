import { type ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Design System — One grouped utility rail, not four independently positioned buttons.
 * Quick Menu is primary; language, sound, and support are equal-size secondary utilities.
 */
export function UtilityMenuBar({
  quickLabel,
  quickExpanded,
  onQuickToggle,
  quickPanel,
  muted,
  onToggleMuted,
}: {
  quickLabel: string;
  quickExpanded: boolean;
  onQuickToggle: () => void;
  quickPanel: ReactNode;
  muted: boolean;
  onToggleMuted: () => void;
}) {
  return (
    <nav className="utility-menu-bar" aria-label="Portfolio utility menu">
      <div className="utility-menu-rail">
        <div className="utility-menu-slot utility-menu-slot-quick">
          <button
            type="button"
            onClick={onQuickToggle}
            aria-expanded={quickExpanded}
            aria-controls="quick-menu-panel"
            className="utility-menu-item utility-menu-quick"
          >
            <span>{quickLabel}</span>
          </button>
          {quickPanel}
        </div>
        <span className="utility-menu-divider" aria-hidden="true" />
        <LanguageSwitcher embedded />
        <span className="utility-menu-divider" aria-hidden="true" />
        <button
          type="button"
          onClick={onToggleMuted}
          className="utility-menu-item utility-menu-sound"
          aria-pressed={!muted}
          aria-label={muted ? "Enable portfolio audio" : "Mute portfolio audio"}
        >
          {muted ? "Sound Off" : "Sound On"}
        </button>
        <span className="utility-menu-divider" aria-hidden="true" />
        <a
          className="utility-menu-item utility-menu-support"
          href="https://buymeacoffee.com/saruhome"
          target="_blank"
          rel="noreferrer"
          aria-label="Support this portfolio on Buy Me a Coffee (opens in a new tab)"
        >
          Support
        </a>
      </div>
    </nav>
  );
}
