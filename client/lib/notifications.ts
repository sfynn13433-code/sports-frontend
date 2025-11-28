import { create } from "zustand";

export interface Notification {
  id: string;
  type: "match" | "prediction" | "alert" | "promo";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  sport?: string;
  league?: string;
  match?: {
    homeTeam: string;
    awayTeam: string;
    time: string;
  };
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotifications = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      notifications: [
        {
          ...notification,
          id,
          timestamp: new Date(),
          read: false,
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    }));
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  markAsRead: (id) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);
      if (!notification || notification.read) return state;

      return {
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1,
      };
    });
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  clearAll: () => {
    set({
      notifications: [],
      unreadCount: 0,
    });
  },
}));

// Notification Templates for upcoming matches
export const createMatchNotification = (
  sport: string,
  league: string,
  homeTeam: string,
  awayTeam: string,
  matchTime: string
): Omit<Notification, "id" | "timestamp" | "read"> => ({
  type: "match",
  title: `${sport} Match Starting Soon`,
  message: `${homeTeam} vs ${awayTeam} in ${league}`,
  match: {
    homeTeam,
    awayTeam,
    time: matchTime,
  },
  sport,
  league,
  actionUrl: "/predictions",
});

export const createPredictionNotification = (
  sport: string,
  prediction: string
): Omit<Notification, "id" | "timestamp" | "read"> => ({
  type: "prediction",
  title: `New ${sport} Prediction Available`,
  message: prediction,
  sport,
  actionUrl: "/predictions",
});

export const createAlertNotification = (
  title: string,
  message: string
): Omit<Notification, "id" | "timestamp" | "read"> => ({
  type: "alert",
  title,
  message,
});

// Mock function to simulate receiving notifications
export const simulateUpcomingMatches = (useNotifStore: typeof useNotifications) => {
  const upcomingMatches = [
    {
      sport: "Football",
      league: "Premier League",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      time: "15:00",
    },
    {
      sport: "Basketball",
      league: "NBA",
      homeTeam: "Lakers",
      awayTeam: "Celtics",
      time: "22:30",
    },
    {
      sport: "Rugby",
      league: "Six Nations",
      homeTeam: "England",
      awayTeam: "France",
      time: "14:30",
    },
  ];

  // Simulate receiving notifications
  upcomingMatches.forEach((match, index) => {
    setTimeout(() => {
      useNotifStore.getState().addNotification(
        createMatchNotification(
          match.sport,
          match.league,
          match.homeTeam,
          match.awayTeam,
          match.time
        )
      );
    }, index * 2000);
  });
};
