import { useQuery } from "@tanstack/react-query";

interface SportPredictionsTemplateProps {
  sportName: string;
  sportIcon: string;
}

export function SportPredictionsTemplate({ sportName, sportIcon }: SportPredictionsTemplateProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: [sportName],
    queryFn: async () => {
      const res = await fetch(
        `https://predictions-backend-3e9a.onrender.com/api/predictions-by-sport?sport=${sportName.toLowerCase().replace(" ", "")}`
      );
      return res.json();
    },
  });

  if (isLoading) return <p>Loading {sportName} predictions...</p>;
  if (error) return <p>Failed to load {sportName} predictions.</p>;

  return (
    <div>
      <h2>
        {sportIcon} {sportName} Predictions
      </h2>
      {data.matches.map((match: any) => (
        <div key={match.id} className="prediction-card">
          <p>
            {match.teamA} vs {match.teamB}
          </p>
          <p>Confidence: {Math.round(match.winProbability * 100)}%</p>
          <p>{match.textCommentary}</p>
        </div>
      ))}
    </div>
  );
}