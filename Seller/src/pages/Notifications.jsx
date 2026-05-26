import React, { useState } from "react";
import { useData } from "../context/DataProvider";
import { Bell, Check, Trash2, Sprout, ShoppingBag, Star, DollarSign, Inbox } from "lucide-react";
import toast from "react-hot-toast";

export default function Notifications() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification
  } = useData();

  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type) => {
    switch (type) {
      case "stock":
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50">
            <Sprout className="w-5 h-5" />
          </div>
        );
      case "order":
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100/50">
            <ShoppingBag className="w-5 h-5" />
          </div>
        );
      case "review":
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50">
            <Star className="w-5 h-5" />
          </div>
        );
      case "payout":
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100/50">
            <DollarSign className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-100/50">
            <Bell className="w-5 h-5" />
          </div>
        );
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notif.read;
    return notif.type === activeTab;
  });

  const handleDelete = (id, title) => {
    deleteNotification(id);
    toast.success(`Removed alert: ${title}`);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            <span>Farm Notifications</span>
          </h2>
          <p className="text-slate-500 text-[13.5px] mt-0.5">Stay up-to-date with your digital organic grower activity feed.</p>
        </div>

        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllNotificationsRead}
            className="text-[12.5px] font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 self-start sm:self-center px-4 py-2 border border-slate-100 bg-white rounded-full hover:bg-bg-light shadow-sm"
          >
            <Check className="w-4 h-4 stroke-[2.5px]" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-1">
        {[
          { id: "all", label: "All Alerts" },
          { id: "unread", label: "Unread Only" },
          { id: "stock", label: "Inventory" },
          { id: "order", label: "Orders" },
          { id: "review", label: "Reviews" },
          { id: "payout", label: "Payouts" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-[13px] font-bold transition-all border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`card transition-all border p-5 flex items-start gap-4 hover:shadow-md ${
                notif.read
                  ? "bg-white/80 border-slate-100"
                  : "bg-emerald-50/20 border-primary/25 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary"
              }`}
            >
              {getIcon(notif.type)}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <h4 className={`text-[14px] ${notif.read ? "font-bold text-slate-700" : "font-extrabold text-slate-900"}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-400 shrink-0">{notif.date}</span>
                </div>
                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">{notif.desc}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => markNotificationRead(notif.id)}
                    title="Mark as read"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-emerald-50/50 transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notif.id, notif.title)}
                  title="Dismiss notification"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50/50 transition-all active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card bg-white p-12 text-center flex flex-col items-center justify-center border-slate-100">
            <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center border border-dashed border-slate-200 mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-700">All Caught Up!</h3>
            <p className="text-slate-400 text-xs mt-1.5 max-w-sm">No new alert feeds are active for this segment right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}


