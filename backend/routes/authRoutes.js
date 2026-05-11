const router = require("express").Router();
const {
  signup,
  login,
  adminLogin,
  googleLogin
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin);

// ✅ ADD THIS FOR ADMIN LOGIN
router.post("/admin/login", adminLogin);

module.exports = router;
