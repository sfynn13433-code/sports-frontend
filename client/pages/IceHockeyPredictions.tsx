import { useQuery } from "@tanstack/react-query";

function IceHockeyPredictions() {
  const sportName = "Ice Hockey";
  const sportIcon = "🏒";
  const apiSport = "icehockey";

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

  // ✅ Handle loading and error states
  if (isLoading) return <p>Loading {sportName} predictions...</p>;
  if (error) return <p>Failed to load {sportName} predictions.</p>;

  // ✅ Safely extract fixtures
  const fixtures = data?.data?.response || [];

  return (
    <div>
      <h2>
        {sportIcon} {sportName} Predictions
      </h2>

      {fixtures.length === 0 && <p>No {sportName} games found.</p>}

      {fixtures.map((match: any) => (
        <div
          key={
            match.fixture?.id ??
            `${match.league?.id}-${match.teams?.home?.name}-${match.teams?.away?.name}`
          }
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
          <p>League: {match.league?.name}</p>
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

export default IceHockeyPredictions;