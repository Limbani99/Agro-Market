// cartController.js
const Cart = require('../models/Cart');

// GET /api/cart — fetch cart for logged-in user, populate product details
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.product',
            model: 'Product',
            populate: { path: 'sellerId', model: 'User', select: 'name farmName' }
        });

        if (!cart) return res.status(200).json({ items: [] });
        res.status(200).json(cart);
    } catch (error) {
        console.error('getCart error:', error);
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// POST /api/cart/add — add item or increment quantity
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        if (!productId) return res.status(400).json({ message: 'productId is required' });

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const idx = cart.items.findIndex(i => i.product.toString() === productId);
        if (idx >= 0) {
            cart.items[idx].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        // Re-populate and return
        const populated = await Cart.findById(cart._id).populate({
            path: 'items.product',
            model: 'Product',
            populate: { path: 'sellerId', model: 'User', select: 'name farmName' }
        });
        res.status(200).json(populated);
    } catch (error) {
        console.error('addToCart error:', error);
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};

// PUT /api/cart/update — set exact quantity for an item
const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'productId and quantity are required' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const idx = cart.items.findIndex(i => i.product.toString() === productId);
        if (idx < 0) return res.status(404).json({ message: 'Item not in cart' });

        if (quantity <= 0) {
            cart.items.splice(idx, 1);
        } else {
            cart.items[idx].quantity = quantity;
        }

        await cart.save();

        const populated = await Cart.findById(cart._id).populate({
            path: 'items.product',
            model: 'Product',
            populate: { path: 'sellerId', model: 'User', select: 'name farmName' }
        });
        res.status(200).json(populated);
    } catch (error) {
        console.error('updateCartQuantity error:', error);
        res.status(500).json({ message: 'Error updating cart', error });
    }
};

// DELETE /api/cart/remove/:productId — remove one item
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(i => i.product.toString() !== productId);
        await cart.save();

        const populated = await Cart.findById(cart._id).populate({
            path: 'items.product',
            model: 'Product',
            populate: { path: 'sellerId', model: 'User', select: 'name farmName' }
        });
        res.status(200).json(populated);
    } catch (error) {
        console.error('removeFromCart error:', error);
        res.status(500).json({ message: 'Error removing from cart', error });
    }
};

// DELETE /api/cart/clear — clear entire cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await Cart.findOneAndUpdate({ user: userId }, { items: [] }, { upsert: true });
        res.status(200).json({ message: 'Cart cleared', items: [] });
    } catch (error) {
        console.error('clearCart error:', error);
        res.status(500).json({ message: 'Error clearing cart', error });
    }
};

module.exports = { getCart, addToCart, updateCartQuantity, removeFromCart, clearCart };
