import { useQuery } from "@tanstack/react-query";

export default function BasketballPredictions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["basketballPredictions"],
    queryFn: async () => {
      const res = await fetch(
        "https://predictions-backend-3e9a.onrender.com/api/predictions-by-sport?sport=basketball"
      );
      return res.json();
    },
  });

  if (isLoading) return <p>Loading Basketball predictions...</p>;
  if (error) return <p>Failed to load Basketball predictions.</p>;

  return (
    <div>
      <h2>🏀 Basketball Predictions</h2>
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