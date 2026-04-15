const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getPartsByVehicle,
  searchParts,
  addPart,
} = require("../controllers/partsController");

// 🔍 SEARCH PARTS (MAIN)
router.get("/search", searchParts);

// (optional old)
router.get("/", getPartsByVehicle);

// ➕ ADD PART
router.post("/", upload.single("image"), addPart);

module.exports = router;