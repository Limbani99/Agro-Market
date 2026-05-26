import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { ArrowLeft, Star, Boxes, Edit, DollarSign } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, reviews } = useData();
  const [activeIndex, setActiveIndex] = useState(0);

  const product = products.find((p) => p.id?.toString() === id?.toString());

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 font-medium">Product listing not found.</p>
        <Link to="/products" className="btn-primary mt-4">Return to Inventory</Link>
      </div>
    );
  }

  // Filter reviews matching this specific product
  const productReviews = reviews.filter(
    (r) => r.product.toLowerCase().includes(product.name.toLowerCase()) || 
           product.name.toLowerCase().includes(r.product.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      {/* Return & Edit buttons */}
      <div className="flex justify-between items-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Products</span>
        </Link>

        <button
          onClick={() => navigate(`/products/edit/${product.id}`)}
          className="btn-outline text-xs px-4 py-2"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Modify Listing</span>
        </button>
      </div>

      {/* Main product card */}
      <div className="card bg-white p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Photo Gallery */}
        <div className="flex flex-col gap-4">
          {/* Main Display Photo */}
          <div className="rounded-2xl overflow-hidden aspect-square h-[300px] w-full border border-slate-100 bg-slate-50 relative group shadow-sm">
            <img
              src={
                (product.images && product.images.length > 0 && product.images[activeIndex]) ||
                product.image ||
                "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200"
              }
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails Row */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((imgUrl, idx) => {
                if (!imgUrl) return null;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 bg-slate-50 transition-all duration-200 relative ${
                      isActive
                        ? "border-primary ring-2 ring-primary/20 scale-[0.98]"
                        : "border-[#EAE6DB] hover:border-slate-400 scale-100 hover:scale-[1.02]"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 px-1 bg-primary text-white text-[7px] font-bold rounded uppercase tracking-wider scale-75 origin-bottom-left">
                        Cover
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product specs details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md uppercase tracking-wider">
              {product.category}
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-800 mt-3">{product.name}</h3>

            {/* Ratings summary */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-current"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-500">
                {product.rating.toFixed(1)} rating ({productReviews.length} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-[13.5px] text-slate-500 mt-4 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Quick Metrics grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="bg-bg-light p-4 rounded-2xl border border-[#EAE6DB]/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Boxes className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Stock Left</p>
                <p className="text-[15px] font-bold text-slate-800">{product.stock} units</p>
              </div>
            </div>

            <div className="bg-bg-light p-4 rounded-2xl border border-[#EAE6DB]/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Market Price</p>
                <p className="text-[15px] font-bold text-slate-800">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Reviews section */}
      <div className="card bg-white p-6">
        <h4 className="font-serif text-lg font-bold text-slate-800 mb-4">Buyer Reviews for this Crop</h4>
        {productReviews.length === 0 ? (
          <p className="text-slate-400 text-sm font-medium py-4">No specific buyer reviews listed for this item yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {productReviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-bg-light/40 border border-[#EAE6DB]/40 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-slate-700">{rev.author}</span>
                  <div className="flex text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 ml-auto">{rev.date}</span>
                </div>
                <p className="text-[12.5px] text-slate-500 italic font-medium leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


