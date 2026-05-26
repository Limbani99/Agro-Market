import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShieldCheck, Leaf, Truck, Award, ShoppingBag } from 'lucide-react';
import { useData } from '../context/DataProvider';

const Cart = () => {
    const { cartItems, removeFromCart, updateCartQuantity, cartTotal } = useData();

    const deliveryFee = cartItems.length > 0 ? 5.00 : 0;
    const estimatedTax = cartTotal * 0.08;
    const total = cartTotal + deliveryFee + estimatedTax;

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
                    <p className="text-gray-500">
                        {cartItems.length === 0
                            ? 'Your cart is empty. Browse our fresh products!'
                            : `Review your ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} before checkout.`}
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    /* ---- Empty State ---- */
                    <div className="flex flex-col items-center justify-center py-24 gap-6">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-slate-300" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-secondary mb-2">Your cart is empty</h2>
                            <p className="text-gray-400 mb-6">Add some fresh farm products to get started.</p>
                        </div>
                        <Link
                            to="/products"
                            className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold shadow-md transition-all active:scale-95"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
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
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.badgeColor || 'bg-green-100 text-green-700'}`}>
                                                    {item.badge}
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium">{item.category}</span>
                                            </div>
                                            <div className="text-lg font-bold text-secondary text-right">
                                                ${Number(item.price).toFixed(2)}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-secondary mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{item.seller}</p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center bg-slate-100 rounded-full p-1">
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-white transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-secondary text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.stock !== undefined && item.quantity >= item.stock}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-white transition-colors disabled:opacity-30"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-secondary">
                                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                >
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
                                        <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                        <span className="font-medium">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Estimated Tax (8%)</span>
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
                )}

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
            </div>
        </div>
    );
};

export default Cart;
