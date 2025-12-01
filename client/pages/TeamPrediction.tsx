import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Loader, AlertCircle, Zap, TrendingUp } from "lucide-react";
import { SportsDBAPI, Team } from "../lib/sports-api";
import { ApiClient, Prediction } from "../lib/api-client";

export default function TeamPrediction() {
  // Team data
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [teamsError, setTeamsError] = useState<string | null>(null);

  // Team selection
  const [selectedTeamA, setSelectedTeamA] = useState<string>("");
  const [selectedTeamB, setSelectedTeamB] = useState<string>("");

  // Prediction
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [predictLoading, setPredictLoading] = useState(false);
  const [predictError, setPredictError] = useState<string | null>(null);
  const [commentary, setCommentary] = useState<string>("");

  // Fetch teams on mount
  useEffect(() => {
    const fetchTeams = async () => {
      setTeamsLoading(true);
      setTeamsError(null);
      try {
        const teamsList = await SportsDBAPI.getTeams("English Premier League");
        setTeams(teamsList);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Failed to load teams";
        setTeamsError(errorMsg);
      } finally {
        setTeamsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Generate AI-style commentary
  const generateCommentary = (pred: Prediction, teamA: string, teamB: string): string => {
    const confidence = Math.round(pred.confidence * 100);
    const confidenceLevel = confidence >= 80 ? "strong" : confidence >= 60 ? "moderate" : "cautious";
    
    const templates = [
      `Looking at the ${teamA} vs ${teamB} matchup, our AI model provides ${confidenceLevel} confidence in "${pred.title}". With a confidence rating of ${confidence}%, this prediction is backed by comprehensive statistical analysis of recent form, head-to-head records, and player performance metrics.`,
      
      `In this ${teamA} versus ${teamB} encounter, the prediction "${pred.title}" shows ${confidenceLevel} conviction at ${confidence}% confidence. This assessment is derived from advanced machine learning models that evaluate team dynamics, injury reports, and historical performance patterns.`,
      
      `The matchup between ${teamA} and ${teamB} presents an interesting tactical scenario. Our analytics suggest "${pred.title}" with ${confidence}% confidence - a ${confidenceLevel} prediction based on extensive data from previous meetings and current season performance.`,
      
      `For the ${teamA} and ${teamB} fixture, predictive analytics indicate "${pred.title}" carries ${confidence}% confidence. This ${confidenceLevel} assessment reflects the team's offensive capabilities, defensive stability, and current momentum in the league.`,
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const handleGetPrediction = async () => {
    if (!selectedTeamA || !selectedTeamB) {
      setPredictError("Please select both teams");
      return;
    }

    if (selectedTeamA === selectedTeamB) {
      setPredictError("Team A and Team B must be different");
      return;
    }

    setPredictLoading(true);
    setPredictError(null);
    setPrediction(null);
    setCommentary("");

    try {
      const result = await ApiClient.predictMatch(selectedTeamA, selectedTeamB);
      setPrediction(result);
      const generatedCommentary = generateCommentary(result, selectedTeamA, selectedTeamB);
      setCommentary(generatedCommentary);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to get prediction";
      setPredictError(errorMsg);
    } finally {
      setPredictLoading(false);
    }
  };

  const getTeamLabel = (teamName: string): string => {
    if (!teamName) return "Select Team";
    const team = teams.find((t) => t.strTeam === teamName);
    return team?.strTeam || teamName;
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-gold-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Team Match Predictor</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Select two Premier League teams to get an AI-powered prediction
          </p>
        </div>

        {/* Responsible Gambling Banner */}
        <div className="mb-8 p-4 rounded-lg border border-amber-500/30 bg-amber-950/20 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300 mb-1">Responsible Gambling</p>
            <p className="text-xs text-amber-200">
              Predictions are for entertainment purposes only. Always gamble responsibly and never bet more than you can afford to lose.
            </p>
          </div>
        </div>

        {/* Teams Loading State */}
        {teamsLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader className="w-12 h-12 text-gold-400 animate-spin mb-4" />
            <p className="text-gray-400">Loading teams...</p>
          </div>
        )}

        {/* Teams Error State */}
        {teamsError && !teamsLoading && (
          <div className="mb-8 p-6 rounded-lg border border-red-500/30 bg-red-950/20">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-300 mb-2">Unable to Load Teams</h3>
                <p className="text-red-200 text-sm">{teamsError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Team Selection */}
        {!teamsLoading && teams.length > 0 && (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Team A Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Team A</label>
                <select
                  value={selectedTeamA}
                  onChange={(e) => setSelectedTeamA(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-gold-600/20 rounded-lg text-white focus:outline-none focus:border-gold-500/50 focus:bg-slate-900/80 transition hover:border-gold-600/40"
                >
                  <option value="">Select Team A</option>
                  {teams.map((team) => (
                    <option key={team.idTeam} value={team.strTeam}>
                      {team.strTeam}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team B Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Team B</label>
                <select
                  value={selectedTeamB}
                  onChange={(e) => setSelectedTeamB(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-gold-600/20 rounded-lg text-white focus:outline-none focus:border-gold-500/50 focus:bg-slate-900/80 transition hover:border-gold-600/40"
                >
                  <option value="">Select Team B</option>
                  {teams.map((team) => (
                    <option key={team.idTeam} value={team.strTeam}>
                      {team.strTeam}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prediction Error */}
            {predictError && (
              <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-950/20 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{predictError}</p>
              </div>
            )}

            {/* Get Prediction Button */}
            <button
              onClick={handleGetPrediction}
              disabled={!selectedTeamA || !selectedTeamB || predictLoading}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:from-gold-500/50 disabled:to-gold-600/50 disabled:cursor-not-allowed text-slate-950 rounded-lg font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              {predictLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Generating Prediction...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Get Prediction
                </>
              )}
            </button>
          </div>
        )}

        {/* Prediction Result */}
        {prediction && !predictLoading && (
          <div className="space-y-6">
            {/* Prediction Card */}
            <div className="p-8 rounded-2xl border border-gold-600/30 bg-gradient-to-br from-gold-950/40 to-slate-950/50">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{prediction.title}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Confidence Level</span>
                  <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden max-w-xs">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-600"
                      style={{ width: `${Math.round(prediction.confidence * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">AI Confidence</p>
                  <p className="text-5xl font-bold text-gold-400">
                    {Math.round(prediction.confidence * 100)}%
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Match: {selectedTeamA} vs {selectedTeamB}</p>
                </div>
              </div>
            </div>

            {/* AI Commentary */}
            {commentary && (
              <div className="p-6 rounded-xl border border-blue-600/30 bg-blue-950/20">
                <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  Expert Analysis
                </h3>
                <p className="text-gray-300 leading-relaxed">{commentary}</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!prediction && !predictLoading && selectedTeamA && selectedTeamB && !predictError && (
          <div className="text-center py-12">
            <p className="text-gray-400">Select teams and click "Get Prediction" to see results</p>
          </div>
        )}
      </div>
    </div>
  );
}
