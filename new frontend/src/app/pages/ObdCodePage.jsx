import { useState } from "react";
import { Search } from "lucide-react";

export function ObdCodePage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const upperCode = code.trim().toUpperCase();

    setResult(null);
    setError("");

    if (!upperCode) {
      setError("Please enter an OBD code");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/api/obd-codes/${upperCode}`
      );

      if (!res.ok) {
        setError("No data found for this code.");
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3fb]">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#081733] to-[#0f2a5c] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold">OBD Code Diagnosis</h1>
          <p className="text-slate-300 text-sm mt-1">
            Enter your vehicle error code to diagnose issues
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* SEARCH BOX */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8 border border-[#d9e5f6]">

          <div className="flex gap-3 items-center">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter OBD Code (e.g. P0100)"
              className="flex-1 border border-[#d9e5f6] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#2678ff] outline-none"
            />

            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white px-6 py-3 rounded-lg shadow hover:opacity-90"
            >
              <Search className="w-4 h-4" />
              Diagnose
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}
        </div>

        {/* RESULT */}
        {result && (
          <div className="bg-white rounded-2xl shadow p-6 border border-[#d9e5f6]">

            <h2 className="text-xl font-semibold text-[#0f172a] mb-2">
              {result.code}
            </h2>

            <p className="text-sm text-slate-600">
              {result.title}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}