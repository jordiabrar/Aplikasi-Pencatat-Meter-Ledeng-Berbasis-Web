import { useEffect, useState, useCallback } from "react";

function ImageViewer({ images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setIsZoomed(false);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, handlePrevious, handleNext]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
        aria-label="Close"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-4 text-white hover:text-gray-300 transition-colors z-50"
          aria-label="Previous"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div
        className="relative max-w-7xl max-h-screen w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].label || `Image ${currentIndex + 1}`}
          className={`max-w-full max-h-full object-contain transition-transform duration-300 cursor-pointer ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onClick={toggleZoom}
          style={{
            touchAction: "pinch-zoom",
          }}
        />
        
        {/* Image Label */}
        {images[currentIndex].label && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            {images[currentIndex].label}
          </div>
        )}
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 text-white hover:text-gray-300 transition-colors z-50"
          aria-label="Next"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Zoom Hint */}
      <div className="absolute bottom-4 right-4 text-white text-xs bg-black bg-opacity-50 px-3 py-1 rounded-lg">
        Klik gambar untuk zoom
      </div>
    </div>
  );
}

export default ImageViewer;
