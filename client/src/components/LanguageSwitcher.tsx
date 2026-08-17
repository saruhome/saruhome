// Pixel HUD style: hard edges, role-color targeting, no glass blur or soft rounded surfaces.
import { useState } from "react";
import { useLanguage, type Language } from "../contexts/LanguageContext";

export function LanguageSwitcher({ elevated = false }: { elevated?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "kr", label: "KR" },
    { code: "de", label: "DE" },
  ];

  return (
    <div className={`fixed right-4 z-[70] md:bottom-6 md:right-6 ${elevated ? "bottom-[5.5rem]" : "bottom-4"}`}>
      {isOpen && (
        <div
          id="language-options"
          className="pixel-hud-panel absolute bottom-full right-0 mb-2 flex items-center gap-1 border-[var(--player-primary)] bg-[#05080dcc] p-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/75 shadow-[3px_3px_0_rgba(0,0,0,0.55)]"
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
        className="pixel-hud-panel border-[var(--player-primary)] bg-[#05080dcc] px-3 py-2 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/85 shadow-[3px_3px_0_rgba(0,0,0,0.55)] transition hover:bg-[var(--player-primary)] hover:text-black"
        aria-expanded={isOpen}
        aria-controls="language-options"
        aria-label={isOpen ? "Close language menu" : "Open language menu"}
      >
        Lang {isOpen ? "−" : "+"}
      </button>
    </div>
  );
}
