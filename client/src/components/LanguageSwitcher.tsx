import { useLanguage, type Language } from "../contexts/LanguageContext";
import { useRoleTheme } from "../contexts/RoleContext";

const THEME_CLASSES = {
  orange: {
    container: "border-orange-500/30 hover:border-orange-500/60",
    active: "text-orange-400 bg-orange-500/15",
  },
  cyan: {
    container: "border-cyan-400/30 hover:border-cyan-400/60",
    active: "text-cyan-300 bg-cyan-400/15",
  },
} as const;

export function LanguageSwitcher({
  theme,
}: {
  theme?: "orange" | "cyan";
}) {
  const { language, setLanguage } = useLanguage();
  const { palette } = useRoleTheme();
  const resolvedTheme: keyof typeof THEME_CLASSES = theme ?? palette.accentColor;
  const colors = THEME_CLASSES[resolvedTheme];

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "kr", label: "KR" },
    { code: "de", label: "DE" },
  ];

  return (
    <div
      className={`fixed top-6 right-6 z-40 flex items-center gap-1 rounded-full border bg-black/50 px-3 py-2 backdrop-blur-sm transition-all duration-300 ${colors.container}`}
    >
      {languages.map((lang, index) => (
        <div key={lang.code}>
          <button
            onClick={() => setLanguage(lang.code)}
            className={`px-2.5 py-1 text-xs font-rajdhani font-bold tracking-widest transition-all duration-300 ${
              language === lang.code
                ? `rounded-full ${colors.active}`
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
