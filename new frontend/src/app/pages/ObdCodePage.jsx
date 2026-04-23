import { useState } from "react";
import { Search, Car, AlertTriangle, CheckCircle, Info } from "lucide-react";

export function ObdCodePage() {
  const [code, setCode] = useState("");
  const [vehicle, setVehicle] = useState(""); 
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const upperCode = code.trim().toUpperCase();

    setResult(null);
    setError("");
    setLoading(true);

    if (!upperCode) {
      setError("Please enter an OBD code");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5001/api/obd-codes/${upperCode}?vehicle=${encodeURIComponent(vehicle || "Generic")}`
      );

      if (!res.ok) {
        setError("No data found for this code.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine severity colors
  const getSeverityStyles = (sev) => {
    const s = sev?.toLowerCase() || "";
    if (s.includes("high")) return "bg-red-100 text-red-700 border-red-200";
    if (s.includes("medium")) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  return (
    <div className="min-h-screen bg-[#eef3fb] font-sans">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#081733] to-[#0f2a5c] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight">OBD Code Diagnosis</h1>
          <p className="text-slate-300 text-lg mt-2 max-w-2xl">
            Understand your car's health with simple, child-friendly explanations powered by AI.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* SEARCH BOX */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-[#d9e5f6]">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            <div className="relative flex-1 w-full">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Error Code (e.g. P0304)"
                className="w-full border border-[#d9e5f6] rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#2678ff] outline-none transition-all"
              />
            </div>

            <div className="relative flex-1 w-full">
              <input
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Car Model (e.g. Toyota Camry)"
                className="w-full border border-[#d9e5f6] rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[#2678ff] outline-none transition-all"
              />
              <Car className="absolute right-4 top-4 w-5 h-5 text-slate-400" />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white font-bold px-10 py-3.5 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:grayscale disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><Search className="w-5 h-5" /> Diagnose</>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 font-medium text-sm mt-3 flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> {error}</p>}
        </div>

        {/* AI RESULT CARD */}
        {result && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#d9e5f6] animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Bar with Code & Source */}
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Diagnosis For</span>
                <h2 className="text-4xl font-black text-[#0f172a]">{result.code}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase ${getSeverityStyles(result.severity)}`}>
                  {result.severity || "Unknown"} Severity
                </span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-blue-100">
                  {result.source?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-8">
              {/* Simple Title Explanation */}
              <div className="mb-10">
                <h3 className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase mb-3 tracking-wider">
                  <Info className="w-4 h-4" /> What is happening?
                </h3>
                <p className="text-2xl text-slate-800 leading-snug font-semibold italic">
                  "{result.title}"
                </p>
              </div>

              {/* Grid for Cause and Fix */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Cause Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-4">
                    <Search className="w-5 h-5 text-slate-500" />
                  </div>
                  <h4 className="font-bold text-[#0f172a] mb-2">The Reason</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {result.cause || "The computer couldn't find a specific reason, but it's time for a check-up."}
                  </p>
                </div>

                {/* Fix Card */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-4">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-[#0f172a] mb-2">How to fix it</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {result.fix || "Ask a grown-up to take the car to a mechanic friend."}
                  </p>
                </div>

              </div>
            </div>

            {/* Footer Disclaimer */}
            <div className="px-8 py-4 bg-slate-50 text-slate-400 text-[11px] text-center italic border-t border-slate-100">
              * This is an AI-generated explanation for educational purposes. Always consult a certified mechanic.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}