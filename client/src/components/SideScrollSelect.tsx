import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Side-scroll "run to select" screen.
 * Arrow keys run/jump/crouch a 2-head-tall pixel character past a row of
 * signposts (projects / menu items); Enter or a click selects the nearest one.
 */

const ITEM_SPACING = 380;
const START_X = 160;
const END_PADDING = 300;
const SELECT_RADIUS = 140;
const HIT_RADIUS = 110;
const PUSH_SCALE = 0.8;
const SPEED = 260; // px/sec
const WALK_FRAME_MS = 130;
const JUMP_MS = 380;

const CHIBI_SPRITE_SHEET = {
  designer: "/manus-storage/designer-chibi-sprite-sheet_011ed7b7.png",
  dancer: "/manus-storage/dancer-chibi-sprite-sheet_e9dd17a4.png",
} as const;

const spritePosition = {
  idle: "0% 0%",
  walk: "100% 0%",
  jump: "0% 100%",
} as const;

const ARCHIVE_STAGE = "/manus-storage/portfolio-arcade-stage_9f866b47.png";

function playJumpSound() {
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
  osc.onended = () => ctx.close();
}

export type SideScrollItem = { id: string; label: string; sublabel?: string };

function PixelCharacter({
  variant,
  facing,
  jumping,
  crouching,
  walking,
  frame,
}: {
  variant: "designer" | "dancer";
  facing: "left" | "right";
  jumping: boolean;
  crouching: boolean;
  walking: boolean;
  frame: 0 | 1;
}) {
  const accent = variant === "designer" ? "#22d3ee" : "#fb923c";
  const dark = variant === "designer" ? "#0e7490" : "#c2410c";
  const roleLabel = variant === "designer" ? "PLAYER 01" : "PLAYER 02";
  const bobOffset = walking ? (frame === 0 ? -3 : 1) : 0;
  const [spriteReady, setSpriteReady] = useState(false);
  const spriteState = jumping ? "jump" : walking ? "walk" : "idle";

  return (
    <div className="relative h-40 w-28 origin-bottom">
      <div
        className="absolute inset-x-0 bottom-0 h-7 rounded-[50%] blur-md"
        style={{ background: `${accent}55`, transform: `scaleX(${walking ? 1.12 : 0.92})` }}
      />
      <div
        className="absolute inset-x-0 bottom-2 h-36 origin-bottom transition-transform duration-150 ease-out"
        style={{
          transform: `scaleX(${facing === "left" ? -1 : 1}) translateY(${jumping ? -38 : crouching ? 15 : bobOffset}px) scaleY(${crouching ? 0.74 : 1})`,
        }}
      >
        <div className="absolute inset-0 scale-110 opacity-45 blur-md" style={{ background: accent, clipPath: "polygon(35% 0,65% 0,95% 92%,5% 92%)" }} />
        {!spriteReady && (
          <div className="absolute inset-0 mx-auto w-20 [image-rendering:pixelated]" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-6 w-16 -translate-x-1/2 rounded-t-sm" style={{ background: variant === "designer" ? "#132534" : "#f4c98c" }} />
            <div className="absolute left-1/2 top-4 h-11 w-12 -translate-x-1/2 rounded-sm" style={{ background: variant === "designer" ? "#f1c8a7" : "#f7d0ac" }} />
            {variant === "designer" && <div className="absolute left-1/2 top-8 h-2 w-14 -translate-x-1/2 border-x-2 border-cyan-200/90" />}
            <div className="absolute left-1/2 top-[3.7rem] h-12 w-16 -translate-x-1/2 border-4 rounded-[3px]" style={{ background: accent, borderColor: dark }} />
            <div className="absolute left-3 top-[6.1rem] h-10 w-5 rounded-sm" style={{ background: dark }} />
            <div className="absolute right-3 top-[6.1rem] h-10 w-5 rounded-sm" style={{ background: dark }} />
          </div>
        )}
        <img src={CHIBI_SPRITE_SHEET[variant]} alt="" aria-hidden="true" draggable={false} onLoad={() => setSpriteReady(true)} onError={() => setSpriteReady(false)} className="sr-only" />
        {spriteReady && (
          <div
            className="relative h-full w-full bg-no-repeat [image-rendering:pixelated] [image-rendering:crisp-edges]"
            style={{
              backgroundImage: `url(${CHIBI_SPRITE_SHEET[variant]})`,
              backgroundPosition: spritePosition[spriteState],
              backgroundSize: "200% 200%",
            }}
          />
        )}
      </div>
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap border px-2 py-0.5 font-rajdhani text-[0.6rem] font-black tracking-[0.2em] text-white"
        style={{ borderColor: `${accent}99`, background: `${dark}dd` }}
      >
        {roleLabel}
      </div>
    </div>
  );
}

