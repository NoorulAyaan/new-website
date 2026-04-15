import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPart() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

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

  // ✅ SAFE FETCH
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/brands");
        const data = await res.json();

        setBrands(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setMessage("Error loading brands");
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPart = async (e) => {
    e.preventDefault();

    if (!form.brand_id || !form.vehicle_name || !form.name || !form.year) {
      setMessage("Required fields missing");
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });

      if (image) formData.append("image", image);

      const res = await fetch("http://localhost:5001/api/parts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      setMessage("Part added successfully ✅");

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

    } catch (err) {
      console.error(err);
      setMessage("Error adding part");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">

        <h2 className="text-2xl font-bold mb-6">Add New Part</h2>

        <form onSubmit={handleAddPart} className="grid gap-4">

          <select
            name="brand_id"
            value={form.brand_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Brand</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <input name="vehicle_name" value={form.vehicle_name} onChange={handleChange} placeholder="Vehicle" className="border p-2 rounded" />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Part Name" className="border p-2 rounded" />
          <input name="year" value={form.year} onChange={handleChange} placeholder="Year" className="border p-2 rounded" />
          <input name="engine_details" value={form.engine_details} onChange={handleChange} placeholder="Engine" className="border p-2 rounded" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" />
          <input name="part_number" value={form.part_number} onChange={handleChange} placeholder="Part Number" className="border p-2 rounded" />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button className="bg-green-600 text-white py-2 rounded">
            Add Part
          </button>

        </form>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

      </div>
    </div>
  );
}