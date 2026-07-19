import { useLanguage, type Language } from "../contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "kr", label: "KR" },
    { code: "de", label: "DE" },
  ];

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-1 bg-black/50 backdrop-blur-sm border border-orange-500/30 rounded-full px-3 py-2 hover:border-orange-500/60 transition-all duration-300">
      {languages.map((lang, index) => (
        <div key={lang.code}>
          <button
            onClick={() => setLanguage(lang.code)}
            className={`px-2.5 py-1 text-xs font-rajdhani font-bold tracking-widest transition-all duration-300 ${
              language === lang.code
                ? "text-orange-400 bg-orange-500/15 rounded-full"
                : "text-white/60 hover:text-white/80"
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="inline-block mx-1 text-white/30">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
