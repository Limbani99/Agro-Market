import React from "react";
import { useData } from "../context/DataProvider";
import { Boxes, Package, Plus } from "lucide-react";

export default function Inventory() {
  const { products } = useData();

  const getStockStatusStyle = (stock) => {
    if (stock === 0) return "bg-red-50 text-red-600 border border-red-100";
    if (stock <= 5) return "bg-amber-50 text-amber-600 border border-amber-100";
    return "bg-emerald-50 text-emerald-700 border border-emerald-100";
  };

  const getStockStatusText = (stock) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-800">Farm Inventory</h2>
          <p className="text-slate-500 text-[13.5px] mt-0.5">Manage and track your organic harvest listings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-white hover:shadow-md transition-shadow group flex flex-col justify-between">
            <div>
              <div className="relative overflow-hidden aspect-square h-48 w-full border-b border-[#E9E6DC]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${getStockStatusStyle(product.stock)}`}>
                  {getStockStatusText(product.stock)}
                </span>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {product.category}
                </span>
                <h4 className="font-bold text-slate-800 text-[16px] mt-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Price</p>
                    <p className="text-[16px] font-bold text-slate-800 font-display">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Stock Qty</p>
                    <p className={`text-[16px] font-bold font-display ${product.stock <= 5 ? "text-amber-600" : "text-slate-800"}`}>
                      {product.stock} units
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-[#F0EDE6]/60 mt-3 flex justify-between items-center text-[12px] font-semibold text-slate-500">
              <span>Rating: {product.rating.toFixed(1)} ★</span>
              <span>Sales: {product.sales} units</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
