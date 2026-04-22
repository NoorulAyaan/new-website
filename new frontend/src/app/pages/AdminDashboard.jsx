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
    <div className="min-h-screen bg-[#eef3fb]">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#081733] to-[#0f2a5c] text-white shadow-[0_12px_30px_rgba(2,6,23,0.25)]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-300 text-sm">
            Search and manage vehicle spare parts
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* SEARCH CARD */}
        <div className="bg-white/80 backdrop-blur-md rounded-[24px] shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 mb-10">

          <h2 className="text-lg font-semibold text-[#0f172a] mb-6 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#2678ff]" />
            Find Parts
          </h2>

          {/* FILTER GRID */}
          <div className="grid md:grid-cols-4 gap-5">

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Brand</label>
              <select
                name="brand_id"
                value={form.brand_id}
                onChange={handleChange}
                className="w-full border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff] outline-none"
              >
                <option value="">Select</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Vehicle</label>
              <input
                name="vehicle_name"
                value={form.vehicle_name}
                onChange={handleChange}
                placeholder="e.g. Corolla"
                className="w-full border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Part Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Brake Pad"
                className="w-full border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Year</label>
              <input
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2022"
                className="w-full border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6 flex-wrap">

            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:opacity-90 text-white px-6 py-2 rounded-full text-sm font-medium shadow-[0_10px_25px_rgba(37,117,255,0.3)] cursor-pointer"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => {
                navigate("/add-part");
                window.location.reload();
              }}
              className="bg-[#0f172a] hover:bg-black text-white px-6 py-2 rounded-full text-sm font-medium shadow cursor-pointer"
            >
              + Add Part
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-full text-sm border cursor-pointer"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => {
                navigate("/obd-codes");
                window.location.reload();
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full text-sm font-medium shadow cursor-pointer"
            >
              OBD Codes
            </button>
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#0f172a]">
            Parts ({parts.length})
          </h2>
        </div>

        {/* EMPTY STATE */}
        {parts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#d9e5f6] p-12 text-center">
            <p className="text-slate-400 text-sm">
              No parts found. Try adjusting your filters.
            </p>
          </div>
        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {parts.map((p) => (
              <div
                key={p.id}
                className="bg-white/80 backdrop-blur-sm rounded-[22px] border border-[#d9e5f6] shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition overflow-hidden"
              >

                {p.image ? (
                  <img
                    src={`http://localhost:5001${p.image}`}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 bg-[#e6eefb] flex items-center justify-center text-slate-400 text-sm">
                    No Image
                  </div>
                )}

                <div className="p-5">

                  <h3 className="text-md font-semibold text-[#0f172a] mb-1">
                    {p.part_name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {p.brand_name} • {p.vehicle_name}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Year: {p.year}
                  </p>

                  {/* UPDATED DESIGN */}
                  <div className="flex justify-between mt-3 items-center">

                    <span className="text-lg font-bold text-[#2678ff]">
                      PKR {p.price}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.stock > 10
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {p.stock > 10 ? "In Stock" : `${p.stock} left`}
                    </span>

                  </div>

                  {p.part_number && (
                    <p className="text-xs text-slate-400 mt-2">
                      Part#: {p.part_number}
                    </p>
                  )}

                  <div className="flex gap-2 mt-4">

                    <button
                      type="button"
                      onClick={() => {
                        navigate("/add-part", { state: p });
                        window.location.reload();
                      }}
                      className="flex-1 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:opacity-90 text-white py-2 rounded-full text-sm font-medium shadow-[0_10px_25px_rgba(37,117,255,0.3)]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full text-sm font-medium shadow"
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