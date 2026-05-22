import React from 'react'
import { Star, ChevronRight, Check } from 'lucide-react'

const categories = [
    { name: 'All Products', count: 124 },
    { name: 'Vegetables', count: 45, active: true },
    { name: 'Fruits', count: 32 },
    { name: 'Organic', count: 18 },
    { name: 'Dairy & Eggs', count: 12 },
    { name: 'Meat & Poultry', count: 9 },
    { name: 'Herbs & Spices', count: 8 },
]

const ProductSidebar = () => {
    return (
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6 flex items-center justify-between">
                    Categories
                    <span className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-xs text-slate-400">7</span>
                </h3>
                <div className="space-y-1">
                    {categories.map((cat) => (
                        <button 
                            key={cat.name} 
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all group ${
                                cat.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                            }`}
                        >
                            {cat.name}
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] ${cat.active ? 'text-white/70' : 'text-slate-300'}`}>{cat.count}</span>
                                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${cat.active ? 'text-white' : 'text-slate-300'}`} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6">Price Range</h3>
                <div className="px-2">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full relative mb-6">
                        <div className="absolute inset-y-0 left-[20%] right-[30%] bg-primary rounded-full" />
                        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md cursor-pointer" />
                        <div className="absolute top-1/2 right-[30%] -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block uppercase font-black">Min</span>
                            <span className="text-sm font-bold text-secondary">$10</span>
                        </div>
                        <div className="flex-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block uppercase font-black">Max</span>
                            <span className="text-sm font-bold text-secondary">$500</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seller Type */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6">Seller Type</h3>
                <div className="space-y-3">
                    {['Verified Farmers', 'Direct Producers', 'Co-operatives'].map((type, i) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                i === 0 ? 'bg-primary border-primary' : 'border-slate-200 group-hover:border-primary'
                            }`}>
                                {i === 0 && <Check className="w-3 h-3 text-white stroke-[4px]" />}
                            </div>
                            <span className={`text-sm font-bold ${i === 0 ? 'text-secondary' : 'text-slate-500 group-hover:text-secondary'}`}>
                                {type}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Ratings */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6">Customer Ratings</h3>
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button key={rating} className="flex items-center gap-3 w-full group">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-accent text-accent' : 'text-slate-200'}`} />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-slate-400 group-hover:text-secondary transition-colors">& Up</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default ProductSidebar
