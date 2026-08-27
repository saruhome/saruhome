import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { useGameAudio } from "../contexts/GameAudioContext";
import { ACHIEVEMENTS, useGameProgress } from "../contexts/GameProgressContext";
import { useReducedMotion } from "../contexts/MotionContext";
import { assetUrl } from "../lib/assetUrl";
import { UtilityMenuBar } from "./UtilityMenuBar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

/**
 * Side-scroll "run to select" screen.
 * Arrow keys run/jump/crouch a 2-head-tall pixel character past a row of
 * signposts (projects / menu items); Enter or a click selects the nearest one.
 * The Quick Menu uses the same bright project evidence as the case studies for fast visual recognition.
 */

const ITEM_SPACING = 380;
// Each Archive opens with the first project, the character, and their dialogue anchored on the viewport centre.
// The world then scrolls outward from that centred starting point as the player explores.
const getCenteredStartX = (viewportWidth: number) => Math.max(160, Math.round(viewportWidth / 2));
const END_PADDING = 300;
const SELECT_RADIUS = 140;
const SPEED = 260; // px/sec
const RUN_ACCELERATION = 1180; // px/sec²
const RUN_DECELERATION = 1480; // px/sec²
const WALK_FRAME_MS = 130;
const JUMP_MS = 380;
const DOUBLE_JUMP_MS = 320;

const CHIBI_SPRITE_SHEET = {
  designer: "/optimized/designer-chibi-sprite-sheet.webp",
  dancer: "/optimized/dancer-chibi-sprite-sheet.webp",
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

const CHIBI_HURT_FALL = {
  designer: "/generated/designer-hurt-fall.png",
  dancer: "/generated/dancer-hurt-fall.png",
} as const;

const spritePosition = {
  idle: "0% 0%",
  walk: "100% 0%",
  jump: "0% 100%",
  crouch: "0% 100%",
} as const;

const ARCHIVE_STAGES = {
  designer: "/optimized/designer-archive-stage.webp",
  dancer: "/optimized/dancer-archive-stage.webp",
} as const;

const DESIGNER_PROJECT_THUMBNAILS: Record<string, string> = {
  "01": "/manus-storage/sokdak-hero_b6371c09.jpg",
  "02": "/manus-storage/locaverse-hero_c8fb863c.jpg",
  "03": "/manus-storage/smartwash-hero_89808175.jpg",
  "04": "/manus-storage/campy-exhibit_176bde4a.png",
  "05": "/manus-storage/seekandsight-hifi_b9005159.jpg",
};

export type SideScrollItem = { id: string; label: string; sublabel?: string };
type DustBurst = { id: number; phase: "start" | "stop" };
type Collision = { id: number; edge: "left" | "right" };
type Recovery = { id: number; edge: "left" | "right" };
type AutoTarget = { id: string; x: number };
type ArchivePulse = "jump" | "land" | "crash" | null;

const ROLE_DIALOGUE: Record<"designer" | "dancer", Record<string, Record<Language, string>>> = {
  designer: {
    "01": { en: "A living language needs room to move.", kr: "살아 있는 언어에는 움직일 공간이 필요해요.", de: "Eine lebendige Sprache braucht Raum, um sich zu bewegen." },
    "02": { en: "Space is part of every interaction.", kr: "공간도 모든 인터랙션의 일부예요.", de: "Raum ist Teil jeder Interaktion." },
    "03": { en: "Small feedback makes technology feel human.", kr: "작은 피드백이 기술을 더 인간적으로 만들어요.", de: "Kleines Feedback macht Technologie menschlicher." },
    "04": { en: "Research is where the signal becomes clear.", kr: "리서치에서 신호가 선명해져요.", de: "In der Forschung wird das Signal klar." },
    "05": { en: "Design should make every learner feel invited.", kr: "디자인은 모든 학습자를 환영해야 해요.", de: "Design sollte jeden Lernenden willkommen heißen." },
    about: { en: "The body notices what interfaces forget.", kr: "몸은 인터페이스가 놓치는 것을 알아차려요.", de: "Der Körper bemerkt, was Interfaces vergessen." },
    crash: { en: "Ouch… still exploring the edge cases.", kr: "앗… 경계 조건도 계속 탐색 중이에요.", de: "Autsch … ich erkunde noch die Grenzfälle." },
  },
  dancer: {
    gallery: { en: "Rhythm is everything here.", kr: "여기서는 리듬이 전부예요.", de: "Hier ist Rhythmus alles." },
    bio: { en: "Every stage begins with a first step!", kr: "모든 무대는 첫걸음에서 시작돼요!", de: "Jede Bühne beginnt mit einem ersten Schritt!" },
    crash: { en: "Ouch! That wall has serious rhythm.", kr: "앗! 저 벽에도 강한 리듬이 있네요.", de: "Autsch! Diese Wand hat einen ernsten Rhythmus." },
  },
};

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
          src={CHIBI_HURT_FALL[variant]}
          alt=""
          draggable={false}
          className="pixel-hurt-fall absolute inset-x-0 bottom-2 h-[92%] w-full origin-bottom object-contain [image-rendering:pixelated] [image-rendering:crisp-edges]"
          style={{ "--hurt-facing": shouldMirrorFall ? -1 : 1 } as React.CSSProperties}
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
      className="pixel-signpost-card archive-signpost-lane absolute bottom-80 z-40 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-[clamp(22.5rem,38vh,30rem)]"
    >
      {active && <span className={`pixel-signpost-arrow absolute -top-9 font-bebas text-3xl ${isCyan ? "text-cyan-200" : "text-orange-200"}`} aria-hidden="true">▼</span>}
      <div
        className={`pixel-signpost-face pixel-signpost-project-face relative whitespace-nowrap border-4 px-6 py-4 font-rajdhani text-base font-black uppercase tracking-[0.15em] transition-all duration-200 ${active ? "pixel-signpost-nearby" : ""} ${
          active
            ? isCyan
              ? "border-cyan-200 bg-cyan-300 text-[#06101e]"
              : "border-orange-200 bg-orange-300 text-[#1b0603]"
            : isCyan
              ? "border-cyan-200/90 bg-[#020813]/90 text-white"
              : "border-orange-200/90 bg-[#130403]/90 text-white"
        }`}
      >
        <span className={`pixel-signpost-status mr-2 inline-block h-2 w-2 align-middle ${isCyan ? "bg-cyan-200" : "bg-orange-200"}`} aria-hidden="true" />
        {item.label}
      </div>
      {item.sublabel && (
        <span className={`pixel-signpost-meta border-x-2 bg-black/65 px-2 py-0.5 font-rajdhani text-[0.72rem] font-black uppercase tracking-[0.18em] text-white/90 ${isCyan ? "border-cyan-200/65" : "border-orange-200/65"}`}>
          {item.sublabel}
        </span>
      )}
      {active && (
        <span className={`pixel-signpost-action absolute bottom-[calc(100%+0.65rem)] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap border-2 bg-black/90 px-2 py-1 font-rajdhani text-[0.82rem] font-black uppercase tracking-[0.2em] ${isCyan ? "border-cyan-200 text-cyan-100" : "border-orange-200 text-orange-100"}`}>
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
  const { t, language } = useLanguage();
  const { muted, toggleMuted, playConfirm, playFootstep, playHover, playJump, playLand, playNavigate, playUnlock, playWallCrash } = useGameAudio();
  const { clearLatestAchievement, collectItem, latestAchievement, markDoubleJump, markProjectExplored, markSignpostVisited, progress } = useGameProgress();
  const { reducedMotion, setReducedMotion } = useReducedMotion();
  const isCyan = accentColor === "cyan";

  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));
  const [spawnX, setSpawnX] = useState(() => getCenteredStartX(typeof window !== "undefined" ? window.innerWidth : 1024));
  // Spawn on the first project signpost's centre, aligned with the viewport centre rather than the former left HUD guide.
  const [charX, setCharX] = useState(() => spawnX);
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
  const keys = useRef({ left: false, right: false });
  const charXRef = useRef(spawnX);
  const spawnXRef = useRef(spawnX);
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

  const itemPositions = useMemo(() => items.map((_, i) => spawnX + i * ITEM_SPACING), [items, spawnX]);
  const levelWidth = spawnX + Math.max(0, items.length - 1) * ITEM_SPACING + END_PADDING;
  const hiddenCollectibles = useMemo(() => [
    { id: `${spriteVariant}-star-signal`, x: Math.min(levelWidth - 120, (itemPositions[0] ?? spawnX) + 210), bottom: "27rem", glyph: "✦", label: "Hidden star signal" },
    { id: `${spriteVariant}-key-node`, x: Math.min(levelWidth - 120, (itemPositions[Math.min(2, itemPositions.length - 1)] ?? spawnX) + 150), bottom: "31rem", glyph: "◆", label: "Hidden access key" },
    { id: `${spriteVariant}-badge-node`, x: Math.min(levelWidth - 120, (itemPositions[itemPositions.length - 1] ?? spawnX) + 120), bottom: "24rem", glyph: "▣", label: "Hidden explorer badge" },
  ], [itemPositions, levelWidth, spawnX, spriteVariant]);
  const secretPlatform = useMemo(() => ({
    id: `${spriteVariant}-sky-platform`,
    x: Math.min(levelWidth - 180, (itemPositions[Math.min(1, itemPositions.length - 1)] ?? spawnX) + 145),
  }), [itemPositions, levelWidth, spawnX, spriteVariant]);

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
    if (reducedMotion) {
      charXRef.current = targetX;
      setCharX(targetX);
      completeAutoEntry(id);
      return;
    }
    autoTargetRef.current = { id, x: targetX };
    setFacing(targetX < charXRef.current ? "left" : "right");
    setIsMoving(true);
    emitDust("start");
    playNavigate();
  }, [completeAutoEntry, emitDust, itemPositions, items, playNavigate, reducedMotion]);

  const triggerSelect = useCallback(() => {
    if (!activeItem) return;
    queueProjectEntry(activeItem.id);
  }, [activeItem, queueProjectEntry]);

  const beginTouchMove = useCallback((direction: "left" | "right") => {
    if (performance.now() < collisionLockUntil.current) return;
    const wasMoving = keys.current.left !== keys.current.right;
    keys.current.left = direction === "left";
    keys.current.right = direction === "right";
    setFacing(direction);
    setIsMoving(true);
    if (!wasMoving) emitDust("start");
    playNavigate();
  }, [emitDust, playNavigate]);

  const endTouchMove = useCallback(() => {
    const wasMoving = keys.current.left !== keys.current.right;
    keys.current.left = false;
    keys.current.right = false;
    if (wasMoving) emitDust("stop");
  }, [emitDust]);

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
    setDialogue(ROLE_DIALOGUE[spriteVariant].crash[language]);
    emitDust("stop");
    playWallCrash(spriteVariant);
    if (collisionTimer.current) window.clearTimeout(collisionTimer.current);
    if (recoveryTimer.current) window.clearTimeout(recoveryTimer.current);
    collisionTimer.current = window.setTimeout(() => {
      setCollision((current) => (current?.id === id ? null : current));
      setRecovery({ id, edge });
      recoveryTimer.current = window.setTimeout(() => setRecovery((current) => (current?.id === id ? null : current)), 320);
    }, 520);
  }, [emitDust, language, playWallCrash, spriteVariant]);

  useEffect(() => {
    const onResize = () => {
      const nextViewportWidth = window.innerWidth;
      setViewportWidth(nextViewportWidth);
      // Preserve the centred opening composition after orientation changes until the player begins exploring.
      if (!isMoving && Math.abs(charXRef.current - spawnXRef.current) < 2) {
        const nextSpawnX = getCenteredStartX(nextViewportWidth);
        spawnXRef.current = nextSpawnX;
        setSpawnX(nextSpawnX);
        charXRef.current = nextSpawnX;
        setCharX(nextSpawnX);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isMoving]);

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
    const dialogueMap = ROLE_DIALOGUE[spriteVariant];
    const fallback = spriteVariant === "designer"
      ? { en: "A new interaction signal is close.", kr: "새로운 인터랙션 신호가 가까이 있어요.", de: "Ein neues Interaktionssignal ist ganz nah." }
      : { en: "New move, new story — let’s go!", kr: "새로운 움직임, 새로운 이야기 — 가볼까요!", de: "Neue Bewegung, neue Geschichte — los geht’s!" };
    setDialogue((dialogueMap[currentId] ?? fallback)[language]);
  }, [activeItem, items.length, language, markSignpostVisited, spriteVariant]);

  // Run the animation frame loop only while the character has manual or queued movement.
  // Keeping it stopped while idle avoids a full React tree update on every display frame.
  useEffect(() => {
    if (!isMoving) return;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const queuedTarget = autoTargetRef.current;
      if (queuedTarget && Math.abs(queuedTarget.x - charXRef.current) <= 4) {
        charXRef.current = queuedTarget.x;
        setCharX(queuedTarget.x);
        completeAutoEntry(queuedTarget.id);
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
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [completeAutoEntry, isMoving, levelWidth, playFootstep, spriteVariant, triggerCollision]);

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
      if (e.key === "Escape") {
        setShowHelp(false);
        setShowQuickMenu(false);
        setShowAchievements(false);
      }
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
        }}
      />
      <div className={`pointer-events-none absolute inset-0 ${isCyan ? "bg-[linear-gradient(180deg,rgba(3,12,25,0.4),rgba(3,12,25,0.04)_45%,rgba(3,12,25,0.7))]" : "bg-[linear-gradient(180deg,rgba(30,5,3,0.42),rgba(64,11,4,0.04)_45%,rgba(30,5,3,0.72))]"}`} />
      <div className="pointer-events-none absolute inset-0 opacity-35 arcade-scanline" />
      <div className="pixel-ambient-dust pointer-events-none absolute inset-0 z-[3]" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className={`pixel-distant-runner pointer-events-none absolute bottom-[16rem] z-[4] h-3 w-7 ${isCyan ? "bg-cyan-300/45" : "bg-orange-300/45"}`} aria-hidden="true" />

      <div className="archive-hud absolute inset-x-4 top-4 z-60 flex flex-wrap items-center gap-2 md:inset-x-8 md:top-7 md:gap-3 2xl:inset-x-12 2xl:top-8 2xl:gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={onBack}
              title={t("returnToSelectHint")}
              className={`archive-back archive-hud-control pixel-hud-panel inline-flex shrink-0 items-center justify-center border-2 bg-[#05080de8] px-3 py-1.5 text-center font-rajdhani text-[0.65rem] font-black uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-125 focus-visible:-translate-y-0.5 md:px-4 md:text-xs ${isCyan ? "border-cyan-200/75 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-200/75 hover:bg-orange-300 hover:text-[#1b0603]"}`}
            >
              <span>&lt; {backLabel}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8} className={`archive-hud-tooltip !z-[80] border-2 rounded-none bg-[#05080df5] px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.13em] text-white shadow-[4px_4px_0_rgba(0,0,0,0.65)] ${isCyan ? "border-cyan-300/70" : "border-orange-300/70"}`}>
            {t("returnToSelectHint")}
          </TooltipContent>
        </Tooltip>
        <div className={`archive-player archive-hud-control pixel-hud-panel inline-flex shrink-0 items-center justify-center border-2 px-3 py-1.5 font-rajdhani text-[0.62rem] font-black uppercase tracking-[0.2em] ${isCyan ? "border-cyan-200/80 bg-cyan-300/15 text-cyan-100" : "border-orange-200/80 bg-orange-300/15 text-orange-100"}`}>
          {playerLabel}
        </div>
        <div className="archive-label archive-hud-control pixel-hud-panel inline-flex items-center justify-center border border-white/25 bg-[#05080de8] px-3 py-1.5 font-rajdhani text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/80 md:text-[0.65rem] md:tracking-[0.22em]">
          {archiveLabel}
        </div>
        <div className="archive-hud-control pixel-hud-panel hidden items-center border border-white/25 bg-[#05080de8] px-3 py-1.5 font-rajdhani text-[0.58rem] font-black uppercase tracking-[0.14em] text-white/75 xl:flex">
          ← → MOVE <span className="mx-1.5 text-white/30">//</span> ↑ JUMP <span className="mx-1.5 text-white/30">//</span> ENTER SELECT
        </div>
        <div className={`archive-progress-desktop archive-hud-control pixel-hud-panel hidden items-center border px-3 py-1.5 font-rajdhani text-[0.6rem] font-black uppercase tracking-[0.14em] sm:flex ${isCyan ? "border-cyan-300/55 text-cyan-100" : "border-orange-300/55 text-orange-100"}`}>
          <span className="text-white/60">{t("projectsExplored").toUpperCase()} </span>{progress.exploredByRole[spriteVariant].length}/{items.length}
          <span className="mx-2 inline-block h-1.5 w-12 border border-current align-middle"><i className="block h-full bg-current" style={{ width: `${Math.round((progress.exploredByRole[spriteVariant].length / items.length) * 100)}%` }} /></span>
          <span className="mx-2 text-white/25">|</span>✦ {Math.min(progress.collected.length, 3)}/3
        </div>
        <div className={`archive-progress-mobile archive-hud-control pixel-hud-panel border px-2 py-1 font-rajdhani text-[0.55rem] font-black uppercase tracking-[0.12em] md:hidden ${isCyan ? "border-cyan-300/55 text-cyan-100" : "border-orange-300/55 text-orange-100"}`}>
          {progress.exploredByRole[spriteVariant].length}/{items.length} {t("projectsExplored")}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => setShowAchievements((open) => !open)}
              aria-expanded={showAchievements}
              aria-controls="archive-achievements"
              title={t("rewardsHint")}
              className={`archive-achievement archive-hud-control pixel-hud-panel inline-flex items-center justify-center border-2 bg-[#05080de8] px-3 py-1.5 font-bebas text-lg leading-none transition-colors hover:brightness-125 focus-visible:-translate-y-0.5 ${isCyan ? "border-cyan-300/70 text-cyan-100 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-300/70 text-orange-100 hover:bg-orange-300 hover:text-[#1b0603]"}`}
            >
              ★ {progress.unlockedAchievements.length}/5
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8} className={`archive-hud-tooltip !z-[80] border-2 rounded-none bg-[#05080df5] px-3 py-2 font-rajdhani text-xs font-black uppercase tracking-[0.13em] text-white shadow-[4px_4px_0_rgba(0,0,0,0.65)] ${isCyan ? "border-cyan-300/70" : "border-orange-300/70"}`}>
            {t("rewardsHint")}
          </TooltipContent>
        </Tooltip>
      </div>

      {showAchievements && (
        <aside id="archive-achievements" className={`archive-achievement-panel absolute left-4 top-[5.25rem] z-40 w-[min(22rem,calc(100vw-2rem))] border-4 bg-[#05080df5] p-3 shadow-[6px_6px_0_rgba(0,0,0,0.65)] md:left-8 md:top-[5.85rem] ${isCyan ? "border-cyan-300/70" : "border-orange-300/70"}`}>
          <div className="mb-3 flex items-center gap-2 border-b border-white/20 pb-2"><AchievementRoleIcon role={spriteVariant} unlocked /><div className="min-w-0 flex-1"><p className={`font-rajdhani text-xs font-black uppercase tracking-[0.22em] ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>{spriteVariant === "designer" ? "DESIGNER BADGES" : "DANCER BADGES"}</p><span className="font-rajdhani text-[0.6rem] font-bold text-white/50">{progress.unlockedAchievements.length}/5 UNLOCKED</span></div></div>
          <div className="grid gap-2">{Object.values(ACHIEVEMENTS).map((achievement) => {
            const unlocked = progress.unlockedAchievements.includes(achievement.id);
            return <div key={achievement.id} className={`flex gap-2 border p-2.5 ${unlocked ? (isCyan ? "border-cyan-300/55 text-cyan-100" : "border-orange-300/55 text-orange-100") : "border-white/15 text-white/30"}`}><AchievementRoleIcon role={spriteVariant} unlocked={unlocked} /><div className="min-w-0"><p className="font-rajdhani text-xs font-black tracking-[0.16em]">{unlocked ? "★" : "◇"} {achievement.title}</p><p className="mt-1 font-rajdhani text-xs leading-snug text-white/60">{achievement.detail}</p></div></div>;
          })}</div>
        </aside>
      )}

      {unlockBanner && createPortal(
        <div key={unlockBanner.id} className="pointer-events-none fixed inset-0 z-[110] grid place-items-center p-4" aria-live="polite" aria-atomic="true">
          <div className={`pixel-unlock-banner w-[min(62rem,calc(100vw-2rem))] border-4 bg-[#05080df0] p-6 text-center sm:p-8 ${isCyan ? "border-cyan-200 text-cyan-100" : "border-orange-200 text-orange-100"}`}>
            <p className="font-rajdhani text-sm font-black uppercase tracking-[0.42em] sm:text-base">LEVEL CLEAR</p>
            <p className="mt-2 font-bebas text-5xl tracking-[0.1em] text-white sm:text-6xl">{unlockBanner.label}</p>
            <p className="mt-2 font-rajdhani text-xs font-bold uppercase tracking-[0.22em] sm:text-sm">ACCESSING CASE STUDY…</p>
          </div>
        </div>,
        document.body,
      )}
      {latestAchievement && createPortal(
        <div className="pointer-events-none fixed inset-0 z-[100] grid place-items-center p-4" aria-live="polite">
          <button type="button" onClick={clearLatestAchievement} className={`pixel-achievement-toast pointer-events-auto w-[min(31rem,calc(100vw-2rem))] border-2 bg-[#05080d] p-4 text-left shadow-[8px_8px_0_rgba(0,0,0,0.75)] ${isCyan ? "border-cyan-300 text-cyan-100" : "border-orange-300 text-orange-100"}`}>
            <span className="font-bebas text-2xl">★ {latestAchievement.title}</span><span className="mt-1 block font-rajdhani text-xs text-white/75">{latestAchievement.detail}</span>
          </button>
        </div>,
        document.body,
      )}

      <div className="archive-title-zone pointer-events-none absolute inset-x-4 top-[7.1rem] z-50 text-center md:inset-x-8 md:top-[8.25rem] 2xl:top-[9rem]">
        <p className={`font-rajdhani text-xs font-black uppercase tracking-[0.42em] md:text-sm ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
          {eyebrow}
        </p>
        <h1 className="mt-2 skew-x-[-8deg] font-bebas text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.78] tracking-[0.04em] text-white text-shadow-arcade">
          {title}
        </h1>
      </div>

      {/* Scrolling world */}
      <div
        className="absolute bottom-0 left-0 z-10 h-full"
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

        <div className="archive-character-slot absolute bottom-36 z-20 -translate-x-1/2 md:bottom-[4.5rem]" style={{ left: charX }}>
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
            <span
              className="pixel-dialogue archive-character-dialogue pointer-events-none absolute bottom-[calc(100%-1.5rem)] left-1/2 z-30 w-[min(15rem,calc(100vw-2rem))] bg-white p-2.5 text-center font-rajdhani text-xs font-bold leading-snug text-[#101010] transition-transform duration-100 ease-out"
              style={{ transform: `translateX(-50%) translateY(${jumping ? -38 : 0}px)` }}
            >
              “{dialogue}”
            </span>
          )}
        </div>
      </div>

      {/* Controls help */}
      <div className="archive-controls-help absolute bottom-4 right-24 z-20 md:bottom-6 md:right-[6.5rem] 2xl:bottom-8 2xl:right-12">
        {showHelp && (
          <div
            className={`pixel-hud-panel mb-4 w-[min(22rem,calc(100vw-2rem))] border-4 bg-[#05080df0] p-4 font-rajdhani text-sm text-white/85 ${
              isCyan ? "border-cyan-300/50" : "border-orange-300/50"
            }`}
          >
            <p className={`mb-4 font-black uppercase tracking-[0.2em] ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>
              {t("controls")}
            </p>
            <ul className="space-y-1.5">
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

      <div className="archive-touch-controls absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+4.25rem)] z-30 flex items-end justify-between gap-3 px-4 md:hidden">
        <div className="flex gap-2" aria-label="Move archive character">
          <button
            type="button"
            aria-label="Move left"
            onPointerDown={(event) => { event.preventDefault(); beginTouchMove("left"); }}
            onPointerUp={endTouchMove}
            onPointerLeave={endTouchMove}
            onPointerCancel={endTouchMove}
            className={`archive-touch-button ${isCyan ? "border-cyan-200 text-cyan-100" : "border-orange-200 text-orange-100"}`}
          >←</button>
          <button
            type="button"
            aria-label="Move right"
            onPointerDown={(event) => { event.preventDefault(); beginTouchMove("right"); }}
            onPointerUp={endTouchMove}
            onPointerLeave={endTouchMove}
            onPointerCancel={endTouchMove}
            className={`archive-touch-button ${isCyan ? "border-cyan-200 text-cyan-100" : "border-orange-200 text-orange-100"}`}
          >→</button>
        </div>
        <div className="flex gap-2" aria-label="Archive actions">
          <button type="button" onClick={triggerJump} className={`archive-touch-button archive-touch-action font-rajdhani ${isCyan ? "border-cyan-200 text-cyan-100" : "border-orange-200 text-orange-100"}`}><span>↑</span><small>JUMP</small></button>
          <button type="button" onClick={triggerSelect} className={`archive-touch-button archive-touch-action font-rajdhani ${isCyan ? "border-cyan-200 text-cyan-100" : "border-orange-200 text-orange-100"}`}><span>↵</span><small>SELECT</small></button>
        </div>
      </div>

      <UtilityMenuBar
        quickLabel={t("skipToProjects")}
        quickExpanded={showQuickMenu}
        onQuickToggle={() => setShowQuickMenu((open) => !open)}
        muted={muted}
        onToggleMuted={toggleMuted}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        quickPanel={showQuickMenu && (
            <aside id="quick-menu-panel" className={`utility-menu-popover w-[min(21rem,calc(100vw-1.5rem))] border-4 bg-[#05080df5] p-3 shadow-[6px_6px_0_rgba(0,0,0,0.65)] ${isCyan ? "border-cyan-300/70" : "border-orange-300/70"}`} aria-label={t("quickMenu")}>
              <div className="mb-3 flex items-center justify-between border-b border-white/20 pb-2">
                <p className={`font-rajdhani text-xs font-black uppercase tracking-[0.22em] ${isCyan ? "text-cyan-200" : "text-orange-200"}`}>{t("quickMenu")}</p>
                <span className="font-rajdhani text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/50">DIRECT ACCESS</span>
              </div>
              <div className="grid gap-2">
                {items.map((item, index) => {
                  const thumbnail = spriteVariant === "designer" ? DESIGNER_PROJECT_THUMBNAILS[item.id] : undefined;
                  return (
                    <button key={item.id} type="button" onClick={() => selectFromQuickMenu(item.id)} className={`flex min-h-11 items-center gap-3 border p-2 text-left transition-colors ${isCyan ? "border-cyan-300/35 hover:border-cyan-200 hover:bg-cyan-300 hover:text-[#06101e]" : "border-orange-300/35 hover:border-orange-200 hover:bg-orange-300 hover:text-[#1b0603]"}`}>
                      <span className="w-5 shrink-0 font-bebas text-xl">{String(index + 1).padStart(2, "0")}</span>
                      {thumbnail && (
                        <span className="h-9 w-12 shrink-0 overflow-hidden border border-white/45 bg-white shadow-[2px_2px_0_rgba(0,0,0,0.65)]">
                          <img src={thumbnail} alt="" className="h-full w-full object-cover [image-rendering:auto!important]" loading="lazy" />
                        </span>
                      )}
                      <span className="min-w-0 font-rajdhani text-sm font-black uppercase tracking-[0.12em]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </aside>
        )}
      />

    </section>
  );
}
