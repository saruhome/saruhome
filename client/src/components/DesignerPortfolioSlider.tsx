// Pixel profile screens: a real portrait stays legible inside a hard-edged player-ID frame, never a rounded card.
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import CaseStudy from "./CaseStudy";
import SideScrollSelect from "./SideScrollSelect";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { useRoleTheme } from "../contexts/RoleContext";
import { useGameProgress } from "../contexts/GameProgressContext";
import { assetUrl } from "../lib/assetUrl";

type DesignProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  link?: string | null;
};

const DESIGNER_PROFILE_PHOTO = assetUrl(
  "Gemini_Generated_Image_s30zdos30zdos30z_28271392_722495d2.png",
  "Gemini_Generated_Image_s30zdos30zdos30z_28271392.png",
);

const designProjectsByLang: Record<Language, DesignProject[]> = {
  en: [
    {
      id: "01",
      title: "Sokdak",
      tag: "TEAM PROJECT / ONGOING",
      description:
        "Korean Slang & Neologism App — A friendly dictionary app teaching foreign learners the real Korean textbooks skip.",
      link: "https://www.behance.net/gallery/251527199/UXUI-Design-(SokDak)",
    },
    {
      id: "02",
      title: "Locaverse GmbH",
      tag: "SPATIAL COLLABORATION / CLIENT",
      description:
        "Spatial collaboration and service-ecosystem UX — a focused business route from local value to trusted action.",
      link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
    },
    {
      id: "03",
      title: "Smart Wash",
      tag: "CONTEXT-AWARE MOBILE UX",
      description:
        "Weather-aware appliance companion — ambient context, tactile feedback, and manual user control in one mobile flow.",
      link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
    },
    {
      id: "04",
      title: "Campy",
      tag: "UX RESEARCH / MOBILE REDESIGN",
      description:
        "Research-led mobile redesign proposal linking user insights, interaction states, and visual identity.",
      link: "https://www.behance.net/gallery/197225963/UIUX-Design-Campy",
    },
    {
      id: "05",
      title: "Seek and Sight",
      tag: "INCLUSIVE EDTECH / ONGOING",
      description:
        "Inclusive STEAM literacy platform — adaptive learning, audience-aware information design, and character-led feedback.",
      link: null,
    },
  ],
  kr: [
    {
      id: "01",
      title: "속닥",
      tag: "팀 프로젝트 / 진행 중",
      description:
        "한국어 신조어 사전 앱 — 교과서가 알려주지 않는 진짜 한국어를 외국인 학습자에게 친근하게 가르치는 사전 앱.",
      link: "https://www.behance.net/gallery/251527199/UXUI-Design-(SokDak)",
    },
    {
      id: "02",
      title: "Locaverse GmbH",
      tag: "공간적 협업 / 클라이언트",
      description:
        "공간적 협업과 서비스 생태계 UX — 지역 기반 가치를 신뢰도 있는 행동으로 연결하는 집중된 사업자 경로.",
      link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
    },
    {
      id: "03",
      title: "Smart Wash",
      tag: "맥락 인지형 모바일 UX",
      description:
        "날씨 인지형 가전 동반자 — 주변 맥락, 촉각적 피드백, 수동 제어권을 하나의 모바일 플로우에 통합.",
      link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
    },
    {
      id: "04",
      title: "Campy",
      tag: "UX 리서치 / 모바일 리디자인",
      description:
        "사용자 인사이트, 인터랙션 상태, 비주얼 아이덴티티를 연결하는 리서치 중심 모바일 리디자인 제안.",
      link: "https://www.behance.net/gallery/197225963/UIUX-Design-Campy",
    },
    {
      id: "05",
      title: "Seek and Sight",
      tag: "포용적 에듀테크 / 진행 중",
      description:
        "포용적 STEAM 문해력 플랫폼 — 적응형 학습, 대상 인지형 정보 설계, 캐릭터 기반 피드백.",
      link: null,
    },
  ],
  de: [
    {
      id: "01",
      title: "Sokdak",
      tag: "TEAMPROJEKT / LAUFEND",
      description:
        "Koreanische Slang- & Neologismus-App — Eine freundliche Wörterbuch-App, die ausländischen Lernenden das echte Koreanisch beibringt, das kein Lehrbuch zeigt.",
      link: "https://www.behance.net/gallery/251527199/UXUI-Design-(SokDak)",
    },
    {
      id: "02",
      title: "Locaverse GmbH",
      tag: "RÄUMLICHE KOLLABORATION / KUNDE",
      description:
        "UX für räumliche Kollaboration und Service-Ökosysteme — ein fokussierter Business-Pfad von lokalem Nutzen zu vertrauensvoller Aktion.",
      link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
    },
    {
      id: "03",
      title: "Smart Wash",
      tag: "KONTEXTSENSITIVE MOBILE UX",
      description:
        "Wetterbewusster Gerätebegleiter — Umgebungskontext, taktiles Feedback und manuelle Kontrolle in einem Mobile Flow.",
      link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
    },
    {
      id: "04",
      title: "Campy",
      tag: "UX RESEARCH / MOBILE REDESIGN",
      description:
        "Research-getriebene Mobile-Redesign-Proposal, die User Insights, Interaktionszustände und visuelle Identität verbindet.",
      link: "https://www.behance.net/gallery/197225963/UIUX-Design-Campy",
    },
    {
      id: "05",
      title: "Seek and Sight",
      tag: "INKLUSIVE EDTECH / LAUFEND",
      description:
        "Inklusive STEAM-Literacy-Plattform — adaptives Lernen, zielgruppenbewusste Informationsarchitektur und character-basiertes Feedback.",
      link: null,
    },
  ],
};

