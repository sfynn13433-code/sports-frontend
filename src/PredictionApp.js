import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./PredictionApp.css";

function PredictionApp() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [league, setLeague] = useState("");
  const [result, setResult] = useState({ predictions: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://sports-backend-8bvf.onrender.com/predict",
        {
          homeTeam,
          awayTeam,
          league,
        }
      );
      setResult({
        predictions: response.data.predictions || [],
      });
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skcs-app">
      {/* Hero Banner */}
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

        {!loading && result && Array.isArray(result.predictions) && (
          <div className="skcs-table-wrapper">
            <table className="skcs-table">
              <thead>
                <tr>
                  <th>Market</th>
                  <th>Probability</th>
                  <th>Confidence</th>
                  <th>Rationale</th>
                </tr>
              </thead>
              <tbody>
                {result.predictions.map((prediction, index) => (
                  <tr key={index}>
                    <td>{prediction.market}</td>
                    <td>{prediction.probability}%</td>
                    <td>
                      <span
                        className={`confidence-${prediction.confidence.toLowerCase()}`}
                      >
                        {prediction.confidence}
                      </span>
                    </td>
                    <td>{prediction.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
