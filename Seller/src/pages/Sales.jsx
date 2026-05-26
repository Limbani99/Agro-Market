import React, { useState, useMemo, useEffect } from "react";
import { useData } from "../context/DataProvider";
import { DollarSign, BarChart3, Receipt, ArrowUpRight, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sales() {
  const { orders } = useData();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter orders for Completed calculations (Delivered & Shipped status)
  const completedOrders = useMemo(() => {
    return orders.filter(o => o.status === "Delivered" || o.status === "Shipped");
  }, [orders]);

  // Compute live key stats
  const totalSales = useMemo(() => {
    return completedOrders.reduce((sum, o) => sum + o.amount, 0);
  }, [completedOrders]);

  const platformFee = useMemo(() => {
    return totalSales * 0.1; // 10% platform fee matching DataProvider
  }, [totalSales]);

  const netIncome = useMemo(() => {
    return totalSales * 0.9; // 90% net farm payout
  }, [totalSales]);

  const averageTicket = useMemo(() => {
    if (completedOrders.length === 0) return 0;
    return totalSales / completedOrders.length;
  }, [completedOrders, totalSales]);

  // Dynamically compute weekly yield distribution (Mon - Sun)
  const dailyStats = useMemo(() => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const distribution = {
      Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
    };

    completedOrders.forEach(order => {
      const d = new Date(order.date);
      if (!isNaN(d.getTime())) {
        const dayName = daysOfWeek[d.getDay()];
        if (distribution[dayName] !== undefined) {
          distribution[dayName] += order.amount;
        }
      }
    });

    const data = Object.keys(distribution).map(day => ({
      day,
      count: Math.round(distribution[day]),
    }));

    const maxVal = Math.max(...data.map(d => d.count), 0);

    return data.map(d => {
      const pct = maxVal > 0 ? (d.count / maxVal) * 100 : 0;
      // Scale to max 85% to fit tooltips inside the wrapper container
      const pctScaled = pct > 0 ? Math.max(pct * 0.85, 6) : 0;
      return {
        ...d,
        pct: pctScaled
      };
    });
  }, [completedOrders]);

  // Search & Filter Master Ledger lists
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.product && order.product.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "All" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Reset pagination on search or status change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Paginated list for premium ledger table
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage]);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      <div>
        <h2 className="font-serif text-2xl font-bold text-slate-800">Sales Ledger</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Track your seasonal transactions, platform commissions, and grower net earnings.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gross Revenue */}
        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/50 flex-shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Gross Revenue</p>
            <p className="text-xl font-bold text-slate-800 font-display">${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Platform Fee (10%) */}
        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100/50 flex-shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Platform Fee (10%)</p>
            <p className="text-xl font-bold text-slate-800 font-display">${platformFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Net Farm Income (90%) */}
        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary-light flex-shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Net Farm Income</p>
            <p className="text-xl font-bold text-slate-800 font-display">${netIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="card bg-white p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100/50 flex-shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Average Ticket</p>
            <p className="text-xl font-bold text-slate-800 font-display">${averageTicket.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Grid: CSS Chart + Latest Receipts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Sales CSS Chart */}
        <div className="col-span-1 lg:col-span-2 card bg-white p-6 flex flex-col justify-between min-h-[350px]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-1">Weekly Yield Value ($)</h3>
              <p className="text-slate-400 text-xs font-semibold">Daily completed sales transactions distribution</p>
            </div>
            <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary/10">
              Active Week
            </span>
          </div>

          <div className="flex justify-between items-end h-48 px-4 border-b border-slate-100 pb-2 mt-6">
            {dailyStats.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-3 w-12 group">
                <div
                  className="bg-primary hover:bg-primary-dark w-7 rounded-t-md transition-all duration-300 relative flex justify-center origin-bottom"
                  style={{ height: `${d.pct}%`, minHeight: d.count > 0 ? "8px" : "0px" }}
                >
                  <span className="absolute -top-7 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-sm z-10">
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-[16px] font-bold text-slate-800">Latest Receipts</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-display">
                Recent 4
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold">No recent transactions</div>
              ) : (
                orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-100/60 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-extrabold text-slate-500">
                        {order.initials}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-slate-800 leading-tight">#{order.id.slice(-6).toUpperCase()}</p>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold text-primary font-display">${order.amount.toFixed(2)}</p>
                      <span className="text-[9px] font-bold text-slate-400">{order.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Master Transaction Ledger */}
      <div className="card bg-white p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-serif text-[17px] font-bold text-slate-800">Master Transaction Ledger</h3>
            <p className="text-slate-400 text-xs font-semibold mt-0.5">Filter, search, and audit your complete earnings record.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search ID, customer, item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-60 pl-9 pr-4 py-2 border border-slate-200 rounded-full text-xs font-semibold focus:outline-none focus:border-primary transition-colors bg-slate-50/50"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Pills */}
            <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200/40 self-start sm:self-auto">
              {["All", "Delivered", "Shipped", "Pending"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-white text-primary shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-collapse text-left min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Receipt ID</th>
                <th className="pb-3">Buyer</th>
                <th className="pb-3">Items Purchased</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Commission (10%)</th>
                <th className="pb-3 text-right">Net Income</th>
                <th className="pb-3 text-right pr-2">Gross Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 font-semibold text-xs">
                    No matching ledger records found.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const gross = order.amount;
                  const commission = gross * 0.1;
                  const net = gross * 0.9;

                  return (
                    <tr key={order.id} className="text-[13px] hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 pl-2 font-semibold text-slate-500 whitespace-nowrap">{order.date}</td>
                      <td className="py-4 font-mono font-bold text-slate-700 whitespace-nowrap">
                        <span className="bg-slate-100 px-2 py-1 rounded text-slate-600 text-[10px]">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-[10px] font-extrabold text-primary">
                            {order.initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{order.customer}</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{order.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-semibold text-slate-600 max-w-[200px] truncate">{order.product}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            order.status === "Delivered"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700 border-blue-100"
                              : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-semibold text-slate-400 font-display">
                        ${commission.toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-bold text-indigo-700 font-display">
                        ${net.toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-bold text-slate-800 pr-2 font-display">
                        ${gross.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
            <span className="text-xs font-semibold text-slate-400">
              Showing page <strong className="text-slate-700">{currentPage}</strong> of <strong className="text-slate-700">{totalPages}</strong> ({filteredOrders.length} records)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
