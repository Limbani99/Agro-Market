import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { ArrowLeft, Save } from "lucide-react";

export default function EditProfile() {
  const { user, updateProfile } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    farmName: user.farmName,
    location: user.location,
    bio: user.bio,
    avatar: user.avatar,
    email: user.email
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    navigate("/profile");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      {/* Return button */}
      <div>
        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Profile</span>
        </Link>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mt-2">Edit Farm Profile</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Customize public profile settings and descriptions.</p>
      </div>

      {/* Editor Form */}
      <div className="card bg-white p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Manager Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white font-semibold"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Farm Entity Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white font-semibold"
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white font-semibold"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Location Address</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white font-semibold"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Profile Image Avatar URL</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-white font-semibold"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Grower / Farm Bio</label>
            <textarea
              rows={4}
              required
              className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 leading-relaxed bg-white font-semibold"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <div className="flex gap-4 justify-end mt-4 border-t border-[#F0EDE6] pt-6">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-full transition-colors border border-[#E3DFD3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
