import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Plus, ChevronLeft, ChevronRight, X, Check } from 'lucide-react'
import ProductHero from '../component/products/ProductHero'
import FilterBar from '../component/products/FilterBar'
import ProductSidebar from '../component/products/ProductSidebar'
import { useData } from '../context/DataProvider'

const categories = [
    { name: 'Vegetables', image: '/assets/cat_veg.png' },
    { name: 'Fruits', image: '/assets/cat_fruit.png' },
    { name: 'Organic', image: '/assets/cat_organic.png' },
]

function Products() {
    const { products, addToCart } = useData();
    const [addedId, setAddedId] = useState(null);

    const handleAdd = (e, product) => {
        e.preventDefault();
        addToCart(product, 1);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (

        <div className="bg-white min-h-screen">
            <ProductHero />


            <FilterBar />


            {/* 3. Category Horizontal List */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat, i) => (
                        <div key={i} className="min-w-[160px] relative h-40 rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                <span className="text-white font-bold">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                    <div className="min-w-[160px] h-40 rounded-2xl bg-orange-50 flex items-center justify-center border-2 border-dashed border-orange-200 group cursor-pointer">
                        <span className="text-orange-400 font-bold group-hover:scale-110 transition-transform">More...</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                <ProductSidebar />


                {/* Main Content */}
                <div className="flex-1">
                    {/* Active Filters */}
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-sm text-slate-400 font-medium">Active Filters:</span>
                        <div className="flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-xs font-bold">
                            Root Vegetables
                            <X className="w-3 h-3 cursor-pointer" />
                        </div>
                        <button className="text-xs text-slate-400 font-bold hover:text-primary transition-colors underline">Clear All</button>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((p) => (
                            <div key={p.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                <Link to={`/product/${p.id}`} className="relative aspect-square overflow-hidden bg-slate-50 block cursor-pointer">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={`px-3 py-1 ${p.badge === 'PEAK SEASON' ? 'bg-orange-500' : 'bg-primary'} text-white text-[10px] font-black rounded-lg`}>
                                            {p.badge}
                                        </span>
                                    </div>
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </Link>
                                <div className="p-6">
                                    <Link to={`/product/${p.id}`} className="text-lg font-bold text-secondary hover:text-primary transition-colors mb-1 truncate block">
                                        {p.name}
                                    </Link>
                                    <Link to={`/farmer/1`} className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
                                        <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-[10px]">🚜</span>
                                        </div>
                                        <span className="text-xs text-primary font-bold hover:underline">{p.seller}</span>
                                    </Link>
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-accent text-accent' : 'text-slate-200'}`} />
                                        ))}
                                        <span className="text-xs text-slate-400 ml-1 font-bold">({p.rating})</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <span className="text-2xl font-black text-secondary">${p.price}</span>
                                            <span className="text-xs text-slate-400 font-bold ml-1">/ {p.unit}</span>
                                        </div>
                                        <button
                                            onClick={(e) => handleAdd(e, p)}
                                            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                                                addedId === p.id
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                            }`}
                                        >
                                            {addedId === p.id ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            {addedId === p.id ? 'Added' : 'Add'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-16 flex items-center justify-center gap-2">
                        <button className="w-10 h-10 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold">1</button>
                        <button className="w-10 h-10 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all">2</button>
                        <button className="w-10 h-10 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all">3</button>
                        <span className="text-slate-400 px-2">...</span>
                        <button className="w-10 h-10 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
