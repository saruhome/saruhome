import { useState, useEffect, useRef, ReactNode } from "react";
import HorizontalSlider from "./HorizontalSlider";
import { useRoleTheme } from "../contexts/RoleContext";
import { useLanguage } from "../contexts/LanguageContext";
import { applicationCaseStudyContent, type ApplicationCaseStudy } from "../lib/applicationCaseStudyContent";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useGameProgress } from "../contexts/GameProgressContext";
import { useReducedMotion } from "../contexts/MotionContext";

/**
 * Design System — Pixel Command Console + Project Exhibition
 * The console shell stays dark and game-like; Behance UI is displayed as bright, hard-edged exhibition work with restrained role-color signal light.
 */

const CASE_STUDY_CONSOLE = "/optimized/case-study-console.webp";

const PROJECT_EXHIBITS: Record<string, { src: string; title: string; caption: string }[]> = {
  "01": [
    {
      src: "/manus-storage/sokdak-hero_b6371c09.jpg",
      title: "SokDak · Live learning feed",
      caption: "A warm mobile system that makes Korean slang, cultural context, and community practice easy to scan.",
    },
  ],
  "02": [
    {
      src: "/manus-storage/locaverse-hero_c8fb863c.jpg",
      title: "Locaverse · Value proposition",
      caption: "A clearer B2B entry point that prioritises service relevance, credibility, and one focused next step.",
    },
    {
      src: "/manus-storage/locaverse-report_07387eb9.jpg",
      title: "Locaverse · Expert report route",
      caption: "The lead-generation hand-off is treated as a focused, high-contrast conversion moment.",
    },
  ],
  "03": [
    {
      src: "/manus-storage/smartwash-hero_89808175.jpg",
      title: "Smart Wash · Weather-aware home",
      caption: "A tactile home state turns ambient weather context into a legible washing recommendation.",
    },
    {
      src: "/manus-storage/smartwash-wireframe_16129c6e.jpg",
      title: "Smart Wash · Flow evidence",
      caption: "The complete control flow keeps automatic help and manual agency equally discoverable.",
    },
  ],
  "04": [
    {
      src: "/manus-storage/campy-exhibit_176bde4a.png",
      title: "Campy · Research briefing",
      caption: "A process-led redesign proposal connects audience research, app direction, and interface decisions.",
    },
  ],
  "05": [
    {
      src: "/manus-storage/seekandsight-hifi_b9005159.jpg",
      title: "Seek and Sight · Inclusive learning",
      caption: "Friendly character-led interface work supports adaptive, game-based literacy for young learners.",
    },
  ],
};

function useTerminalText(text: string, speed = 11) {
  const { reducedMotion } = useReducedMotion();
  const [typed, setTyped] = useState(reducedMotion ? text : "");
  useEffect(() => {
    if (reducedMotion) {
      setTyped(text);
      return;
    }
    let index = 0;
    setTyped("");
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [reducedMotion, speed, text]);
  return typed;
}

function TerminalText({ text, speed = 11 }: { text: string; speed?: number }) {
  const typed = useTerminalText(text, speed);
  const isTyping = typed.length < text.length;
  return <span aria-label={text}><span aria-hidden="true">{typed}{isTyping && <i className="terminal-cursor">▌</i>}</span></span>;
}

function StickyNavigation({ onBack, projectId, projectTitle, projectKicker }: { onBack: () => void; projectId: string; projectTitle: string; projectKicker: string }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#020711]/95 border-b-2 border-cyan-300/55 shadow-[0_4px_0_rgba(34,211,238,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-4 mt-4 flex flex-wrap items-center justify-between gap-2 md:mx-8 md:mt-7 md:gap-3 2xl:mx-12 2xl:mt-8 2xl:gap-4">
        <button
          onClick={onBack}
          className="archive-hud-control pixel-hud-panel inline-flex shrink-0 items-center justify-center border-2 border-cyan-200/75 bg-[#05080de8] px-3 py-1.5 text-center font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e] focus-visible:-translate-y-0.5 md:px-4 md:text-xs"
        >
          <span>&lt; {t("backToWorks").toUpperCase()}</span>
        </button>
        <div className="flex shrink-0 items-center gap-2 md:gap-3 2xl:gap-4">
          <div className="archive-hud-control pixel-hud-panel hidden shrink-0 items-center justify-center border-2 border-cyan-200/80 bg-cyan-300/15 px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] text-cyan-100 sm:inline-flex">{t("caseStudy")}</div>
          <ProjectShareButton projectId={projectId} projectTitle={projectTitle} projectKicker={projectKicker} />
          <LanguageSwitcher hud />
        </div>
      </div>
    </nav>
  );
}

function ProjectShareButton({ projectId, projectTitle, projectKicker }: { projectId: string; projectTitle: string; projectKicker: string }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "shared" | "copied" | "failed">("idle");
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const copyProjectLink = async (shareUrl: string) => {
    const copyWithFallback = () => {
      const input = document.createElement("textarea");
      input.value = shareUrl;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(input);
      return copied;
    };

    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        copied = true;
      } else {
        copied = copyWithFallback();
      }
    } catch {
      copied = copyWithFallback();
    }

    setStatus(copied ? "copied" : "failed");
    window.setTimeout(() => setStatus("idle"), 2600);
  };

  const shareProject = async () => {
    const shareUrl = `${window.location.origin}/?project=${encodeURIComponent(projectId)}`;

    if (!canNativeShare) {
      await copyProjectLink(shareUrl);
      return;
    }

    try {
      await navigator.share({
        title: `${projectTitle} — ${t("caseStudy")}`,
        text: projectKicker,
        url: shareUrl,
      });
      setStatus("shared");
      window.setTimeout(() => setStatus("idle"), 2600);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyProjectLink(shareUrl);
    }
  };

  const feedback = status === "shared" ? t("linkShared") : status === "copied" ? t("linkCopied") : status === "failed" ? t("copyLinkFailed") : "";
  const buttonLabel = status === "shared" ? t("linkShared") : status === "copied" ? t("linkCopied") : canNativeShare ? t("shareProject") : t("copyProjectLink");

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={shareProject}
        className={`archive-hud-control pixel-hud-panel inline-flex shrink-0 items-center justify-center border-2 px-3 py-1.5 font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.16em] transition-all duration-200 active:scale-[0.97] md:px-4 md:text-xs ${status === "shared" || status === "copied" ? "border-cyan-200 bg-cyan-300 text-[#06101e]" : "border-cyan-200/75 bg-[#05080de8] text-white hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e] focus-visible:-translate-y-0.5"}`}
        aria-label={canNativeShare ? t("shareProject") : t("copyProjectLink")}
      >
        <span aria-hidden="true">{status === "shared" || status === "copied" ? "✓" : canNativeShare ? "↗" : "⧉"}</span><span className="ml-1 hidden sm:inline">{buttonLabel}</span>
      </button>
      <span className="sr-only" aria-live="polite">{feedback}</span>
      {status === "failed" && <span role="status" className="absolute right-0 top-full z-60 mt-2 w-64 border border-cyan-300/55 bg-[#020711f5] p-2 font-rajdhani text-xs leading-snug text-cyan-100 shadow-[4px_4px_0_rgba(0,0,0,0.72)]">{feedback}</span>}
    </div>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <section className="case-study-page-shell relative flex h-full w-full items-center overflow-hidden bg-[#020711] px-6 py-24 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70 [image-rendering:pixelated]" style={{ backgroundImage: `url(${CASE_STUDY_CONSOLE})` }} />
      <div className="pointer-events-none absolute inset-0 bg-[#020711]/42" />
      <div className="pointer-events-none absolute inset-0 opacity-30 arcade-scanline" />
      <div className="relative z-10 mx-auto w-full max-w-6xl pixel-hud-panel !bg-[rgba(2,7,17,0.82)] border-cyan-300/55 p-5 md:max-w-7xl md:p-8">{children}</div>
    </section>
  );
}

function FooterPage({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  return (
    <PageShell>
      <p className="font-rajdhani text-sm text-white/60 mb-6">{t("endOfCaseStudy")}</p>
      <button
        onClick={onBack}
        className="border-2 border-cyan-300/45 bg-black/55 px-4 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
      >
        <span>&lt; {t("backToWorks").toUpperCase()}</span>
      </button>
    </PageShell>
  );
}

/** Application dossier pages: a readable evidence structure inside the existing 16-bit command-console shell. */
function DeferredExhibitImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "0px 35%" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="case-study-exhibit-placeholder" aria-busy={!shouldLoad}>
      {shouldLoad ? (
        <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
      ) : (
        <span className="case-study-exhibit-skeleton" aria-hidden="true" />
      )}
    </div>
  );
}

function ApplicationExhibitPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  const exhibits = PROJECT_EXHIBITS[project.id] ?? [];

  return (
    <PageShell>
      <div className="w-full">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">01 // PROJECT EXHIBITION</p>
            <h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">{t("caseStudy")} / UI SHOWCASE</h2>
          </div>
          <p className="case-study-exhibit-intro max-w-md font-rajdhani text-sm leading-relaxed text-white/90 md:text-right">Bright display field. Dark console shell. Project interface stays the focal point.</p>
        </div>
        <div className={`case-study-image-area grid gap-5 ${exhibits.length > 1 ? "md:grid-cols-2" : ""}`}>
          {exhibits.map((exhibit) => (
            <figure key={exhibit.src} className="case-study-exhibit-frame">
              <div className="case-study-exhibit-label">
                <span>PROJECT SCREEN</span>
                <span>HI-FI DISPLAY</span>
              </div>
              <a
                href={exhibit.src}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-exhibit-media"
                aria-label={`Open full-size project image: ${exhibit.title}`}
              >
                <DeferredExhibitImage src={exhibit.src} alt={exhibit.title} className="case-study-exhibit-image" />
              </a>
              <figcaption>
                <strong>{exhibit.title}</strong>
                <span>{exhibit.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ApplicationOverviewPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  const { collectItem, progress } = useGameProgress();
  const collectibleId = `case-study-${project.id}`;
  return (
    <PageShell>
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200 md:text-sm">{project.kicker}</p>
        <span className={`border px-2 py-0.5 font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.14em] ${project.evidenceStatus === "ongoing" ? "border-amber-300/70 text-amber-200" : "border-cyan-300/50 text-cyan-100"}`}>
          {project.evidenceStatus === "ongoing" ? t("evidenceStatusOngoing") : t("evidenceStatusPublic")}
        </span>
      </div>
      <h1 className="mt-5 font-bebas text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade"><TerminalText text={project.title} speed={65} /></h1>
      <div className="case-study-overview-grid mt-7 grid gap-5 md:grid-cols-[1.3fr_0.7fr] md:gap-7">
        <div className="case-study-overview-copy">
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{t("projectOverview")}</p>
          <p className="mt-3 max-w-3xl font-rajdhani text-base leading-relaxed text-white/90 md:text-lg">{project.overview}</p>
        </div>
        <div className="case-study-metadata-panel pixel-hud-panel border-cyan-300/55 bg-[#020711f2] p-5">
          <div className="space-y-4 font-rajdhani text-sm text-white/90">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{t("myRole")}</p><p className="mt-1 leading-relaxed">{project.role}</p></div>
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{t("project")}</p><p className="mt-1">{project.projectType}</p></div>
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">{t("timeline")}</p><p className="mt-1">{project.timeline}</p></div>
            {project.link && <a className="inline-block border border-cyan-300/60 px-3 py-2 font-black uppercase tracking-[0.16em] text-cyan-100 transition-colors hover:bg-cyan-300 hover:text-[#06101e]" href={project.link} target="_blank" rel="noreferrer">↗ {t("openProject")}</a>}
            {project.evidenceStatus === "ongoing" && <p className="border-l-2 border-amber-300/60 pl-2 text-xs italic leading-relaxed text-white/60">{t("evidenceStatusOngoingNote")}</p>}
          </div>
        </div>
      </div>
      {!progress.collected.includes(collectibleId) && <button type="button" onClick={() => collectItem(collectibleId)} aria-label="Collect hidden project data chip" title="Hidden project data chip" className="pixel-collectible mt-6 inline-block border border-cyan-300/45 bg-[#020711e8] px-3 py-1 font-bebas text-xl text-cyan-200">◆ DATA CHIP</button>}
    </PageShell>
  );
}

function ApplicationResearchPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  return <PageShell><div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]"><div><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">01 // {t("problem")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">{t("problem")}</h2><p className="mt-6 font-rajdhani text-base leading-relaxed text-white/90">{project.challenge}</p></div><div><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">02 // {t("researchInsights")}</p><div className="mt-5 space-y-3">{project.researchInsights.map((insight, index) => <div key={insight} className="pixel-hud-panel border-l-4 border-cyan-300/65 bg-[#020711e8] p-4"><span className="font-bebas text-xl text-cyan-300">0{index + 1}</span><p className="mt-1 font-rajdhani leading-relaxed text-white/90">{insight}</p></div>)}</div></div></div></PageShell>;
}

function ApplicationProcessPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  const stages = [["01", "IA", project.process.informationArchitecture], ["02", "WIREFRAMES", project.process.wireframes], ["03", "HIGH-FIDELITY", project.process.highFidelity], ["04", "PROTOTYPE", project.process.prototype], ["05", "TESTING", project.process.testing]] as const;
  return <PageShell><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">03 // {t("designProcess")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">IA → WIREFRAMES → HI-FI → PROTOTYPE → TEST</h2><div className="mt-8 grid gap-3 md:grid-cols-5">{stages.map(([step, label, description]) => <article key={step} className="pixel-hud-panel border-cyan-300/40 bg-[#020711e8] p-4"><p className="font-bebas text-2xl text-cyan-300">{step}</p><h3 className="mt-2 font-rajdhani text-xs font-black tracking-[0.14em] text-white">{label}</h3><p className="mt-3 font-rajdhani text-sm leading-relaxed text-white/85">{description}</p></article>)}</div></PageShell>;
}

function ApplicationInteractionsPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  return <PageShell><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">04 // {t("keyInteractions")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">{t("keyInteractions")}</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{project.keyInteractions.map((interaction, index) => <article key={interaction} className="pixel-hud-panel border-cyan-300/45 bg-[#020711e8] p-5"><span className="font-bebas text-3xl text-cyan-300">{`0${index + 1}`}</span><p className="mt-4 font-rajdhani leading-relaxed text-white/90">{interaction}</p></article>)}</div></PageShell>;
}

