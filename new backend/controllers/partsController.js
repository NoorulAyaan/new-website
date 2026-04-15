const pool = require("../db");
const fs = require("fs");
const path = require("path");


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


// ➕ ADD NEW PART
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

    if (!brand_id || !vehicle_name || !name || !year) {
      return res.status(400).json({
        message: "brand_id, vehicle_name, name, and year are required",
      });
    }

    // 🔥 FIND OR CREATE VEHICLE
    const vehicleCheck = await pool.query(
      "SELECT id FROM vehicles WHERE name = $1 AND brand_id = $2",
      [vehicle_name, brand_id]
    );

    let vehicleId;

    if (vehicleCheck.rows.length === 0) {
      const newVehicle = await pool.query(
        "INSERT INTO vehicles (brand_id, name) VALUES ($1, $2) RETURNING id",
        [brand_id, vehicle_name]
      );

      vehicleId = newVehicle.rows[0].id;
    } else {
      vehicleId = vehicleCheck.rows[0].id;
    }

    // 🔥 IMAGE
    const image = req.file
      ? `/uploads/parts/${req.file.filename}`
      : null;

    // 🔥 INSERT PART
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


// 🔍 GET SINGLE PART
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


// ✏️ UPDATE PART
const updatePart = async (req, res) => {
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

    // 🔥 GET EXISTING PART
    const existingPart = await pool.query(
      "SELECT * FROM parts WHERE id = $1",
      [req.params.id]
    );

    if (existingPart.rows.length === 0) {
      return res.status(404).json({ message: "Part not found" });
    }

    let vehicleId = existingPart.rows[0].vehicle_id;

    // 🔥 ONLY UPDATE VEHICLE IF PROVIDED
    if (brand_id && vehicle_name) {
      const vehicleCheck = await pool.query(
        "SELECT id FROM vehicles WHERE name = $1 AND brand_id = $2",
        [vehicle_name, brand_id]
      );

      if (vehicleCheck.rows.length === 0) {
        const newVehicle = await pool.query(
          "INSERT INTO vehicles (brand_id, name) VALUES ($1, $2) RETURNING id",
          [brand_id, vehicle_name]
        );
        vehicleId = newVehicle.rows[0].id;
      } else {
        vehicleId = vehicleCheck.rows[0].id;
      }
    }

    // 🔥 IMAGE
    let image = existingPart.rows[0].image;

    if (req.file) {
      image = `/uploads/parts/${req.file.filename}`;
    }

    // 🔥 UPDATE
    const result = await pool.query(
      `UPDATE parts SET
        vehicle_id = $1,
        part_name = $2,
        year = $3,
        engine_details = $4,
        price = $5,
        stock = $6,
        part_number = $7,
        image = $8
      WHERE id = $9
      RETURNING *`,
      [
        vehicleId,
        name || existingPart.rows[0].part_name,
        year || existingPart.rows[0].year,
        engine_details || existingPart.rows[0].engine_details,
        price || existingPart.rows[0].price,
        stock || existingPart.rows[0].stock,
        part_number || existingPart.rows[0].part_number,
        image,
        req.params.id,
      ]
    );

    res.json({
      message: "Part updated successfully",
      part: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// 🗑️ DELETE PART + IMAGE
const deletePart = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 STEP 1: GET IMAGE PATH
    const part = await pool.query(
      "SELECT image FROM parts WHERE id = $1",
      [id]
    );

    if (part.rows.length === 0) {
      return res.status(404).json({ message: "Part not found" });
    }

    const imagePath = part.rows[0].image;

    // 🔥 STEP 2: DELETE IMAGE FILE
    if (imagePath) {
      const fullPath = path.join(__dirname, "..", imagePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // 🔥 STEP 3: DELETE DB RECORD
    await pool.query("DELETE FROM parts WHERE id = $1", [id]);

    res.json({ message: "Part and image deleted successfully" });

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
  getPartById,
  updatePart,
  deletePart,
};