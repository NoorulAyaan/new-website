import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Profile() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [preview, setPreview] = useState(user?.image || "");
  const [activeTab, setActiveTab] = useState("profile");

  // 🔐 PASSWORD STATES
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ PROFILE SAVE
  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      image: preview,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    toast.success("Profile updated", {
      description: "Your changes have been saved successfully",
    });
  };

  // 🔐 PASSWORD UPDATE LOGIC
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
      // 👉 Replace this with your backend API
      const res = await fetch("http://localhost:5001/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Failed to update password");
      }

      toast.success("Password updated successfully");

      // clear fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-green-600 text-white p-8">
        <div className="max-w-6xl mx-auto flex items-center gap-6">

          <div className="relative">
            <img
              src={preview || "https://via.placeholder.com/100"}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />

            <label className="absolute bottom-0 right-0 bg-white text-black p-1 rounded-full cursor-pointer text-xs">
              ✎
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>

          <div>
            <h2 className="text-xl">Welcome,</h2>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-sm opacity-80">{user?.email}</p>
          </div>

        </div>
      </div>

      {/* TABS */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex space-x-6 px-6">
          {["profile", "orders", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 border-b-2 ${
                activeTab === tab
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-600"
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
          <div className="bg-white shadow rounded-lg p-6">

            <h3 className="text-lg font-semibold mb-6">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md mt-1 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  value={user?.email}
                  disabled
                  className="w-full border px-3 py-2 rounded-md mt-1 bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Country</label>
                <select className="w-full border px-3 py-2 rounded-md mt-1">
                  <option>Pakistan</option>
                  <option>USA</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600">Language</label>
                <select className="w-full border px-3 py-2 rounded-md mt-1">
                  <option>English</option>
                </select>
              </div>

            </div>

            <div className="mt-6">
              <button
                onClick={handleSave}
                className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
              >
                Save Changes
              </button>
            </div>

          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold">My Orders</h3>
            <p className="text-gray-500 mt-2">No orders yet</p>
          </div>
        )}

        {/* 🔐 SECURITY TAB */}
        {activeTab === "security" && (
          <div className="bg-white p-6 rounded shadow max-w-md">

            <h3 className="text-lg font-semibold mb-4">
              Change Password
            </h3>

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              />

              <button
                onClick={handlePasswordUpdate}
                className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
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