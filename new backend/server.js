// 🔥 IMPORTS
const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ IMPORTANT
require("dotenv").config();

// 🔥 ROUTES
const authRoutes = require("./routes/authRoutes");

// 🔥 INIT APP
const app = express();

// ✅ CORS CONFIG
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ JSON PARSER
app.use(express.json());

// 🔥 SERVE STATIC UPLOADS (BEST PRACTICE)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads")) // ✅ FIXED VERSION
);

// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ API ROUTES
app.use("/api/auth", authRoutes);

// ✅ PORT SETUP
const PORT = process.env.PORT || 5001;

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});