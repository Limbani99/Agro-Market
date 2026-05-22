import React from 'react'
import { MapPin, Star, ArrowRight } from 'lucide-react'

const farmers = [
    {
        name: 'David Miller',
        location: 'Green Valley Farm (20km)',
        desc: 'Third-generation organic farmer focused on soil health and vibrant varieties.',
        products: 58,
        rating: 4.9,
        image: '/assets/david.png'
    },
    {
        name: 'Sarah Jenkins',
        location: 'Sunny Acres (12km)',
        desc: 'Specializing in heirloom vegetables and practicing regenerative agriculture since 2012.',
        products: 35,
        rating: 4.7,
        image: '/assets/sarah.png'
    },
    {
        name: 'Marcus Chen',
        location: 'Oak Mill Farm (31km)',
        desc: 'Marcus runs a sustainable hydroponic greenhouse year-round for sustainable greens.',
        products: 42,
        rating: 4.8,
        image: '/assets/marcus.png'
    }
]

function TopFarmers() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl text-secondary mb-4">Meet Our Top Farmers</h2>
                        <p className="text-slate-500 max-w-xl">Get to know the passionate individuals behind your food. We believe in complete transparency and direct connections.</p>
                    </div>
                    <button className="px-6 py-2 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all">
                        Show All Farmers
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {farmers.map((farmer, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                                    <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors">{farmer.name}</h3>
                                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        {farmer.location}
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-slate-500 mb-8 leading-relaxed">"{farmer.desc}"</p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                                <div className="flex gap-8">
                                    <div>
                                        <span className="block text-2xl font-bold text-secondary">{farmer.products}</span>
                                        <span className="text-xs uppercase tracking-wider text-slate-400">Products</span>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-bold text-secondary">{farmer.rating}</span>
                                        <span className="text-xs uppercase tracking-wider text-slate-400">Rating</span>
                                    </div>
                                </div>
                                <button className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TopFarmers
