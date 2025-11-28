export interface PredictionType {
  code: string;
  name: string;
  category: string;
  description: string;
}

export interface SportMatch {
  id: string;
  sport: string;
  sportCode: string;
  league: string;
  leagueCode: string;
  country: string;
  homeTeam: string;
  awayTeam: string;
  homeLogoUrl: string;
  awayLogoUrl: string;
  date: string;
  time: string;
  status: "upcoming" | "live" | "finished";
  predictions: {
    type: string;
    homeWin?: number;
    awayWin?: number;
    draw?: number;
    over25?: number;
    under25?: number;
    btts?: number;
    homeScore?: number;
    awayScore?: number;
    correctScore?: { [key: string]: number };
    odds?: { [key: string]: number };
    suggestedBet: string;
    confidence: number;
  }[];
  liveScore?: { home: number; away: number };
}

// ==================== PREDICTION TYPES BY SPORT ====================

export const PREDICTION_TYPES: Record<string, PredictionType[]> = {
  football: [
    { code: "1x2", name: "Full-Time Result (1X2)", category: "Main Bets", description: "Home Win / Draw / Away Win" },
    { code: "ht_ft", name: "Half-Time/Full-Time Result", category: "Main Bets", description: "Combine HT & FT outcomes" },
    { code: "btts", name: "Both Teams to Score", category: "Goals", description: "Yes / No" },
    { code: "o25", name: "Over/Under 2.5 Goals", category: "Goals", description: "Total goals in match" },
    { code: "cs", name: "Correct Score", category: "Specific", description: "Exact final score" },
    { code: "fts", name: "First Team to Score", category: "In-Match", description: "Which team scores first" },
    { code: "lts", name: "Last Team to Score", category: "In-Match", description: "Which team scores last" },
    { code: "hcp", name: "Asian Handicap", category: "Advanced", description: "Goal handicap betting" },
    { code: "dc", name: "Double Chance", category: "Main Bets", description: "1X / 12 / X2" },
  ],
  rugby: [
    { code: "1x2", name: "Full-Time Result (1X2)", category: "Main Bets", description: "Home Win / Draw / Away Win" },
    { code: "ht_ft", name: "Half-Time/Full-Time Result", category: "Main Bets", description: "Combine HT & FT outcomes" },
    { code: "o25", name: "Over/Under 24.5 Points", category: "Points", description: "Total points in match" },
    { code: "hcp", name: "Handicap", category: "Advanced", description: "Points handicap betting" },
    { code: "ftry", name: "First Try Scorer", category: "In-Match", description: "Which player scores first try" },
    { code: "tries", name: "Total Tries", category: "Points", description: "Over/Under number of tries" },
    { code: "htwinner", name: "Half-Time Winner", category: "Main Bets", description: "HT result" },
  ],
  tennis: [
    { code: "match", name: "Match Winner", category: "Main Bets", description: "Who wins the match" },
    { code: "set", name: "Set Winner", category: "Sets", description: "Specific set outcome" },
    { code: "cs", name: "Correct Set Score", category: "Specific", description: "Exact match set score" },
    { code: "tb", name: "Tie-Break in Match", category: "In-Match", description: "Yes / No" },
    { code: "games", name: "Total Games", category: "Points", description: "Over/Under total games" },
    { code: "o15", name: "Over/Under 15 Games", category: "Points", description: "Match duration" },
  ],
  snooker: [
    { code: "match", name: "Match Winner", category: "Main Bets", description: "Who wins the match" },
    { code: "frame", name: "Frame Winner", category: "Frames", description: "Specific frame outcome" },
    { code: "cs", name: "Correct Frame Score", category: "Specific", description: "Exact frame score" },
    { code: "hb", name: "Highest Break", category: "Player Stats", description: "Who makes highest break" },
    { code: "century", name: "Century Break", category: "In-Match", description: "Yes / No" },
    { code: "frames", name: "Total Frames", category: "Structure", description: "Match frame total" },
  ],
  "ice hockey": [
    { code: "1x2", name: "Full-Time Result (1X2)", category: "Main Bets", description: "Home Win / Draw / Away Win" },
    { code: "o25", name: "Over/Under 5.5 Goals", category: "Goals", description: "Total goals in match" },
    { code: "period", name: "Period Result", category: "In-Match", description: "Winner of specific period" },
    { code: "hcp", name: "Puck Line", category: "Advanced", description: "Goal spread betting" },
    { code: "fts", name: "First Goal Scorer", category: "In-Match", description: "Which player scores first" },
    { code: "gwg", name: "Game Winning Goal Scorer", category: "In-Match", description: "Who scores GWG" },
  ],
  basketball: [
    { code: "1x2", name: "Full-Time Result (1X2)", category: "Main Bets", description: "Home Win / Away Win" },
    { code: "spread", name: "Point Spread", category: "Advanced", description: "Win by X points" },
    { code: "o_u", name: "Over/Under Points", category: "Points", description: "Total points in match" },
    { code: "ht_ft", name: "Half-Time/Full-Time Result", category: "Main Bets", description: "Combine HT & FT" },
    { code: "q", name: "Quarter Winner", category: "In-Match", description: "Specific quarter winner" },
    { code: "player", name: "Player Props", category: "Player Stats", description: "Individual player stats" },
  ],
};

