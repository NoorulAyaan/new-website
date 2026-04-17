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
    <div className="min-h-screen bg-gray-50">

      {/* 🔙 BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
              onClick={() => {
                navigate("/shop");
                window.location.reload();}}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Go Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* 🛒 CART ITEMS */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-4 gap-4"
                >
                  {/* IMAGE + INFO */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.partName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.partName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.vehicleName}
                      </p>
                      <p className="text-orange-600 font-semibold">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY + ACTIONS */}
                  <div className="flex items-center gap-4">

                    {/* QUANTITY */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="px-4">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
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
            <div className="bg-white rounded-xl shadow p-6 h-fit">

              <h3 className="text-xl font-semibold mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between mb-2 text-gray-600">
                <span>Items</span>
                <span>
                  {cart.reduce((t, i) => t + i.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Total</span>
                <span className="font-semibold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                    navigate("/checkout");
                    window.location.reload();
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
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