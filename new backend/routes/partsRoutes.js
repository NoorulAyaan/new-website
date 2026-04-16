const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getPartsByVehicle,
  searchParts,
  addPart,
  getPartById,
  updatePart,
  deletePart,
  getAllParts // ✅ 🔥 THIS WAS MISSING
} = require("../controllers/partsController");

// 🔍 SEARCH PARTS (MAIN)
router.get("/search", searchParts);

// 🔥 MAIN FIX (THIS SHOWS ALL PARTS)
router.get("/", getAllParts);

// OPTIONAL OLD
router.get("/by-vehicle", getPartsByVehicle);

// ➕ ADD PART
router.post("/", upload.single("image"), addPart);

// 🔥 NEW ROUTES
router.get("/:id", getPartById);
router.put("/:id", upload.single("image"), updatePart);
router.delete("/:id", deletePart);

module.exports = router;