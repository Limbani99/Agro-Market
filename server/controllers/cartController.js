// cartController.js
const Cart = require('../models/Cart');

const getCart = async (req, res) => {
    try {
        const { id } = req.user; // Assuming user ID is available in req.user
        const cart = await Cart.findOne({ user: id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};
const addToCart = async (req, res) => {
    try {
        const { id } = req.user; // Assuming user ID is available in req.user
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: id });
        if (!cart) {
            cart = new Cart({ user: id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};
const addquantity = async (req, res) => {
    try {
        const { id } = req.user; // Assuming user ID is available in req.user
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
};
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.user; // Assuming user ID is available in req.user
        const { productId } = req.body;

        let cart = await Cart.findOne({ user: id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error });
    }
}

module.exports = { getCart, addToCart, addquantity, removeFromCart };    
