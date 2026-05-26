import React, { useState, useEffect } from "react";
import { useData } from "../context/DataProvider";
import { User, Bell, Shield, Mail, Phone, MapPin, Home, AlignLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, updateProfile, changeUserPassword } = useData();
  const [activeTab, setActiveTab] = useState("profile");

  // Farm Profile state
  const [formData, setFormData] = useState({
    name: "",
    farmName: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    bio: ""
  });

  // Alert Settings state
  const [alertSettings, setAlertSettings] = useState({
    emailAlerts: true,
    dashboardAlerts: true,
    weeklyDigest: false
  });

  // Security Credentials state
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Initialize fields once session mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        farmName: user.farmName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        address: user.address || "",
        bio: user.bio || ""
      });

      const savedAlerts = localStorage.getItem(`alerts_${user._id || user.id}`);
      if (savedAlerts) {
        try {
          setAlertSettings(JSON.parse(savedAlerts));
        } catch (e) {
          console.error("Error loading alert configurations:", e);
        }
      }
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const loadId = toast.loading("Updating farm profile...");
    const success = await updateProfile(formData);
    toast.dismiss(loadId);
    if (success) {
      toast.success("Farm profile updated successfully!");
    } else {
      toast.error("Failed to update profile settings.");
    }
  };

  const handleAlertsSubmit = (e) => {
    e.preventDefault();
    if (user) {
      localStorage.setItem(`alerts_${user._id || user.id}`, JSON.stringify(alertSettings));
      toast.success("Alert preferences updated successfully!");
    } else {
      toast.error("User context missing.");
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    if (!securityData.currentPassword) {
      toast.error("Please verify your current password.");
      return;
    }
    if (securityData.newPassword.length < 6) {
      toast.error("New password must contain at least 6 characters.");
      return;
    }
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error("New password confirmation does not match.");
      return;
    }

    const loadId = toast.loading("Updating password credentials...");
    const success = await changeUserPassword(securityData.currentPassword, securityData.newPassword);
    toast.dismiss(loadId);

    if (success) {
      toast.success("Security credentials updated successfully!");
      setSecurityData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Account & Farm Settings</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Manage your public storefront profile, alert preferences, and login credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Tabs Panel */}
        <div className="card bg-white p-4 h-fit flex flex-col gap-1.5 border border-slate-100 shadow-xs">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-bold text-left transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-primary-light text-primary"
                : "hover:bg-slate-50 text-slate-600"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Farm Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-bold text-left transition-all cursor-pointer ${
              activeTab === "alerts"
                ? "bg-primary-light text-primary"
                : "hover:bg-slate-50 text-slate-600"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alert Preferences</span>
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-bold text-left transition-all cursor-pointer ${
              activeTab === "security"
                ? "bg-primary-light text-primary"
                : "hover:bg-slate-50 text-slate-600"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Login</span>
          </button>
        </div>

        {/* Dynamic Content Panel Card */}
        <div className="col-span-1 md:col-span-2 card bg-white p-6 border border-slate-100 shadow-xs">
          {/* TAB 1: FARM PROFILE FORM */}
          {activeTab === "profile" && (
            <div>
              <h3 className="font-serif text-[17px] font-bold text-slate-800 mb-1">Farm Storefront Profile</h3>
              <p className="text-slate-400 text-xs font-semibold mb-6">Manage data details shared publicly with customers in the marketplace.</p>

              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Seller Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Farm Entity Name</label>
                    <input
                      type="text"
                      required
                      value={formData.farmName}
                      onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> Contact Phone
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 555-019-2834"
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location / Region
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. California Crest Valley, CA"
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-slate-400" /> Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. 482 Organic Way, CA"
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <AlignLeft className="w-3.5 h-3.5 text-slate-400" /> Farm Biography
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell buyers about your agricultural methods, values, and produce story..."
                    className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-2 self-end cursor-pointer"
                >
                  Save Storefront Config
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: ALERT PREFERENCES */}
          {activeTab === "alerts" && (
            <div>
              <h3 className="font-serif text-[17px] font-bold text-slate-800 mb-1">Notification Preferences</h3>
              <p className="text-slate-400 text-xs font-semibold mb-6">Manage how and when you receive order receipts, yield logs, and replies.</p>

              <form onSubmit={handleAlertsSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {/* Email alerts switch */}
                  <label className="flex items-start gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50/55 transition-colors cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={alertSettings.emailAlerts}
                      onChange={(e) => setAlertSettings({ ...alertSettings, emailAlerts: e.target.checked })}
                      className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary mt-0.5 accent-primary"
                    />
                    <div>
                      <p className="text-[13.5px] font-bold text-slate-800 leading-tight">Order Receipt Emails</p>
                      <p className="text-slate-400 text-[11.5px] font-semibold mt-1">Receive automated ledger summaries sent to your email inbox upon newly completed transactions.</p>
                    </div>
                  </label>

                  {/* Dashboard alerts switch */}
                  <label className="flex items-start gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50/55 transition-colors cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={alertSettings.dashboardAlerts}
                      onChange={(e) => setAlertSettings({ ...alertSettings, dashboardAlerts: e.target.checked })}
                      className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary mt-0.5 accent-primary"
                    />
                    <div>
                      <p className="text-[13.5px] font-bold text-slate-800 leading-tight">In-App Dashboard Alerts</p>
                      <p className="text-slate-400 text-[11.5px] font-semibold mt-1">Receive active alert logs in your header bell notifications dropdown when feedback replies are recorded.</p>
                    </div>
                  </label>

                  {/* Weekly report switch */}
                  <label className="flex items-start gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50/55 transition-colors cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={alertSettings.weeklyDigest}
                      onChange={(e) => setAlertSettings({ ...alertSettings, weeklyDigest: e.target.checked })}
                      className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary mt-0.5 accent-primary"
                    />
                    <div>
                      <p className="text-[13.5px] font-bold text-slate-800 leading-tight">Weekly Crop Market Reports</p>
                      <p className="text-slate-400 text-[11.5px] font-semibold mt-1">Receive compiled analytical summaries of agricultural trends, buyer demands, and local pricing.</p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-2 self-end cursor-pointer"
                >
                  Save Alert Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SECURITY & LOGIN */}
          {activeTab === "security" && (
            <div>
              <h3 className="font-serif text-[17px] font-bold text-slate-800 mb-1">Security & Login Credentials</h3>
              <p className="text-slate-400 text-xs font-semibold mb-6">Manage password protections to secure your agricultural marketplace store.</p>

              <form onSubmit={handleSecuritySubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Repeat new password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 text-[13.5px] border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-slate-700 font-medium transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-2 self-end cursor-pointer"
                >
                  Update Credentials
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
