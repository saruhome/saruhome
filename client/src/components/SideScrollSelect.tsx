import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useGameAudio } from "../contexts/GameAudioContext";
import { ACHIEVEMENTS, useGameProgress } from "../contexts/GameProgressContext";
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
type AutoTarget = { id: string; x: number };
type ArchivePulse = "jump" | "land" | "crash" | null;

const ROLE_DIALOGUE = {
  designer: {
    Sokdak: "A living language needs room to move.",
    "Locaverse GmbH": "Space is part of every interaction.",
    "Smart Wash": "Small feedback makes technology feel human.",
    Campy: "Research is where the signal becomes clear.",
    "Seek and Sight": "Design should make every learner feel invited.",
    About: "The body notices what interfaces forget.",
    crash: "Ouch… still exploring the edge cases.",
  },
  dancer: {
    "Dance Performance": "Rhythm is everything here.",
    About: "Every stage begins with a first step!",
    crash: "Ouch! That wall has serious rhythm.",
  },
} as const;

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
      {active && <span className={`pixel-signpost-arrow absolute -top-9 font-bebas text-3xl ${isCyan ? "text-cyan-200" : "text-orange-200"}`} aria-hidden="true">▼</span>}
      <div
        className={`pixel-signpost-face whitespace-nowrap border-4 px-6 py-4 font-rajdhani text-base font-black uppercase tracking-[0.15em] transition-colors duration-200 ${active ? "pixel-signpost-nearby" : ""} ${
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

function AchievementRoleIcon({ role, unlocked }: { role: "designer" | "dancer"; unlocked: boolean }) {
  const tone = role === "designer" ? "text-cyan-200 border-cyan-300/70 bg-[#06101e]" : "text-orange-200 border-orange-300/70 bg-[#200806]";
  return (
    <span className={`relative grid h-9 w-9 shrink-0 overflow-hidden border-2 ${tone} ${unlocked ? "opacity-100" : "opacity-35 grayscale"}`} aria-hidden="true">
      {role === "designer" ? <>
        <i className="absolute left-1 top-1 h-2 w-2 bg-current" /><i className="absolute right-1 top-1 h-2 w-3 border border-current" />
        <i className="absolute bottom-1 left-1 h-3 w-4 border border-current" /><i className="absolute bottom-1 right-1 h-2 w-2 bg-current" />
        <i className="absolute left-4 top-3 h-4 w-px bg-current" /><i className="absolute left-3 top-5 h-px w-4 bg-current" />
      </> : <>
        <i className="absolute bottom-1 left-1 h-2 w-1 bg-current" /><i className="absolute bottom-1 left-3 h-4 w-1 bg-current" /><i className="absolute bottom-1 left-5 h-6 w-1 bg-current" /><i className="absolute bottom-1 left-7 h-3 w-1 bg-current" />
        <i className="absolute right-1 top-1 h-3 w-3 border-2 border-current" /><i className="absolute right-2 top-2 h-px w-1 bg-current" />
      </>}
    </span>
  );
}

export default function SideScrollSelect({
  items,
  onSelect,
  onQuickSelect,
  onBack,
  backLabel,
  accentColor,
  spriteVariant,
  eyebrow,
  title,
}: {
  items: SideScrollItem[];
  onSelect: (id: string) => void;
  onQuickSelect?: (id: string) => void;
  onBack: () => void;
  backLabel: string;
  accentColor: "cyan" | "orange";
  spriteVariant: "designer" | "dancer";
  eyebrow: string;
  title: string;
}) {
  const { t } = useLanguage();
  const { playConfirm, playFootstep, playHover, playJump, playLand, playNavigate, playUnlock, playWallCrash } = useGameAudio();
  const { clearLatestAchievement, collectItem, latestAchievement, markDoubleJump, markProjectExplored, markSignpostVisited, progress } = useGameProgress();
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
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [archivePulse, setArchivePulse] = useState<ArchivePulse>(null);
  const [unlockBanner, setUnlockBanner] = useState<{ id: number; label: string } | null>(null);
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));

  const keys = useRef({ left: false, right: false });
  const charXRef = useRef(START_X);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastFrameToggle = useRef(0);
  const dustTimer = useRef<number | undefined>(undefined);
  const collisionTimer = useRef<number | undefined>(undefined);
  const recoveryTimer = useRef<number | undefined>(undefined);
  const autoSelectTimer = useRef<number | undefined>(undefined);
  const autoTargetRef = useRef<AutoTarget | null>(null);
  const collisionLockUntil = useRef(0);
  const lastJumpPress = useRef(0);
  const activeItemRef = useRef<string | null>(null);
  const pulseTimer = useRef<number | undefined>(undefined);
  const unlockTimer = useRef<number | undefined>(undefined);
  const secretPlatformReached = useRef(false);

  const itemPositions = useMemo(() => items.map((_, i) => START_X + i * ITEM_SPACING), [items]);
  const levelWidth = START_X + Math.max(0, items.length - 1) * ITEM_SPACING + END_PADDING;
  const hiddenCollectibles = useMemo(() => [
    { id: `${spriteVariant}-star-signal`, x: Math.min(levelWidth - 120, (itemPositions[0] ?? START_X) + 210), bottom: "27rem", glyph: "✦", label: "Hidden star signal" },
    { id: `${spriteVariant}-key-node`, x: Math.min(levelWidth - 120, (itemPositions[Math.min(2, itemPositions.length - 1)] ?? START_X) + 150), bottom: "31rem", glyph: "◆", label: "Hidden access key" },
    { id: `${spriteVariant}-badge-node`, x: Math.min(levelWidth - 120, (itemPositions[itemPositions.length - 1] ?? START_X) + 120), bottom: "24rem", glyph: "▣", label: "Hidden explorer badge" },
  ], [itemPositions, levelWidth, spriteVariant]);
  const secretPlatform = useMemo(() => ({
    id: `${spriteVariant}-sky-platform`,
    x: Math.min(levelWidth - 180, (itemPositions[Math.min(1, itemPositions.length - 1)] ?? START_X) + 145),
  }), [itemPositions, levelWidth, spriteVariant]);

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
    setArchivePulse("jump");
    playJump();
    if (!secretPlatformReached.current && Math.abs(charXRef.current - secretPlatform.x) < 118) {
      secretPlatformReached.current = true;
      window.setTimeout(() => collectItem(secretPlatform.id), Math.round(JUMP_MS * 0.5));
    }
    window.setTimeout(() => {
      setJumping(false);
      setArchivePulse("land");
      playLand(spriteVariant);
    }, JUMP_MS);
  }, [collectItem, jumping, playJump, playLand, secretPlatform, spriteVariant]);

  const emitDust = useCallback((phase: DustBurst["phase"]) => {
    const id = Date.now();
    setDustBurst({ id, phase });
    if (dustTimer.current) window.clearTimeout(dustTimer.current);
    dustTimer.current = window.setTimeout(() => setDustBurst((burst) => (burst?.id === id ? null : burst)), 420);
  }, []);

  const completeAutoEntry = useCallback((id: string) => {
    autoTargetRef.current = null;
    velocityRef.current = 0;
    setIsMoving(false);
    emitDust("stop");
    playConfirm();
    playUnlock(spriteVariant);
    markProjectExplored(spriteVariant, id);
    setUnlockBanner({ id: Date.now(), label: id === "about" || id === "bio" ? "ARCHIVE NODE UNLOCKED" : "PROJECT UNLOCKED" });
    if (autoSelectTimer.current) window.clearTimeout(autoSelectTimer.current);
    if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => setUnlockBanner(null), 650);
    autoSelectTimer.current = window.setTimeout(() => onSelect(id), 760);
  }, [emitDust, markProjectExplored, onSelect, playConfirm, playUnlock, spriteVariant]);

  const queueProjectEntry = useCallback((id: string) => {
    const index = items.findIndex((item) => item.id === id);
    if (index < 0 || performance.now() < collisionLockUntil.current) return;
    const targetX = itemPositions[index];
    keys.current.left = false;
    keys.current.right = false;
    autoTargetRef.current = { id, x: targetX };
    setFacing(targetX < charXRef.current ? "left" : "right");
    setIsMoving(true);
    emitDust("start");
    playNavigate();
  }, [emitDust, itemPositions, items, playNavigate]);

  const triggerSelect = useCallback(() => {
    if (!activeItem) return;
    queueProjectEntry(activeItem.id);
  }, [activeItem, queueProjectEntry]);

  const selectFromQuickMenu = useCallback((id: string) => {
    setShowQuickMenu(false);
    (onQuickSelect ?? onSelect)(id);
  }, [onQuickSelect, onSelect]);

  const triggerJumpOrSelect = useCallback(() => {
    const now = performance.now();
    const isDoubleJump = now - lastJumpPress.current <= DOUBLE_JUMP_MS;
    lastJumpPress.current = isDoubleJump ? 0 : now;

    if (isDoubleJump && activeItem) {
      markDoubleJump();
      triggerSelect();
      return;
    }

    triggerJump();
  }, [activeItem, markDoubleJump, triggerJump, triggerSelect]);

  const triggerCollision = useCallback((edge: Collision["edge"]) => {
    const id = Date.now();
    collisionLockUntil.current = performance.now() + 840;
    keys.current.left = false;
    keys.current.right = false;
    velocityRef.current = 0;
    setIsMoving(false);
    setCollision({ id, edge });
    setArchivePulse("crash");
    setDialogue(ROLE_DIALOGUE[spriteVariant].crash);
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

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => () => {
    if (dustTimer.current) window.clearTimeout(dustTimer.current);
    if (collisionTimer.current) window.clearTimeout(collisionTimer.current);
    if (recoveryTimer.current) window.clearTimeout(recoveryTimer.current);
    if (autoSelectTimer.current) window.clearTimeout(autoSelectTimer.current);
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
  }, []);

  useEffect(() => {
    if (!archivePulse) return;
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    pulseTimer.current = window.setTimeout(() => setArchivePulse(null), archivePulse === "crash" ? 260 : 150);
    return () => { if (pulseTimer.current) window.clearTimeout(pulseTimer.current); };
  }, [archivePulse]);

  useEffect(() => {
    const currentId = activeItem?.id ?? null;
    if (!currentId || currentId === activeItemRef.current) return;
    activeItemRef.current = currentId;
    markSignpostVisited(spriteVariant, currentId, items.length);
    const dialogueMap = ROLE_DIALOGUE[spriteVariant] as Record<string, string>;
    const activeLabel = activeItem?.label ?? "";
    setDialogue(dialogueMap[activeLabel] ?? (spriteVariant === "designer" ? "A new interaction signal is close." : "New move, new story — let’s go!"));
  }, [activeItem, items.length, markSignpostVisited, spriteVariant]);

  // Game loop: continuous movement + walk-cycle timing while a direction key is held
  useEffect(() => {
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const queuedTarget = autoTargetRef.current;
      if (queuedTarget && Math.abs(queuedTarget.x - charXRef.current) <= 4) {
        charXRef.current = queuedTarget.x;
        setCharX(queuedTarget.x);
        completeAutoEntry(queuedTarget.id);
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const inputDirection = queuedTarget
        ? queuedTarget.x < charXRef.current ? -1 : 1
        : keys.current.left === keys.current.right ? 0 : keys.current.left ? -1 : 1;
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
          playFootstep(spriteVariant);
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
  }, [completeAutoEntry, levelWidth, playFootstep, spriteVariant, triggerCollision]);

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
      className={`archive-world-pulse-${archivePulse ?? "idle"} relative h-full w-full overflow-hidden ${isCyan ? "bg-[#07111f]" : "bg-[#1a0503]"}`}
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
      <div className="pixel-ambient-dust pointer-events-none absolute inset-0 z-[3]" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className={`pixel-distant-runner pointer-events-none absolute bottom-[16rem] z-[4] h-3 w-7 ${isCyan ? "bg-cyan-300/45" : "bg-orange-300/45"}`} aria-hidden="true" />

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
        <div className={`pixel-hud-panel hidden border px-3 py-1.5 font-rajdhani text-[0.6rem] font-black uppercase tracking-[0.14em] sm:block ${isCyan ? "border-cyan-300/55 text-cyan-100" : "border-orange-300/55 text-orange-100"}`}>
          <span className="text-white/60">PROJECTS EXPLORED </span>{progress.exploredByRole[spriteVariant].length}/{items.length}
          <span className="mx-2 inline-block h-1.5 w-12 border border-current align-middle"><i className="block h-full bg-current" style={{ width: `${Math.round((progress.exploredByRole[spriteVariant].length / items.length) * 100)}%` }} /></span>
          <span className="mx-2 text-white/25">|</span>✦ {Math.min(progress.collected.length, 3)}/3
        </div>
        <button
          type="button"
          onClick={() => setShowAchievements((open) => !open)}
          aria-expanded={showAchievements}
          aria-controls="archive-achievements"
          className={`pixel-hud-panel border-2 bg-[#05080de8] px-3 py-1.5 font-bebas text-lg leading-none transition-colors ${isCyan ? "border-cyan-300/70 text-cyan-100 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-300/70 text-orange-100 hover:bg-orange-300 hover:text-[#1b0603]"}`}
        >
          ★ {progress.unlockedAchievements.length}/5
        </button>
        <button
          type="button"
          onClick={() => setShowQuickMenu((open) => !open)}
          aria-expanded={showQuickMenu}
          aria-controls="archive-quick-menu"
          className={`pixel-hud-panel ml-auto border-2 bg-[#05080de8] px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.16em] text-white transition-colors ${isCyan ? "border-cyan-300/70 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-300/70 hover:bg-orange-300 hover:text-[#1b0603]"}`}
        >
          {t("skipToProjects")}
        </button>
      </div>

      {showQuickMenu && (
        <aside id="archive-quick-menu" className={`absolute right-4 top-[5.25rem] z-40 w-[min(21rem,calc(100vw-2rem))] border-4 bg-[#05080df5] p-3 shadow-[6px_6px_0_rgba(0,0,0,0.65)] md:right-8 md:top-[5.85rem] ${isCyan ? "border-cyan-300/70" : "border-orange-300/70"}`} aria-label={t("quickMenu")}>
          <div className="mb-3 flex items-center justify-between border-b border-white/20 pb-2">
            <p className={`font-rajdhani text-xs font-black uppercase tracking-[0.22em] ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>{t("quickMenu")}</p>
            <span className="font-rajdhani text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/50">DIRECT ACCESS</span>
          </div>
          <div className="grid gap-2">
            {items.map((item, index) => (
              <button key={item.id} type="button" onClick={() => selectFromQuickMenu(item.id)} className={`flex items-center gap-3 border p-3 text-left transition-colors ${isCyan ? "border-cyan-300/35 hover:border-cyan-200 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-300/35 hover:border-orange-200 hover:bg-orange-300 hover:text-[#1b0603]"}`}>
                <span className="font-bebas text-xl">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-rajdhani text-sm font-black uppercase tracking-[0.12em]">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>
      )}

      {showAchievements && (
        <aside id="archive-achievements" className={`absolute left-4 top-[5.25rem] z-40 w-[min(22rem,calc(100vw-2rem))] border-4 bg-[#05080df5] p-3 shadow-[6px_6px_0_rgba(0,0,0,0.65)] md:left-8 md:top-[5.85rem] ${isCyan ? "border-cyan-300/70" : "border-orange-300/70"}`}>
          <div className="mb-3 flex items-center gap-2 border-b border-white/20 pb-2"><AchievementRoleIcon role={spriteVariant} unlocked /><div className="min-w-0 flex-1"><p className={`font-rajdhani text-xs font-black uppercase tracking-[0.22em] ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>{spriteVariant === "designer" ? "DESIGNER BADGES" : "DANCER BADGES"}</p><span className="font-rajdhani text-[0.6rem] font-bold text-white/50">{progress.unlockedAchievements.length}/5 UNLOCKED</span></div></div>
          <div className="grid gap-2">{Object.values(ACHIEVEMENTS).map((achievement) => {
            const unlocked = progress.unlockedAchievements.includes(achievement.id);
            return <div key={achievement.id} className={`flex gap-2 border p-2.5 ${unlocked ? (isCyan ? "border-cyan-300/55 text-cyan-100" : "border-orange-300/55 text-orange-100") : "border-white/15 text-white/30"}`}><AchievementRoleIcon role={spriteVariant} unlocked={unlocked} /><div className="min-w-0"><p className="font-rajdhani text-xs font-black tracking-[0.16em]">{unlocked ? "★" : "◇"} {achievement.title}</p><p className="mt-1 font-rajdhani text-xs leading-snug text-white/60">{achievement.detail}</p></div></div>;
          })}</div>
        </aside>
      )}

      {unlockBanner && (
        <div key={unlockBanner.id} className={`pixel-unlock-banner pointer-events-none absolute left-1/2 top-[22%] z-50 w-[min(31rem,calc(100vw-2rem))] -translate-x-1/2 border-4 bg-[#05080df0] p-4 text-center ${isCyan ? "border-cyan-200 text-cyan-100" : "border-orange-200 text-orange-100"}`}>
          <p className="font-rajdhani text-xs font-black uppercase tracking-[0.42em]">LEVEL CLEAR</p>
          <p className="mt-1 font-bebas text-4xl tracking-[0.1em] text-white">{unlockBanner.label}</p>
          <p className="mt-1 font-rajdhani text-[0.65rem] font-bold uppercase tracking-[0.22em]">ACCESSING CASE STUDY…</p>
        </div>
      )}
      {latestAchievement && (
        <button type="button" onClick={clearLatestAchievement} className={`pixel-achievement-toast absolute left-1/2 top-[5.6rem] z-50 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 border-2 bg-[#05080df3] p-3 text-left ${isCyan ? "border-cyan-300 text-cyan-100" : "border-orange-300 text-orange-100"}`}>
          <span className="font-bebas text-2xl">★ {latestAchievement.title}</span><span className="mt-1 block font-rajdhani text-xs text-white/75">{latestAchievement.detail}</span>
        </button>
      )}

      <div className="relative z-10 px-4 pt-28 text-center md:px-8 md:pt-28">
        <p className={`font-rajdhani text-xs font-black uppercase tracking-[0.42em] md:text-sm ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
          {eyebrow}
        </p>
        <h1 className="mt-2 skew-x-[-8deg] font-bebas text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
          {title}
        </h1>
      </div>

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
              onSelect={queueProjectEntry}
              onHover={playHover}
            />
          );
        })}

        {hiddenCollectibles.map((collectible) => !progress.collected.includes(collectible.id) && (
          <button
            key={collectible.id}
            type="button"
            aria-label={collectible.label}
            title={collectible.label}
            onClick={() => collectItem(collectible.id)}
            className={`pixel-collectible absolute z-20 -translate-x-1/2 font-bebas text-3xl ${isCyan ? "text-cyan-200" : "text-orange-200"}`}
            style={{ left: collectible.x, bottom: collectible.bottom }}
          >
            {collectible.glyph}
          </button>
        ))}

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
          {dialogue && activeItem && !isMoving && !collision && (
            <span className="pixel-dialogue pointer-events-none absolute bottom-[calc(100%-2rem)] left-1/2 z-30 w-[min(14rem,calc(100vw-2rem))] -translate-x-1/2 bg-white p-2.5 text-center font-rajdhani text-xs font-bold leading-snug text-[#101010]">“{dialogue}”</span>
          )}
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

    </section>
  );
}
