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
  { key: "fulltime", label: "Full Time" },
  { key: "doubleChance", label: "Double Chance" },
  { key: "combos", label: "Combos" },
  { key: "legend", label: "Legend" },
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
    combos: [],
    legend: {},
    expert_notes: [],
    methodology: "",
    confidence_scale: "",
    all: {
      fulltime_result: [],
      double_chance: {},
    },
  });

  const apiUrl = "https://sports-backend-8bvf.onrender.com";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/predict`, {
        homeTeam,
        awayTeam,
        league,
      });
      setResults(response.data);
    } catch (error) {
      setErrorMsg("Error fetching prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceClass = (probability) => {
    const value = parseFloat(probability);
    if (isNaN(value)) return "confidence-none";
    if (value >= 70) return "confidence-high";
    if (value >= 50) return "confidence-medium";
    return "confidence-low";
  };

  const renderTable = (data) => (
    <table>
      <thead>
        <tr>
          <th>Outcome</th>
          <th>Probability</th>
          <th>Odds</th>
          <th>Market</th>
          <th>Suggestion</th>
          <th>Rationale</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.outcome}</td>
            <td className={getConfidenceClass(item.probability)}>{item.probability}</td>
            <td>{item.odds}</td>
            <td>{item.market}</td>
            <td>{item.suggestion}</td>
            <td>{item.rationale}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderDoubleChance = (dc) => (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Probability</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(dc).map(([key, value], idx) => (
          <tr key={idx}>
            <td>{key}</td>
            <td className={getConfidenceClass(value)}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderLegend = (legend) => (
    <div className="legend">
      {Object.entries(legend).map(([key, value], idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <h4>{key.replace(/_/g, " ").toUpperCase()}</h4>
          <p><strong>Description:</strong> {value.description}</p>
          {value.outcomes && (
            <p><strong>Outcomes:</strong> {value.outcomes.join(", ")}</p>
          )}
          {value.example && (
            <p><strong>Example:</strong> {value.example}</p>
          )}
        </div>
      ))}
    </div>
  );

  const renderExpertSummary = () => (
    <div className="expert-summary">
      <h3>Prediction Methodology</h3>
      <p>{results.methodology}</p>
      <h4>Confidence Scale</h4>
      <p>{results.confidence_scale}</p>
      {results.expert_notes.length > 0 && (
        <div>
          <h4>Expert Notes</h4>
          <ul>
            {results.expert_notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="prediction-app">
      <h2>SKCS Sports Predictions</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="League"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
        />
        <button type="submit">Predict</button>
      </form>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {loading && <ClipLoader color="#36d7b7" />}

      {!loading && results && (
        <div>
          {renderExpertSummary()}

          <div className="tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={activeTab === tab.key ? "active" : ""}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === "goals" && renderTable(results.goals)}
            {activeTab === "halftime" && renderTable(results.halftime)}
            {activeTab === "corners" && renderTable(results.corners)}
            {activeTab === "cards" && renderTable(results.cards)}
            {activeTab === "handicaps" && renderTable(results.handicaps)}
            {activeTab === "fulltime" && renderTable(results.all.fulltime_result)}
            {activeTab === "doubleChance" && renderDoubleChance(results.all.double_chance)}
            {activeTab === "combos" && renderTable(results.combos)}
            {activeTab === "legend" && renderLegend(results.legend)}
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionApp;