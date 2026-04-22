import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5001/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    navigate(`/verify-code?email=${email}&type=reset`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eef3fb] px-4">

      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">
          Forgot Password
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter your email to receive a code
        </p>
      </div>

      <form
        onSubmit={handleSendCode}
        className="w-full max-w-sm bg-white/70 backdrop-blur-xl border border-[#dbeafe] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 space-y-5"
      >
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 text-slate-400 h-4 w-4" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="w-full py-2 text-sm font-medium rounded-full text-white bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] hover:opacity-90 transition cursor-pointer">
          Send Code
        </button>

        {message && (
          <p className="text-xs text-red-500 text-center">{message}</p>
        )}
      </form>
    </div>
  );
}