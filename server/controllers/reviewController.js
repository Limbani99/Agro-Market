// reviewController.js
const Review = require('../models/Review');
const Product = require('../models/Product');

// POST /api/reviews/add — Add a product review
const addReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, rating, comment } = req.body;

        if (!productId || !rating || !comment) {
            return res.status(400).json({ message: 'Product ID, rating, and comment are required' });
        }

        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user already reviewed this product, if so update it
        let review = await Review.findOne({ user: userId, product: productId });
        if (review) {
            review.rating = Number(rating);
            review.comment = comment;
            await review.save();
        } else {
            review = new Review({
                user: userId,
                product: productId,
                rating: Number(rating),
                comment
            });
            await review.save();
        }

        const populatedReview = await Review.findById(review._id)
            .populate('user', 'name email avatar')
            .populate('product', 'name price images');

        // Create review notification for product owner (seller)
        try {
            const Notification = require('../models/Notification');
            await Notification.create({
                user: productExists.sellerId,
                type: 'review',
                title: 'New Crop Review',
                message: `${populatedReview.user?.name || 'A buyer'} left a ${rating}-star review on "${productExists.name}": "${comment}"`
            });
        } catch (notifErr) {
            console.error('Error creating seller review notification:', notifErr);
        }

        res.status(201).json(populatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

// GET /api/reviews/product/:productId — Get all reviews for a specific product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId })
            .populate('user', 'name email avatar')
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

// GET /api/reviews/seller — Get all reviews for a seller's products
const getSellerReviews = async (req, res) => {
    try {
        const sellerId = req.user.id;

        // 1. Find all products belonging to this seller
        const products = await Product.find({ sellerId });
        const productIds = products.map(p => p._id);

        // 2. Find reviews containing these products
        const reviews = await Review.find({ product: { $in: productIds } })
            .populate('user', 'name email avatar')
            .populate('product', 'name price images')
            .sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seller reviews', error: error.message });
    }
};

// PUT /api/reviews/reply/:reviewId — Farmer replies to a product review
const addReply = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { reviewId } = req.params;
        const { reply } = req.body;

        if (!reply || !reply.trim()) {
            return res.status(400).json({ message: 'Reply comment is required' });
        }

        const review = await Review.findById(reviewId).populate('product');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Verify the product belongs to this seller
        const product = review.product;
        if (!product || String(product.sellerId) !== String(sellerId)) {
            return res.status(403).json({ message: 'You can only reply to reviews for your own products' });
        }

        review.reply = reply;
        await review.save();

        const populatedReview = await Review.findById(reviewId)
            .populate('user', 'name email avatar')
            .populate('product', 'name price images');

        // Create response notification for the reviewer (buyer)
        try {
            const Notification = require('../models/Notification');
            await Notification.create({
                user: review.user,
                type: 'review',
                title: 'Grower Review Response',
                message: `The grower of "${product.name}" replied to your review: "${reply}"`
            });
        } catch (notifErr) {
            console.error('Error creating buyer review reply notification:', notifErr);
        }

        res.status(200).json(populatedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reply', error: error.message });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'name email avatar')
            .populate('product', 'name price images')
            .sort({ createdAt: -1 })
            .limit(6);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

module.exports = {
    addReview,
    getProductReviews,
    getSellerReviews,
    addReply,
    getAllReviews
};
