import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Wrench, LogOut } from "lucide-react";

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Build correct profile image URL
  const profileImage =
    user?.image && user.image.trim() !== ""
      ? user.image.startsWith("http")
        ? user.image
        : `http://localhost:5001${user.image}`
      : "https://via.placeholder.com/30";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-orange-500" />
            <span className="font-bold text-xl">Sabir Autos</span>
          </Link>

          {/* CENTER LINKS */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Home
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
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Shop / Admin */}
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    <Wrench className="h-5 w-5" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    to="/shop"
                    className="flex items-center space-x-1 hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Shop</span>
                  </Link>
                )}

                {/* USER DROPDOWN */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center space-x-2 hover:text-orange-500 cursor-pointer"
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm">{user.name}</span>
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Profile Setting
                      </button>

                      <button
                        onClick={() => {
                          navigate("/orders");
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        My Orders
                      </button>

                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
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