import { useEffect, useState } from "react";
import { Database, Search, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AdminDashboard() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [parts, setParts] = useState([]);

  const [form, setForm] = useState({
    brand_id: "",
    vehicle_name: "",
    name: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/brands");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const params = new URLSearchParams();

      if (form.brand_id) params.append("brand_id", form.brand_id);
      if (form.vehicle_name) params.append("vehicle_name", form.vehicle_name);
      if (form.name) params.append("part_name", form.name);
      if (form.year) params.append("year", form.year);

      const res = await fetch(
        `http://localhost:5001/api/parts/search?${params.toString()}`
      );

      const data = await res.json();
      setParts(data);

    } catch (err) {
      console.error(err);
      setMessage("Error fetching parts");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE PART
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this part?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5001/api/parts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setParts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting part");
    }
  };

  const handleReset = () => {
    setForm({
      brand_id: "",
      vehicle_name: "",
      name: "",
      year: "",
    });

    setParts([]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-200">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold mb-1">Admin Dashboard</h1>
          <p className="text-gray-300 text-sm">
            Search and manage vehicle spare parts
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* SEARCH CARD */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-10">

          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Find Parts
          </h2>

          {/* FILTER GRID */}
          <div className="grid md:grid-cols-4 gap-5">

            {/* BRAND */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Brand</label>
              <select
                name="brand_id"
                value={form.brand_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-800"
              >
                <option value="">Select</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* VEHICLE */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Vehicle</label>
              <input
                name="vehicle_name"
                value={form.vehicle_name}
                onChange={handleChange}
                placeholder="e.g. Corolla"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-800"
              />
            </div>

            {/* PART */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Part Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Brake Pad"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-800"
              />
            </div>

            {/* YEAR */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Year</label>
              <input
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2022"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-gray-800"
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6 flex-wrap">

            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium transition shadow-sm"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => {
                navigate("/add-part");
                window.location.reload();
              }}
              className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-md text-sm font-medium transition"
            >
              + Add Part
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-md text-sm transition border"
            >
              Reset
            </button>
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Parts ({parts.length})
          </h2>
        </div>

        {/* EMPTY STATE */}
        {parts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">

            <p className="text-gray-400 text-sm">
              No parts found. Try adjusting your filters.
            </p>

          </div>
        ) : (

          /* GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {parts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
              >

                {/* IMAGE */}
                {p.image ? (
                  <img
                    src={`http://localhost:5001${p.image}`}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}

                {/* DETAILS */}
                <div className="p-4">

                  <h3 className="text-md font-semibold text-gray-900 mb-1">
                    {p.part_name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {p.brand_name} • {p.vehicle_name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Year: {p.year}
                  </p>

                  <div className="flex justify-between mt-3 text-sm text-gray-700">
                    <span>💰 {p.price}</span>
                    <span>📦 {p.stock}</span>
                  </div>

                  {p.part_number && (
                    <p className="text-xs text-gray-400 mt-2">
                      Part#: {p.part_number}
                    </p>
                  )}

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-4">

                    <button
                      type="button"
                      onClick={() => {
                        navigate("/add-part", { state: p });
                        window.location.reload();
                      }}
                      className="flex-1 bg-gray-900 hover:bg-black text-white py-1.5 rounded text-sm transition"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded text-sm transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}