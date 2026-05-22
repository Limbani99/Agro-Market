import React from 'react'
import { ArrowRight } from 'lucide-react'

function Hero() {
    return (
        <section className="relative h-[600px] flex items-center overflow-hidden bg-secondary">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img 
                    src="/assets/hero.png" 
                    alt="Farmer with vegetables" 
                    className="w-full h-full object-cover object-center opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/60 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-primary border border-white/20 mb-6">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-sm font-semibold uppercase tracking-wider">100% Organic Certified</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight">
                        Fresh From Farm <br />
                        <span className="text-primary italic">To Your Table</span>
                    </h1>
                    <p className="text-slate-300 text-lg mb-10 max-w-lg leading-relaxed">
                        Discover a transparent, trusted marketplace where we link farmers with conscious consumers. Support sustainable agriculture and taste the difference of nature's bounty.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="btn-primary group flex items-center gap-2">
                            Shop Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn-outline">
                            Become a Seller
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
