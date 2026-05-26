// wishlistRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getWishlistItems,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/wishlistController');

// All wishlist routes require authentication
router.get('/', authMiddleware([]), getWishlistItems);
router.post('/add', authMiddleware([]), addToWishlist);
router.delete('/remove/:id', authMiddleware([]), removeFromWishlist);

module.exports = router;
