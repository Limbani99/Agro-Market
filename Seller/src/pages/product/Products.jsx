import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { Search, Plus, Edit, Eye, Trash2, SlidersHorizontal, Layers } from "lucide-react";

export default function Products() {
  const { products, deleteProduct } = useData();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Filtering products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || prod.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStockStatusStyle = (stock) => {
    if (stock === 0) return "bg-rose-50 text-rose-600 border border-rose-100";
    if (stock <= 5) return "bg-amber-50 text-amber-600 border border-amber-100";
    return "bg-emerald-50 text-emerald-700 border border-emerald-100";
  };

  const categories = ["All", "Vegetables", "Fruits", "Dairy & Eggs", "Pantry"];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-800">Products Catalog</h2>
          <p className="text-slate-500 text-[13.5px] mt-0.5">List, modify, or remove harvest items in your digital farm store.</p>
        </div>
        <Link to="/products/add" className="btn-primary">
          <Plus className="w-4 h-4 stroke-[3px]" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Control panel (Search & Filter) */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 bg-white rounded-2xl border border-slate-100">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search farm inventory..."
            className="w-full pl-10 pr-4 py-2 text-[13.5px] border border-slate-200/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 bg-bg-light/20 font-medium placeholder-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                categoryFilter === cat
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:text-primary bg-bg-light/50 border border-slate-200/50/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="card bg-white hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
            <div>
              {/* Product Card Image */}
              <div className="relative overflow-hidden aspect-square h-44 w-full border-b border-slate-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${getStockStatusStyle(prod.stock)}`}>
                  {prod.stock === 0 ? "Out of Stock" : (prod.stock <= 5 ? `Low Stock: ${prod.stock}` : "In Stock")}
                </span>
              </div>

              {/* Card content */}
              <div className="p-5">
                <span className="text-[9px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {prod.category}
                </span>
                <h4 className="font-bold text-slate-800 text-[15px] mt-2 group-hover:text-primary transition-colors line-clamp-1">
                  {prod.name}
                </h4>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Unit Price</p>
                    <p className="text-[15px] font-bold text-slate-800 font-display">${prod.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Sales Count</p>
                    <p className="text-[15px] font-bold text-slate-800 font-display">{prod.sales} sold</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-4 pt-0 border-t border-slate-100/60 mt-3 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">Stock: {prod.stock}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => navigate(`/products/${prod.id}`)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(`/products/edit/${prod.id}`)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors"
                  title="Edit Product"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteProduct(prod.id)}
                  className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="card bg-white py-16 text-center text-slate-400 font-medium">
          No organic products matching your queries were found.
        </div>
      )}
    </div>
  );
}


