import { useEffect, useState } from "react";

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5001/api/orders");

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔄 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Update failed");
        return;
      }

      fetchOrders();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Something went wrong while updating");
    }
  };

  // ✅ SAFE PARSE ITEMS
  const parseItems = (items) => {
    if (!items) return [];

    if (Array.isArray(items)) return items;

    if (typeof items === "string") {
      try {
        return JSON.parse(items);
      } catch {
        return [];
      }
    }

    return [];
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] p-8">

      <h2 className="text-3xl font-bold text-[#0f172a] mb-8">
        Admin Orders
      </h2>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-500">No orders found</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => {
            const items = parseItems(order.items);

            const receiptUrl = order.receipt
              ? `http://localhost:5001${order.receipt}`
              : null;

            return (
              <div
                key={order.id}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-[22px] shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-[#d9e5f6]"
              >

                {/* 🔹 HEADER */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold text-lg text-[#0f172a]">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* 🔹 CUSTOMER DETAILS (NEW) */}
                <div className="mb-4 bg-[#f5f9ff] p-4 rounded-lg border border-[#e2ecfb]">
                  <p className="font-semibold mb-2 text-[#0f172a]">
                    Customer Details:
                  </p>

                  <div className="text-sm text-slate-600 space-y-1">
                    <p><strong>Name:</strong> {order.name || "N/A"}</p>
                    <p><strong>Email:</strong> {order.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {order.phone || "N/A"}</p>
                    <p><strong>Address:</strong> {order.address || "N/A"}</p>

                    {order.notes && (
                      <p><strong>Notes:</strong> {order.notes}</p>
                    )}
                  </div>
                </div>

                {/* 🔹 ITEMS */}
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-[#0f172a]">Items:</p>

                  {items.length === 0 ? (
                    <p className="text-slate-500 text-sm">
                      No items found
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm border-b border-[#e2e8f0] pb-1"
                        >
                          <div className="text-slate-700">
                            <div className="font-medium">
                              {item.partName} (x{item.quantity})
                            </div>

                            <div className="text-xs text-gray-500 mt-1 space-y-1">
                              <div>
                                <strong>Vehicle:</strong> {item.brand_name} {item.vehicle_name}
                              </div>

                              <div>
                                <strong>Year:</strong> {item.year}
                              </div>

                              <div>
                                <strong>Part #:</strong> {item.partNumber || "N/A"}
                              </div>
                            </div>
                          </div>
                          <span className="font-medium text-[#0f172a]">
                            ${item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 🔹 TOTAL */}
                <p className="font-semibold mb-4 text-lg text-[#0f172a]">
                  Total: ${order.total}
                </p>

                {/* 🔹 RECEIPT */}
                {receiptUrl && (
                  <div className="mb-4">
                    <p className="font-semibold mb-2 text-[#0f172a]">
                      Payment Receipt:
                    </p>

                    {receiptUrl.endsWith(".pdf") ? (
                      <a
                        href={receiptUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2678ff] underline"
                      >
                        View PDF
                      </a>
                    ) : (
                      <img
                        src={receiptUrl}
                        alt="receipt"
                        className="w-80 rounded-lg border border-[#d9e5f6]"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                  </div>
                )}

                {/* 🔹 ACTIONS */}
                {order.status === "pending" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        updateStatus(order.id, "approved")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(order.id, "rejected")
                      }
                      className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}