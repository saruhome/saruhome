import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import SideScrollSelect from "./SideScrollSelect";
import { useLanguage, type Language } from "../contexts/LanguageContext";

/**
 * Design System — "Precision in Motion"
 * Dark mode base with Orange (#FF6200) accents for Dancer portfolio
 * Energetic, rhythmic, premium aesthetic with interactive lightbox
 */

type DanceActivity = {
  id: string;
  title: string;
  meta: string;
  description: string;
  media: {
    type: "video" | "image";
    url: string;
    thumbnail?: string;
  };
};

const danceActivitiesByLang: Record<Language, DanceActivity[]> = {
  en: [
    {
      id: "01",
      title: "Stage Presence",
      meta: "PERFORMANCE",
      description: "Facial expressions, eye contact, and body lines amplify the song's energy on stage through dynamic performance.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/fjyXcEWnaDg?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://i.ytimg.com/vi/fjyXcEWnaDg/maxresdefault.jpg",
      },
    },
    {
      id: "02",
      title: "Choreography Study",
      meta: "TRAINING",
      description: "Original choreography I created — rhythm breakdown, movement connection, and dynamic control form the foundation of structured training.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/hCsik2dGXRo?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://i.ytimg.com/vi/hCsik2dGXRo/maxresdefault.jpg",
      },
    },
    {
      id: "03",
      title: "Battle Energy",
      meta: "FREESTYLE",
      description: "Improvisation and quick reactions showcase command of space through freestyle battle style.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/F72Is4fqZGg?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://img.youtube.com/vi/F72Is4fqZGg/maxresdefault.jpg",
      },
    },
  ],
  kr: [
    {
      id: "01",
      title: "무대 존재감",
      meta: "퍼포먼스",
      description: "표정, 시선, 몸의 라인이 다이내믹한 퍼포먼스를 통해 무대 위 곡의 에너지를 증폭시킵니다.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/fjyXcEWnaDg?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://i.ytimg.com/vi/fjyXcEWnaDg/maxresdefault.jpg",
      },
    },
    {
      id: "02",
      title: "안무 스터디",
      meta: "트레이닝",
      description: "제가 직접 만든 오리지널 안무 — 리듬 분석, 동작 연결, 다이내믹 컨트롤이 체계적인 트레이닝의 기반이 됩니다.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/hCsik2dGXRo?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://i.ytimg.com/vi/hCsik2dGXRo/maxresdefault.jpg",
      },
    },
    {
      id: "03",
      title: "배틀 에너지",
      meta: "프리스타일",
      description: "즉흥성과 빠른 반응으로 프리스타일 배틀 스타일을 통해 공간 장악력을 보여줍니다.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/F72Is4fqZGg?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://img.youtube.com/vi/F72Is4fqZGg/maxresdefault.jpg",
      },
    },
  ],
  de: [
    {
      id: "01",
      title: "Bühnenpräsenz",
      meta: "PERFORMANCE",
      description: "Mimik, Blickkontakt und Körperlinien verstärken die Energie des Songs auf der Bühne durch dynamische Performance.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/fjyXcEWnaDg?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://i.ytimg.com/vi/fjyXcEWnaDg/maxresdefault.jpg",
      },
    },
    {
      id: "02",
      title: "Choreografie-Studie",
      meta: "TRAINING",
      description: "Eigene Choreografie — Rhythmus-Analyse, Bewegungsverbindung und dynamische Kontrolle bilden die Grundlage strukturierten Trainings.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/hCsik2dGXRo?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://i.ytimg.com/vi/hCsik2dGXRo/maxresdefault.jpg",
      },
    },
    {
      id: "03",
      title: "Battle-Energie",
      meta: "FREESTYLE",
      description: "Improvisation und schnelle Reaktionen zeigen Raumbeherrschung im Freestyle-Battle-Stil.",
      media: {
        type: "video",
        url: "https://www.youtube.com/embed/F72Is4fqZGg?autoplay=1&mute=1&controls=1&playsinline=1",
        thumbnail: "https://img.youtube.com/vi/F72Is4fqZGg/maxresdefault.jpg",
      },
    },
  ],
};

const dancerUiByLang: Record<
  Language,
  {
    playerArchive: string;
    dancePortfolio: string;
    dancePerformance: string;
    clickToPlay: string;
    viewMedia: string;
    back: string;
    aboutDancer: string;
    movementExpression: string;
    bio: string[];
  }
> = {
  en: {
    playerArchive: "PLAYER 02 ARCHIVE",
    dancePortfolio: "DANCE PORTFOLIO",
    dancePerformance: "DANCE PERFORMANCE",
    clickToPlay: "Click to Play",
    viewMedia: "VIEW MEDIA",
    back: "BACK",
    aboutDancer: "ABOUT DANCER",
    movementExpression: "Movement & Expression",
    bio: [
      "As a professional dancer, I bring rhythm, presence, and battle energy to every performance. My movement vocabulary spans contemporary, freestyle, and battle styles, each with its own unique expression and technical demands.",
      "My dance background directly influences my design philosophy. Understanding how the body naturally moves through space and interacts with technology has shaped my approach to creating gesture-based UX and embodied interaction design.",
      "Every performance is a study in presence, timing, and spatial awareness. These principles translate seamlessly into interaction design, where the goal is to create experiences that feel as natural and intuitive as movement itself.",
    ],
  },
  kr: {
    playerArchive: "플레이어 02 아카이브",
    dancePortfolio: "댄스 포트폴리오",
    dancePerformance: "댄스 퍼포먼스",
    clickToPlay: "클릭해서 재생",
    viewMedia: "미디어 보기",
    back: "뒤로",
    aboutDancer: "댄서 소개",
    movementExpression: "움직임과 표현",
    bio: [
      "프로페셔널 댄서로서 저는 모든 퍼포먼스에 리듬, 존재감, 배틀 에너지를 담습니다. 제 움직임 어휘는 컨템포러리, 프리스타일, 배틀 스타일을 아우르며, 각각 고유한 표현과 기술적 요구를 가지고 있습니다.",
      "제 댄스 배경은 제 디자인 철학에 직접적인 영향을 줍니다. 신체가 공간을 자연스럽게 움직이고 기술과 상호작용하는 방식을 이해하는 것은 제스처 기반 UX와 embodied interaction 디자인을 만드는 저의 접근 방식을 형성했습니다.",
      "모든 퍼포먼스는 존재감, 타이밍, 공간 인지에 대한 탐구입니다. 이 원칙들은 인터랙션 디자인으로 자연스럽게 이어지며, 그 목표는 움직임 자체처럼 자연스럽고 직관적으로 느껴지는 경험을 만드는 것입니다.",
    ],
  },
  de: {
    playerArchive: "SPIELER-02-ARCHIV",
    dancePortfolio: "TANZ-PORTFOLIO",
    dancePerformance: "TANZPERFORMANCE",
    clickToPlay: "Zum Abspielen klicken",
    viewMedia: "MEDIEN ANSEHEN",
    back: "ZURÜCK",
    aboutDancer: "ÜBER DIE TÄNZERIN",
    movementExpression: "Bewegung & Ausdruck",
    bio: [
      "Als professionelle Tänzerin bringe ich Rhythmus, Präsenz und Battle-Energie in jede Performance ein. Mein Bewegungsvokabular reicht von Contemporary über Freestyle bis Battle-Stile, jeweils mit eigenem Ausdruck und technischen Anforderungen.",
      "Mein Tanzhintergrund beeinflusst meine Designphilosophie direkt. Zu verstehen, wie sich der Körper natürlich im Raum bewegt und mit Technologie interagiert, hat meinen Ansatz für gesturebasierte UX und Embodied-Interaction-Design geprägt.",
      "Jede Performance ist eine Studie in Präsenz, Timing und Raumbewusstsein. Diese Prinzipien übertragen sich nahtlos auf Interaktionsdesign, dessen Ziel es ist, Erfahrungen zu schaffen, die sich so natürlich und intuitiv anfühlen wie Bewegung selbst.",
    ],
  },
};

interface LightboxProps {
  media: DanceActivity["media"];
  title: string;
  backLabel: string;
  onClose: () => void;
}

