import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddPart() {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state;
  const isEditMode = !!editData;

  const [brands, setBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    brand_id: editData?.brand_id || "",
    vehicle_name: editData?.vehicle_name || "",
    name: editData?.part_name || "",
    year: editData?.year || "",
    engine_details: editData?.engine_details || "",
    price: editData?.price || "",
    stock: editData?.stock || "",
    part_number: editData?.part_number || "",
  });

  useEffect(() => {
    console.log("EDIT DATA:", editData);
  }, []);

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

  useEffect(() => {
    if (isEditMode && brands.length > 0 && !form.brand_id) {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== "") {
          formData.append(key, form[key]);
        }
      });

      if (image) {
        formData.append("image", image);
      }

      if (isEditMode) {
        res = await fetch(
          `http://localhost:5001/api/parts/${editData.id}`,
          { method: "PUT", body: formData }
        );
      } else {
        res = await fetch("http://localhost:5001/api/parts", {
          method: "POST",
          body: formData,
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage(
        isEditMode
          ? "Part updated successfully"
          : "Part added successfully"
      );

      setTimeout(() => navigate("/admin"), 1000);

    } catch (err) {
      console.error(err);
      setMessage("Please fill all required fields");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] py-12 px-4 relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef3fb] via-[#f6faff] to-[#e6f0ff] -z-10"></div>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-[#cfe3ff] opacity-30 blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-[#d9e5f6] p-8">

        {/* HEADER */}
        <div className="mb-8 border-b border-[#e2e8f0] pb-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-[#2678ff] mb-2 transition"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-bold text-[#0f172a]">
            {isEditMode ? "Edit Part" : "Add New Part"}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage vehicle spare parts with accurate details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BRAND */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Brand</label>
            <select
              name="brand_id"
              value={form.brand_id}
              onChange={handleChange}
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* VEHICLE */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Vehicle</label>
            <input
              name="vehicle_name"
              value={form.vehicle_name}
              onChange={handleChange}
              placeholder="e.g. Camry"
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            />
          </div>

          {/* PART NAME */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Part Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Brake Pad"
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            />
          </div>

          {/* YEAR */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Year</label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="2022"
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            />
          </div>

          {/* ENGINE */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Engine</label>
            <input
              name="engine_details"
              value={form.engine_details}
              onChange={handleChange}
              placeholder="1.8L"
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="4000"
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            />
          </div>

          {/* STOCK */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Stock</label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="10"
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            />
          </div>

          {/* PART NUMBER */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Part Number</label>
            <input
              name="part_number"
              value={form.part_number}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full mt-1 border border-[#d9e5f6] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2678ff]"
            />
          </div>

          {/* FILE */}
          <div className="md:col-span-2">
            <label className="text-sm text-slate-600 font-medium block mb-1">
              Upload Image
            </label>

            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="flex items-center gap-3">
              <label
                htmlFor="fileUpload"
                className="cursor-pointer bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white px-4 py-2 rounded-full text-sm shadow-[0_10px_25px_rgba(37,117,255,0.3)]"
              >
                Choose File
              </label>

              <span className="text-sm text-slate-500">
                {image ? image.name : "No file selected"}
              </span>
            </div>

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="mt-3 h-20 rounded-lg border border-[#d9e5f6]"
              />
            )}
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:opacity-90 text-white font-semibold py-3 rounded-full shadow-[0_12px_30px_rgba(37,117,255,0.3)]"
            >
              {isEditMode ? "Update Part" : "Add Part"}
            </button>
          </div>

        </form>

        {/* MESSAGE */}
        {message && (
          <div className="mt-6 text-center">
            <p className="text-sm text-red-500">{message}</p>
          </div>
        )}

      </div>
    </div>
  );
}