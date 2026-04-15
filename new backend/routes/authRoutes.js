const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload"); 

const {
  signup,
  login,
  changePassword,
  updateProfile 
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", changePassword);

router.post("/update-profile", upload.single("image"), updateProfile);

module.exports = router;