import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, TrendingUp, Home, X } from "lucide-react";
import { mockMatches, leaguesInfo } from "../lib/mock-predictions";

export default function Predictions() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "live" | "finished">("upcoming");

  // Get unique countries
  const countries = useMemo(() => {
    const uniqueCountries = Array.from(new Set(leaguesInfo.map(league => league.country)))
      .map(country => {
        const flag = leaguesInfo.find(l => l.country === country)?.flag || "🌍";
        return { name: country, flag };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return uniqueCountries;
  }, []);

  // Get leagues for selected country
  const filteredLeagues = useMemo(() => {
    if (!selectedCountry) return leaguesInfo;
    return leaguesInfo.filter(league => league.country === selectedCountry);
  }, [selectedCountry]);

  // Reset league filter when country changes
  const handleCountryChange = (country: string | null) => {
    setSelectedCountry(country);
    setSelectedLeague(null);
  };

  const filteredMatches = useMemo(() => {
    return mockMatches.filter((match) => {
      const countryMatch = selectedCountry ? match.country === selectedCountry : true;
      const leagueMatch = selectedLeague ? match.leagueCode === selectedLeague : true;
      const statusMatch = statusFilter === "all" ? true : match.status === statusFilter;
      const searchMatch =
        match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase());
      return countryMatch && leagueMatch && statusMatch && searchMatch;
    });
  }, [selectedCountry, selectedLeague, searchTerm, statusFilter]);

  const getPredictionColor = (probability: number): string => {
    if (probability >= 60) return "text-green-400";
    if (probability >= 45) return "text-yellow-400";
    return "text-red-400";
  };

  const getConfidenceBg = (probability: number): string => {
    if (probability >= 60) return "bg-green-500/20 border-green-500/40";
    if (probability >= 45) return "bg-yellow-500/20 border-yellow-500/40";
    return "bg-red-500/20 border-red-500/40";
  };

  const getStatusBadge = (status: string) => {
    if (status === "live") return "bg-red-500/30 text-red-300 border-red-500/50";
    if (status === "finished") return "bg-slate-500/30 text-slate-300 border-slate-500/50";
    return "bg-blue-500/30 text-blue-300 border-blue-500/50";
  };

  const getStatusText = (status: string) => {
    if (status === "live") return "🔴 LIVE";
    if (status === "finished") return "✓ FINISHED";
    return "📅 UPCOMING";
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Live Predictions</h1>
          <p className="text-gray-400">
            AI-powered match forecasts with real-time confidence scores and betting insights
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-gold-600/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 focus:bg-slate-900/80 transition"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 min-w-max">
            <Filter className="w-4 h-4 text-gold-400" />
            <span className="text-sm text-gray-300 font-semibold">Status:</span>
          </div>
          {(["upcoming", "live", "finished", "all"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
                statusFilter === status
                  ? "bg-gold-600 text-slate-950"
                  : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* League Tags */}
        <div className="flex flex-col sm:flex-row gap-2 mb-8 items-start sm:items-center">
          <span className="text-sm text-gray-300 font-semibold">Leagues:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLeague(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedLeague === null
                  ? "bg-gold-600 text-slate-950"
                  : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
              }`}
            >
              All Leagues
            </button>
            {leaguesInfo.map((league) => (
              <button
                key={league.code}
                onClick={() => setSelectedLeague(league.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                  selectedLeague === league.code
                    ? "bg-gold-600 text-slate-950"
                    : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
                }`}
              >
                {league.code}
              </button>
            ))}
          </div>
        </div>

        {/* Matches Grid */}
        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No matches found. Try adjusting your filters.</p>
            </div>
          ) : (
            filteredMatches.map((match) => (
              <div
                key={match.id}
                className="p-6 rounded-xl border border-gold-600/20 bg-slate-900/50 hover:bg-slate-900/70 hover:border-gold-500/40 transition"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Match Info */}
                  <div className="sm:col-span-3">
                    <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(match.status)}`}>
                        {getStatusText(match.status)}
                      </span>
                      <p className="text-xs text-gray-400">{match.league}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(match.date).toLocaleDateString()} at {match.time}
                    </p>
                  </div>

                  {/* Teams */}
                  <div className="sm:col-span-3">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="text-2xl mb-1">{match.homeLogoUrl}</p>
                        <p className="text-sm font-semibold text-white truncate">{match.homeTeam}</p>
                        {match.liveScore && (
                          <p className="text-xl font-bold text-gold-400">{match.liveScore.home}</p>
                        )}
                      </div>
                      <p className="text-gray-500 font-semibold mx-2">VS</p>
                      <div className="text-center flex-1">
                        <p className="text-2xl mb-1">{match.awayLogoUrl}</p>
                        <p className="text-sm font-semibold text-white truncate">{match.awayTeam}</p>
                        {match.liveScore && (
                          <p className="text-xl font-bold text-gold-400">{match.liveScore.away}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Prediction Bars */}
                  <div className="sm:col-span-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">Home Win</p>
                      <p className={`font-bold ${getPredictionColor(match.prediction.homeWin)}`}>
                        {match.prediction.homeWin.toFixed(1)}%
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-500 to-gold-600"
                        style={{ width: `${match.prediction.homeWin}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-gray-400">Draw</p>
                      <p className="font-bold text-gray-300">{match.prediction.draw.toFixed(1)}%</p>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-600"
                        style={{ width: `${match.prediction.draw}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-gray-400">Away Win</p>
                      <p className={`font-bold ${getPredictionColor(match.prediction.awayWin)}`}>
                        {match.prediction.awayWin.toFixed(1)}%
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${match.prediction.awayWin}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Suggested Bet */}
                  <div className="sm:col-span-3">
                    <div className={`p-4 rounded-lg border ${getConfidenceBg(match.prediction.homeWin)}`}>
                      <p className="text-xs text-gray-400 mb-2">AI Recommendation</p>
                      <p className="text-lg font-bold text-gold-300 mb-3">
                        {match.prediction.suggestedBet}
                      </p>
                      {match.odds && (
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-300">Home</span>
                            <span className="text-gold-400 font-semibold">{match.odds.home.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Draw</span>
                            <span className="text-gold-400 font-semibold">{match.odds.draw.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">Away</span>
                            <span className="text-gold-400 font-semibold">{match.odds.away.toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-8 rounded-xl border border-gold-600/20 bg-slate-900/50">
          <TrendingUp className="w-12 h-12 text-gold-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Premium Predictions Unlock More</h3>
          <p className="text-gray-400 mb-6">
            Upgrade to access advanced analytics, detailed player stats, and exclusive betting strategies
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 rounded-lg font-bold transition transform hover:scale-105">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
}
