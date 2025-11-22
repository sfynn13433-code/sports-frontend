import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./PredictionApp.css";

// Helper for probability colors
const getColorForProbability = (p) => {
  if (p >= 70) return "#4caf50";
  if (p >= 50) return "#ffeb3b";
  return "#f44336";
};

function MatchInfo({ match, kickoff, venue }) {
  return (
    <div className="match-info">
      {match && <h3>{match}</h3>}
      {kickoff && <p><strong>Kickoff:</strong> {new Date(kickoff).toLocaleString()}</p>}
      {venue && <p><strong>Venue:</strong> {venue}</p>}
    </div>
  );
}

function StatsList({ stats }) {
  if (!stats || !stats.length) return null;
  return (
    <div className="stats-list">
      <h4>Stats</h4>
      <ul>
        {stats.map((stat, idx) => (
          <li key={idx}>{stat.type}: {stat.home} - {stat.away}</li>
        ))}
      </ul>
    </div>
  );
}

function EventsList({ events }) {
  if (!events || !events.length) return null;
  return (
    <div className="events-list">
      <h4>Events</h4>
      <ul>
        {events.map((event, idx) => (
          <li key={idx}>
            {event.time.elapsed}' {event.type} - {event.player.name} ({event.team.name})
          </li>
        ))}
      </ul>
    </div>
  );
}

function Lineups({ lineups }) {
  if (!lineups || !lineups.length) return null;
  return (
    <div className="lineups">
      <h4>Lineups</h4>
      {lineups.map((team, idx) => (
        <div key={idx}>
          <strong>{team.team.name}</strong>
          <ul>
            {team.startXI.map((player, pidx) => (
              <li key={pidx}>{player.player.name} ({player.position})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function PredictionApp() {
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

      <form className="skcs-form" onSubmit={handleSubmit}>
        <div className="skcs-row">
          <div className="skcs-field">
            <label>Home Team</label>
            <input type="text" value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} required/>
          </div>
          <div className="skcs-field">
            <label>Away Team</label>
            <input type="text" value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} required/>
          </div>
          <div className="skcs-field">
            <label>League</label>
            <input type="text" value={league} onChange={(e) => setLeague(e.target.value)} required/>
          </div>
        </div>
        <div className="skcs-actions">
          <button type="submit" className="skcs-btn skcs-primary">Get Prediction</button>
        </div>
        {error && <div className="skcs-error">{error}</div>}
      </form>

      <div className="skcs-content">
        {loading && (
          <div className="skcs-loader">
            <ClipLoader color="#10b981" size={40} />
            <p>Fetching prediction...</p>
          </div>
        )}

        {!loading && result && (
          <>
            <MatchInfo match={result.match} kickoff={result.kickoff} venue={result.venue} />
            <StatsList stats={result.stats} />
            <EventsList events={result.events} />
            <Lineups lineups={result.lineups} />

            {result.consensus && <p><strong>Consensus:</strong> {result.consensus.rationale}</p>}

            {result.markets && result.markets.map(({heading, options}, i) => (
              <div key={i} style={{marginBottom: 30}}>
                <h3>{heading}</h3>
                <ul style={{listStyle: "none", paddingLeft: 0}}>
                  {options.map(({label, probability, confidence}, j) => (
                    <li key={j} style={{
                      display:"flex",
                      justifyContent:"space-between",
                      maxWidth: 400,
                      backgroundColor: getColorForProbability(probability),
                      padding: "8px 12px",
                      marginBottom: 5,
                      borderRadius: 4,
                      color: confidence === "Low" ? "#fff" : "#000",
                      fontWeight: "bold",
                    }} title={`Confidence: ${confidence}`}>
                      <span>{label}</span><span>{probability}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {result.expert_notes && <p><strong>Notes:</strong> {result.expert_notes}</p>}
          </>
        )}

        {!loading && !result && (
          <div className="skcs-empty">Enter match details above to see predictions.</div>
        )}
      </div>

      <div className="skcs-confidence-panel">
        <span className="chip chip-high">High Confidence</span>
        <span className="chip chip-medium">Medium Confidence</span>
        <span className="chip chip-low">Low Confidence</span>
        <span className="chip chip-none">No Confidence</span>
      </div>

      <div className="skcs-footer">© 2025 SKCS Sports Predictions. All rights reserved.</div>
    </div>
  );
}
