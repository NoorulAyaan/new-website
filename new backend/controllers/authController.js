const pool = require("../db");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const transporter = require("../utils/mailer");

// ✅ SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, "customer"]
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

// ✅ LOGIN
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await pool.query(
      "SELECT id, name, email, password, role, image, created_at FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
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
        image: user.image,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [hashedPassword, email]
    );

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const userResult = await pool.query(
      "SELECT image FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingUser = userResult.rows[0];
    let image = existingUser.image;

    if (req.file) {
      const newImagePath = `/uploads/users/${req.file.filename}`;

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

      image = newImagePath;
    }

    const result = await pool.query(
      `UPDATE users
       SET name = $1, image = $2
       WHERE email = $3
       RETURNING id, name, email, role, image`,
      [name, image, email]
    );

    return res.json({
      message: "Profile updated",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ FORGOT PASSWORD - SEND 6 DIGIT CODE
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userResult = await pool.query(
      "SELECT id, email FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No account found with this email" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query(
      `UPDATE users
       SET reset_code = $1, reset_code_expiry = NOW() + INTERVAL '10 minutes'
       WHERE email = $2`,
      [resetCode, email]
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Your 6-digit verification code is:</p>
          <h1 style="letter-spacing: 4px;">${resetCode}</h1>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    return res.json({ message: "Verification code sent to your email" });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    return res.status(500).json({ message: "Failed to send reset code" });
  }
};

// ✅ VERIFY RESET CODE
const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "Email and code are required" });
    }

    const result = await pool.query(
      `SELECT id FROM users
       WHERE email = $1
         AND reset_code = $2
         AND reset_code_expiry > NOW()`,
      [email, code]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    return res.json({ message: "Code verified successfully" });
  } catch (err) {
    console.error("VERIFY CODE ERROR:", err);
    return res.status(500).json({ message: "Failed to verify code" });
  }
};

// ✅ RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, code, and new password are required" });
    }

    const userResult = await pool.query(
      `SELECT id FROM users
       WHERE email = $1
         AND reset_code = $2
         AND reset_code_expiry > NOW()`,
      [email, code]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users
       SET password = $1,
           reset_code = NULL,
           reset_code_expiry = NULL
       WHERE email = $2`,
      [hashedPassword, email]
    );

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    return res.status(500).json({ message: "Failed to reset password" });
  }
};

// 🔥 SIGNUP REQUEST (SEND OTP)
const signupRequest = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check if already exists
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    // remove old pending signup
    await pool.query(
      "DELETE FROM pending_signups WHERE email = $1",
      [email]
    );

    // store pending signup
    await pool.query(
      `INSERT INTO pending_signups (name, email, password, verification_code, code_expiry)
       VALUES ($1,$2,$3,$4,$5)`,
      [name, email, password, code, expiry]
    );

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Signup Verification Code",
      html: `
        <h2>Verify your account</h2>
        <p>Your 6-digit code:</p>
        <h1>${code}</h1>
        <p>Expires in 10 minutes</p>
      `,
    });

    res.json({ message: "Verification code sent" });

  } catch (err) {
    console.error("SIGNUP REQUEST ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 VERIFY SIGNUP CODE
const signupVerify = async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await pool.query(
      "SELECT * FROM pending_signups WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "No signup request found" });
    }

    if (user.verification_code !== code) {
      return res.status(400).json({ message: "Invalid code" });
    }

    if (new Date() > user.code_expiry) {
      return res.status(400).json({ message: "Code expired" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // insert into real users table
    await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1,$2,$3,$4)`,
      [user.name, user.email, hashedPassword, "customer"]
    );

    // delete pending signup
    await pool.query(
      "DELETE FROM pending_signups WHERE email = $1",
      [email]
    );

    res.json({ message: "Signup successful" });

  } catch (err) {
    console.error("SIGNUP VERIFY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔁 RESEND OTP (SIGNUP + RESET)
const resendCode = async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email || !type) {
      return res.status(400).json({ message: "Email and type are required" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    if (type === "reset") {
      // 🔁 update users table
      const result = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      await pool.query(
        `UPDATE users 
         SET reset_code = $1, reset_code_expiry = NOW() + INTERVAL '10 minutes'
         WHERE email = $2`,
        [code, email]
      );
    }

    if (type === "signup") {
      // 🔁 update pending_signups table
      const result = await pool.query(
        "SELECT id FROM pending_signups WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Signup request not found" });
      }

      await pool.query(
        `UPDATE pending_signups 
         SET verification_code = $1, code_expiry = NOW() + INTERVAL '10 minutes'
         WHERE email = $2`,
        [code, email]
      );
    }

    // 📧 send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code",
      html: `
        <h2>Your OTP Code</h2>
        <h1 style="letter-spacing:4px;">${code}</h1>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    return res.json({ message: "OTP resent successfully" });

  } catch (err) {
    console.error("RESEND OTP ERROR:", err);
    return res.status(500).json({ message: "Failed to resend OTP" });
  }
};

module.exports = {
  signup,
  signupRequest,
  signupVerify,
  login,
  changePassword,
  updateProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  resendCode, // ✅ ADD THIS
};