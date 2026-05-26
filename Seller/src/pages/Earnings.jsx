import React from "react";
import { useData } from "../context/DataProvider";
import { Wallet, Landmark, TrendingUp, RefreshCw } from "lucide-react";

export default function Earnings() {
  const { stats, withdrawals } = useData();

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "Processing":
        return "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse";
      default:
        return "bg-slate-50 text-slate-500 border border-slate-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      {/* Title */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Earnings & Payouts</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Manage your organic farm finances, track historical payouts, and monitor bank settlements.</p>
      </div>

      {/* Dynamic 4-Card Payout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Wallet Balance Card */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[150px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/10">
              Liquid Funds
            </span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Withdrawable Funds</p>
            <p className="text-2xl font-bold text-slate-800 font-display mt-0.5">
              ${stats.totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Lifetime Earnings Card */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[150px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary-light">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary/10">
              Total Sales Payout
            </span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Lifetime Net Income</p>
            <p className="text-2xl font-bold text-slate-800 font-display mt-0.5">
              ${(stats.rawEarnings || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Total Settled Card */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[150px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50">
              <RefreshCw className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100/10">
              Transferred
            </span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Settled Payouts</p>
            <p className="text-2xl font-bold text-slate-800 font-display mt-0.5">
              ${(stats.totalWithdrawn || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Bank Destination Card */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[150px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100/50">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100/10">
              Default Route
            </span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Payout Account</p>
            <p className="text-[15px] font-extrabold text-slate-800 font-display mt-0.5">Chase Bank</p>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">ending in ****4920</p>
          </div>
        </div>
      </div>

      {/* Withdrawal Statement Logs */}
      <div className="card bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-serif text-[16px] font-bold text-slate-800">Settlement Ledger</h3>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">Chronological record of processed grower bank transfers.</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-display">
            Withdrawal History
          </span>
        </div>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-3">Log ID</th>
                <th className="pb-3">Date Initiated</th>
                <th className="pb-3">Bank Destination</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {withdrawals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 font-semibold text-xs">
                    No withdrawal transfers recorded.
                  </td>
                </tr>
              ) : (
                withdrawals.map((w) => (
                  <tr key={w.id} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="py-3.5 text-[13px] font-bold text-slate-700 font-display">
                      <span className="bg-slate-100 px-2.5 py-1 rounded text-slate-600 text-[11px] font-semibold">
                        {w.id}
                      </span>
                    </td>
                    <td className="py-3.5 text-[13px] font-semibold text-slate-500 whitespace-nowrap">
                      {w.date}
                    </td>
                    <td className="py-3.5 text-[13px] font-bold text-slate-700 whitespace-nowrap">
                      {w.bank}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(w.status)}`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-[13px] font-bold text-slate-800 text-right font-display whitespace-nowrap">
                      ${w.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
