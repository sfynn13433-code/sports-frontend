import { useEffect, useState } from "react";

export default function Fixtures() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_X_APISPORTS_KEY;
    console.log("API Key:", apiKey); // ✅ sanity check

    fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2023", {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    })
      .then(async res => {
        if (!res.ok) {
          // ✅ capture full error response
          const errorText = await res.text();
          throw new Error(`Failed to fetch fixtures: ${res.status} ${errorText}`);
        }
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading raw data...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Raw Fixtures Data</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}