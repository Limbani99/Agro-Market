const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');

// Routes go here
const { getallProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.get('/', getallProducts);
router.get('/id/:id', getProductById);
router.post('/add', authMiddleware(['farmer']), upload.array('images', 4), createProduct);
router.put('/update/:id', authMiddleware(['farmer']), upload.array('images', 4), updateProduct);
router.delete('/delete/:id', authMiddleware(['farmer']), deleteProduct);

module.exports = router;
