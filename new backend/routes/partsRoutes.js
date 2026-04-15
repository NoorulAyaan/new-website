const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getPartsByVehicle,
  searchParts,
  addPart,

  // ✅ ADD THESE
  getPartById,
  updatePart,
  deletePart

} = require("../controllers/partsController");

// 🔍 SEARCH PARTS (MAIN)
router.get("/search", searchParts);

// (optional old)
router.get("/", getPartsByVehicle);

// ➕ ADD PART
router.post("/", upload.single("image"), addPart);

// 🔥 NEW ROUTES (IMPORTANT)
router.get("/:id", getPartById);
router.put("/:id", updatePart);
router.delete("/:id", deletePart);

module.exports = router;