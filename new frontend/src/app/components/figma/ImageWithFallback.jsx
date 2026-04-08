import { useState } from "react";

export function ImageWithFallback({ src, alt, className, ...props }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center text-gray-400 ${className}`}
        {...props}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🖼️</div>
          <div className="text-sm">{alt || "Image not available"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
          {...props}
        >
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${isLoading ? "hidden" : ""} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}