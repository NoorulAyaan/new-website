import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPart() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  // ✅ LOAD EXISTING DATA
  useEffect(() => {
    fetch(`http://localhost:5001/api/parts/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
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

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Edit Part</h2>

      <form onSubmit={handleUpdate} className="grid gap-4">

        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Part Name"
        />

        <input
          name="vehicle_name"
          value={form.vehicle_name || ""}
          onChange={handleChange}
          placeholder="Vehicle"
        />

        <input
          name="year"
          value={form.year || ""}
          onChange={handleChange}
          placeholder="Year"
        />

        <input
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          placeholder="Price"
        />

        <button className="bg-blue-600 text-white py-2 rounded">
          Update
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}