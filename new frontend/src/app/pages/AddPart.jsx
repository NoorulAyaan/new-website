import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddPart() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 GET EDIT DATA FROM NAVIGATION
  const editData = location.state;
  const isEditMode = !!editData;

  // 🔥 STATE
  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // 🔥 FORM STATE (SAFE INITIALIZATION)
  const [form, setForm] = useState({
    brand_id: editData?.brand_id || "", // ⚠️ may be empty initially
    vehicle_name: editData?.vehicle_name || "",
    name: editData?.part_name || "",
    year: editData?.year || "",
    engine_details: editData?.engine_details || "",
    price: editData?.price || "",
    stock: editData?.stock || "",
    part_number: editData?.part_number || "",
  });

  // 🔍 DEBUG (VERY IMPORTANT)
  useEffect(() => {
    console.log("EDIT DATA:", editData);
  }, []);

  // ✅ FETCH BRANDS
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

  // 🔥 FIX: AUTO SET brand_id FROM brand_name (EDIT MODE)
  useEffect(() => {
    if (isEditMode && brands.length > 0 && !form.brand_id) {
      // 🔍 Find brand by name
      const selectedBrand = brands.find(
        (b) => b.name === editData?.brand_name
      );

      if (selectedBrand) {
        setForm((prev) => ({
          ...prev,
          brand_id: selectedBrand.id,
        }));
      }
    }
  }, [brands, editData, isEditMode]);

  // 🔥 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      // 🔥 ALWAYS USE FormData (for file upload)
      const formData = new FormData();

      // 🔥 APPEND ONLY VALID VALUES (PREVENT EMPTY STRING BUG)
      Object.keys(form).forEach((key) => {
        if (form[key] !== "") {
          formData.append(key, form[key]);
        }
      });

      // 🔥 APPEND IMAGE IF SELECTED
      if (image) {
        formData.append("image", image);
      }

      // 🔥 EDIT MODE → PUT
      if (isEditMode) {
        res = await fetch(
          `http://localhost:5001/api/parts/${editData.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        // 🔥 ADD MODE → POST
        res = await fetch("http://localhost:5001/api/parts", {
          method: "POST",
          body: formData,
        });
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // ✅ SUCCESS MESSAGE
      setMessage(
        isEditMode
          ? "Part updated successfully ✅"
          : "Part added successfully ✅"
      );

      // 🔥 REDIRECT AFTER SUCCESS
      setTimeout(() => navigate("/admin"), 1000);

    } catch (err) {
      console.error(err);
      setMessage("Error processing request");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">

        {/* 🔥 DYNAMIC TITLE */}
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Part" : "Add New Part"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">

          {/* 🔥 BRAND SELECT */}
          <select
            name="brand_id"
            value={form.brand_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* 🔥 VEHICLE */}
          <input
            name="vehicle_name"
            value={form.vehicle_name}
            onChange={handleChange}
            placeholder="Vehicle"
            className="border p-2 rounded"
          />

          {/* 🔥 PART NAME */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Part Name"
            className="border p-2 rounded"
          />

          {/* 🔥 YEAR */}
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Year"
            className="border p-2 rounded"
          />

          {/* 🔥 ENGINE DETAILS */}
          <input
            name="engine_details"
            value={form.engine_details}
            onChange={handleChange}
            placeholder="Engine"
            className="border p-2 rounded"
          />

          {/* 🔥 PRICE */}
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />

          {/* 🔥 STOCK */}
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 rounded"
          />

          {/* 🔥 PART NUMBER */}
          <input
            name="part_number"
            value={form.part_number}
            onChange={handleChange}
            placeholder="Part Number"
            className="border p-2 rounded"
          />

          {/* 🔥 IMAGE INPUT */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* 🔥 BUTTON TEXT FIX */}
          <button className="bg-green-600 text-white py-2 rounded">
            {isEditMode ? "Update Part" : "Add Part"}
          </button>

        </form>

        {/* 🔥 MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}

      </div>
    </div>
  );
}