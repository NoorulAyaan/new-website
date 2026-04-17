const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Customer submits order + receipt
router.post("/", upload.single("receipt"), createOrder);

// Admin fetch all orders
router.get("/", getAllOrders);

// ✅ Get approved orders for a specific user
router.get("/user/:user_id", getUserOrders);

// Admin approve/reject
router.put("/:id", updateOrderStatus);

module.exports = router;