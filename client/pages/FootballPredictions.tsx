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
        `https://predictions-backend-3e9a.onrender.com/api/predictions-by-sport?sport=${sportName.toLowerCase().replace(/\s+/g, "")}`
      );
      return res.json();
    },
  });

  if (isLoading) return <p>Loading {sportName} predictions...</p>;
  if (error) return <p>Failed to load {sportName} predictions.</p>;

  const fixtures = data?.data?.response || [];

  return (
    <div>
      <h2>
        {sportIcon} {sportName} Predictions
      </h2>
      {fixtures.map((match: any) => (
        <div key={match.fixture.id} className="prediction-card">
          <p>
            {match.teams.home.name} vs {match.teams.away.name}
          </p>
          <p>
            Status: {match.fixture.status.long} ({match.fixture.status.elapsed}’)
          </p>
          <p>
            Score: {match.goals.home} - {match.goals.away}
          </p>
          <p>League: {match.league.name}</p>
        </div>
      ))}

      {data.expertConclusion && (
        <div className="expert-conclusion">
          <strong>Expert Conclusion:</strong> {data.expertConclusion}
        </div>
      )}
    </div>
  );
}