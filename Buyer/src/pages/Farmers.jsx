import React from 'react';
import { Search, MapPin, Star, ChevronDown, CheckCircle2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Farmers = () => {
    const farmers = [
        {
            id: 1,
            name: 'John Miller',
            farmName: 'Miller Valley Greens',
            rating: 4.8,
            location: 'Hudson Valley, NY',
            description: 'Specializing in heritage tomatoes and seasonal leafy greens using ancestral seeds.',
            experience: '15 Years',
            customers: '1.2k+',
            bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            avatar: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            products: ['/assets/tomatoes.png', '/assets/kale.png', '/assets/carrots.png'] // Placeholders
        },
        {
            id: 2,
            name: 'Sarah Chen',
            farmName: 'Golden Harvest Dairy',
            rating: 5.0,
            location: 'Sonoma, CA',
            description: 'Pasture-raised cows and artisan cheese crafting traditions handed down through generations.',
            experience: '10 Years',
            customers: '800+',
            bgImage: 'https://images.unsplash.com/photo-1516499874838-8a8b1393699c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            products: ['/assets/milk.png', '/assets/cheese.png', '/assets/butter.png']
        },
        {
            id: 3,
            name: 'David Okafor',
            farmName: 'Roots & Shoots',
            rating: 4.9,
            location: 'Austin, TX',
            description: 'Traditional African legumes and root vegetables grown with love and heirloom practices.',
            experience: '20 Years',
            customers: '2.1k+',
            bgImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            products: ['/assets/yams.png', '/assets/okra.png', '/assets/peas.png']
        }
    ];

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
                                placeholder="Search by farmer name or product..." 
                                className="bg-transparent border-none focus:outline-none focus:ring-0 text-slate-700 w-full font-medium"
                            />
                        </div>
                        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold transition-colors whitespace-nowrap shrink-0 shadow-md">
                            Explore Farmers
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Bar (Overlapping) */}
            <div className="container mx-auto px-4 lg:px-8 relative z-20 mt-[-40px]">
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-xl border border-slate-100 flex flex-col md:flex-row flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <button className="flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 font-medium hover:bg-slate-100 transition-colors flex-1 md:flex-none">
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> All Locations</div>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 font-medium hover:bg-slate-100 transition-colors flex-1 md:flex-none">
                            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400" /> All Categories</div>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        <label className="flex items-center gap-2 cursor-pointer ml-2">
                            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" />
                            <span className="text-slate-600 font-medium">Organic Only</span>
                        </label>
                        <div className="flex items-center gap-3 ml-4">
                            <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Rating:</span>
                            <button className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors">4+ Stars</button>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 justify-end">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Sort by:</span>
                        <button className="flex items-center gap-2 px-4 py-2 text-secondary font-bold hover:text-primary transition-colors">
                            Top Rated <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Farmers Grid */}
            <div className="container mx-auto px-4 lg:px-8 py-20">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Meet All Our Farmers</h2>
                    <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {farmers.map((farmer) => (
                        <div key={farmer.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                            {/* Card Header (Image + Avatar) */}
                            <div className="relative h-48">
                                <img src={farmer.bgImage} alt="Farm" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                
                                <div className="absolute -bottom-8 left-6 flex items-end gap-4">
                                    <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white shrink-0">
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
                                    <h4 className="font-bold text-secondary text-lg">{farmer.farmName}</h4>
                                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                                        <span className="text-xs font-bold text-primary">{farmer.rating}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                                    <MapPin className="w-4 h-4 shrink-0" />
                                    <span>{farmer.location}</span>
                                </div>
                                
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 h-10 line-clamp-2">
                                    {farmer.description}
                                </p>
                                
                                {/* Stats */}
                                <div className="flex items-center justify-between border-t border-b border-slate-100 py-4 mb-6">
                                    <div className="text-center flex-1 border-r border-slate-100">
                                        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Experience</p>
                                        <p className="font-bold text-secondary">{farmer.experience}</p>
                                    </div>
                                    <div className="text-center flex-1">
                                        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">Customers</p>
                                        <p className="font-bold text-secondary">{farmer.customers}</p>
                                    </div>
                                </div>
                                
                                {/* Products Preview */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex -space-x-3">
                                        {farmer.products.map((p, i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                                                {/* Use img if actual product image exists, else fallback */}
                                                <img src={p} alt="Product" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1590005026998-3850734a6540?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-colors shadow-sm">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                {/* Action */}
                                <Link to={`/farmer/${farmer.id}`} className="block w-full text-center py-3.5 bg-slate-50 hover:bg-primary hover:text-white text-secondary font-bold rounded-xl transition-colors border border-slate-100">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold shadow-md transition-all active:scale-95">
                        Load More Farmers
                    </button>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-primary text-white py-20 mt-10">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">850<span className="text-3xl">+</span></h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Active Farmers</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">420<span className="text-3xl">+</span></h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Organic Farms</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">12</h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Products Listed (k)</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">50</h3>
                            <p className="text-white/80 font-bold text-sm tracking-widest uppercase">Happy Customers (k)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Farmers;
