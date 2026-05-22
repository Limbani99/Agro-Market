import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataProvider";
import { ArrowLeft, User, MapPin, ClipboardList, CheckCircle, Truck, PackageCheck } from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useData();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 font-medium">Order details not found.</p>
        <Link to="/orders" className="btn-primary mt-4">Return to Orders</Link>
      </div>
    );
  }

  // Get status steps active status
  const getStepStatus = (stepName) => {
    const statusOrder = ["Pending", "Shipped", "Delivered"];
    const currentIndex = statusOrder.indexOf(order.status);
    const targetIndex = statusOrder.indexOf(stepName);

    if (currentIndex >= targetIndex) {
      return "active";
    }
    return "inactive";
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      {/* Return button */}
      <div>
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Orders</span>
        </Link>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mt-2">Order Fulfill Desk</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Fulfill, ship, or audit transaction #{order.id}.</p>
      </div>

      {/* VISUAL STATUS PROGRESS BAR */}
      <div className="card bg-white p-8">
        <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-6">Fulfillment Pipeline Timeline</h3>
        <div className="flex items-center justify-between relative max-w-xl mx-auto">
          {/* Connector bars */}
          <div className="absolute left-[8%] right-[8%] top-[20px] h-1.5 bg-[#EAE6DB] -z-0" />
          <div
            className="absolute left-[8%] top-[20px] h-1.5 bg-[#3F704D] -z-0 transition-all duration-500"
            style={{
              width: order.status === "Pending" ? "0%" : order.status === "Shipped" ? "42%" : "84%"
            }}
          />

          {/* Step 1: Pending */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center border font-bold text-[14px] transition-colors duration-300 ${
              getStepStatus("Pending") === "active"
                ? "bg-[#3F704D] text-white border-[#3F704D]"
                : "bg-white text-slate-400 border-slate-200"
            }`}>
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold ${getStepStatus("Pending") === "active" ? "text-slate-800" : "text-slate-400"}`}>
              Pending Review
            </span>
          </div>

          {/* Step 2: Shipped */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center border font-bold text-[14px] transition-colors duration-300 ${
              getStepStatus("Shipped") === "active"
                ? "bg-[#3F704D] text-white border-[#3F704D]"
                : "bg-white text-slate-400 border-slate-200"
            }`}>
              <Truck className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold ${getStepStatus("Shipped") === "active" ? "text-slate-800" : "text-slate-400"}`}>
              Shipped
            </span>
          </div>

          {/* Step 3: Delivered */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center border font-bold text-[14px] transition-colors duration-300 ${
              getStepStatus("Delivered") === "active"
                ? "bg-[#3F704D] text-white border-[#3F704D]"
                : "bg-white text-slate-400 border-slate-200"
            }`}>
              <PackageCheck className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold ${getStepStatus("Delivered") === "active" ? "text-slate-800" : "text-slate-400"}`}>
              Delivered
            </span>
          </div>
        </div>
      </div>

      {/* SPLIT LAYOUT (Invoice Items + Buyer Details) */}
      <div className="grid grid-cols-3 gap-6">
        {/* Ordered products */}
        <div className="col-span-2 card bg-white p-6">
          <h3 className="font-serif text-[16px] font-bold text-slate-800 mb-4">Ordered Harvest Items</h3>
          <div className="divide-y divide-[#F0EDE6]/60">
            {(order.items || [{ name: order.product, qty: 1, price: order.amount }]).map((item, i) => (
              <div key={i} className="py-4 flex justify-between items-center text-[13.5px]">
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">Qty: {item.qty} units @ ${item.price.toFixed(2)}</p>
                </div>
                <span className="font-bold text-slate-800 font-display">${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#F0EDE6] mt-4 pt-4 flex justify-between items-center font-bold">
            <span className="text-slate-700 text-[14px]">Total Paid Amount</span>
            <span className="text-primary text-lg font-display">${order.amount.toFixed(2)}</span>
          </div>
        </div>

        {/* Buyer logistics cards */}
        <div className="flex flex-col gap-6">
          {/* Buyer credentials */}
          <div className="card bg-white p-5 flex flex-col gap-4">
            <h4 className="font-serif text-[15px] font-bold text-slate-800 flex items-center gap-2 border-b border-[#F0EDE6] pb-3">
              <User className="w-4 h-4 text-primary" />
              <span>Buyer Details</span>
            </h4>
            <div className="text-[13px] flex flex-col gap-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Name</p>
                <p className="font-semibold text-slate-800">{order.customer}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Address</p>
                <p className="font-medium text-slate-500">{order.email || "buyer@marketplace.com"}</p>
              </div>
            </div>
          </div>

          {/* Shipping addresses */}
          <div className="card bg-white p-5 flex flex-col gap-4">
            <h4 className="font-serif text-[15px] font-bold text-slate-800 flex items-center gap-2 border-b border-[#F0EDE6] pb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Logistics Shipping</span>
            </h4>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Delivery Location</p>
              <p className="text-[13px] font-semibold text-slate-800 mt-1 leading-relaxed">
                {order.address || "California Valley Organic Acres, USA"}
              </p>
            </div>
          </div>

          {/* Actions */}
          {order.status !== "Delivered" && (
            <div className="card bg-white p-5 flex flex-col gap-2.5">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-center text-slate-400 mb-1">
                Fulfill Actions
              </h4>
              {order.status === "Pending" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "Shipped")}
                  className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-xs font-bold transition-all"
                >
                  Fulfill & Mark Shipped
                </button>
              )}
              {order.status === "Shipped" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "Delivered")}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold transition-all"
                >
                  Register Delivered
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
