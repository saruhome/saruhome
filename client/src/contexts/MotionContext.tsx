import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "reduced-motion-override";

function readOverride(): boolean | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "on" ? true : stored === "off" ? false : null;
}

type MotionContextValue = { reducedMotion: boolean; setReducedMotion: (value: boolean) => void };

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [systemPrefers, setSystemPrefers] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [override, setOverride] = useState<boolean | null>(readOverride);
  const reducedMotion = override ?? systemPrefers;

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setSystemPrefers(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reducedMotion ? "true" : "false";
  }, [reducedMotion]);

  const setReducedMotion = (value: boolean) => {
    localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
    setOverride(value);
  };

  return <MotionContext.Provider value={{ reducedMotion, setReducedMotion }}>{children}</MotionContext.Provider>;
}

export function useReducedMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useReducedMotion must be used within MotionProvider");
  return context;
}
