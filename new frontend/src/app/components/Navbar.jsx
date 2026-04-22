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

  // 🔔 TEMP: STATIC ORDER COUNT (later we will connect backend)
  const orderCount = 3;

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
    <nav className="sticky top-0 z-50 bg-[#081733] text-white shadow-[0_10px_30px_rgba(2,6,23,0.18)] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEIGHT INCREASED (h-16 → h-20) */}
        <div className="flex justify-between items-center h-[72px]">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2.5">
            <Wrench className="h-7 w-7 text-[#14c8ff]" strokeWidth={2.2} />
            <span className="font-bold text-[1.7rem] leading-none tracking-[-0.02em]">
              Sabir Autos
            </span>
          </Link>

          {/* CENTER LINKS */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors">
              Home
            </Link>

            <Link to="/about" className="text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors">
              About Us
            </Link>

            <Link to="/services" className="text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors">
              Services
            </Link>

            <Link to="/contact" className="text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors">
              Contact Us
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {isAdmin ? (
                  <div className="flex items-center space-x-4">
                    
                    <Link
                      to="/admin"
                      className="flex items-center space-x-1.5 text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors cursor-pointer"
                    >
                      <Wrench className="h-4.5 w-4.5" />
                      <span>Admin Panel</span>
                    </Link>

                    <button
                      onClick={() => navigate("/admin/orders")}
                      className="relative text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors cursor-pointer"
                    >
                      Orders

                      {orderCount > 0 && (
                        <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center leading-none">
                          {orderCount}
                        </span>
                      )}
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/shop"
                    className="flex items-center space-x-1.5 text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                    <span>Shop</span>
                  </Link>
                )}

                {/* USER */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center space-x-2.5 text-white hover:text-[#14c8ff] cursor-pointer transition-colors"
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-[14px] font-medium">{user.name}</span>
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-[0_18px_40px_rgba(15,23,42,0.18)] py-2 z-50 border border-slate-200">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 hover:bg-slate-50 cursor-pointer"
                      >
                        Profile Setting
                      </button>

                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
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
                  className="text-[15px] font-medium text-white hover:text-[#14c8ff] transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-[#0d8cff] hover:bg-[#0a7ff0] text-white px-5 py-2.5 rounded-full transition-all duration-200 font-semibold text-[14px] shadow-[0_8px_20px_rgba(13,140,255,0.28)]"
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