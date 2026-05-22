const express = require("express");
const router = express.Router();

// Routes go here
const { getWishlistItems,
    addToWishlist,
    removeFromWishlist } = require('../controllers/wishlistController');

router.get('/', getWishlistItems);
router.post('/add', addToWishlist);
router.delete('/remove/:id', removeFromWishlist);

module.exports = router;
