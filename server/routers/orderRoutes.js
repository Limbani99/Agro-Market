const express = require("express");
const router = express.Router();

// Routes go here
const {   getOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getOrdersByStatus } = require('../controllers/orderController');

router.get('/', getOrders);
router.post('/add', createOrder);
router.put('/update/:id', updateOrderStatus);
router.delete('/delete/:id', deleteOrder);
router.get('/id/:id', getOrderById);
router.get('/status/:status', getOrdersByStatus);
module.exports = router;
