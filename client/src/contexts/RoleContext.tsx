import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type PlayerRole = "designer" | "dancer";
export type AccentColor = "cyan" | "orange";

type RolePalette = {
  accentColor: AccentColor;
  primary: string;
  secondary: string;
  base: string;
  surface: string;
  text: string;
};

const PALETTES: Record<PlayerRole, RolePalette> = {
  designer: {
    accentColor: "cyan",
    primary: "#37E7FF",
    secondary: "#00B8D4",
    base: "#06101E",
    surface: "#07111F",
    text: "#EAFBFF",
  },
  dancer: {
    accentColor: "orange",
    primary: "#FF6B17",
    secondary: "#FFC258",
    base: "#200806",
    surface: "#1A0503",
    text: "#FFF3E8",
  },
};

type RoleContextValue = {
  selectedRole: PlayerRole;
  selectRole: (role: PlayerRole) => void;
  palette: RolePalette;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [selectedRole, setSelectedRole] = useState<PlayerRole>(() => {
    if (typeof window === "undefined") return "designer";
    const savedRole = window.localStorage.getItem("portfolio-player-role");
    return savedRole === "dancer" ? "dancer" : "designer";
  });

  const selectRole = useCallback((role: PlayerRole) => setSelectedRole(role), []);
  const palette = PALETTES[selectedRole];

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.playerRole = selectedRole;
    root.style.setProperty("--player-primary", palette.primary);
    root.style.setProperty("--player-secondary", palette.secondary);
    root.style.setProperty("--player-base", palette.base);
    root.style.setProperty("--player-surface", palette.surface);
    root.style.setProperty("--player-text", palette.text);
    window.localStorage.setItem("portfolio-player-role", selectedRole);
  }, [palette, selectedRole]);

  const value = useMemo(
    () => ({ selectedRole, selectRole, palette }),
    [palette, selectRole, selectedRole],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRoleTheme() {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRoleTheme must be used within RoleProvider");
  return context;
}
