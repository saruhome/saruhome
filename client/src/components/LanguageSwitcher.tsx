import { useLanguage, type Language } from "../contexts/LanguageContext";
import { useRoleTheme } from "../contexts/RoleContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { palette } = useRoleTheme();

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "kr", label: "KR" },
    { code: "de", label: "DE" },
  ];

  return (
    <div
      className="fixed top-6 right-6 z-40 flex items-center gap-1 rounded-full border px-3 py-2 backdrop-blur-sm transition-all duration-300"
      style={{
        borderColor: `${palette.primary}80`,
        background: `${palette.base}dc`,
        boxShadow: `0 0 24px ${palette.primary}18`,
      }}
    >
      {languages.map((lang, index) => (
        <div key={lang.code}>
          <button
            onClick={() => setLanguage(lang.code)}
            className={`px-2.5 py-1 text-xs font-rajdhani font-bold tracking-widest transition-all duration-300 hover:bg-white/10 ${
              language === lang.code
                ? "rounded-full"
                : "text-white/60 hover:text-white/80"
            }`}
            style={language === lang.code ? { color: palette.primary, background: `${palette.primary}1f` } : undefined}
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
