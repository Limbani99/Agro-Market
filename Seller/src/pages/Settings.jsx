import React from "react";
import { Settings, User, Bell, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Account & Farm Settings</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Manage your public profile and notifications.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Nav tabs */}
        <div className="card bg-white p-4 h-fit flex flex-col gap-1.5">
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary-light text-primary font-bold text-[13.5px] text-left">
            <User className="w-4 h-4" />
            <span>Farm Profile</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-[13.5px] text-left transition-colors">
            <Bell className="w-4 h-4" />
            <span>Alert Preferences</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-[13.5px] text-left transition-colors">
            <Shield className="w-4 h-4" />
            <span>Security & Login</span>
          </button>
        </div>

        {/* Content Form */}
        <div className="col-span-2 card bg-white p-6">
          <h3 className="font-serif text-[17px] font-bold text-slate-800 mb-6">Farm Details</h3>

          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12.5px] font-bold text-slate-600 mb-2">Seller Full Name</label>
                <input
                  type="text"
                  defaultValue="James Miller"
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl bg-[#F8F6F0]/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                />
              </div>
              <div>
                <label className="block text-[12.5px] font-bold text-slate-600 mb-2">Farm Entity Name</label>
                <input
                  type="text"
                  defaultValue="Green Valley Farm"
                  className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl bg-[#F8F6F0]/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[12.5px] font-bold text-slate-600 mb-2">Location Address</label>
              <input
                type="text"
                defaultValue="482 Organic Way, Valley Crest, CA"
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl bg-[#F8F6F0]/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="block text-[12.5px] font-bold text-slate-600 mb-2">Farm Bio</label>
              <textarea
                rows={3}
                defaultValue="Producing premium-quality organic vegetables, fresh honeycombs, and free-range farm eggs in the heart of Valley Crest since 2012."
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl bg-[#F8F6F0]/30 focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="btn-primary mt-2 self-end"
            >
              Save Configuration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