function Lightbox({ media, title, backLabel, onClose }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Back button */}
        <button
          onClick={onClose}
          className="absolute -top-12 left-0 z-10 skew-x-[-12deg] border-2 border-orange-300/60 bg-black/70 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-orange-100 transition-all duration-300 hover:bg-orange-300 hover:text-[#1b0603] md:-top-16"
          aria-label={backLabel}
        >
          <span className="inline-block skew-x-[12deg]">&lt; {backLabel}</span>
        </button>

        {/* Media container */}
        <div className="relative overflow-hidden rounded-lg border-2 border-orange-300/60 bg-black shadow-[0_0_60px_rgba(249,115,22,0.4)]">
          {media.type === "video" ? (
            <div className="aspect-video w-full">
              <iframe
                src={media.url}
                title={title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={media.url}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mt-4 text-center">
          <h3 className="font-bebas text-2xl font-bold text-orange-100 md:text-3xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({
  activity,
  viewMediaLabel,
  onOpen,
}: {
  activity: DanceActivity;
  viewMediaLabel: string;
  onOpen: (activity: DanceActivity) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onOpen(activity)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full cursor-pointer border-2 border-orange-200/30 bg-black/50 p-3 shadow-[6px_6px_0_rgba(251,146,60,0.12)] backdrop-blur-sm transition-all duration-300 hover:border-orange-200/70 hover:bg-orange-950/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] md:p-4"
      aria-label={activity.title}
    >
      {/* Thumbnail overlay */}
      {activity.media.thumbnail && (
        <div className="absolute inset-0 overflow-hidden rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-20">
          <img
            src={activity.media.thumbnail}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <p className="font-rajdhani text-[0.65rem] font-black tracking-[0.22em] text-orange-200 md:text-xs">
          {activity.meta}
        </p>
        <h2 className="mt-2 skew-x-[-8deg] font-bebas text-lg tracking-[0.04em] text-white md:mt-3 md:text-2xl">
          {activity.title}
        </h2>
        <p className="mt-2 line-clamp-3 font-rajdhani text-[0.7rem] font-semibold leading-snug text-white/70 md:text-sm">
          {activity.description}
        </p>

        {/* Play indicator */}
        <div
          className={`mt-3 flex items-center gap-2 font-rajdhani text-xs font-black uppercase tracking-[0.15em] text-orange-300 transition-all duration-300 ${
            isHovered ? "translate-x-1" : ""
          }`}
        >
          <span>→ {viewMediaLabel}</span>
        </div>
      </div>
    </button>
  );
}

function VideoSlide() {
  const { language } = useLanguage();
  const danceActivities = danceActivitiesByLang[language];
  const ui = dancerUiByLang[language];
  const [selectedActivity, setSelectedActivity] = useState<DanceActivity | null>(
    null
  );

  return (
    <>
      <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#1a0503] text-white">
        <div className="pointer-events-none fixed inset-0 opacity-35 arcade-scanline pointer-events-none" />
        <div className="pointer-events-none absolute -right-20 top-4 h-96 w-96 rounded-full bg-orange-500/22 blur-3xl" />

        <div className="relative z-10 flex h-auto min-h-0 w-full flex-col items-center justify-start px-4 pb-6 pt-20 md:h-full md:px-8 md:py-8 lg:px-12">
          <div className="shrink-0 text-center">
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.42em] text-orange-200 md:text-sm">
              {ui.playerArchive}
            </p>
            <h1 className="mt-2 skew-x-[-8deg] font-bebas text-[clamp(2.4rem,7vw,5.6rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
              {ui.dancePortfolio}
            </h1>
          </div>

          <div className="relative mx-auto mt-6 w-full max-w-4xl shrink-0 md:mt-8">
            <button
              type="button"
              aria-label={ui.dancePerformance}
              className="group relative aspect-video w-full overflow-hidden border-2 border-orange-300/60 bg-black outline-none transition-all duration-300 hover:border-orange-200 focus:border-orange-200 cursor-pointer shadow-[0_0_30px_rgba(249,115,22,0.4),0_0_60px_rgba(249,115,22,0.2),inset_0_0_20px_rgba(249,115,22,0.1)] hover:shadow-[0_0_50px_rgba(249,115,22,0.8),0_0_100px_rgba(249,115,22,0.4),inset_0_0_30px_rgba(249,115,22,0.2)]"
              onClick={() => setSelectedActivity(danceActivities[0])}
            >
              <div className="absolute inset-0">
                <img
                  src="https://i.ytimg.com/vi/Kri6sE8RpbU/maxresdefault.jpg"
                  alt={ui.dancePerformance}
                  className="h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92),rgba(0,0,0,0.08)_55%)]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-orange-200 bg-orange-400/90 text-2xl text-black shadow-[0_0_50px_rgba(251,146,60,0.7)] transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24 md:text-4xl">
                      ▶
                    </div>
                    <p className="mt-4 skew-x-[-10deg] font-bebas text-2xl tracking-[0.06em] text-white text-shadow-arcade md:text-3xl">
                      {ui.dancePerformance}
                    </p>
                    <p className="mt-2 font-rajdhani text-xs font-black uppercase tracking-[0.3em] text-orange-100/80 md:text-sm">
                      {ui.clickToPlay}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-6 grid w-full max-w-4xl shrink-0 grid-cols-1 gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {danceActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                viewMediaLabel={ui.viewMedia}
                onOpen={setSelectedActivity}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedActivity && (
        <Lightbox
          media={selectedActivity.media}
          title={selectedActivity.title}
          backLabel={ui.back}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </>
  );
}

function BioSlide() {
  const { language } = useLanguage();
  const ui = dancerUiByLang[language];
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#1a0503] px-4 py-16 md:px-8 md:py-24 lg:px-12 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-35 arcade-scanline" />
      <div className="pointer-events-none absolute -right-20 top-4 h-96 w-96 rounded-full bg-orange-500/22 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-orange-200 md:text-sm mb-4">
          {ui.aboutDancer}
        </p>
        <h2 className="font-bebas text-4xl font-bold text-orange-100 mb-8">
          {ui.movementExpression}
        </h2>

        <div className="space-y-6 font-rajdhani text-light-secondary">
          {ui.bio.map((paragraph, idx) => (
            <p key={idx} className="text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-4 z-50 skew-x-[-12deg] border-2 border-orange-300/45 bg-black/55 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-orange-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-300 hover:text-[#1b0603] md:left-8 md:top-8 md:px-4 md:text-sm"
    >
      <span className="inline-block skew-x-[12deg]">&lt; {label}</span>
    </button>
  );
}

export default function DancerPortfolioSlider({
  onBack,
}: {
  onBack: () => void;
}) {
  const { t, language } = useLanguage();
  const ui = dancerUiByLang[language];
  const [view, setView] = useState<"game" | "gallery" | "bio">("game");

  if (view === "gallery") {
    return (
      <div className="relative h-auto min-h-dvh overflow-visible md:h-[100dvh] md:overflow-hidden bg-black">
        <LanguageSwitcher />
        <BackButton label={t("back").toUpperCase()} onClick={() => setView("game")} />
        <VideoSlide />
      </div>
    );
  }

  if (view === "bio") {
    return (
      <div className="relative h-auto min-h-dvh overflow-visible md:h-[100dvh] md:overflow-hidden bg-black">
        <LanguageSwitcher />
        <BackButton label={t("back").toUpperCase()} onClick={() => setView("game")} />
        <BioSlide />
      </div>
    );
  }

  const items = [
    { id: "gallery", label: ui.dancePerformance },
    { id: "bio", label: t("aboutNav") },
  ];

  return (
    <div className="relative h-dvh overflow-hidden bg-black">
      <LanguageSwitcher />
      <BackButton label={t("backToSelect").toUpperCase()} onClick={onBack} />

      <SideScrollSelect
        items={items}
        accentColor="orange"
        spriteVariant="dancer"
        eyebrow={ui.playerArchive}
        title={ui.dancePortfolio}
        onSelect={(id) => setView(id === "gallery" ? "gallery" : "bio")}
      />
    </div>
  );
}
