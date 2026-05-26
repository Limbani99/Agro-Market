import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, ArrowRight, Check } from 'lucide-react'
import { useData } from '../../context/DataProvider'

const products = [
    {
        name: 'Heirloom Tomatoes',
        price: '4.99',
        unit: 'lb',
        rating: 4.9,
        reviews: 120,
        seller: 'Amber Valley Farm',
        image: '/assets/tomatoes.png',
        badge: 'Organic'
    },
    {
        name: 'Crunchy Carrots',
        price: '2.49',
        unit: 'Bunch',
        rating: 4.7,
        reviews: 85,
        seller: 'Green Acres',
        image: '/assets/carrots.png',
        badge: 'Fresh'
    },
    {
        name: 'Dinosaur Kale',
        price: '3.00',
        unit: 'Bunch',
        rating: 4.8,
        reviews: 92,
        seller: 'Olive Hill Farm',
        image: '/assets/kale.png',
        badge: 'Organic'
    },
    {
        name: 'Wildflower Honey',
        price: '12.50',
        unit: 'Jar',
        rating: 5.0,
        reviews: 210,
        seller: 'Bee Happy Apiary',
        image: '/assets/honey.png',
        badge: 'Pure'
    }
]

function FeaturedProducts() {
    const { addToCart } = useData();
    const [addedIdx, setAddedIdx] = useState(null);

    const handleAdd = (product, idx) => {
        addToCart(product, 1);
        setAddedIdx(idx);
        setTimeout(() => setAddedIdx(null), 1500);
    };

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl text-secondary mb-4">Featured Products</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">Handpicked, peak-season produce directly from our top-rated local farmers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, idx) => (
                        <div key={idx} className="card group">
                            <div className="relative h-64 overflow-hidden bg-white">
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">{product.badge}</span>
                                </div>
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <Link to={`/product/${idx}`} className="text-xl font-bold text-secondary hover:text-primary transition-colors truncate block">
                                        {product.name}
                                    </Link>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                                        <span className="text-xs text-slate-400 block">/ {product.unit}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1 mb-4">
                                    <Star className="w-4 h-4 fill-accent text-accent" />
                                    <span className="text-sm font-bold text-secondary">{product.rating}</span>
                                    <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
                                </div>

                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                                    <span className="text-xs text-slate-500">By {product.seller}</span>
                                </div>

                                <button
                                    onClick={() => handleAdd(product, idx)}
                                    className={`w-full py-3 border-2 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                                        addedIdx === idx
                                            ? 'border-green-500 bg-green-500 text-white'
                                            : 'border-primary text-primary hover:bg-primary hover:text-white'
                                    }`}
                                >
                                    {addedIdx === idx ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                                    {addedIdx === idx ? 'Added!' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-primary transition-colors">
                        VIEW ALL PRODUCTS <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
