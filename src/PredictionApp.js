import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import "./PredictionApp.css";

function PredictionApp() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [league, setLeague] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.get("http://localhost:5000/predict", {
        params: { home: homeTeam, away: awayTeam, league: league },
      });
      setPrediction(response.data);
    } catch (err) {
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const renderTable = (title, data) => {
    if (!data || typeof data !== "object") return null;
    return (
      <div style={{ marginBottom: "30px" }}>
        <h3>{title}</h3>
        <table>
          <thead>
            <tr>
              <th>Line</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([line, prob]) => (
              <tr key={line}>
                <td>{line}</td>
                <td>{prob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const tabs = [
    "All",
    "Popular",
    "Winner",
    "Bookings",
    "Goals",
    "Halves",
    "Corners",
    "Scores",
    "Handicaps",
    "Teams",
    "Player Specials",
    "Combos",
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, Arial" }}>
      <h1>Sports Prediction App</h1>

      <button onClick={toggleDarkMode} className="mode-toggle">
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div>
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
        <button onClick={handlePredict}>Predict</button>
      </div>

      {loading && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <ClipLoader color="#2980b9" size={50} />
          <p>Fetching prediction...</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {prediction && (
        <div>
          <h2>Prediction Result</h2>
          <p style={{ fontStyle: "italic", color: "#888" }}>
            Source: {prediction.source}
          </p>

          <div className="tab-bar">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-button ${selectedTab === tab ? "active" : ""}`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {selectedTab === "All" && (
            <>
              {renderTable("Winner (Fulltime Result)", {
                "Home Win": prediction.all.fulltime_result[0].probability,
                "Draw": prediction.all.fulltime_result[1].probability,
                "Away Win": prediction.all.fulltime_result[2].probability,
              })}
              {renderTable("Goals (Over/Under)", prediction.all.over_under_goals)}
              {renderTable("Corners", prediction.all.corners)}
              {renderTable("Cards", prediction.all.cards)}
              {renderTable("Handicap", prediction.all.handicap)}
              <div style={{ marginBottom: "30px" }}>
                <h3>Scorers</h3>
                <ul>
                  {prediction.all.scorers.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <p>Halftime/Fulltime: {prediction.all.halftime_fulltime}</p>
            </>
          )}

          {selectedTab === "Popular" && (
            <>
              <h3>Popular Markets</h3>
              <p>Double Chance: {prediction.popular.double_chance}</p>
              <p>Double Chance + BTTS: {prediction.popular.double_chance_btts}</p>
              <p>Over 2.5 Goals: {prediction.popular.over_2_5_goals}</p>
              <p>BTTS: {prediction.popular.btts}</p>
            </>
          )}

          {selectedTab === "Winner" && (
            <>
              {renderTable("Winner (Fulltime Result)", {
                "Home Win": prediction.all.fulltime_result[0].probability,
                "Draw": prediction.all.fulltime_result[1].probability,
                "Away Win": prediction.all.fulltime_result[2].probability,
              })}
              <p>Halftime/Fulltime: {prediction.winner.halftime_fulltime}</p>
              <p>Double Chance: {prediction.winner.double_chance.join(", ")}</p>
            </>
          )}

          {selectedTab === "Bookings" && (
            <>
              {renderTable("Bookings (Halftime)", prediction.bookings.halftime)}
              {renderTable("Bookings (Fulltime)", prediction.bookings.fulltime)}
              <div style={{ marginBottom: "30px" }}>
                <h3>Player Cards</h3>
                <ul>
                  {prediction.bookings.player_cards.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {selectedTab === "Goals" && (
            <>
              {renderTable("Goals (Over/Under)", prediction.goals.over_under)}
              {renderTable("Team Goals", prediction.goals.team_goals)}
              {renderTable("Exact Goals", prediction.goals.exact_goals)}
              <p>BTTS: {prediction.goals.btts}</p>
            </>
          )}

          {selectedTab === "Halves" && (
            <>
              <p>Halftime Result: {prediction.halves.halftime_result}</p>
              <p>Second Half Result: {prediction.halves.second_half_result}</p>
              {renderTable("Halftime Goals", prediction.halves.halftime_goals)}
            </>
          )}

          {selectedTab === "Corners" && (
            <>
              {renderTable("Total Corners", prediction.corners.total)}
              {renderTable("Team Corners", prediction.corners.team)}
              {renderTable("Corner Handicap", prediction.corners.handicap)}
            </>
          )}

          {selectedTab === "Scores" && (
            <>
              <h3>Correct Scores</h3>
              <ul>
                {prediction.scores.correct_score.map((score, idx) => (
                  <li key={idx}>{score}</li>
                ))}
              </ul>
              <p>Scorecast: {prediction.scores.scorecast}</p>
              <p>Multiscore: {prediction.scores.multiscore}</p>
            </>
          )}

          {selectedTab === "Handicaps" && (
            <>
              {renderTable("Asian Handicap", prediction.handicaps.asian)}
              {renderTable("European Handicap", prediction.handicaps.european)}
            </>
          )}

          {selectedTab === "Teams" && (
            <>
              <h3>Team Specials</h3>
              <ul>
                {prediction.teams.specials.map((special, idx) => (
                  <li key={idx}>{special}</li>
                ))}
              </ul>
              {renderTable("Team Totals", prediction.teams.totals)}
              {renderTable("Clean Sheets", prediction.teams.clean_sheet)}
            </>
          )}

          {selectedTab === "Player Specials" && (
            <>
              <h3>Player Specials</h3>
              <ul>
                {prediction.player_specials.anytime_scorer.map((player, idx) => (
                  <li key={idx}>{player}</li>
                ))}
              </ul>
              <p>First Scorer: {prediction.player_specials.first_scorer}</p>
              <p>Last Scorer: {prediction.player_specials.last_scorer}</p>
              <div style={{ marginBottom: "30px" }}>
                <h3>Player Cards</h3>
                <ul>
                  {prediction.player_specials.player_cards.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {selectedTab === "Combos" && (
            <>
              <h3>Combos</h3>
              <ul>
                {Object.entries(prediction.combos).map(([combo, desc]) => (
                  <li key={combo}>{desc}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PredictionApp;