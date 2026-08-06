import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

/**
 * Side-scroll "run to select" screen.
 * Arrow keys run/jump/crouch a 2-head-tall pixel character past a row of
 * signposts (projects / menu items); Enter or a click selects the nearest one.
 */

const ITEM_SPACING = 260;
const START_X = 160;
const END_PADDING = 300;
const SELECT_RADIUS = 70;
const SPEED = 260; // px/sec
const WALK_FRAME_MS = 130;
const JUMP_MS = 380;

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
  const legAngle = walking ? (frame === 0 ? -20 : 20) : 0;

  return (
    <div
      className="relative h-16 w-10 origin-bottom transition-transform duration-150 ease-out"
      style={{
        transform: `scaleX(${facing === "left" ? -1 : 1}) translateY(${
          jumping ? -16 : crouching ? 8 : 0
        }px) scaleY(${crouching ? 0.72 : 1})`,
      }}
    >
      <div className="absolute left-1/2 top-0 h-3 w-8 -translate-x-1/2 rounded-t-sm" style={{ background: "#2b1a12" }} />
      <div className="absolute left-1/2 top-1 h-6 w-6 -translate-x-1/2 rounded-sm" style={{ background: "#f3c9a1" }} />
      <div
        className="absolute left-1/2 top-7 h-6 w-8 -translate-x-1/2 rounded-[2px]"
        style={{ background: accent, border: `2px solid ${dark}` }}
      />
      <div
        className="absolute left-[7px] top-[15px] h-5 w-3 origin-top rounded-[1px]"
        style={{ background: dark, transform: `rotate(${legAngle}deg)` }}
      />
      <div
        className="absolute right-[7px] top-[15px] h-5 w-3 origin-top rounded-[1px]"
        style={{ background: dark, transform: `rotate(${-legAngle}deg)` }}
      />
    </div>
  );
}

function Signpost({
  item,
  x,
  active,
  isCyan,
  pressLabel,
  onSelect,
}: {
  item: SideScrollItem;
  x: number;
  active: boolean;
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
      className={`absolute bottom-16 flex -translate-x-1/2 flex-col items-center gap-2 transition-transform duration-200 ${
        active ? "scale-110" : "scale-100"
      }`}
    >
      <div
        className={`skew-x-[-12deg] whitespace-nowrap border-2 px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.15em] backdrop-blur-sm transition-colors duration-200 ${
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
      {item.sublabel && (
        <span className={`font-rajdhani text-[0.6rem] uppercase tracking-[0.2em] ${isCyan ? "text-cyan-200/70" : "text-orange-200/70"}`}>
          {item.sublabel}
        </span>
      )}
      {active && (
        <span className={`animate-pulse whitespace-nowrap font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] ${isCyan ? "text-cyan-100" : "text-orange-100"}`}>
          {pressLabel}
        </span>
      )}
      <div className={`h-16 w-1 ${isCyan ? "bg-cyan-300/50" : "bg-orange-300/50"}`} />
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
        setCharX((x) => Math.min(Math.max(x + dir * SPEED * dt, 40), levelWidth - 40));
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

  return (
    <section
      className={`relative h-full w-full overflow-hidden ${isCyan ? "bg-[#07111f]" : "bg-[#1a0503]"}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-35 arcade-scanline" />

      <div className="relative z-10 px-4 pt-20 text-center md:px-8 md:pt-8">
        <p className={`font-rajdhani text-xs font-black uppercase tracking-[0.42em] md:text-sm ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
          {eyebrow}
        </p>
        <h1 className="mt-2 skew-x-[-8deg] font-bebas text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
          {title}
        </h1>
      </div>

      {/* Static floor */}
      <div className={`absolute inset-x-0 bottom-14 z-10 h-1 ${isCyan ? "bg-cyan-300/30" : "bg-orange-300/30"}`} />

      {/* Scrolling world */}
      <div
        className="absolute bottom-0 left-0 h-full"
        style={{ width: levelWidth, transform: `translateX(${-cameraX}px)` }}
      >
        {items.map((item, i) => (
          <Signpost
            key={item.id}
            item={item}
            x={itemPositions[i]}
            active={activeItem?.id === item.id}
            isCyan={isCyan}
            pressLabel={t("pressToSelect")}
            onSelect={onSelect}
          />
        ))}

        <div className="absolute bottom-16 -translate-x-1/2" style={{ left: charX }}>
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
            className={`mb-2 w-56 border-2 bg-black/85 p-3 font-rajdhani text-xs text-white/80 backdrop-blur-sm ${
              isCyan ? "border-cyan-300/50" : "border-orange-300/50"
            }`}
          >
            <p className={`mb-2 font-black uppercase tracking-[0.2em] ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
              {t("controls")}
            </p>
            <ul className="space-y-1">
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
          className={`grid h-9 w-9 place-items-center rounded-full border-2 bg-black/70 font-bebas text-lg text-white transition-colors duration-200 ${
            isCyan ? "border-cyan-300/60 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-300/60 hover:bg-orange-300 hover:text-[#1b0603]"
          }`}
        >
          ?
        </button>
      </div>
    </section>
  );
}
