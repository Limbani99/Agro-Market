// orderController.js
const Order = require('../models/Order');

// Get all orders for a user
const getOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;
        const newOrder = new Order({ user: userId, items, totalPrice });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};
const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const orders = await Order.find({ status }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders by status', error });
    }
};

module.exports = {
    getOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getOrdersByStatus
};