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
// Desktop archive content begins on the same 32px guide as the BACK TO SELECT HUD.
// The 256px chibi footprint therefore starts at x=32 while its centre lands on the first project.
const ARCHIVE_LEFT_MARGIN = 32;
const CHARACTER_DESKTOP_WIDTH = 256;
const START_X = ARCHIVE_LEFT_MARGIN + CHARACTER_DESKTOP_WIDTH / 2;
const END_PADDING = 300;
const SELECT_RADIUS = 140;
const SPEED = 260; // px/sec
const RUN_ACCELERATION = 1180; // px/sec²
const RUN_DECELERATION = 1480; // px/sec²
const WALK_FRAME_MS = 130;
const JUMP_MS = 380;
const DOUBLE_JUMP_MS = 320;

const CHIBI_SPRITE_SHEET = {
  designer: assetUrl("designer-chibi-sprite-sheet_011ed7b7.png", "designer-chibi-sprite-sheet.png"),
  dancer: assetUrl("dancer-chibi-sprite-sheet_e9dd17a4.png", "dancer-chibi-sprite-sheet.png"),
} as const;

const CHIBI_RUN_GIF = {
  designer: assetUrl("designer-side-run-loop_8043e6f7.gif", "designer-side-run-loop.gif"),
  dancer: assetUrl("dancer-side-run-loop_cb381184.gif", "dancer-side-run-loop.gif"),
} as const;

const DANCER_LEFT_RUN_GIF = assetUrl("dancer-side-run-left-loop_f29c9af5.gif", "dancer-side-run-left-loop.gif");

const CHIBI_CROUCH_FRAME = {
  designer: assetUrl("designer-crouch_ff8e0f7d.png", "designer-crouch.png"),
  dancer: assetUrl("dancer-crouch_5e4d23c2.png", "dancer-crouch.png"),
} as const;

const CHIBI_WALL_SIT = {
  designer: assetUrl("designer-wall-sit_042877db.png", "designer-wall-sit.png"),
  dancer: assetUrl("dancer-wall-sit_e2918a65.png", "dancer-wall-sit.png"),
} as const;

const spritePosition = {
  idle: "0% 0%",
  walk: "100% 0%",
  jump: "0% 100%",
  crouch: "0% 100%",
} as const;

const ARCHIVE_STAGES = {
  designer: assetUrl("pixel-designer-archive-stage_95952f5a.png", "pixel-designer-archive-stage.png"),
  dancer: assetUrl("pixel-dancer-archive-stage_f52ebca6.png", "pixel-dancer-archive-stage.png"),
} as const;

export type SideScrollItem = { id: string; label: string; sublabel?: string };
type DustBurst = { id: number; phase: "start" | "stop" };
type Collision = { id: number; edge: "left" | "right" };
type Recovery = { id: number; edge: "left" | "right" };

