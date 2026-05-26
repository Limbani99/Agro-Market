import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, MapPin, Star, ChevronDown, CheckCircle2, Heart, AlertCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataProvider';

const Farmers = () => {
    const { products, toggleFavoriteFarmer, isFavoriteFarmer } = useData();
    const [farmersList, setFarmersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Core Dynamic Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('All Locations');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [organicOnly, setOrganicOnly] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [sortOption, setSortOption] = useState('Top Rated');

    // UI Dropdown States
    const [locationOpen, setLocationOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    // Refs for outside-click handlers
    const locationRef = useRef(null);
    const categoryRef = useRef(null);
    const sortRef = useRef(null);

    useEffect(() => {
        const fetchFarmers = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/users/farmers");
                setFarmersList(res.data.farmers || []);
            } catch (err) {
                console.error("Error fetching farmers:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFarmers();
    }, []);

    // Detect clicks outside dropdowns to close them
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (locationRef.current && !locationRef.current.contains(event.target)) setLocationOpen(false);
            if (categoryRef.current && !categoryRef.current.contains(event.target)) setCategoryOpen(false);
            if (sortRef.current && !sortRef.current.contains(event.target)) setSortOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 1. Map raw farmer objects with dynamic database products details
    const mappedFarmers = useMemo(() => {
        return farmersList.map(farmer => {
            // Find products listed by this farmer
            const farmerProducts = products.filter(p => {
                const sId = p.sellerId?._id || p.sellerId?.id || (typeof p.sellerId === 'string' ? p.sellerId : null);
                return String(sId) === String(farmer._id);
            });

            const averageRating = farmerProducts.length > 0
                ? (farmerProducts.reduce((sum, p) => sum + (p.rating || 4.8), 0) / farmerProducts.length).toFixed(1)
                : "4.8";

            const farmName = farmer.farmName || "Agro Market";
            const location = farmer.location || "California Valley Organic Acres, USA";
            const bio = farmer.bio || "Regenerative organic small-scale family farm committed to chemical-free harvest cultivation.";
            const avatarImage = farmer.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${farmer.name}`;
            
            // Preview photos (max 3 unique images)
            const placeholders = [
                "https://images.unsplash.com/photo-1590005026998-3850734a6540?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
                "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
            ];
            
            const previewImages = [];
            
            // Add actual crop images listed by the grower
            farmerProducts.forEach(p => {
                const img = p.image || p.images?.[0];
                if (img && !previewImages.includes(img) && previewImages.length < 3) {
                    previewImages.push(img);
                }
            });
            
            // Pad with unique organic crop placeholders
            let placeIdx = 0;
            while (previewImages.length < 3) {
                const ph = placeholders[placeIdx % placeholders.length];
                if (!previewImages.includes(ph)) {
                    previewImages.push(ph);
                } else {
                    previewImages.push(`${ph}&rand=${placeIdx}`);
                }
                placeIdx++;
            }

            const registrationYear = new Date(farmer.createdAt || Date.now()).getFullYear();
            const activeYears = Math.max(1, new Date().getFullYear() - registrationYear + 1);

            return {
                id: farmer._id,
                name: farmer.name,
                farmName,
                rating: Number(averageRating),
                location,
                description: bio,
                experience: `${activeYears} Year${activeYears > 1 ? 's' : ''}`,
                rawExperience: activeYears,
                deliveriesCount: farmerProducts.length * 8 + 5,
                customers: `${farmerProducts.length * 8 + 5}+`,
                bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                avatar: avatarImage,
                products: previewImages,
                farmerProducts
            };
        });
    }, [farmersList, products]);

    // Gather unique Locations dynamically split nicely by region
    const uniqueLocations = useMemo(() => {
        const locs = new Set();
        farmersList.forEach(farmer => {
            if (farmer.location) {
                const parts = farmer.location.split(',');
                const stateOrCity = parts.length > 1 ? parts[parts.length - 2].trim() : farmer.location.trim();
                locs.add(stateOrCity);
            }
        });
        return ["All Locations", ...Array.from(locs).sort()];
    }, [farmersList]);

    // Gather unique categories dynamically from products context
    const uniqueCategories = useMemo(() => {
        const cats = new Set();
        products.forEach(p => {
            if (p.category) {
                const formatted = p.category.trim().charAt(0).toUpperCase() + p.category.trim().slice(1).toLowerCase();
                cats.add(formatted);
            }
        });
        return ["All Categories", ...Array.from(cats).sort()];
    }, [products]);

    // 2. Active master dynamic filter pipeline
    const filteredFarmers = useMemo(() => {
        return mappedFarmers.filter(f => {
            // Search Term check
            const matchesSearch = 
                !searchTerm.trim() || 
                f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                f.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                f.location.toLowerCase().includes(searchTerm.toLowerCase());

            // Location selection check
            const matchesLocation = 
                selectedLocation === "All Locations" || 
                f.location.toLowerCase().includes(selectedLocation.toLowerCase());

            // Category selection check
            const matchesCategory = 
                selectedCategory === "All Categories" || 
                f.farmerProducts.some(p => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());

            // Organic heuristic check
            const isOrganic = 
                f.farmName.toLowerCase().includes('organic') || 
                f.description.toLowerCase().includes('organic') || 
                f.farmerProducts.some(p => p.badge === 'ORGANIC');
            const matchesOrganic = !organicOnly || isOrganic;

            // Rating score check
            const matchesRating = f.rating >= minRating;

            return matchesSearch && matchesLocation && matchesCategory && matchesOrganic && matchesRating;
        });
    }, [mappedFarmers, searchTerm, selectedLocation, selectedCategory, organicOnly, minRating]);

    // 3. Dynamic Sort pipeline
    const sortedFarmers = useMemo(() => {
        const list = [...filteredFarmers];
        if (sortOption === "Top Rated") {
            return list.sort((a, b) => b.rating - a.rating);
        }
        if (sortOption === "Experience") {
            return list.sort((a, b) => b.rawExperience - a.rawExperience);
        }
        if (sortOption === "Most Active") {
            return list.sort((a, b) => b.deliveriesCount - a.deliveriesCount);
        }
        return list;
    }, [filteredFarmers, sortOption]);

    if (isLoading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center py-24">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-400 font-bold text-sm">Loading our trusted growers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bg-light min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[450px] md:h-[500px] w-full flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Farm Fields" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-[-50px]">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg leading-tight">
                        Meet Our<br/>Trusted Farmers
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-medium mb-10 drop-shadow-md">
                        Connect directly with experienced local farmers and buy fresh farm products with trust and transparency.
                    </p>
                    
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 flex items-center gap-2 max-w-2xl mx-auto shadow-xl">
                        <div className="flex-1 flex items-center bg-white/90 rounded-full px-4 py-3">
                            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by grower name, farm, or location..." 
                                className="bg-transparent border-none focus:outline-none focus:ring-0 text-slate-700 w-full font-medium"
                            />
                        </div>
                        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold transition-colors whitespace-nowrap shrink-0 shadow-md cursor-pointer">
                            Explore Farmers
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Bar (Overlapping) */}
            <div className="container mx-auto px-4 lg:px-8 relative z-20 mt-[-40px]">
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-xl border border-slate-100 flex flex-col md:flex-row flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        
                        {/* Locations Custom Dropdown */}
                        <div className="relative flex-1 md:flex-none" ref={locationRef}>
                            <button 
                                onClick={() => setLocationOpen(!locationOpen)}
                                className="flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 font-medium hover:bg-slate-100 transition-colors w-full md:w-auto text-xs cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-slate-400" /> 
                                    {selectedLocation}
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${locationOpen ? 'rotate-180 text-primary' : ''}`} />
                            </button>
                            {locationOpen && (
                                <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
                                    {uniqueLocations.map(loc => (
                                        <button
                                            key={loc}
                                            onClick={() => {
                                                setSelectedLocation(loc);
                                                setLocationOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                                selectedLocation === loc 
                                                    ? 'bg-primary text-white' 
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                                            }`}
                                        >
                                            {loc}
                                            {selectedLocation === loc && <Check className="w-3.5 h-3.5" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Categories Custom Dropdown */}
                        <div className="relative flex-1 md:flex-none" ref={categoryRef}>
                            <button 
                                onClick={() => setCategoryOpen(!categoryOpen)}
                                className="flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 font-medium hover:bg-slate-100 transition-colors w-full md:w-auto text-xs cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-slate-400" /> 
                                    {selectedCategory}
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${categoryOpen ? 'rotate-180 text-primary' : ''}`} />
                            </button>
                            {categoryOpen && (
                                <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
                                    {uniqueCategories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => {
                                                setSelectedCategory(cat);
                                                setCategoryOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                                selectedCategory === cat 
                                                    ? 'bg-primary text-white' 
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                                            }`}
                                        >
                                            {cat}
                                            {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Organic Toggle Checkbox */}
                        <label className="flex items-center gap-2 cursor-pointer ml-2 text-xs select-none">
                            <input 
                                type="checkbox" 
                                checked={organicOnly}
                                onChange={(e) => setOrganicOnly(e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary" 
                            />
                            <span className="text-slate-600 font-bold">Organic Only</span>
                        </label>

                        {/* Rating filter button */}
                        <div className="flex items-center gap-3 ml-4">
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Rating:</span>
                            <button 
                                onClick={() => setMinRating(prev => prev === 4 ? 0 : 4)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                    minRating === 4 
                                        ? 'bg-primary text-white shadow-xs' 
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                4+ Stars
                            </button>
                        </div>
                    </div>
                    
                    {/* Sort Selector Dropdown */}
                    <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 justify-end text-xs relative" ref={sortRef}>
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Sort by:</span>
                        <button 
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center gap-2 px-4 py-2 text-secondary font-bold hover:text-primary transition-colors cursor-pointer"
                        >
                            {sortOption} <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180 text-primary' : ''}`} />
                        </button>
                        {sortOpen && (
                            <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                {["Top Rated", "Experience", "Most Active"].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setSortOption(opt);
                                            setSortOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                            sortOption === opt 
                                                ? 'bg-primary text-white' 
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-secondary'
                                        }`}
                                    >
                                        {opt}
                                        {sortOption === opt && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Farmers Grid */}
            <div className="container mx-auto px-4 lg:px-8 py-20">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Meet All Our Farmers</h2>
                    <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>

                {sortedFarmers.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
                        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="font-bold text-secondary text-lg mb-1">No Farmers Registered</h3>
                        <p className="text-slate-400 text-sm">No farmer profiles match your search criteria. Try a different query!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedFarmers.map((farmer) => (
                            <div key={farmer.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                                {/* Card Header (Image + Avatar) */}
                                <div className="relative h-48">
                                    <img src={farmer.bgImage} alt="Farm" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    
                                    <div className="absolute -bottom-8 left-6 flex items-end gap-4">
                                        <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shrink-0 shadow-sm">
                                            <img src={farmer.avatar} alt={farmer.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="pb-2 text-white drop-shadow-md">
                                            <div className="flex items-center gap-1 mb-0.5">
                                                <CheckCircle2 className="w-3 h-3 text-white fill-primary" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Verified Farmer</span>
                                            </div>
                                            <h3 className="text-xl font-display font-bold">{farmer.name}</h3>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Card Body */}
                                <div className="pt-12 p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-secondary text-lg truncate max-w-[70%]">{farmer.farmName}</h4>
                                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg shrink-0">
                                            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                                            <span className="text-xs font-bold text-primary">{farmer.rating}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                                        <MapPin className="w-4 h-4 shrink-0" />
                                        <span className="truncate">{farmer.location}</span>
                                    </div>
                                    
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 h-10 line-clamp-2">
                                        {farmer.description}
                                    </p>
                                    
                                    {/* Stats */}
                                    <div className="flex items-center justify-between border-t border-b border-slate-100 py-4 mb-6">
                                        <div className="text-center flex-1 border-r border-slate-100">
                                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Active</p>
                                            <p className="font-bold text-secondary">{farmer.experience}</p>
                                        </div>
                                        <div className="text-center flex-1">
                                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Deliveries</p>
                                            <p className="font-bold text-secondary">{farmer.customers}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Products Preview */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex -space-x-3">
                                            {farmer.products.map((p, i) => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                                                    <img src={p} alt="Product" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => toggleFavoriteFarmer(farmer)}
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                                                isFavoriteFarmer(farmer.id)
                                                    ? 'bg-red-50 border-red-100 text-red-500 hover:bg-red-100/70'
                                                    : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100'
                                            }`}
                                        >
                                            <Heart className={`w-4 h-4 ${isFavoriteFarmer(farmer.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                        </button>
                                    </div>
                                    
                                    {/* Action */}
                                    <Link to={`/farmer/${farmer.id}`} className="block w-full text-center py-3.5 bg-slate-50 hover:bg-primary hover:text-white text-secondary font-bold rounded-xl transition-colors border border-slate-100 text-sm">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Banner */}
            <div className="bg-primary text-white py-20 mt-10">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">{mappedFarmers.length}</h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Active Farmers</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">{mappedFarmers.length}</h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Organic Farms</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">1.5k+</h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Harvest Catalog</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">20k+</h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Verified Trades</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Farmers;
