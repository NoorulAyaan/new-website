import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export function VerifyCode() {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const type = params.get("type") || "reset";

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      alert("Email and code are required");
      return;
    }

    const endpoint =
      type === "signup" ? "signup-verify" : "verify-reset-code";

    const res = await fetch(
      `http://localhost:5001/api/auth/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    if (type === "signup") {
      alert("Signup successful");
      navigate("/login");
    } else {
      navigate(`/reset-password?email=${email}&code=${code}`);
    }
  };

  const handleResend = async () => {
    setLoading(true);

    const res = await fetch(
      "http://localhost:5001/api/auth/resend-code",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      }
    );

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("OTP resent successfully");
    setTimer(60);
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Email missing. Please restart the process.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eef3fb] px-4">

      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Verify Code</h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <form
        onSubmit={handleVerify}
        className="w-full max-w-sm bg-white/70 backdrop-blur-xl border border-[#dbeafe] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 space-y-5"
      >
        <input
          type="text"
          placeholder="••••••"
          className="w-full text-center tracking-[8px] text-lg py-2 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button className="w-full py-2 text-sm font-medium rounded-full text-white bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] hover:opacity-90 transition cursor-pointer">
          Verify
        </button>

        <div className="text-center text-xs text-slate-500">
          {timer > 0 ? (
            <p>Resend OTP in {timer}s</p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={loading}
              className="text-blue-500 hover:underline"
            >
              {loading ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}