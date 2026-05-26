const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    getOrders,
    getSellerOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getOrdersByStatus
} = require('../controllers/orderController');

// All order routes require authenticated users
router.get('/', authMiddleware([]), getOrders); // Buyer retrieves their own orders
router.get('/seller', authMiddleware(['farmer']), getSellerOrders); // Seller retrieves orders containing their products
router.post('/add', authMiddleware([]), createOrder); // Buyer creates a new order
router.put('/update/:id', authMiddleware([]), updateOrderStatus); // Seller/Admin updates order status
router.delete('/delete/:id', authMiddleware([]), deleteOrder); // Delete order (Admin)
router.get('/id/:id', authMiddleware([]), getOrderById); // Get order by ID
router.get('/status/:status', authMiddleware([]), getOrdersByStatus); // Get orders by status

module.exports = router;
