const express = require("express");
const router = express.Router();
// Routes go here
const { getCart, addquantity,removeFromCart } = require('../controllers/cartController');

router.get('/', getCart);
router.post('/add', addquantity);
router.delete('/remove', removeFromCart);

module.exports = router;
