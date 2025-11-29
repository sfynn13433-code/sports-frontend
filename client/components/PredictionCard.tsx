import { PredictionData } from "../lib/api-client";
import { TrendingUp } from "lucide-react";

interface PredictionCardProps {
  prediction: PredictionData;
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const { match, league, predictions } = prediction;
  const { winner, goals } = predictions;

  const probabilityToPercent = (prob: string): number => {
    return parseInt(prob.replace('%', ''));
  };

  const getConfidenceColor = (prob: string): string => {
    const percent = probabilityToPercent(prob);
    if (percent >= 80) return 'text-green-400';
    if (percent >= 70) return 'text-yellow-400';
    if (percent >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getProgressBarColor = (prob: string): string => {
    const percent = probabilityToPercent(prob);
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 70) return 'bg-yellow-500';
    if (percent >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 rounded-xl border border-gold-600/20 bg-slate-900/50 hover:bg-slate-900/70 hover:border-gold-500/40 transition">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gold-600/10">
        <h3 className="text-2xl font-bold text-white mb-1">{match}</h3>
        <p className="text-sm text-gold-400 font-semibold">{league}</p>
      </div>

      {/* Winner Prediction Section */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-gold-400">🎯</span>
          Match Winner
        </h4>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gradient-to-r from-gold-950/40 to-gold-900/20 border border-gold-600/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-bold text-white">{winner.team}</p>
              <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gold-600/20 border border-gold-500/30 ${getConfidenceColor(winner.probability)}`}>
                {winner.probability}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Prediction Confidence</span>
                <span className="text-xs text-gold-400 font-semibold">{winner.probability}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressBarColor(winner.probability)} transition-all duration-300`}
                  style={{ width: winner.probability }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-900/50 rounded p-2">
                <p className="text-gray-400 text-xs mb-1">Odds</p>
                <p className="text-gold-400 font-bold text-lg">{winner.odds}</p>
              </div>
              <div className="bg-slate-900/50 rounded p-2">
                <p className="text-gray-400 text-xs mb-1">Suggestion</p>
                <p className="text-green-400 font-semibold text-sm">{winner.suggestedBet}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Markets Section */}
      {goals && goals.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-yellow-400">⚽</span>
            Goals Markets
          </h4>

          <div className="space-y-3">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-slate-800/30 border border-gold-600/10 hover:border-gold-600/20 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-white text-sm">{goal.type}</p>
                  <span className={`text-sm font-bold ${getConfidenceColor(goal.probability)}`}>
                    {goal.probability}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-900/50 rounded p-2">
                    <p className="text-gray-500 mb-0.5">Probability</p>
                    <p className="text-gold-400 font-bold">{goal.probability}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2">
                    <p className="text-gray-500 mb-0.5">Odds</p>
                    <p className="text-gold-400 font-bold">{goal.odds}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2">
                    <p className="text-gray-500 mb-0.5">Bet</p>
                    <p className="text-green-400 font-bold">{goal.suggestedBet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
