import React from "react";
import { useData } from "../context/DataProvider";
import {
  TrendingUp,
  TrendingDown,
  Boxes,
  ClipboardList,
  BarChart3,
  Wallet,
  Star,
  ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { stats, orders, products, reviews } = useData();

  // Handle withdraw click
  const handleWithdraw = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Processing withdrawal request...",
        success: `Withdrawal of $${stats.totalEarnings.toLocaleString()} initiated!`,
        error: "Failed to initiate withdrawal."
      }
    );
  };

  // Helper to format values
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  // Get status pill style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-[#E2F0D9] text-[#385723] border border-[#C5DFB5]";
      case "Shipped":
        return "bg-[#FFF2CC] text-[#806000] border border-[#FFE699]";
      case "Pending":
        return "bg-[#F2F2F2] text-[#595959] border border-[#D9D9D9]";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* WELCOME BANNER */}
      <div>
        <h2 className="font-serif text-3xl font-bold text-slate-800 tracking-tight">
          Welcome back, James!
        </h2>
        <p className="text-[14px] text-slate-600 mt-1 font-medium leading-relaxed">
          Your harvest is looking healthy this season. You have{" "}
          <span className="font-bold text-primary">{stats.pendingOrders} pending orders</span> and{" "}
          <span className="font-bold text-amber-600">{stats.lowStockAlerts} low stock alert</span>{" "}
          that need your attention.
        </p>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-4 gap-6">
        {/* TOTAL PRODUCTS */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[168px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50">
              <Boxes className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4%</span>
            </div>
          </div>
          <div>
            <p className="text-[12.5px] font-bold text-slate-500 uppercase tracking-wide">
              Total Products
            </p>
            <p className="text-3xl font-bold text-slate-800 font-display mt-0.5">
              {stats.totalProducts}
            </p>
            <div className="w-full bg-[#EAE6DB] rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-[#3F704D] h-1.5 rounded-full group-hover:scale-x-105 origin-left transition-transform duration-500" style={{ width: "65%" }}></div>
            </div>
          </div>
        </div>

        {/* TOTAL ORDERS */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[168px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100/50">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12%</span>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[12.5px] font-bold text-slate-500 uppercase tracking-wide">
                Total Orders
              </p>
              <p className="text-3xl font-bold text-slate-800 font-display mt-0.5">
                {stats.totalOrders}
              </p>
            </div>
            {/* CSS Mini Bar Chart */}
            <div className="flex gap-1.5 items-end h-9 mb-1">
              <div className="w-2 bg-[#EAE6DB] rounded-sm h-3 group-hover:h-4 transition-all duration-300"></div>
              <div className="w-2 bg-[#EAE6DB] rounded-sm h-6 group-hover:h-5 transition-all duration-300"></div>
              <div className="w-2 bg-[#3F704D] rounded-sm h-8 group-hover:h-9 transition-all duration-300"></div>
              <div className="w-2 bg-[#EAE6DB] rounded-sm h-4 group-hover:h-6 transition-all duration-300"></div>
              <div className="w-2 bg-[#3F704D] rounded-sm h-5 group-hover:h-7 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* TOTAL SALES */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[168px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[12px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-2.4%</span>
            </div>
          </div>
          <div>
            <p className="text-[12.5px] font-bold text-slate-500 uppercase tracking-wide">
              Total Sales
            </p>
            <p className="text-3xl font-bold text-slate-800 font-display mt-0.5">
              {formatCurrency(stats.totalSales)}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 mt-2">
              Vs last month
            </p>
          </div>
        </div>

        {/* TOTAL EARNINGS */}
        <div className="card p-6 bg-white flex flex-col justify-between h-[168px] relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8%</span>
            </div>
          </div>
          <div>
            <p className="text-[12.5px] font-bold text-slate-500 uppercase tracking-wide">
              Total Earnings
            </p>
            <p className="text-3xl font-bold text-slate-800 font-display mt-0.5">
              {formatCurrency(stats.totalEarnings)}
            </p>
            <button
              onClick={handleWithdraw}
              className="text-[11px] font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1 mt-2.5 group/link"
            >
              <span>Withdraw funds</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD SPLIT GRID (Recent Orders Table + Side Stats Column) */}
      <div className="grid grid-cols-3 gap-8">
        {/* RECENT ORDERS TABLE */}
        <div className="col-span-2 card bg-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-6">
              Recent Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F0EDE6] text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="pb-3.5 font-bold">Order ID</th>
                    <th className="pb-3.5 font-bold">Customer</th>
                    <th className="pb-3.5 font-bold">Product</th>
                    <th className="pb-3.5 font-bold">Status</th>
                    <th className="pb-3.5 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EDE6]/60">
                  {orders.slice(0, 4).map((order) => (
                    <tr key={order.id} className="group hover:bg-[#F8F6F0]/40 transition-colors">
                      <td className="py-4 text-[13.5px] font-bold text-slate-800 font-display">
                        #{order.id}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#EAE6DB] text-slate-700 flex items-center justify-center font-bold text-[11.5px] border border-[#E1DCD0]">
                            {order.initials}
                          </div>
                          <span className="text-[13.5px] font-semibold text-slate-700">
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-[13.5px] font-medium text-slate-600">
                        {order.product}
                      </td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 text-[11.5px] font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-[13.5px] font-bold text-slate-800 text-right font-display">
                        ${order.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SIDE COLUMN: TOP PERFORMING & REVIEWS */}
        <div className="flex flex-col gap-6">
          {/* TOP PERFORMING PRODUCTS */}
          <div className="card bg-white p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-serif text-lg font-bold text-slate-800">
                  Top Performing
                </h3>
                <button
                  onClick={() => toast("Redirecting to inventory...")}
                  className="text-[12px] font-bold text-slate-400 hover:text-primary transition-colors"
                >
                  View All
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {products.slice(0, 2).map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-4 p-3 bg-[#F8F6F0]/40 rounded-2xl border border-[#EAE6DB]/40 hover:border-[#EAE6DB] transition-all hover:bg-white hover:shadow-sm"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-[52px] h-[52px] rounded-xl object-cover border border-[#E9E6DC]"
                    />
                    <div className="flex-1">
                      <p className="text-[13.5px] font-bold text-slate-800">
                        {prod.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(prod.rating)
                                  ? "fill-current"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">
                          ({prod.rating.toFixed(1)})
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500 mt-1">
                        <span className="font-bold text-slate-700">{prod.sales}</span> sales this month
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT REVIEWS */}
          <div className="card bg-white p-6 relative overflow-hidden">
            <span className="absolute right-6 top-4 font-serif text-[80px] leading-none font-bold text-[#EAE6DB]/60 select-none">
              99
            </span>
            <div className="relative z-10">
              <h3 className="font-serif text-lg font-bold text-slate-800 mb-4">
                Recent Reviews
              </h3>

              {reviews.slice(0, 1).map((rev) => (
                <div key={rev.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-bold text-slate-800">
                      {rev.author}
                    </span>
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[12.5px] text-slate-500 italic leading-relaxed mt-1">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
