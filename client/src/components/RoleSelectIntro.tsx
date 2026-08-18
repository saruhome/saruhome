import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import DesignerPortfolioSlider from "./DesignerPortfolioSlider";
import DancerPortfolioSlider from "./DancerPortfolioSlider";
import { useRoleTheme } from "../contexts/RoleContext";
import { useGameAudio } from "../contexts/GameAudioContext";
import { assetUrl } from "../lib/assetUrl";

/**
 * Design philosophy — Neo-Arcade Character Lobby:
 * a split-screen 16-bit selection room uses role-specific game environments,
 * chibi sprites, hard-edge HUD modules, and a short launch state.
 */

type Role = "designer" | "dancer";
type View = "main" | Role;
type SpriteState = "idle" | "walk" | "jump" | "celebrate" | "design" | "dance";

type RoleOption = {
  id: Role;
  eyebrow: string;
  title: string;
  subtitle: string;
  spriteSheet: string;
  gestureGif: string;
  primary: string;
  dark: string;
  stats: [string, string, string];
};

const PIXEL_LOBBY = assetUrl("pixel-portfolio-lobby-reference_c2b7d5df.png", "pixel-portfolio-lobby-reference.png");

const roles: RoleOption[] = [
  {
    id: "designer",
    eyebrow: "PLAYER 01",
    title: "UX DESIGNER",
    subtitle: "Systems, interfaces, flow, precision",
    spriteSheet: assetUrl("designer-chibi-sprite-sheet_011ed7b7.png", "designer-chibi-sprite-sheet.png"),
    gestureGif: assetUrl("designer-arcade-pixel-loop_be985bda.gif", "designer-arcade-pixel-loop.gif"),
    primary: "#37E7FF",
    dark: "#06101E",
    stats: ["FLOW 98", "UX 96", "SYSTEMS 92"],
  },
  {
    id: "dancer",
    eyebrow: "PLAYER 02",
    title: "DANCER",
    subtitle: "Rhythm, presence, battle energy",
    spriteSheet: assetUrl("dancer-chibi-sprite-sheet_e9dd17a4.png", "dancer-chibi-sprite-sheet.png"),
    gestureGif: assetUrl("dancer-arcade-pixel-loop_ee9766f6.gif", "dancer-arcade-pixel-loop.gif"),
    primary: "#FF6B17",
    dark: "#200806",
    stats: ["RHYTHM 99", "ENERGY 97", "PRESENCE 95"],
  },
];

const spritePositions: Record<SpriteState, string> = {
  idle: "0% 0%",
  walk: "100% 0%",
  jump: "0% 100%",
  celebrate: "100% 100%",
  design: "0% 0%",
  dance: "100% 0%",
};

function ChibiAvatar({ role, state }: { role: RoleOption; state: SpriteState }) {
  const animationClass = state === "idle" ? "chibi-idle" : state === "walk" ? "chibi-walk" : state === "jump" ? "chibi-jump" : state === "design" ? "chibi-design" : state === "dance" ? "chibi-dance" : "chibi-celebrate";
  // The Dancer keeps her own idle sprite while sharing the Designer's hover motion curve and timing.
  const isGesture = state === "design" && role.id === "designer";

  return (
    <div className="relative h-44 w-40 sm:h-56 sm:w-52 lg:h-72 lg:w-64" aria-hidden="true">
      <div className="chibi-floor-highlight absolute bottom-[9%] left-[83%] h-[5%] w-[72%] -translate-x-1/2" style={{ "--floor-primary": role.primary, "--floor-shadow": role.dark } as React.CSSProperties} />
      <div className={`absolute inset-0 z-10 ${animationClass}`}>
        {isGesture ? (
          <img className="h-full w-full object-contain [image-rendering:pixelated] [image-rendering:crisp-edges]" src={role.gestureGif} alt="" />
        ) : (
          <div
            className="h-full w-full bg-no-repeat [image-rendering:pixelated] [image-rendering:crisp-edges]"
            style={{
              backgroundImage: `url(${role.spriteSheet})`,
              backgroundPosition: spritePositions[state],
              backgroundSize: "200% 200%",
            }}
          />
        )}
      </div>
    </div>
  );
}