function Signpost({
  item,
  x,
  active,
  push,
  isCyan,
  pressLabel,
  onSelect,
}: {
  item: SideScrollItem;
  x: number;
  active: boolean;
  push: number;
  isCyan: boolean;
  pressLabel: string;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      style={{ left: x }}
      aria-label={item.label}
      className={`absolute bottom-32 flex -translate-x-1/2 flex-col items-center gap-4 transition-transform duration-200 ${
        active ? "scale-110" : "scale-100"
      }`}
    >
      <div style={{ transform: `translateX(${push}px) rotate(${push * 0.06}deg)`, transition: "transform 150ms ease-out" }}>
        <div
          className={`skew-x-[-12deg] whitespace-nowrap border-4 px-6 py-4 font-rajdhani text-base font-black uppercase tracking-[0.15em] backdrop-blur-sm transition-colors duration-200 ${
            active
              ? isCyan
                ? "border-cyan-200 bg-cyan-300 text-[#06101e]"
                : "border-orange-200 bg-orange-300 text-[#1b0603]"
              : isCyan
                ? "border-cyan-300/50 bg-black/60 text-cyan-100"
                : "border-orange-300/50 bg-black/60 text-orange-100"
          }`}
        >
          <span className="inline-block skew-x-[12deg]">{item.label}</span>
        </div>
      </div>
      {item.sublabel && (
        <span className={`font-rajdhani text-[1.2rem] uppercase tracking-[0.2em] ${isCyan ? "text-cyan-200/70" : "text-orange-200/70"}`}>
          {item.sublabel}
        </span>
      )}
      {active && (
        <span className={`animate-pulse whitespace-nowrap font-rajdhani text-[1.24rem] font-black uppercase tracking-[0.2em] ${isCyan ? "text-cyan-100" : "text-orange-100"}`}>
          {pressLabel}
        </span>
      )}
      <div className={`h-32 w-2 ${isCyan ? "bg-cyan-300/50" : "bg-orange-300/50"}`} />
    </button>
  );
}

