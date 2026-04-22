import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPart() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand_id: "",
    vehicle_name: "",
    name: "",
    year: "",
    engine_details: "",
    price: "",
    stock: "",
    part_number: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ LOAD EXISTING DATA
  useEffect(() => {
    const fetchPart = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/parts/${id}`);
        const data = await res.json();

        setForm({
          brand_id: data.brand_id || "",
          vehicle_name: data.vehicle_name || "",
          name: data.name || "",
          year: data.year || "",
          engine_details: data.engine_details || "",
          price: data.price || "",
          stock: data.stock || "",
          part_number: data.part_number || "",
        });

      } catch (err) {
        console.error(err);
        setMessage("Error loading part");
      } finally {
        setLoading(false);
      }
    };

    fetchPart();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ UPDATE PART
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.name || !form.vehicle_name || !form.year) {
      setMessage("Required fields missing");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/api/parts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Updated successfully ✅");

      setTimeout(() => navigate("/admin"), 1000);

    } catch (err) {
      console.error(err);
      setMessage("Error updating part");
    }
  };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center">
        <div className="text-slate-500 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef3fb] py-12 px-4">

      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-[22px] shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-[#d9e5f6]">

        <h2 className="text-2xl font-bold text-[#0f172a] mb-6">
          Edit Part
        </h2>

        <form onSubmit={handleUpdate} className="grid gap-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Part Name"
            className="border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff] outline-none"
          />

          <input
            name="vehicle_name"
            value={form.vehicle_name}
            onChange={handleChange}
            placeholder="Vehicle"
            className="border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
          />

          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Year"
            className="border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
          />

          <input
            name="engine_details"
            value={form.engine_details}
            onChange={handleChange}
            placeholder="Engine"
            className="border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
          />

          <input
            name="part_number"
            value={form.part_number}
            onChange={handleChange}
            placeholder="Part Number"
            className="border border-[#d9e5f6] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#2678ff]"
          />

          <button className="mt-2 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:opacity-90 text-white py-2.5 rounded-full font-semibold shadow-[0_12px_30px_rgba(37,117,255,0.3)] transition">
            Update Part
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}

      </div>
    </div>
  );
}