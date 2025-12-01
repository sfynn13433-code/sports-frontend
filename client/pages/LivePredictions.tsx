import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Loader, AlertCircle, RefreshCw } from "lucide-react";
import { ApiClient, PredictionData } from "../lib/api-client";
import PredictionCard from "../components/PredictionCard";

export default function LivePredictions() {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
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
      const errorMsg = err instanceof Error ? err.message : "Failed to load predictions";
      setError(errorMsg);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchPredictions, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-gold-700/30 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-50">
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
            <span className="hidden sm:inline text-sm">Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            AI Sports Predictions
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
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Refreshing...' : 'Refresh'}
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
            <p className="text-sm font-semibold text-amber-300 mb-1">Responsible Gambling</p>
            <p className="text-xs text-amber-200">
              Predictions are for entertainment purposes only. Never bet more than you can afford to lose. For help, contact the National Problem Gambling Helpline: 1-800-GAMBLER.
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
                <h3 className="text-lg font-semibold text-red-300 mb-2">Unable to Load Predictions</h3>
                <p className="text-red-200 text-sm mb-3">{error}</p>
                <div className="bg-red-950/40 rounded p-3 mb-4 text-xs text-red-300 space-y-1">
                  <p><strong>Troubleshooting:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>Ensure the backend server is running</li>
                    <li>Verify CORS is enabled on the backend</li>
                    <li>Check that the API endpoint exists: <code className="bg-black/30 px-1 rounded">https://sports-backend-hq07.onrender.com/api/predictions</code></li>
                  </ul>
                </div>
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
          <div className="text-center py-16 px-4">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">No Predictions Available</h3>
            <p className="text-gray-400 mb-6">
              The backend API is initializing. Please check back shortly or refresh the page.
            </p>
            <button
              onClick={fetchPredictions}
              className="px-6 py-2 bg-gold-600 hover:bg-gold-700 text-slate-950 rounded-lg font-semibold transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Predictions Grid */}
        {!isLoading && predictions.length > 0 && (
          <div className="space-y-6">
            {predictions.map((prediction, idx) => (
              <PredictionCard key={idx} prediction={prediction} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gold-700/20 text-center text-sm text-gray-500">
          <p>Predictions refresh automatically every 30 seconds</p>
        </div>
      </div>
    </div>
  );
}
