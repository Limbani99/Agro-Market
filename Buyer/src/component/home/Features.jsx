import React from 'react'
import { Leaf, Users, ShieldCheck, Zap } from 'lucide-react'

const features = [
    {
        title: 'Peak Freshness',
        desc: 'Harvested just hours before delivery. Never sits in a warehouse.',
        icon: Leaf,
        color: 'bg-green-100 text-green-600'
    },
    {
        title: 'Direct Support',
        desc: '100% of the checkout price goes directly to the farmer of origin.',
        icon: Users,
        color: 'bg-orange-100 text-orange-600'
    },
    {
        title: 'Secure & Transparent',
        desc: 'Know exactly where your food comes from and how it was grown.',
        icon: ShieldCheck,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        title: 'Fast Local Delivery',
        desc: 'Eco-friendly delivery vehicles optimized for minimum carbon footprint.',
        icon: Zap,
        color: 'bg-yellow-100 text-yellow-600'
    }
]

function Features() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl text-secondary mb-4">Why Choose Agro Market</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">We're revolutionizing the food supply chain by bringing you closer to the source.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 text-center hover:shadow-xl transition-all group">
                            <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
