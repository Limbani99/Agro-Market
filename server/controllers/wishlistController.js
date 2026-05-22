// wishlistController.js

const Wishlist = require('../models/Wishlist');

// Get all wishlist items for a user
const getWishlistItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const wishlistItems = await Wishlist.find({ user: userId }).populate('product');
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist items', error });
    }
};

// Add a product to the wishlist
const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const existingItem = await Wishlist.findOne({ user: userId, product: productId });
        if (existingItem) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }
        const newWishlistItem = new Wishlist({ user: userId, product: productId });
        const savedItem =       await newWishlistItem.save();   
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error });
    }
};

// Remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const deletedItem = await Wishlist.findOneAndDelete({ user: userId, product: productId });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist', error });
    }
};

module.exports = {
    getWishlistItems,
    addToWishlist,
    removeFromWishlist
};  