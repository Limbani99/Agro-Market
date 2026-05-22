import React from "react";
import { ShoppingBag, Globe } from "lucide-react";

export default function Marketplace() {
  return (
    <div className="card bg-white p-8 max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[400px] border border-[#E9E6DC] animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 mb-6">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-slate-800">Terra Agro Marketplace</h2>
      <p className="text-slate-500 text-[14px] mt-2 max-w-md mx-auto leading-relaxed">
        Connect directly with local organic buyers. You are currently viewing the seller backend dashboard. Your farm catalog is fully visible to active buyer accounts.
      </p>
      <div className="mt-8 flex gap-4">
        <button className="btn-primary flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span>View Buyer Portal</span>
        </button>
      </div>
    </div>
  );
}
