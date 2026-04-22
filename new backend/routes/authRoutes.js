const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  signup,
  signupRequest,
  signupVerify,
  login,
  changePassword,
  updateProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  resendCode   // ✅ ADD THIS
} = require("../controllers/authController");

// 🔐 AUTH
router.post("/signup", signup);
router.post("/signup-request", signupRequest);
router.post("/signup-verify", signupVerify);
router.post("/login", login);

// 🔁 PASSWORD
router.post("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.post("/resend-code", resendCode); 

// 👤 PROFILE
router.post("/update-profile", upload.single("image"), updateProfile);

module.exports = router;