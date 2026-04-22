import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Profile() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [preview, setPreview] = useState(
    user?.image ? `http://localhost:5001${user.image}` : ""
  );
  const [file, setFile] = useState(null);

  // 🔥 FIX: get tab from URL
  const getTabFromURL = () => {
    return window.location.hash.replace("#", "") || "profile";
  };

  const [activeTab, setActiveTab] = useState(getTabFromURL());

  // 🔥 FIX: listen to URL changes (refresh/back)
  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(getTabFromURL());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // 🔐 PASSWORD STATES
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔥 HANDLE IMAGE CHANGE
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ✅ SAVE PROFILE
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", user.email);

      if (file) {
        formData.append("image", file);
      }

      const res = await fetch(
        "http://localhost:5001/api/auth/update-profile",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Update failed");
      }

      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setUser(data.user);

      if (data.user.image) {
        setPreview(`http://localhost:5001${data.user.image}`);
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  // 🔐 PASSWORD UPDATE
  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const res = await fetch(
        "http://localhost:5001/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Failed to update password");
      }

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#eef3fb] min-h-screen">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#081733] to-[#0f2a5c] text-white p-10 shadow-[0_20px_50px_rgba(2,6,23,0.3)]">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={
                preview
                  ? preview
                  : "https://via.placeholder.com/100"
              }
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <label className="absolute bottom-0 right-0 bg-white text-[#0f172a] p-1 rounded-full cursor-pointer text-xs shadow">
              ✎
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>

          {/* USER INFO */}
          <div>
            <h2 className="text-xl text-blue-100">Welcome,</h2>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-sm text-blue-200">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#d9e5f6]">
        <div className="max-w-6xl mx-auto flex space-x-6 px-6">
          {["profile", "orders", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                window.location.hash = tab; // 🔥 FIX
              }}
              className={`py-4 border-b-2 ${
                activeTab === tab
                  ? "border-[#2678ff] text-[#2678ff]"
                  : "border-transparent text-gray-500 hover:text-[#2678ff]"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">
        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="bg-white/80 backdrop-blur-sm shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-[#d9e5f6] rounded-[20px] p-6">
            <h3 className="text-lg font-semibold mb-6 text-[#0f172a]">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-600">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-[#2678ff]"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">
                  Email
                </label>
                <input
                  value={user?.email}
                  disabled
                  className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg mt-1 bg-[#f1f5f9]"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white px-6 py-2 rounded-full shadow hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && <UserOrders />}

        {/* SECURITY */}
        {activeTab === "security" && (
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[20px] shadow border border-[#d9e5f6] max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-[#0f172a]">
              Change Password
            </h3>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
              />

              <button
                onClick={handlePasswordUpdate}
                className="w-full bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white py-2 rounded-full hover:opacity-90"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ USER ORDERS COMPONENT
function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = user?.id || user?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5001/api/orders/user/${userId}`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const parseItems = (items) => {
    if (!items) return [];
    if (Array.isArray(items)) return items;

    try {
      return JSON.parse(items);
    } catch {
      return [];
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[20px] shadow border border-[#d9e5f6]">
      <h3 className="text-lg font-semibold mb-4 text-[#0f172a]">My Orders</h3>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-500">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const items = parseItems(order.items);

            return (
              <div key={order.id} className="border border-[#d9e5f6] p-4 rounded-[14px] bg-[#f8fbff]">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-[#0f172a]">
                    Order #{order.id}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-slate-600">
                    <span>
                      {item.partName} (x{item.quantity})
                    </span>
                    <span>${item.price}</span>
                  </div>
                ))}

                <p className="font-semibold mt-2 text-[#0f172a]">
                  Total: ${order.total}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}