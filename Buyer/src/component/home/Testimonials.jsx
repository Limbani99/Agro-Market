import React, { useState, useEffect, useMemo } from 'react'
import { Star, Quote } from 'lucide-react'
import axios from 'axios'

const fallbackReviews = [
    {
        name: 'Emma Thompson',
        role: 'Verified Buyer',
        quote: 'The difference in quality is incredible. I love knowing exactly which farm my tomatoes came from. It has completely changed how I shop for groceries.',
        rating: 5,
        avatar: null
    },
    {
        name: 'Chef James B.',
        role: 'Local Restaurant Owner',
        quote: 'As a chef, getting peak-season produce is everything. Agro Market makes the logistics seamless and the quality is unsurpassed.',
        rating: 5,
        avatar: null
    },
    {
        name: 'Lisa M.',
        role: 'Home Cook',
        quote: 'The platform is so easy to use, and the delivery is always on time. My kids are actually eating more vegetables because they taste so much better!',
        rating: 4,
        avatar: null
    }
]

function Testimonials() {
    const [reviewsList, setReviewsList] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
                const res = await axios.get(`${API_URL}/reviews/all`);
                setReviewsList(res.data || []);
            } catch (err) {
                console.error("Error fetching reviews in Testimonials:", err);
            }
        };
        fetchReviews();
    }, []);

    const displayedReviews = useMemo(() => {
        if (!reviewsList || reviewsList.length === 0) return fallbackReviews;

        // Take last 3 reviews for homepage display
        return reviewsList.slice(0, 3).map((item) => ({
            name: item.user?.name || 'Agro Market Buyer',
            role: item.product?.name ? `Verified Buyer of ${item.product.name}` : 'Verified Buyer',
            quote: item.comment || 'No comment provided.',
            rating: item.rating || 5,
            avatar: item.user?.avatar
        }));
    }, [reviewsList]);

    return (
        <section className="relative py-32 overflow-hidden font-body">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/assets/testimonial_bg.png" 
                    alt="Agricultural Fields" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary/85 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-display font-bold text-white mb-4">What Our Community Says</h2>
                    <p className="text-slate-300 max-w-xl mx-auto">We're proud to support thousands of happy organic food lovers and local farmers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayedReviews.map((rev, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative flex flex-col justify-between h-full">
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10" />
                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-accent text-accent' : 'text-white/20'}`} 
                                        />
                                    ))}
                                </div>
                                <p className="text-white text-[15px] italic mb-8 leading-relaxed">
                                    "{rev.quote}"
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0 border border-white/10 flex items-center justify-center">
                                    {rev.avatar ? (
                                        <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-white text-xs font-extrabold uppercase">
                                            {rev.name.substring(0, 2)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-bold text-sm truncate">{rev.name}</h4>
                                    <p className="text-primary text-[10px] uppercase tracking-wider font-extrabold mt-0.5 truncate">{rev.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
