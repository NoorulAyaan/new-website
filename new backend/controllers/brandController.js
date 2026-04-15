const pool = require("../db");

const getBrands = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM brands ORDER BY name ASC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching brands:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getBrands,
};