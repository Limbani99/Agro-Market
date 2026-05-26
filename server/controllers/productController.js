// productController.js

const Product = require('../models/Product');

// Get all products
const getallProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('sellerId', 'name farmName');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);
        }

        const sellerId = req.user ? req.user.id : req.body.sellerId;
        if (!sellerId) {
            return res.status(400).json({ message: 'Seller ID is required' });
        }

        const newProduct = new Product({
            sellerId,
            name,
            description,
            price: Number(price),
            category,
            stock: Number(stock),
            images
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        
        let finalImages = [];
        if (req.body.images) {
            let parsedImages = [];
            try {
                parsedImages = typeof req.body.images === 'string' ? JSON.parse(req.body.images) : req.body.images;
            } catch (e) {
                parsedImages = [req.body.images];
            }
            
            if (Array.isArray(parsedImages)) {
                let fileIdx = 0;
                finalImages = parsedImages.map(img => {
                    if (img === "NEW_FILE" || img === null || img === "null" || img === "") {
                        if (req.files && req.files[fileIdx]) {
                            const newUrl = `${baseUrl}/uploads/${req.files[fileIdx].filename}`;
                            fileIdx++;
                            return newUrl;
                        }
                    }
                    return img;
                }).filter(img => img !== "NEW_FILE" && img !== null && img !== "null" && img !== "");
            }
        } else if (req.files && req.files.length > 0) {
            finalImages = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);
        }
        
        updateData.images = finalImages;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

module.exports = {
    getallProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};