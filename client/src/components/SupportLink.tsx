export const SUPPORT_URL = "https://buymeacoffee.com/saruhome";

// Header-row variant matching LanguageSwitcher's `hud` button; the game view uses UtilityMenuBar's own link.
export function SupportLink() {
  return (
    <a
      href={SUPPORT_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Support this portfolio on Buy Me a Coffee (opens in a new tab)"
      className="archive-hud-control pixel-hud-panel inline-flex shrink-0 items-center justify-center border-2 border-cyan-200/75 bg-[#05080de8] px-3 py-1.5 font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.16em] text-yellow-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e] focus-visible:-translate-y-0.5 md:px-4 md:text-xs"
    >
      Support
    </a>
  );
}
