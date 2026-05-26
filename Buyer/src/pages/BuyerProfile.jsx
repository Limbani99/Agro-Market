import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Package, Clock, CheckCircle2, ChevronRight, Check, X, ShieldCheck, Leaf, Truck, Award, MapPin, Phone, Mail, User } from 'lucide-react';
import { useData } from '../context/DataProvider';

const BuyerProfile = () => {
    const { user, orders, isAuthenticated, updateProfile, wishlistItems, toggleWishlist, addToCart, favoriteFarmers, toggleFavoriteFarmer } = useData();
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Edit profile states
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editImageFile, setEditImageFile] = useState(null);
    const [editPreviewUrl, setEditPreviewUrl] = useState('');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    const handleEditClick = () => {
        setEditName(user.name || '');
        setEditEmail(user.email || '');
        setEditPhone(user.phone || '');
        setEditAddress(user.address || '');
        setEditPreviewUrl(user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`);
        setEditImageFile(null);
        setShowEditModal(true);
    };

    const handleImageUploadChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditImageFile(file);
            setEditPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        setIsSavingProfile(true);
        try {
            const success = await updateProfile({
                name: editName,
                email: editEmail,
                phone: editPhone,
                address: editAddress,
                imageFile: editImageFile
            });
            if (success) {
                setShowEditModal(false);
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        } finally {
            setIsSavingProfile(false);
        }
    };



    if (!isAuthenticated || !user) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center py-20 px-4">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg text-center border border-slate-100 animate-in fade-in duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                        <Package className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-secondary mb-3">Access Your Profile</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                        Log in to view your dynamic orders, track pending shipments, and manage your wishlist.
                    </p>
                    <Link
                        to="/login"
                        className="block w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-full font-bold shadow-md transition-all active:scale-95 text-center"
                    >
                        Sign In to Your Account
                    </Link>
                </div>
            </div>
        );
    }

    const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Shipped').length;
    const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;

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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 text-xs">
                        <div className="bg-slate-50/95 rounded-3xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-white/50 backdrop-blur-md">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden shrink-0 shadow-md bg-[#EAE6DB] flex items-center justify-center font-bold text-secondary text-3xl">
                                    {user.avatar ? (
                                        <img 
                                            src={user.avatar} 
                                            alt={user.name} 
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    ) : (
                                        user.name?.slice(0, 2).toUpperCase()
                                    )}
                                    <div className="absolute bottom-0 right-0 bg-orange-500 text-white w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                                        <Check className="w-3 h-3" />
                                    </div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                        <h1 className="text-2xl md:text-3xl font-display font-bold text-secondary">{user.name}</h1>
                                        <span className="bg-orange-500 text-secondary text-[10px] font-black px-2 py-1 rounded uppercase tracking-wide">
                                            {user.role?.toUpperCase() || 'MEMBER'}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-3">{user.email}</p>
                                    <button 
                                        onClick={handleEditClick}
                                        className="bg-white hover:bg-slate-100 text-secondary border border-slate-200 px-4 py-1.5 rounded-full font-bold transition-all text-xs shadow-xs"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                            
                            <div className="text-center md:text-right text-xs text-gray-400">
                                Joined {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
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
                            <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded-full">All-Time</span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">Total Orders</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">{orders.length}</h3>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-orange-500">
                                <Clock className="w-5 h-5" />
                            </div>
                            {pendingOrdersCount > 0 && <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">In Transit / Pending</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">{pendingOrdersCount}</h3>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">Delivered</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">{deliveredOrdersCount}</h3>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-orange-500">
                                <Heart className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold mb-1">Wishlist items</p>
                            <h3 className="text-4xl font-display font-bold text-secondary">{wishlistItems.length}</h3>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-secondary">Recent Orders</h2>
                        <span className="text-xs text-gray-400 font-medium">Dynamically synced with database</span>
                    </div>
                    {orders.length === 0 ? (
                        <div className="bg-slate-50 rounded-3xl p-12 text-center border border-dashed border-slate-200">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="font-bold text-secondary text-lg mb-1">No Orders Placed Yet</h3>
                            <p className="text-gray-400 text-sm mb-6">Explore our high-quality organic harvest and place your first order!</p>
                            <Link to="/products" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-xs">
                                Browse Produce
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const displayImage = order.products?.[0]?.image || 'https://images.unsplash.com/photo-1590005026998-3850734a6540?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                                const itemNames = order.products?.map(p => `${p.name} (x${p.quantity})`).join(', ');

                                return (
                                    <div key={order.id} className="bg-slate-50 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-6 border border-slate-100 hover:shadow-xs transition-shadow">
                                        <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shrink-0 shadow-xs border border-slate-100">
                                            <img src={displayImage} alt="Order Thumbnail" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 w-full text-center sm:text-left">
                                            <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                                                <h3 className="font-bold text-secondary text-md font-display">Order #{order.id.slice(-8).toUpperCase()}</h3>
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${order.statusColor}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-1 max-w-md truncate mx-auto sm:mx-0">
                                                {itemNames || 'Harvest Items'}
                                            </p>
                                            <p className="text-xs text-gray-400 mb-1">Ordered on: {order.date}</p>
                                            <p className="font-bold text-primary text-md">{order.total}</p>
                                        </div>
                                        <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                                            <button 
                                                onClick={() => setSelectedOrder(order)}
                                                className="w-full sm:w-auto text-center px-6 py-2.5 border border-gray-300 rounded-full font-bold text-secondary hover:bg-white hover:border-slate-400 transition-all text-sm shadow-xs"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Wishlist */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-secondary">From Your Wishlist</h2>
                        <span className="text-xs text-gray-400 font-medium">Your favorite harvest selections</span>
                    </div>
                    {wishlistItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlistItems.map(item => (
                                <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs group">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                                        <button
                                            onClick={() => toggleWishlist(item)}
                                            className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xs text-red-500 hover:scale-110 transition-transform cursor-pointer"
                                        >
                                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                        </button>
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-5 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-secondary text-md mb-1">{item.name}</h3>
                                            <p className="font-bold text-primary">${Number(item.price).toFixed(2)} / {item.unit || 'lb'}</p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(item, 1)}
                                            className="w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-12 text-center flex flex-col items-center justify-center shadow-xs">
                            <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-secondary mb-1">Your Wishlist is Empty</h3>
                            <p className="text-gray-400 text-xs max-w-sm">Tap the heart icons on marketplace crops to save them here for quick access later!</p>
                        </div>
                    )}
                </div>

                {/* Favorite Farmers */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-secondary">My Favorite Farmers</h2>
                        <span className="text-xs text-gray-400 font-medium">Experienced growers you trust</span>
                    </div>
                    {favoriteFarmers && favoriteFarmers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoriteFarmers.map(farmer => (
                                <div key={farmer.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 p-6 flex items-center justify-between shadow-xs group">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <img src={farmer.avatar} alt={farmer.name} className="w-12 h-12 rounded-full object-cover border border-slate-100 shrink-0" />
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-secondary text-sm truncate">{farmer.name}</h3>
                                            <p className="text-xs text-primary font-bold">{farmer.farmName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/farmer/${farmer.id}`} className="px-4 py-2 bg-slate-50 hover:bg-primary hover:text-white transition-colors rounded-full text-xs font-bold text-secondary">
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => toggleFavoriteFarmer(farmer)}
                                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                                        >
                                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 text-center flex flex-col items-center justify-center shadow-xs">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 text-lg">
                                🚜
                            </div>
                            <h3 className="text-sm font-bold text-secondary mb-1">No Favorite Farmers</h3>
                            <p className="text-gray-400 text-xs max-w-sm">Growers you favorite from the Farmers directory will appear here!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* EDIT PROFILE MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl border border-slate-100 flex flex-col p-8 relative animate-in slide-in-from-bottom-8 duration-300">
                        {/* Close button */}
                        <button 
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-secondary hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-3xl font-display font-black text-secondary">Edit Profile</h2>
                            <p className="text-sm text-gray-400 mt-1">Update your buyer profile details and upload a photo.</p>
                        </div>

                        <form onSubmit={handleEditFormSubmit} className="space-y-5">
                            
                            {/* Photo Upload Component */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                <img
                                    src={editPreviewUrl}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-full object-cover border border-slate-200 bg-white shadow-xs"
                                    onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${editName}`; }}
                                />
                                <div className="space-y-1.5 flex-1 w-full">
                                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">Upload Photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUploadChange}
                                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all file:cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    placeholder="Your full name"
                                    className="w-full bg-slate-50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200/50 font-semibold text-secondary"
                                />
                            </div>

                            {/* Email Address */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full bg-slate-50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200/50 font-semibold text-secondary"
                                />
                            </div>

                            {/* Contact Phone */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Contact Phone</label>
                                <input
                                    type="text"
                                    required
                                    value={editPhone}
                                    onChange={(e) => setEditPhone(e.target.value)}
                                    placeholder="e.g. +1 (555) 019-2834"
                                    className="w-full bg-slate-50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200/50 font-semibold text-secondary"
                                />
                            </div>

                            {/* Billing/Shipping Address */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Billing Address</label>
                                <textarea
                                    rows="2"
                                    required
                                    value={editAddress}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                    placeholder="Your complete billing and delivery address"
                                    className="w-full bg-slate-50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200/50 resize-none font-semibold text-secondary"
                                />
                            </div>

                            {/* Save CTA */}
                            <button
                                type="submit"
                                disabled={isSavingProfile}
                                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-full shadow-md text-sm transition-all active:scale-95 disabled:opacity-55 flex items-center justify-center gap-2"
                            >
                                {isSavingProfile ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Saving Profile...</span>
                                    </>
                                ) : (
                                    <span>Save Profile Modifications</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ORDER DETAILS MODAL */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col p-8 relative animate-in slide-in-from-bottom-8 duration-300">
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-secondary hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-6">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${selectedOrder.statusColor}`}>
                                {selectedOrder.status}
                            </span>
                            <h2 className="text-3xl font-display font-bold text-secondary mt-3">Order Invoice</h2>
                            <p className="text-sm text-gray-500 mt-1">ID: #{selectedOrder.id} • Date: {selectedOrder.date}</p>
                        </div>

                        {/* Order Timeline Visual */}
                        <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 text-center">Fulfillment Status Tracker</h4>
                            <div className="flex items-center justify-between relative max-w-md mx-auto">
                                <div className="absolute left-[10%] right-[10%] top-[14px] h-[3px] bg-slate-200" />
                                <div 
                                    className="absolute left-[10%] top-[14px] h-[3px] bg-primary transition-all duration-500" 
                                    style={{
                                        width: selectedOrder.status === 'Pending' ? '0%' :
                                               selectedOrder.status === 'Shipped' ? '50%' : '100%'
                                    }}
                                />
                                
                                <div className="flex flex-col items-center z-10">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                                        selectedOrder.status === 'Pending' || selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered'
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-slate-400 border-slate-200'
                                    }`}>
                                        1
                                    </div>
                                    <span className="text-[10px] font-bold text-secondary mt-1.5">Pending</span>
                                </div>
                                <div className="flex flex-col items-center z-10">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                                        selectedOrder.status === 'Shipped' || selectedOrder.status === 'Delivered'
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-slate-400 border-slate-200'
                                    }`}>
                                        2
                                    </div>
                                    <span className="text-[10px] font-bold text-secondary mt-1.5">Shipped</span>
                                </div>
                                <div className="flex flex-col items-center z-10">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                                        selectedOrder.status === 'Delivered'
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-slate-400 border-slate-200'
                                    }`}>
                                        3
                                    </div>
                                    <span className="text-[10px] font-bold text-secondary mt-1.5">Delivered</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-secondary mb-4 border-b border-slate-100 pb-2">Harvest Items</h3>
                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                {selectedOrder.products?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-50">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-secondary text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-400">Qty: {item.quantity} • Farm: {item.seller}</p>
                                        </div>
                                        <div className="text-sm font-bold text-secondary">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Logistics & Payment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 text-sm">
                            <div>
                                <h4 className="font-bold text-secondary mb-2">Delivery Address</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">{selectedOrder.shippingAddress}</p>
                                <p className="text-slate-600 text-xs mt-1.5">Phone: {selectedOrder.phone}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary mb-2">Billing & Payment</h4>
                                <p className="text-slate-600 text-xs">Payment Method: {selectedOrder.paymentMethod}</p>
                                <div className="border-t border-slate-200/60 mt-3 pt-3 flex justify-between font-bold">
                                    <span className="text-secondary text-xs">Grand Total</span>
                                    <span className="text-primary text-md">{selectedOrder.total}</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedOrder(null)}
                            className="bg-secondary hover:bg-slate-800 text-white font-bold py-3.5 rounded-full shadow-md text-center transition-all text-sm w-full mt-auto active:scale-95"
                        >
                            Close Receipt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerProfile;