export const SPORTS = [
  { code: "football", name: "Football", emoji: "⚽", color: "from-green-600 to-green-700" },
  { code: "rugby", name: "Rugby", emoji: "🏈", color: "from-orange-600 to-orange-700" },
  { code: "tennis", name: "Tennis", emoji: "🎾", color: "from-yellow-600 to-yellow-700" },
  { code: "snooker", name: "Snooker", emoji: "🎱", color: "from-red-600 to-red-700" },
  { code: "ice hockey", name: "Ice Hockey", emoji: "🏒", color: "from-blue-600 to-blue-700" },
  { code: "basketball", name: "Basketball", emoji: "🏀", color: "from-orange-500 to-orange-600" },
];

// ==================== SAMPLE MATCHES (MULTI-SPORT) ====================

const generateDates = () => {
  const dates: string[] = [];
  const today = new Date("2024-01-14");
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const dates = generateDates();

const footballMatches: SportMatch[] = [
  {
    id: "fb-1",
    sport: "Football",
    sportCode: "football",
    league: "Premier League",
    leagueCode: "PL",
    country: "England",
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    homeLogoUrl: "🔵",
    awayLogoUrl: "🔴",
    date: dates[0],
    time: "15:00",
    status: "upcoming",
    predictions: [
      {
        type: "1x2",
        homeWin: 52.3,
        draw: 25.1,
        awayWin: 22.6,
        odds: { home: 1.95, draw: 3.40, away: 3.80 },
        suggestedBet: "Home Win",
        confidence: 85,
      },
      {
        type: "btts",
        btts: 68.5,
        odds: { yes: 1.85, no: 2.10 },
        suggestedBet: "Yes",
        confidence: 78,
      },
      {
        type: "o25",
        over25: 68.5,
        odds: { over: 1.88, under: 2.05 },
        suggestedBet: "Over 2.5",
        confidence: 82,
      },
      {
        type: "cs",
        correctScore: { "2-1": 12.5, "2-0": 9.3, "1-1": 8.2, "1-0": 7.5 },
        suggestedBet: "2-1",
        confidence: 72,
      },
    ],
  },
  {
    id: "fb-2",
    sport: "Football",
    sportCode: "football",
    league: "La Liga",
    leagueCode: "LL",
    country: "Spain",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeLogoUrl: "👑",
    awayLogoUrl: "🔵",
    date: dates[1],
    time: "20:45",
    status: "upcoming",
    predictions: [
      {
        type: "1x2",
        homeWin: 48.7,
        draw: 28.2,
        awayWin: 23.1,
        odds: { home: 2.10, draw: 3.20, away: 3.65 },
        suggestedBet: "Draw",
        confidence: 80,
      },
      {
        type: "btts",
        btts: 72.3,
        odds: { yes: 1.82, no: 2.15 },
        suggestedBet: "Yes",
        confidence: 81,
      },
    ],
  },
];

const rugbyMatches: SportMatch[] = [
  {
    id: "rb-1",
    sport: "Rugby",
    sportCode: "rugby",
    league: "Six Nations",
    leagueCode: "6N",
    country: "Europe",
    homeTeam: "England",
    awayTeam: "France",
    homeLogoUrl: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    awayLogoUrl: "🇫🇷",
    date: dates[0],
    time: "14:30",
    status: "upcoming",
    predictions: [
      {
        type: "1x2",
        homeWin: 42.5,
        draw: 8.3,
        awayWin: 49.2,
        odds: { home: 2.30, draw: 15.0, away: 1.75 },
        suggestedBet: "Away Win",
        confidence: 83,
      },
      {
        type: "o25",
        over25: 65.4,
        odds: { over: 1.90, under: 2.00 },
        suggestedBet: "Over 24.5",
        confidence: 79,
      },
    ],
  },
];

const tennisMatches: SportMatch[] = [
  {
    id: "tn-1",
    sport: "Tennis",
    sportCode: "tennis",
    league: "Australian Open",
    leagueCode: "AO",
    country: "Australia",
    homeTeam: "Novak Djokovic",
    awayTeam: "Carlos Alcaraz",
    homeLogoUrl: "🇷🇸",
    awayLogoUrl: "🇪🇸",
    date: dates[2],
    time: "10:00",
    status: "upcoming",
    predictions: [
      {
        type: "match",
        homeWin: 38.2,
        awayWin: 61.8,
        odds: { home: 2.45, away: 1.65 },
        suggestedBet: "Away Win",
        confidence: 86,
      },
      {
        type: "set",
        correctScore: { "2-0": 35.5, "2-1": 45.2, "0-2": 19.3 },
        suggestedBet: "2-1",
        confidence: 74,
      },
    ],
  },
];

const snookerMatches: SportMatch[] = [
  {
    id: "sn-1",
    sport: "Snooker",
    sportCode: "snooker",
    league: "UK Championship",
    leagueCode: "UK",
    country: "England",
    homeTeam: "Ronnie O'Sullivan",
    awayTeam: "Mark Selby",
    homeLogoUrl: "🇬🇧",
    awayLogoUrl: "🇬🇧",
    date: dates[1],
    time: "13:00",
    status: "upcoming",
    predictions: [
      {
        type: "match",
        homeWin: 55.3,
        awayWin: 44.7,
        odds: { home: 1.95, away: 2.05 },
        suggestedBet: "Home Win",
        confidence: 81,
      },
      {
        type: "frame",
        correctScore: { "6-3": 22.5, "6-4": 18.3, "6-2": 15.7, "5-6": 28.5 },
        suggestedBet: "5-6",
        confidence: 76,
      },
    ],
  },
];

const hockeyMatches: SportMatch[] = [
  {
    id: "hk-1",
    sport: "Ice Hockey",
    sportCode: "ice hockey",
    league: "NHL",
    leagueCode: "NHL",
    country: "USA",
    homeTeam: "Colorado Avalanche",
    awayTeam: "New York Rangers",
    homeLogoUrl: "🇺🇸",
    awayLogoUrl: "🇺🇸",
    date: dates[0],
    time: "22:00",
    status: "upcoming",
    predictions: [
      {
        type: "1x2",
        homeWin: 51.6,
        draw: 5.2,
        awayWin: 43.2,
        odds: { home: 1.98, draw: 8.50, away: 2.05 },
        suggestedBet: "Home Win",
        confidence: 79,
      },
      {
        type: "o25",
        over25: 62.3,
        odds: { over: 1.92, under: 2.02 },
        suggestedBet: "Over 5.5",
        confidence: 77,
      },
    ],
  },
];

const basketballMatches: SportMatch[] = [
  {
    id: "bk-1",
    sport: "Basketball",
    sportCode: "basketball",
    league: "NBA",
    leagueCode: "NBA",
    country: "USA",
    homeTeam: "Los Angeles Lakers",
    awayTeam: "Boston Celtics",
    homeLogoUrl: "���🇸",
    awayLogoUrl: "🇺🇸",
    date: dates[3],
    time: "22:30",
    status: "upcoming",
    predictions: [
      {
        type: "1x2",
        homeWin: 49.2,
        awayWin: 50.8,
        odds: { home: 2.05, away: 1.95 },
        suggestedBet: "Away Win",
        confidence: 82,
      },
      {
        type: "spread",
        homeWin: 48.3,
        awayWin: 51.7,
        odds: { home: 1.88, away: 2.10 },
        suggestedBet: "Away -2.5",
        confidence: 80,
      },
      {
        type: "o_u",
        over25: 64.5,
        odds: { over: 1.92, under: 2.00 },
        suggestedBet: "Over 210.5",
        confidence: 78,
      },
    ],
  },
];

export const allSportMatches: SportMatch[] = [
  ...footballMatches,
  ...rugbyMatches,
  ...tennisMatches,
  ...snookerMatches,
  ...hockeyMatches,
  ...basketballMatches,
];

// Add more sample matches for each sport to reach ~10 per sport
const addMoreMatches = () => {
  const additionalFootball: SportMatch[] = [
    {
      id: "fb-3",
      sport: "Football",
      sportCode: "football",
      league: "Bundesliga",
      leagueCode: "BL",
      country: "Germany",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      homeLogoUrl: "🔴",
      awayLogoUrl: "🟡",
      date: dates[2],
      time: "18:30",
      status: "live",
      liveScore: { home: 2, away: 1 },
      predictions: [
        {
          type: "1x2",
          homeWin: 62.5,
          draw: 18.3,
          awayWin: 19.2,
          odds: { home: 1.72, draw: 3.80, away: 4.50 },
          suggestedBet: "Over 2.5 Goals",
          confidence: 87,
        },
      ],
    },
    {
      id: "fb-4",
      sport: "Football",
      sportCode: "football",
      league: "Serie A",
      leagueCode: "SA",
      country: "Italy",
      homeTeam: "Inter Milan",
      awayTeam: "AC Milan",
      homeLogoUrl: "🔵⚫",
      awayLogoUrl: "🔴⚫",
      date: dates[4],
      time: "20:45",
      status: "upcoming",
      predictions: [
        {
          type: "1x2",
          homeWin: 55.2,
          draw: 22.4,
          awayWin: 22.4,
          odds: { home: 1.88, draw: 3.50, away: 4.00 },
          suggestedBet: "Home Win",
          confidence: 84,
        },
      ],
    },
  ];

  const additionalRugby: SportMatch[] = [
    {
      id: "rb-2",
      sport: "Rugby",
      sportCode: "rugby",
      league: "Top 14",
      leagueCode: "T14",
      country: "France",
      homeTeam: "Toulouse",
      awayTeam: "Stade Français",
      homeLogoUrl: "🇫🇷",
      awayLogoUrl: "🇫🇷",
      date: dates[1],
      time: "20:45",
      status: "upcoming",
      predictions: [
        {
          type: "1x2",
          homeWin: 65.3,
          draw: 6.2,
          awayWin: 28.5,
          odds: { home: 1.65, draw: 12.0, away: 2.40 },
          suggestedBet: "Home Win",
          confidence: 86,
        },
      ],
    },
  ];

  const additionalTennis: SportMatch[] = [
    {
      id: "tn-2",
      sport: "Tennis",
      sportCode: "tennis",
      league: "Wimbledon",
      leagueCode: "W",
      country: "England",
      homeTeam: "Jannik Sinner",
      awayTeam: "Daniil Medvedev",
      homeLogoUrl: "🇮🇹",
      awayLogoUrl: "🇷🇺",
      date: dates[5],
      time: "14:00",
      status: "upcoming",
      predictions: [
        {
          type: "match",
          homeWin: 58.4,
          awayWin: 41.6,
          odds: { home: 1.82, away: 2.15 },
          suggestedBet: "Home Win",
          confidence: 83,
        },
      ],
    },
  ];

  const additionalSnooker: SportMatch[] = [
    {
      id: "sn-2",
      sport: "Snooker",
      sportCode: "snooker",
      league: "World Championship",
      leagueCode: "WC",
      country: "England",
      homeTeam: "Luca Brecel",
      awayTeam: "Barry Hawkins",
      homeLogoUrl: "🇧🇪",
      awayLogoUrl: "🇬🇧",
      date: dates[3],
      time: "14:30",
      status: "upcoming",
      predictions: [
        {
          type: "match",
          homeWin: 61.2,
          awayWin: 38.8,
          odds: { home: 1.78, away: 2.25 },
          suggestedBet: "Home Win",
          confidence: 82,
        },
      ],
    },
  ];

  const additionalHockey: SportMatch[] = [
    {
      id: "hk-2",
      sport: "Ice Hockey",
      sportCode: "ice hockey",
      league: "NHL",
      leagueCode: "NHL",
      country: "USA",
      homeTeam: "Vegas Golden Knights",
      awayTeam: "Dallas Stars",
      homeLogoUrl: "🇺🇸",
      awayLogoUrl: "🇺🇸",
      date: dates[2],
      time: "21:30",
      status: "upcoming",
      predictions: [
        {
          type: "1x2",
          homeWin: 48.3,
          draw: 3.8,
          awayWin: 47.9,
          odds: { home: 2.08, draw: 9.50, away: 1.92 },
          suggestedBet: "Away Win",
          confidence: 80,
        },
      ],
    },
  ];

  const additionalBasketball: SportMatch[] = [
    {
      id: "bk-2",
      sport: "Basketball",
      sportCode: "basketball",
      league: "NBA",
      leagueCode: "NBA",
      country: "USA",
      homeTeam: "Golden State Warriors",
      awayTeam: "Denver Nuggets",
      homeLogoUrl: "🇺🇸",
      awayLogoUrl: "🇺🇸",
      date: dates[4],
      time: "19:30",
      status: "upcoming",
      predictions: [
        {
          type: "1x2",
          homeWin: 45.6,
          awayWin: 54.4,
          odds: { home: 2.18, away: 1.82 },
          suggestedBet: "Away Win",
          confidence: 81,
        },
      ],
    },
  ];

  return [
    ...additionalFootball,
    ...additionalRugby,
    ...additionalTennis,
    ...additionalSnooker,
    ...additionalHockey,
    ...additionalBasketball,
  ];
};

export const sportsMatches = [...allSportMatches, ...addMoreMatches()];
