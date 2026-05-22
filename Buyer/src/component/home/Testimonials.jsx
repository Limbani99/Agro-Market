import React from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
    {
        name: 'Emma Thompson',
        role: 'Verified Buyer',
        quote: 'The difference in quality is incredible. I love knowing exactly which farm my tomatoes came from. It has completely changed how I shop for groceries.',
        rating: 5
    },
    {
        name: 'Chef James B.',
        role: 'Local Restaurant Owner',
        quote: 'As a chef, getting peak-season produce is everything. Agro Market makes the logistics seamless and the quality is unsurpassed.',
        rating: 5
    },
    {
        name: 'Lisa M.',
        role: 'Home Cook',
        quote: 'The platform is so easy to use, and the delivery is always on time. My kids are actually eating more vegetables because they taste so much better!',
        rating: 4
    }
]

function Testimonials() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/assets/testimonial_bg.png" 
                    alt="Agricultural Fields" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary/80 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl text-white mb-4">What Our Community Says</h2>
                    <p className="text-slate-300 max-w-xl mx-auto">We're proud to support thousands of happy customers and local farmers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative">
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${i < rev.rating ? 'fill-accent text-accent' : 'text-white/20'}`} 
                                    />
                                ))}
                            </div>
                            <p className="text-white text-lg italic mb-8 leading-relaxed">"{rev.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
                                <div>
                                    <h4 className="text-white font-bold">{rev.name}</h4>
                                    <p className="text-primary text-xs uppercase tracking-widest">{rev.role}</p>
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
