import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShieldCheck, Leaf, Truck, Award } from 'lucide-react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Organic Lacinato Kale',
            seller: 'Riverbend Farm',
            price: 4.50,
            quantity: 1,
            image: '/assets/kale.png', // Assuming or we'll use unsplash if missing
            badge: 'ORGANIC',
            badgeColor: 'bg-green-100 text-green-700',
            category: 'Leafy Greens'
        },
        {
            id: 2,
            name: 'Heirloom Tomatoes',
            seller: 'Green Acres Farm',
            price: 6.00,
            quantity: 2,
            image: '/assets/tomatoes.png',
            badge: 'PEAK SEASON',
            badgeColor: 'bg-yellow-100 text-yellow-700',
            category: 'Vegetables'
        },
        {
            id: 3,
            name: 'Sweet Strawberries',
            seller: 'Berry Best Farms',
            price: 5.00,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            badge: 'LOCAL FAVORITE',
            badgeColor: 'bg-green-100 text-green-700',
            category: 'Fruits'
        }
    ]);

    const recommended = [
        {
            id: 101,
            name: 'Rainbow Carrots',
            price: '$3.25 / bunch',
            image: '/assets/carrots.png'
        },
        {
            id: 102,
            name: 'Pasture-Raised Eggs',
            price: '$7.50 / doz',
            image: 'https://images.unsplash.com/photo-1518569656558-1fdc988ba977?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 103,
            name: 'French Radish',
            price: '$2.80 / bunch',
            image: 'https://images.unsplash.com/photo-1590005026998-3850734a6540?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 104,
            name: 'Raw Honeycomb',
            price: '$12.00 / pc',
            image: 'https://images.unsplash.com/photo-1587049352847-4d4b126a3dc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];

    const updateQuantity = (id, change) => {
        setCartItems(items =>
            items.map(item => {
                if (item.id === id) {
                    const newQ = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQ };
                }
                return item;
            })
        );
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 5.00;
    const estimatedTax = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + estimatedTax;

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <nav className="text-xs text-slate-500 font-medium mb-6">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-primary">Cart</span>
                </nav>

                <div className="mb-10">
                    <h1 className="text-4xl font-display font-bold text-secondary mb-2">Shopping Cart</h1>
                    <p className="text-gray-500">Review your fresh farm products before checkout.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-white shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.badgeColor}`}>
                                                {item.badge}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">{item.category}</span>
                                        </div>
                                        <div className="text-lg font-bold text-secondary text-right">
                                            ${item.price.toFixed(2)}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{item.seller}</p>
                                    
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center bg-slate-100 rounded-full p-1">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-white transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-bold text-secondary text-sm">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-white transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-secondary">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-secondary mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Estimated Tax</span>
                                    <span className="font-medium">${estimatedTax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="text-xs font-bold text-secondary block mb-2">Discount Code</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="FRESH20" 
                                        className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6 mb-8 flex justify-between items-end">
                                <span className="font-bold text-secondary">Total</span>
                                <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-full font-bold shadow-md transition-all active:scale-95">
                                    Proceed to Checkout
                                </button>
                                <Link to="/products" className="w-full block text-center border-2 border-slate-200 hover:border-primary hover:text-primary text-secondary py-3.5 rounded-full font-bold transition-all">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-sm">Fresh From Farm</h4>
                            <p className="text-xs text-gray-500">Picked within 24 hours</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-sm">Secure Payments</h4>
                            <p className="text-xs text-gray-500">Encrypted transactions</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-secondary flex items-center justify-center shrink-0">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-sm">Fast Delivery</h4>
                            <p className="text-xs text-gray-500">Eco-friendly transport</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-secondary flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary text-sm">Trusted Farmers</h4>
                            <p className="text-xs text-gray-500">Verified small-scale farms</p>
                        </div>
                    </div>
                </div>

                {/* Recommended Products */}
                <div>
                    <h2 className="text-3xl font-display font-bold text-secondary mb-8">More for your Kitchen</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommended.map(item => (
                            <div key={item.id} className="bg-white group">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-4 bg-slate-50">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <h3 className="font-bold text-secondary text-lg mb-1">{item.name}</h3>
                                <p className="text-primary font-bold text-sm mb-4">{item.price}</p>
                                <button className="w-full py-2.5 border border-slate-200 rounded-full text-secondary font-bold hover:bg-primary hover:border-primary hover:text-white transition-all flex justify-center items-center gap-2">
                                    <Plus className="w-4 h-4" /> Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
