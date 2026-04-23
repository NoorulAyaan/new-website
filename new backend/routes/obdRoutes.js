const express = require("express");
const router = express.Router();
const { getObdCode } = require("../controllers/obdController");

// 🔍 OBD LOOKUP
// This will handle: GET /api/obd/P0101?vehicle=Toyota
router.get("/:code", getObdCode);

module.exports = router;