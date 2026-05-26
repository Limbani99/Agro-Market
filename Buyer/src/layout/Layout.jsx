import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, Link } from 'react-router-dom'
import { ShoppingCart, X } from 'lucide-react'
import { useData } from '../context/DataProvider'

function Layout() {
    const { toastItem, dismissToast, cartCount } = useData();

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />

            {/* Global Cart Toast Notification */}
            <div
                className={`fixed bottom-6 right-6 z-[9999] transition-all duration-500 ${
                    toastItem
                        ? 'translate-y-0 opacity-100 pointer-events-auto'
                        : 'translate-y-8 opacity-0 pointer-events-none'
                }`}
            >
                <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl p-4 flex items-center gap-4 min-w-[300px] max-w-sm">
                    {/* Product thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                        <img
                            src={toastItem?.image || 'https://images.unsplash.com/photo-1524179524541-1bb7cee6ed2d?auto=format&fit=crop&q=80&w=100'}
                            alt={toastItem?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider mb-0.5">Added to Cart</p>
                        <p className="text-sm font-bold text-secondary truncate">{toastItem?.name}</p>
                        <p className="text-xs text-slate-400">${Number(toastItem?.price || 0).toFixed(2)} each</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                            onClick={dismissToast}
                            className="text-slate-300 hover:text-slate-500 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <Link
                            to="/cart"
                            onClick={dismissToast}
                            className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap"
                        >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            View Cart ({cartCount})
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout