import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { User, MapPin, Layers, Heart, Mail, Edit } from "lucide-react";

export default function Profile() {
  const { user, products } = useData();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-800">Farm Public Profile</h2>
          <p className="text-slate-500 text-[13.5px] mt-0.5">This represents your public credential visible to buyer accounts.</p>
        </div>
        <button
          onClick={() => navigate("/profile/edit")}
          className="btn-primary"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Farm Profile</span>
        </button>
      </div>

      {/* Main Profile Info Card */}
      <div className="card bg-white p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
        {/* Organic green accent sidebar */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />

        {/* Profile Avatar */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border border-[#E9E6DC] shadow-sm flex-shrink-0"
        />

        {/* Profile Body */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <h3 className="font-serif text-2xl font-bold text-slate-800">{user.farmName}</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {user.type}
              </span>
            </div>
            <p className="text-[13px] font-semibold text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-1">
              <User className="w-3.5 h-3.5" />
              <span>Harvest Manager: {user.name}</span>
            </p>
          </div>

          <p className="text-[13.5px] text-slate-500 leading-relaxed font-medium">
            {user.bio}
          </p>

          <div className="flex flex-col gap-2 pt-4 border-t border-[#F0EDE6] text-[13px]">
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-slate-600 font-semibold">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-slate-600 font-semibold">
              <Mail className="w-4 h-4 text-primary" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-[15px]">Active Catalog Listings</h4>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">{products.length} organic crops currently visible</p>
          </div>
        </div>

        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-100 flex-shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-[15px]">Seller Verification</h4>
            <p className="text-slate-500 text-xs font-semibold mt-0.5">Passed USDA or local food council audits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
