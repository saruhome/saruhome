import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useGameAudio } from "../contexts/GameAudioContext";
import { assetUrl } from "../lib/assetUrl";

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
  designer: assetUrl("designer-chibi-sprite-sheet_011ed7b7.png", "designer-chibi-sprite-sheet.png"),
  dancer: assetUrl("dancer-chibi-sprite-sheet_e9dd17a4.png", "dancer-chibi-sprite-sheet.png"),
} as const;

const CHIBI_RUN_GIF = {
  designer: assetUrl("designer-side-run-loop_9ff2817f.gif", "designer-side-run-loop.gif"),
  dancer: assetUrl("dancer-side-run-loop_236084fb.gif", "dancer-side-run-loop.gif"),
} as const;

const spritePosition = {
  idle: "0% 0%",
  walk: "100% 0%",
  jump: "0% 100%",
} as const;

const ARCHIVE_STAGE = assetUrl("portfolio-arcade-stage_9f866b47.png", "portfolio-arcade-stage.png");

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
  frame: 0 | 1 | 2 | 3;
}) {
  const accent = variant === "designer" ? "#22d3ee" : "#fb923c";
  const dark = variant === "designer" ? "#0e7490" : "#c2410c";
  const roleLabel = variant === "designer" ? "PLAYER 01" : "PLAYER 02";
  const bobOffset = walking ? (frame === 0 ? -3 : 1) : 0;
  const spriteState = jumping ? "jump" : walking ? "walk" : "idle";
  const currentSpritePosition = spritePosition[spriteState];

  return (
    <div className="relative h-44 w-40 origin-bottom md:h-72 md:w-64">
      <div
        className="absolute inset-x-0 bottom-2 h-[92%] origin-bottom transition-transform duration-100 ease-out"
        style={{
          transform: `scaleX(${facing === "left" ? -1 : 1}) translateY(${jumping ? -38 : crouching ? 15 : bobOffset}px) scaleY(${crouching ? 0.74 : 1})`,
        }}
      >
        {walking ? (
          <img
            src={CHIBI_RUN_GIF[variant]}
            alt=""
            draggable={false}
            className="relative h-full w-full object-contain [image-rendering:pixelated] [image-rendering:crisp-edges]"
          />
        ) : (
          <div
            className="relative h-full w-full bg-no-repeat [image-rendering:pixelated] [image-rendering:crisp-edges]"
            style={{
              backgroundImage: `url(${CHIBI_SPRITE_SHEET[variant]})`,
              backgroundPosition: currentSpritePosition,
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
  onHover,
}: {
  item: SideScrollItem;
  x: number;
  active: boolean;
  push: number;
  isCyan: boolean;
  pressLabel: string;
  onSelect: (id: string) => void;
  onHover: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      onMouseEnter={onHover}
      style={{ left: x }}
      aria-label={item.label}
      className={`absolute bottom-40 flex -translate-x-1/2 flex-col items-center gap-4 transition-transform duration-200 md:bottom-32 ${
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

type TouchDirection = "left" | "right";

function MobileTouchControls({
  isCyan,
  movingDirection,
  canSelect,
  onMoveStart,
  onMoveEnd,
  onJump,
  onSelect,
}: {
  isCyan: boolean;
  movingDirection: TouchDirection | null;
  canSelect: boolean;
  onMoveStart: (direction: TouchDirection) => void;
  onMoveEnd: () => void;
  onJump: () => void;
  onSelect: () => void;
}) {
  const buttonBase = "grid h-14 w-14 select-none place-items-center border-2 bg-black/75 font-bebas text-3xl text-white shadow-[0_0_18px_rgba(0,0,0,0.38)] transition-transform duration-150 active:scale-95";
  const passiveAccent = isCyan ? "border-cyan-300/70 text-cyan-100" : "border-orange-300/70 text-orange-100";
  const activeAccent = isCyan ? "border-cyan-200 bg-cyan-300 text-[#06101e]" : "border-orange-200 bg-orange-300 text-[#1b0603]";
  const pointerHandlers = (direction: TouchDirection) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      onMoveStart(direction);
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      onMoveEnd();
    },
    onPointerCancel: onMoveEnd,
    onLostPointerCapture: onMoveEnd,
  });

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 flex items-end justify-between px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-12 md:hidden pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1.5 border border-white/15 bg-black/35 p-1.5 backdrop-blur-sm" style={{ touchAction: "none" }}>
        <button type="button" aria-label="Move left" aria-pressed={movingDirection === "left"} className={`${buttonBase} ${movingDirection === "left" ? activeAccent : passiveAccent}`} {...pointerHandlers("left")}>←</button>
        <button type="button" aria-label="Move right" aria-pressed={movingDirection === "right"} className={`${buttonBase} ${movingDirection === "right" ? activeAccent : passiveAccent}`} {...pointerHandlers("right")}>→</button>
      </div>

      <div className="pointer-events-auto flex items-center gap-2" style={{ touchAction: "manipulation" }}>
        <button
          type="button"
          onPointerDown={(event) => { event.preventDefault(); onJump(); }}
          aria-label="Jump"
          className={`grid h-16 w-16 select-none place-items-center rounded-full border-2 bg-black/80 font-rajdhani text-xs font-black tracking-[0.12em] text-white shadow-[0_0_20px_rgba(0,0,0,0.42)] transition-transform duration-150 active:scale-95 ${passiveAccent}`}
        >
          JUMP
        </button>
        <button
          type="button"
          onPointerDown={(event) => { event.preventDefault(); onSelect(); }}
          disabled={!canSelect}
          aria-label="Select current archive item"
          className={`grid h-16 w-16 select-none place-items-center rounded-full border-2 bg-black/80 font-rajdhani text-[0.62rem] font-black tracking-[0.12em] text-white shadow-[0_0_20px_rgba(0,0,0,0.42)] transition-transform duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 ${canSelect ? passiveAccent : "border-white/20"}`}
        >
          SELECT
        </button>
      </div>
    </div>
  );
}

export default function SideScrollSelect({
  items,
  onSelect,
  onBack,
  backLabel,
  accentColor,
  spriteVariant,
  eyebrow,
  title,
}: {
  items: SideScrollItem[];
  onSelect: (id: string) => void;
  onBack: () => void;
  backLabel: string;
  accentColor: "cyan" | "orange";
  spriteVariant: "designer" | "dancer";
  eyebrow: string;
  title: string;
}) {
  const { t } = useLanguage();
  const { playConfirm, playHover, playJump, playNavigate } = useGameAudio();
  const isCyan = accentColor === "cyan";

  const [charX, setCharX] = useState(60);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [jumping, setJumping] = useState(false);
  const [crouching, setCrouching] = useState(false);
  const [walkFrame, setWalkFrame] = useState<0 | 1 | 2 | 3>(0);
  const [isMoving, setIsMoving] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [touchDirection, setTouchDirection] = useState<TouchDirection | null>(null);
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

  const triggerJump = useCallback(() => {
    if (jumping) return;
    setJumping(true);
    playJump();
    window.setTimeout(() => setJumping(false), JUMP_MS);
  }, [jumping, playJump]);

  const triggerSelect = useCallback(() => {
    if (!activeItem) return;
    playConfirm();
    onSelect(activeItem.id);
  }, [activeItem, onSelect, playConfirm]);

  const startTouchMove = useCallback((direction: TouchDirection) => {
    keys.current.left = direction === "left";
    keys.current.right = direction === "right";
    setIsMoving(true);
    setTouchDirection(direction);
    playNavigate();
  }, [playNavigate]);

  const endTouchMove = useCallback(() => {
    keys.current.left = false;
    keys.current.right = false;
    setIsMoving(false);
    setTouchDirection(null);
  }, []);

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
          setWalkFrame((f) => ((f + 1) % 4) as 0 | 1 | 2 | 3);
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
      if (e.key === "ArrowLeft") {
        keys.current.left = true;
        setIsMoving(true);
      }
      if (e.key === "ArrowLeft" && !e.repeat) playNavigate();
      if (e.key === "ArrowRight") {
        keys.current.right = true;
        setIsMoving(true);
      }
      if (e.key === "ArrowRight" && !e.repeat) playNavigate();
      if (e.key === "ArrowDown") setCrouching(true);
      if (e.key === "ArrowUp" && !e.repeat) {
        triggerJump();
      }
      if ((e.key === "Enter" || e.key === " ") && activeItem) {
        e.preventDefault();
        triggerSelect();
      }
      if (e.key === "?") setShowHelp((v) => !v);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        keys.current.left = false;
        setIsMoving(keys.current.right);
      }
      if (e.key === "ArrowRight") {
        keys.current.right = false;
        setIsMoving(keys.current.left);
      }
      if (e.key === "ArrowDown") setCrouching(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [activeItem, playNavigate, triggerJump, triggerSelect]);

  const cameraX = Math.min(Math.max(charX - viewportWidth / 2, 0), Math.max(0, levelWidth - viewportWidth));
  const walking = isMoving && !jumping && !crouching;
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

      <div className="absolute inset-x-4 top-4 z-30 flex flex-wrap items-center gap-2 md:inset-x-8 md:top-7 md:gap-3">
        <button
          type="button"
          onClick={onBack}
          className={`shrink-0 skew-x-[-12deg] border-2 bg-black/75 px-3 py-1.5 font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 md:px-4 md:text-xs ${isCyan ? "border-cyan-200/75 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-200/75 hover:bg-orange-300 hover:text-[#1b0603]"}`}
        >
          <span className="inline-block skew-x-[12deg]">&lt; {backLabel}</span>
        </button>
        <div className={`shrink-0 border-2 px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] ${isCyan ? "border-cyan-200/80 bg-cyan-300/15 text-cyan-100" : "border-orange-200/80 bg-orange-300/15 text-orange-100"}`}>
          {playerLabel}
        </div>
        <div className="border border-white/20 bg-black/55 px-3 py-1.5 font-rajdhani text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm md:text-[0.65rem] md:tracking-[0.22em]">
          {archiveLabel}
        </div>
      </div>

      <div className="relative z-10 px-4 pt-28 text-center md:px-8 md:pt-28">
        <p className={`font-rajdhani text-xs font-black uppercase tracking-[0.42em] md:text-sm ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
          {eyebrow}
        </p>
        <h1 className="mt-2 skew-x-[-8deg] font-bebas text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
          {title}
        </h1>
      </div>

      {/* Static floor */}
      <div className={`absolute inset-x-0 bottom-36 z-10 h-2 shadow-[0_0_24px_currentColor] md:bottom-28 ${isCyan ? "bg-cyan-300/40 text-cyan-300" : "bg-orange-300/40 text-orange-300"}`} />

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
              onSelect={(id) => { playConfirm(); onSelect(id); }}
              onHover={playHover}
            />
          );
        })}

        <div className="absolute bottom-[5.4rem] -translate-x-1/2 md:bottom-[4.1rem]" style={{ left: charX }}>
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
      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+6rem)] right-4 z-20 md:bottom-8 md:right-8">
        {showHelp && (
          <div
            className={`mb-4 w-[min(28rem,calc(100vw-2rem))] border-4 bg-black/85 p-6 font-rajdhani text-base text-white/80 backdrop-blur-sm ${
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

      <MobileTouchControls
        isCyan={isCyan}
        movingDirection={touchDirection}
        canSelect={Boolean(activeItem)}
        onMoveStart={startTouchMove}
        onMoveEnd={endTouchMove}
        onJump={triggerJump}
        onSelect={triggerSelect}
      />
    </section>
  );
}
