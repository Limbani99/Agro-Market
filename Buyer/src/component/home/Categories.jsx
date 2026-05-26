import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useData } from '../../context/DataProvider'

const fallbackCategories = [
    { name: 'Vegetables', icon: '/assets/cat_veg.png', count: '120+ Products' },
    { name: 'Fruits', icon: '/assets/cat_fruit.png', count: '80+ Products' },
    { name: 'Organic', icon: '/assets/cat_organic.png', count: '50+ Products' },
    { name: 'Dairy', icon: '/assets/cat_dairy.png', count: '30+ Products' },
    { name: 'Beans', icon: '/assets/cat_beans.png', count: '40+ Products' },
]

function Categories() {
    const { products } = useData();

    // Dynamically calculate categories from active database product listings
    const dynamicCategories = useMemo(() => {
        if (!products || products.length === 0) return [];

        const categoryCounts = {};
        products.forEach((prod) => {
            const cat = prod.category || 'Produce';
            // Normalize case for consistency
            const normalized = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
            categoryCounts[normalized] = (categoryCounts[normalized] || 0) + 1;
        });

        const categoryIcons = {
            'Vegetables': '/assets/cat_veg.png',
            'Fruits': '/assets/cat_fruit.png',
            'Organic': '/assets/cat_organic.png',
            'Dairy': '/assets/cat_dairy.png',
            'Beans': '/assets/cat_beans.png',
            'Grains': '/assets/cat_beans.png',
            'Seeds': '/assets/cat_organic.png'
        };

        return Object.keys(categoryCounts).map((catName) => {
            const icon = categoryIcons[catName] || '/assets/cat_organic.png';
            const cnt = categoryCounts[catName];
            return {
                name: catName,
                icon,
                count: `${cnt} Product${cnt > 1 ? 's' : ''}`
            };
        });
    }, [products]);

    // Fall back to original placeholders if database is empty
    const displayedCategories = dynamicCategories.length > 0 
        ? dynamicCategories 
        : fallbackCategories;

    return (
        <section className="py-24 bg-white font-body">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-secondary mb-4">Explore Categories</h2>
                        <p className="text-slate-500">Find exactly what you need from our fresh selections.</p>
                    </div>
                    <Link to="/products" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-xs tracking-wider uppercase cursor-pointer">
                        View All <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {displayedCategories.map((cat, idx) => (
                        <Link 
                            key={idx} 
                            to={`/products?category=${cat.name}`}
                            className="group cursor-pointer block"
                        >
                            <div className="bg-slate-50 rounded-3xl p-8 transition-all group-hover:bg-primary/5 group-hover:shadow-xl group-hover:shadow-primary/10 border border-transparent group-hover:border-primary/20 text-center h-full flex flex-col justify-between items-center">
                                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-sm flex items-center justify-center p-4 transition-transform group-hover:scale-110">
                                    <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                                    <p className="text-slate-400 text-xs font-semibold">{cat.count}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories
