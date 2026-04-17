const db = require("../db");

// 🟢 CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    let {
      items,
      total,
      user_id,
      name,
      email,
      phone,
      address,
      notes,
    } = req.body;

    // 🔍 DEBUG (remove later if you want)
    console.log("REQ BODY:", req.body);

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // ✅ Parse items safely
    if (typeof items === "string") {
      items = JSON.parse(items);
    }

    const cleanItems = items.map((item) => ({
      id: item.id,
      partName: item.partName || item.name, // safe fallback
      price: item.price,
      quantity: item.quantity,
    }));

    // 🔥 CHECK DUPLICATE PURCHASE (APPROVED ONLY)
    const existingOrders = await db.query(
      "SELECT items FROM orders WHERE user_id = $1 AND status = 'approved'",
      [user_id]
    );

    for (const order of existingOrders.rows) {
      let purchasedItems = [];

      try {
        purchasedItems = JSON.parse(order.items || "[]");
      } catch {
        purchasedItems = [];
      }

      for (const purchased of purchasedItems) {
        const found = cleanItems.find(
          (item) => item.id === purchased.id
        );

        if (found) {
          return res.status(400).json({
            error: `You have already purchased "${found.partName}"`,
          });
        }
      }
    }

    // ✅ RECEIPT PATH
    const receipt = req.file
      ? `/uploads/receipts/${req.file.filename}`
      : null;

    // ✅ INSERT ORDER (UPDATED)
    const result = await db.query(
      `INSERT INTO orders 
       (items, total, receipt, status, user_id, name, email, phone, address, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING id`,
      [
        JSON.stringify(cleanItems),
        total,
        receipt,
        "pending",
        user_id,
        name || null,
        email || null,
        phone || null,
        address || null,
        notes || null,
      ]
    );

    res.json({
      message: "Order submitted",
      orderId: result.rows[0].id,
    });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔵 GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM orders ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🟣 GET USER APPROVED ORDERS
exports.getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.params;

    // ✅ FIX: removed status filter to show ALL orders (pending, approved, rejected)
    const result = await db.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC",
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("USER ORDERS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🔴 UPDATE STATUS (ADMIN)
exports.updateOrderStatus = async (req, res) => {
  const client = await db.connect();

  try {
    const { status } = req.body;
    const { id } = req.params;

    // ✅ VALIDATION
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    await client.query("BEGIN");

    const orderResult = await client.query(
      "SELECT * FROM orders WHERE id = $1",
      [id]
    );

    const order = orderResult.rows[0];

    if (!order) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Order not found" });
    }

    // ⚠️ Prevent double approval
    if (order.status === "approved") {
      await client.query("ROLLBACK");
      return res.json({ message: "Already approved" });
    }

    // ✅ Reduce stock safely
    if (status === "approved") {
      let items = [];

      try {
        items = JSON.parse(order.items || "[]");
      } catch {
        items = [];
      }

      for (const item of items) {
        await client.query(
          "UPDATE parts SET stock = stock - $1 WHERE id = $2",
          [item.quantity, item.id]
        );
      }
    }

    // ✅ Update order
    await client.query(
      "UPDATE orders SET status = $1 WHERE id = $2",
      [status, id]
    );

    await client.query("COMMIT");

    res.json({ message: "Order updated" });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("UPDATE ORDER ERROR:", err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};