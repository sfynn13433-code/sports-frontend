import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "./PredictionApp.css";

// Color coding helper
const getColorForProbability = (p) => {
  if (p >= 70) return "#4caf50"; // high confidence green
  if (p >= 50) return "#ffeb3b"; // medium confidence yellow
  return "#f44336"; // low confidence red
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
        <div key={idx} className="lineup-team">
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

function PredictionApp() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [league, setLeague] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sample makeOversUnders helper for corners & cards
  const makeOversUnders = (values, prefix) => {
    const opts = [];
    values.forEach(v => {
      opts.push({ label: `${prefix} Over ${v}`, probability: 50, confidence: "Medium" });
      opts.push({ label: `${prefix} Under ${v}`, probability: 50, confidence: "Medium" });
    });
    return opts;
  };

  // Full markets definition per your listed 13 market types
  const buildMarkets = () => {
    if (!result) return [];
    const consensus = result.consensus?.probabilities || {win: 0, draw: 0, lose: 0};
    return [
      {
        heading: "✅ 1. 1X2 (Match Result)",
        description: "Most common bet. 1=Home win, X=Draw, 2=Away win",
        options: [
          { label: `1 = ${homeTeam}`, probability: consensus.win, confidence: getConfidence(consensus.win) },
          { label: "X = Draw", probability: consensus.draw, confidence: getConfidence(consensus.draw) },
          { label: `2 = ${awayTeam}`, probability: consensus.lose, confidence: getConfidence(consensus.lose) }
        ]
      },
      {
        heading: "✅ 2. Double Chance",
        description: "Cover two outcomes to reduce risk",
        options: [
          { label: `1X = ${homeTeam} or Draw`, probability: 85, confidence: "High" },
          { label: `X2 = ${awayTeam} or Draw`, probability: 80, confidence: "High" },
          { label: `12 = ${homeTeam} or ${awayTeam} (no draw)`, probability: 75, confidence: "Medium" }
        ]
      },
      {
        heading: "✅ 3. Over / Under Goals",
        description: "Total goals in the match",
        options: [
          { label: "Over 0.5", probability: 92, confidence: "High" },
          { label: "Over 1.5", probability: 78, confidence: "Medium" },
          { label: "Over 2.5", probability: 61, confidence: "Medium" },
          { label: "Under 2.5", probability: 39, confidence: "Low" },
          { label: "Under 3.5", probability: 72, confidence: "Medium" }
        ]
      },
      {
        heading: "✅ 4. Both Teams To Score (BTTS)",
        description: "Will both teams score?",
        options: [
          { label: "Yes", probability: 60, confidence: "Medium" },
          { label: "No", probability: 40, confidence: "Low" }
        ]
      },
      {
        heading: "✅ 5. Correct Score",
        description: "Predict exact final score",
        options: [
          { label: "2–1", probability: 15, confidence: "Low" },
          { label: "1–1", probability: 12, confidence: "Low" },
          { label: "3–0", probability: 10, confidence: "Low" }
        ]
      },
      {
        heading: "✅ 6. Draw No Bet (DNB)",
        description: "Refund on draw",
        options: [
          { label: `DNB Home (${homeTeam})`, probability: 59, confidence: "Medium" },
          { label: `DNB Away (${awayTeam})`, probability: 61, confidence: "Medium" }
        ]
      },
      {
        heading: "✅ 7. Handicap / Asian Handicap",
        description: "Level the playing field with handicaps",
        options: [
          { label: `-1 Handicap (${homeTeam})`, probability: 48, confidence: "Low" },
          { label: `+1 Handicap (${awayTeam})`, probability: 52, confidence: "Medium" }
        ]
      },
      {
        heading: "✅ 8. Corners",
        description: "Betting on corner kicks",
        options: [
          ...makeOversUnders([6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5], "Total Corners"),
          { label: `Home Corners (${homeTeam})`, probability: 55, confidence: "Medium" },
          { label: `Away Corners (${awayTeam})`, probability: 45, confidence: "Low" },
          ...makeOversUnders([3.5, 4.5, 5.5, 6.5], "Halftime Corners")
        ]
      },
      {
        heading: "✅ 9. Cards / Bookings",
        description: "Yellow and red cards bets",
        options: [
          ...makeOversUnders([0.5, 1.5, 2.5, 3.5, 4.5, 6.5, 7.5], "Over Cards"),
          ...makeOversUnders([0.5, 1.5, 2.5, 3.5, 4.5], "Halftime Cards"),
          { label: "Player to get booked", probability: 30, confidence: "Low" }
        ]
      },
      {
        heading: "✅ 10. Goalscorer Bets",
        description: "Who will score?",
        options: [
          { label: `First Goalscorer (e.g. Player A, ${homeTeam})`, probability: 12, confidence: "Low" },
          { label: `Anytime Goalscorer (e.g. Player B, ${awayTeam})`, probability: 35, confidence: "Medium" }
        ]
      },
      {
        heading: "✅ 11. Halftime / Fulltime",
        description: "Results at halftime and fulltime",
        options: [
          { label: `HT/FT: Home / Home (${homeTeam} / ${homeTeam})`, probability: 20, confidence: "Low" },
          { label: `HT/FT: Home / Draw (${homeTeam} / Draw)`, probability: 15, confidence: "Low" },
          { label: `HT/FT: Home / Away (${homeTeam} / ${awayTeam})`, probability: 10, confidence: "Low" },
          { label: `HT/FT: Away / Away (${awayTeam} / ${awayTeam})`, probability: 25, confidence: "Medium" },
          { label: `HT/FT: Away / Draw (${awayTeam} / Draw)`, probability: 12, confidence: "Low" },
          { label: `HT/FT: Draw / Draw`, probability: 18, confidence: "Low" }
        ]
      },
      {
        heading: "✅ 12. Both Teams Score + Result",
        description: "Combo bet: BTTS + result",
        options: [
          { label: "BTTS + Over 2.5", probability: 45, confidence: "Medium" },
          { label: "BTTS + Match Winner", probability: 43, confidence: "Medium" }
        ]
      },
      {
        heading: "✅ 13. Combo / Multibet Markets",
        description: "Combine markets for bigger wins",
        options: [
          { label: `Double Chance (1X) + Over 1.5`, probability: 55, confidence: "Medium" },
          { label: `BTTS + Draw`, probability: 40, confidence: "Low" },
          { label: `Double Chance (X2) + Under 3.5`, probability: 50, confidence: "Medium" }
        ]
      }
    ];
  };

  // Helper for confidence text
  const getConfidence = (p) => {
    if (p >= 70) return "High";
    if (p >= 50) return "Medium";
    return "Low";
  };

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

  const markets = buildMarkets();

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

            {markets.map(({ heading, description, options }, i) => (
              <div key={i} style={{ marginBottom: 30 }}>
                <h3>{heading}</h3>
                {description && <p style={{ fontStyle: "italic", color: "#9ca3af", maxWidth: 600 }}>{description}</p>}
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

export default PredictionApp;
