import { useState } from "react";
import { X, Bell } from "lucide-react";
import { useNotifications } from "../lib/notifications";

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, removeNotification, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match":
        return "⚽";
      case "prediction":
        return "🎯";
      case "alert":
        return "⚠️";
      case "promo":
        return "🎉";
      default:
        return "📢";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "match":
        return "border-blue-500/30 bg-blue-950/20";
      case "prediction":
        return "border-gold-500/30 bg-gold-950/20";
      case "alert":
        return "border-orange-500/30 bg-orange-950/20";
      case "promo":
        return "border-green-500/30 bg-green-950/20";
      default:
        return "border-gray-500/30 bg-gray-950/20";
    }
  };

  return (
    <>
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-900/50 transition"
      >
        <Bell className="w-5 h-5 text-gray-400 hover:text-gold-400 transition" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[20px]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed top-20 right-4 sm:right-8 w-96 max-w-full max-h-96 rounded-lg border border-gold-600/20 bg-slate-900/95 backdrop-blur-sm shadow-xl z-40 flex flex-col">
          {/* Header */}
          <div className="border-b border-gold-600/20 p-4 flex items-center justify-between">
            <h3 className="font-bold text-white text-lg">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead()}
                  className="text-xs text-gold-400 hover:text-gold-300 transition"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-800 rounded transition"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-400">
                  No notifications yet. Check back soon for match updates!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gold-600/10">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`p-4 cursor-pointer border-l-2 transition ${
                      notif.read
                        ? "border-l-transparent hover:bg-slate-800/30"
                        : "border-l-gold-500 bg-slate-800/30 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">{getNotificationIcon(notif.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm mb-1">
                          {notif.title}
                          {!notif.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-gold-500 rounded-full" />
                          )}
                        </p>
                        <p className="text-xs text-gray-400">{notif.message}</p>
                        {notif.match && (
                          <p className="text-xs text-gold-400 mt-2">
                            Match time: {notif.match.time}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {notif.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notif.id);
                        }}
                        className="p-1 hover:bg-slate-700 rounded transition flex-shrink-0"
                      >
                        <X className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
