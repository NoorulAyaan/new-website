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
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-6">Edit Part</h2>

        <form onSubmit={handleUpdate} className="grid gap-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Part Name"
            className="border p-2 rounded"
          />

          <input
            name="vehicle_name"
            value={form.vehicle_name}
            onChange={handleChange}
            placeholder="Vehicle"
            className="border p-2 rounded"
          />

          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Year"
            className="border p-2 rounded"
          />

          <input
            name="engine_details"
            value={form.engine_details}
            onChange={handleChange}
            placeholder="Engine"
            className="border p-2 rounded"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 rounded"
          />

          <input
            name="part_number"
            value={form.part_number}
            onChange={handleChange}
            placeholder="Part Number"
            className="border p-2 rounded"
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
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