import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import DesignerPortfolioSlider from "./DesignerPortfolioSlider";
import DancerPortfolioSlider from "./DancerPortfolioSlider";

/**
 * Precision in Motion — Interactive Portfolio
 * 
 * Design Philosophy: Embodied Interaction meets Digital Design
 * A UX/UI Designer with a dance background showcasing unique strengths
 * in movement-based interaction, gesture-driven UX, and spatial computing.
 * 
 * Layout: Horizontal Slide Architecture
 * - Main Page: Character Selection (no vertical scroll)
 * - After Selection: About → Works → Skills → Contact via horizontal slides
 */

type Role = "designer" | "dancer";
type View = "main" | Role;

type RoleOption = {
  id: Role;
  eyebrow: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
};

const roles: RoleOption[] = [
  {
    id: "designer",
    eyebrow: "PLAYER 01",
    title: "UX/UI DESIGNER",
    subtitle: "Systems, interfaces, flow, precision",
    imageSrc:
      "/manus-storage/Gemini_Generated_Image_s30zdos30zdos30z_28271392.png",
      imageAlt:
      "Close-up portrait of a UX/UI designer wearing gold-rimmed glasses",
  },
  {
    id: "dancer",
    eyebrow: "PLAYER 02",
    title: "DANCER",
    subtitle: "Rhythm, presence, battle energy",
    imageSrc:
      "/manus-storage/071222_Sunghee15_ig_26d4d224.jpg",
      imageAlt:
      "Close-up portrait of a dancer with blonde hair and elegant presence",
  },
];

