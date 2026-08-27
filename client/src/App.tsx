/*
 * Design Philosophy: Neo-Arcade Brutalism
 * The app shell keeps the portfolio in a dark arcade stage environment so the role select intro
 * maintains high contrast, cinematic lighting, and fighting-game UI energy from the first paint.
 */

import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import { RoleProvider } from "./contexts/RoleContext";
import { GameAudioProvider } from "./contexts/GameAudioContext";
import { GameProgressProvider } from "./contexts/GameProgressContext";
import { MotionProvider } from "./contexts/MotionContext";
import Home from "./pages/Home";

const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  if (window.location.pathname === "/") return <Home />;

  return (
    <Suspense fallback={null}>
      <NotFound />
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <MotionProvider>
          <RoleProvider>
            <GameProgressProvider>
              <GameAudioProvider>
                <Router />
              </GameAudioProvider>
            </GameProgressProvider>
          </RoleProvider>
        </MotionProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
