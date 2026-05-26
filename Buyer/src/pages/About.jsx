import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Target, Eye, Flag, ShieldCheck, Truck, Users, Leaf, Sprout, Star, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useData } from '../context/DataProvider';

const About = () => {
    const { products, orders } = useData();
    const [farmersList, setFarmersList] = useState([]);
    const [testimonialsList, setTestimonialsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            setIsLoading(true);
            try {
                const [farmersRes, reviewsRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/users/farmers"),
                    axios.get("http://localhost:5000/api/reviews/all")
                ]);
                setFarmersList(farmersRes.data.farmers || []);
                setTestimonialsList(reviewsRes.data || []);
            } catch (err) {
                console.error("Error fetching about page data:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAboutData();
    }, []);

    // Dynamically calculate and slice featured farmers
    const featuredFarmers = useMemo(() => {
        return farmersList.map(farmer => {
            const farmerProducts = products.filter(p => {
                const sId = p.sellerId?._id || p.sellerId?.id || (typeof p.sellerId === 'string' ? p.sellerId : null);
                return String(sId) === String(farmer._id);
            });

            const averageRating = farmerProducts.length > 0
                ? (farmerProducts.reduce((sum, p) => sum + (p.rating || 4.8), 0) / farmerProducts.length).toFixed(1)
                : "4.8";

            return {
                id: farmer._id,
                name: farmer.name,
                farmName: farmer.farmName || "Terra Agro Farm",
                rating: Number(averageRating),
                avatar: farmer.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${farmer.name}`
            };
        });
    }, [farmersList, products]);

    const defaultFeatured = useMemo(() => [
        { id: '1', name: 'Sarah Jenkins', farmName: 'Riverbend Organic Farm', rating: 5, avatar: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { id: '2', name: 'John Miller', farmName: 'Miller Valley Greens', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { id: '3', name: 'Elena Rodriguez', farmName: 'Highland Orchards', rating: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }
    ], []);

    // Always yield exactly 3 items by padding live database entries with curated defaults
    const displayFeatured = useMemo(() => {
        if (featuredFarmers.length >= 3) {
            return featuredFarmers.slice(0, 3);
        }
        const padded = [...featuredFarmers];
        const paddingNeeded = 3 - featuredFarmers.length;
        for (let i = 0; i < paddingNeeded; i++) {
            padded.push(defaultFeatured[i % defaultFeatured.length]);
        }
        return padded;
    }, [featuredFarmers, defaultFeatured]);

    // Dynamically calculate and slice testimonials
    const defaultTestimonials = useMemo(() => [
        { name: 'Michael Thompson', role: 'Verified Customer', comment: 'The difference in taste is unbelievable. I didn\'t know tomatoes could be this sweet! Knowing I\'m supporting local farmers makes it even better.', rating: 5 },
        { name: 'Emily Carter', role: 'Home Chef', comment: 'Agro Market has transformed my cooking. The seasonal produce boxes inspire my weekly menus and the delivery is always perfectly on time.', rating: 5 },
        { name: 'David Silva', role: 'Restaurant Owner', comment: 'We source almost 70% of our ingredients from Agro Market. The consistency and freshness give us a competitive edge in the city.', rating: 5 }
    ], []);

    const displayTestimonials = useMemo(() => {
        const liveReviews = testimonialsList.map(t => ({
            name: t.user?.name || 'Agro Customer',
            role: t.product?.name ? `Verified Buyer of ${t.product.name}` : 'Verified Customer',
            comment: t.comment,
            rating: t.rating || 5
        }));

        if (liveReviews.length >= 3) {
            return liveReviews.slice(0, 3);
        }
        const padded = [...liveReviews];
        const paddingNeeded = 3 - liveReviews.length;
        for (let i = 0; i < paddingNeeded; i++) {
            padded.push(defaultTestimonials[i % defaultTestimonials.length]);
        }
        return padded;
    }, [testimonialsList, defaultTestimonials]);

    if (isLoading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center py-24">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-400 font-bold text-sm">Harvesting about details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-bg-light min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[500px] lg:h-[600px] flex items-center">
                <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Farm sunrise"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10 text-white max-w-3xl ml-4 lg:ml-12">
                    <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6">
                        Connecting<br />Farmers<br />Directly To <span className="text-primary-dark">Your<br />Table</span>
                    </h1>
                    <p className="text-lg lg:text-xl font-medium text-white/90 mb-8 max-w-xl">
                        Agro Market is a vibrant marketplace bringing the freshest, locally sourced produce straight from the farm to your home.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/products" className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg flex items-center gap-2">
                            Explore Produce <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/farmers" className="bg-white hover:bg-slate-50 text-secondary px-8 py-3.5 rounded-full font-bold transition-all shadow-md">
                            Meet Farmers
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-20">
                {/* Bridging the gap */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
                    <div className="w-full lg:w-1/2 relative">
                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Fresh vegetables"
                            className="w-full h-[500px] object-cover rounded-[2rem] shadow-xl"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl max-w-xs border border-slate-100 hidden md:block">
                            <p className="text-lg font-display italic text-secondary mb-3">
                                "We believe fresh food is a right, not a privilege, for our community."
                            </p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">— Our Founder</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <p className="text-primary font-bold tracking-widest uppercase mb-4">Our Journey</p>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-6 leading-tight">
                            Bridging the Gap from Farm to Kitchen
                        </h2>
                        <div className="text-slate-600 space-y-4 mb-8 text-lg">
                            <p>
                                Founded on the principles of sustainability and community, Agro Market started as a small initiative to support local farmers. We noticed a disconnect between the people growing the food and the families consuming it.
                            </p>
                            <p>
                                Today, we provide a reliable platform that eliminates the middleman, ensuring farmers receive fair compensation while our customers get the freshest, most nutritious produce available.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-secondary">100% Organic</h4>
                                    <p className="text-sm text-slate-500">Certified sustainable practices</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-secondary">Community First</h4>
                                    <p className="text-sm text-slate-500">Supporting local growth</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <div className="bg-white p-10 rounded-[2rem] text-center shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Target className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-secondary mb-4 font-display">Our Mission</h3>
                        <p className="text-slate-500 leading-relaxed">
                            To democratize access to high-quality, organic produce by creating a transparent and direct supply chain between growers and consumers.
                        </p>
                    </div>
                    <div className="bg-white p-10 rounded-[2rem] text-center shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Eye className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-secondary mb-4 font-display">Our Vision</h3>
                        <p className="text-slate-500 leading-relaxed">
                            To become the world's most trusted marketplace for sustainable agriculture, fostering a global culture of healthy eating and ecological responsibility.
                        </p>
                    </div>
                    <div className="bg-white p-10 rounded-[2rem] text-center shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Flag className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-secondary mb-4 font-display">Our Goals</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Supporting 5,000 farmers by 2030 and reducing our carbon footprint to net-zero through eco-friendly delivery networks.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Why Choose Agro Market?</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">We're committed to providing the best service for both our farmers and customers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24">
                    {[
                        { icon: <Leaf className="w-6 h-6" />, title: 'Fresh Farm Produce', desc: 'Sourced daily from local organic farms.' },
                        { icon: <Users className="w-6 h-6" />, title: 'Direct Connection', desc: 'Chat with farmers directly about their growing methods.' },
                        { icon: <ShieldCheck className="w-6 h-6" />, title: 'Secure Payments', desc: 'Encrypted transactions for complete peace of mind.' },
                        { icon: <Truck className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Eco-friendly logistics optimized for your neighborhood.' },
                        { icon: <Star className="w-6 h-6" />, title: 'Trusted Farmers', desc: 'Rigorous vetting process for quality assurance.' },
                        { icon: <Sprout className="w-6 h-6" />, title: 'Organic Quality', desc: 'No synthetic pesticides, herbicides, or GMOs.' }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4 hover:border-primary/30 transition-colors">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 text-primary">
                                {feature.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary mb-1">{feature.title}</h4>
                                <p className="text-sm text-slate-500">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two large cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className="bg-primary rounded-[2rem] p-10 md:p-14 text-white relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Truck className="w-64 h-64 -mb-10 -mr-10" />
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-8 relative z-10">For Farmers</h3>
                        <ul className="space-y-4 relative z-10">
                            {[
                                'Direct access to a wider community',
                                'Zero middleman profit margins',
                                'Inventory management tools',
                                'Automated logistics support'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0" />
                                    <span className="font-medium text-lg text-white/90">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-amber-900 rounded-[2rem] p-10 md:p-14 text-white relative overflow-hidden group">
                        <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <ShoppingCart className="w-64 h-64 -mb-10 -mr-10" />
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-8 relative z-10">For Customers</h3>
                        <ul className="space-y-4 relative z-10">
                            {[
                                'Guaranteed freshness and quality',
                                'Transparent pricing model',
                                'Traceability to the specific farm',
                                'Convenient home deliveries'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-orange-300 shrink-0" />
                                    <span className="font-medium text-lg text-white/90">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-secondary text-white py-20 mb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">
                                {farmersList.length > 0 ? farmersList.length : 8}<span className="text-primary">+</span>
                            </h3>
                            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Small Farmers</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">
                                {products.length > 0 ? products.length : 32}<span className="text-primary">+</span>
                            </h3>
                            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Daily Produce</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">
                                {orders.length > 0 ? orders.length * 12 + 120 : 120}<span className="text-primary">+</span>
                            </h3>
                            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Delivered Meals</p>
                        </div>
                        <div className="px-4">
                            <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">
                                {orders.length > 0 ? orders.length * 5 + 48 : 48}<span className="text-primary">+</span>
                            </h3>
                            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Happy Customers</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8">
                {/* Featured Farmers */}
                <div className="mb-24">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">Meet Our Featured Farmers</h2>
                        <Link to="/farmers" className="text-primary font-bold hover:underline hidden sm:block">Meet All Farmers →</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayFeatured.map((farmer, i) => (
                            <Link to={farmer.id ? `/farmer/${farmer.id}` : '/farmers'} key={i} className="group block cursor-pointer">
                                <div className="rounded-[2rem] overflow-hidden mb-6 aspect-[4/5] bg-slate-100 border border-slate-100">
                                    <img src={farmer.avatar} alt={farmer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <h3 className="text-2xl font-bold text-secondary mb-1 group-hover:text-primary transition-colors">{farmer.name}</h3>
                                <p className="text-primary font-medium mb-3">{farmer.farmName}</p>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} className={`w-4 h-4 ${j < Math.floor(farmer.rating || 5) ? 'text-accent fill-accent' : 'text-slate-200'}`} />
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary text-center mb-12">What Our Community Says</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayTestimonials.map((review, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between">
                                <div>
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} className={`w-4 h-4 ${j < review.rating ? 'text-accent fill-accent' : 'text-slate-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 italic mb-8 leading-relaxed">"{review.comment}"</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xl">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-secondary">{review.name}</h4>
                                        <p className="text-xs text-slate-400 font-semibold">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instagram / Farm Life */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Our Life on the Farm</h2>
                        <p className="text-slate-500">A glimpse into the daily routines of sustainable agriculture.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                            'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                        ].map((img, i) => (
                            <div key={i} className="aspect-square rounded-2xl overflow-hidden group">
                                <img src={img} alt={`Farm life ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