export default function SideScrollSelect({
  items,
  onSelect,
  accentColor,
  spriteVariant,
  eyebrow,
  title,
}: {
  items: SideScrollItem[];
  onSelect: (id: string) => void;
  accentColor: "cyan" | "orange";
  spriteVariant: "designer" | "dancer";
  eyebrow: string;
  title: string;
}) {
  const { t } = useLanguage();
  const isCyan = accentColor === "cyan";

  const [charX, setCharX] = useState(60);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [jumping, setJumping] = useState(false);
  const [crouching, setCrouching] = useState(false);
  const [walkFrame, setWalkFrame] = useState<0 | 1>(0);
  const [showHelp, setShowHelp] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));

  const keys = useRef({ left: false, right: false });
  const rafRef = useRef<number | undefined>(undefined);
  const lastFrameToggle = useRef(0);

  const itemPositions = useMemo(() => items.map((_, i) => START_X + i * ITEM_SPACING), [items]);
  const levelWidth = START_X + Math.max(0, items.length - 1) * ITEM_SPACING + END_PADDING;

  const activeItem = useMemo(() => {
    const candidates = items
      .map((item, i) => ({ item, dist: Math.abs(itemPositions[i] - charX) }))
      .filter((c) => c.dist < SELECT_RADIUS)
      .sort((a, b) => a.dist - b.dist);
    return candidates.length > 0 ? candidates[0].item : null;
  }, [items, itemPositions, charX]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Game loop: continuous movement + walk-cycle timing while a direction key is held
  useEffect(() => {
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (keys.current.left !== keys.current.right) {
        const dir = keys.current.left ? -1 : 1;
        setCharX((x) => Math.min(Math.max(x + dir * SPEED * dt, 80), levelWidth - 80));
        setFacing(dir === -1 ? "left" : "right");
        if (now - lastFrameToggle.current > WALK_FRAME_MS) {
          setWalkFrame((f) => (f === 0 ? 1 : 0));
          lastFrameToggle.current = now;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [levelWidth]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keys.current.left = true;
      if (e.key === "ArrowRight") keys.current.right = true;
      if (e.key === "ArrowDown") setCrouching(true);
      if (e.key === "ArrowUp" && !e.repeat) {
        setJumping(true);
        playJumpSound();
        window.setTimeout(() => setJumping(false), JUMP_MS);
      }
      if ((e.key === "Enter" || e.key === " ") && activeItem) {
        e.preventDefault();
        onSelect(activeItem.id);
      }
      if (e.key === "?") setShowHelp((v) => !v);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keys.current.left = false;
      if (e.key === "ArrowRight") keys.current.right = false;
      if (e.key === "ArrowDown") setCrouching(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [activeItem, onSelect]);

  const cameraX = Math.min(Math.max(charX - viewportWidth / 2, 0), Math.max(0, levelWidth - viewportWidth));
  const walking = keys.current.left !== keys.current.right;
  const playerLabel = spriteVariant === "designer" ? "PLAYER 01" : "PLAYER 02";
  const archiveLabel = isCyan ? "DESIGN ARCHIVE" : "DANCE ARCHIVE";

  return (
    <section
      className={`relative h-full w-full overflow-hidden ${isCyan ? "bg-[#07111f]" : "bg-[#1a0503]"}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: `url(${ARCHIVE_STAGE})`,
          backgroundPosition: `${-cameraX * 0.16}px bottom`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          filter: isCyan ? "saturate(0.92) contrast(1.05)" : "hue-rotate(312deg) saturate(1.55) contrast(1.1)",
        }}
      />
      <div className={`pointer-events-none absolute inset-0 ${isCyan ? "bg-[linear-gradient(180deg,rgba(3,12,25,0.66),rgba(3,12,25,0.1)_45%,rgba(3,12,25,0.82))]" : "bg-[linear-gradient(180deg,rgba(30,5,3,0.7),rgba(64,11,4,0.12)_45%,rgba(30,5,3,0.86))]"}`} />
      <div className="pointer-events-none absolute inset-0 opacity-35 arcade-scanline" />

      <div className="absolute left-4 top-4 z-30 flex items-center gap-3 md:left-8 md:top-7">
        <div className={`border-2 px-3 py-1.5 font-rajdhani text-xs font-black uppercase tracking-[0.25em] ${isCyan ? "border-cyan-200/80 bg-cyan-300/15 text-cyan-100" : "border-orange-200/80 bg-orange-300/15 text-orange-100"}`}>
          {playerLabel}
        </div>
        <div className="hidden border border-white/20 bg-black/45 px-3 py-1.5 font-rajdhani text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/70 sm:block">
          {archiveLabel}
        </div>
      </div>

      <div className="relative z-10 px-4 pt-20 text-center md:px-8 md:pt-8">
        <p className={`font-rajdhani text-xs font-black uppercase tracking-[0.42em] md:text-sm ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
          {eyebrow}
        </p>
        <h1 className="mt-2 skew-x-[-8deg] font-bebas text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
          {title}
        </h1>
      </div>

      {/* Static floor */}
      <div className={`absolute inset-x-0 bottom-28 z-10 h-2 shadow-[0_0_24px_currentColor] ${isCyan ? "bg-cyan-300/40 text-cyan-300" : "bg-orange-300/40 text-orange-300"}`} />

      {/* Scrolling world */}
      <div
        className="absolute bottom-0 left-0 h-full"
        style={{ width: levelWidth, transform: `translateX(${-cameraX}px)` }}
      >
        {items.map((item, i) => {
          const dist = itemPositions[i] - charX;
          const absDist = Math.abs(dist);
          const push = absDist < HIT_RADIUS ? (HIT_RADIUS - absDist) * PUSH_SCALE * (dist >= 0 ? 1 : -1) : 0;
          return (
            <Signpost
              key={item.id}
              item={item}
              x={itemPositions[i]}
              active={activeItem?.id === item.id}
              push={push}
              isCyan={isCyan}
              pressLabel={t("pressToSelect")}
              onSelect={onSelect}
            />
          );
        })}

        <div className="absolute bottom-[5.3rem] -translate-x-1/2" style={{ left: charX }}>
          <PixelCharacter
            variant={spriteVariant}
            facing={facing}
            jumping={jumping}
            crouching={crouching}
            walking={walking}
            frame={walkFrame}
          />
        </div>
      </div>

      {/* Controls help */}
      <div className="absolute bottom-4 right-4 z-20 md:bottom-8 md:right-8">
        {showHelp && (
          <div
            className={`mb-4 w-[28rem] border-4 bg-black/85 p-6 font-rajdhani text-base text-white/80 backdrop-blur-sm ${
              isCyan ? "border-cyan-300/50" : "border-orange-300/50"
            }`}
          >
            <p className={`mb-4 font-black uppercase tracking-[0.2em] ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
              {t("controls")}
            </p>
            <ul className="space-y-2">
              <li>← → {t("moveHint")}</li>
              <li>↑ {t("jumpHint")}</li>
              <li>↓ {t("crouchHint")}</li>
              <li>Enter {t("pressToSelect")}</li>
            </ul>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowHelp((v) => !v)}
          aria-label={t("controls")}
          className={`grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-4 bg-black/70 font-bebas text-3xl text-white transition-colors duration-200 ${
            isCyan ? "border-cyan-300/60 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-300/60 hover:bg-orange-300 hover:text-[#1b0603]"
          }`}
        >
          ?
        </button>
      </div>
    </section>
  );
}
