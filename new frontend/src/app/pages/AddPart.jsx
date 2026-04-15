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

  // LOAD BRANDS
  useEffect(() => {
    fetch("http://localhost:5001/api/brands")
      .then(res => res.json())
      .then(data => setBrands(data));
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

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

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

          <select name="brand_id" onChange={handleChange} className="border p-2 rounded">
            <option value="">Select Brand</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <input name="vehicle_name" placeholder="Vehicle" onChange={handleChange} className="border p-2 rounded" />
          <input name="name" placeholder="Part Name" onChange={handleChange} className="border p-2 rounded" />
          <input name="year" placeholder="Year" onChange={handleChange} className="border p-2 rounded" />
          <input name="engine_details" placeholder="Engine" onChange={handleChange} className="border p-2 rounded" />
          <input name="price" placeholder="Price" onChange={handleChange} className="border p-2 rounded" />
          <input name="stock" placeholder="Stock" onChange={handleChange} className="border p-2 rounded" />
          <input name="part_number" placeholder="Part Number" onChange={handleChange} className="border p-2 rounded" />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button className="bg-green-600 text-white py-2 rounded">
            Add Part
          </button>

        </form>

        {message && <p className="mt-4 text-center">{message}</p>}

      </div>
    </div>
  );
}