function RoleWorld({ role, activeRole }: { role: RoleOption; activeRole: Role | null }) {
  const isActive = activeRole === role.id;
  const isDesigner = role.id === "designer";

  return (
    <div
      className="absolute inset-0 bg-cover bg-center transition-[filter,transform] duration-500"
      style={{
        backgroundImage: `url(${PIXEL_LOBBY})`,
        backgroundSize: "200% 100%",
        backgroundPosition: isDesigner ? "left center" : "right center",
        imageRendering: "pixelated",
        filter: isActive ? "brightness(1.12) saturate(1.25)" : "brightness(0.68) saturate(0.82)",
        transform: isActive ? "scale(1.035)" : "scale(1)",
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 pixel-world-shade" style={{ "--world-glow": role.primary } as React.CSSProperties} />
      <div className="absolute inset-0 arcade-scanline opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgba(0,0,0,0.92),transparent)]" />
    </div>
  );
}

function RolePanel({
  role,
  activeRole,
  lockedRole,
  setActiveRole,
  onSelect,
}: {
  role: RoleOption;
  activeRole: Role | null;
  lockedRole: Role | null;
  setActiveRole: (role: Role | null) => void;
  onSelect: (role: Role) => void;
}) {
  const { t, language } = useLanguage();
  const { playHover } = useGameAudio();
  const isDesigner = role.id === "designer";
  const isActive = activeRole === role.id;
  const isLocked = lockedRole === role.id;
  const isOtherLocked = lockedRole !== null && !isLocked;
  const isCompressedKoreanDesigner = isDesigner && language === "kr" && activeRole === "dancer";
  const designerTitle = t("uxuiDesigner").replace(/^UX[\s-]*/, "");
  const state: SpriteState = isLocked ? "celebrate" : isActive ? "design" : "idle";
  const desktopFlexClass =
    activeRole === "designer"
      ? isDesigner ? "md:flex-[0.75]" : "md:flex-[0.25]"
      : activeRole === "dancer"
        ? isDesigner ? "md:flex-[0.25]" : "md:flex-[0.75]"
        : "md:flex-[0.5]";

  return (
    <button
      type="button"
      aria-label={`Explore ${isDesigner ? t("uxuiDesigner") : t("dancer")} portfolio`}
      aria-pressed={isLocked}
      disabled={lockedRole !== null}
      onMouseEnter={() => { if (!lockedRole) { setActiveRole(role.id); playHover(); } }}
      onMouseLeave={() => !lockedRole && setActiveRole(null)}
      onFocus={() => !lockedRole && setActiveRole(role.id)}
      onBlur={() => !lockedRole && setActiveRole(null)}
      onTouchStart={() => !lockedRole && setActiveRole(role.id)}
      onClick={() => onSelect(role.id)}
      className={`role-panel group relative h-1/2 basis-1/2 overflow-hidden text-left text-white outline-none transition-[flex,filter,opacity] duration-500 ease-in-out md:h-full ${desktopFlexClass} ${isOtherLocked ? "opacity-15 saturate-0" : "opacity-100"} ${isDesigner ? "md:[clip-path:polygon(0_0,100%_0,calc(100%_-_6vw)_100%,0_100%)]" : "md:[clip-path:polygon(6vw_0,100%_0,100%_100%,0_100%)]"}`}
    >
      <RoleWorld role={role} activeRole={activeRole} />
      <div className="absolute inset-0 pixel-corner-frame" style={{ "--frame-color": role.primary } as React.CSSProperties} />

      <div
        className={`pointer-events-none absolute top-5 z-20 hidden w-44 pixel-hud-panel p-3 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.18em] md:block ${isDesigner ? "left-7" : "right-7"}`}
        style={{
          borderColor: `${role.primary}66`,
          "--hud-glow": role.primary,
        } as React.CSSProperties}
      >
        <span className="block text-white/45">{t("archiveAccess")}</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {role.stats.map((stat) => <span key={stat} className="border px-1.5 py-0.5" style={{ borderColor: `${role.primary}88`, color: role.primary }}>{stat}</span>)}
        </div>
      </div>

      <div className={`pointer-events-none absolute z-20 bottom-16 ${isDesigner ? "right-5 sm:right-10" : "left-5 sm:left-10"} ${isOtherLocked ? "hidden" : "block"}`}>
        <ChibiAvatar role={role} state={state} />
      </div>

      <div className={`relative z-30 flex h-full min-h-0 flex-col justify-end px-6 pt-8 md:px-10 md:pb-24 lg:px-16 ${isDesigner ? "items-start pb-10 text-left" : "items-end pb-20 text-right"}`}>
        <div className={`max-w-[34rem] transition-all duration-500 ${isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90"}`}>
          <p className="mb-2 inline-block pixel-tag px-2.5 py-1 font-rajdhani text-xs font-black uppercase tracking-[0.32em] md:mb-3 md:px-3 md:text-sm" style={{ borderColor: `${role.primary}aa`, background: `${role.dark}e8`, color: role.primary }}>
            {isDesigner ? t("player01") : t("player02")}
          </p>
          <h2 className={`max-w-[7.8ch] pixel-title font-bebas text-[clamp(3.2rem,12vw,5.8rem)] leading-[0.78] tracking-[0.035em] text-white transition-[opacity,transform] duration-500 ${isCompressedKoreanDesigner ? "md:text-[clamp(2.8rem,3.1vw,3.8rem)]" : "md:text-[clamp(4.2rem,7.6vw,8.3rem)]"}`}>
            {isDesigner ? <><span className="block">UX</span><span className={`block ${language === "kr" ? "whitespace-nowrap [word-break:keep-all]" : ""}`}>{designerTitle}</span></> : t("dancer")}
          </h2>
          <p className="mt-2 max-w-[28ch] skew-x-[-8deg] font-rajdhani text-xs font-semibold uppercase tracking-[0.18em] text-white/70 md:mt-3 md:text-sm">
            {isDesigner ? t("designerSubtitle") : t("dancerSubtitle")}
          </p>
          {(isLocked || isActive) && (
            <span className="mt-4 inline-block pixel-hud-panel px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/90" style={{ borderColor: `${role.primary}88`, "--hud-glow": role.primary } as React.CSSProperties}>
              {isLocked ? `${t("loadingPlayer")}…` : t("ready")}
            </span>
          )}
        </div>
      </div>

      {isLocked && <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center bg-black/40"><span className="selected-hit border-2 px-5 py-3 font-rajdhani text-sm font-black uppercase tracking-[0.32em]" style={{ borderColor: role.primary, color: role.primary, background: `${role.dark}d9` }}>{t("ready")}</span></div>}
    </button>
  );
}

function IntroScreen({ onSelect }: { onSelect: (view: View) => void }) {
  const { t } = useLanguage();
  const { selectRole: setSelectedRole } = useRoleTheme();
  const { launchArchiveAudio } = useGameAudio();
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [lockedRole, setLockedRole] = useState<Role | null>(null);
  const selectTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => { if (selectTimer.current) window.clearTimeout(selectTimer.current); }, []);

  const handleRoleSelection = (role: Role) => {
    if (lockedRole) return;
    setSelectedRole(role);
    launchArchiveAudio(role);
    setLockedRole(role);
    setActiveRole(role);
    selectTimer.current = window.setTimeout(() => onSelect(role), 420);
  };

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[#04080e]" />
      <div className="pointer-events-none absolute inset-0 arcade-lobby-grid opacity-55" />
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-full w-px -translate-x-1/2 bg-white/20 shadow-[0_0_28px_rgba(255,255,255,0.4)]" />

      <header className="pointer-events-none absolute left-3 top-3 z-30 text-left md:left-1/2 md:top-8 md:-translate-x-1/2 md:text-center">
        <div className="inline-flex items-center gap-2 border-y border-white/20 bg-black/20 px-2.5 py-1 font-rajdhani text-[0.48rem] font-black uppercase tracking-[0.23em] text-white/75 backdrop-blur-[2px] md:hidden">
          <span className="max-w-[7.5rem] truncate">{t("chooseYourPlayer")}</span>
          <span className="font-bebas text-sm tracking-[0.14em] text-white">01 <span className="text-white/40">/</span> 02</span>
        </div>
        <div className="hidden md:block">
          <p className="choose-banner font-rajdhani text-xs font-black uppercase tracking-[0.46em] text-white/70">{t("chooseYourPlayer")}</p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-cyan-300/70" />
            <span className="font-bebas text-2xl tracking-[0.18em] text-white">01 <span className="text-white/40">VS</span> 02</span>
            <span className="h-px w-10 bg-orange-300/70" />
          </div>
        </div>
      </header>

      <div className="relative z-10 flex h-full flex-col md:flex-row">
        {roles.map((role) => <RolePanel key={role.id} role={role} activeRole={activeRole} lockedRole={lockedRole} setActiveRole={setActiveRole} onSelect={handleRoleSelection} />)}
      </div>
    </section>
  );
}

export default function RoleSelectIntro() {
  const [view, setView] = useState<View>("main");
  const { muted, toggleMuted, stopMusic } = useGameAudio();

  const returnToLobby = () => {
    stopMusic();
    setView("main");
  };

  return (
    <main className="pixel-game-shell h-auto min-h-dvh overflow-visible bg-black text-white md:h-[100dvh] md:overflow-hidden">
      <button
        type="button"
        onClick={toggleMuted}
        className="pixel-hud-panel fixed bottom-4 left-4 z-[70] grid h-10 place-items-center border-[var(--player-primary)] bg-[#05080dcc] px-3 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/85 shadow-[3px_3px_0_rgba(0,0,0,0.55)] transition hover:bg-[var(--player-primary)] hover:text-black md:bottom-6 md:left-6"
        aria-pressed={!muted}
        aria-label={muted ? "Enable portfolio audio" : "Mute portfolio audio"}
      >
        {muted ? "Sound Off" : "Sound On"}
      </button>
      {view === "main" && (
        <a
          href="https://buymeacoffee.com/saruhome"
          target="_blank"
          rel="noreferrer"
          className="pixel-hud-panel fixed bottom-4 left-[6.85rem] z-[70] grid h-10 place-items-center border-[#ffdd00]/70 bg-[#05080dcc] px-3 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/85 shadow-[3px_3px_0_rgba(0,0,0,0.55)] transition hover:bg-[#ffdd00] hover:text-black md:bottom-6 md:left-[8.5rem]"
          aria-label="Support this portfolio on Buy Me a Coffee (opens in a new tab)"
        >
          Support
        </a>
      )}
      {view === "main" && <><LanguageSwitcher /><IntroScreen onSelect={setView} /></>}
      {view === "designer" && <DesignerPortfolioSlider onBack={returnToLobby} />}
      {view === "dancer" && <DancerPortfolioSlider onBack={returnToLobby} />}
    </main>
  );
}
