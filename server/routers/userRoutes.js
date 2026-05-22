const express = require("express");
const router = express.Router();

const { userlogin, userregister } = require("../controllers/authController");
router.post("/register", userregister);
router.post("/login", userlogin);

module.exports = router;