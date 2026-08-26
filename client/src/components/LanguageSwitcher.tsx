// Pixel HUD style: hard edges, role-color targeting, no glass blur or soft rounded surfaces.
import { useState } from "react";
import { useLanguage, type Language } from "../contexts/LanguageContext";

export function LanguageSwitcher({ elevated = false, embedded = false, hud = false }: { elevated?: boolean; embedded?: boolean; hud?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "kr", label: "KR" },
    { code: "de", label: "DE" },
  ];

  return (
    <div className={hud ? "relative" : embedded ? "utility-menu-slot utility-menu-slot-language" : `mobile-language-hud fixed bottom-4 right-4 z-[70] md:bottom-6 md:right-6 ${elevated ? "" : ""}`}>
      {isOpen && (
        <div
          id={embedded ? "utility-language-options" : "language-options"}
          className={`pixel-hud-panel absolute bottom-full mb-2 flex items-center gap-1 border-[var(--player-primary)] bg-[#05080dcc] p-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/75 shadow-[3px_3px_0_rgba(0,0,0,0.55)] ${embedded || hud ? "left-0" : "right-0"}`}
          role="menu"
          aria-label="Language options"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`min-w-9 border border-transparent px-2 py-1.5 transition-colors hover:border-[var(--player-primary)] hover:bg-[var(--player-primary)] hover:text-black ${
                language === lang.code ? "border-[var(--player-primary)] bg-[var(--player-primary)] text-black" : "text-white/60"
              }`}
              role="menuitem"
              aria-label={`Switch to ${lang.label}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={hud ? "archive-hud-control pixel-hud-panel inline-flex shrink-0 items-center justify-center border-2 border-cyan-200/75 bg-[#05080de8] px-3 py-1.5 font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e] focus-visible:-translate-y-0.5 md:px-4 md:text-xs" : embedded ? "utility-menu-item utility-menu-language" : "pixel-hud-panel grid h-10 w-[4.5rem] place-items-center border-[var(--player-primary)] bg-[#05080dcc] px-1 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.14em] text-white/85 shadow-[3px_3px_0_rgba(0,0,0,0.55)] transition hover:bg-[var(--player-primary)] hover:text-black"}
        aria-expanded={isOpen}
        aria-controls={embedded ? "utility-language-options" : "language-options"}
        aria-label={isOpen ? "Close language menu" : "Open language menu"}
      >
        Lang {isOpen ? "−" : "+"}
      </button>
    </div>
  );
}
