import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import HorizontalSlider from "./HorizontalSlider";
import CaseStudy from "./CaseStudy";
import { useLanguage, type Language } from "../contexts/LanguageContext";

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

function ProjectsSlide({ onViewCaseStudy }: { onViewCaseStudy: (projectId: string) => void }) {
  const { t, language } = useLanguage();
  const designProjects = designProjectsByLang[language];
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#07111f] px-4 py-16 md:px-8 md:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40 arcade-scanline" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-3 shrink-0 md:mb-5">
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-cyan-200 md:text-sm">{t("player01Archive")}</p>
          <h1 className="skew-x-[-8deg] font-bebas text-[clamp(2.6rem,7.2vw,7.2rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
            {t("designPortfolio")}
          </h1>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
          {designProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onViewCaseStudy(project.id)}
              className="group relative flex min-h-[220px] flex-col cursor-pointer overflow-hidden border-2 border-cyan-100/18 bg-slate-950 shadow-[6px_6px_0_rgba(34,211,238,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/80 hover:shadow-[10px_10px_0_rgba(34,211,238,0.22)] md:hover:-translate-y-2 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-start p-4 md:p-6"
            >
              <div className="inline-block w-fit skew-x-[-12deg] bg-cyan-300 px-2 py-1 font-rajdhani text-[0.62rem] font-black tracking-[0.18em] text-slate-950 md:px-3 md:text-xs">
                <span className="inline-block skew-x-[12deg]">{t("project").toUpperCase()} {project.id}</span>
              </div>
              <div className="mt-4 flex flex-1 flex-col justify-end">
                <p className="font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.22em] text-cyan-200 md:text-xs">{project.tag}</p>
                <h2 className="mt-1 skew-x-[-8deg] font-bebas text-[clamp(1.45rem,5.2vw,2.7rem)] leading-none tracking-[0.04em] text-white md:mt-2">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-3 font-rajdhani text-xs font-medium leading-snug text-white/68 md:line-clamp-4 md:text-sm lg:text-base">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
                  src="/manus-storage/Gemini_Generated_Image_s30zdos30zdos30z_28271392.png"
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

export default function DesignerPortfolioSlider({
  onBack,
}: {
  onBack: () => void;
}) {
  const { t } = useLanguage();
  const [view, setView] = useState<"slider" | { type: "caseStudy"; projectId: string }>("slider");

  const handleViewCaseStudy = (projectId: string) => {
    setView({ type: "caseStudy", projectId });
  };

  const handleBackFromCaseStudy = () => {
    setView("slider");
  };

  if (view !== "slider") {
    return (
      <CaseStudy
        projectId={view.projectId}
        onBack={handleBackFromCaseStudy}
      />
    );
  }

  return (
    <div className="relative h-auto min-h-dvh overflow-visible md:h-[100dvh] md:overflow-hidden bg-black">
      <LanguageSwitcher theme="cyan" />
      <button
        onClick={onBack}
        className="absolute left-4 top-4 z-50 skew-x-[-12deg] border-2 border-cyan-300/45 bg-black/55 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 hover:text-[#06101e] md:left-8 md:top-8 md:px-4 md:text-sm"
      >
        <span className="inline-block skew-x-[12deg]">&lt; {t("backToSelect").toUpperCase()}</span>
      </button>

      <HorizontalSlider showDots showArrows>
        <ProjectsSlide onViewCaseStudy={handleViewCaseStudy} />
        <AboutMeSkillsSlide />
        <ContactSlide />
      </HorizontalSlider>
    </div>
  );
}
