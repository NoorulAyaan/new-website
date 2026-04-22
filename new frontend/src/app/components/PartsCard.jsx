import { ShoppingCart, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PartsCard({ part, onAddToCart, showAddButton = true }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-[#d9e5f6] overflow-hidden hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition">
      <div className="h-48 overflow-hidden bg-[#eef3fb]">
        <ImageWithFallback
          src={part.imageUrl}
          alt={part.partName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#0f172a]">{part.partName}</h3>
          <span className="text-xl font-bold text-[#2678ff]">PKR {part.price}</span>
        </div>
        
        <p className="text-sm text-slate-500 mb-3">{part.description}</p>
        
        <div className="space-y-1 text-sm text-slate-600 mb-3">
          <p>
            <span className="font-semibold">Vehicle:</span> {part.vehicleName}
          </p>
          <p>
            <span className="font-semibold">Model:</span> {part.model} ({part.year})
          </p>
          <p>
            <span className="font-semibold">Engine:</span> {part.engineDetails}
          </p>
          <p>
            <span className="font-semibold">Part #:</span> {part.partNumber}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm">
            <Package className="h-4 w-4 text-slate-500" />
            <span className={part.stock > 10 ? "text-green-600" : "text-orange-500"}>
              {part.stock > 10 ? "In Stock" : `Only ${part.stock} left`}
            </span>
          </div>
          
          {showAddButton && onAddToCart && (
            <button
              onClick={() => onAddToCart(part)}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#16c3ff] to-[#2678ff] hover:opacity-90 text-white px-4 py-2 rounded-full transition shadow-[0_10px_25px_rgba(37,117,255,0.3)]"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}