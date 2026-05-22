import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Package, Clock, CheckCircle2, ChevronRight, Check } from 'lucide-react';

const BuyerProfile = () => {
    const recentOrders = [
        {
            id: '#AG-99281',
            status: 'SHIPPED',
            statusColor: 'bg-green-100 text-green-700',
            date: 'Oct 12, 2024',
            total: '$42.50',
            image: '/assets/honey.png' // Or placeholder
        },
        {
            id: '#AG-98542',
            status: 'DELIVERED',
            statusColor: 'bg-gray-200 text-gray-700',
            date: 'Sep 28, 2024',
            total: '$68.20',
            image: '/assets/vegbox.png'
        }
    ];

    const wishlist = [
        {
            id: 1,
            name: 'Organic Curly Kale',
            price: '$3.50',
            image: 'https://images.unsplash.com/photo-1524175869111-19b0893d20b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 2,
            name: 'Artisan Heirloom Mix',
            price: '$12.00',
            image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 3,
            name: 'Sweet Garden Peas',
            price: '$5.75',
            image: 'https://images.unsplash.com/photo-1533282960533-51328aa2660a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="relative h-64 md:h-80 w-full rounded-[2rem] overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                        alt="Farm Landscape" 
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Profile Card positioned inside the hero image */}
                    <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12">
                        <div className="bg-slate-50/95 rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-white/50 backdrop-blur-md">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden shrink-0 shadow-md">
                                    <img 
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                                        alt="Julian Thorne" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                                        <Check className="w-3 h-3" />
                                    </div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                        <h1 className="text-2xl md:text-3xl font-display font-bold text-secondary">Julian Thorne</h1>
                                        <span className="bg-orange-500 text-secondary text-[10px] font-black px-2 py-1 rounded uppercase tracking-wide">
                                            PREMIUM MEMBER
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm">julian.thorne@earthlink.net</p>
                                </div>
                            </div>
                            
                            <button className="bg-white hover:bg-gray-50 text-secondary px-6 py-2.5 rounded-full font-bold shadow-sm transition-all border border-gray-200 text-sm">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-4 lg:px-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <div className="bg-slate-50 p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded-full">+2 this mo</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">Total Orders</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">12</h3>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-orange-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">Pending</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">1</h3>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary mb-4">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">Delivered</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">11</h3>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-orange-500 mb-4">
                            <Heart className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">Wishlist items</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">5</h3>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-secondary">Recent Orders</h2>
                        <button className="text-sm font-bold text-primary hover:text-primary transition-colors">View All History</button>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order, i) => (
                            <div key={i} className="bg-slate-50 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shrink-0">
                                    <img src={order.image} alt={order.id} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1590005026998-3850734a6540?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }} />
                                </div>
                                <div className="flex-1 w-full text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                                        <h3 className="font-bold text-secondary text-lg">{order.id}</h3>
                                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${order.statusColor}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-1">Ordered: {order.date}</p>
                                    <p className="font-bold text-primary text-lg">{order.total}</p>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                                    <button className="flex-1 sm:flex-none px-6 py-2 border border-gray-300 rounded-full font-bold text-secondary hover:bg-white transition-colors text-sm">
                                        Details
                                    </button>
                                    <button className={`flex-1 sm:flex-none px-6 py-2 rounded-full font-bold text-white transition-colors text-sm ${order.status === 'SHIPPED' ? 'bg-primary hover:bg-primary-dark' : 'bg-orange-500 hover:bg-orange-600'}`}>
                                        {order.status === 'SHIPPED' ? 'Track' : 'Review'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wishlist */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-secondary">From Your Wishlist</h2>
                        <button className="text-sm font-bold text-primary hover:text-primary transition-colors">View Wishlist</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map(item => (
                            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                                    <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                    </div>
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-secondary text-md mb-1">{item.name}</h3>
                                        <p className="font-bold text-primary">{item.price}</p>
                                    </div>
                                    <button className="w-10 h-10 bg-primary hover:bg-primary text-white rounded-full flex items-center justify-center transition-colors">
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerProfile;
