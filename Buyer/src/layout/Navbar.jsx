import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Bell, Check, Trash2, X } from 'lucide-react';
import { useData } from '../context/DataProvider';

function Navbar() {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { 
        user, 
        cartCount, 
        notifications, 
        markNotificationRead, 
        markAllNotificationsRead, 
        deleteNotification,
        logout 
    } = useData();

    const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <span className="text-2xl font-display font-bold text-secondary">Agro Market</span>
                </Link>

                {/* Nav Links - Desktop */}
                <div className="hidden md:flex items-center gap-8 ml-5 text-slate-600 font-bold text-sm">
                    <NavLink to="/" className={({ isActive }) => `transition-all ${isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}`}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => `transition-all ${isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}`}>Products</NavLink>
                    <NavLink to="/farmers" className={({ isActive }) => `transition-all ${isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}`}>Farmers</NavLink>
                    <NavLink to="/about" className={({ isActive }) => `transition-all ${isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}`}>About</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `transition-all ${isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}`}>Contact</NavLink>
                </div>

                {/* Search Bar */}
                <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search fresh produce..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700 text-sm placeholder-slate-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="p-2 hover:bg-slate-100 rounded-full transition-colors relative text-slate-700">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount || 0}
                        </span>
                    </Link>

                    {user && (
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors relative text-slate-700 focus:outline-none"
                            >
                                <Bell className="w-6 h-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <>
                                    <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                                    <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                                            <h4 className="font-bold text-slate-800 text-[14px]">Notifications</h4>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={markAllNotificationsRead}
                                                    className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                                                >
                                                    <Check className="w-3.5 h-3.5 stroke-[2.5px]" />
                                                    <span>Mark all read</span>
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-72 overflow-y-auto">
                                            {notifications && notifications.length > 0 ? (
                                                notifications.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        className={`px-4 py-3 flex gap-3 border-b border-slate-50 transition-colors relative group ${
                                                            notif.read ? 'bg-white' : 'bg-green-50/10 border-l-2 border-primary'
                                                        }`}
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <p className={`text-[12px] ${notif.read ? 'font-medium text-slate-600' : 'font-bold text-slate-800'}`}>
                                                                    {notif.title}
                                                                </p>
                                                                <span className="text-[10px] text-slate-400 shrink-0">{notif.date}</span>
                                                            </div>
                                                            <p className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">{notif.desc}</p>
                                                        </div>
                                                        <div className="flex flex-col gap-1.5 justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                            {!notif.read && (
                                                                <button
                                                                    onClick={() => markNotificationRead(notif.id)}
                                                                    title="Mark read"
                                                                    className="p-1 text-slate-400 hover:text-primary hover:bg-slate-100 rounded"
                                                                >
                                                                    <Check className="w-3.5 h-3.5" />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteNotification(notif.id)}
                                                                title="Dismiss"
                                                                className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-8 text-center text-slate-400 text-xs">
                                                    No new notifications
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2.5 p-1.5 hover:bg-slate-50 rounded-full transition-all focus:outline-none shrink-0"
                            >
                                <img
                                    src={user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
                                />
                                <span className="hidden md:inline text-xs font-bold text-slate-700">{user.name.split(' ')[0]}</span>
                            </button>

                            {showProfileMenu && (
                                <>
                                    <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="px-4 py-2.5 border-b border-slate-50">
                                            <p className="font-extrabold text-slate-800 text-[13.5px] truncate">{user.name}</p>
                                            <p className="text-[10.5px] font-medium text-slate-400 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                                        >
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span>My Profile</span>
                                        </Link>
                                        <Link
                                            to="/cart"
                                            onClick={() => setShowProfileMenu(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors"
                                        >
                                            <ShoppingCart className="w-4 h-4 text-slate-400" />
                                            <span>My Cart ({cartCount})</span>
                                        </Link>
                                        <div className="border-t border-slate-50 my-1" />
                                        <button
                                            onClick={() => {
                                                logout();
                                                navigate("/");
                                                setShowProfileMenu(false);
                                            }}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-extrabold text-rose-600 hover:bg-rose-50 transition-colors w-full text-left cursor-pointer"
                                        >
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-3">
                            <Link to="/login" className="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-full transition-all">Login</Link>
                            <Link to="/register" className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/95 transition-all shadow-sm shadow-primary/10">Register</Link>
                        </div>  
                    )}

                    <button 
                        onClick={() => setShowMobileMenu(!showMobileMenu)} 
                        className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700 focus:outline-none"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {showMobileMenu && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setShowMobileMenu(false)} />
                    <div className="fixed top-0 bottom-0 right-0 w-64 bg-white z-50 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-right duration-200 md:hidden">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                            <span className="font-bold text-secondary text-md">Navigation</span>
                            <button className="p-1 rounded-full hover:bg-slate-100 text-slate-500 focus:outline-none" onClick={() => setShowMobileMenu(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-4 text-slate-600 font-bold text-sm">
                            <NavLink to="/" onClick={() => setShowMobileMenu(false)} className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}>Home</NavLink>
                            <NavLink to="/products" onClick={() => setShowMobileMenu(false)} className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}>Products</NavLink>
                            <NavLink to="/farmers" onClick={() => setShowMobileMenu(false)} className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}>Farmers</NavLink>
                            <NavLink to="/about" onClick={() => setShowMobileMenu(false)} className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}>About</NavLink>
                            <NavLink to="/contact" onClick={() => setShowMobileMenu(false)} className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary text-slate-500'}>Contact</NavLink>
                        </div>

                        <div className="border-t border-slate-100 pt-6 mt-auto">
                            {user ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                        <div className="min-w-0">
                                            <p className="font-extrabold text-secondary text-sm truncate">{user.name}</p>
                                            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link to="/profile" onClick={() => setShowMobileMenu(false)} className="w-full text-center py-2.5 border border-slate-200 text-secondary hover:bg-slate-50 rounded-full font-bold text-xs">Profile</Link>
                                    <button onClick={() => { logout(); navigate("/"); setShowMobileMenu(false); }} className="w-full text-center py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full font-extrabold text-xs cursor-pointer">Sign Out</button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" onClick={() => setShowMobileMenu(false)} className="w-full text-center py-2.5 border border-slate-200 text-secondary hover:bg-slate-50 rounded-full font-bold text-xs">Login</Link>
                                    <Link to="/register" onClick={() => setShowMobileMenu(false)} className="w-full text-center py-2.5 bg-primary text-white hover:bg-primary-dark rounded-full font-bold text-xs shadow-sm">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}

export default Navbar;
