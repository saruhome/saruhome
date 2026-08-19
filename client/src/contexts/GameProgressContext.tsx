/**
 * Design Philosophy: Neo-Arcade Exploration.
 * Progress rewards real portfolio discovery without ever blocking Quick Menu access to the work.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PlayerRole } from "./RoleContext";

const STORAGE_KEY = "saruhome-pixel-exploration-v1";
const COLLECTION_TARGET = 3;

export type AchievementId = "first-project" | "dual-path" | "trailblazer" | "double-jump" | "collector";
export type Achievement = { id: AchievementId; title: string; detail: string };

const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  "first-project": { id: "first-project", title: "FIRST SIGNAL", detail: "Opened your first project node." },
  "dual-path": { id: "dual-path", title: "DUAL PLAYER", detail: "Explored both Designer and Dancer paths." },
  trailblazer: { id: "trailblazer", title: "SIGNPOST SCOUT", detail: "Visited every signpost in an archive." },
  "double-jump": { id: "double-jump", title: "AIR CONFIRM", detail: "Selected a project with a double jump." },
  collector: { id: "collector", title: "HIDDEN SIGNAL", detail: "Secret message unlocked: Curiosity is an interaction design tool." },
};

type ProgressSnapshot = {
  exploredByRole: Record<PlayerRole, string[]>;
  visitedByRole: Record<PlayerRole, string[]>;
  rolesPlayed: PlayerRole[];
  collected: string[];
  unlockedAchievements: AchievementId[];
  tutorialSeen: boolean;
};

const emptyProgress: ProgressSnapshot = {
  exploredByRole: { designer: [], dancer: [] },
  visitedByRole: { designer: [], dancer: [] },
  rolesPlayed: [],
  collected: [],
  unlockedAchievements: [],
  tutorialSeen: false,
};

type GameProgressValue = {
  progress: ProgressSnapshot;
  latestAchievement: Achievement | null;
  markRolePlayed: (role: PlayerRole) => void;
  markSignpostVisited: (role: PlayerRole, id: string, total: number) => void;
  markProjectExplored: (role: PlayerRole, id: string) => void;
  markDoubleJump: () => void;
  collectItem: (id: string) => void;
  markTutorialSeen: () => void;
  clearLatestAchievement: () => void;
};

const GameProgressContext = createContext<GameProgressValue | undefined>(undefined);

function uniquePush<T>(items: T[], item: T) {
  return items.includes(item) ? items : [...items, item];
}

function safeLoad(): ProgressSnapshot {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "") as Partial<ProgressSnapshot>;
    return {
      ...emptyProgress,
      ...parsed,
      exploredByRole: { ...emptyProgress.exploredByRole, ...parsed.exploredByRole },
      visitedByRole: { ...emptyProgress.visitedByRole, ...parsed.visitedByRole },
    };
  } catch {
    return emptyProgress;
  }
}

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressSnapshot>(safeLoad);
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const update = useCallback((mutate: (previous: ProgressSnapshot) => ProgressSnapshot) => {
    setProgress((previous) => mutate(previous));
  }, []);

  const unlock = useCallback((id: AchievementId, base: ProgressSnapshot) => {
    if (base.unlockedAchievements.includes(id)) return base;
    const achievement = ACHIEVEMENTS[id];
    window.setTimeout(() => setLatestAchievement(achievement), 0);
    return { ...base, unlockedAchievements: [...base.unlockedAchievements, id] };
  }, []);

  const markRolePlayed = useCallback((role: PlayerRole) => update((previous) => {
    let next = { ...previous, rolesPlayed: uniquePush(previous.rolesPlayed, role) };
    if (next.rolesPlayed.length === 2) next = unlock("dual-path", next);
    return next;
  }), [unlock, update]);

  const markSignpostVisited = useCallback((role: PlayerRole, id: string, total: number) => update((previous) => {
    let next = { ...previous, visitedByRole: { ...previous.visitedByRole, [role]: uniquePush(previous.visitedByRole[role], id) } };
    if (next.visitedByRole[role].length >= total) next = unlock("trailblazer", next);
    return next;
  }), [unlock, update]);

  const markProjectExplored = useCallback((role: PlayerRole, id: string) => update((previous) => {
    let next = { ...previous, exploredByRole: { ...previous.exploredByRole, [role]: uniquePush(previous.exploredByRole[role], id) } };
    if (next.exploredByRole.designer.length + next.exploredByRole.dancer.length >= 1) next = unlock("first-project", next);
    return next;
  }), [unlock, update]);

  const markDoubleJump = useCallback(() => update((previous) => unlock("double-jump", previous)), [unlock, update]);
  const collectItem = useCallback((id: string) => update((previous) => {
    let next = { ...previous, collected: uniquePush(previous.collected, id) };
    if (next.collected.length >= COLLECTION_TARGET) next = unlock("collector", next);
    return next;
  }), [unlock, update]);
  const markTutorialSeen = useCallback(() => update((previous) => ({ ...previous, tutorialSeen: true })), [update]);
  const clearLatestAchievement = useCallback(() => setLatestAchievement(null), []);

  const value = useMemo(() => ({ progress, latestAchievement, markRolePlayed, markSignpostVisited, markProjectExplored, markDoubleJump, collectItem, markTutorialSeen, clearLatestAchievement }), [clearLatestAchievement, collectItem, latestAchievement, markDoubleJump, markProjectExplored, markRolePlayed, markSignpostVisited, markTutorialSeen, progress]);
  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>;
}

export function useGameProgress() {
  const context = useContext(GameProgressContext);
  if (!context) throw new Error("useGameProgress must be used within GameProgressProvider");
  return context;
}

export { ACHIEVEMENTS, COLLECTION_TARGET };
