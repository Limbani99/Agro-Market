import React, { useMemo } from 'react'
import { Star, ChevronRight, Check } from 'lucide-react'

const ProductSidebar = ({ 
    categoryFilter, 
    setCategoryFilter, 
    priceRange, 
    setPriceRange, 
    selectedSellerTypes, 
    setSelectedSellerTypes, 
    ratingFilter, 
    setRatingFilter, 
    products 
}) => {

    // Calculate unique category counts dynamically from active database products
    const categoriesList = useMemo(() => {
        const uniqueCats = new Set();
        products.forEach(p => {
            if (p.category) {
                const formatted = p.category.trim().charAt(0).toUpperCase() + p.category.trim().slice(1).toLowerCase();
                uniqueCats.add(formatted);
            }
        });
        
        const sortedCats = Array.from(uniqueCats).sort();
        return [
            { name: "All Products", count: products.length },
            ...sortedCats.map(catName => ({
                name: catName,
                count: products.filter(p => p.category && p.category.trim().toLowerCase() === catName.toLowerCase()).length
            }))
        ];
    }, [products]);

    // Slider bounds
    const sliderMax = 500;
    const minPercent = Math.min(100, (priceRange.min / sliderMax) * 100);
    const maxPercent = Math.min(100, (priceRange.max / sliderMax) * 100);

    const handleSellerTypeToggle = (type) => {
        setSelectedSellerTypes(prev => {
            if (prev.includes(type)) {
                return prev.filter(t => t !== type);
            } else {
                return [...prev, type];
            }
        });
    };

    return (
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
            {/* Categories Shelf */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6 flex items-center justify-between">
                    Categories
                    <span className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-xs text-slate-400 font-extrabold">
                        {categoriesList.length - 1}
                    </span>
                </h3>
                <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-100 scrollbar-track-transparent">
                    {categoriesList.map((cat) => {
                        const isAll = cat.name === "All Products";
                        const isActive = isAll 
                            ? categoryFilter === "All Products"
                            : categoryFilter.toLowerCase() === cat.name.toLowerCase();

                        return (
                            <button 
                                key={cat.name} 
                                onClick={() => setCategoryFilter(isAll ? "All Products" : cat.name)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-black transition-all group cursor-pointer ${
                                    isActive 
                                        ? 'bg-primary text-white shadow-md shadow-primary/10' 
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                                }`}
                            >
                                <span className="truncate">{cat.name}</span>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className={`text-[10px] font-black ${isActive ? 'text-white/70' : 'text-slate-300'}`}>
                                        {cat.count}
                                    </span>
                                    <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                                        isActive ? 'text-white' : 'text-slate-300'
                                    }`} />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Range Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6">Price Range</h3>
                <div className="px-2">
                    {/* Double Bound Range Sliders */}
                    <div className="relative w-full h-1.5 bg-slate-100 rounded-full mb-6 mt-4">
                        <div 
                            className="absolute h-full bg-primary rounded-full"
                            style={{
                                left: `${minPercent}%`,
                                right: `${100 - maxPercent}%`
                            }}
                        />
                        <input 
                            type="range"
                            min="0"
                            max="500"
                            value={priceRange.min}
                            onChange={(e) => {
                                const val = Math.min(Number(e.target.value), priceRange.max);
                                setPriceRange(prev => ({ ...prev, min: val }));
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                        />
                        <input 
                            type="range"
                            min="0"
                            max="500"
                            value={priceRange.max}
                            onChange={(e) => {
                                const val = Math.max(Number(e.target.value), priceRange.min);
                                setPriceRange(prev => ({ ...prev, max: val }));
                            }}
                            className="absolute inset-0 w-full h-full pointer-events-none appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md"
                        />
                    </div>

                    {/* Numeric Input Boxes */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 bg-slate-50 p-2 rounded-xl border border-slate-100 focus-within:border-primary transition-colors">
                            <span className="text-[9px] text-slate-400 block uppercase font-black tracking-wider mb-0.5">Min</span>
                            <div className="flex items-center">
                                <span className="text-xs font-bold text-secondary mr-0.5">$</span>
                                <input 
                                    type="number"
                                    min="0"
                                    max="500"
                                    value={priceRange.min}
                                    onChange={(e) => {
                                        const val = Math.max(0, Math.min(Number(e.target.value), priceRange.max));
                                        setPriceRange(prev => ({ ...prev, min: val }));
                                    }}
                                    className="w-full bg-transparent text-xs font-bold text-secondary focus:outline-hidden border-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-50 p-2 rounded-xl border border-slate-100 focus-within:border-primary transition-colors">
                            <span className="text-[9px] text-slate-400 block uppercase font-black tracking-wider mb-0.5">Max</span>
                            <div className="flex items-center">
                                <span className="text-xs font-bold text-secondary mr-0.5">$</span>
                                <input 
                                    type="number"
                                    min="0"
                                    max="500"
                                    value={priceRange.max}
                                    onChange={(e) => {
                                        const val = Math.max(priceRange.min, Math.min(Number(e.target.value), 500));
                                        setPriceRange(prev => ({ ...prev, max: val }));
                                    }}
                                    className="w-full bg-transparent text-xs font-bold text-secondary focus:outline-hidden border-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seller Type Filter */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6">Seller Type</h3>
                <div className="space-y-3.5">
                    {['Verified Farmers', 'Direct Producers', 'Co-operatives'].map((type) => {
                        const isChecked = selectedSellerTypes.includes(type);
                        return (
                            <button 
                                key={type} 
                                onClick={() => handleSellerTypeToggle(type)}
                                className="flex items-center gap-3 cursor-pointer group w-full text-left bg-transparent border-none p-0"
                            >
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                    isChecked ? 'bg-primary border-primary' : 'border-slate-200 group-hover:border-primary'
                                }`}>
                                    {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[4px]" />}
                                </div>
                                <span className={`text-sm font-bold transition-colors ${
                                    isChecked ? 'text-secondary' : 'text-slate-500 group-hover:text-secondary'
                                }`}>
                                    {type}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Ratings Filter */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-secondary font-black text-lg mb-6">Customer Ratings</h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const isActive = ratingFilter === rating;
                        return (
                            <button 
                                key={rating} 
                                onClick={() => setRatingFilter(isActive ? 0 : rating)}
                                className={`flex items-center justify-between w-full px-3 py-2 rounded-2xl transition-all cursor-pointer ${
                                    isActive 
                                        ? 'bg-primary-light text-primary font-black shadow-xs' 
                                        : 'hover:bg-slate-50 text-slate-500 hover:text-secondary'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-0.5 shrink-0">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3.5 h-3.5 ${
                                                i < rating ? 'fill-accent text-accent' : 'text-slate-200'
                                            }`} />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold shrink-0">
                                        {rating === 5 ? '5 Stars Only' : '& Up'}
                                    </span>
                                </div>
                                {isActive && <Check className="w-3.5 h-3.5 text-primary stroke-[3px]" />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    )
}

export default ProductSidebar
