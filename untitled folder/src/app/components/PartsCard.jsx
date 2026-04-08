import { ShoppingCart, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PartsCard({ part, onAddToCart, showAddButton = true }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={part.imageUrl}
          alt={part.partName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{part.partName}</h3>
          <span className="text-xl font-bold text-orange-600">${part.price}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{part.description}</p>
        
        <div className="space-y-1 text-sm text-gray-700 mb-3">
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
            <Package className="h-4 w-4 text-gray-500" />
            <span className={part.stock > 10 ? "text-green-600" : "text-orange-600"}>
              {part.stock > 10 ? "In Stock" : `Only ${part.stock} left`}
            </span>
          </div>
          
          {showAddButton && onAddToCart && (
            <button
              onClick={() => onAddToCart(part)}
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors"
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
