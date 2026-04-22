const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const partsRoutes = require("./routes/partsRoutes");
const brandRoutes = require("./routes/brandRoutes");
const orderRoutes = require("./routes/orderRoutes");
const obdRoutes = require("./routes/odb");

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// JSON
app.use(express.json());

// STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROOT
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/obd-codes", obdRoutes);

// PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});