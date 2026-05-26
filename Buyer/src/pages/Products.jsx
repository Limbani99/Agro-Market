import React, { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Star, Plus, ChevronLeft, ChevronRight, X, Check, Heart } from 'lucide-react'
import ProductHero from '../component/products/ProductHero'
import FilterBar from '../component/products/FilterBar'
import ProductSidebar from '../component/products/ProductSidebar'
import { useData } from '../context/DataProvider'

const horizontalCategories = [
    { name: 'Vegetables', image: '/assets/cat_veg.png' },
    { name: 'Fruits', image: '/assets/cat_fruit.png' },
    { name: 'Organic', image: '/assets/cat_organic.png' },
]

function Products() {
    const { products, addToCart, toggleWishlist, isWishlisted } = useData();
    const [searchParams, setSearchParams] = useSearchParams();

    // Filter States
    const [categoryFilter, setCategoryFilter] = useState("All Products");
    const [sortOption, setSortOption] = useState("Most Popular");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
    const [selectedSellerTypes, setSelectedSellerTypes] = useState(['Verified Farmers', 'Direct Producers', 'Co-operatives']);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Sync from URL search params
    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) {
            setCategoryFilter(cat);
        } else {
            setCategoryFilter("All Products");
        }
    }, [searchParams]);

    const [addedId, setAddedId] = useState(null);

    const handleAdd = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        const pid = product.id || product._id;
        setAddedId(pid);
        setTimeout(() => setAddedId(null), 1500);
    };

    // Master filter pipeline
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // Category check
            const matchesCategory = 
                categoryFilter === "All Products" || 
                (p.category && p.category.toLowerCase() === categoryFilter.toLowerCase());

            // Search query check
            const matchesSearch = 
                !searchQuery.trim() || 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

            // Price check
            const matchesPrice = Number(p.price) >= priceRange.min && Number(p.price) <= priceRange.max;

            // Rating check
            const matchesRating = Number(p.rating || 0) >= ratingFilter;

            // Seller Type check
            const sellerId = p.sellerId?._id || p.sellerId?.id || p.sellerId || "1";
            const sellerTypes = ['Verified Farmers', 'Direct Producers', 'Co-operatives'];
            const hash = sellerId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const pSellerType = sellerTypes[hash % sellerTypes.length];
            const matchesSellerType = selectedSellerTypes.includes(pSellerType);

            return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesSellerType;
        });
    }, [products, categoryFilter, searchQuery, priceRange, ratingFilter, selectedSellerTypes]);

    // Master sort pipeline
    const sortedProducts = useMemo(() => {
        const list = [...filteredProducts];
        if (sortOption === "Price: Low to High") {
            return list.sort((a, b) => Number(a.price) - Number(b.price));
        }
        if (sortOption === "Price: High to Low") {
            return list.sort((a, b) => Number(b.price) - Number(a.price));
        }
        if (sortOption === "Customer Ratings") {
            return list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        }
        // Most Popular (default) sorts by reviews or placeholders
        return list.sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0));
    }, [filteredProducts, sortOption]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [categoryFilter, searchQuery, priceRange, ratingFilter, sortOption]);

    // Client-side pagination calculations
    const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedProducts, currentPage]);

    // Check if any filter is actively selected
    const activeFilters = useMemo(() => {
        const list = [];
        if (categoryFilter !== "All Products") {
            list.push({ type: "category", label: `Category: ${categoryFilter}`, reset: () => {
                setCategoryFilter("All Products");
                setSearchParams({});
            }});
        }
        if (searchQuery.trim() !== "") {
            list.push({ type: "search", label: `Search: "${searchQuery}"`, reset: () => setSearchQuery("") });
        }
        if (ratingFilter > 0) {
            list.push({ type: "rating", label: `${ratingFilter}+ Stars`, reset: () => setRatingFilter(0) });
        }
        if (priceRange.min > 0 || priceRange.max < 500) {
            list.push({ type: "price", label: `Price: $${priceRange.min}-$${priceRange.max}`, reset: () => setPriceRange({ min: 0, max: 500 }) });
        }
        return list;
    }, [categoryFilter, searchQuery, ratingFilter, priceRange]);

    const handleClearAll = () => {
        setCategoryFilter("All Products");
        setSearchQuery("");
        setRatingFilter(0);
        setPriceRange({ min: 0, max: 500 });
        setSelectedSellerTypes(['Verified Farmers', 'Direct Producers', 'Co-operatives']);
        setSearchParams({});
    };

    return (
        <div className="bg-white min-h-screen font-body">
            {/* 1. Dynamic Hero Search */}
            <ProductHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* 2. Dynamic Count & Sort Bar */}
            <FilterBar 
                totalCount={sortedProducts.length} 
                sortOption={sortOption} 
                setSortOption={setSortOption} 
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {/* 3. Category Horizontal Clickable Slides */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {horizontalCategories.map((cat, i) => (
                        <div 
                            key={i} 
                            onClick={() => {
                                setCategoryFilter(cat.name);
                                setSearchParams({ category: cat.name });
                            }}
                            className={`min-w-[160px] relative h-40 rounded-2xl overflow-hidden group cursor-pointer shadow-sm border-2 transition-all ${
                                categoryFilter.toLowerCase() === cat.name.toLowerCase() ? 'border-primary' : 'border-transparent'
                            }`}
                        >
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                <span className="text-white font-bold">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                    <div 
                        onClick={() => {
                            setCategoryFilter("All Products");
                            setSearchParams({});
                        }}
                        className="min-w-[160px] h-40 rounded-2xl bg-primary-light flex items-center justify-center border-2 border-dashed border-primary/20 group cursor-pointer"
                    >
                        <span className="text-primary font-bold group-hover:scale-110 transition-transform">All Crops...</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                {/* 4. Dynamic Sidebar */}
                <ProductSidebar 
                    categoryFilter={categoryFilter}
                    setCategoryFilter={(cat) => {
                        setCategoryFilter(cat);
                        if (cat === "All Products") setSearchParams({});
                        else setSearchParams({ category: cat });
                    }}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedSellerTypes={selectedSellerTypes}
                    setSelectedSellerTypes={setSelectedSellerTypes}
                    ratingFilter={ratingFilter}
                    setRatingFilter={setRatingFilter}
                    products={products}
                />

                {/* Main Content */}
                <div className="flex-1">
                    {/* Active Filters Row */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 mb-8 bg-slate-50 p-3 rounded-2xl border border-slate-100/60">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Filters:</span>
                            {activeFilters.map((filt, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-bold shadow-xs">
                                    {filt.label}
                                    <X className="w-3.5 h-3.5 cursor-pointer hover:scale-110 transition-transform" onClick={filt.reset} />
                                </div>
                            ))}
                            <button 
                                onClick={handleClearAll}
                                className="text-xs text-primary font-extrabold hover:text-primary-dark transition-colors cursor-pointer ml-auto pr-2"
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Product Grid */}
                    {paginatedProducts.length === 0 ? (
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-16 text-center">
                            <p className="text-slate-400 font-extrabold text-sm">No crops match your active filter settings.</p>
                            <button 
                                onClick={handleClearAll}
                                className="mt-4 px-6 py-2.5 bg-primary text-white rounded-full font-bold text-xs shadow-xs hover:bg-primary-dark transition-colors cursor-pointer"
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedProducts.map((p) => {
                                const pid = p.id || p._id;
                                const sellerId = p.sellerId?._id || p.sellerId?.id || p.sellerId || "1";
                                return (
                                    <div key={pid} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
                                        <Link to={`/product/${pid}`} className="relative aspect-square overflow-hidden bg-slate-50 block cursor-pointer">
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className={`px-3 py-1 ${p.badge === 'PEAK SEASON' ? 'bg-orange-500' : 'bg-primary'} text-white text-[10px] font-black rounded-lg`}>
                                                    {p.badge || 'ORGANIC'}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4 z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleWishlist(p);
                                                    }}
                                                    className="w-8 h-8 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-md text-red-500 hover:scale-110 transition-transform cursor-pointer"
                                                >
                                                    <Heart className={`w-4 h-4 ${isWishlisted(pid) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                                                </button>
                                            </div>
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </Link>
                                        <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                                            <div>
                                                <Link to={`/product/${pid}`} className="text-lg font-bold text-secondary hover:text-primary transition-colors mb-1 truncate block">
                                                    {p.name}
                                                </Link>
                                                <Link to={`/farmer/${sellerId}`} className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
                                                    <div className="w-4 h-4 bg-primary-light rounded-full flex items-center justify-center">
                                                        <span className="text-[10px]">🚜</span>
                                                    </div>
                                                    <span className="text-xs text-primary font-bold hover:underline">{p.seller}</span>
                                                </Link>
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating || 4.8) ? 'fill-accent text-accent' : 'text-slate-200'}`} />
                                                    ))}
                                                    <span className="text-[10px] text-slate-400 ml-1 font-bold">({p.rating || 4.8})</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 shrink-0">
                                                <div>
                                                    <span className="text-2xl font-black text-secondary">${Number(p.price).toFixed(2)}</span>
                                                    <span className="text-xs text-slate-400 font-bold ml-1">/ {p.unit || 'lb'}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => handleAdd(e, p)}
                                                    className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer text-xs ${
                                                        addedId === pid
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                                    }`}
                                                >
                                                    {addedId === pid ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    {addedId === pid ? 'Added' : 'Add'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {paginatedProducts.map((p) => {
                                const pid = p.id || p._id;
                                const sellerId = p.sellerId?._id || p.sellerId?.id || p.sellerId || "1";
                                return (
                                    <div key={pid} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col sm:flex-row p-4 gap-6 relative">
                                        {/* Image on left */}
                                        <Link to={`/product/${pid}`} className="relative w-full sm:w-48 h-48 sm:h-auto aspect-square overflow-hidden bg-slate-50 rounded-2xl shrink-0 block cursor-pointer">
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className={`px-3 py-1 ${p.badge === 'PEAK SEASON' ? 'bg-orange-500' : 'bg-primary'} text-white text-[10px] font-black rounded-lg`}>
                                                    {p.badge || 'ORGANIC'}
                                                </span>
                                            </div>
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </Link>
                                        
                                        {/* Content on right */}
                                        <div className="flex-1 flex flex-col justify-between py-2">
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <Link to={`/product/${pid}`} className="text-xl font-bold text-secondary hover:text-primary transition-colors block">
                                                            {p.name}
                                                        </Link>
                                                        <span className="text-primary font-bold text-[10px] uppercase tracking-wider block mt-0.5">{p.category}</span>
                                                    </div>
                                                    
                                                    {/* Wishlist button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            toggleWishlist(p);
                                                        }}
                                                        className="w-8 h-8 bg-slate-50 hover:bg-red-50 rounded-full flex items-center justify-center shadow-xs text-red-500 hover:scale-110 transition-transform cursor-pointer"
                                                    >
                                                        <Heart className={`w-4 h-4 ${isWishlisted(pid) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                                                    </button>
                                                </div>
                                                
                                                <Link to={`/farmer/${sellerId}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
                                                    <div className="w-4 h-4 bg-primary-light rounded-full flex items-center justify-center">
                                                        <span className="text-[10px]">🚜</span>
                                                    </div>
                                                    <span className="text-xs text-primary font-bold hover:underline">{p.seller}</span>
                                                </Link>
                                                
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(p.rating || 4.8) ? 'fill-accent text-accent' : 'text-slate-200'}`} />
                                                    ))}
                                                    <span className="text-[11px] text-slate-400 ml-1 font-bold">({p.rating || 4.8})</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 sm:mt-0">
                                                <div>
                                                    <span className="text-2xl font-black text-secondary">${Number(p.price).toFixed(2)}</span>
                                                    <span className="text-xs text-slate-400 font-bold ml-1">/ {p.unit || 'lb'}</span>
                                                </div>
                                                <button
                                                    onClick={(e) => handleAdd(e, p)}
                                                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer text-xs ${
                                                        addedId === pid
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'
                                                    }`}
                                                >
                                                    {addedId === pid ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    {addedId === pid ? 'Added' : 'Add to Cart'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination Grid Controls */}
                    {totalPages > 1 && (
                        <div className="mt-16 flex items-center justify-center gap-2">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-45 disabled:hover:bg-transparent transition-all cursor-pointer"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors cursor-pointer ${
                                        currentPage === i + 1
                                            ? 'bg-primary text-white'
                                            : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-45 disabled:hover:bg-transparent transition-all cursor-pointer"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products
