import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart, ArrowRight, Check } from 'lucide-react'
import { useData } from '../../context/DataProvider'

const fallbackProducts = [
    {
        id: 'fallback-1',
        name: 'Heirloom Tomatoes',
        price: 4.99,
        unit: 'lb',
        rating: 4.9,
        reviews: 120,
        seller: 'Amber Valley Farm',
        image: '/assets/tomatoes.png',
        badge: 'Organic'
    },
    {
        id: 'fallback-2',
        name: 'Crunchy Carrots',
        price: 2.49,
        unit: 'Bunch',
        rating: 4.7,
        reviews: 85,
        seller: 'Green Acres',
        image: '/assets/carrots.png',
        badge: 'Fresh'
    },
    {
        id: 'fallback-3',
        name: 'Dinosaur Kale',
        price: 3.00,
        unit: 'Bunch',
        rating: 4.8,
        reviews: 92,
        seller: 'Olive Hill Farm',
        image: '/assets/kale.png',
        badge: 'Organic'
    },
    {
        id: 'fallback-4',
        name: 'Wildflower Honey',
        price: 12.50,
        unit: 'Jar',
        rating: 5.0,
        reviews: 210,
        seller: 'Bee Happy Apiary',
        image: '/assets/honey.png',
        badge: 'Pure'
    }
]

function FeaturedProducts() {
    const { products: dbProducts, addToCart } = useData();
    const [addedId, setAddedId] = useState(null);

    const handleAdd = (product) => {
        addToCart(product, 1);
        const pid = product.id || product._id;
        setAddedId(pid);
        setTimeout(() => setAddedId(null), 1500);
    };

    // Slice first 4 dynamic database products or fall back to static items if empty
    const displayedProducts = dbProducts && dbProducts.length > 0 
        ? dbProducts.slice(0, 4) 
        : fallbackProducts;

    return (
        <section className="py-24 bg-slate-50 font-body">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold text-secondary mb-4">Featured Products</h2>
                    <p className="text-slate-500 max-w-xl mx-auto">Handpicked, peak-season organic produce sourced directly from trusted local growers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayedProducts.map((product) => {
                        const pid = product.id || product._id;
                        return (
                            <div key={pid} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between">
                                <div className="relative h-64 overflow-hidden bg-slate-50/50 flex items-center justify-center p-4">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 bg-primary text-white text-[10px] font-extrabold uppercase rounded-full">
                                            {product.badge || 'ORGANIC'}
                                        </span>
                                    </div>
                                    <img 
                                        src={product.image || 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=200'} 
                                        alt={product.name} 
                                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                                    <div>
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <Link to={`/product/${pid}`} className="text-lg font-bold text-secondary hover:text-primary transition-colors line-clamp-1 flex-1">
                                                {product.name}
                                            </Link>
                                            <div className="text-right shrink-0">
                                                <span className="text-xl font-bold text-primary font-display">${Number(product.price).toFixed(2)}</span>
                                                <span className="text-[10px] text-slate-400 block font-semibold">/ {product.unit || 'lb'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-1 mb-3">
                                            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                                            <span className="text-xs font-bold text-secondary">{product.rating || 4.8}</span>
                                            <span className="text-[10px] text-slate-400 font-semibold">({product.reviews || Math.floor(Math.random() * 50) + 10} reviews)</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[8px] font-extrabold text-slate-500 uppercase select-none">
                                                {product.seller ? product.seller.substring(0, 2) : 'AM'}
                                            </div>
                                            <span className="text-[11px] font-semibold text-slate-500">By {product.seller || 'Agro Market Seller'}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAdd(product)}
                                        className={`w-full py-3 border-2 font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm ${
                                            addedId === pid
                                                ? 'border-green-500 bg-green-500 text-white'
                                                : 'border-primary text-primary hover:bg-primary hover:text-white'
                                        }`}
                                    >
                                        {addedId === pid ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                                        {addedId === pid ? 'Added!' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <Link to="/products" className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-primary transition-colors text-xs tracking-wider uppercase">
                        VIEW ALL PRODUCTS <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
