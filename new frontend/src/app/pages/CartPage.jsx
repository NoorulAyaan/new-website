import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";

export function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#eef3fb]">

      {/* 🔙 BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-[#2678ff] transition font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h2 className="text-3xl font-bold text-[#0f172a] mb-8">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6]">
            <p className="text-slate-500 text-lg">Your cart is empty</p>
            <button
              onClick={() => {
                navigate("/shop");
                window.location.reload();
              }}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white rounded-full hover:opacity-90 transition shadow-[0_12px_30px_rgba(37,117,255,0.3)]"
            >
              Go Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* 🛒 CART ITEMS */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-[#e2e8f0] py-4 gap-4"
                >
                  {/* IMAGE + INFO */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.partName}
                      className="w-20 h-20 object-cover rounded-[14px] border border-[#d9e5f6]"
                    />

                    <div>
                      <h3 className="font-semibold text-[#0f172a]">
                        {item.partName}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {item.vehicleName}
                      </p>
                      <p className="text-[#2678ff] font-semibold">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY + ACTIONS */}
                  <div className="flex items-center gap-4">

                    {/* QUANTITY */}
                    <div className="flex items-center border border-[#d9e5f6] rounded-full bg-[#f8fbff] overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-1.5 hover:bg-[#edf4ff] text-slate-700"
                      >
                        -
                      </button>

                      <span className="px-4 text-[#0f172a] font-medium">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1.5 hover:bg-[#edf4ff] text-slate-700"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 SUMMARY */}
            <div className="bg-white/80 backdrop-blur-sm rounded-[22px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] p-6 h-fit">

              <h3 className="text-xl font-semibold mb-4 text-[#0f172a]">
                Order Summary
              </h3>

              <div className="flex justify-between mb-2 text-slate-600">
                <span>Items</span>
                <span>
                  {cart.reduce((t, i) => t + i.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between mb-4 text-slate-600">
                <span>Total</span>
                <span className="font-semibold text-[#0f172a]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  navigate("/checkout");
                  window.location.reload();
                }}
                className="w-full bg-gradient-to-r from-[#16c3ff] to-[#2678ff] text-white py-3 rounded-full hover:opacity-90 transition font-semibold shadow-[0_12px_30px_rgba(37,117,255,0.3)]"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}