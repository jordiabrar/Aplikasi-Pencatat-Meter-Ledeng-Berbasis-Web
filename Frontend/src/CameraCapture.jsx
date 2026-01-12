import React, { useRef, useState } from "react";

function CameraCapture({ setImageSrc }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    if (!stream) {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: "environment" } },
        });
        videoRef.current.srcObject = s;
        videoRef.current.play();
        setStream(s);
      } catch {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        videoRef.current.srcObject = s;
        videoRef.current.play();
        setStream(s);
      }
    }
  };

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");
    setImageSrc(dataUrl);

    // Stop camera
    stream.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  return (
    <div>
      <button onClick={startCamera}>Mulai Kamera</button>
      <video ref={videoRef} width={400} height={300} autoPlay playsInline />
      <button onClick={takePhoto}>Ambil Foto</button>
    </div>
  );
}

export default CameraCapture;