function PixelCharacter({
  variant,
  facing,
  jumping,
  crouching,
  walking,
  collision,
  recovery,
  frame,
  dustBurst,
}: {
  variant: "designer" | "dancer";
  facing: "left" | "right";
  jumping: boolean;
  crouching: boolean;
  walking: boolean;
  collision: Collision | null;
  recovery: Recovery | null;
  frame: 0 | 1 | 2 | 3;
  dustBurst: DustBurst | null;
}) {
  const accent = variant === "designer" ? "#22d3ee" : "#fb923c";
  const dark = variant === "designer" ? "#0e7490" : "#c2410c";
  const roleLabel = variant === "designer" ? "PLAYER 01" : "PLAYER 02";
  const bobOffset = walking ? (frame === 0 ? -3 : 1) : 0;
  const spriteState = jumping ? "jump" : crouching ? "crouch" : walking || recovery ? "walk" : "idle";
  const currentSpritePosition = spritePosition[spriteState];
  const baseFallFacing = variant === "dancer" ? "left" : "right";
  const shouldMirrorFall = collision !== null && collision.edge !== baseFallFacing;
  const shouldMirrorRun = facing === "left" && !(walking && variant === "dancer");

  return (
    <div className="relative h-44 w-40 origin-bottom md:h-72 md:w-64">
      {collision ? (
        <img
          src={CHIBI_WALL_SIT[variant]}
          alt=""
          draggable={false}
          className="pixel-wall-sit absolute inset-x-0 bottom-2 h-[92%] w-full origin-bottom object-contain [image-rendering:pixelated] [image-rendering:crisp-edges]"
          style={{ "--sit-facing": shouldMirrorFall ? -1 : 1 } as React.CSSProperties}
        />
      ) : (
        <div className={`absolute inset-0 origin-bottom ${recovery ? `archive-recover-rise archive-recover-${recovery.edge}` : ""}`}>
          <div
            className="absolute inset-x-0 bottom-2 h-[92%] origin-bottom transition-transform duration-100 ease-out"
            style={{
              transform: `scaleX(${shouldMirrorRun ? -1 : 1}) translateY(${jumping ? -38 : bobOffset}px)`,
            }}
          >
            {walking ? (
              <img
                src={variant === "dancer" && facing === "left" ? DANCER_LEFT_RUN_GIF : CHIBI_RUN_GIF[variant]}
                alt=""
                draggable={false}
                className="relative h-full w-full object-contain [image-rendering:pixelated] [image-rendering:crisp-edges]"
              />
            ) : crouching ? (
              <img
                src={CHIBI_CROUCH_FRAME[variant]}
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
        </div>
      )}
      {walking && <span className={`archive-stride-sparks archive-stride-${facing} absolute bottom-5 left-1/2 h-5 w-20 -translate-x-1/2`} style={{ "--stride-color": accent } as React.CSSProperties} aria-hidden="true"><i /><i /><i /></span>}
      {dustBurst && (
        <div
          key={dustBurst.id}
          className={`pixel-dust-burst pixel-dust-${dustBurst.phase} absolute bottom-4 left-1/2 h-8 w-24 -translate-x-1/2`}
          style={{ "--dust-color": accent, "--dust-shadow": dark } as React.CSSProperties}
          aria-hidden="true"
        >
          <i /><i /><i /><i />
        </div>
      )}
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
  isCyan,
  pressLabel,
  onSelect,
  onHover,
}: {
  item: SideScrollItem;
  x: number;
  active: boolean;
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
      className="absolute bottom-[15.5rem] z-20 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-[22.5rem]"
    >
      <div
        className={`pixel-signpost-face whitespace-nowrap border-4 px-6 py-4 font-rajdhani text-base font-black uppercase tracking-[0.15em] transition-colors duration-200 ${
          active
            ? isCyan
              ? "border-cyan-200 bg-cyan-300 text-[#06101e]"
              : "border-orange-200 bg-orange-300 text-[#1b0603]"
            : isCyan
              ? "border-cyan-300/50 bg-black/60 text-cyan-100"
              : "border-orange-300/50 bg-black/60 text-orange-100"
        }`}
      >
        {item.label}
      </div>
      {item.sublabel && (
        <span className={`pixel-signpost-meta font-rajdhani text-[1.2rem] uppercase tracking-[0.2em] ${isCyan ? "text-cyan-200/80" : "text-orange-200/80"}`}>
          {item.sublabel}
        </span>
      )}
      {active && (
        <span className={`animate-pulse whitespace-nowrap font-rajdhani text-[1.24rem] font-black uppercase tracking-[0.2em] ${isCyan ? "text-cyan-100" : "text-orange-100"}`}>
          {pressLabel}
        </span>
      )}
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
    <div className="absolute inset-x-0 bottom-[5rem] z-40 flex items-end justify-between px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-12 md:hidden pointer-events-none">
      <div className="pointer-events-auto pixel-hud-panel flex items-center gap-1.5 border-white/25 bg-[#05080dcc] p-1.5" style={{ touchAction: "none" }}>
        <button type="button" aria-label="Move left" aria-pressed={movingDirection === "left"} className={`${buttonBase} ${movingDirection === "left" ? activeAccent : passiveAccent}`} {...pointerHandlers("left")}>←</button>
        <button type="button" aria-label="Move right" aria-pressed={movingDirection === "right"} className={`${buttonBase} ${movingDirection === "right" ? activeAccent : passiveAccent}`} {...pointerHandlers("right")}>→</button>
      </div>

      <div className="pointer-events-auto flex items-center gap-2" style={{ touchAction: "manipulation" }}>
        <button
          type="button"
          onPointerDown={(event) => { event.preventDefault(); onJump(); }}
          aria-label="Jump"
          className={`grid h-16 w-16 select-none place-items-center border-2 bg-black/80 font-rajdhani text-xs font-black tracking-[0.12em] text-white shadow-[3px_3px_0_rgba(0,0,0,0.82)] transition-transform duration-150 active:scale-95 ${passiveAccent}`}
        >
          JUMP
        </button>
        <button
          type="button"
          onPointerDown={(event) => { event.preventDefault(); onSelect(); }}
          disabled={!canSelect}
          aria-label="Select current archive item"
          className={`grid h-16 w-16 select-none place-items-center border-2 bg-black/80 font-rajdhani text-[0.62rem] font-black tracking-[0.12em] text-white shadow-[3px_3px_0_rgba(0,0,0,0.82)] transition-transform duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 ${canSelect ? passiveAccent : "border-white/20"}`}
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
  const { playConfirm, playHover, playJump, playNavigate, playWallCrash } = useGameAudio();
  const isCyan = accentColor === "cyan";

  // Spawn on the first project signpost's centre; it shares the Back HUD left guide above.
  const [charX, setCharX] = useState(START_X);
  const [facing, setFacing] = useState<"left" | "right">(spriteVariant === "dancer" ? "left" : "right");
  const [jumping, setJumping] = useState(false);
  const [crouching, setCrouching] = useState(false);
  const [walkFrame, setWalkFrame] = useState<0 | 1 | 2 | 3>(0);
  const [isMoving, setIsMoving] = useState(false);
  const [dustBurst, setDustBurst] = useState<DustBurst | null>(null);
  const [collision, setCollision] = useState<Collision | null>(null);
  const [recovery, setRecovery] = useState<Recovery | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [touchDirection, setTouchDirection] = useState<TouchDirection | null>(null);
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));

  const keys = useRef({ left: false, right: false });
  const charXRef = useRef(START_X);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastFrameToggle = useRef(0);
  const dustTimer = useRef<number | undefined>(undefined);
  const collisionTimer = useRef<number | undefined>(undefined);
  const recoveryTimer = useRef<number | undefined>(undefined);
  const collisionLockUntil = useRef(0);
  const lastJumpPress = useRef(0);

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

  const triggerJumpOrSelect = useCallback(() => {
    const now = performance.now();
    const isDoubleJump = now - lastJumpPress.current <= DOUBLE_JUMP_MS;
    lastJumpPress.current = isDoubleJump ? 0 : now;

    if (isDoubleJump && activeItem) {
      triggerSelect();
      return;
    }

    triggerJump();
  }, [activeItem, triggerJump, triggerSelect]);

  const emitDust = useCallback((phase: DustBurst["phase"]) => {
    const id = Date.now();
    setDustBurst({ id, phase });
    if (dustTimer.current) window.clearTimeout(dustTimer.current);
    dustTimer.current = window.setTimeout(() => setDustBurst((burst) => (burst?.id === id ? null : burst)), 420);
  }, []);

  const triggerCollision = useCallback((edge: Collision["edge"]) => {
    const id = Date.now();
    collisionLockUntil.current = performance.now() + 840;
    keys.current.left = false;
    keys.current.right = false;
    velocityRef.current = 0;
    setTouchDirection(null);
    setIsMoving(false);
    setCollision({ id, edge });
    emitDust("stop");
    playWallCrash(spriteVariant);
    if (collisionTimer.current) window.clearTimeout(collisionTimer.current);
    if (recoveryTimer.current) window.clearTimeout(recoveryTimer.current);
    collisionTimer.current = window.setTimeout(() => {
      setCollision((current) => (current?.id === id ? null : current));
      setRecovery({ id, edge });
      recoveryTimer.current = window.setTimeout(() => setRecovery((current) => (current?.id === id ? null : current)), 320);
    }, 520);
  }, [emitDust, playWallCrash, spriteVariant]);

  const startTouchMove = useCallback((direction: TouchDirection) => {
    if (performance.now() < collisionLockUntil.current) return;
    const wasMoving = keys.current.left !== keys.current.right;
    keys.current.left = direction === "left";
    keys.current.right = direction === "right";
    if (!wasMoving) emitDust("start");
    setIsMoving(true);
    setTouchDirection(direction);
    playNavigate();
  }, [emitDust, playNavigate]);

  const endTouchMove = useCallback(() => {
    const wasMoving = keys.current.left !== keys.current.right;
    keys.current.left = false;
    keys.current.right = false;
    if (wasMoving) emitDust("stop");
    setTouchDirection(null);
  }, [emitDust]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => () => {
    if (dustTimer.current) window.clearTimeout(dustTimer.current);
    if (collisionTimer.current) window.clearTimeout(collisionTimer.current);
    if (recoveryTimer.current) window.clearTimeout(recoveryTimer.current);
  }, []);

  // Game loop: continuous movement + walk-cycle timing while a direction key is held
  useEffect(() => {
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const inputDirection = keys.current.left === keys.current.right ? 0 : keys.current.left ? -1 : 1;
      const targetVelocity = inputDirection * SPEED;
      const rate = inputDirection === 0 ? RUN_DECELERATION : RUN_ACCELERATION;
      const velocityDelta = targetVelocity - velocityRef.current;
      const velocityStep = Math.sign(velocityDelta) * Math.min(Math.abs(velocityDelta), rate * dt);
      velocityRef.current = Math.abs(velocityDelta) < 0.5 ? targetVelocity : velocityRef.current + velocityStep;
      const velocity = velocityRef.current;

      if (Math.abs(velocity) > 0.5) {
        const dir = velocity < 0 ? -1 : 1;
        const minX = 80;
        const maxX = levelWidth - 80;
        const nextX = charXRef.current + velocity * dt;
        const hasHitWall = nextX < minX || nextX > maxX;
        const boundedX = Math.min(Math.max(nextX, minX), maxX);
        charXRef.current = boundedX;
        setCharX(boundedX);
        if (hasHitWall && now >= collisionLockUntil.current) {
          triggerCollision(dir === -1 ? "left" : "right");
        }
        setFacing(dir === -1 ? "left" : "right");
        setIsMoving(Math.abs(velocity) > 18);
        if (now - lastFrameToggle.current > WALK_FRAME_MS) {
          setWalkFrame((f) => ((f + 1) % 4) as 0 | 1 | 2 | 3);
          lastFrameToggle.current = now;
        }
      } else {
        velocityRef.current = 0;
        setIsMoving(false);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [levelWidth, triggerCollision]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && performance.now() < collisionLockUntil.current) return;
      if (e.key === "ArrowLeft") {
        const wasMoving = keys.current.left !== keys.current.right;
        keys.current.left = true;
        if (!wasMoving && keys.current.left !== keys.current.right) emitDust("start");
        setIsMoving(true);
      }
      if (e.key === "ArrowLeft" && !e.repeat) playNavigate();
      if (e.key === "ArrowRight") {
        const wasMoving = keys.current.left !== keys.current.right;
        keys.current.right = true;
        if (!wasMoving && keys.current.left !== keys.current.right) emitDust("start");
        setIsMoving(true);
      }
      if (e.key === "ArrowRight" && !e.repeat) playNavigate();
      if (e.key === "ArrowDown") setCrouching(true);
      if (e.key === "ArrowUp" && !e.repeat) {
        triggerJumpOrSelect();
      }
      if ((e.key === "Enter" || e.key === " ") && activeItem) {
        e.preventDefault();
        triggerSelect();
      }
      if (e.key === "?") setShowHelp((v) => !v);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const wasMoving = keys.current.left !== keys.current.right;
        keys.current.left = false;
        if (wasMoving && keys.current.left === keys.current.right) emitDust("stop");
      }
      if (e.key === "ArrowRight") {
        const wasMoving = keys.current.left !== keys.current.right;
        keys.current.right = false;
        if (wasMoving && keys.current.left === keys.current.right) emitDust("stop");
      }
      if (e.key === "ArrowDown") setCrouching(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [activeItem, emitDust, playNavigate, triggerJumpOrSelect, triggerSelect]);

  const cameraX = Math.min(Math.max(charX - viewportWidth / 2, 0), Math.max(0, levelWidth - viewportWidth));
  const walking = isMoving && !jumping && !crouching && collision === null && recovery === null;
  const playerLabel = spriteVariant === "designer" ? "PLAYER 01" : "PLAYER 02";
  const archiveLabel = isCyan ? "DESIGN ARCHIVE" : "DANCE ARCHIVE";

  return (
    <section
      className={`relative h-full w-full overflow-hidden ${isCyan ? "bg-[#07111f]" : "bg-[#1a0503]"}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          backgroundImage: `url(${ARCHIVE_STAGES[spriteVariant]})`,
          backgroundPosition: `${-cameraX * 0.16}px bottom`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          filter: isCyan ? "saturate(1.08) contrast(1.08)" : "saturate(1.12) contrast(1.08)",
        }}
      />
      <div className={`pointer-events-none absolute inset-0 ${isCyan ? "bg-[linear-gradient(180deg,rgba(3,12,25,0.4),rgba(3,12,25,0.04)_45%,rgba(3,12,25,0.7))]" : "bg-[linear-gradient(180deg,rgba(30,5,3,0.42),rgba(64,11,4,0.04)_45%,rgba(30,5,3,0.72))]"}`} />
      <div className="pointer-events-none absolute inset-0 opacity-35 arcade-scanline" />

      <div className="absolute inset-x-4 top-4 z-30 flex flex-wrap items-center gap-2 md:inset-x-8 md:top-7 md:gap-3">
        <button
          type="button"
          onClick={onBack}
          className={`pixel-hud-panel shrink-0 skew-x-[-12deg] border-2 bg-[#05080de8] px-3 py-1.5 font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 md:px-4 md:text-xs ${isCyan ? "border-cyan-200/75 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-200/75 hover:bg-orange-300 hover:text-[#1b0603]"}`}
        >
          <span className="inline-block skew-x-[12deg]">&lt; {backLabel}</span>
        </button>
        <div className={`pixel-hud-panel shrink-0 border-2 px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] ${isCyan ? "border-cyan-200/80 bg-cyan-300/15 text-cyan-100" : "border-orange-200/80 bg-orange-300/15 text-orange-100"}`}>
          {playerLabel}
        </div>
        <div className="pixel-hud-panel border border-white/25 bg-[#05080de8] px-3 py-1.5 font-rajdhani text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/80 md:text-[0.65rem] md:tracking-[0.22em]">
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
          return (
            <Signpost
              key={item.id}
              item={item}
              x={itemPositions[i]}
              active={activeItem?.id === item.id}
              isCyan={isCyan}
              pressLabel={t("pressToSelect")}
              onSelect={(id) => { playConfirm(); onSelect(id); }}
              onHover={playHover}
            />
          );
        })}

        <div className="absolute bottom-[5.4rem] z-10 -translate-x-1/2 md:bottom-[4.1rem]" style={{ left: charX }}>
          {collision && (
            <span className={`pixel-wall-impact pixel-wall-impact-${collision.edge} pointer-events-none absolute bottom-16 z-20 h-24 w-20`} style={{ "--impact-color": isCyan ? "#37E7FF" : "#FF6B17" } as React.CSSProperties} aria-hidden="true"><i /><i /><i /></span>
          )}
          <PixelCharacter
            variant={spriteVariant}
            facing={facing}
            jumping={jumping}
            crouching={crouching}
            walking={walking}
            collision={collision}
            recovery={recovery}
            frame={walkFrame}
            dustBurst={dustBurst}
          />
        </div>
      </div>

      {/* Controls help */}
      <div className="absolute bottom-4 right-24 z-20 md:bottom-6 md:right-[6.5rem]">
        {showHelp && (
          <div
            className={`pixel-hud-panel mb-4 w-[min(28rem,calc(100vw-2rem))] border-4 bg-[#05080df0] p-6 font-rajdhani text-base text-white/80 ${
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
          className={`pixel-hud-panel grid h-10 w-10 place-items-center border-2 bg-[#05080de8] font-bebas text-2xl text-white transition-colors duration-200 ${
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
        onJump={triggerJumpOrSelect}
        onSelect={triggerSelect}
      />
    </section>
  );
}
