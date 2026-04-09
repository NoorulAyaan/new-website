import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, User, Wrench, LogOut, Home } from "lucide-react";

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-orange-500" />
            <span className="font-bold text-xl">Sabir Autos</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
            >
              Home 
              {/* <Home className="h-5 w-5" />
              <span>Home</span> */}
            </Link>

            <Link
              to="/about"
              className="hover:text-orange-500 transition-colors"
            >
              About Us
            </Link>

            <Link
              to="/services"
              className="hover:text-orange-500 transition-colors"
            >
              Services
            </Link>

            <Link
              to="/contact"
              className="hover:text-orange-500 transition-colors"
            >
              Contact Us
            </Link>

            {user ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
                  >
                    <Wrench className="h-5 w-5" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    to="/shop"
                    className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Shop</span>
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
