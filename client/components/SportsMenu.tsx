import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { SPORTS } from "@/lib/sports-config";
import { ComingSoonModal } from "./ComingSoonModal";
import { useToast } from "@/hooks/use-toast";

export function SportsMenu() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSportClick = (sport: typeof SPORTS[0]) => {
    if (sport.enabled && sport.route) {
      navigate(sport.route);
    } else {
      setSelectedSport(sport.id);
      setShowModal(true);
    }
  };

  const handleNotifyMe = () => {
    const sport = SPORTS.find((s) => s.id === selectedSport);
    if (sport) {
      toast({
        title: "Thank you!",
        description: `We'll notify you when ${sport.name} predictions are available.`,
      });
    }
    setShowModal(false);
    setSelectedSport(null);
  };

  const selectedSportObj = selectedSport ? SPORTS.find((s) => s.id === selectedSport) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-gold-700/30 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-slate-950">
              ⚽
            </div>
            <div>
              <p className="text-xs text-gold-300 font-semibold">SKCS AI</p>
              <p className="text-sm font-bold text-white">Sports Predictions</p>
            </div>
          </Link>
          <Link to="/" className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-4">
            <Zap className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-gold-300 font-semibold">Select Your Sport</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Choose a Sport
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Select from our available sports to view AI-powered predictions. More sports coming soon!
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SPORTS.map((sport) => (
            <button
              key={sport.id}
              onClick={() => handleSportClick(sport)}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg opacity-0 group-hover:opacity-10 transition" />
              <div className={`relative p-6 rounded-lg border transition ${
                sport.enabled
                  ? "border-gold-600/30 bg-slate-900/50 hover:bg-slate-900/70 hover:border-gold-500/50 cursor-pointer"
                  : "border-gray-700/30 bg-slate-900/30 hover:bg-slate-900/40 cursor-pointer"
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-5xl">{sport.icon}</div>
                  {!sport.enabled && (
                    <span className="px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-900/50 rounded border border-gray-700/50">
                      Coming Soon
                    </span>
                  )}
                  {sport.enabled && (
                    <div className="w-2 h-2 rounded-full bg-green-500" title="Available" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {sport.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {sport.enabled ? "View predictions" : "Notify me when ready"}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Responsible Use Notice */}
        <div className="max-w-2xl mx-auto p-6 rounded-lg border border-amber-500/30 bg-amber-950/20">
          <p className="text-center text-sm text-amber-200">
            Predictions are suggestions only. Outcomes are not guaranteed. Play responsibly.
          </p>
        </div>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        open={showModal}
        sportName={selectedSportObj?.name || ""}
        onNotifyMe={handleNotifyMe}
        onClose={() => {
          setShowModal(false);
          setSelectedSport(null);
        }}
      />
    </div>
  );
}
