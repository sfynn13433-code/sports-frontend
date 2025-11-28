import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Filter, Search, TrendingUp, Home, X, AlertCircle } from "lucide-react";
import { sportsMatches, SPORTS, PREDICTION_TYPES } from "../lib/sports-predictions";

export default function Predictions() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedPredictionType, setSelectedPredictionType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "live" | "finished">("upcoming");

  // Get unique countries from selected sport
  const countries = useMemo(() => {
    const matches = selectedSport
      ? sportsMatches.filter((m) => m.sportCode === selectedSport)
      : sportsMatches;
    const uniqueCountries = Array.from(new Set(matches.map((m) => m.country))).sort();
    return uniqueCountries;
  }, [selectedSport]);

  // Get unique leagues from selected sport and country
  const leagues = useMemo(() => {
    let matches = sportsMatches;
    if (selectedSport) matches = matches.filter((m) => m.sportCode === selectedSport);
    if (selectedCountry) matches = matches.filter((m) => m.country === selectedCountry);
    const uniqueLeagues = Array.from(new Set(matches.map((m) => m.league))).sort();
    return uniqueLeagues;
  }, [selectedSport, selectedCountry]);

  // Get prediction types for selected sport
  const availablePredictionTypes = useMemo(() => {
    if (!selectedSport) return [];
    return PREDICTION_TYPES[selectedSport] || [];
  }, [selectedSport]);

  const handleSportChange = (sport: string | null) => {
    setSelectedSport(sport);
    setSelectedCountry(null);
    setSelectedLeague(null);
    setSelectedPredictionType(null);
  };

  const handleCountryChange = (country: string | null) => {
    setSelectedCountry(country);
    setSelectedLeague(null);
  };

  // Filtered matches
  const filteredMatches = useMemo(() => {
    return sportsMatches.filter((match) => {
      const sportMatch = selectedSport ? match.sportCode === selectedSport : true;
      const countryMatch = selectedCountry ? match.country === selectedCountry : true;
      const leagueMatch = selectedLeague ? match.league === selectedLeague : true;
      const statusMatch = statusFilter === "all" ? true : match.status === statusFilter;
      const searchMatch =
        match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase());
      return sportMatch && countryMatch && leagueMatch && statusMatch && searchMatch;
    });
  }, [selectedSport, selectedCountry, selectedLeague, statusFilter, searchTerm]);

  const getPredictionColor = (confidence: number): string => {
    if (confidence >= 80) return "text-green-400";
    if (confidence >= 70) return "text-yellow-400";
    return "text-orange-400";
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

  const getSportColor = (sportCode: string) => {
    const sport = SPORTS.find((s) => s.code === sportCode);
    return sport?.color || "from-gray-600 to-gray-700";
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
        {/* Responsible Gambling Banner */}
        <div className="mb-8 p-4 rounded-lg border border-amber-500/30 bg-amber-950/20 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300 mb-1">Responsible Gambling</p>
            <p className="text-xs text-amber-200">
              Predictions are for entertainment only. Never bet more than you can afford to lose. For help with gambling problems, contact the National Problem Gambling Helpline: 1-800-GAMBLER (1-800-426-2537).
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Live Predictions</h1>
          <p className="text-gray-400">
            AI-powered match forecasts with real-time confidence scores and betting insights across 6 major sports
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

        {/* Status Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 overflow-x-auto pb-2">
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

        {/* Sport Filter */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300 font-semibold">Sport:</span>
            {selectedSport && (
              <button
                onClick={() => handleSportChange(null)}
                className="flex items-center gap-1 px-2 py-1 bg-gold-600/20 border border-gold-500/40 rounded-full text-xs text-gold-300 hover:bg-gold-600/30 transition"
              >
                {SPORTS.find((s) => s.code === selectedSport)?.emoji}{" "}
                {SPORTS.find((s) => s.code === selectedSport)?.name}
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.code}
                onClick={() => handleSportChange(selectedSport === sport.code ? null : sport.code)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedSport === sport.code
                    ? "bg-gold-600 text-slate-950"
                    : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
                }`}
              >
                {sport.emoji} {sport.name}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Type Filter (only show if sport selected) */}
        {selectedSport && availablePredictionTypes.length > 0 && (
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300 font-semibold">Prediction Type:</span>
              {selectedPredictionType && (
                <button
                  onClick={() => setSelectedPredictionType(null)}
                  className="flex items-center gap-1 px-2 py-1 bg-gold-600/20 border border-gold-500/40 rounded-full text-xs text-gold-300 hover:bg-gold-600/30 transition"
                >
                  {availablePredictionTypes.find((p) => p.code === selectedPredictionType)?.name}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPredictionType(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedPredictionType === null
                    ? "bg-gold-600 text-slate-950"
                    : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
                }`}
              >
                All Types
              </button>
              {availablePredictionTypes.map((predType) => (
                <button
                  key={predType.code}
                  onClick={() =>
                    setSelectedPredictionType(
                      selectedPredictionType === predType.code ? null : predType.code
                    )
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                    selectedPredictionType === predType.code
                      ? "bg-gold-600 text-slate-950"
                      : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
                  }`}
                >
                  {predType.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Country Filter */}
        {selectedSport && (
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300 font-semibold">Country:</span>
              {selectedCountry && (
                <button
                  onClick={() => handleCountryChange(null)}
                  className="flex items-center gap-1 px-2 py-1 bg-gold-600/20 border border-gold-500/40 rounded-full text-xs text-gold-300 hover:bg-gold-600/30 transition"
                >
                  {selectedCountry}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => handleCountryChange(selectedCountry === country ? null : country)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                    selectedCountry === country
                      ? "bg-gold-600 text-slate-950"
                      : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* League Filter */}
        {selectedSport && leagues.length > 0 && (
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300 font-semibold">League:</span>
              {selectedLeague && (
                <button
                  onClick={() => setSelectedLeague(null)}
                  className="flex items-center gap-1 px-2 py-1 bg-gold-600/20 border border-gold-500/40 rounded-full text-xs text-gold-300 hover:bg-gold-600/30 transition"
                >
                  {selectedLeague}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
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
              {leagues.map((league) => (
                <button
                  key={league}
                  onClick={() => setSelectedLeague(selectedLeague === league ? null : league)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                    selectedLeague === league
                      ? "bg-gold-600 text-slate-950"
                      : "bg-slate-900/50 border border-gold-600/20 text-gray-300 hover:border-gold-500/40"
                  }`}
                >
                  {league}
                </button>
              ))}
            </div>
          </div>
        )}

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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  {/* Match Header */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between lg:flex-col lg:items-start gap-2 mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(match.status)}`}>
                        {getStatusText(match.status)}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getSportColor(match.sportCode)} text-white`}>
                        {SPORTS.find((s) => s.code === match.sportCode)?.emoji} {match.sport}
                      </span>
                    </div>
                    <p className="text-xs text-gold-400 font-semibold">{match.league}</p>
                    <p className="text-xs text-gray-500">{match.country}</p>
                    <p className="text-xs text-gray-600 mt-2">
                      {new Date(match.date).toLocaleDateString()} at {match.time}
                    </p>
                  </div>

                  {/* Teams */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-center flex-1">
                        <p className="text-2xl mb-1">{match.homeLogoUrl}</p>
                        <p className="text-sm font-semibold text-white truncate">{match.homeTeam}</p>
                        {match.liveScore && (
                          <p className="text-xl font-bold text-gold-400 mt-1">{match.liveScore.home}</p>
                        )}
                      </div>
                      <p className="text-gray-500 font-semibold">VS</p>
                      <div className="text-center flex-1">
                        <p className="text-2xl mb-1">{match.awayLogoUrl}</p>
                        <p className="text-sm font-semibold text-white truncate">{match.awayTeam}</p>
                        {match.liveScore && (
                          <p className="text-xl font-bold text-gold-400 mt-1">{match.liveScore.away}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Predictions */}
                  <div className="lg:col-span-8 space-y-3">
                    {match.predictions
                      .filter(
                        (pred) =>
                          !selectedPredictionType || pred.type === selectedPredictionType
                      )
                      .slice(0, 3) // Show max 3 prediction types
                      .map((pred, idx) => {
                        const predType = availablePredictionTypes.find((pt) => pt.code === pred.type);
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-gray-300">
                                {predType?.name || pred.type.toUpperCase()}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${getPredictionColor(pred.confidence)}`}>
                                  {pred.confidence}% Confidence
                                </span>
                                <span className="text-xs font-semibold text-gold-400 bg-gold-600/10 px-2 py-1 rounded">
                                  {pred.suggestedBet}
                                </span>
                              </div>
                            </div>

                            {/* Probability Bars */}
                            {pred.homeWin !== undefined && pred.awayWin !== undefined && (
                              <div className="space-y-1.5">
                                {pred.homeWin > 0 && (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs text-gray-400">
                                        {pred.draw !== undefined ? "Home" : match.homeTeam}
                                      </p>
                                      <p className="text-xs font-bold text-gold-400">
                                        {pred.homeWin.toFixed(1)}%
                                      </p>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-gold-500 to-gold-600"
                                        style={{ width: `${Math.min(pred.homeWin, 100)}%` }}
                                      ></div>
                                    </div>
                                  </>
                                )}

                                {pred.draw !== undefined && pred.draw > 0 && (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs text-gray-400">Draw</p>
                                      <p className="text-xs font-bold text-gray-300">
                                        {pred.draw.toFixed(1)}%
                                      </p>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-slate-600"
                                        style={{ width: `${Math.min(pred.draw, 100)}%` }}
                                      ></div>
                                    </div>
                                  </>
                                )}

                                {pred.awayWin > 0 && (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <p className="text-xs text-gray-400">
                                        {pred.draw !== undefined ? "Away" : match.awayTeam}
                                      </p>
                                      <p className="text-xs font-bold text-blue-400">
                                        {pred.awayWin.toFixed(1)}%
                                      </p>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-blue-500"
                                        style={{ width: `${Math.min(pred.awayWin, 100)}%` }}
                                      ></div>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Premium CTA */}
        <div className="mt-16 text-center p-8 rounded-xl border border-gold-600/20 bg-slate-900/50">
          <TrendingUp className="w-12 h-12 text-gold-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Unlock Advanced Predictions</h3>
          <p className="text-gray-400 mb-6">
            Upgrade to access detailed player stats, historical accuracy rates, and exclusive betting strategies
          </p>
          <Link
            to="/premium"
            className="inline-block px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-slate-950 rounded-lg font-bold transition transform hover:scale-105"
          >
            View Premium Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
