import React, { useRef, useCallback, useEffect, useState } from "react";
import { Camera, Upload, Trash2, Home } from "lucide-react";
import { useAppState, useAppDispatch } from "../../context/AppContext";
import { MOCK_DATABASE } from "../../constants/data";

export function FotoKeadaanRumah() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [cameraError, setCameraError] = useState(null);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  const captureImage = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return null;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg", 0.8);
  }, []);

  // Start camera on mount
  useEffect(() => {
    let mounted = true;

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraError(null);
        }
      } catch (error) {
        console.error("Camera error:", error);
        if (mounted) {
          setCameraError("Tidak dapat mengakses kamera. Periksa izin browser.");
        }
      }
    };

    initCamera();

    return () => {
      mounted = false;
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraError(null);
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError("Tidak dapat mengakses kamera. Periksa izin browser.");
    }
  }, []);

  const handleCapture = useCallback(() => {
    // Jika belum ada customer, pilih random
    let customer = state.customer;
    if (!customer) {
      const qrKeys = Object.keys(MOCK_DATABASE);
      const randomKey = qrKeys[Math.floor(Math.random() * qrKeys.length)];
      customer = MOCK_DATABASE[randomKey];

      dispatch({
        type: "SET_CUSTOMER",
        payload: customer,
      });
    }

    const imageData = captureImage();
    if (imageData) {
      const newPhoto = {
        id: Date.now(),
        pelanggan_id: customer.id,
        no_pelanggan: customer.no_pelanggan,
        nama: customer.nama,
        image: imageData,
        timestamp: new Date().toISOString(),
      };

      setCapturedPhotos((prev) => [newPhoto, ...prev]);
    }
  }, [captureImage, state.customer, dispatch]);

  const handleDeletePhoto = (photoId) => {
    setCapturedPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  const handleSubmit = useCallback(async () => {
    if (capturedPhotos.length === 0) return;

    try {
      // Simulasi submit ke backend
      await new Promise((resolve) => setTimeout(resolve, 800));

      alert(`✓ Data terkirim!\n\n` + `Pelanggan: ${state.customer?.nama}\n` + `No. Pelanggan: ${state.customer?.no_pelanggan}\n` + `Jumlah Foto: ${capturedPhotos.length}\n` + `Petugas: ${state.selectedPetugas}`);

      // Reset
      setCapturedPhotos([]);
      dispatch({ type: "RESET_FORM" });
      startCamera();
    } catch (error) {
      console.error("Submit error:", error);
      dispatch({
        type: "SET_ERROR",
        payload: {
          type: "SUBMIT_ERROR",
          message: "Gagal mengirim data. Silakan coba lagi.",
        },
      });
    }
  }, [capturedPhotos, state.customer, state.selectedPetugas, dispatch, startCamera]);

  const handleReset = useCallback(() => {
    setCapturedPhotos([]);
    dispatch({ type: "RESET_FORM" });
    startCamera();
  }, [dispatch, startCamera]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="main-grid animate-up">
      {/* Camera Panel */}
      <div className="card-glass visual-panel">
        {/* Camera Viewfinder */}
        <div className="camera-viewfinder">
          <video ref={videoRef} autoPlay playsInline />

          {/* Aim Guide Overlay */}
          <div className="aim-guide meter">
            <div className="laser-line"></div>
          </div>

          {cameraError && (
            <div className="qr-status" style={{ background: "#fee2e2", color: "#991b1b" }}>
              {cameraError}
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="action-area">
          <button className="btn-capture-pdam" onClick={handleCapture} aria-label="Capture house photo">
            <div className="shutter-ring">
              <div className="shutter-dot"></div>
            </div>
            <span>AMBIL FOTO</span>
          </button>

          {capturedPhotos.length > 0 && <div className="qr-status">📸 {capturedPhotos.length} foto tersimpan</div>}
        </div>
      </div>

      {/* Form Panel */}
      <div className="card-glass form-panel">
        <div className="card-header">
          <h3>Dokumentasi Rumah</h3>
        </div>

        <div className="card-body">
          {capturedPhotos.length > 0 || state.customer ? (
            <>
              {/* Photo Gallery */}
              {capturedPhotos.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <label style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", display: "block", marginBottom: "8px" }}>FOTO TERSIMPAN ({capturedPhotos.length})</label>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "16px" }}>
                    {capturedPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        style={{
                          position: "relative",
                          aspectRatio: "1/1",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "2px solid #cbd5e1",
                        }}
                      >
                        <img
                          src={photo.image}
                          alt="Foto Rumah"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            padding: "4px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Delete photo"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                            padding: "4px 6px",
                            fontSize: "9px",
                            color: "white",
                            fontWeight: 600,
                          }}
                        >
                          {formatDate(photo.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <button className="btn-submit-main" onClick={handleSubmit} disabled={capturedPhotos.length === 0}>
                    <Upload size={18} /> KIRIM DATA ({capturedPhotos.length} FOTO)
                  </button>

                  {/* Reset Button */}
                  <button className="btn-reset" onClick={handleReset}>
                    <Camera size={16} /> Ganti Pelanggan
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ marginTop: "16px", textAlign: "center", padding: "32px 16px", background: "#f8fafc", borderRadius: "12px", border: "2px dashed #cbd5e1" }}>
              <Home size={32} style={{ color: "#94a3b8", margin: "0 auto 12px" }} />
              <p style={{ color: "#64748b", fontSize: "13px", fontWeight: 600 }}>Ambil foto kondisi rumah</p>
              <p style={{ color: "#94a3b8", fontSize: "11px", marginTop: "4px" }}>Tekan tombol "AMBIL FOTO" di kiri</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
