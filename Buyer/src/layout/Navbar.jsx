import { Link } from 'react-router-dom'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { useData } from '../context/DataProvider';

function Navbar() {
    const { user } = useData();
    console.log("user:", user);
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
                <div className="hidden md:flex items-center gap-8 ml-5 text-slate-600 font-medium">
                    <Link to="/" className="text-primary">Home</Link>
                    <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                    <Link to="/farmers" className="hover:text-primary transition-colors">Farmers</Link>
                    <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                    <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                </div>


                {/* Search Bar */}
                <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
                    <input
                        type="text"
                        placeholder="Search fresh produce..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
                        <ShoppingCart className="w-6 h-6 text-slate-700" />
                        <span className="absolute top-0 right-0 w-5 h-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white">0</span>
                    </Link>
                    {user ? (
                         <Link to="/profile" className="hidden sm:flex p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-700">
                            <User className="w-6 h-6" />
                        </Link>
                       
                    ) : (
                        <div className="hidden sm:flex items-center gap-4">
                            <Link to="/login" className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">Login</Link>
                            <Link to="/register" className="px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">Register</Link>
                        </div>  
                    )}
                    <button className="md:hidden p-2">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