function AboutMeSkillsSlide({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const { collectItem, progress } = useGameProgress();
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-dark-primary px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />
      <div className="pointer-events-none absolute inset-0 arcade-lobby-grid opacity-25" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* About Me Section */}
        <div className="mb-12">
          <div className="mb-4 flex flex-wrap items-center justify-start gap-3">
            <button
              type="button"
              onClick={onBack}
              className="pixel-hud-panel border-cyan-300/55 bg-[#020b18] px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-colors hover:border-cyan-200 hover:bg-cyan-300 hover:text-[#06101e]"
            >
              &lt; {t("back").toUpperCase()}
            </button>
            <p className="font-rajdhani text-xs font-black uppercase tracking-widest text-cyan-300">
              {t("aboutMe")}
            </p>
          </div>
          <h2 className="font-bebas text-4xl font-bold text-light-primary mb-6 text-shadow-cyan">
            {t("designerAndDancer")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12 mb-8">
            <div className="flex items-center justify-center">
              <div className="pixel-hud-panel pixel-photo-frame relative h-80 w-64 overflow-hidden border-cyan-300/70 bg-[#020b18] shadow-[7px_7px_0_rgba(3,20,34,0.95)]" style={{ "--hud-glow": "#22d3ee" } as React.CSSProperties}>
                <img src={DESIGNER_PROFILE_PHOTO} alt="Sunghee Im" className="h-full w-full object-cover object-center [image-rendering:auto!important]" />
                <div className="pointer-events-none absolute inset-0 arcade-scanline opacity-35" />
                <div className="pointer-events-none absolute inset-3 border border-cyan-300/45" />
                <span className="absolute left-4 top-4 pixel-tag border-cyan-300/70 bg-[#020b18e8] px-2 py-1 font-rajdhani text-[0.55rem] font-black tracking-[0.18em] text-cyan-100">PLAYER 01 // PROFILE</span>
                <span className="absolute bottom-4 left-4 border border-cyan-300/70 bg-[#020b18e8] px-2 py-1 font-rajdhani text-[0.55rem] font-black tracking-[0.18em] text-cyan-100">SIGNAL // ONLINE</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-rajdhani text-base leading-relaxed text-light-secondary">
                {t("bio")}
              </p>
              <div className="mt-6 grid gap-2">
                {[t("basedIn"), t("origin"), t("practice"), t("interactionFocus"), t("mastersIntent")].map((signal) => (
                  <p key={signal} className="border-l-4 border-cyan-300/70 bg-[#020b18cc] px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.14em] text-cyan-100">
                    {signal}
                  </p>
                ))}
              </div>
              {!progress.collected.includes("designer-about-signal") && <button type="button" onClick={() => collectItem("designer-about-signal")} className="pixel-collectible mt-5 self-start border border-cyan-300/45 bg-[#020b18e8] px-3 py-1 font-bebas text-lg text-cyan-200">✦ BIO SIGNAL</button>}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="border-t-2 border-cyan-300/30 pt-12">
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-4">{t("skills").toUpperCase()}</p>
          <h3 className="font-bebas text-3xl font-bold text-light-primary mb-8 text-shadow-cyan">{t("coreCompetencies")}</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="pixel-hud-panel border-cyan-300/35 p-6" style={{ "--hud-glow": "#22d3ee" } as React.CSSProperties}>
              <h4 className="font-bebas text-2xl font-bold text-cyan-300 mb-4">{t("designTools")}</h4>
              <ul className="space-y-2 font-rajdhani text-light-secondary">
                <li>• Figma</li>
                <li>• Framer</li>
                <li>• Protopie</li>
                <li>• Principle</li>
              </ul>
            </div>
            <div className="pixel-hud-panel border-cyan-300/35 p-6" style={{ "--hud-glow": "#22d3ee" } as React.CSSProperties}>
              <h4 className="font-bebas text-2xl font-bold text-cyan-300 mb-4">{t("coreExpertise")}</h4>
              <ul className="space-y-2 font-rajdhani text-light-secondary">
                <li>• {t("interactionDesign")}</li>
                <li>• {t("embodiedInteraction")}</li>
                <li>• {t("userResearch")}</li>
                <li>• {t("visualDesign")}</li>
              </ul>
            </div>
          </div>
        </div>

        <ContactSlide embedded />
      </div>
    </section>
  );
}

