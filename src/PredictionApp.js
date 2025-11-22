import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./PredictionApp.css";

// Color coding helper for probabilities
const getColorForProbability = (p) => {
  if (p >= 70) return "#4caf50"; // green high
  if (p >= 50) return "#ffeb3b"; // yellow medium
  return "#f44336"; // red low
};

function PredictionApp() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [league, setLeague] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await axios.post(
        "https://sports-backend-8bvf.onrender.com/predict",
        { homeTeam, awayTeam, league }
      );
      setResult(response.data);
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skcs-app">
      <div className="skcs-hero-banner">
        <img src="/image/skcs-hero.png" alt="SKCS Sports Predictions" />
        <h1>AI-powered insights. Expert-backed predictions.</h1>
      </div>

      {/* Form Section */}
      <form className="skcs-form" onSubmit={handleSubmit}>
        <div className="skcs-row">
          <div className="skcs-field">
            <label>Home Team</label>
            <input
              type="text"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              required
            />
          </div>
          <div className="skcs-field">
            <label>Away Team</label>
            <input
              type="text"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              required
            />
          </div>
          <div className="skcs-field">
            <label>League</label>
            <input
              type="text"
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="skcs-actions">
          <button type="submit" className="skcs-btn skcs-primary">
            Get Prediction
          </button>
        </div>
        {error && <div className="skcs-error">{error}</div>}
      </form>

      {/* Content Section */}
      <div className="skcs-content">
        {loading && (
          <div className="skcs-loader">
            <ClipLoader color="#10b981" size={40} />
            <p>Fetching prediction...</p>
          </div>
        )}

        {!loading && result && (
          <div className="skcs-result">
            {result.match && <h3>{result.match}</h3>}
            {result.consensus && (
              <p>
                <strong>Consensus:</strong> {result.consensus.rationale}
              </p>
            )}

            {result.markets && result.markets.map(({ heading, options }, i) => (
              <div key={i} style={{ marginBottom: 30 }}>
                <h3>{heading}</h3>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {options.map(({ label, probability, confidence }, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: 400,
                        backgroundColor: getColorForProbability(probability),
                        padding: "8px 12px",
                        marginBottom: 5,
                        borderRadius: 4,
                        color: confidence === "Low" ? "#fff" : "#000",
                        fontWeight: "bold",
                      }}
                      title={`Confidence: ${confidence}`}
                    >
                      <span>{label}</span>
                      <span>{probability}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {result.expert_notes && (
              <p><strong>Notes:</strong> {result.expert_notes}</p>
            )}
          </div>
        )}

        {!loading && !result && (
          <div className="skcs-empty">
            Enter match details above to see predictions.
          </div>
        )}
      </div>

      {/* Confidence Legend Panel */}
      <div className="skcs-confidence-panel">
        <span className="chip chip-high">High Confidence</span>
        <span className="chip chip-medium">Medium Confidence</span>
        <span className="chip chip-low">Low Confidence</span>
        <span className="chip chip-none">No Confidence</span>
      </div>

      {/* Footer */}
      <div className="skcs-footer">
        © 2025 SKCS Sports Predictions. All rights reserved.
      </div>
    </div>
  );
}

export default PredictionApp;
