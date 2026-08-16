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
          className="absolute bottom-full right-0 mb-2 flex items-center gap-1 border border-white/30 bg-black/65 p-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm"
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
              className={`min-w-9 px-2 py-1.5 transition-colors hover:bg-white/10 hover:text-white ${
                language === lang.code ? "bg-white/15 text-white" : "text-white/60"
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
        className="border border-white/30 bg-black/65 px-3 py-2 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm transition hover:border-[var(--player-primary)] hover:text-white"
        aria-expanded={isOpen}
        aria-controls="language-options"
        aria-label={isOpen ? "Close language menu" : "Open language menu"}
      >
        Lang {isOpen ? "−" : "+"}
      </button>
    </div>
  );
}
