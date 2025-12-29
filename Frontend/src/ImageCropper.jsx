import React, { useRef, useState, useEffect } from "react";

function ImageCropper({ imageSrc, onCrop }) {
  const canvasRef = useRef(null);
  const [imgObj, setImgObj] = useState(null);
  const [rect, setRect] = useState(null);
  const [startPos, setStartPos] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setImgObj(img);
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 0.9; // responsive canvas
      const scale = canvas.width / img.width;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [imageSrc]);

  const getTouchPos = (touchEvent) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  };

  const draw = (r) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);
    if (r) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    }
  };

  const handleStart = (e) => {
    e.preventDefault();
    const pos = e.touches
      ? getTouchPos(e)
      : { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setStartPos(pos);
    setDragging(true);
  };

  const handleMove = (e) => {
    if (!dragging || !startPos) return;
    const pos = e.touches
      ? getTouchPos(e)
      : { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const newRect = {
      x: Math.min(startPos.x, pos.x),
      y: Math.min(startPos.y, pos.y),
      w: Math.abs(pos.x - startPos.x),
      h: Math.abs(pos.y - startPos.y),
    };
    setRect(newRect);
    draw(newRect);
  };

  const handleEnd = (e) => {
    setDragging(false);
  };

  const handleCrop = () => {
    if (!rect) return;
    const canvas = document.createElement("canvas");
    canvas.width = rect.w;
    canvas.height = rect.h;
    const ctx = canvas.getContext("2d");

    // Scale original image to canvas dimensions
    const scaleX = imgObj.width / canvasRef.current.width;
    const scaleY = imgObj.height / canvasRef.current.height;

    ctx.drawImage(
      imgObj,
      rect.x * scaleX,
      rect.y * scaleY,
      rect.w * scaleX,
      rect.h * scaleY,
      0,
      0,
      rect.w,
      rect.h
    );

    onCrop(canvas.toDataURL("image/jpeg"));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", touchAction: "none" }}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
      />
      <button onClick={handleCrop} style={{ marginTop: "10px" }}>
        Crop dan Lanjutkan OCR
      </button>
    </div>
  );
}

export default ImageCropper;
