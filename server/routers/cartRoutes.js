const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');

// All cart routes require a logged-in buyer
router.get('/',                         authMiddleware([]), getCart);
router.post('/add',                     authMiddleware([]), addToCart);
router.put('/update',                   authMiddleware([]), updateCartQuantity);
router.delete('/remove/:productId',     authMiddleware([]), removeFromCart);
router.delete('/clear',                 authMiddleware([]), clearCart);

module.exports = router;
