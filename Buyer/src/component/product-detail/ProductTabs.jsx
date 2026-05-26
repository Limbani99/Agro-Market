import React, { useState, useEffect } from 'react';
import { Calendar, Leaf, Zap, Box, Star, MessageSquare, Send, Award, Check } from 'lucide-react';
import axios from 'axios';
import { useData } from '../../context/DataProvider';

const ProductTabs = ({ product, reviewsList: propReviewsList, onReviewAdded }) => {
    const { isAuthenticated, user } = useData();
    const [activeTab, setActiveTab] = useState('Description');
    const [internalReviews, setInternalReviews] = useState([]);
    const [ratingInput, setRatingInput] = useState(5);
    const [commentInput, setCommentInput] = useState('');
    const [hoveredStar, setHoveredStar] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const API = "http://localhost:5000/api";

    const reviewsList = propReviewsList !== undefined ? propReviewsList : internalReviews;

    const fetchProductReviews = async () => {
        try {
            const res = await axios.get(`${API}/reviews/product/${product.id || product._id}`);
            setInternalReviews(res.data);
        } catch (err) {
            console.error("Error loading product reviews:", err);
        }
    };

    useEffect(() => {
        if (propReviewsList === undefined && (product.id || product._id)) {
            fetchProductReviews();
        }
    }, [product, propReviewsList]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!commentInput.trim()) return;

        setIsSubmitting(true);
        try {
            await axios.post(`${API}/reviews/add`, {
                productId: product.id || product._id,
                rating: ratingInput,
                comment: commentInput
            });
            setCommentInput('');
            setRatingInput(5);
            if (onReviewAdded) {
                onReviewAdded();
            } else {
                fetchProductReviews();
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Error submitting review');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = ['Description', 'Product Details', `Reviews (${reviewsList.length})`];

    const attributes = [
        { icon: <Calendar className="w-5 h-5 text-primary" />, label: 'Harvested', value: 'Within 24 Hours' },
        { icon: <Leaf className="w-5 h-5 text-primary" />, label: 'Practice', value: '100% Organic' },
        { icon: <Zap className="w-5 h-5 text-primary" />, label: 'Stock Available', value: `${product.stock} units` },
        { icon: <Box className="w-5 h-5 text-primary" />, label: 'Storage', value: 'Crisper Drawer, 5-7 days' },
    ];

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Tab Headers */}
                <div className="flex items-center justify-center border-b border-slate-100">
                    {tabs.map((tab) => {
                        const tabKey = tab.startsWith('Reviews') ? 'Reviews' : tab;
                        const isActive = activeTab.startsWith(tabKey);
                        return (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tabKey)}
                                className={`flex-1 py-6 text-sm font-black transition-all relative ${
                                    isActive ? 'text-primary' : 'text-slate-400 hover:text-secondary'
                                }`}
                            >
                                {tab}
                                {isActive && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto">
                        {activeTab === 'Description' && (
                            <>
                                <h2 className="text-3xl font-black text-secondary mb-6">{product.name}</h2>
                                <p className="text-slate-500 leading-relaxed mb-12 text-lg">
                                    {product.description}
                                </p>
                            </>
                        )}
                        {activeTab === 'Product Details' && (
                            <>
                                <h2 className="text-3xl font-black text-secondary mb-6">Specification Details</h2>
                                <p className="text-slate-500 leading-relaxed mb-12 text-lg">
                                    This premium yield of <strong>{product.name}</strong> belongs to the category of <strong>{product.category}</strong>. 
                                    It is freshly prepared, verified, and shipped under peak temperature controls from <strong>{product.seller || 'Riverbend Farm'}</strong>.
                                </p>
                            </>
                        )}
                        {activeTab === 'Reviews' && (
                            <div className="mb-12">
                                <h2 className="text-3xl font-black text-secondary mb-6">Buyer Feedback</h2>
                                
                                {/* Reviews List */}
                                <div className="space-y-6 mb-12">
                                    {reviewsList.length === 0 ? (
                                        <div className="text-center py-10 bg-slate-50 rounded-3xl border border-slate-100">
                                            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                            <p className="text-slate-400 font-bold">No reviews yet for this harvest. Be the first to review!</p>
                                        </div>
                                    ) : (
                                        reviewsList.map((review) => (
                                            <div key={review._id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100/60 flex flex-col gap-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm relative overflow-hidden shrink-0">
                                                            <span>{review.user?.name?.slice(0, 2).toUpperCase() || 'U'}</span>
                                                            {review.user?.avatar && (
                                                                <img 
                                                                    src={review.user.avatar} 
                                                                    alt={review.user.name} 
                                                                    className="absolute inset-0 w-full h-full object-cover rounded-full" 
                                                                    onError={(e) => { e.target.style.display = 'none'; }} 
                                                                />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-secondary text-sm">{review.user?.name || 'Agro Buyer'}</h4>
                                                            <span className="text-[10px] text-gray-400 font-medium">
                                                                {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Rating display */}
                                                    <div className="flex items-center gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <Star 
                                                                key={s} 
                                                                className={`w-4 h-4 ${
                                                                    s <= review.rating 
                                                                        ? 'text-accent fill-accent' 
                                                                        : 'text-slate-200'
                                                                }`} 
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                                    {review.comment}
                                                </p>

                                                {/* Farmer's reply nested */}
                                                {review.reply && (
                                                    <div className="bg-white p-5 rounded-2xl border border-primary/10 border-l-4 border-l-primary flex flex-col gap-2 mt-2 ml-4 relative overflow-hidden">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <Award className="w-4 h-4 text-primary" />
                                                                <span className="text-xs font-black text-secondary uppercase tracking-wider flex items-center gap-1">
                                                                    <span>Farmer Response</span>
                                                                    <Check className="w-3.5 h-3.5 text-white bg-primary rounded-full p-0.5" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="text-slate-500 text-xs italic leading-relaxed font-semibold">
                                                            "{review.reply}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Add Review Block */}
                                <div className="border-t border-slate-100 pt-10">
                                    <h3 className="text-xl font-black text-secondary mb-2">Write a Review</h3>
                                    {isAuthenticated ? (
                                        <form onSubmit={handleReviewSubmit} className="space-y-5">
                                            {/* Rating input stars selector */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide mr-2">Your Rating:</span>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => setRatingInput(s)}
                                                            onMouseEnter={() => setHoveredStar(s)}
                                                            onMouseLeave={() => setHoveredStar(0)}
                                                            className="p-1 hover:scale-115 transition-transform"
                                                        >
                                                            <Star 
                                                                className={`w-6 h-6 transition-all ${
                                                                    s <= (hoveredStar || ratingInput)
                                                                        ? 'text-accent fill-accent scale-105'
                                                                        : 'text-slate-200'
                                                                }`} 
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Comment text */}
                                            <div className="space-y-2">
                                                <textarea
                                                    required
                                                    rows="4"
                                                    value={commentInput}
                                                    onChange={(e) => setCommentInput(e.target.value)}
                                                    placeholder="Share your experience with this harvest yield..."
                                                    className="w-full bg-slate-50 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-slate-200/50 resize-none font-medium text-secondary"
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !commentInput.trim()}
                                                className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-full shadow-md text-sm transition-all active:scale-95 disabled:opacity-55 flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Post Review'}
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-6 text-center">
                                            <p className="text-slate-400 font-bold text-sm mb-4">You must be logged in to leave feedback.</p>
                                            <Link to="/login" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-xs inline-block transition-colors">
                                                Log In Now
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {attributes.map((attr, i) => (
                                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center group hover:shadow-xl hover:shadow-primary/5 transition-all">
                                    <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                        {attr.icon}
                                    </div>
                                    <span className="text-secondary font-black text-sm mb-1">{attr.label}</span>
                                    <span className="text-slate-400 font-bold text-xs">{attr.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductTabs;
