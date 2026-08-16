import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import DesignerPortfolioSlider from "./DesignerPortfolioSlider";
import DancerPortfolioSlider from "./DancerPortfolioSlider";

/**
 * Design philosophy — Neo-Arcade Character Lobby:
 * a cinematic split-screen selection room combines portrait identity with a
 * role-specific chibi avatar, HUD-style stat modules, and a short launch state.
 */

type Role = "designer" | "dancer";
type View = "main" | Role;
type SpriteState = "idle" | "walk" | "jump" | "celebrate";

type RoleOption = {
  id: Role;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  spriteSheet: string;
  primary: string;
  dark: string;
  stats: [string, string, string];
};

const LOBBY_BACKGROUND = "/manus-storage/character-select-arcade-lobby_99fb11d2.png";

const roles: RoleOption[] = [
  {
    id: "designer",
    eyebrow: "PLAYER 01",
    title: "UX DESIGNER",
    subtitle: "Systems, interfaces, flow, precision",
    imageSrc: "/manus-storage/Gemini_Generated_Image_s30zdos30zdos30z_28271392.png",
    imageAlt: "Close-up portrait of a UX designer wearing gold-rimmed glasses",
    spriteSheet: "/manus-storage/designer-chibi-sprite-sheet_011ed7b7.png",
    primary: "#37E7FF",
    dark: "#06101E",
    stats: ["FLOW 98", "UX 96", "SYSTEMS 92"],
  },
  {
    id: "dancer",
    eyebrow: "PLAYER 02",
    title: "DANCER",
    subtitle: "Rhythm, presence, battle energy",
    imageSrc: "/manus-storage/071222_Sunghee15_ig_26d4d224.jpg",
    imageAlt: "Close-up portrait of a dancer with blonde hair and elegant presence",
    spriteSheet: "/manus-storage/dancer-chibi-sprite-sheet_e9dd17a4.png",
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
};

function ChibiAvatar({ role, state }: { role: RoleOption; state: SpriteState }) {
  const [ready, setReady] = useState(false);
  const animationClass = state === "idle" ? "chibi-idle" : state === "walk" ? "chibi-walk" : state === "jump" ? "chibi-jump" : "chibi-celebrate";

  return (
    <div className="relative h-44 w-40 sm:h-56 sm:w-52 lg:h-72 lg:w-64" aria-hidden="true">
      <img className="sr-only" src={role.spriteSheet} alt="" onLoad={() => setReady(true)} onError={() => setReady(false)} />
      <div className="absolute inset-x-4 bottom-1 h-7 rounded-[50%] blur-md" style={{ background: `${role.primary}55` }} />
      <div className={`absolute inset-0 ${animationClass}`}>
        {ready ? (
          <div
            className="h-full w-full bg-no-repeat [image-rendering:pixelated] [image-rendering:crisp-edges]"
            style={{
              backgroundImage: `url(${role.spriteSheet})`,
              backgroundPosition: spritePositions[state],
              backgroundSize: "200% 200%",
            }}
          />
        ) : (
          <div className="absolute left-1/2 top-1/2 h-32 w-24 -translate-x-1/2 -translate-y-1/2 [image-rendering:pixelated]" aria-label={`${role.id} chibi pixel avatar`}>
            <div className="absolute left-1/2 top-0 h-9 w-[4.6rem] -translate-x-1/2 rounded-t-[0.85rem]" style={{ background: role.id === "designer" ? "#132434" : "#d7a86b" }} />
            {role.id === "dancer" && <><div className="absolute left-0 top-4 h-12 w-4 rounded-bl-xl bg-[#d7a86b]" /><div className="absolute right-0 top-4 h-14 w-4 rounded-br-xl bg-[#d7a86b]" /></>}
            <div className="absolute left-1/2 top-5 h-12 w-14 -translate-x-1/2 rounded-[0.8rem] border-2 border-[#5f3a2b] bg-[#f5cfb0]" />
            <div className="absolute left-[1.65rem] top-[2.3rem] h-3 w-3 rounded-sm bg-[#17202a] shadow-[22px_0_0_#17202a]" />
            <div className="absolute left-[1.95rem] top-[2.5rem] h-1 w-1 rounded-full bg-white shadow-[22px_0_0_#fff]" />
            <div className="absolute left-[1.55rem] top-[3.35rem] h-2 w-2 rounded-full bg-[#ef8f98]/70 shadow-[28px_0_0_rgba(239,143,152,0.7)]" />
            {role.id === "designer" && <><div className="absolute left-[1.25rem] top-[2.05rem] h-5 w-5 rounded-sm border-2 border-[#c9eff8]" /><div className="absolute right-[1.25rem] top-[2.05rem] h-5 w-5 rounded-sm border-2 border-[#c9eff8]" /><div className="absolute left-1/2 top-[2.65rem] h-px w-3 -translate-x-1/2 bg-[#c9eff8]" /></>}
            <div className="absolute left-1/2 top-[4.3rem] h-11 w-[4.4rem] -translate-x-1/2 rounded-t-[0.55rem] border-4" style={{ background: role.id === "designer" ? role.primary : "#1d1111", borderColor: role.dark }} />
            {role.id === "dancer" && <div className="absolute left-1/2 top-[5.2rem] h-2 w-[4.1rem] -translate-x-1/2 bg-[#ff6b17]" />}
            <div className="absolute left-[1.1rem] top-[6.8rem] h-9 w-5 rounded-b-md" style={{ background: role.dark }} />
            <div className="absolute right-[1.1rem] top-[6.8rem] h-9 w-5 rounded-b-md" style={{ background: role.dark }} />
            <div className="absolute left-[0.85rem] top-[8.5rem] h-2 w-6 rounded-sm" style={{ background: role.primary }} />
            <div className="absolute right-[0.85rem] top-[8.5rem] h-2 w-6 rounded-sm" style={{ background: role.primary }} />
          </div>
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
  const { t } = useLanguage();
  const isDesigner = role.id === "designer";
  const isActive = activeRole === role.id;
  const isLocked = lockedRole === role.id;
  const isOtherLocked = lockedRole !== null && !isLocked;
  const state: SpriteState = isLocked ? "celebrate" : isActive ? "walk" : "idle";
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
      onMouseEnter={() => !lockedRole && setActiveRole(role.id)}
      onMouseLeave={() => !lockedRole && setActiveRole(null)}
      onFocus={() => !lockedRole && setActiveRole(role.id)}
      onBlur={() => !lockedRole && setActiveRole(null)}
      onClick={() => onSelect(role.id)}
      className={`role-panel group relative h-1/2 basis-1/2 overflow-hidden text-left text-white outline-none transition-[flex,filter,opacity] duration-500 ease-in-out md:h-full ${desktopFlexClass} ${isOtherLocked ? "opacity-15 saturate-0" : "opacity-100"} ${isDesigner ? "md:[clip-path:polygon(0_0,100%_0,calc(100%_-_6vw)_100%,0_100%)]" : "md:[clip-path:polygon(6vw_0,100%_0,100%_100%,0_100%)]"}`}
    >
      <div className="absolute inset-0 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${role.dark} 0%, ${role.primary}33 54%, ${role.dark} 100%)`, opacity: isActive || isLocked ? 0.92 : 0.68 }} />
      <RolePortrait role={role} activeRole={activeRole} />
      <div className="absolute inset-0 transition-opacity duration-500" style={{ background: `radial-gradient(circle at ${isDesigner ? "24%" : "76%"} 24%, ${role.primary}55, transparent 38%)`, opacity: isActive ? 1 : 0.42 }} />

      <div className={`pointer-events-none absolute top-5 z-20 hidden w-44 border-y border-white/45 bg-black/30 p-3 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.18em] backdrop-blur-sm md:block ${isDesigner ? "left-7 border-l" : "right-7 border-r"}`}>
        <span className="block text-white/45">{t("archiveAccess")}</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {role.stats.map((stat) => <span key={stat} className="border px-1.5 py-0.5" style={{ borderColor: `${role.primary}88`, color: role.primary }}>{stat}</span>)}
        </div>
      </div>

      <div className={`pointer-events-none absolute z-20 bottom-16 ${isDesigner ? "right-5 sm:right-10" : "left-5 sm:left-10"} ${isOtherLocked ? "hidden" : "block"}`}>
        <ChibiAvatar role={role} state={state} />
      </div>

      <div className={`relative z-30 flex h-full min-h-0 flex-col justify-end px-6 pb-10 pt-8 md:px-10 md:pb-24 lg:px-16 ${isDesigner ? "items-start text-left" : "items-end text-right"}`}>
        <div className={`max-w-[34rem] transition-all duration-500 ${isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90"}`}>
          <p className="mb-2 inline-block skew-x-[-12deg] border px-2.5 py-1 font-rajdhani text-xs font-black uppercase tracking-[0.32em] md:mb-3 md:px-3 md:text-sm" style={{ borderColor: `${role.primary}aa`, background: `${role.primary}1c`, color: role.primary }}>
            {isDesigner ? t("player01") : t("player02")}
          </p>
          <h2 className="max-w-[7.8ch] skew-x-[-9deg] font-bebas text-[clamp(3.2rem,12vw,5.8rem)] leading-[0.78] tracking-[0.035em] text-white drop-shadow-[7px_8px_0_rgba(0,0,0,0.38)] transition-[opacity,transform] duration-500 md:text-[clamp(4.2rem,7.6vw,8.3rem)]">
            {isDesigner ? <>UX<br />{t("uxuiDesigner").replace(/^UX[\s-]*/, "")}</> : t("dancer")}
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
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [lockedRole, setLockedRole] = useState<Role | null>(null);
  const selectTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => { if (selectTimer.current) window.clearTimeout(selectTimer.current); }, []);

  const selectRole = (role: Role) => {
    if (lockedRole) return;
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

      <header className="pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2 text-center md:top-8">
        <p className="choose-banner font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.46em] text-white/70 md:text-xs">{t("chooseYourPlayer")}</p>
        <div className="mt-1 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-cyan-300/70" />
          <span className="font-bebas text-2xl tracking-[0.18em] text-white">01 <span className="text-white/40">VS</span> 02</span>
          <span className="h-px w-10 bg-orange-300/70" />
        </div>
      </header>

      <div className="relative z-10 flex h-full flex-col md:flex-row">
        {roles.map((role) => <RolePanel key={role.id} role={role} activeRole={activeRole} lockedRole={lockedRole} setActiveRole={setActiveRole} onSelect={selectRole} />)}
      </div>
    </section>
  );
}

export default function RoleSelectIntro() {
  const [view, setView] = useState<View>("main");

  return (
    <main className="h-auto min-h-dvh overflow-visible bg-black text-white md:h-[100dvh] md:overflow-hidden">
      {view === "main" && <><LanguageSwitcher theme="cyan" /><IntroScreen onSelect={setView} /></>}
      {view === "designer" && <DesignerPortfolioSlider onBack={() => setView("main")} />}
      {view === "dancer" && <DancerPortfolioSlider onBack={() => setView("main")} />}
    </main>
  );
}
