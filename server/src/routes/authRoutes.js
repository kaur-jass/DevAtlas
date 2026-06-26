const express = require("express");
const { register, login, googleLogin, } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const User = require("../models/User");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working",
  });
});


router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);

module.exports = router;