// authController.js
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userlogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5D" });
        
        const userObj = user.toObject();
        delete userObj.password;

        res.json({ success: true, token, user: userObj });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const userregister = async (req, res) => {
    const { name, email, password, role, address, phone } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role, address, phone });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, phone, address, farmName, bio, avatar, location } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (farmName !== undefined) user.farmName = farmName;
        if (bio !== undefined) user.bio = bio;
        if (location !== undefined) user.location = location;

        if (req.file) {
            const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
            user.avatar = `${baseUrl}/uploads/${req.file.filename}`;
        } else if (avatar !== undefined) {
            user.avatar = avatar;
        }

        await user.save();

        const userObj = user.toObject();
        delete userObj.password;

        res.json({ success: true, user: userObj });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getFarmerDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const farmer = await User.findById(id).select('name email farmName bio avatar location role createdAt');
        if (!farmer || farmer.role !== 'farmer') {
            return res.status(404).json({ message: "Farmer not found" });
        }
        res.json({ success: true, farmer });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllFarmers = async (req, res) => {
    try {
        const farmers = await User.find({ role: 'farmer' })
            .select('name email farmName bio avatar location role createdAt');
        res.json({ success: true, farmers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { userlogin, userregister, updateUserProfile, getFarmerDetails, getAllFarmers, changePassword };