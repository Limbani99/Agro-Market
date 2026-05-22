import React from 'react';
import { MapPin, Star, Mail, CheckCircle, Leaf, Truck, Calendar, ShoppingCart, Plus, ChevronRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const FarmerProfile = () => {
    const products = [
        {
            id: 1,
            name: 'Heirloom Tomatoes',
            rating: 5.0,
            price: '6.50',
            unit: 'lb',
            image: '/assets/tomatoes.png', // Assuming we have these or we'll use generic placeholders
            badge: 'Limited',
            seller: 'Riverbend Farm'
        },
        {
            id: 2,
            name: 'Rainbow Carrots',
            rating: 4.8,
            price: '4.25',
            unit: 'bunch',
            image: '/assets/carrots.png',
            seller: 'Riverbend Farm'
        },
        {
            id: 3,
            name: 'Sweet Strawberries',
            rating: 4.9,
            price: '7.00',
            unit: 'pint',
            image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            seller: 'Riverbend Farm'
        },
        {
            id: 4,
            name: 'Lacinato Kale',
            rating: 4.7,
            price: '3.50',
            unit: 'bunch',
            image: 'https://images.unsplash.com/photo-1524175869111-19b0893d20b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            seller: 'Riverbend Farm'
        },
        {
            id: 5,
            name: 'Sugar Snap Peas',
            rating: 4.9,
            price: '5.00',
            unit: 'lb',
            image: 'https://images.unsplash.com/photo-1533282960533-51328aa2660a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            seller: 'Riverbend Farm'
        },
        {
            id: 6,
            name: 'Baby Red Potatoes',
            rating: 4.8,
            price: '4.50',
            unit: 'lbs',
            image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            seller: 'Riverbend Farm'
        },
        {
            id: 7,
            name: 'Hardneck Garlic',
            rating: 5.0,
            price: '2.00',
            unit: 'bulb',
            image: 'https://images.unsplash.com/photo-1540148426946-b51d8b6da2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            seller: 'Riverbend Farm'
        },
        {
            id: 8,
            name: 'Green Cabbage',
            rating: 4.6,
            price: '3.00',
            unit: 'head',
            image: 'https://images.unsplash.com/photo-1506807803487-21a48c414995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            seller: 'Riverbend Farm'
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[350px] md:h-[450px] w-full">
                <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Farm Landscape" 
                    className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Profile Card positioned overlapping the hero image and content below */}
                <div className="absolute -bottom-16 md:-bottom-20 left-4 right-4 md:left-10 lg:left-20 max-w-3xl">
                    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 border border-white/50 backdrop-blur-sm relative">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shrink-0 shadow-lg">
                            <img 
                                src="https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                                alt="Sarah Jenkins" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-yellow-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
                                PRO
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary">Sarah Jenkins</h1>
                                <span className="text-primary font-semibold text-lg hidden md:block">|</span>
                                <span className="text-primary font-semibold text-lg">Riverbend Farm</span>
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 font-medium mb-6">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> Hudson Valley, NY
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.9 <span className="font-normal">(120 reviews)</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                <div>12 years exp</div>
                            </div>
                            
                            <div className="flex gap-4 justify-center md:justify-start">
                                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2">
                                    <Leaf className="w-4 h-4" /> Follow Farm
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-secondary border border-gray-200 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for overlapping card */}
            <div className="h-24 md:h-32"></div>

            <div className="container mx-auto px-4 lg:px-20 pb-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <Leaf className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">24 Products</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Available Now</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <Truck className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">1.2K+ Orders</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Successfully Delivered</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <Calendar className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">12 Years</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Farming Experience</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1">
                        <CheckCircle className="w-8 h-8 text-primary mb-3" />
                        <h3 className="text-xl font-bold text-secondary">100% Organic</h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">Certified Regenerative</p>
                    </div>
                </div>

                {/* Heritage Section */}
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-orange-50 rounded-[2rem] transform rotate-3 scale-105 -z-10"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1524175869111-19b0893d20b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="Kale field" 
                            className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">Our Heritage</p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6 leading-tight">
                            Cultivating Soil & Soul
                        </h2>
                        <div className="text-gray-600 space-y-4 mb-8">
                            <p>
                                After a decade in the corporate bustle of Manhattan, Sarah Jenkins returned to her roots in the Hudson Valley with a singular mission: to heal the land while feeding the community. Riverbend Farm isn't just a place of production; it's a living ecosystem where regenerative practices meet modern sustainability.
                            </p>
                            <p>
                                At Riverbend, we believe that healthy soil is the foundation of human health. We use no synthetic pesticides, opting instead for crop rotation and natural composting to keep our fields vibrant and full of life.
                            </p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-6 py-2">
                            <p className="text-xl md:text-2xl font-display italic text-gray-700">
                                "The secret to vibrant flavor isn't in the seed, it's in the soil."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Farmer Products Section */}
                <div className="mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">farmer product</h2>
                            <p className="text-gray-500 italic">Harvested this morning, delivered to you tomorrow.</p>
                        </div>
                        <Link to="/products" className="text-primary font-bold hover:text-primary-dark transition-colors flex items-center gap-1 mt-4 md:mt-0 group">
                            View Seasonal Menu <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((p) => (
                            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                <Link to={`/product/${p.id}`} className="relative aspect-[4/3] overflow-hidden bg-slate-50 block">
                                    {p.badge && (
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="px-3 py-1 bg-white/90 text-secondary text-[10px] font-black rounded-lg uppercase tracking-wider backdrop-blur-sm">
                                                {p.badge}
                                            </span>
                                        </div>
                                    )}
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </Link>
                                <div className="p-5 bg-slate-50">
                                    <Link to={`/product/${p.id}`} className="text-lg font-display font-bold text-secondary hover:text-primary transition-colors mb-1 truncate block">
                                        {p.name}
                                    </Link>
                                    <div className="flex items-center gap-1 mb-4">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs text-slate-500 font-bold">{p.rating}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xl font-black text-secondary">${p.price}</span>
                                            <span className="text-xs text-slate-500 font-bold ml-1">/ {p.unit}</span>
                                        </div>
                                        <button className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-display font-bold text-secondary mb-8">What Shoppers are Saying</h2>
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-md shadow-sm relative">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                            ))}
                        </div>
                        <p className="text-gray-600 italic mb-6 leading-relaxed">
                            "The flavor of Sarah's heirloom tomatoes is absolutely unmatched! You can truly taste the care that goes into the soil. My family looks forward to our delivery every week!"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                                EM
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary text-sm">Emily Hayes</h4>
                                <p className="text-xs text-gray-400">Verified Buyer • Hudson Valley Local</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-primary text-white py-16 px-4">
                <div className="container mx-auto max-w-2xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Stay Rooted with Riverbend</h2>
                    <p className="text-white/80 mb-8 font-medium">
                        Join our mailing list for weekly harvest updates, seasonal recipes, and first access to our limited crops.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="px-6 py-3 rounded-full flex-1 text-secondary focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button 
                            type="submit" 
                            className="px-8 py-3 bg-primary hover:bg-primary-dark transition-colors rounded-full font-bold shadow-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FarmerProfile;
