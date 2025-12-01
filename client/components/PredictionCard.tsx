import { Prediction } from "../lib/api-client";

interface PredictionCardProps {
  prediction: Prediction;
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const confidencePercent = Math.round(prediction.confidence * 100);

  const getConfidenceColor = (conf: number): string => {
    const percent = Math.round(conf * 100);
    if (percent >= 80) return 'bg-green-500/20 border-green-500/50 text-green-400';
    if (percent >= 70) return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
    if (percent >= 60) return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
    return 'bg-red-500/20 border-red-500/50 text-red-400';
  };

  const getBarColor = (conf: number): string => {
    const percent = Math.round(conf * 100);
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 70) return 'bg-yellow-500';
    if (percent >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-5 rounded-lg border border-gold-600/20 bg-slate-900/50 hover:bg-slate-900/70 hover:border-gold-500/40 transition">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{prediction.title}</h3>
        </div>
        <div className={`px-3 py-1.5 rounded-full border font-bold text-sm whitespace-nowrap ${getConfidenceColor(prediction.confidence)}`}>
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
}
