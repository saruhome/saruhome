/*
 * Design Philosophy: Neo-Arcade Brutalism
 * The app shell keeps the portfolio in a dark arcade stage environment so the role select intro
 * maintains high contrast, cinematic lighting, and fighting-game UI energy from the first paint.
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { RoleProvider } from "./contexts/RoleContext";
import { GameAudioProvider } from "./contexts/GameAudioContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark">
          <RoleProvider>
            <GameAudioProvider>
              <TooltipProvider>
                <Toaster />
                <Router />
              </TooltipProvider>
            </GameAudioProvider>
          </RoleProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
