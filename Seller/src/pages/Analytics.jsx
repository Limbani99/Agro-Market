import React from "react";
import { BarChart3, TrendingUp, DollarSign, Sprout } from "lucide-react";

export default function Analytics() {
  const chartData = [
    { label: "Jan", sales: 45 },
    { label: "Feb", sales: 65 },
    { label: "Mar", sales: 80 },
    { label: "Apr", sales: 95 },
    { label: "May", sales: 120 }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Farm Performance & Analytics</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Track your seasonal yields and monthly sales distributions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="col-span-2 card bg-white p-6 flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-4">Earnings History ($ Thousands)</h3>
            <p className="text-slate-400 text-xs font-semibold mb-6">Seasonal sales trend representation</p>
          </div>

          <div className="flex justify-between items-end h-48 px-4 border-b border-slate-100 pb-2">
            {chartData.map((d) => (
              <div key={d.label} className="flex flex-col items-center gap-3 w-12 group">
                <div
                  className="bg-primary hover:bg-primary-dark w-8 rounded-t-lg transition-all duration-500 relative flex justify-center origin-bottom scale-y-0 animate-in slide-in-from-bottom duration-700"
                  style={{ height: `${d.sales * 1.2}px`, transform: "scaleY(1)" }}
                >
                  <span className="absolute -top-7 bg-[#0A2E1F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${d.sales}k
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400 font-display">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Cards Column */}
        <div className="flex flex-col gap-6">
          <div className="card bg-white p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-[15px]">Growth Projections</h4>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                Organic product demands are up 18% compared to last spring. Kale and Heirloom Tomatoes are leading sales metrics.
              </p>
            </div>
          </div>

          <div className="card bg-white p-6 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-[15px]">Harvest Insights</h4>
              <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                Your mixed berry box inventory has high demand velocity. Replenishing stock could yield up to $1,200 additional profit this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


