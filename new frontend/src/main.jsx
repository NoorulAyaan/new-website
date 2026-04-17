import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./app/context/CartContext"; // ✅ FIXED PATH

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CartProvider>
);