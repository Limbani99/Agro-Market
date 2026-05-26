import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Star, Mail, CheckCircle, Leaf, Truck, Calendar, ShoppingCart, ChevronRight, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataProvider';

const FarmerProfile = () => {
    const { id } = useParams();
    const { products, addToCart, toggleFavoriteFarmer, isFavoriteFarmer } = useData();
    const [farmer, setFarmer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [addedId, setAddedId] = useState(null);

    const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    useEffect(() => {
        const fetchFarmerDetails = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${API}/users/farmer/${id}`);
                setFarmer(res.data.farmer);
            } catch (err) {
                console.error("Error fetching farmer details:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchFarmerDetails();
        }
    }, [id]);

    const handleAdd = (p) => {
        addToCart(p, 1);
        setAddedId(p.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    // Filter products listed by this farmer
    const farmerProducts = products.filter(p => {
        const sId = p.sellerId?._id || p.sellerId?.id || (typeof p.sellerId === 'string' ? p.sellerId : null);
        return String(sId) === String(id);
    });

    const averageRating = farmerProducts.length > 0 
        ? (farmerProducts.reduce((sum, p) => sum + (p.rating || 4.8), 0) / farmerProducts.length).toFixed(1)
        : "4.8";

    if (isLoading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center py-24">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-400 font-bold text-sm">Loading harvest fields...</p>
                </div>
            </div>
        );
    }

    if (!farmer) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center py-20 px-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg text-center border border-slate-100 animate-in fade-in duration-300">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-secondary mb-3">Farmer Profile Offline</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                        This farmer account is either unavailable or has been archived. Check back later!
                    </p>
                    <Link
                        to="/products"
                        className="block w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-full font-bold shadow-md transition-all active:scale-95 text-center"
                    >
                        Browse Crops Catalog
                    </Link>
                </div>
            </div>
        );
    }

    const farmName = farmer.farmName || "Agro Market";
    const bio = farmer.bio || "Regenerative small-scale family farm committed to cultivating organic harvest yields with sustainable methods.";
    const location = farmer.location || "California Valley Organic Acres, USA";
    const avatarImage = farmer.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${farmer.name}`;

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[350px] md:h-[450px] w-full">
                <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Farm Landscape" 
                    className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Profile Card positioned overlapping the hero image and content below */}
                <div className="absolute -bottom-16 md:-bottom-20 left-4 right-4 md:left-10 lg:left-20 max-w-3xl">
                    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 border border-white/50 backdrop-blur-sm relative">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shrink-0 shadow-lg bg-slate-200">
                            <img 
                                src={avatarImage} 
                                alt={farmer.name} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-yellow-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
                                PRO
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary">{farmer.name}</h1>
                                <span className="text-primary font-semibold text-lg hidden md:block">|</span>
                                <span className="text-primary font-semibold text-lg">{farmName}</span>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 font-medium mb-6 font-display">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> {location}
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {averageRating} <span className="font-normal">Rating</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                <div>Verified Grower</div>
                            </div>
                            
                            <div className="flex gap-4 justify-center md:justify-start">
                                <button
                                    onClick={() => toggleFavoriteFarmer(farmer)}
                                    className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 text-sm cursor-pointer ${
                                        isFavoriteFarmer(farmer._id)
                                            ? 'bg-red-50 border border-red-100 text-red-500 hover:bg-red-100/50'
                                            : 'bg-primary hover:bg-primary-dark text-white border border-transparent'
                                    }`}
                                >
                                    <Leaf className={`w-4 h-4 ${isFavoriteFarmer(farmer._id) ? 'fill-red-500 text-red-500' : ''}`} />
                                    <span>{isFavoriteFarmer(farmer._id) ? 'Following Farm' : 'Follow Farm'}</span>
                                </button>
                                <a href={`mailto:${farmer.email}`} className="bg-white hover:bg-gray-50 text-secondary border border-gray-200 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 text-slate-500" /> Message
                                </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Spacer for overlapping card */}
            <div className="h-24 md:h-32"></div>

            <div className="container mx-auto px-4 lg:px-20 pb-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <Leaf className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">{farmerProducts.length} Listings</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Available Now</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <Truck className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">100+ Orders</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Fulfilled Seasonally</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <Calendar className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">Active</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Since {new Date(farmer.createdAt || Date.now()).getFullYear()}</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <CheckCircle className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">100% Organic</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Regenerative Audit Passed</p>
                    </div>
                </div>

                {/* Heritage Section */}
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-orange-50 rounded-[2rem] transform rotate-3 scale-105 -z-10"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1524175869111-19b0893d20b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="Farming yields" 
                            className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">Our Farm Legacy</p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6 leading-tight">
                            Regenerative & Ethical Yields
                        </h2>
                        <div className="text-gray-600 space-y-4 mb-8 font-medium leading-relaxed">
                            <p>{bio}</p>
                            <p>
                                At {farmName}, we believe that healthy soil is the foundation of human health. We use crop rotation, natural compost mixtures, and companion planting to cultivate rich, dynamic flavor profiles while keeping the surrounding ecosystem vibrant and pesticide-free.
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-6 py-2">
                            <p className="text-xl md:text-2xl font-display italic text-gray-700">
                                "Our harvest philosophy is simple: we nurture the soil, and the soil nurtures the flavor."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Farmer Products Section */}
                <div className="mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">Farmer Seasonal harvest</h2>
                            <p className="text-gray-500 italic">Fresh from {farmName} fields, directly to your doorstep.</p>
                        </div>
                        <Link to="/products" className="text-primary font-bold hover:text-primary-dark transition-colors flex items-center gap-1 mt-4 md:mt-0 group">
                            View Crop Catalog <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {farmerProducts.length === 0 ? (
                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center">
                            <Leaf className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
                            <h3 className="font-bold text-secondary text-lg mb-1">Crops Out of Season</h3>
                            <p className="text-slate-400 text-sm">This grower has sold out of listings or is preparing the next seasonal crop batch.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {farmerProducts.map((p) => (
                                <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100">
                                    <Link to={`/product/${p.id}`} className="relative aspect-[4/3] overflow-hidden bg-slate-50 block">
                                        {p.badge && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="px-3 py-1 bg-white/90 text-secondary text-[10px] font-black rounded-lg uppercase tracking-wider backdrop-blur-sm">
                                                    {p.badge}
                                                </span>
                                            </div>
                                        )}
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </Link>
                                    <div className="p-5 bg-slate-50">
                                        <Link to={`/product/${p.id}`} className="text-lg font-display font-bold text-secondary hover:text-primary transition-colors mb-1 truncate block">
                                            {p.name}
                                        </Link>
                                        <div className="flex items-center gap-1 mb-4">
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                            <span className="text-xs text-slate-500 font-bold">{p.rating}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xl font-black text-secondary">${p.price}</span>
                                                <span className="text-xs text-slate-500 font-bold ml-1">/ {p.unit}</span>
                                            </div>
                                            <button
                                                onClick={() => handleAdd(p)}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                                                    addedId === p.id
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                                                }`}
                                            >
                                                {addedId === p.id ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Farmer Review Quote */}
                <div className="mb-20">
                    <h2 className="text-3xl font-display font-bold text-secondary mb-8">Verified Shopper Opinion</h2>
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-md shadow-sm relative">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            ))}
                        </div>
                        <p className="text-gray-600 italic mb-6 leading-relaxed text-sm">
                            "The rich texture and crisp flavor of organic crops from {farmName} is absolutely unmatched! You can truly taste the care and sustainable soil treatment that goes into every single harvest."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                                AM
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary text-sm">Agro Shopper</h4>
                                <p className="text-xs text-gray-400">Verified Buyer • Hudson Valley Local</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-primary text-white py-16 px-4">
                <div className="container mx-auto max-w-2xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Stay Rooted with {farmName}</h2>
                    <p className="text-white/80 mb-8 font-medium">
                        Join our mailing list for weekly harvest updates, seasonal recipes, and first access to our limited crops.
                    </p>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            required
                            className="px-6 py-3 rounded-full flex-1 text-secondary focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button 
                            type="submit" 
                            className="px-8 py-3 bg-secondary hover:bg-slate-800 text-white transition-colors rounded-full font-bold shadow-md text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FarmerProfile;
