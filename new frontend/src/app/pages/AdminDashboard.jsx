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
    <div className="bg-gray-100">

      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">
            Search spare parts by brand, vehicle, and year
          </p>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* 🔍 SEARCH CARD */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">

          <h2 className="text-xl font-semibold mb-6">Find Parts</h2>

          <div className="grid md:grid-cols-4 gap-4">

            {/* BRAND */}
            <select
              name="brand_id"
              value={form.brand_id}
              onChange={handleChange}
              className="input"
            >
              <option value="">Brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>

            {/* VEHICLE */}
            <input
              name="vehicle_name"
              value={form.vehicle_name}
              onChange={handleChange}
              placeholder="Vehicle (Corolla)"
              className="input"
            />

            {/* PART */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Part Name"
              className="input"
            />

            {/* YEAR */}
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              className="input"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6 flex-wrap">

            <button
              onClick={handleSearch}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md font-semibold"
            >
              Search
            </button>

            <button
              type="button"
              onClick={() => {
                navigate("/add-part");
                window.location.reload();
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold"
            >
              + Add Part
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>

        {/* 🔥 RESULTS */}
        <h2 className="text-2xl font-bold mb-6">
          Parts ({parts.length})
        </h2>

        {parts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center text-gray-500">
            No parts found
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {parts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >

                {/* IMAGE */}
                {p.image ? (
                  <img
                    src={`http://localhost:5001${p.image}`}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* DETAILS */}
                <div className="p-4">

                  <h3 className="text-lg font-bold mb-2">
                    {p.part_name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {p.brand_name} - {p.vehicle_name}
                  </p>

                  <p className="text-sm text-gray-600">
                    Year: {p.year}
                  </p>

                  <div className="flex justify-between mt-3 text-sm">
                    <span>💰 {p.price}</span>
                    <span>📦 {p.stock}</span>
                  </div>

                  {p.part_number && (
                    <p className="text-xs text-gray-500 mt-2">
                      Part#: {p.part_number}
                    </p>
                  )}

                  {/* ✅ ACTION BUTTONS */}
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/add-part", { state: p })
                        window.location.reload();
                      }}
                      
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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