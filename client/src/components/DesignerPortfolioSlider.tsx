import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import CaseStudy from "./CaseStudy";
import SideScrollSelect from "./SideScrollSelect";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { useRoleTheme } from "../contexts/RoleContext";

type DesignProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  link?: string | null;
};

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
      title: "Seek and Sight",
      tag: "EDTECH / ONGOING",
      description:
        "Inclusive STEAM Literacy Platform for Children — Landing page, character system, and weekly content design for a nonprofit learning platform.",
      link: null,
    },
    {
      id: "03",
      title: "Locaverse GmbH",
      tag: "CLIENT PROJECT / 2023",
      description:
        "Business.Locaverse.at Redesign — Lead-generation landing page redesign for a mobile-service marketplace.",
      link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
    },
    {
      id: "04",
      title: "Smart Wash",
      tag: "PERSONAL PROJECT / 2022",
      description:
        "Smart Home Appliance UX/UI — Weather-aware washing machine app that recommends the right wash mode.",
      link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
    },
    {
      id: "05",
      title: "ecotek",
      tag: "SCHOOL PROJECT / 2023",
      description:
        "Sustainable Brand Identity — Logo, brand system, and marketing website for a fictional sustainability company.",
      link: "https://www.behance.net/gallery/167813977/Brand-Design-ecotek",
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
      title: "Seek and Sight",
      tag: "에듀테크 / 진행 중",
      description:
        "아동을 위한 포용적 STEAM 문해력 플랫폼 — 비영리 학습 플랫폼을 위한 랜딩 페이지, 캐릭터 시스템, 주간 콘텐츠 디자인.",
      link: null,
    },
    {
      id: "03",
      title: "Locaverse GmbH",
      tag: "클라이언트 프로젝트 / 2023",
      description:
        "Business.Locaverse.at 리디자인 — 모바일 서비스 마켓플레이스를 위한 리드 제너레이션 랜딩 페이지 개편.",
      link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
    },
    {
      id: "04",
      title: "Smart Wash",
      tag: "개인 프로젝트 / 2022",
      description:
        "스마트 홈 가전 UX/UI — 날씨 정보를 활용해 적절한 세탁 모드를 추천하는 세탁기 앱.",
      link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
    },
    {
      id: "05",
      title: "ecotek",
      tag: "학교 프로젝트 / 2023",
      description:
        "지속 가능한 브랜드 아이덴티티 — 가상 친환경 기업을 위한 로고, 브랜드 시스템, 마케팅 웹사이트.",
      link: "https://www.behance.net/gallery/167813977/Brand-Design-ecotek",
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
      title: "Seek and Sight",
      tag: "EDTECH / LAUFEND",
      description:
        "Inklusive STEAM-Literaturplattform für Kinder — Landing Page, Charaktersystem und wöchentliches Content-Design für eine gemeinnützige Lernplattform.",
      link: null,
    },
    {
      id: "03",
      title: "Locaverse GmbH",
      tag: "KUNDENPROJEKT / 2023",
      description:
        "Business.Locaverse.at Redesign — Lead-Generierungs-Landingpage-Redesign für einen Marktplatz für mobile Dienstleistungen.",
      link: "https://www.behance.net/gallery/197726323/UIUX-Design-Locaverse-GmbH",
    },
    {
      id: "04",
      title: "Smart Wash",
      tag: "PERSÖNLICHES PROJEKT / 2022",
      description:
        "Smart-Home-Geräte-UX/UI — Wetterbasierte Waschmaschinen-App, die den passenden Waschmodus empfiehlt.",
      link: "https://www.behance.net/gallery/167922001/UIUX-Design-Smart-Wash",
    },
    {
      id: "05",
      title: "ecotek",
      tag: "SCHULPROJEKT / 2023",
      description:
        "Nachhaltige Markenidentität — Logo, Markensystem und Marketing-Website für ein fiktives Nachhaltigkeitsunternehmen.",
      link: "https://www.behance.net/gallery/167813977/Brand-Design-ecotek",
    },
  ],
};

function AboutMeSkillsSlide() {
  const { t } = useLanguage();
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-dark-primary px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* About Me Section */}
        <div className="mb-12">
          <p className="font-rajdhani text-xs font-black uppercase tracking-widest text-cyan-300 mb-4">
            {t("aboutMe")}
          </p>
          <h2 className="font-bebas text-4xl font-bold text-light-primary mb-6 text-shadow-cyan">
            {t("designerAndDancer")}
          </h2>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12 mb-8">
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-64 overflow-hidden border-2 border-cyan-400/50 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <img
                  src="/manus-storage/Gemini_Generated_Image_s30zdos30zdos30z_28271392_722495d2.png"
                  alt={t("designerAndDancer")}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-rajdhani text-base leading-relaxed text-light-secondary">
                {t("bio")}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="border-t-2 border-cyan-300/30 pt-12">
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-4">{t("skills").toUpperCase()}</p>
          <h3 className="font-bebas text-3xl font-bold text-light-primary mb-8 text-shadow-cyan">{t("coreCompetencies")}</h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50">
              <h4 className="font-bebas text-2xl font-bold text-cyan-300 mb-4">{t("designTools")}</h4>
              <ul className="space-y-2 font-rajdhani text-light-secondary">
                <li>• Figma</li>
                <li>• Framer</li>
                <li>• Protopie</li>
                <li>• Principle</li>
              </ul>
            </div>
            <div className="border-2 border-cyan-300/30 rounded-lg p-6 bg-slate-950/50">
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
      </div>
    </section>
  );
}

