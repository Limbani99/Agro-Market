const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');

// Routes go here
const { getallProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.get('/', getallProducts);
router.get('/id/:id', getProductById);
router.post('/add', upload.array('images', 4), createProduct);
router.put('/update/:id', upload.array('images', 4), updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
