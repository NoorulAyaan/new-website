import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ NEW STATE (UI ONLY)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const code = params.get("code");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !code || !password) {
      alert("Email, code, and new password are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch(
      "http://localhost:5001/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          newPassword: password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Password reset successful");
    navigate("/login");
  };

  if (!email || !code) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Invalid request. Please restart the process.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eef3fb] px-4">

      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Reset Password
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter your new password
        </p>
      </div>

      <form
        onSubmit={handleReset}
        className="w-full max-w-sm bg-white/70 backdrop-blur-xl border border-[#dbeafe] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 space-y-4"
      >

        {/* 🔐 NEW PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            className="w-full py-2 px-3 text-sm border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-16"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* 🔐 CONFIRM PASSWORD */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full py-2 px-3 text-sm border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-16"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className="w-full py-2 text-sm font-medium rounded-full text-white bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 transition cursor-pointer">
          Reset Password
        </button>
      </form>
    </div>
  );
}