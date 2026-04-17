import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ NEW CUSTOMER FIELDS
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async () => {
    const userId = user?.id || user?._id;

    // 🔴 VALIDATIONS
    if (!userId) {
      alert("User not loaded properly. Please login again.");
      return;
    }

    if (!file) {
      alert("Please upload payment receipt");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // ✅ NEW VALIDATION
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill required customer details");
      return;
    }

    try {
      setLoading(true);

      // 🔥 STEP 1: SAFE FETCH APPROVED ORDERS
      let approvedOrders = [];

      try {
        const resOrders = await fetch(
          `http://localhost:5001/api/orders/user/${userId}`
        );

        if (resOrders.ok) {
          const text = await resOrders.text();

          if (text) {
            approvedOrders = JSON.parse(text);
          }
        }
      } catch (err) {
        console.warn("Skipping duplicate check (API issue)");
      }

      // 🔥 STEP 2: CHECK DUPLICATE ITEMS
      for (const order of approvedOrders) {
        let purchasedItems = [];

        try {
          purchasedItems = JSON.parse(order.items || "[]");
        } catch {
          purchasedItems = [];
        }

        for (const purchased of purchasedItems) {
          for (const cartItem of cart) {
            if (purchased.id === cartItem.id) {
              alert(
                `You already purchased "${cartItem.partName}". Cannot checkout again.`
              );
              setLoading(false);
              return;
            }
          }
        }
      }

      // 🔥 STEP 3: SEND ORDER (EXTENDED)
      const formData = new FormData();
      formData.append("receipt", file);
      formData.append("items", JSON.stringify(cart));
      formData.append("total", total);
      formData.append("user_id", userId);

      // ✅ NEW DATA
      formData.append("name", customer.name);
      formData.append("email", customer.email);
      formData.append("phone", customer.phone);
      formData.append("address", customer.address);
      formData.append("notes", customer.notes);

      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout failed");
        return;
      }

      setCart([]);

      alert("Order submitted! Waiting for admin approval.");

      navigate("/shop");

    } catch (err) {
      console.error("CHECKOUT ERROR:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* 💳 PAYMENT DETAILS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Easypaisa:</strong> 03423432443</p>
        <p>Account Title: NOOR UL AMEEN</p>
        <p><strong>Soneri Bank:</strong> 002520009149059</p>
        <p>Account Title: NOOR UL AYAN</p>
        <p className="text-red-500 mt-2">
          Send exact amount: RS.{total}
        </p>
      </div>

      {/* 🧾 CUSTOMER DETAILS */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <h3 className="font-semibold text-lg">Customer Details</h3>

        <input
          type="text"
          placeholder="Full Name *"
          className="w-full border p-2 rounded"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ ...customer, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone Number *"
          className="w-full border p-2 rounded"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Address *"
          className="w-full border p-2 rounded"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />

        <textarea
          placeholder="Additional Notes (optional)"
          className="w-full border p-2 rounded"
          value={customer.notes}
          onChange={(e) =>
            setCustomer({ ...customer, notes: e.target.value })
          }
        />
      </div>

      {/* 📤 FILE UPLOAD */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* 🚀 SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-600 hover:bg-orange-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit Receipt"}
      </button>
    </div>
  );
}