function ApplicationImpactPage({ project }: { project: ApplicationCaseStudy }) {
  const { t } = useLanguage();
  return <PageShell><div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]"><div><p className="font-rajdhani text-xs font-black uppercase tracking-[0.28em] text-cyan-200">05 // {t("resultsImpact")}</p><h2 className="mt-3 font-bebas text-3xl leading-none text-white text-shadow-cyan md:text-5xl">{t("resultsImpact")}</h2><div className="mt-7 space-y-3">{project.impact.map((item) => <div key={item} className="pixel-hud-panel border-l-4 border-cyan-300/65 bg-[#020711e8] p-4 font-rajdhani leading-relaxed text-white/90">→ {item}</div>)}</div></div><div className="pixel-hud-panel self-end border-cyan-300/45 bg-[#020711e8] p-6"><p className="font-rajdhani text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{t("tools")}</p><ul className="mt-4 space-y-3">{project.tools.map((tool) => <li key={tool} className="border border-cyan-300/35 px-3 py-2 font-rajdhani text-sm font-bold text-cyan-100">{tool}</li>)}</ul></div></div></PageShell>;
}

export default function CaseStudy({
  projectId,
  onBack,
}: {
  projectId: string;
  onBack: () => void;
}) {
  const { t, language } = useLanguage();
  const { selectedRole, palette } = useRoleTheme();
  const project = applicationCaseStudyContent[language].find((item) => item.id === projectId);

  if (!project) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-rajdhani text-white/60 mb-4">{t("projectNotFound")}</p>
          <button
            onClick={onBack}
            className="border-2 border-cyan-300/45 bg-black/55 px-4 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e]"
          >
            <span>&lt; {t("back").toUpperCase()}</span>
          </button>
        </div>
      </div>
    );
  }

  const pages = [
    <ApplicationOverviewPage key="overview" project={project} />,
    <ApplicationExhibitPage key="exhibit" project={project} />,
    <ApplicationResearchPage key="research" project={project} />,
    <ApplicationProcessPage key="process" project={project} />,
    <ApplicationInteractionsPage key="interactions" project={project} />,
    <ApplicationImpactPage key="impact" project={project} />,
    <FooterPage key="footer" onBack={onBack} />,
  ];
  const pageLabels = [
    t("projectOverview"),
    "UI Showcase",
    t("researchInsights"),
    t("designProcess"),
    t("keyInteractions"),
    t("resultsImpact"),
    t("endOfCaseStudy"),
  ];

  return (
    <div className="role-theme-scope relative h-auto min-h-dvh overflow-visible bg-black text-white md:h-dvh md:overflow-hidden" data-player-role={selectedRole}>
      <StickyNavigation onBack={onBack} projectId={project.id} projectTitle={project.title} projectKicker={project.kicker} />
      <HorizontalSlider showDots showArrows accentColor={palette.accentColor} slideLabels={pageLabels} ariaLabel={`${project.title} case study sections`}>
        {pages}
      </HorizontalSlider>
    </div>
  );
}
