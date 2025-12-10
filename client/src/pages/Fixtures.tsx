import { useEffect, useState } from "react";

export default function Fixtures() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const fetchFixtures = async () => {
    setLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_X_APISPORTS_KEY;

    try {
      const res = await fetch(
        "https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2023",
        {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch fixtures: ${res.status} ${errorText}`);
      }

      const json = await res.json();

      // ✅ Only keep fixtures that haven't kicked off yet
      const upcoming = (json.response ?? []).filter((fixture: any) => {
        const kickoff = new Date(fixture.fixture.date).getTime();
        return kickoff > Date.now();
      });

      setData(upcoming);
      setLastUpdated(Date.now());

      // cache
      localStorage.setItem("fixtures:data", JSON.stringify(upcoming));
      localStorage.setItem("fixtures:updatedAt", String(Date.now()));
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load from cache if available
    const cachedData = localStorage.getItem("fixtures:data");
    const cachedTs = localStorage.getItem("fixtures:updatedAt");

    if (cachedData && cachedTs) {
      setData(JSON.parse(cachedData));
      setLastUpdated(Number(cachedTs));
      setLoading(false);
    } else {
      fetchFixtures();
    }

    // ✅ Schedule refresh at 06:00, 10:00, 16:00, 20:00
    const targetHours = [6, 10, 16, 20];

    const scheduleNextFetch = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Find next target time today
      let nextMinutes: number | null = null;
      for (const h of targetHours) {
        const t = h * 60;
        if (t > currentMinutes) {
          nextMinutes = t;
          break;
        }
      }
      // If none left today, roll over to tomorrow's first slot
      if (nextMinutes === null) {
        nextMinutes = targetHours[0] * 60;
        now.setDate(now.getDate() + 1);
      }

      const nextFetchTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        Math.floor(nextMinutes / 60),
        nextMinutes % 60,
        0,
        0
      );

      const delay = nextFetchTime.getTime() - Date.now();
      return setTimeout(() => {
        const hasUpcoming = data.some(
          (fixture: any) =>
            new Date(fixture.fixture.date).getTime() > Date.now()
        );
        if (hasUpcoming) {
          fetchFixtures();
        }
        scheduleNextFetch();
      }, delay);
    };

    const timer = scheduleNextFetch();
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <p className="p-4">Loading fixtures...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <main className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Upcoming Fixtures</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Last updated:{" "}
            {lastUpdated ? new Date(lastUpdated).toLocaleString() : "never"}
          </span>
          <button
            onClick={fetchFixtures}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>
      {data.length === 0 ? (
        <p>No upcoming fixtures.</p>
      ) : (
        <ul className="space-y-2">
          {data.map((fixture: any) => (
            <li key={fixture.fixture.id} className="p-3 border rounded">
              <p>
                {fixture.teams.home.name} vs {fixture.teams.away.name}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(fixture.fixture.date).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                {fixture.league?.name ?? "Unknown league"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}