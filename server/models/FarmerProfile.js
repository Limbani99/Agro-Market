// FarmerProfile.js
const mongoose = require('mongoose');

const FarmerProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    profileImage: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('FarmerProfile', FarmerProfileSchema);