function RolePortrait({ role, activeRole }: { role: RoleOption; activeRole: Role | null }) {
  const [loaded, setLoaded] = useState(false);
  const isActive = activeRole === role.id;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {!loaded && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.12),rgba(0,0,0,0.72)_58%)]">
          <div className="h-20 w-20 skew-x-[-14deg] border-2 border-white/25 bg-white/5 shadow-[0_0_45px_rgba(255,255,255,0.12)] md:h-24 md:w-24">
            <div className="h-full w-full animate-pulse bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.2),transparent)]" />
          </div>
        </div>
      )}
      <img
        src={role.imageSrc}
        alt={role.imageAlt}
        loading="eager"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-500 ease-in-out ${
          role.id === "designer" ? "object-[45%_35%]" : "object-center"
        } ${isActive ? "scale-105 brightness-110 saturate-125 contrast-110" : "scale-100 brightness-75 saturate-90"}`}
      />
      {role.id === "designer" && (
        <div className="absolute inset-0 grid-pulse" style={{
          backgroundImage: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.15), transparent)",
          backgroundSize: "100% 2px",
          backgroundPosition: "0 0",
          animation: "data-stream 6s linear infinite",
        }} />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.86),rgba(0,0,0,0.22)_45%,rgba(0,0,0,0.12))]" />
      <div className="absolute inset-0 mix-blend-overlay opacity-35 arcade-scanline" />
    </div>
  );
}

function RolePanel({
  role,
  activeRole,
  setActiveRole,
  onSelect,
}: {
  role: RoleOption;
  activeRole: Role | null;
  setActiveRole: (role: Role | null) => void;
  onSelect: (role: Role) => void;
}) {
  const { t } = useLanguage();
  const isActive = activeRole === role.id;
  const isDesigner = role.id === "designer";
  const isOtherActive = activeRole !== null && !isActive;
  const desktopFlexClass =
    activeRole === "designer"
      ? isDesigner
        ? "md:flex-[0.75]"
        : "md:flex-[0.25]"
      : activeRole === "dancer"
        ? "md:flex-[0.5]"
        : isDesigner
          ? "md:flex-[0.7]"
          : "md:flex-[0.3]";

  return (
    <button
      type="button"
      aria-label={`Explore ${role.id === "designer" ? t("uxuiDesigner") : t("dancer")} portfolio`}
      onMouseEnter={() => setActiveRole(role.id)}
      onMouseLeave={() => setActiveRole(null)}
      onFocus={() => setActiveRole(role.id)}
      onBlur={() => setActiveRole(null)}
      onClick={() => onSelect(role.id)}
      className={`role-panel group relative h-1/2 basis-1/2 overflow-hidden text-left text-white outline-none transition-all duration-500 ease-in-out md:h-full ${desktopFlexClass}`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDesigner
            ? "bg-[linear-gradient(135deg,#07111f_0%,#10223d_48%,#05080f_100%)]"
            : "bg-[linear-gradient(135deg,#3b0905_0%,#991b0d_48%,#ef5b1b_100%)]"
        } ${isActive ? "opacity-100" : "opacity-[0.82]"}`}
      />
      <RolePortrait role={role} activeRole={activeRole} />
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDesigner
            ? "bg-[radial-gradient(circle_at_22%_18%,rgba(37,166,255,0.34),transparent_36%)]"
            : "bg-[radial-gradient(circle_at_78%_18%,rgba(255,196,82,0.36),transparent_34%)]"
        } ${isActive ? "opacity-100" : "opacity-30"}`}
      />
      <div
        className={`pointer-events-none absolute top-6 z-20 hidden h-[calc(100%-3rem)] w-10 border-y-2 border-white/55 md:block ${
          isDesigner ? "left-7 border-l-2" : "right-7 border-r-2"
        } ${isActive ? "opacity-100" : "opacity-40"}`}
      />
      <div
        className={`relative z-20 flex h-full min-h-0 flex-col justify-end px-6 pb-10 pt-8 md:px-10 md:pb-24 lg:px-16 ${
          isDesigner ? "items-start text-left" : "items-end text-right"
        }`}
      >
        <div
          className={`max-w-[34rem] transition-all duration-500 ${
            isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90"
          } ${isOtherActive ? "scale-[0.96] opacity-75" : "scale-100"}`}
        >
          <p
            className={`mb-2 inline-block skew-x-[-12deg] border px-2.5 py-1 font-rajdhani text-xs font-black uppercase tracking-[0.32em] md:mb-3 md:px-3 md:text-sm ${
              isDesigner ? "border-cyan-200/45 bg-cyan-300/10 text-cyan-100" : "border-orange-100/45 bg-orange-300/10 text-orange-100"
            }`}
          >
            {isDesigner ? t("player01") : t("player02")}
          </p>
          <h2
            className={`max-w-[7.8ch] skew-x-[-9deg] font-bebas text-[clamp(3.2rem,12vw,5.8rem)] leading-[0.78] tracking-[0.035em] text-white drop-shadow-[7px_8px_0_rgba(0,0,0,0.38)] transition-[opacity,transform] duration-500 md:text-[clamp(4.2rem,7.6vw,8.3rem)] ${
              isOtherActive ? "opacity-80" : "opacity-100"
            }`}
          >
            {isDesigner ? t("uxuiDesigner") : t("dancer")}
          </h2>
          <p
            className={`mt-2 max-w-[28ch] skew-x-[-8deg] font-rajdhani text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition-opacity duration-500 md:mt-3 md:text-sm ${
              isOtherActive ? "opacity-60" : "opacity-100"
            }`}
          >
            {isDesigner ? t("designerSubtitle") : t("dancerSubtitle")}
          </p>
        </div>
      </div>
    </button>
  );
}

function IntroScreen({ onSelect }: { onSelect: (view: View) => void }) {
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(34,211,238,0.15),rgba(0,0,0,0.5))]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 arcade-scanline" />

      <div className="relative z-10 flex h-full flex-col md:flex-row">
        {roles.map((role) => (
          <RolePanel
            key={role.id}
            role={role}
            activeRole={activeRole}
            setActiveRole={setActiveRole}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default function RoleSelectIntro() {
  const [view, setView] = useState<View>("main");
  const { t } = useLanguage();

  return (
    <main className="h-[100dvh] overflow-hidden bg-black text-white">
      {view === "main" && (
        <>
          <LanguageSwitcher />
          <IntroScreen onSelect={setView} />
        </>
      )}
      {view === "designer" && <DesignerPortfolioSlider onBack={() => setView("main")} />}
      {view === "dancer" && <DancerPortfolioSlider onBack={() => setView("main")} />}
    </main>
  );
}
