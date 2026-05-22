import React from 'react'
import { Mail } from 'lucide-react'

function Newsletter() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="bg-secondary rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl text-white mb-6">Join Our Community</h2>
                        <p className="text-slate-300 text-lg mb-10">
                            Subscribe for seasonal updates, exclusive deals from our farmers, and special offers.
                        </p>
                        
                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                className="flex-1 px-8 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <button className="btn-primary py-4 px-10 whitespace-nowrap">
                                Subscribe Now
                            </button>
                        </form>
                        <p className="text-slate-500 text-sm mt-6">
                            *By subscribing, you agree to our Privacy Policy and terms.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
