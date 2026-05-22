const express = require("express");
const router = express.Router();

// Routes go here
const { getAllFarmers,
    getFarmerById,
    createFarmer,
    deleteFarmer,
    updateFarmer,
    dashboard, } = require('../controllers/farmerController');

router.get('/', getAllFarmers);
router.get('/id/:id', getFarmerById);
router.post('/add', createFarmer);
router.put('/update/:id', updateFarmer);
router.delete('/delete/:id', deleteFarmer);
router.get('/dashboard', dashboard);

module.exports = router;
