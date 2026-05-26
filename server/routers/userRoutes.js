const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const upload = require('../middleware/upload');
const { userlogin, userregister, updateUserProfile, getFarmerDetails, getAllFarmers, changePassword } = require("../controllers/authController");

router.post("/register", userregister);
router.post("/login", userlogin);
router.put("/profile", authMiddleware([]), upload.single('avatar'), updateUserProfile); // Securely update user/farm profiles with upload
router.put("/change-password", authMiddleware([]), changePassword); // Securely change password
router.get("/farmers", getAllFarmers); // Public all farmers catalog path
router.get("/farmer/:id", getFarmerDetails); // Public farmer profile details lookup path

module.exports = router;