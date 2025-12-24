import React, { useState, useRef, useEffect, useCallback } from "react";
import { Check, X, RotateCw, ZoomIn, ZoomOut } from "lucide-react";

export function MeterCropEditor({ imageData, onConfirm, onCancel }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [cropArea, setCropArea] = useState({
    x: 10,
    y: 30,
    width: 80,
    height: 40,
  });

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    const containerWidth = canvas.parentElement.clientWidth;
    const containerHeight = canvas.parentElement.clientHeight;

    const scale = Math.min(containerWidth / img.width, containerHeight / img.height) * zoom;

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-scaledWidth / 2, -scaledHeight / 2);

    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    ctx.restore();
  }, [zoom, rotation]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
      drawCanvas();
    };
    img.src = imageData;
  }, [imageData, drawCanvas]);

  useEffect(() => {
    if (imageLoaded) {
      drawCanvas();
    }
  }, [cropArea, imageLoaded, drawCanvas]);

  const handleMouseDown = useCallback((e, handle = null) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
    } else {
      setIsDragging(true);
    }

    setDragStart({ x, y });
  }, []);

  const handleTouchStart = useCallback((e, handle = null) => {
    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
    } else {
      setIsDragging(true);
    }

    setDragStart({ x, y });
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging && !isResizing) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      if (isDragging) {
        const deltaX = x - dragStart.x;
        const deltaY = y - dragStart.y;

        setCropArea((prev) => {
          const newX = Math.max(0, Math.min(100 - prev.width, prev.x + deltaX));
          const newY = Math.max(0, Math.min(100 - prev.height, prev.y + deltaY));
          return { ...prev, x: newX, y: newY };
        });

        setDragStart({ x, y });
      } else if (isResizing) {
        setCropArea((prev) => {
          let newCrop = { ...prev };

          if (resizeHandle.includes("top")) {
            const deltaY = y - dragStart.y;
            const newY = Math.max(0, Math.min(prev.y + prev.height - 5, prev.y + deltaY));
            newCrop.height = prev.height + (prev.y - newY);
            newCrop.y = newY;
          }
          if (resizeHandle.includes("bottom")) {
            const deltaY = y - dragStart.y;
            newCrop.height = Math.max(5, Math.min(100 - prev.y, prev.height + deltaY));
          }
          if (resizeHandle.includes("left")) {
            const deltaX = x - dragStart.x;
            const newX = Math.max(0, Math.min(prev.x + prev.width - 10, prev.x + deltaX));
            newCrop.width = prev.width + (prev.x - newX);
            newCrop.x = newX;
          }
          if (resizeHandle.includes("right")) {
            const deltaX = x - dragStart.x;
            newCrop.width = Math.max(10, Math.min(100 - prev.x, prev.width + deltaX));
          }

          return newCrop;
        });

        setDragStart({ x, y });
      }
    },
    [isDragging, isResizing, dragStart, resizeHandle]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging && !isResizing) return;

      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;

      if (isDragging) {
        const deltaX = x - dragStart.x;
        const deltaY = y - dragStart.y;

        setCropArea((prev) => {
          const newX = Math.max(0, Math.min(100 - prev.width, prev.x + deltaX));
          const newY = Math.max(0, Math.min(100 - prev.height, prev.y + deltaY));
          return { ...prev, x: newX, y: newY };
        });

        setDragStart({ x, y });
      } else if (isResizing) {
        setCropArea((prev) => {
          let newCrop = { ...prev };

          if (resizeHandle.includes("top")) {
            const deltaY = y - dragStart.y;
            const newY = Math.max(0, Math.min(prev.y + prev.height - 5, prev.y + deltaY));
            newCrop.height = prev.height + (prev.y - newY);
            newCrop.y = newY;
          }
          if (resizeHandle.includes("bottom")) {
            const deltaY = y - dragStart.y;
            newCrop.height = Math.max(5, Math.min(100 - prev.y, prev.height + deltaY));
          }
          if (resizeHandle.includes("left")) {
            const deltaX = x - dragStart.x;
            const newX = Math.max(0, Math.min(prev.x + prev.width - 10, prev.x + deltaX));
            newCrop.width = prev.width + (prev.x - newX);
            newCrop.x = newX;
          }
          if (resizeHandle.includes("right")) {
            const deltaX = x - dragStart.x;
            newCrop.width = Math.max(10, Math.min(100 - prev.x, prev.width + deltaX));
          }

          return newCrop;
        });

        setDragStart({ x, y });
      }
    },
    [isDragging, isResizing, dragStart, resizeHandle]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleConfirm = () => {
    const img = imgRef.current;
    if (!img) return;

    const cropCanvas = document.createElement("canvas");
    const ctx = cropCanvas.getContext("2d");

    const containerWidth = canvasRef.current.width;
    const containerHeight = canvasRef.current.height;

    const scale = Math.min(containerWidth / img.width, containerHeight / img.height) * zoom;

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    const cropX = (cropArea.x / 100) * scaledWidth;
    const cropY = (cropArea.y / 100) * scaledHeight;
    const cropWidth = (cropArea.width / 100) * scaledWidth;
    const cropHeight = (cropArea.height / 100) * scaledHeight;

    const originalCropX = cropX / scale;
    const originalCropY = cropY / scale;
    const originalCropWidth = cropWidth / scale;
    const originalCropHeight = cropHeight / scale;

    cropCanvas.width = originalCropWidth;
    cropCanvas.height = originalCropHeight;

    ctx.save();

    if (rotation !== 0) {
      ctx.translate(cropCanvas.width / 2, cropCanvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-originalCropWidth / 2, -originalCropHeight / 2);
    }

    ctx.drawImage(img, originalCropX, originalCropY, originalCropWidth, originalCropHeight, 0, 0, originalCropWidth, originalCropHeight);

    ctx.restore();

    const croppedImage = cropCanvas.toDataURL("image/jpeg", 0.9);
    onConfirm(croppedImage);
  };

  return (
    <div className="crop-editor-overlay">
      {/* Header */}
      <div className="crop-editor-header">
        <h3 className="crop-editor-title">✂️ CROP AREA METER</h3>
        <button onClick={onCancel} className="crop-editor-close" aria-label="Close">
          <X size={20} />
        </button>
      </div>

      {/* Canvas Area */}
      <div className="crop-editor-canvas-container">
        <canvas ref={canvasRef} className="crop-editor-canvas" />

        {/* Crop Overlay */}
        {imageLoaded && (
          <>
            {/* Darkened overlay */}
            <div className="crop-editor-darkened-overlay" />

            {/* Crop area */}
            <div
              className={`crop-editor-crop-area ${isDragging ? "dragging" : ""}`}
              style={{
                left: `${cropArea.x}%`,
                top: `${cropArea.y}%`,
                width: `${cropArea.width}%`,
                height: `${cropArea.height}%`,
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Corner Resize Handles */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((handle) => (
                <div key={handle} className={`crop-editor-handle ${handle}`} onMouseDown={(e) => handleMouseDown(e, handle)} onTouchStart={(e) => handleTouchStart(e, handle)} />
              ))}

              {/* Edge Handles */}
              {["top", "right", "bottom", "left"].map((handle) => (
                <div key={handle} className={`crop-editor-edge-handle ${handle}`} onMouseDown={(e) => handleMouseDown(e, handle)} onTouchStart={(e) => handleTouchStart(e, handle)} />
              ))}

              {/* Grid Lines */}
              <svg className="crop-editor-grid">
                <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Instruction Text */}
            <div className="crop-editor-instruction">Drag untuk geser • Handles untuk resize</div>
          </>
        )}
      </div>

      {/* Bottom Toolbar */}
      <div className="crop-editor-toolbar">
        {/* Left Tools */}
        <div className="crop-editor-tools">
          <button onClick={handleZoomOut} className="crop-editor-tool-btn" aria-label="Zoom out">
            <ZoomOut size={20} />
          </button>
          <button onClick={handleZoomIn} className="crop-editor-tool-btn" aria-label="Zoom in">
            <ZoomIn size={20} />
          </button>
          <button onClick={handleRotate} className="crop-editor-tool-btn" aria-label="Rotate">
            <RotateCw size={20} />
          </button>
        </div>

        {/* Right Actions */}
        <div className="crop-editor-actions">
          <button onClick={onCancel} className="crop-editor-btn-cancel">
            <X size={16} />
            <span className="btn-text">BATAL</span>
          </button>
          <button onClick={handleConfirm} className="crop-editor-btn-confirm">
            <Check size={18} />
            <span className="btn-text-full">GUNAKAN</span>
            <span className="btn-text-short">OK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
