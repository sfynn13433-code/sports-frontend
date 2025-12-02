import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Loader,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ApiClient, Prediction } from "../lib/api-client";

interface SportPredictionsProps {
  sportName: string;
  sportIcon: string;
}

export function SportPredictionsTemplate({
  sportName,
  sportIcon,
}: SportPredictionsProps) {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPredictions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ApiClient.getPredictions();
      setPredictions(data);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to load predictions";
      setError(errorMsg);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();

    const interval = setInterval(fetchPredictions, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatMatchDate = (date?: Date): string => {
    if (!date) {
      return new Date().toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatMatchTime = (date?: Date): string => {
    if (!date) {
      return new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-gold-700/30 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-900 rounded-lg transition"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center font-bold text-slate-950 text-lg">
              {sportIcon}
            </div>
            <div>
              <p className="text-xs text-gold-300 font-semibold">SKCS AI</p>
              <p className="text-sm font-bold text-white">{sportName} Predictions</p>
            </div>
          </div>
          <Link
            to="/sports"
            className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Sports</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            {sportName} Predictions
          </h1>
          <p className="text-gray-400 mb-4">
            Real-time predictions powered by machine learning models
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              onClick={fetchPredictions}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-700 disabled:bg-gold-600/50 text-slate-950 rounded-lg font-semibold transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>

            {lastUpdated && !isLoading && (
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Responsible Gambling Banner */}
        <div className="mb-8 p-4 rounded-lg border border-amber-500/30 bg-amber-950/20 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300 mb-1">
              Responsible Gambling
            </p>
            <p className="text-xs text-amber-200">
              Predictions are for entertainment purposes only. Never bet more
              than you can afford to lose. For help, contact the National
              Problem Gambling Helpline: 1-800-GAMBLER.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && predictions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader className="w-12 h-12 text-gold-400 animate-spin mb-4" />
            <p className="text-gray-400 text-lg">Loading predictions...</p>
          </div>
        )}

        {/* Error State */}
        {error && predictions.length === 0 && (
          <div className="p-6 rounded-lg border border-red-500/30 bg-red-950/20">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  Unable to Load Predictions
                </h3>
                <p className="text-red-200 text-sm mb-3">{error}</p>
                <button
                  onClick={fetchPredictions}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && predictions.length === 0 && (
          <>
            {/* AI Commentary Placeholder - Empty State */}
            <div className="mb-8 p-6 rounded-lg border border-gold-500/30 bg-gradient-to-br from-gold-950/40 to-slate-950 animate-in fade-in duration-500 shadow-lg shadow-gold-500/10">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl">✨</div>
                <h3 className="text-lg font-semibold text-gold-300">
                  AI Commentary & Insights
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <span className="font-semibold text-gold-200">We suggest this team could perform strongly based on recent form.</span> Our AI analysis identifies key patterns in team dynamics, player performance, and historical matchups. <span className="font-semibold text-gold-200">Outcomes are not guaranteed</span> — sports predictions involve inherent uncertainty. Use these insights as one data point among many in your decision-making process.
              </p>
              <div className="mt-4 pt-4 border-t border-gold-500/20">
                <p className="text-sm text-gray-400 italic">
                  🤖 <span className="font-medium text-gold-300">Coming soon:</span> Expanded AI commentary with detailed match analysis, player comparison charts, and confidence breakdowns.
                </p>
              </div>
            </div>

            <div className="text-center py-16 px-4">
              <div className="text-5xl mb-4">{sportIcon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Predictions Available
              </h3>
              <p className="text-gray-400 mb-6">
                The backend API is initializing. Please check back shortly or
                refresh the page.
              </p>
              <button
                onClick={fetchPredictions}
                className="px-6 py-2 bg-gold-600 hover:bg-gold-700 text-slate-950 rounded-lg font-semibold transition"
              >
                Try Again
              </button>
            </div>
          </>
        )}

        {/* AI Commentary Placeholder */}
        {!isLoading && predictions.length > 0 && (
          <div className="mb-8 p-6 rounded-lg border border-gold-500/30 bg-gradient-to-br from-gold-950/40 to-slate-950 animate-in fade-in duration-500 shadow-lg shadow-gold-500/10">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-2xl">✨</div>
              <h3 className="text-lg font-semibold text-gold-300">
                AI Commentary & Insights
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              <span className="font-semibold text-gold-200">We suggest this team could perform strongly based on recent form.</span> Our AI analysis identifies key patterns in team dynamics, player performance, and historical matchups. <span className="font-semibold text-gold-200">Outcomes are not guaranteed</span> — sports predictions involve inherent uncertainty. Use these insights as one data point among many in your decision-making process.
            </p>
            <div className="mt-4 pt-4 border-t border-gold-500/20">
              <p className="text-sm text-gray-400 italic">
                🤖 <span className="font-medium text-gold-300">Coming soon:</span> Expanded AI commentary with detailed match analysis, player comparison charts, and confidence breakdowns.
              </p>
            </div>
          </div>
        )}

        {/* Predictions List */}
        {!isLoading && predictions.length > 0 && (
          <div className="space-y-3">
            {predictions.map((prediction) => {
              const confidencePercent = Math.round(prediction.confidence * 100);
              const getConfidenceColor = (conf: number): string => {
                const percent = Math.round(conf * 100);
                if (percent >= 80)
                  return "bg-green-500/20 border-green-500/50 text-green-400";
                if (percent >= 70)
                  return "bg-yellow-500/20 border-yellow-500/50 text-yellow-400";
                if (percent >= 60)
                  return "bg-orange-500/20 border-orange-500/50 text-orange-400";
                return "bg-red-500/20 border-red-500/50 text-red-400";
              };

              const getBarColor = (conf: number): string => {
                const percent = Math.round(conf * 100);
                if (percent >= 80) return "bg-green-500";
                if (percent >= 70) return "bg-yellow-500";
                if (percent >= 60) return "bg-orange-500";
                return "bg-red-500";
              };

              return (
                <div
                  key={prediction.id}
                  className="p-5 rounded-lg border border-gold-600/20 bg-slate-900/50 hover:bg-slate-900/70 hover:border-gold-500/40 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {prediction.title}
                      </h3>
                      <div className="mt-2 text-sm text-gray-400 space-y-1">
                        <div>
                          📅{" "}
                          <span className="text-gold-300 font-medium">
                            {formatMatchDate()} — {formatMatchTime()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-full border font-bold text-sm whitespace-nowrap ${getConfidenceColor(prediction.confidence)}`}
                    >
                      {confidencePercent}%
                    </div>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getBarColor(prediction.confidence)} transition-all duration-300`}
                      style={{ width: `${confidencePercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gold-700/20">
          <div className="text-center text-sm text-gray-500 mb-6">
            <p>Predictions refresh automatically every 30 seconds</p>
          </div>
          <div className="text-center text-xs text-gray-600">
            <p className="italic">
              Predictions are suggestions only. Outcomes are not guaranteed. Play responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
