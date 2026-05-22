import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, RefreshCw, HeadphonesIcon, Tractor, MonitorSmartphone, Handshake, ChevronDown } from 'lucide-react';

const Contact = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: 'How to order?',
            answer: 'Simply browse our marketplace, add fresh produce to your cart, and proceed to checkout. You can create an account to track your orders or checkout as a guest.'
        },
        {
            question: 'Become a seller?',
            answer: 'Navigate to our "Farmers" section and click on "Join as Farmer". Fill out the application form with your farm details, and our team will get in touch within 48 hours.'
        },
        {
            question: 'Payment methods',
            answer: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
        },
        {
            question: 'Delivery timing',
            answer: 'Most local orders are delivered within 24-48 hours. When you place an order, you will receive an estimated delivery time based on your location.'
        },
        {
            question: 'Refund policy',
            answer: 'We offer a 100% satisfaction guarantee. If you are not happy with the quality of your produce, please contact us within 24 hours of delivery for a full refund or replacement.'
        }
    ];

    return (
        <div className="bg-bg-light min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Farm Field" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-[-40px]">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-md">
                        Get In Touch With Us
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-medium drop-shadow">
                        We're here to help farmers and customers connect better. Reach out for support, questions, or partnerships.
                    </p>
                </div>
            </div>

            {/* Overlapping Info Cards */}
            <div className="container mx-auto px-4 lg:px-8 relative z-20 mt-[-60px] mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4 text-primary">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-secondary mb-2 text-lg">Office Address</h3>
                        <p className="text-sm text-slate-500">123 Harvest Lane, Green Valley, NY 10024</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-500">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-secondary mb-2 text-lg">Phone</h3>
                        <p className="text-sm text-slate-500">+1 (800) FRESH-01</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-secondary mb-2 text-lg">Email</h3>
                        <p className="text-sm text-slate-500">support@agromarket.com</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-4 text-amber-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-secondary mb-2 text-lg">Hours</h3>
                        <p className="text-sm text-slate-500">Mon-Fri, 8 AM - 6 PM</p>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="container mx-auto px-4 lg:px-8 mb-32">
                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-dark mb-4">Send us a message</h2>
                        <p className="text-slate-500">Fill out the form below and our team will get back to you within 24 hours.</p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wide">Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Your full name" 
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wide">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="hello@example.com" 
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wide">Phone</label>
                                <input 
                                    type="tel" 
                                    placeholder="+1 (555) 000-0000" 
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-secondary uppercase tracking-wide">Subject</label>
                                <div className="relative">
                                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-700 appearance-none">
                                        <option>Customer Support</option>
                                        <option>Farmer Support</option>
                                        <option>Partnership Inquiry</option>
                                        <option>Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-secondary uppercase tracking-wide">Message</label>
                            <textarea 
                                placeholder="How can we help you?" 
                                rows="6"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-700 resize-none"
                            ></textarea>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 flex-1 md:flex-none">
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                            <button type="reset" className="bg-white hover:bg-slate-50 text-secondary border border-slate-200 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 flex-1 md:flex-none">
                                <RefreshCw className="w-5 h-5" />
                                Reset Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* How Can We Help */}
            <div className="bg-slate-50 py-24 mb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">How can we help?</h2>
                        <p className="text-slate-500">Choose a category to get the specialized assistance you need from our dedicated teams.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-primary mb-6">
                                <HeadphonesIcon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-secondary text-xl mb-3">Customer Support</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1">Assistance with orders, delivery tracking, and returns for shoppers.</p>
                            <a href="#" className="text-primary font-bold hover:underline flex items-center gap-1 text-sm mt-auto">
                                Contact Support ↗
                            </a>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                                <Tractor className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-secondary text-xl mb-3">Farmer Support</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1">Resources for our sellers, inventory management, and market insights.</p>
                            <a href="#" className="text-orange-500 font-bold hover:underline flex items-center gap-1 text-sm mt-auto">
                                Grow with Us ↗
                            </a>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                                <MonitorSmartphone className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-secondary text-xl mb-3">Technical Help</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1">Reporting bugs, account security, or issues with our mobile app.</p>
                            <a href="#" className="text-blue-500 font-bold hover:underline flex items-center gap-1 text-sm mt-auto">
                                Get Tech Support ↗
                            </a>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                                <Handshake className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-secondary text-xl mb-3">Partnerships</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1">Corporate collaborations, media inquiries, and supply chain deals.</p>
                            <a href="#" className="text-amber-600 font-bold hover:underline flex items-center gap-1 text-sm mt-auto">
                                Collaborate ↗
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="container mx-auto px-4 lg:px-8 max-w-3xl mb-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div 
                            key={i} 
                            className={`bg-white border rounded-2xl p-6 cursor-pointer transition-colors shadow-sm ${openFaq === i ? 'border-primary/50' : 'border-slate-200 hover:border-primary/30'}`}
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-secondary text-lg">{faq.question}</h4>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                            </div>
                            {openFaq === i && (
                                <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
