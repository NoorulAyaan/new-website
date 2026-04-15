// 🔥 IMPORTS
const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ IMPORTANT
const vehicleRoutes = require("./routes/vehicleRoutes");
const partsRoutes = require("./routes/partsRoutes");
const brandRoutes = require("./routes/brandRoutes");
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

// VEHICLE API
app.use("/api/vehicles", vehicleRoutes);

// PARTS API
app.use("/api/parts", partsRoutes);

// ✅ PORT SETUP
const PORT = process.env.PORT || 5001;

// BRANDS API
app.use("/api/brands", brandRoutes);

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});