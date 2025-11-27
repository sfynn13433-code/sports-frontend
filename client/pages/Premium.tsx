import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function Premium() {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-block p-12 rounded-2xl border border-gold-600/20 bg-slate-900/50">
          <p className="text-4xl mb-4">💎</p>
          <h1 className="text-3xl font-bold text-white mb-4">Premium Plans Coming Soon</h1>
          <p className="text-gray-400 max-w-md mb-8">
            This page will showcase premium subscription tiers with advanced features, exclusive insights, and pricing details. Continue building this section by prompting for pricing information!
          </p>
          <Link
            to="/predictions"
            className="inline-block px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 rounded-lg font-bold transition"
          >
            Explore Free Predictions
          </Link>
        </div>
      </div>
    </div>
  );
}
