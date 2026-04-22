import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Wrench, Mail, Lock, User } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ ADDED
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setUser(data.user);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/shop");
      }

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Wrench className="h-12 w-12 text-[#2678ff]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0f172a]">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-[20px] shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-8 space-y-6">
          
          <div className="flex justify-center mb-2">
            <User className="h-8 w-8 text-[#2678ff]" />
          </div>

          <h3 className="text-xl font-normal text-[#0f172a] text-center mb-2">
            Login
          </h3>

          <p className="text-slate-500 text-sm text-center mb-4">
            Access your account
          </p>

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
                className="w-full pl-10 pr-4 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent"
                placeholder="Enter your email"
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
                type={showPassword ? "text" : "password"} // ✅ UPDATED
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-16 py-2 border border-[#d9e5f6] rounded-lg focus:ring-2 focus:ring-[#2678ff] focus:border-transparent"
                placeholder="••••••••"
                required
              />

              {/* SHOW / HIDE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-[#2678ff] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full font-medium text-base transition bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:opacity-90 text-white shadow-[0_12px_30px_rgba(37,117,255,0.3)] cursor-pointer"
          >
            Sign In
          </button>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-center">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#2678ff] hover:opacity-80 font-semibold">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#d9e5f6]"></div>
      </div>
    </div>
  );
}