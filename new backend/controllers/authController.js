const pool = require("../db");
const fs = require("fs");
const path = require("path");

const signup = async (req, res) => {
    
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
      [name, email, password, "customer"]
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await pool.query(
      "SELECT id, name, email, password, role, image, created_at FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ message: "Invalid role for this user" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image, // 🔥 ADD THIS
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Check current password
    if (user.password !== currentPassword) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Update password
    await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [newPassword, email]
    );

    return res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // 🔥 STEP 1: Get existing user
    const userResult = await pool.query(
      "SELECT image FROM users WHERE email = $1",
      [email]
    );

    const existingUser = userResult.rows[0];

    let image = existingUser.image; // default = old image

    // 🔥 STEP 2: If new file uploaded
    if (req.file) {
      const newImagePath = `/uploads/users/${req.file.filename}`;

      // 🔥 STEP 3: Delete old image (if exists)
      if (existingUser.image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          existingUser.image.replace("/uploads/", "uploads/")
        );

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log("Old image delete failed:", err.message);
          } else {
            console.log("Old image deleted");
          }
        });
      }

      image = newImagePath; // use new image
    }

    // 🔥 STEP 4: Update DB
    const result = await pool.query(
      `UPDATE users 
       SET name = $1, image = $2
       WHERE email = $3
       RETURNING id, name, email, role, image`,
      [name, image, email]
    );

    res.json({
      message: "Profile updated",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signup,
  login,
  changePassword,
  updateProfile,
};