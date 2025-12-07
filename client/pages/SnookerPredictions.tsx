import { useQuery } from "@tanstack/react-query";

function SnookerPredictions() {
  const sportName = "Snooker";
  const sportIcon = "🎱";
  const apiSport = "snooker";

  const { data, isLoading, error } = useQuery({
    queryKey: ["predictions", apiSport],
    queryFn: async () => {
      const res = await fetch(
        `https://predictions-backend-3e9a.onrender.com/api/predictions-by-sport?sport=${apiSport}`
      );
      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`);
      }
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

      {fixtures.length === 0 && <p>No {sportName} matches found.</p>}

      {fixtures.map((match: any) => (
        <div
          key={match.fixture?.id}
          className="prediction-card"
        >
          <p>
            {match.teams?.home?.name} vs {match.teams?.away?.name}
          </p>
          <p>
            Status: {match.fixture?.status?.long}{" "}
            {match.fixture?.status?.elapsed
              ? `(${match.fixture.status.elapsed}’)`
              : null}
          </p>
          <p>
            Score: {match.goals?.home ?? 0} - {match.goals?.away ?? 0}
          </p>
          <p>Event: {match.league?.name}</p>
        </div>
      ))}

      {data?.expertConclusion && (
        <div className="expert-conclusion">
          <strong>Expert Conclusion:</strong> {data.expertConclusion}
        </div>
      )}
    </div>
  );
}

export default SnookerPredictions;
