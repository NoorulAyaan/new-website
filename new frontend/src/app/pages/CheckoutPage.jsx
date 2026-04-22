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

    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill required customer details");
      return;
    }

    try {
      setLoading(true);

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

      const formData = new FormData();
      formData.append("receipt", file);
      formData.append("items", JSON.stringify(cart));
      formData.append("total", total);
      formData.append("user_id", userId);

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
    <div className="min-h-screen bg-[#eef3fb] py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-[#0f172a] mb-6">
          Checkout
        </h2>

        {/* 💳 PAYMENT DETAILS */}
        <div className="bg-gradient-to-r from-[#081733] to-[#0f2a5c] text-white p-6 rounded-[20px] shadow-[0_15px_40px_rgba(2,6,23,0.25)] mb-6">
          <p><strong>Easypaisa:</strong> 03423432443</p>
          <p>Account Title: NOOR UL AMEEN</p>
          <p><strong>Soneri Bank:</strong> 002520009149059</p>
          <p>Account Title: NOOR UL AYAN</p>
          <p className="text-[#38bdf8] mt-3 font-semibold">
            Send exact amount: RS.{total}
          </p>
        </div>

        {/* 🧾 CUSTOMER DETAILS */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] mb-6 space-y-4">
          <h3 className="font-semibold text-lg text-[#0f172a]">
            Customer Details
          </h3>

          <input
            type="text"
            placeholder="Full Name *"
            className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff] outline-none"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number *"
            className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Address *"
            className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
            value={customer.address}
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />

          <textarea
            placeholder="Additional Notes (optional)"
            className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
            value={customer.notes}
            onChange={(e) =>
              setCustomer({ ...customer, notes: e.target.value })
            }
          />
        </div>

        {/* 📤 FILE UPLOAD */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm text-slate-600"
          />
        </div>

        {/* 🚀 SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-full text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:opacity-90 shadow-[0_12px_30px_rgba(37,117,255,0.3)]"
          }`}
        >
          {loading ? "Submitting..." : "Submit Receipt"}
        </button>

      </div>
    </div>
  );
}