import React, { useState } from "react";
import { useData } from "../context/DataProvider";
import { Wallet, Landmark, ArrowDownRight, ClipboardList, CheckCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function Earnings() {
  const { stats, withdrawals, requestWithdrawal } = useData();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("Chase ****4920");

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) return;
    const success = requestWithdrawal(amount, selectedBank);
    if (success) {
      setWithdrawAmount("");
    }
  };

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
        <p className="text-slate-500 text-[13.5px] mt-0.5">Manage your organic farm finances and bank settlements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[160px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Withdrawable Funds</p>
            <p className="text-3xl font-bold text-slate-800 font-display mt-0.5">${stats.totalEarnings.toLocaleString()}</p>
          </div>
        </div>

        {/* Bank card */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[160px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100/50">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">Default Payout</span>
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Payout Institution</p>
            <p className="text-xl font-bold text-slate-800 font-display mt-0.5">Chase Bank</p>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">Account ending in ****4920</p>
          </div>
        </div>

        {/* Settlement timeline */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[160px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50">
              <RefreshCw className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Settlement Speed</p>
            <p className="text-xl font-bold text-slate-800 font-display mt-0.5">Direct Deposit</p>
            <p className="text-[11px] font-semibold text-slate-400 mt-1">Settles within 24-48 business hours</p>
          </div>
        </div>
      </div>

      {/* Grid: Withdrawal Form + Withdrawal Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payout Withdrawal Form */}
        <div className="card bg-white p-6">
          <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-4">Request Funds Payout</h3>

          <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[12px] font-bold text-slate-600 mb-2">Withdrawal Amount ($)</label>
              <input
                type="number"
                step="0.01"
                required
                max={stats.totalEarnings}
                placeholder="e.g. 500"
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <p className="text-[10px] text-slate-400 font-semibold mt-1">Maximum available: ${stats.totalEarnings.toLocaleString()}</p>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-600 mb-2">Destination Bank Account</label>
              <select
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-semibold"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="Chase ****4920">Chase Bank (****4920)</option>
                <option value="Wells Fargo ****1285">Wells Fargo (****1285)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={stats.totalEarnings <= 0}
              className={`w-full py-2.5 rounded-full text-xs font-bold transition-all mt-2 flex items-center justify-center gap-2 ${
                stats.totalEarnings <= 0
                  ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  : "bg-[#3F704D] hover:bg-primary-dark text-white shadow-xs"
              }`}
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>Withdraw Funds</span>
            </button>
          </form>
        </div>

        {/* Withdrawal Statement Logs */}
        <div className="col-span-2 card bg-white p-6">
          <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-4">Withdrawal History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F0EDE6] text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="pb-3">Log ID</th>
                  <th className="pb-3">Date Initiated</th>
                  <th className="pb-3">Bank Destination</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EDE6]/60">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="group hover:bg-[#F8F6F0]/40 transition-colors">
                    <td className="py-3.5 text-[13px] font-bold text-slate-800 font-display">
                      {w.id}
                    </td>
                    <td className="py-3.5 text-[13px] font-medium text-slate-500 font-display">
                      {w.date}
                    </td>
                    <td className="py-3.5 text-[13px] font-semibold text-slate-600">
                      {w.bank}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(w.status)}`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-[13px] font-bold text-slate-800 text-right font-display">
                      ${w.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
