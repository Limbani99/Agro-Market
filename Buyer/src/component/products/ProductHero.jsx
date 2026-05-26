import React from 'react'
import { Search, MapPin } from 'lucide-react'

const ProductHero = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="relative bg-secondary overflow-hidden font-body">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-primary font-bold text-xs mb-6 uppercase tracking-wider">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        Fresh Harvest Daily
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Fresh From <span className="text-primary italic">Farm</span> <br />
                        To Your Table
                    </h1>
                    
                    <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
                        Discover the finest organic produce sourced directly from local farmers. 
                        Support your community while eating healthy, seasonal, and fresh.
                    </p>

                    {/* Search Bar */}
                    <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3">
                            <Search className="w-5 h-5 text-primary shrink-0" />
                            <input 
                                type="text" 
                                placeholder="Search for vegetables, fruits..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500 font-medium focus:ring-0"
                            />
                        </div>
                        <div className="hidden md:flex items-center gap-3 px-4 border-l border-white/10">
                            <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                            <select className="bg-transparent border-none outline-none text-white font-medium cursor-pointer">
                                <option className="bg-secondary text-white">All Locations</option>
                                <option className="bg-secondary text-white">California, USA</option>
                                <option className="bg-secondary text-white">Ahmedabad, India</option>
                            </select>
                        </div>
                        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 cursor-pointer">
                            Search Now
                        </button>
                    </div>

                    <div className="flex items-center gap-8 mt-10">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary bg-slate-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-400">
                            <span className="text-white font-bold">2,500+</span> Happy Customers nearby
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductHero
