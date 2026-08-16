import React, { useEffect } from "react";

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
}) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", defaultTheme === "dark");
  }, [defaultTheme]);

  return <>{children}</>;
}
