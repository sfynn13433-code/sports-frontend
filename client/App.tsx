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
            <Route path="/predictions" element={<LivePredictions />} />
            <Route path="/legacy-predictions" element={<Predictions />} />
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
