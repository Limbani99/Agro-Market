// farmerController.js
const Farmer = require('../models/FarmerProfile');

// Get all farmers
const getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmers', error });
    }
};

// Get a single farmer by ID
const getFarmerById = async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await Farmer.findById(id);
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        res.status(200).json(farmer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching farmer', error });
    }
};

// Create a new farmer
const createFarmer = async (req, res) => {
    try {
        const { name, location, contactInfo, description } = req.body;
        if (!name || !location || !contactInfo) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newFarmer = new Farmer({ name, location, contactInfo, description });
        const savedFarmer = await newFarmer.save();
        res.status(201).json(savedFarmer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating farmer', error });
    }

};

// Update an existing farmer
const updateFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, contactInfo, description } = req.body;
        const updatedFarmer = await Farmer.findByIdAndUpdate(
            id,
            { name, location, contactInfo, description },
            { new: true }
        );
        if (!updatedFarmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        res.status(200).json(updatedFarmer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating farmer', error });
    }
};

const deleteFarmer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFarmer = await Farmer.findByIdAndDelete(id);
        if (!deletedFarmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        res.status(200).json({ message: 'Farmer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting farmer', error });
    }
};

const dashboard = async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await Farmer.findById(id).populate('products');
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        res.status(200).json({
            name: farmer.name,
            location: farmer.location,
            contactInfo: farmer.contactInfo,
            description: farmer.description,
            products: farmer.products,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
}
const farmerProfileimg = async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await Farmer.findById(id);
        if (!farmer) {
            return res.status(404).json({ message: 'Farmer not found' });
        }
        farmer.profileImage = req.file.path; // Assuming you're using multer for file uploads
        await farmer.save();
        res.status(200).json({ message: 'Profile image updated successfully', profileImage: farmer.profileImage });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile image', error });
    }
};



module.exports = {
    getAllFarmers,
    getFarmerById,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    updateFarmer,
    dashboard,
};