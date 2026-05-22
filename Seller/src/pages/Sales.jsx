import React from "react";
import { useData } from "../context/DataProvider";
import { DollarSign, BarChart3, Receipt, ArrowUpRight } from "lucide-react";

export default function Sales() {
  const { stats, orders } = useData();

  const dailyStats = [
    { day: "Mon", count: 120, height: "h-12" },
    { day: "Tue", count: 240, height: "h-24" },
    { day: "Wed", count: 190, height: "h-20" },
    { day: "Thu", count: 320, height: "h-32" },
    { day: "Fri", count: 420, height: "h-40" },
    { day: "Sat", count: 510, height: "h-48" },
    { day: "Sun", count: 300, height: "h-28" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Sales Ledger</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Track your seasonal transactions and commission receipts.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50 flex-shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Gross Revenue</p>
            <p className="text-xl font-bold text-slate-800 font-display">${stats.totalSales.toLocaleString()}</p>
          </div>
        </div>

        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50 flex-shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Platform Fee (20%)</p>
            <p className="text-xl font-bold text-slate-800 font-display">${(stats.totalSales * 0.2).toLocaleString()}</p>
          </div>
        </div>

        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100/50 flex-shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Net Farm Income</p>
            <p className="text-xl font-bold text-slate-800 font-display">${stats.totalEarnings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Grid: CSS Chart + Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Sales CSS Chart */}
        <div className="col-span-2 card bg-white p-6 flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-2">Weekly Yield Value ($)</h3>
            <p className="text-slate-400 text-xs font-semibold mb-6">Daily sales transactions distribution index</p>
          </div>

          <div className="flex justify-between items-end h-40 px-4 border-b border-[#F0EDE6] pb-2">
            {dailyStats.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-3 w-12 group">
                <div
                  className={`bg-[#3F704D] hover:bg-primary-dark w-7 rounded-t-md transition-all duration-300 relative flex justify-center origin-bottom ${d.height}`}
                >
                  <span className="absolute -top-7 bg-[#0A2E1F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${d.count}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400 font-display">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History log */}
        <div className="card bg-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-4">Latest Receipts</h3>
            <div className="flex flex-col gap-4">
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-[#F0EDE6]/60 last:border-0">
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">#{order.id}</p>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-primary font-display">${order.amount.toFixed(2)}</p>
                    <span className="text-[9px] font-bold text-slate-400">{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
