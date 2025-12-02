export interface Sport {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  route?: string;
}

export const SPORTS: Sport[] = [
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    enabled: true,
    route: "/sports/football",
  },
  {
    id: "rugby",
    name: "Rugby",
    icon: "🏉",
    enabled: true,
    route: "/sports/rugby",
  },
  {
    id: "tennis",
    name: "Tennis",
    icon: "🎾",
    enabled: true,
    route: "/sports/tennis",
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    enabled: true,
    route: "/sports/basketball",
  },
  {
    id: "ice-hockey",
    name: "Ice Hockey",
    icon: "🏒",
    enabled: true,
    route: "/sports/ice-hockey",
  },
  {
    id: "snooker",
    name: "Snooker",
    icon: "🎱",
    enabled: true,
    route: "/sports/snooker",
  },
  {
    id: "baseball",
    name: "Baseball",
    icon: "⚾",
    enabled: false,
  },
  {
    id: "american-football",
    name: "American Football",
    icon: "🏈",
    enabled: false,
  },
  {
    id: "formula-1",
    name: "Formula 1",
    icon: "🏎️",
    enabled: false,
  },
  {
    id: "darts",
    name: "Darts",
    icon: "🎯",
    enabled: false,
  },
  {
    id: "boxing-ufc",
    name: "Boxing/UFC",
    icon: "🥊",
    enabled: false,
  },
  {
    id: "swimming",
    name: "Swimming",
    icon: "🏊",
    enabled: false,
  },
  {
    id: "rowing",
    name: "Rowing",
    icon: "🚣",
    enabled: false,
  },
  {
    id: "surfing",
    name: "Surfing",
    icon: "🏄",
    enabled: false,
  },
  {
    id: "weightlifting",
    name: "Weightlifting",
    icon: "🏋️",
    enabled: false,
  },
  {
    id: "fencing",
    name: "Fencing",
    icon: "🤺",
    enabled: false,
  },
];

export const getEnabledSports = (): Sport[] => {
  return SPORTS.filter((sport) => sport.enabled);
};

export const getComingSoonSports = (): Sport[] => {
  return SPORTS.filter((sport) => !sport.enabled);
};
