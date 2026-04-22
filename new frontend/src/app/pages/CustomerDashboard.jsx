import { useState, useEffect } from "react";
import { PartsCard } from "../components/PartsCard";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext"; // ✅ ADD THIS
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS

export function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [spareParts, setSpareParts] = useState([]);

  // ✅ USE GLOBAL CART CONTEXT
  const { cart, addToCart } = useCart();

  const navigate = useNavigate(); // ✅ ADD THIS

  useEffect(() => {
    fetch("http://localhost:5001/api/parts")
      .then((res) => {
        if (!res.ok) throw new Error("no api");
        return res.json();
      })
      .then((data) => {
        const normalized = data.map((p) => ({
          ...p,
          partName: p.part_name,
          vehicleName: p.vehicle_name,
          engineDetails: p.engine_details,
          brandName: p.brand_name,
          partNumber: p.part_number, // 👈 THIS WAS MISSING

          imageUrl: p.image
            ? `http://localhost:5001${p.image}`
            : "https://via.placeholder.com/400x300?text=No+Image",
        }));

        setSpareParts(normalized);
      })
      .catch(() => setSpareParts([]));
  }, []);

  const categories = [
    "All",
    ...new Set(spareParts.map((part) => part.brandName)),
  ];

  const filteredParts = spareParts.filter((part) => {
    const matchesSearch =
      part.partName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.vehicleName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.engineDetails?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.brandName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || part.brandName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (part) => {
    addToCart(part);
    toast.success(`${part.partName} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#eef3fb]">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#081733] to-[#0f2a5c] text-white shadow-[0_12px_30px_rgba(2,6,23,0.25)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold">
              Shop Spare Parts
            </h1>

            {/* 🔥 CLICKABLE CART */}
            <div
              onClick={() => {
                navigate("/cart");
                window.location.reload();
              }}
              className="cursor-pointer flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition border border-white/20"
            >
              <ShoppingCart className="h-5 w-5 text-white" />
              <span className="font-semibold text-white text-sm">
                Cart: {cart.reduce((total, item) => total + item.quantity, 0)} items
              </span>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-300" />

            <input
              type="text"
              placeholder="Search by part name, vehicle, or engine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 backdrop-blur-md text-black border border-white/20 focus:ring-2 focus:ring-[#2678ff] outline-none shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* CATEGORY FILTER */}
        <div className="mb-6 flex items-center space-x-3 overflow-x-auto pb-2">
          <Filter className="h-5 w-5 text-slate-600 flex-shrink-0" />

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white shadow-[0_10px_25px_rgba(37,117,255,0.3)]"
                  : "bg-white text-slate-700 border border-[#d9e5f6] hover:bg-[#f1f6ff]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* RESULTS COUNT */}
        <p className="text-slate-600 mb-4">
          Found {filteredParts.length} part
          {filteredParts.length !== 1 ? "s" : ""}
        </p>

        {/* PARTS GRID */}
        {filteredParts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part) => (
              <PartsCard
                key={part.id}
                part={part}
                onAddToCart={handleAddToCart}
                showAddButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">
              No parts found matching your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}