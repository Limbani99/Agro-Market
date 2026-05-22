const express = require("express");
const router = express.Router();

// Routes go here
const { getFarmers, addFarmer, updateFarmer, deleteFarmer } = require('../controllers/farmerController');

router.get('/', getFarmers);
router.post('/add', addFarmer);
router.put('/update/:id', updateFarmer);
router.delete('/delete/:id', deleteFarmer);
module.exports = router;
