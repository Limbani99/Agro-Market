import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa6'
import { Mail, MapPin, Phone } from 'lucide-react'


function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div>
                            <span className="text-2xl font-display font-bold text-secondary">Agro Market</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed">
                            Bringing the gap between local farms and your kitchen table. Rooted in quality, transparency, and community.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary">Quick Links</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Our Products</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Top Farmers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Become a Seller</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary">Support</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Shipping Rates</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-secondary">Contact Us</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-primary" />
                                123 Farm Road, Rural Valley
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary" />
                                +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary" />
                                support@agromarket.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">© 2026 Agro Market. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-slate-400">
                        <a href="#" className="hover:text-primary">Privacy</a>
                        <a href="#" className="hover:text-primary">Terms</a>
                        <a href="#" className="hover:text-primary">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer