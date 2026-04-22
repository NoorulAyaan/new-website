const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

let obdCodes = new Map();

const loadCodes = () => {
  const filePath = path.join(__dirname, "../data/obd-trouble-codes.csv");

  const data = fs.readFileSync(filePath, "utf-8");

  const lines = data.split("\n");

  lines.shift(); // remove header

  lines.forEach((line) => {
    if (!line.trim()) return;

    // ✅ Proper CSV split (handles quotes + commas)
    const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

    if (!parts || parts.length < 2) return;

    const code = parts[0].replace(/"/g, "").trim().toUpperCase();
    const title = parts.slice(1).join(",").replace(/"/g, "").trim();

    if (code && title) {
      obdCodes.set(code, { code, title });
    }
  });

  console.log("✅ Loaded codes:", obdCodes.size);
};

loadCodes();

router.get("/:code", (req, res) => {
  const code = req.params.code.trim().toUpperCase();

  const found = obdCodes.get(code);

  if (!found) {
    return res.status(404).json({ message: "Code not found" });
  }

  res.json(found);
});

module.exports = router;