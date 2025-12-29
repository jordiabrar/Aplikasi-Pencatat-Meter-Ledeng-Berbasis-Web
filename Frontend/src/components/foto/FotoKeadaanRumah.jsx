import React, { useRef, useCallback, useEffect, useState } from "react";
import { Camera, CheckCircle, Trash2, Home } from "lucide-react";
import { useAppState, useAppDispatch } from "../../context/AppContext";
import { MOCK_DATABASE } from "../../constants/data";

export function FotoKeadaanRumah() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedPhoto, setCapturedPhoto] = useState(null);
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

      setCapturedPhoto(newPhoto);

      // ⭐ SAVE TO GLOBAL STATE
      dispatch({
        type: "SET_FOTO_RUMAH",
        payload: imageData,
      });
    }
  }, [captureImage, state.customer, dispatch]);

  const handleDeletePhoto = () => {
    setCapturedPhoto(null);

    // ⭐ CLEAR FROM GLOBAL STATE
    dispatch({
      type: "SET_FOTO_RUMAH",
      payload: null,
    });

    startCamera();
  };

  const handleReset = useCallback(() => {
    setCapturedPhoto(null);
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

          {capturedPhoto && (
            <div className="qr-status" style={{ background: "#d1fae5", color: "#065f46" }}>
              <CheckCircle size={16} /> Foto tersimpan
            </div>
          )}
        </div>
      </div>

      {/* Form Panel */}
      <div className="card-glass form-panel">
        <div className="card-header">
          <h3>Dokumentasi Rumah</h3>
        </div>

        <div className="card-body">
          {capturedPhoto ? (
            <>
              {/* Photo Preview */}
              <div style={{ marginTop: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", display: "block", marginBottom: "8px" }}>FOTO TERSIMPAN</label>

                <div
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "2px solid #10b981",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={capturedPhoto.image}
                    alt="Foto Rumah"
                    style={{
                      width: "100%",
                      display: "block",
                    }}
                  />
                  <button
                    onClick={handleDeletePhoto}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Delete photo"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      padding: "8px 12px",
                      fontSize: "11px",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {formatDate(capturedPhoto.timestamp)}
                  </div>
                </div>

                {/* Customer Info */}
                {state.customer && (
                  <div
                    style={{
                      background: "#f0f9ff",
                      padding: "14px",
                      borderRadius: "10px",
                      marginBottom: "16px",
                      borderLeft: "4px solid #0ea5e9",
                    }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "#0284c7", marginBottom: "6px" }}>PELANGGAN</div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "#0c4a6e", marginBottom: "4px" }}>{state.customer.nama}</div>
                    <div style={{ fontSize: "13px", color: "#334155" }}>No. {state.customer.no_pelanggan}</div>
                  </div>
                )}

                {/* Success Message */}
                <div
                  style={{
                    background: "#d1fae5",
                    border: "2px solid #10b981",
                    borderRadius: "10px",
                    padding: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <CheckCircle size={20} style={{ color: "#059669", flexShrink: 0 }} />
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#065f46" }}>Foto rumah berhasil disimpan! Lanjutkan ke menu Review untuk mengirim data.</div>
                </div>

                {/* Reset Button */}
                <button className="btn-reset" onClick={handleReset}>
                  <Camera size={16} /> Ganti Foto / Pelanggan
                </button>
              </div>
            </>
          ) : (
            <div style={{ marginTop: "16px", textAlign: "center", padding: "32px 16px", background: "#f8fafc", borderRadius: "12px", border: "2px dashed #cbd5e1" }}>
              <Home size={32} style={{ color: "#94a3b8", margin: "0 auto 12px" }} />
              <p style={{ color: "#64748b", fontSize: "13px", fontWeight: 600 }}>Ambil foto kondisi rumah pelanggan</p>
              <p style={{ color: "#94a3b8", fontSize: "11px", marginTop: "4px" }}>Tekan tombol "AMBIL FOTO" di sebelah kiri</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