function ContactSlide() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:yimsungh@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#07111f] px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm mb-4">{t("contact").toUpperCase()}</p>
        <h2 className="font-bebas text-4xl font-bold text-light-primary mb-8 text-shadow-cyan">{t("getInTouch")}</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <a
            href="mailto:yimsungh@gmail.com"
            className="border-2 border-cyan-300/30 rounded-lg p-6 text-center transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-950/50"
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">{t("email")}</p>
            <p className="font-bebas text-lg text-cyan-300 break-all">yimsungh@gmail.com</p>
          </a>
          <a
            href="https://www.linkedin.com/in/sunghee-im/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-cyan-300/30 rounded-lg p-6 text-center transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-950/50"
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">{t("linkedin")}</p>
            <p className="font-bebas text-lg text-cyan-300">sunghee-im</p>
          </a>
          <a
            href="https://www.behance.net/saruhome"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-cyan-300/30 rounded-lg p-6 text-center transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-950/50"
          >
            <p className="font-rajdhani text-sm text-light-secondary mb-2">{t("behance")}</p>
            <p className="font-bebas text-lg text-cyan-300">saruhome</p>
          </a>
          <a
            href="/resume.pdf"
            download
            className="border-2 border-cyan-300/30 rounded-lg p-6 text-center transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-950/50 cursor-pointer"
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
                className="w-full bg-slate-950/50 border-2 border-cyan-300/30 rounded px-4 py-2 font-rajdhani text-light-primary focus:outline-none focus:border-cyan-300"
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
                className="w-full bg-slate-950/50 border-2 border-cyan-300/30 rounded px-4 py-2 font-rajdhani text-light-primary focus:outline-none focus:border-cyan-300"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div>
              <label className="block font-rajdhani text-sm font-semibold text-light-secondary mb-2">{t("message")}</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950/50 border-2 border-cyan-300/30 rounded px-4 py-2 font-rajdhani text-light-primary focus:outline-none focus:border-cyan-300 resize-none"
                rows={4}
                placeholder={t("messagePlaceholder")}
              />
            </div>
            <button
              type="submit"
              className="w-full skew-x-[-12deg] border-2 border-cyan-300/50 bg-cyan-300/20 px-4 py-2 font-rajdhani text-sm font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:bg-cyan-300 hover:text-[#06101e]"
            >
              <span className="inline-block skew-x-[12deg]">{t("sendMessage")}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

type DesignerView = "game" | "about" | "contact" | { type: "caseStudy"; projectId: string };

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-4 z-50 skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e] md:left-8 md:top-8 md:px-4 md:text-sm"
    >
      <span className="inline-block skew-x-[12deg]">&lt; {label}</span>
    </button>
  );
}

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
        <LanguageSwitcher />
        <BackButton label={t("back").toUpperCase()} onClick={() => setView("game")} />
        <AboutMeSkillsSlide />
      </div>
    );
  }

  if (view === "contact") {
    return (
      <div className="relative h-auto min-h-dvh overflow-visible md:h-[100dvh] md:overflow-hidden bg-black">
        <LanguageSwitcher />
        <BackButton label={t("back").toUpperCase()} onClick={() => setView("game")} />
        <ContactSlide />
      </div>
    );
  }

  const items = [
    ...designProjects.map((project) => ({ id: project.id, label: project.title, sublabel: project.tag })),
    { id: "about", label: t("aboutNav") },
    { id: "contact", label: t("contactNav") },
  ];

  return (
    <div className="relative h-dvh overflow-hidden bg-black">
      <LanguageSwitcher />
      <BackButton label={t("backToSelect").toUpperCase()} onClick={onBack} />

      <SideScrollSelect
        items={items}
        accentColor={palette.accentColor}
        spriteVariant="designer"
        eyebrow={t("player01Archive")}
        title={t("designPortfolio")}
        onSelect={(id) => {
          if (id === "about") setView("about");
          else if (id === "contact") setView("contact");
          else setView({ type: "caseStudy", projectId: id });
        }}
      />
    </div>
  );
}
