import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Wrench, Mail, Lock, User } from "lucide-react";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ NEW STATES (UI ONLY)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/auth/signup-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      navigate(`/verify-code?email=${email}&type=signup`);

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Wrench className="h-12 w-12 text-[#2678ff]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0f172a]">Create Account</h2>
          <p className="text-slate-500 mt-2">Join Sabir Autos today</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-[20px] shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff]"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff]"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-16 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff]"
                  placeholder="••••••••"
                  required
                />

                {/* 👁 TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2678ff] cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-16 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff]"
                  placeholder="••••••••"
                  required
                />

                {/* 👁 TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2678ff] cursor-pointer"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white py-2 rounded-full font-semibold shadow-[0_12px_30px_rgba(37,117,255,0.3)] cursor-pointer hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#2678ff] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}