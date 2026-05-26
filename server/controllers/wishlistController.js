// wishlistController.js
const Wishlist = require('../models/Wishlist');

// GET /api/wishlist — Fetch all populated wishlist items for the logged-in user
const getWishlistItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlistItems = await Wishlist.find({ user: userId })
            .populate({
                path: 'product',
                populate: { path: 'sellerId', select: 'name email farmName' }
            })
            .sort({ createdAt: -1 });
        res.status(200).json(wishlistItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist items', error: error.message });
    }
};

// POST /api/wishlist/add — Save a product to the wishlist
const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const existingItem = await Wishlist.findOne({ user: userId, product: productId });
        if (existingItem) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        const newWishlistItem = new Wishlist({ user: userId, product: productId });
        const savedItem = await newWishlistItem.save();

        const populatedItem = await Wishlist.findById(savedItem._id).populate('product');
        res.status(201).json(populatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
    }
};

// DELETE /api/wishlist/remove/:id — Delete a product from the wishlist by product ID
const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id; // From route parameter /remove/:id

        const deletedItem = await Wishlist.findOneAndDelete({ user: userId, product: productId });
        if (!deletedItem) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }

        res.status(200).json({ message: 'Product removed from wishlist successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
    }
};

module.exports = {
    getWishlistItems,
    addToWishlist,
    removeFromWishlist
};