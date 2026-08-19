import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import DesignerPortfolioSlider from "./DesignerPortfolioSlider";
import DancerPortfolioSlider from "./DancerPortfolioSlider";
import { useRoleTheme } from "../contexts/RoleContext";
import { useGameAudio } from "../contexts/GameAudioContext";
import { useGameProgress } from "../contexts/GameProgressContext";
import { assetUrl } from "../lib/assetUrl";

/**
 * Design philosophy — Neo-Arcade Character Lobby:
 * a split-screen 16-bit selection room uses role-specific game environments,
 * chibi sprites, hard-edge HUD modules, and a short launch state.
 */

type Role = "designer" | "dancer";
type View = "main" | Role;
type SpriteState = "idle" | "walk" | "jump" | "celebrate" | "design" | "dance";
const HOVER_MOVE_MS = 650;

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
const FH_CONSOLE_REFERENCE = "/manus-storage/fh-joanneum-interaction-console-reference_d0476753.png";

const roles: RoleOption[] = [
  {
    id: "designer",
    eyebrow: "PLAYER 01",
    title: "UX DESIGNER",
    subtitle: "Systems, interfaces, flow, precision",
    spriteSheet: assetUrl("designer-chibi-sprite-sheet_011ed7b7.png", "designer-chibi-sprite-sheet.png"),
    gestureGif: assetUrl("designer-arcade-pixel-loop-clean_35163308.gif", "designer-arcade-pixel-loop.gif"),
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
    gestureGif: assetUrl("dancer-hover-jump-loop_e7852574.gif", "dancer-hover-jump-loop.gif"),
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

function ChibiAvatar({ role, state, className = "" }: { role: RoleOption; state: SpriteState; className?: string }) {
  const isGesture = state === "design";

  // Hover GIFs are direct image elements: the source frame sequence controls the motion
  // without a wrapper transform or an added bounce animation.
  if (isGesture) {
    const arrivalClass = role.id === "designer" ? "lobby-hover-arrive-right" : "lobby-hover-arrive-left";
    return <img className={`lobby-hover-scale origin-bottom h-44 w-40 object-contain [image-rendering:pixelated] [image-rendering:crisp-edges] sm:h-56 sm:w-52 lg:h-72 lg:w-64 ${arrivalClass} ${className}`} src={role.gestureGif} alt="" aria-hidden="true" />;
  }

  const animationClass = state === "idle" ? "chibi-idle" : state === "walk" ? "chibi-walk" : state === "jump" ? "chibi-jump" : state === "dance" ? "chibi-dance" : "chibi-celebrate";

  return (
    <div className={className} aria-hidden="true">
      <div className="relative h-44 w-40 sm:h-56 sm:w-52 lg:h-72 lg:w-64">
        <div className="chibi-floor-highlight absolute bottom-[9%] left-[83%] h-[5%] w-[72%] -translate-x-1/2" style={{ "--floor-primary": role.primary, "--floor-shadow": role.dark } as React.CSSProperties} />
        <div className={`absolute inset-0 z-10 ${animationClass}`}>
          <div
            className="h-full w-full bg-no-repeat [image-rendering:pixelated] [image-rendering:crisp-edges]"
            style={{
              backgroundImage: `url(${role.spriteSheet})`,
              backgroundPosition: spritePositions[state],
              backgroundSize: "200% 200%",
            }}
          />
        </div>
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
        filter: isActive ? "brightness(1.16) saturate(1.28)" : "brightness(0.82) saturate(0.9)",
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
  landingRole,
  lockedRole,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: {
  role: RoleOption;
  activeRole: Role | null;
  landingRole: Role | null;
  lockedRole: Role | null;
  onHoverStart: (role: Role) => void;
  onHoverEnd: () => void;
  onSelect: (role: Role) => void;
}) {
  const { t, language } = useLanguage();
  const isDesigner = role.id === "designer";
  const isActive = activeRole === role.id;
  const isLanding = landingRole === role.id;
  const isLocked = lockedRole === role.id;
  const isOtherLocked = lockedRole !== null && !isLocked;
  const isCompressedKoreanDesigner = isDesigner && language === "kr" && activeRole === "dancer";
  const designerTitle = t("uxuiDesigner").replace(/^UX[\s-]*/, "");
  // Preserve the hover GIF scale through selection instead of switching back to a smaller sprite.
  const state: SpriteState = isActive ? "design" : "idle";
  const avatarPosition = isDesigner
    ? isActive ? "md:right-[calc(33.333%-6.5rem)] lg:right-[calc(33.333%-8rem)]" : "right-5 sm:right-10"
    : isActive ? "md:left-[calc(33.333%-6.5rem)] lg:left-[calc(33.333%-8rem)]" : "left-5 sm:left-10";
  const desktopFlexClass =
    lockedRole
      ? isLocked ? "h-full basis-full md:flex-1" : "h-0 basis-0 opacity-0 md:flex-[0]"
      : activeRole === "designer"
      ? isDesigner ? "md:flex-[0.75]" : "md:flex-[0.25]"
      : activeRole === "dancer"
        ? isDesigner ? "md:flex-[0.25]" : "md:flex-[0.75]"
        : "md:flex-[0.5]";
  const panelClipClass = isLocked ? "" : isDesigner
    ? "md:[clip-path:polygon(0_0,100%_0,calc(100%_-_6vw)_100%,0_100%)]"
    : "md:[clip-path:polygon(6vw_0,100%_0,100%_100%,0_100%)]";

  return (
    <button
      type="button"
      aria-label={`Explore ${isDesigner ? t("uxuiDesigner") : t("dancer")} portfolio`}
      aria-pressed={isLocked}
      disabled={lockedRole !== null}
      onMouseEnter={() => !lockedRole && onHoverStart(role.id)}
      onMouseLeave={() => !lockedRole && onHoverEnd()}
      onFocus={() => !lockedRole && onHoverStart(role.id)}
      onBlur={() => !lockedRole && onHoverEnd()}
      onTouchStart={() => !lockedRole && onHoverStart(role.id)}
      onClick={() => {
        if (lockedRole) return;
        if (!isActive) {
          onHoverStart(role.id);
          return;
        }
        onSelect(role.id);
      }}
      className={`role-panel group relative h-1/2 basis-1/2 overflow-hidden text-left text-white outline-none transition-[flex,basis,height,filter,opacity] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:h-full ${desktopFlexClass} ${isActive ? "role-panel-active" : ""} ${isOtherLocked ? "opacity-15 saturate-0" : "opacity-100"} ${panelClipClass}`}
    >
      <RoleWorld role={role} activeRole={activeRole} />
      <div className="absolute inset-0 pixel-corner-frame" style={{ "--frame-color": role.primary } as React.CSSProperties} />
      <div
        className={`role-touch-selected-frame pointer-events-none absolute inset-2 z-20 border-2 transition-opacity duration-200 md:hidden ${isActive ? "opacity-100" : "opacity-0"}`}
        style={{ borderColor: role.primary, boxShadow: `inset 0 0 0 2px ${role.dark}, 0 0 18px ${role.primary}` }}
        aria-hidden="true"
      />

      <div
          className={`lobby-mobile-touch-hint pointer-events-none absolute top-14 z-30 md:hidden ${isDesigner ? "left-4" : "right-4"}`}
        aria-live="polite"
      >
        <span
          className={`pixel-hud-panel inline-block border px-2 py-1 font-rajdhani text-[0.52rem] font-black uppercase tracking-[0.16em] transition-all duration-200 ${
            isActive ? "animate-pulse text-white" : "text-white/65"
          }`}
          style={{ borderColor: `${role.primary}${isActive ? "ee" : "66"}`, "--hud-glow": role.primary, background: `${role.dark}df` } as React.CSSProperties}
        >
          {isActive ? `${t("ready")} // TAP AGAIN` : "TAP TO PREVIEW"}
        </span>
      </div>

      <div
        className={`lobby-archive-access pointer-events-none absolute top-5 z-20 hidden w-48 pixel-hud-panel p-3 font-rajdhani text-[0.66rem] font-black uppercase tracking-[0.18em] md:block ${isDesigner ? "left-7" : "right-7"}`}
        style={{
          borderColor: `${role.primary}66`,
          "--hud-glow": role.primary,
        } as React.CSSProperties}
      >
          <span className="block text-white/75">{t("archiveAccess")}</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {role.stats.map((stat) => <span key={stat} className="border px-1.5 py-0.5" style={{ borderColor: `${role.primary}88`, color: role.primary }}>{stat}</span>)}
        </div>
      </div>

      <ChibiAvatar
        role={role}
        state={state}
        className={`pointer-events-none absolute z-20 bottom-16 will-change-[left,right] transition-[left,right] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${avatarPosition} ${isOtherLocked ? "hidden" : "block"}`}
      />
      {isActive && !isOtherLocked && (
        <>
          <span
            className={`chibi-slide-speed-lines ${isDesigner ? "chibi-slide-speed-lines-designer -translate-x-16" : "chibi-slide-speed-lines-dancer translate-x-16"} pointer-events-none absolute bottom-24 z-[9] block h-32 w-44 will-change-[left,right] transition-[left,right] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-60 lg:w-72 ${avatarPosition}`}
            style={{ "--speed-primary": role.primary } as React.CSSProperties}
            aria-hidden="true"
          >
            <i /><i /><i />
          </span>
          <span
            className={`pointer-events-none absolute bottom-[4.35rem] z-10 block h-2.5 w-40 will-change-[left,right,transform,filter] transition-[left,right] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-52 lg:w-64 ${avatarPosition}`}
            style={{ "--hover-bar-primary": role.primary, "--hover-bar-shadow": role.dark } as React.CSSProperties}
            aria-hidden="true"
          >
            <span className="chibi-hover-bar absolute inset-0" />
          </span>
          {isLanding && (
            <span
              className={`chibi-hover-land-dust pointer-events-none absolute bottom-[4.7rem] z-30 block h-14 w-44 transition-[left,right] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-60 lg:w-72 ${avatarPosition}`}
              style={{ "--dust-primary": role.primary, "--dust-shadow": role.dark } as React.CSSProperties}
              aria-hidden="true"
            >
              <i /><i /><i /><i /><i />
            </span>
          )}
        </>
      )}

      <div className={`relative z-30 flex h-full min-h-0 flex-col justify-end px-6 pt-8 md:px-10 md:pb-24 lg:px-16 ${isDesigner ? "items-start pb-10 text-left" : "items-end pb-20 text-right"}`}>
        <div className={`lobby-role-copy max-w-[34rem] transition-all duration-500 ${isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90"}`}>
          <p className="mb-2 inline-block pixel-tag px-2.5 py-1 font-rajdhani text-xs font-black uppercase tracking-[0.32em] md:mb-3 md:px-3 md:text-sm" style={{ borderColor: `${role.primary}aa`, background: `${role.dark}e8`, color: role.primary }}>
            {isDesigner ? t("player01") : t("player02")}
          </p>
          <h2 className={`lobby-role-title max-w-[7.8ch] pixel-title font-bebas text-[clamp(3.2rem,12vw,5.8rem)] leading-[0.78] tracking-[0.035em] text-white transition-[opacity,transform] duration-500 ${isCompressedKoreanDesigner ? "md:text-[clamp(2.8rem,3.1vw,3.8rem)]" : "md:text-[clamp(4.2rem,7.6vw,8.3rem)]"}`}>
            {isDesigner ? <><span className="block">UX</span><span className={`block ${language === "kr" ? "whitespace-nowrap [word-break:keep-all]" : ""}`}>{designerTitle}</span></> : t("dancer")}
          </h2>
          <p className="lobby-role-subtitle mt-2 max-w-[28ch] skew-x-[-8deg] font-rajdhani text-xs font-semibold uppercase tracking-[0.18em] text-white/85 md:mt-3 md:text-[0.95rem]">
            {isDesigner ? t("designerSubtitle") : t("dancerSubtitle")}
          </p>
          <span className="mobile-role-entry-cta mt-3 flex min-h-11 w-full max-w-[15.5rem] items-center border-2 px-3 py-2 font-rajdhani text-[0.7rem] font-black uppercase leading-tight tracking-[0.15em] md:hidden" style={{ borderColor: `${role.primary}${isActive ? "ee" : "a8"}`, color: isActive ? role.primary : "rgba(255,255,255,.94)", "--touch-cta-primary": role.primary, "--touch-cta-dark": role.dark } as React.CSSProperties}>
            <small className="mr-2 border-r pr-2 font-bebas text-base leading-none" style={{ borderColor: `${role.primary}99`, color: role.primary }}>{isDesigner ? "01" : "02"}</small>
            <span>{isActive ? "TAP TO ENTER ARCHIVE" : "TAP TO PREVIEW"}</span>
          </span>
          {isActive && !isLocked && (
            <span className="lobby-selection-cue mt-4 hidden border-2 bg-black/75 px-3 py-1.5 font-rajdhani text-[0.66rem] font-black uppercase tracking-[0.22em] text-white md:inline-block" style={{ borderColor: `${role.primary}cc`, color: role.primary, "--cue-glow": role.primary } as React.CSSProperties}>
              CLICK TO ENTER ARCHIVE
            </span>
          )}
          {(isLocked || isActive) && (
            <span className="mt-4 inline-block pixel-hud-panel px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/90" style={{ borderColor: `${role.primary}88`, "--hud-glow": role.primary } as React.CSSProperties}>
              {isLocked ? "LET'S GO" : t("ready")}
            </span>
          )}
        </div>
      </div>

      {isLocked && <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center bg-black/40"><span className="selected-hit border-2 px-5 py-3 text-center font-rajdhani text-[1.1rem] font-black uppercase leading-none tracking-[0.16em] md:px-7 md:py-4 md:text-[2.1rem]" style={{ borderColor: role.primary, color: role.primary, background: `${role.dark}d9` }}><small className="mb-2 block text-[0.55em] tracking-[0.32em] text-white">LET&apos;S GO</small>ARCHIVE ACCESS<br />GRANTED</span></div>}
    </button>
  );
}

function IntroScreen({ onSelect }: { onSelect: (view: View) => void }) {
  const { t } = useLanguage();
  const { selectRole: setSelectedRole } = useRoleTheme();
  const { launchArchiveAudio, playRoleHoverJump } = useGameAudio();
  const { markRolePlayed, markTutorialSeen, progress } = useGameProgress();
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [landingRole, setLandingRole] = useState<Role | null>(null);
  const [lockedRole, setLockedRole] = useState<Role | null>(null);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(() => !progress.tutorialSeen);
  const [tutorialStep, setTutorialStep] = useState<number | null>(null);
  const selectTimer = useRef<number | undefined>(undefined);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => {
    if (selectTimer.current) window.clearTimeout(selectTimer.current);
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
  }, []);

  useEffect(() => {
    if (!showStartScreen) return;
    const begin = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setShowStartScreen(false);
      setTutorialStep(0);
    };
    window.addEventListener("keydown", begin, true);
    return () => window.removeEventListener("keydown", begin, true);
  }, [showStartScreen]);

  useEffect(() => {
    if (tutorialStep === null) return;
    const advance = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (event.key === "Escape") { markTutorialSeen(); setTutorialStep(null); }
      else if (tutorialStep === 0 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) setTutorialStep(1);
      else if (tutorialStep === 1 && event.key === "ArrowUp") setTutorialStep(2);
      else if (tutorialStep === 2 && event.key === "ArrowDown") setTutorialStep(3);
      else if (tutorialStep === 3 && (event.key === "Enter" || event.key === " ")) { markTutorialSeen(); setTutorialStep(null); }
    };
    window.addEventListener("keydown", advance, true);
    return () => window.removeEventListener("keydown", advance, true);
  }, [markTutorialSeen, tutorialStep]);

  const handleHoverStart = (role: Role) => {
    if (lockedRole || activeRole === role) return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setLandingRole(null);
    setActiveRole(role);
    playRoleHoverJump(role);
    hoverTimer.current = window.setTimeout(() => setLandingRole(role), HOVER_MOVE_MS);
  };

  const handleHoverEnd = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setLandingRole(null);
    setActiveRole(null);
  };

  const handleRoleSelection = (role: Role) => {
    if (lockedRole) return;
    setSelectedRole(role);
    launchArchiveAudio(role);
    markRolePlayed(role);
    setLockedRole(role);
    setActiveRole(role);
    selectTimer.current = window.setTimeout(() => onSelect(role), 420);
  };

  const handleQuickArchive = (role: Role) => {
    if (lockedRole) return;
    setShowQuickMenu(false);
    setSelectedRole(role);
    launchArchiveAudio(role);
    markRolePlayed(role);
    onSelect(role);
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
          <p className="choose-banner font-rajdhani text-xs font-black uppercase tracking-[0.46em] text-white/90">{t("chooseYourPlayer")}</p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-cyan-300/70" />
            <span className="font-bebas text-2xl tracking-[0.18em] text-white">01 <span className="text-white/40">VS</span> 02</span>
            <span className="h-px w-10 bg-orange-300/70" />
          </div>
        </div>
      </header>

      <div className="absolute right-3 top-3 z-50 md:right-8 md:top-7">
        <button
          type="button"
          onClick={() => setShowQuickMenu((open) => !open)}
          aria-expanded={showQuickMenu}
          aria-controls="lobby-quick-menu"
          className="lobby-quick-access pixel-hud-panel border-2 border-white/75 bg-[#05080df0] px-3 py-2 font-rajdhani text-[0.66rem] font-black uppercase tracking-[0.16em] text-white transition-colors hover:border-cyan-200 hover:bg-cyan-300 hover:text-[#06101e]"
        >
          <span className="block">{t("quickMenu")}</span>
          <span className="mt-0.5 block text-[0.5rem] tracking-[0.15em] text-cyan-100/80">{t("skipToProjects")}</span>
        </button>
        {showQuickMenu && (
          <aside id="lobby-quick-menu" className="absolute right-0 top-[calc(100%+0.5rem)] w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden border-4 border-cyan-300/65 bg-[#05080df5] p-3 shadow-[6px_6px_0_rgba(0,0,0,0.65)]" aria-label={t("quickMenu")}>
            <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.16] [image-rendering:pixelated]" style={{ backgroundImage: `url(${FH_CONSOLE_REFERENCE})` }} />
            <div className="relative">
              <div className="mb-3 border-b border-white/25 pb-2">
                <p className="font-rajdhani text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{t("skipToProjects")}</p>
                <p className="mt-1 font-rajdhani text-[0.62rem] uppercase tracking-[0.12em] text-white/60">DIRECT ARCHIVE ACCESS // NO GAMEPLAY REQUIRED</p>
              </div>
              <div className="grid gap-2">
                <button type="button" onClick={() => handleQuickArchive("designer")} className="border border-cyan-300/60 bg-[#06101ed9] p-3 text-left transition-colors hover:bg-cyan-300 hover:text-[#06101e]"><span className="font-bebas text-xl">01</span><span className="ml-3 font-rajdhani text-sm font-black uppercase tracking-[0.14em]">{t("designerQuickAccess")}</span></button>
                <button type="button" onClick={() => handleQuickArchive("dancer")} className="border border-orange-300/60 bg-[#200806d9] p-3 text-left text-orange-100 transition-colors hover:bg-orange-300 hover:text-[#1b0603]"><span className="font-bebas text-xl">02</span><span className="ml-3 font-rajdhani text-sm font-black uppercase tracking-[0.14em]">{t("dancerQuickAccess")}</span></button>
              </div>
            </div>
          </aside>
        )}
      </div>

      <div className="relative z-10 flex h-full flex-col md:flex-row">
        {roles.map((role) => <RolePanel key={role.id} role={role} activeRole={activeRole} landingRole={landingRole} lockedRole={lockedRole} onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} onSelect={handleRoleSelection} />)}
      </div>
      {tutorialStep !== null && (
        <div className="tutorial-modal absolute inset-0 z-[60] grid place-items-center bg-black/10" role="dialog" aria-modal="true" aria-label={t("tutorialLabel")} onPointerDown={(event) => { if (event.target === event.currentTarget) { event.preventDefault(); event.stopPropagation(); } }}>
          <div className="tutorial-close absolute right-3 top-3 flex items-center gap-2 sm:right-6 sm:top-6"><p className="tutorial-skip-cue pointer-events-none hidden border border-white/40 bg-[#05080ddd] px-2 py-1 font-rajdhani text-[0.58rem] font-black uppercase tracking-[0.16em] text-white/70 sm:block">{t("tutorialSkip")}</p><button type="button" aria-label={t("tutorialClose")} onClick={(event) => { event.preventDefault(); event.stopPropagation(); markTutorialSeen(); setTutorialStep(null); }} className="grid h-10 w-10 place-items-center border-2 border-white/65 bg-[#05080ddd] font-bebas text-xl leading-none text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">X</button></div>
          <div className="tutorial-card w-[min(20rem,calc(100vw-2.25rem))] border-4 border-white/65 bg-[#05080df0] p-3 text-center shadow-[6px_6px_0_rgba(0,0,0,0.7)] sm:w-[min(31rem,calc(100vw-2rem))] sm:p-4">
            <p className="font-rajdhani text-[0.6rem] font-black uppercase tracking-[0.2em] text-white/70 sm:text-xs sm:tracking-[0.3em]">{t("tutorialLabel")} // {tutorialStep + 1}/4</p>
            <p className="mt-1 font-bebas text-xl leading-tight tracking-[0.055em] text-white sm:mt-2 sm:text-2xl sm:tracking-[0.08em]"><span className="tutorial-mobile-copy sm:hidden">{[t("tutorialMobileMove"), t("tutorialMobileJump"), t("tutorialMobileCrouch"), t("tutorialMobileConfirm")][tutorialStep]}</span><span className="tutorial-desktop-copy hidden sm:inline">{[t("tutorialMove"), t("tutorialJump"), t("tutorialCrouch"), t("tutorialConfirm")][tutorialStep]}</span></p>
            <p className="mt-1 font-rajdhani text-[0.55rem] font-bold uppercase tracking-[0.1em] text-white/60 sm:mt-2 sm:text-[0.65rem] sm:tracking-[0.15em]"><span className="tutorial-mobile-copy sm:hidden">{t("tutorialMobileHint")}</span><span className="tutorial-desktop-copy hidden sm:inline">{t("tutorialHint")}</span></p>
          </div>
        </div>
      )}
      {showStartScreen && (
        <div className="pixel-start-overlay absolute inset-0 z-[90] grid place-items-center text-center" onClick={() => { setShowStartScreen(false); setTutorialStep(0); }}>
          <div className="pixel-press-start border-4 border-white/75 px-7 py-5 font-bebas text-[clamp(2.3rem,5.8vw,5rem)] leading-none tracking-[0.13em] text-white shadow-[8px_8px_0_rgba(0,0,0,0.72)]">
            <span className="pixel-start-desktop-copy">PRESS ANY KEY</span><span className="pixel-start-mobile-copy">TAP TO START</span>
            <small className="mt-2 block font-rajdhani text-[0.23em] font-black tracking-[0.36em] text-white/80"><span className="pixel-start-desktop-copy">TO START // PORTFOLIO QUEST</span><span className="pixel-start-mobile-copy">TAP ANYWHERE TO ENTER</span></small>
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); setShowStartScreen(false); setShowQuickMenu(true); }} className="pixel-start-quick-menu absolute top-6 right-6 border-2 border-white/70 bg-[#05080ddb] px-4 py-2 text-left font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.18em] text-white transition-colors hover:border-cyan-200 hover:bg-cyan-300 hover:text-[#06101e]">
            <span className="block">{t("quickMenu")}</span>
            <span className="mt-0.5 block text-[0.52rem] tracking-[0.14em] text-cyan-100/85">{t("skipToProjects")}</span>
          </button>
        </div>
      )}
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
          className="mobile-bottom-left-hud pixel-hud-panel fixed bottom-4 left-4 z-[70] grid h-10 place-items-center border-[var(--player-primary)] bg-[#05080dcc] px-3 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/85 shadow-[3px_3px_0_rgba(0,0,0,0.55)] transition hover:bg-[var(--player-primary)] hover:text-black md:bottom-6 md:left-6"
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
          className="mobile-support-hud pixel-hud-panel fixed bottom-4 left-[6.85rem] z-[70] grid h-10 place-items-center border-[#ffdd00]/70 bg-[#05080dcc] px-3 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/85 shadow-[3px_3px_0_rgba(0,0,0,0.55)] transition hover:bg-[#ffdd00] hover:text-black md:bottom-6 md:left-[8.5rem]"
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
