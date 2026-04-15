const pool = require("../db");


// ✅ GET PARTS BY VEHICLE (OPTIONAL - OLD SUPPORT)
const getPartsByVehicle = async (req, res) => {
  try {
    const { vehicle_id } = req.query;

    if (!vehicle_id) {
      return res.status(400).json({ message: "vehicle_id is required" });
    }

    const result = await pool.query(
      "SELECT * FROM parts WHERE vehicle_id = $1 ORDER BY created_at DESC",
      [vehicle_id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("Error fetching parts:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// 🔍 SEARCH PARTS (MAIN SEARCH API)
const searchParts = async (req, res) => {
  try {
    const { brand_id, vehicle_name, part_name, year } = req.query;

    let query = `
      SELECT 
        p.*, 
        v.name AS vehicle_name, 
        b.name AS brand_name
      FROM parts p
      JOIN vehicles v ON p.vehicle_id = v.id
      JOIN brands b ON v.brand_id = b.id
      WHERE 1=1
    `;

    const values = [];
    let index = 1;

    if (brand_id) {
      query += ` AND b.id = $${index++}`;
      values.push(brand_id);
    }

    if (vehicle_name) {
      query += ` AND LOWER(v.name) LIKE LOWER($${index++})`;
      values.push(`%${vehicle_name}%`);
    }

    if (part_name) {
      query += ` AND LOWER(p.part_name) LIKE LOWER($${index++})`;
      values.push(`%${part_name}%`);
    }

    if (year) {
      query += ` AND p.year = $${index++}`;
      values.push(year);
    }

    query += " ORDER BY p.created_at DESC";

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (err) {
    console.error("Error searching parts:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ➕ ADD NEW PART (DYNAMIC VEHICLE CREATION)
const addPart = async (req, res) => {
  try {
    const {
      brand_id,
      vehicle_name,
      name,
      year,
      engine_details,
      price,
      stock,
      part_number,
    } = req.body;

    // ❗ VALIDATION
    if (!brand_id || !vehicle_name || !name || !year) {
      return res.status(400).json({
        message: "brand_id, vehicle_name, part name, and year are required",
      });
    }

    // 🔥 Step 1: Check if vehicle exists under this brand
    const vehicleCheck = await pool.query(
      "SELECT id FROM vehicles WHERE name = $1 AND brand_id = $2",
      [vehicle_name, brand_id]
    );

    let vehicleId;

    if (vehicleCheck.rows.length === 0) {
      // 🔥 Step 2: Create vehicle if not exists
      const newVehicle = await pool.query(
        "INSERT INTO vehicles (brand_id, name) VALUES ($1, $2) RETURNING id",
        [brand_id, vehicle_name]
      );

      vehicleId = newVehicle.rows[0].id;
    } else {
      vehicleId = vehicleCheck.rows[0].id;
    }

    // 🔥 Step 3: Handle image
    const image = req.file
      ? `/uploads/parts/${req.file.filename}`
      : null;

    // 🔥 Step 4: Insert part
    const result = await pool.query(
      `INSERT INTO parts 
      (vehicle_id, part_name, year, engine_details, price, stock, part_number, image)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        vehicleId,
        name,
        year,
        engine_details || null,
        price || 0,
        stock || 0,
        part_number || null,
        image,
      ]
    );

    res.status(201).json({
      message: "Part added successfully",
      part: result.rows[0],
    });

  } catch (err) {
    console.error("Error adding part:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// 🔍 GET SINGLE PART BY ID (NEW)
const getPartById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM parts WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error fetching part:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✏️ UPDATE PART (NEW)
const updatePart = async (req, res) => {
  try {
    const {
      name,
      year,
      engine_details,
      price,
      stock,
      part_number
    } = req.body;

    const result = await pool.query(
      `UPDATE parts SET
        part_name = $1,
        year = $2,
        engine_details = $3,
        price = $4,
        stock = $5,
        part_number = $6
      WHERE id = $7
      RETURNING *`,
      [
        name,
        year,
        engine_details,
        price,
        stock,
        part_number,
        req.params.id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json({
      message: "Part updated successfully",
      part: result.rows[0],
    });

  } catch (err) {
    console.error("Error updating part:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// 🗑️ DELETE PART (NEW)
const deletePart = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM parts WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json({ message: "Part deleted successfully" });

  } catch (err) {
    console.error("Error deleting part:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ EXPORTS
module.exports = {
  getPartsByVehicle,
  searchParts,
  addPart,

  // 🔥 NEW EXPORTS
  getPartById,
  updatePart,
  deletePart
};