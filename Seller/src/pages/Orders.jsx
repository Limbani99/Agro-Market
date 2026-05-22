import React, { useState } from "react";
import { useData } from "../context/DataProvider";
import { ClipboardList, Filter } from "lucide-react";

export default function Orders() {
  const { orders, updateOrderStatus } = useData();
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders.filter((o) => {
    if (filter === "All") return true;
    return o.status === filter;
  });

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
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-800">Orders Management</h2>
          <p className="text-slate-500 text-[13.5px] mt-0.5">Fulfill shipments and manage active buyer receipts.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex bg-[#EAE6DB]/50 p-1 rounded-full border border-[#E1DCD0]">
          {["All", "Pending", "Shipped", "Delivered"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === status
                  ? "bg-[#3F704D] text-white shadow-xs"
                  : "text-slate-600 hover:text-primary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="card bg-white p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EDE6] text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="pb-3.5">Order ID</th>
                <th className="pb-3.5">Customer</th>
                <th className="pb-3.5">Product</th>
                <th className="pb-3.5">Date</th>
                <th className="pb-3.5">Status</th>
                <th className="pb-3.5 text-right">Amount</th>
                <th className="pb-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EDE6]/60">
              {filteredOrders.map((order) => (
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
                  <td className="py-4 text-[13px] font-medium text-slate-500 font-display">
                    {order.date}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 text-[11.5px] font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-[13.5px] font-bold text-slate-800 text-right font-display">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {order.status === "Pending" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "Shipped")}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-[11px] font-bold transition-all"
                        >
                          Mark Shipped
                        </button>
                      )}
                      {order.status === "Shipped" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "Delivered")}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-bold transition-all"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {order.status === "Delivered" && (
                        <span className="text-[11px] font-bold text-slate-400">Archived</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-medium">
              No orders found in this status category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
