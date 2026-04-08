import { useState, useEffect } from "react";
import { PartsCard } from "../components/PartsCard";
import { Search, Filter, Database } from "lucide-react";

export function AdminDashboard() {
  const [vehicleName, setVehicleName] = useState("");
  const [model, setModel] = useState("");
  const [engineDetails, setEngineDetails] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    // Try fetching parts from backend API; fallback to empty array
    fetch("/api/parts")
      .then((res) => {
        if (!res.ok) throw new Error("no api");
        return res.json();
      })
      .then((data) => setSpareParts(data))
      .catch(() => setSpareParts([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);

    const results = spareParts.filter((part) => {
      const matchesVehicle =
        !vehicleName ||
        part.vehicleName.toLowerCase().includes(vehicleName.toLowerCase());

      const matchesModel =
        !model || part.model.toLowerCase().includes(model.toLowerCase());

      const matchesEngine =
        !engineDetails ||
        part.engineDetails.toLowerCase().includes(engineDetails.toLowerCase());

      return matchesVehicle && matchesModel && matchesEngine;
    });

    setSearchResults(results);
  };

  const handleReset = () => {
    setVehicleName("");
    setModel("");
    setEngineDetails("");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-gray-300">
            Search and manage spare parts inventory by vehicle specifications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Filter className="h-6 w-6 text-orange-600" />
            <span>Find Parts by Vehicle Details</span>
          </h2>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="vehicleName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Vehicle Name
                </label>
                <input
                  id="vehicleName"
                  type="text"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  placeholder="e.g., Toyota Camry"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Model
                </label>
                <input
                  id="model"
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g., LE, EX, Sport"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="engineDetails"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Engine Details
                </label>
                <input
                  id="engineDetails"
                  type="text"
                  value={engineDetails}
                  onChange={(e) => setEngineDetails(e.target.value)}
                  placeholder="e.g., 2.5L 4-Cylinder"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>Search Parts</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-semibold transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <span className="text-gray-600">
                {searchResults.length} part{searchResults.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((part) => (
                  <PartsCard
                    key={part.id}
                    part={part}
                    showAddButton={false}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No parts found matching the specified criteria
                </p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search parameters
                </p>
              </div>
            )}
          </div>
        )}

        {/* All Parts Overview */}
        {!hasSearched && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Parts in Inventory ({spareParts.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spareParts.map((part) => (
                <PartsCard
                  key={part.id}
                  part={part}
                  showAddButton={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}