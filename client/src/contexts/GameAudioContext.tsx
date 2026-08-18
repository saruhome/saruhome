// Pixel audio direction: role-specific retro loops fade in behind concise square-wave archive-launch cues.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { PlayerRole } from "./RoleContext";
import { assetUrl } from "../lib/assetUrl";

const ROLE_TRACKS: Record<PlayerRole, string> = {
  designer: assetUrl("designer-archive-loop_da115ca8.mp3", "designer-archive-loop.mp3"),
  dancer: assetUrl("dancer-archive-loop_084713db.mp3", "dancer-archive-loop.mp3"),
};

type GameAudioContextValue = {
  muted: boolean;
  toggleMuted: () => void;
  startRoleMusic: (role: PlayerRole) => void;
  launchArchiveAudio: (role: PlayerRole) => void;
  stopMusic: () => void;
  playHover: () => void;
  playRoleHoverJump: (role: PlayerRole) => void;
  playWallCrash: (role: PlayerRole) => void;
  playNavigate: () => void;
  playJump: () => void;
  playConfirm: () => void;
};

const GameAudioContext = createContext<GameAudioContextValue | undefined>(undefined);

type Tone = { frequency: number; offset: number; duration: number; gain: number; type?: OscillatorType };

export function GameAudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("portfolio-audio-muted") === "true");
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const musicRoleRef = useRef<PlayerRole | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    window.localStorage.setItem("portfolio-audio-muted", String(muted));
    if (musicRef.current) musicRef.current.muted = muted;
  }, [muted]);

  useEffect(() => () => musicRef.current?.pause(), []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContextRef.current) audioContextRef.current = new AudioCtx();
    if (audioContextRef.current.state === "suspended") void audioContextRef.current.resume();
    return audioContextRef.current;
  }, []);

  const playTones = useCallback((tones: Tone[]) => {
    if (muted) return;
    const context = getAudioContext();
    if (!context) return;
    tones.forEach(({ frequency, offset, duration, gain, type = "square" }) => {
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      const startAt = context.currentTime + offset;
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, startAt);
      volume.gain.setValueAtTime(0.0001, startAt);
      volume.gain.exponentialRampToValueAtTime(gain, startAt + 0.012);
      volume.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
      oscillator.connect(volume);
      volume.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + duration + 0.02);
    });
  }, [getAudioContext, muted]);

  const startRoleMusic = useCallback((role: PlayerRole) => {
    if (typeof window === "undefined") return;
    if (musicRoleRef.current !== role || !musicRef.current) {
      musicRef.current?.pause();
      const music = new Audio(ROLE_TRACKS[role]);
      music.loop = true;
      music.preload = "auto";
      music.volume = 0.16;
      music.muted = muted;
      musicRef.current = music;
      musicRoleRef.current = role;
    }
    void musicRef.current.play().catch(() => undefined);
  }, [muted]);

  const stopMusic = useCallback(() => {
    musicRef.current?.pause();
    if (musicRef.current) musicRef.current.currentTime = 0;
    musicRoleRef.current = null;
  }, []);

  const launchArchiveAudio = useCallback((role: PlayerRole) => {
    const designerLaunch: Tone[] = [
      { frequency: 262, offset: 0, duration: 0.07, gain: 0.065 },
      { frequency: 392, offset: 0.075, duration: 0.07, gain: 0.06 },
      { frequency: 523, offset: 0.15, duration: 0.09, gain: 0.058 },
      { frequency: 784, offset: 0.245, duration: 0.16, gain: 0.05, type: "triangle" },
    ];
    const dancerLaunch: Tone[] = [
      { frequency: 196, offset: 0, duration: 0.06, gain: 0.07 },
      { frequency: 294, offset: 0.055, duration: 0.06, gain: 0.065 },
      { frequency: 392, offset: 0.11, duration: 0.08, gain: 0.06 },
      { frequency: 587, offset: 0.19, duration: 0.14, gain: 0.055, type: "sawtooth" },
    ];
    playTones(role === "designer" ? designerLaunch : dancerLaunch);
    startRoleMusic(role);
  }, [playTones, startRoleMusic]);

  const value = useMemo<GameAudioContextValue>(() => ({
    muted,
    toggleMuted: () => setMuted((value) => !value),
    startRoleMusic,
    launchArchiveAudio,
    stopMusic,
    playHover: () => playTones([{ frequency: 720, offset: 0, duration: 0.06, gain: 0.035, type: "sine" }]),
    playRoleHoverJump: (role) => playTones(role === "designer"
      ? [
          { frequency: 523, offset: 0, duration: 0.07, gain: 0.04, type: "sine" },
          { frequency: 784, offset: 0.085, duration: 0.09, gain: 0.045, type: "triangle" },
          { frequency: 1047, offset: 0.375, duration: 0.11, gain: 0.05, type: "sine" },
          { frequency: 659, offset: 0.65, duration: 0.075, gain: 0.04, type: "triangle" },
        ]
      : [
          { frequency: 147, offset: 0, duration: 0.07, gain: 0.06, type: "square" },
          { frequency: 294, offset: 0.09, duration: 0.085, gain: 0.055, type: "sawtooth" },
          { frequency: 440, offset: 0.375, duration: 0.12, gain: 0.05, type: "square" },
          { frequency: 220, offset: 0.65, duration: 0.08, gain: 0.045, type: "triangle" },
        ]),
    playWallCrash: (role) => playTones(role === "designer"
      ? [
          { frequency: 185, offset: 0, duration: 0.08, gain: 0.065, type: "square" },
          { frequency: 96, offset: 0.065, duration: 0.14, gain: 0.055, type: "sawtooth" },
        ]
      : [
          { frequency: 130, offset: 0, duration: 0.08, gain: 0.07, type: "square" },
          { frequency: 78, offset: 0.065, duration: 0.15, gain: 0.06, type: "sawtooth" },
        ]),
    playNavigate: () => playTones([{ frequency: 330, offset: 0, duration: 0.055, gain: 0.05 }, { frequency: 494, offset: 0.045, duration: 0.07, gain: 0.04 }]),
    playJump: () => playTones([{ frequency: 220, offset: 0, duration: 0.18, gain: 0.09, type: "sine" }, { frequency: 660, offset: 0.045, duration: 0.13, gain: 0.05, type: "triangle" }]),
    playConfirm: () => playTones([{ frequency: 392, offset: 0, duration: 0.09, gain: 0.07 }, { frequency: 523, offset: 0.075, duration: 0.11, gain: 0.065 }, { frequency: 784, offset: 0.15, duration: 0.16, gain: 0.055 }]),
  }), [launchArchiveAudio, muted, playTones, startRoleMusic, stopMusic]);

  return <GameAudioContext.Provider value={value}>{children}</GameAudioContext.Provider>;
}

export function useGameAudio() {
  const context = useContext(GameAudioContext);
  if (!context) throw new Error("useGameAudio must be used within GameAudioProvider");
  return context;
}
