import React, { useState } from 'react'
import { Star, Minus, Plus, ShoppingCart, Heart, Truck, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useData } from '../../context/DataProvider'

const ProductInfo = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const { addToCart } = useData()

    const handleAddToCart = () => {
        addToCart(product, quantity)
        setAdded(true)
        setTimeout(() => setAdded(false), 1500)
    }

    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock > 0 && product.stock <= 5;

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <span className="text-orange-700 font-bold text-sm uppercase tracking-wider mb-2 block">{product.category}</span>
                <h1 className="text-4xl lg:text-5xl font-black text-secondary mb-4">{product.name}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.8) ? 'fill-orange-700 text-orange-700' : 'text-slate-200'}`} />
                        ))}
                    </div>
                    <span className="text-sm font-bold text-slate-400">{product.rating || 4.8} (24 reviews)</span>
                    <span className="text-slate-300 hidden sm:inline">|</span>
                    <Link to="/farmer/1" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                        🚜 {product.seller || 'Riverbend Farm'}
                    </Link>
                </div>

                <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-secondary">${product.price}</span>
                        <span className="text-slate-400 font-bold">/ {product.unit || 'unit'}</span>
                    </div>
                    <div>
                        {isOutOfStock ? (
                            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black border border-red-100">
                                <CheckCircle2 className="w-3 h-3 text-red-500" />
                                OUT OF STOCK
                            </div>
                        ) : isLowStock ? (
                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-black border border-amber-100">
                                <CheckCircle2 className="w-3 h-3 text-amber-500" />
                                LOW STOCK ({product.stock} left)
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black border border-green-100">
                                <CheckCircle2 className="w-3 h-3" />
                                IN STOCK
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-slate-500 leading-relaxed mb-10 text-lg">
                    {product.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-8">
                    <div className="flex items-center justify-between border-2 border-slate-100 rounded-2xl p-1 bg-white sm:w-32">
                        <button 
                            disabled={isOutOfStock}
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 text-slate-400 hover:text-secondary disabled:opacity-30 transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-secondary text-lg">{isOutOfStock ? 0 : quantity}</span>
                        <button 
                            disabled={isOutOfStock}
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-3 text-slate-400 hover:text-secondary disabled:opacity-30 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <button 
                        disabled={isOutOfStock}
                        onClick={handleAddToCart}
                        className={`flex-1 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                            added
                                ? 'bg-green-600 shadow-green-900/10 text-white'
                                : 'bg-[#b91c1c] hover:bg-[#991b1b] text-white shadow-red-900/10'
                        }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {added ? 'Added to Cart!' : 'Add to Cart'}
                    </button>

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
