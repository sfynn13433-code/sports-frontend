import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./PredictionApp.css";

const TABS = [
  { key: "goals", label: "Goals" },
  { key: "halftime", label: "Halftime" },
  { key: "corners", label: "Corners" },
  { key: "cards", label: "Cards" },
  { key: "handicaps", label: "Handicaps" },
];

function PredictionApp() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [league, setLeague] = useState("");
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [results, setResults] = useState({
    goals: [],
    halftime: [],
    corners: [],
    cards: [],
    handicaps: [],
  });

  const apiUrl = "https://sports-backend-8bvf.onrender.com"; // hard-coded backend URL

  const validate = () => {
    if (!homeTeam || !awayTeam || !league) {
      setErrorMsg("Please enter Home Team, Away Team, and League.");
      return false;
    }
    if (homeTeam.trim().toLowerCase() === awayTeam.trim().toLowerCase()) {
      setErrorMsg("Home Team and Away Team cannot be the same.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const fetchPredictions = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/predict`, {
        homeTeam,
        awayTeam,
        league,
      });

      // Expecting data structured per market; fallback safely
      setResults({
        goals: data?.goals || data?.predictions?.goals || [],
        halftime: data?.halftime || data?.predictions?.halftime || [],
        corners: data?.corners || data?.predictions?.corners || [],
        cards: data?.cards || data?.predictions?.cards || [],
        handicaps: data?.handicaps || data?.predictions?.handicaps || [],
      });
    } catch (err) {
      setErrorMsg("Could not fetch predictions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentData = results[activeTab] || [];

  return (
    <div className="skcs-app">
      <header className="skcs-header">
        <div className="skcs-title">
          <h1>SKCS Sports Predictions</h1>
          <p>Blended AI + consensus insights across markets</p>
        </div>
      </header>

      <section className="skcs-form">
        <div className="skcs-row">
          <div className="skcs-field">
            <label>Home Team</label>
            <input
              type="text"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              placeholder="e.g., Manchester City"
            />
          </div>
          <div className="skcs-field">
            <label>Away Team</label>
            <input
              type="text"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              placeholder="e.g., Liverpool"
            />
          </div>
          <div className="skcs-field">
            <label>League</label>
            <input
              type="text"
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              placeholder="e.g., Premier League"
            />
          </div>
        </div>

        {errorMsg && <div className="skcs-error">{errorMsg}</div>}

        <div className="skcs-actions">
          <button className="skcs-btn skcs-primary" onClick={fetchPredictions}>
            Predict
          </button>
        </div>
      </section>

      <nav className="skcs-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`skcs-tab ${activeTab === t.key ? "active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="skcs-content">
        {loading && (
          <div className="skcs-loader">
            <ClipLoader color="#2cc5c5" size={48} />
            <p>Fetching {activeTab} predictions...</p>
          </div>
        )}

        {!loading && currentData.length === 0 && (
          <div className="skcs-empty">
            <p>No predictions yet. Enter details and click Predict.</p>
          </div>
        )}

        {!loading && currentData.length > 0 && (
          <div className="skcs-table-wrapper">
            <table className="skcs-table">
              <thead>
                <tr>
                  <th>Outcome</th>
                  <th>Probability</th>
                  <th>Odds</th>
                  <th>Market</th>
                  <th>Suggested Bet</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, idx) => (
                  <tr key={`${activeTab}-${idx}`}>
                    <td>{row.outcome || "-"}</td>
                    <td>
                      {typeof row.probability === "number"
                        ? `${row.probability}%`
                        : row.probability || "-"}
                    </td>
                    <td>{row.odds ?? "-"}</td>
                    <td>{row.market || activeTab}</td>
                    <td>{row.suggestedBet || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="skcs-legend">
              <span className="chip chip-high">High confidence ≥ 70%</span>
              <span className="chip chip-medium">Medium 50–69%</span>
              <span className="chip chip-low">Low &lt; 50%</span>
            </div>
          </div>
        )}
      </main>

      <footer className="skcs-footer">
        <p>© 2025 SKCS Sports Analytics · Pietermaritzburg, KZN</p>
      </footer>
    </div>
  );
}

export default PredictionApp;