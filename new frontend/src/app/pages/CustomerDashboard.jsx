import { useState, useEffect } from "react";
import { PartsCard } from "../components/PartsCard";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export function CustomerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/parts")
      .then((res) => {
        if (!res.ok) throw new Error("no api");
        return res.json();
      })
      .then((data) => {
        // 🔥 NORMALIZE DATA (VERY IMPORTANT)
        const normalized = data.map((p) => ({
          ...p,
          partName: p.part_name,
          vehicleName: p.vehicle_name,
          engineDetails: p.engine_details,
          brandName: p.brand_name,

          // 🔥 FIX IMAGE URL HERE (MAIN FIX)
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
    setCart([...cart, part]);
    toast.success(`${part.partName} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Shop Spare Parts
            </h1>

            <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-600">
                Cart: {cart.length} items
              </span>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search by part name, vehicle, or engine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* CATEGORY FILTER */}
        <div className="mb-6 flex items-center space-x-4 overflow-x-auto pb-2">
          <Filter className="h-5 w-5 text-gray-600 flex-shrink-0" />

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* RESULTS COUNT */}
        <p className="text-gray-600 mb-4">
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
            <p className="text-gray-500 text-lg">
              No parts found matching your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}