import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const categories = [
    { name: 'Vegetables', icon: '/assets/cat_veg.png', count: '120+ Products' },
    { name: 'Fruits', icon: '/assets/cat_fruit.png', count: '80+ Products' },
    { name: 'Organic', icon: '/assets/cat_organic.png', count: '50+ Products' },
    { name: 'Dairy', icon: '/assets/cat_dairy.png', count: '30+ Products' },
    { name: 'Beans', icon: '/assets/cat_beans.png', count: '40+ Products' },
]

function Categories() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl text-secondary mb-4">Explore Categories</h2>
                        <p className="text-slate-500">Find exactly what you need from our fresh selections.</p>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        View All <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="bg-slate-50 rounded-3xl p-8 transition-all group-hover:bg-primary/5 group-hover:shadow-xl group-hover:shadow-primary/10 border border-transparent group-hover:border-primary/20 text-center">
                                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-sm flex items-center justify-center p-4 transition-transform group-hover:scale-110">
                                    <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-2">{cat.name}</h3>
                                <p className="text-slate-400 text-sm">{cat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories
