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
 * a cinematic split-screen selection room combines portrait identity with a
 * role-specific chibi avatar, HUD-style stat modules, and a short launch state.
 */

type Role = "designer" | "dancer";
type View = "main" | Role;
type SpriteState = "idle" | "walk" | "jump" | "celebrate" | "design" | "dance";

type RoleOption = {
  id: Role;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  spriteSheet: string;
  gestureGif: string;
  primary: string;
  dark: string;
  stats: [string, string, string];
};

const LOBBY_BACKGROUND = assetUrl("character-select-arcade-lobby_99fb11d2.png", "character-select-arcade-lobby.png");

const roles: RoleOption[] = [
  {
    id: "designer",
    eyebrow: "PLAYER 01",
    title: "UX DESIGNER",
    subtitle: "Systems, interfaces, flow, precision",
    imageSrc: assetUrl("Gemini_Generated_Image_s30zdos30zdos30z_28271392_722495d2.png", "designer-portrait.png"),
    imageAlt: "Close-up portrait of a UX designer wearing gold-rimmed glasses",
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
    imageSrc: assetUrl("071222_Sunghee15_ig_26d4d224.jpg", "dancer-portrait.jpg"),
    imageAlt: "Close-up portrait of a dancer with blonde hair and elegant presence",
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
  const isGesture = state === "design" || state === "dance";

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

function RolePortrait({ role, activeRole }: { role: RoleOption; activeRole: Role | null }) {
  const [loaded, setLoaded] = useState(false);
  const isActive = activeRole === role.id;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {!loaded && <div className="absolute inset-0 z-10 bg-black/70" />}
      <img
        src={role.imageSrc}
        alt={role.imageAlt}
        loading="eager"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-500 ease-in-out ${role.id === "designer" ? "object-[45%_35%]" : "object-center"} ${isActive ? "scale-105 brightness-110 saturate-125 contrast-110" : "scale-100 brightness-75 saturate-90"}`}
      />
      <div className="absolute inset-0 mix-blend-overlay opacity-35 arcade-scanline" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9),rgba(0,0,0,0.16)_50%,rgba(0,0,0,0.16))]" />
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
  const state: SpriteState = isLocked ? "celebrate" : isActive ? (isDesigner ? "design" : "dance") : "idle";
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
      <div className="absolute inset-0 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${role.dark} 0%, ${role.primary}33 54%, ${role.dark} 100%)`, opacity: isActive || isLocked ? 0.92 : 0.68 }} />
      <RolePortrait role={role} activeRole={activeRole} />
      <div className="absolute inset-0 transition-opacity duration-500" style={{ background: `radial-gradient(circle at ${isDesigner ? "24%" : "76%"} 24%, ${role.primary}55, transparent 38%)`, opacity: isActive ? 1 : 0.42 }} />

      <div
        className={`pointer-events-none absolute top-5 z-20 hidden w-44 border-y p-3 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.18em] backdrop-blur-[2px] md:block ${isDesigner ? "left-7 border-l" : "right-7 border-r"}`}
        style={{
          background: `linear-gradient(135deg, ${role.dark}24 0%, rgba(0,0,0,0.1) 100%)`,
          borderColor: `${role.primary}66`,
          boxShadow: `0 10px 30px ${role.dark}30`,
        }}
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
          <p className="mb-2 inline-block skew-x-[-12deg] border px-2.5 py-1 font-rajdhani text-xs font-black uppercase tracking-[0.32em] md:mb-3 md:px-3 md:text-sm" style={{ borderColor: `${role.primary}aa`, background: `${role.primary}1c`, color: role.primary }}>
            {isDesigner ? t("player01") : t("player02")}
          </p>
          <h2 className={`max-w-[7.8ch] skew-x-[-9deg] font-bebas text-[clamp(3.2rem,12vw,5.8rem)] leading-[0.78] tracking-[0.035em] text-white drop-shadow-[7px_8px_0_rgba(0,0,0,0.38)] transition-[opacity,transform] duration-500 ${isCompressedKoreanDesigner ? "md:text-[clamp(2.8rem,3.1vw,3.8rem)]" : "md:text-[clamp(4.2rem,7.6vw,8.3rem)]"}`}>
            {isDesigner ? <><span className="block">UX</span><span className={`block ${language === "kr" ? "whitespace-nowrap [word-break:keep-all]" : ""}`}>{designerTitle}</span></> : t("dancer")}
          </h2>
          <p className="mt-2 max-w-[28ch] skew-x-[-8deg] font-rajdhani text-xs font-semibold uppercase tracking-[0.18em] text-white/70 md:mt-3 md:text-sm">
            {isDesigner ? t("designerSubtitle") : t("dancerSubtitle")}
          </p>
          <span className="mt-4 inline-block border px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/90" style={{ borderColor: `${role.primary}88`, background: `${role.dark}b8` }}>
            {isLocked ? `${t("loadingPlayer")}…` : isActive ? t("ready") : t("hoverToPreview")}
          </span>
        </div>
      </div>

      {isLocked && <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center bg-black/40"><span className="selected-hit border-2 px-5 py-3 font-rajdhani text-sm font-black uppercase tracking-[0.32em]" style={{ borderColor: role.primary, color: role.primary, background: `${role.dark}d9` }}>{t("ready")}</span></div>}
    </button>
  );
}

function IntroScreen({ onSelect }: { onSelect: (view: View) => void }) {
  const { t } = useLanguage();
  const { selectRole: setSelectedRole } = useRoleTheme();
  const { playConfirm, startRoleMusic } = useGameAudio();
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [lockedRole, setLockedRole] = useState<Role | null>(null);
  const selectTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => { if (selectTimer.current) window.clearTimeout(selectTimer.current); }, []);

  const handleRoleSelection = (role: Role) => {
    if (lockedRole) return;
    setSelectedRole(role);
    playConfirm();
    startRoleMusic(role);
    setLockedRole(role);
    setActiveRole(role);
    selectTimer.current = window.setTimeout(() => onSelect(role), 420);
  };

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${LOBBY_BACKGROUND})` }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_66%_72%_at_50%_0%,rgba(255,255,255,0.16),transparent_62%),linear-gradient(90deg,rgba(3,12,25,0.55),transparent_44%,rgba(32,8,6,0.58))]" />
      <div className="pointer-events-none absolute inset-0 arcade-lobby-grid opacity-45" />
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
    <main className="h-auto min-h-dvh overflow-visible bg-black text-white md:h-[100dvh] md:overflow-hidden">
      <button
        type="button"
        onClick={toggleMuted}
        className="fixed bottom-4 left-4 z-[70] border border-white/30 bg-black/65 px-3 py-2 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm transition hover:border-[var(--player-primary)] hover:text-white md:bottom-6 md:left-6"
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
          className="fixed bottom-4 left-[6.85rem] z-[70] border border-white/30 bg-black/65 px-3 py-2 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm transition hover:border-[#ffdd00] hover:text-[#ffdd00] md:bottom-6 md:left-[8.5rem]"
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
