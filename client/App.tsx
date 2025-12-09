import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationCenter } from "./components/NotificationCenter";
import Index from "./pages/Index";
import Predictions from "./pages/Predictions";
import LivePredictions from "./pages/LivePredictions";
import TeamPrediction from "./pages/TeamPrediction";
import Leagues from "./pages/Leagues";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import { SportsMenu } from "./components/SportsMenu";
import FootballPredictions from "./pages/FootballPredictions";
import RugbyPredictions from "./pages/RugbyPredictions";
import TennisPredictions from "./pages/TennisPredictions";
import BasketballPredictions from "./pages/BasketballPredictions";
import IceHockeyPredictions from "./pages/IceHockeyPredictions";
import SnookerPredictions from "./pages/SnookerPredictions";

// ✅ Corrected import path for Fixtures
import Fixtures from "./Fixtures";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Notification Center - Available on all pages */}
          <div className="fixed top-4 right-4 z-50">
            <NotificationCenter />
          </div>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sports" element={<SportsMenu />} />
            <Route path="/predictions" element={<LivePredictions />} />
            <Route path="/fixtures" element={<Fixtures />} /> {/* ✅ New route */}
            <Route path="/sports/football" element={<FootballPredictions />} />
            <Route path="/sports/rugby" element={<RugbyPredictions />} />
            <Route path="/sports/tennis" element={<TennisPredictions />} />
            <Route path="/sports/basketball" element={<BasketballPredictions />} />
            <Route path="/sports/ice-hockey" element={<IceHockeyPredictions />} />
            <Route path="/sports/snooker" element={<SnookerPredictions />} />
            <Route path="/legacy-predictions" element={<Predictions />} />
            <Route path="/team-predictor" element={<TeamPrediction />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/premium" element={<Premium />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}