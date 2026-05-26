// orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// Get all orders for the logged-in user (Buyer)
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'products.product',
                populate: { path: 'sellerId', select: 'name email farmName' }
            })
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Get all orders containing products owned by the logged-in Seller (Farmer)
const getSellerOrders = async (req, res) => {
    try {
        const sellerId = req.user.id;
        
        // 1. Find all products of this seller
        const sellerProducts = await Product.find({ sellerId });
        const productIds = sellerProducts.map(p => p._id);

        // 2. Find orders containing any of these products
        const orders = await Order.find({
            'products.product': { $in: productIds }
        })
        .populate('user', 'name email address phone')
        .populate({
            path: 'products.product',
            populate: { path: 'sellerId', select: 'name email farmName' }
        })
        .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching seller orders', error: error.message });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { products, totalPrice, shippingAddress, phone, paymentMethod } = req.body;

        if (!products || !products.length) {
            return res.status(400).json({ message: 'Order must contain at least one product' });
        }

        if (!shippingAddress || !phone) {
            return res.status(400).json({ message: 'Shipping address and phone number are required' });
        }

        // 1. Create the order
        const newOrder = new Order({
            user: userId,
            products,
            totalPrice,
            shippingAddress,
            phone,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            status: 'Pending'
        });

        const savedOrder = await newOrder.save();

        // 2. Decrement stock for each product in the order
        for (const item of products) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: -item.quantity } },
                { new: true }
            );
        }

        // 3. Clear user's cart in the database
        await Cart.findOneAndDelete({ user: userId });

        // 4. Return populated order
        const populatedOrder = await Order.findById(savedOrder._id)
            .populate({
                path: 'products.product',
                populate: { path: 'sellerId', select: 'name email farmName' }
            });

        // 5. Create notifications for the products' sellers
        try {
            const User = require('../models/User');
            const Notification = require('../models/Notification');
            const buyer = await User.findById(userId);
            const buyerName = buyer ? buyer.name : 'A buyer';

            const sellerProductsMap = {};
            for (const item of populatedOrder.products) {
                const prod = item.product;
                if (prod && prod.sellerId) {
                    const sellerId = prod.sellerId._id.toString();
                    if (!sellerProductsMap[sellerId]) {
                        sellerProductsMap[sellerId] = [];
                    }
                    sellerProductsMap[sellerId].push(prod.name);
                }
            }

            for (const sellerId in sellerProductsMap) {
                const productListStr = sellerProductsMap[sellerId].join(', ');
                await Notification.create({
                    user: sellerId,
                    type: 'order',
                    title: 'New Pending Order',
                    message: `${buyerName} placed an order for: ${productListStr}.`
                });
            }
        } catch (notifErr) {
            console.error('Error creating seller notifications:', notifErr);
        }

        res.status(201).json(populatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Update order status (Seller or Admin action)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )
        .populate('user', 'name email address phone')
        .populate({
            path: 'products.product',
            populate: { path: 'sellerId', select: 'name email farmName' }
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create notification for the buyer
        try {
            const Notification = require('../models/Notification');
            const buyerId = updatedOrder.user._id || updatedOrder.user;
            const shortOrderId = updatedOrder._id.toString().slice(-6).toUpperCase();
            
            let title = 'Order Update';
            let message = `Your order #${shortOrderId} is now ${status}.`;
            if (status === 'Shipped') {
                title = 'Order Shipped';
                message = `Great news! Your order #${shortOrderId} has been shipped by the grower!`;
            } else if (status === 'Delivered') {
                title = 'Order Delivered';
                message = `Success! Your order #${shortOrderId} has been marked as delivered.`;
            } else if (status === 'Cancelled') {
                title = 'Order Cancelled';
                message = `Attention: Your order #${shortOrderId} was cancelled.`;
            }

            await Notification.create({
                user: buyerId,
                type: 'order',
                title,
                message
            });
        } catch (notifErr) {
            console.error('Error creating buyer order status notification:', notifErr);
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('user', 'name email address phone')
            .populate({
                path: 'products.product',
                populate: { path: 'sellerId', select: 'name email farmName' }
            });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

// Get orders by status
const getOrdersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const orders = await Order.find({ status })
            .populate({
                path: 'products.product',
                populate: { path: 'sellerId', select: 'name email farmName' }
            });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders by status', error: error.message });
    }
};

module.exports = {
    getOrders,
    getSellerOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getOrdersByStatus
};