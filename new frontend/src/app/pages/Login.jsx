import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Wrench, Mail, Lock, User, Shield } from "lucide-react";

export function Login() {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { login } = useAuth();
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
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // Save user (optional)
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setUser(data.user);

      // Redirect
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Wrench className="h-12 w-12 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Role Toggle */}
        <div className="flex justify-center mb-8 gap-2">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`px-6 py-2 rounded-md font-medium text-base transition-colors border border-gray-300 focus:outline-none
              ${role === "customer" ? "bg-orange-600 text-white shadow" : "bg-white text-black"}
            `}
            style={{ fontFamily: 'inherit', fontWeight: 400 }}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`px-6 py-2 rounded-md font-medium text-base transition-colors border border-gray-300 focus:outline-none
              ${role === "admin" ? "bg-orange-600 text-white shadow" : "bg-white text-black"}
            `}
            style={{ fontFamily: 'inherit', fontWeight: 400 }}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="flex justify-center mb-2">
            {role === "customer" ? (
              <User className="h-8 w-8 text-orange-600" />
            ) : (
              <Shield className="h-8 w-8 text-orange-600" />
            )}
          </div>
          <h3 className="text-xl font-normal text-gray-900 text-center mb-2" style={{ fontFamily: 'inherit', fontWeight: 400 }}>
            {role === "customer" ? "Customer Login" : "Admin Login"}
          </h3>
          <p className="text-gray-600 text-sm text-center mb-4" style={{ fontFamily: 'inherit', fontWeight: 400 }}>
            {role === "customer"
              ? "Access your shopping dashboard"
              : "Access the admin dashboard"}
          </p>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder={role === "customer" ? "customer@example.com" : "admin@example.com"}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium text-base transition-colors bg-orange-600 hover:bg-orange-700 text-white`}
            style={{ fontFamily: 'inherit', fontWeight: 400 }}
          >
            {role === "customer" ? "Sign In as Customer" : "Sign In as Admin"}
          </button>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-center">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          
        </div>
      </div>
    </div>
  );
}