function ContactSlide({ embedded = false }: { embedded?: boolean }) {
  const { t } = useLanguage();
  const { collectItem, progress } = useGameProgress();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:yimsungh@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className={embedded ? "relative mt-12 border-t-2 border-cyan-300/30 pt-12" : "relative h-auto w-full overflow-visible bg-[#07111f] px-4 py-16 md:h-full md:overflow-y-auto md:px-8 md:py-24 lg:px-12"}>
      {!embedded && <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />}
      {!embedded && <div className="pointer-events-none absolute inset-0 arcade-lobby-grid opacity-25" />}

      <div className={embedded ? "relative" : "relative z-10 mx-auto w-full max-w-5xl"}>
        <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-4">{t("contact").toUpperCase()}</p>
        <h2 className="font-bebas text-4xl font-bold text-light-primary mb-8 text-shadow-cyan">{t("getInTouch")}</h2>
        {!progress.collected.includes("designer-contact-key") && <button type="button" onClick={() => collectItem("designer-contact-key")} className="pixel-collectible mb-5 inline-block border border-cyan-300/45 bg-[#020b18e8] px-3 py-1 font-bebas text-lg text-cyan-200">◆ CONTACT KEY</button>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <a
            href="mailto:yimsungh@gmail.com"
            className="pixel-hud-panel border-cyan-300/35 p-6 text-center transition-all hover:border-cyan-200 hover:translate-x-0.5 hover:-translate-y-0.5"
            style={{ "--hud-glow": "#22d3ee" } as React.CSSProperties}
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">{t("email")}</p>
            <p className="font-bebas text-lg text-cyan-300 break-all">yimsungh@gmail.com</p>
          </a>
          <a
            href="https://www.linkedin.com/in/sunghee-im/"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-hud-panel border-cyan-300/35 p-6 text-center transition-all hover:border-cyan-200 hover:translate-x-0.5 hover:-translate-y-0.5"
            style={{ "--hud-glow": "#22d3ee" } as React.CSSProperties}
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">{t("linkedin")}</p>
            <p className="font-bebas text-lg text-cyan-300">sunghee-im</p>
          </a>
          <a
            href="https://www.behance.net/saruhome"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-hud-panel border-cyan-300/35 p-6 text-center transition-all hover:border-cyan-200 hover:translate-x-0.5 hover:-translate-y-0.5"
            style={{ "--hud-glow": "#22d3ee" } as React.CSSProperties}
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">{t("behance")}</p>
            <p className="font-bebas text-lg text-cyan-300">saruhome</p>
          </a>
          <a
            href="/resume.pdf"
            download
            className="pixel-hud-panel border-cyan-300/35 p-6 text-center transition-all hover:border-cyan-200 hover:translate-x-0.5 hover:-translate-y-0.5 cursor-pointer"
            style={{ "--hud-glow": "#22d3ee" } as React.CSSProperties}
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">{t("resume")}</p>
            <p className="font-bebas text-lg text-cyan-300">{t("downloadCV")}</p>
          </a>
        </div>

        <div className="border-t-2 border-cyan-300/30 pt-8">
          <h3 className="font-bebas text-2xl font-bold text-light-primary mb-6">{t("sendAMessage")}</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-rajdhani text-sm font-semibold text-light-secondary mb-2">{t("name")}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-cyan-300/45 bg-[#020b18] px-4 py-2 font-rajdhani text-light-primary shadow-[3px_3px_0_rgba(2,20,34,0.9)] focus:outline-none focus:border-cyan-200"
                placeholder={t("namePlaceholder")}
              />
            </div>
            <div>
              <label className="block font-rajdhani text-sm font-semibold text-light-secondary mb-2">{t("email")}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-cyan-300/45 bg-[#020b18] px-4 py-2 font-rajdhani text-light-primary shadow-[3px_3px_0_rgba(2,20,34,0.9)] focus:outline-none focus:border-cyan-200"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label className="block font-rajdhani text-sm font-semibold text-light-secondary mb-2">{t("message")}</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-2 border-cyan-300/45 bg-[#020b18] px-4 py-2 font-rajdhani text-light-primary shadow-[3px_3px_0_rgba(2,20,34,0.9)] focus:outline-none focus:border-cyan-200 resize-none"
                rows={4}
                placeholder={t("messagePlaceholder")}
              />
            </div>
            <button
              type="submit"
              className="w-full border-2 border-cyan-300/50 bg-cyan-300/20 px-4 py-2 font-rajdhani text-sm font-black uppercase tracking-[0.2em] text-cyan-100 transition-colors duration-300 hover:bg-cyan-300 hover:text-[#06101e]"
            >
              {t("sendMessage")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

type DesignerView = "game" | "about" | { type: "caseStudy"; projectId: string };

export default function DesignerPortfolioSlider({
  onBack,
}: {
  onBack: () => void;
}) {
  const { t, language } = useLanguage();
  const { palette } = useRoleTheme();
  const designProjects = designProjectsByLang[language];
  const [view, setView] = useState<DesignerView>("game");

  if (typeof view === "object") {
    return <CaseStudy projectId={view.projectId} onBack={() => setView("game")} />;
  }

  if (view === "about") {
    return (
      <div className="relative h-auto min-h-dvh overflow-visible md:h-[100dvh] md:overflow-hidden bg-dark-primary">
        <LanguageSwitcher elevated />
        <AboutMeSkillsSlide onBack={() => setView("game")} />
      </div>
    );
  }

  const items = [
    ...designProjects.map((project) => ({ id: project.id, label: project.title, sublabel: project.tag })),
    { id: "about", label: t("aboutNav") },
  ];

  return (
    <div className="relative h-dvh overflow-hidden bg-black">
      <LanguageSwitcher elevated />

      <SideScrollSelect
        items={items}
        onBack={onBack}
        backLabel={t("backToSelect").toUpperCase()}
        accentColor={palette.accentColor}
        spriteVariant="designer"
        eyebrow={t("player01Archive")}
        title={t("designPortfolio")}
        onQuickSelect={(id) => {
          if (id === "about") setView("about");
          else setView({ type: "caseStudy", projectId: id });
        }}
        onSelect={(id) => {
          if (id === "about") setView("about");
          else setView({ type: "caseStudy", projectId: id });
        }}
      />
    </div>
  );
}
