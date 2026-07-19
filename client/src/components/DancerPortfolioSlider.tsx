import { useState } from "react";
import { X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import HorizontalSlider from "./HorizontalSlider";

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

const danceActivities: DanceActivity[] = [
  {
    id: "01",
    title: "Stage Presence",
    meta: "PERFORMANCE",
    description: "Facial expressions, eye contact, and body lines amplify the song's energy on stage through dynamic performance.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/Kri6sE8RpbU?autoplay=1&mute=1&controls=1&playsinline=1",
      thumbnail: "https://i.ytimg.com/vi/Kri6sE8RpbU/maxresdefault.jpg",
    },
  },
  {
    id: "02",
    title: "Choreography Study",
    meta: "TRAINING",
    description: "Rhythm breakdown, movement connection, and dynamic control form the foundation of structured training.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=800&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
    },
  },
  {
    id: "03",
    title: "Battle Energy",
    meta: "FREESTYLE",
    description: "Improvisation and quick reactions showcase command of space through freestyle battle style.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1547394765-185342c1da36?w=1200&h=800&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1547394765-185342c1da36?w=400&h=300&fit=crop",
    },
  },
];

interface LightboxProps {
  media: DanceActivity["media"];
  title: string;
  onClose: () => void;
}

function Lightbox({ media, title, onClose }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${title}`}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 text-orange-300 transition-all duration-300 hover:text-orange-100 hover:scale-110 md:-top-16"
          aria-label="Close lightbox"
        >
          <X size={32} />
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
  onOpen,
}: {
  activity: DanceActivity;
  onOpen: (activity: DanceActivity) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onOpen(activity)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full cursor-pointer border-2 border-orange-200/30 bg-black/50 p-3 shadow-[6px_6px_0_rgba(251,146,60,0.12)] backdrop-blur-sm transition-all duration-300 hover:border-orange-200/70 hover:bg-orange-950/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] md:p-4"
      aria-label={`Open ${activity.title} media`}
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
          <span>→ VIEW MEDIA</span>
        </div>
      </div>
    </button>
  );
}

function VideoSlide() {
  const [selectedActivity, setSelectedActivity] = useState<DanceActivity | null>(
    null
  );
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  return (
    <>
      <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#1a0503] text-white">
        <div className="pointer-events-none fixed inset-0 opacity-35 arcade-scanline pointer-events-none" />
        <div className="pointer-events-none absolute -right-20 top-4 h-96 w-96 rounded-full bg-orange-500/22 blur-3xl" />

        <div className="relative z-10 flex h-auto min-h-0 w-full flex-col items-center justify-start px-4 pb-6 pt-20 md:h-full md:px-8 md:py-8 lg:px-12">
          <div className="shrink-0 text-center">
            <p className="font-rajdhani text-xs font-black uppercase tracking-[0.42em] text-orange-200 md:text-sm">
              PLAYER 02 ARCHIVE
            </p>
            <h1 className="mt-2 skew-x-[-8deg] font-bebas text-[clamp(2.4rem,7vw,5.6rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
              DANCE PORTFOLIO
            </h1>
          </div>

          <div className="relative mx-auto mt-6 w-full max-w-4xl shrink-0 md:mt-8">
            <div
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
              onFocus={() => setIsVideoHovered(true)}
              onBlur={() => setIsVideoHovered(false)}
              tabIndex={0}
              role="button"
              aria-label="Dance performance video preview"
              className="group relative aspect-video w-full overflow-hidden border-2 border-orange-300/60 bg-black outline-none transition-all duration-300 hover:border-orange-200 focus:border-orange-200 cursor-pointer"
              onClick={() => setSelectedActivity(danceActivities[0])}
              style={{
                boxShadow: isVideoHovered
                  ? "0 0 50px rgba(249,115,22,0.8), 0 0 100px rgba(249,115,22,0.4), inset 0 0 30px rgba(249,115,22,0.2)"
                  : "0 0 30px rgba(249,115,22,0.4), 0 0 60px rgba(249,115,22,0.2), inset 0 0 20px rgba(249,115,22,0.1)",
              }}
            >
              {isVideoHovered ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/Kri6sE8RpbU?autoplay=1&mute=1&controls=0&loop=1&playlist=Kri6sE8RpbU&playsinline=1"
                  title="Dance portfolio hover preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0">
                  <img
                    src="https://i.ytimg.com/vi/Kri6sE8RpbU/maxresdefault.jpg"
                    alt="Dance performance video thumbnail"
                    className="h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92),rgba(0,0,0,0.08)_55%)]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-orange-200 bg-orange-400/90 text-2xl text-black shadow-[0_0_50px_rgba(251,146,60,0.7)] transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24 md:text-4xl">
                        ▶
                      </div>
                      <p className="mt-4 skew-x-[-10deg] font-bebas text-2xl tracking-[0.06em] text-white text-shadow-arcade md:text-3xl">
                        LIVE HOVER CARD
                      </p>
                      <p className="mt-2 font-rajdhani text-xs font-black uppercase tracking-[0.3em] text-orange-100/80 md:text-sm">
                        Click to Open
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid w-full max-w-4xl shrink-0 grid-cols-1 gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
            {danceActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
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
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </>
  );
}

function BioSlide() {
  return (
    <section className="relative h-auto w-full overflow-visible md:h-full md:overflow-y-auto bg-[#1a0503] px-4 py-16 md:px-8 md:py-24 lg:px-12 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-35 arcade-scanline" />
      <div className="pointer-events-none absolute -right-20 top-4 h-96 w-96 rounded-full bg-orange-500/22 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <p className="font-rajdhani text-xs font-black uppercase tracking-[0.36em] text-orange-200 md:text-sm mb-4">
          ABOUT DANCER
        </p>
        <h2 className="font-bebas text-4xl font-bold text-orange-100 mb-8">
          Movement & Expression
        </h2>

        <div className="space-y-6 font-rajdhani text-light-secondary">
          <p className="text-base leading-relaxed">
            As a professional dancer, I bring rhythm, presence, and battle energy
            to every performance. My movement vocabulary spans contemporary,
            freestyle, and battle styles, each with its own unique expression and
            technical demands.
          </p>
          <p className="text-base leading-relaxed">
            My dance background directly influences my design philosophy.
            Understanding how the body naturally moves through space and interacts
            with technology has shaped my approach to creating gesture-based UX
            and embodied interaction design.
          </p>
          <p className="text-base leading-relaxed">
            Every performance is a study in presence, timing, and spatial
            awareness. These principles translate seamlessly into interaction
            design, where the goal is to create experiences that feel as natural
            and intuitive as movement itself.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function DancerPortfolioSlider({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative h-auto min-h-dvh overflow-visible md:h-[100dvh] md:overflow-hidden bg-black">
      <LanguageSwitcher />
      <button
        onClick={onBack}
        className="absolute left-4 top-4 z-50 skew-x-[-12deg] border-2 border-orange-300/45 bg-black/55 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.2em] text-orange-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-300 hover:text-[#1b0603] md:left-8 md:top-8 md:px-4 md:text-sm"
      >
        <span className="inline-block skew-x-[12deg]">&lt; BACK TO SELECT</span>
      </button>

      <HorizontalSlider showDots showArrows>
        <VideoSlide />
        <BioSlide />
      </HorizontalSlider>
    </div>
  );
}
