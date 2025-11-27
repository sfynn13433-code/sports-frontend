export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogoUrl: string;
  awayLogoUrl: string;
  league: string;
  leagueCode: string;
  date: string;
  time: string;
  status: "upcoming" | "live" | "finished";
  prediction: {
    homeWin: number;
    draw: number;
    awayWin: number;
    overUnder25: number;
    suggestedBet: string;
  };
  odds?: {
    home: number;
    draw: number;
    away: number;
  };
  liveScore?: {
    home: number;
    away: number;
  };
}

export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    homeLogoUrl: "🔵",
    awayLogoUrl: "🔴",
    league: "Premier League",
    leagueCode: "PL",
    date: "2024-01-15",
    time: "15:00",
    status: "upcoming",
    prediction: {
      homeWin: 52.3,
      draw: 25.1,
      awayWin: 22.6,
      overUnder25: 68.5,
      suggestedBet: "Home Win",
    },
    odds: {
      home: 1.95,
      draw: 3.40,
      away: 3.80,
    },
  },
  {
    id: "2",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeLogoUrl: "👑",
    awayLogoUrl: "🔵",
    league: "La Liga",
    leagueCode: "LL",
    date: "2024-01-15",
    time: "20:45",
    status: "upcoming",
    prediction: {
      homeWin: 48.7,
      draw: 28.2,
      awayWin: 23.1,
      overUnder25: 72.3,
      suggestedBet: "Home Win",
    },
    odds: {
      home: 2.10,
      draw: 3.20,
      away: 3.65,
    },
  },
  {
    id: "3",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeLogoUrl: "🔴",
    awayLogoUrl: "🟡",
    league: "Bundesliga",
    leagueCode: "BL",
    date: "2024-01-14",
    time: "18:30",
    status: "live",
    prediction: {
      homeWin: 62.5,
      draw: 18.3,
      awayWin: 19.2,
      overUnder25: 65.8,
      suggestedBet: "Over 2.5 Goals",
    },
    odds: {
      home: 1.72,
      draw: 3.80,
      away: 4.50,
    },
    liveScore: {
      home: 2,
      away: 1,
    },
  },
  {
    id: "4",
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    homeLogoUrl: "🔵⚫",
    awayLogoUrl: "🔴⚫",
    league: "Serie A",
    leagueCode: "SA",
    date: "2024-01-14",
    time: "16:00",
    status: "finished",
    prediction: {
      homeWin: 55.2,
      draw: 22.4,
      awayWin: 22.4,
      overUnder25: 71.5,
      suggestedBet: "Home Win",
    },
    odds: {
      home: 1.88,
      draw: 3.50,
      away: 4.00,
    },
    liveScore: {
      home: 2,
      away: 1,
    },
  },
  {
    id: "5",
    homeTeam: "PSG",
    awayTeam: "Lyon",
    homeLogoUrl: "🔴🔵",
    awayLogoUrl: "⚪",
    league: "Ligue 1",
    leagueCode: "L1",
    date: "2024-01-16",
    time: "19:00",
    status: "upcoming",
    prediction: {
      homeWin: 72.1,
      draw: 14.5,
      awayWin: 13.4,
      overUnder25: 59.2,
      suggestedBet: "Home Win",
    },
    odds: {
      home: 1.45,
      draw: 4.20,
      away: 6.50,
    },
  },
  {
    id: "6",
    homeTeam: "Chelsea",
    awayTeam: "Tottenham",
    homeLogoUrl: "🔵",
    awayLogoUrl: "⚪",
    league: "Premier League",
    leagueCode: "PL",
    date: "2024-01-16",
    time: "13:00",
    status: "upcoming",
    prediction: {
      homeWin: 45.8,
      draw: 28.6,
      awayWin: 25.6,
      overUnder25: 68.3,
      suggestedBet: "Over 2.5 Goals",
    },
    odds: {
      home: 2.20,
      draw: 3.30,
      away: 3.40,
    },
  },
  {
    id: "7",
    homeTeam: "Arsenal",
    awayTeam: "Manchester United",
    homeLogoUrl: "🔴⚪",
    awayLogoUrl: "🔴",
    league: "Premier League",
    leagueCode: "PL",
    date: "2024-01-20",
    time: "17:30",
    status: "upcoming",
    prediction: {
      homeWin: 51.2,
      draw: 24.7,
      awayWin: 24.1,
      overUnder25: 66.5,
      suggestedBet: "Home Win",
    },
    odds: {
      home: 2.05,
      draw: 3.35,
      away: 3.75,
    },
  },
  {
    id: "8",
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    homeLogoUrl: "🔴⚪",
    awayLogoUrl: "🔴",
    league: "La Liga",
    leagueCode: "LL",
    date: "2024-01-17",
    time: "20:00",
    status: "upcoming",
    prediction: {
      homeWin: 58.9,
      draw: 20.3,
      awayWin: 20.8,
      overUnder25: 62.7,
      suggestedBet: "Home Win",
    },
    odds: {
      home: 1.82,
      draw: 3.60,
      away: 4.20,
    },
  },
];

export const leaguesInfo = [
  {
    code: "PL",
    name: "Premier League",
    country: "England",
    accuracy: "87.3%",
    totalMatches: 1847,
  },
  {
    code: "LL",
    name: "La Liga",
    country: "Spain",
    accuracy: "85.9%",
    totalMatches: 1652,
  },
  {
    code: "SA",
    name: "Serie A",
    country: "Italy",
    accuracy: "84.2%",
    totalMatches: 1523,
  },
  {
    code: "BL",
    name: "Bundesliga",
    country: "Germany",
    accuracy: "86.1%",
    totalMatches: 1734,
  },
  {
    code: "L1",
    name: "Ligue 1",
    country: "France",
    accuracy: "83.5%",
    totalMatches: 1456,
  },
  {
    code: "UCL",
    name: "UEFA Champions League",
    country: "Europe",
    accuracy: "88.7%",
    totalMatches: 821,
  },
];
