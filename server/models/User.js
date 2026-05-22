const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["farmer", "buyer", "admin"],
        default: "buyer"
    },
    address: {
        type: String,

    },
    phone: {
        type: Number
    }
});
module.exports = mongoose.model("User", UserSchema);