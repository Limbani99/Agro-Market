import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { useData } from '../../context/DataProvider'

const fallbackFarmers = [
    {
        id: 'fallback-farmer-1',
        name: 'David Miller',
        farmName: 'Green Valley Farm',
        location: 'California Valley, USA',
        desc: 'Third-generation organic farmer focused on soil health and vibrant heirloom crops.',
        products: 58,
        rating: 4.9,
        avatar: '/assets/david.png'
    },
    {
        id: 'fallback-farmer-2',
        name: 'Sarah Jenkins',
        farmName: 'Sunny Acres',
        location: 'Sunny Acres, USA',
        desc: 'Specializing in heirloom vegetables and practicing regenerative agriculture since 2012.',
        products: 35,
        rating: 4.7,
        avatar: '/assets/sarah.png'
    },
    {
        id: 'fallback-farmer-3',
        name: 'Marcus Chen',
        farmName: 'Oak Mill Farm',
        location: 'Oak Mill Valley, USA',
        desc: 'Marcus runs a sustainable organic greenhouse year-round for chemical-free sustainable greens.',
        products: 42,
        rating: 4.8,
        avatar: '/assets/marcus.png'
    }
]

function TopFarmers() {
    const { products } = useData();
    const [farmersList, setFarmersList] = useState([]);

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
                const res = await axios.get(`${API_URL}/users/farmers`);
                setFarmersList(res.data.farmers || []);
            } catch (err) {
                console.error("Error fetching farmers in TopFarmers:", err);
            }
        };
        fetchFarmers();
    }, []);

    const mappedFarmers = useMemo(() => {
        return farmersList.map(farmer => {
            // Filter products belonging to this grower
            const farmerProducts = products.filter(p => {
                const sId = p.sellerId?._id || p.sellerId?.id || (typeof p.sellerId === 'string' ? p.sellerId : null);
                return String(sId) === String(farmer._id);
            });

            const averageRating = farmerProducts.length > 0
                ? (farmerProducts.reduce((sum, p) => sum + (p.rating || 4.8), 0) / farmerProducts.length).toFixed(1)
                : "4.8";

            return {
                id: farmer._id,
                name: farmer.name,
                farmName: farmer.farmName || "Agro Market",
                rating: Number(averageRating),
                location: farmer.location || "California Valley Organic Acres, USA",
                desc: farmer.bio || "Regenerative organic small-scale family farm committed to chemical-free harvest cultivation.",
                products: farmerProducts.length || Math.floor(Math.random() * 15) + 5,
                avatar: farmer.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${farmer.name}`
            };
        });
    }, [farmersList, products]);

    // Slice top 3 dynamic growers or fall back if empty
    const displayedFarmers = mappedFarmers.length > 0 
        ? mappedFarmers.slice(0, 3) 
        : fallbackFarmers;

    return (
        <section className="py-24 bg-white font-body">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-secondary mb-4">Meet Our Top Farmers</h2>
                        <p className="text-slate-500 max-w-xl">Get to know the passionate growers behind your chemical-free harvests. Direct connections and complete transparency.</p>
                    </div>
                    <Link to="/farmers" className="px-6 py-3 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold rounded-full transition-all text-xs tracking-wider uppercase shrink-0">
                        Show All Farmers
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {displayedFarmers.map((farmer) => (
                        <div key={farmer.id} className="bg-slate-50 rounded-3xl p-8 border border-slate-100/80 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-100 bg-white">
                                        <img 
                                            src={farmer.avatar} 
                                            alt={farmer.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <Link to={`/farmer/${farmer.id}`} className="text-xl font-bold text-secondary hover:text-primary transition-colors line-clamp-1 block">
                                            {farmer.name}
                                        </Link>
                                        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold mt-1">
                                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                                            <span className="truncate">{farmer.location}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-slate-500 text-sm mb-8 leading-relaxed italic h-16 line-clamp-3">
                                    "{farmer.desc}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                                <div className="flex gap-8">
                                    <div>
                                        <span className="block text-xl font-bold text-secondary">{farmer.products}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Products</span>
                                    </div>
                                    <div>
                                        <span className="block text-xl font-bold text-secondary flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-accent text-accent shrink-0" />
                                            {farmer.rating}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Rating</span>
                                    </div>
                                </div>
                                <Link 
                                    to={`/farmer/${farmer.id}`} 
                                    className="w-11 h-11 bg-white rounded-full shadow-xs flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all cursor-pointer"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TopFarmers
