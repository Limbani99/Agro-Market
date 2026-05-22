import React, { useState } from 'react'
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductInfo = () => {
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <span className="text-orange-700 font-bold text-sm uppercase tracking-wider mb-2 block">Leafy Greens</span>
                <h1 className="text-4xl lg:text-5xl font-black text-secondary mb-4">Organic Lacinato Kale</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-orange-700 text-orange-700' : 'text-slate-200'}`} />
                        ))}
                    </div>
                    <span className="text-sm font-bold text-slate-400">4.9 (128 reviews)</span>
                    <span className="text-slate-300 hidden sm:inline">|</span>
                    <Link to="/farmer/1" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                        🚜 Riverbend Farm
                    </Link>
                </div>

                <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-secondary">$4.50</span>
                        <span className="text-slate-400 font-bold">/ bunch</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black border border-green-100">
                        <CheckCircle2 className="w-3 h-3" />
                        IN STOCK
                    </div>
                </div>

                <p className="text-slate-500 leading-relaxed mb-10 text-lg">
                    Also known as Dinosaur Kale, this dark, leafy green is deeply textured and packed with earthy, nutty flavor. 
                    Perfect for hearty salads, braising, or baking into crispy chips. Harvested daily for maximum freshness.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
                    <div className="flex items-center justify-between border-2 border-slate-100 rounded-2xl p-1 bg-white sm:w-32">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 text-slate-400 hover:text-secondary transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-secondary text-lg">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-3 text-slate-400 hover:text-secondary transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <Link to="/cart" className="flex-1 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-red-900/10 transition-all active:scale-95">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                    </Link>

                    <button className="p-4 border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
                        <Heart className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <Truck className="w-5 h-5 text-orange-700" />
                </div>
                <div>
                    <h4 className="text-secondary font-black text-sm mb-1">Available for delivery tomorrow</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Order within <span className="text-orange-700 font-bold">4 hours</span> to guarantee next-day arrival.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo
