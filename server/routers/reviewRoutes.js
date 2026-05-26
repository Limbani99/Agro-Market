const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    addReview,
    getProductReviews,
    getSellerReviews,
    addReply,
    getAllReviews
} = require('../controllers/reviewController');

// Review endpoints
router.post('/add', authMiddleware([]), addReview); // Logged in user can add a review
router.get('/all', getAllReviews); // Public can view all reviews for testimonials
router.get('/product/:productId', getProductReviews); // Public can view product reviews
router.get('/seller', authMiddleware(['farmer']), getSellerReviews); // Farmer can view reviews on their products
router.put('/reply/:reviewId', authMiddleware(['farmer']), addReply); // Farmer can reply to a review

module.exports = router;
