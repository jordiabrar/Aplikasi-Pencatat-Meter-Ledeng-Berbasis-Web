import React, { useRef, useCallback, useEffect, useState } from "react";
import { useAppState, useAppDispatch } from "./context/AppContext";
import { useCamera } from "./hooks/useCamera";
import { useQRScanner } from "./hooks/useQRScanner";
import { useOCR } from "./hooks/useOCR";
import { MOCK_DATABASE } from "./constants/data";

// Layout Components
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { ErrorAlert } from "./components/layout/ErrorAlert";

// Feature Components
import { CameraView } from "./components/camera/CameraView";
import { CustomerInfo } from "./components/customer/CustomerInfo";
import { MeterInput } from "./components/meter/MeterInput";
import { HistoryView } from "./components/history/HistoryView";
import { FotoKeadaanRumah } from "./components/foto/FotoKeadaanRumah";
import { MeterCropEditor } from "./components/camera/MeterCropEditor";
import { KeluhanInput } from "./components/keluhan/KeluhanInput";

// ============================================================================
// Scan Page Component (QR or Meter)
// ============================================================================
function ScanPage({ mode }) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const canvasRef = useRef(null);

  const { videoRef, startCamera, stopCamera, captureImage } = useCamera();
  const { runOCR } = useOCR();

  // State untuk crop editor (khusus meter)
  const [showCropEditor, setShowCropEditor] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Auto QR scanning (hanya aktif di mode QR dan belum ada customer)
  useQRScanner(videoRef, canvasRef, mode === "qr" && !state.customer);

  // Start camera on mount, stop on unmount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  // Handle manual capture button click
  const handleCapture = useCallback(() => {
    const imageData = captureImage(canvasRef.current);

    if (mode === "qr") {
      // Manual QR scan trigger - pilih random customer dari database
      const qrKeys = Object.keys(MOCK_DATABASE);
      const randomKey = qrKeys[Math.floor(Math.random() * qrKeys.length)];
      const customer = MOCK_DATABASE[randomKey];

      dispatch({
        type: "SET_CUSTOMER",
        payload: customer,
      });
      dispatch({
        type: "SET_QR_STATUS",
        payload: "✅ Pelanggan teridentifikasi",
      });
    } else if (mode === "meter") {
      // Jika belum ada customer, pilih random dulu
      if (!state.customer) {
        const qrKeys = Object.keys(MOCK_DATABASE);
        const randomKey = qrKeys[Math.floor(Math.random() * qrKeys.length)];
        const customer = MOCK_DATABASE[randomKey];

        dispatch({
          type: "SET_CUSTOMER",
          payload: customer,
        });
      }

      // Simpan foto meter ke state
      dispatch({
        type: "SET_FOTO_METER",
        payload: imageData,
      });

      // Show crop editor instead of direct OCR
      setCapturedImage(imageData);
      setShowCropEditor(true);
      stopCamera();
    }
  }, [mode, captureImage, dispatch, state.customer, stopCamera]);

  // Handle crop confirm
  const handleCropConfirm = useCallback(
    (croppedImage) => {
      setShowCropEditor(false);
      setCapturedImage(null);

      // Update foto meter dengan cropped image
      dispatch({
        type: "SET_FOTO_METER",
        payload: croppedImage,
      });

      // Run OCR on cropped image
      console.log("Cropped image ready for OCR:", croppedImage);
      runOCR();

      // Restart camera
      startCamera();
    },
    [runOCR, startCamera, dispatch]
  );

  // Handle crop cancel
  const handleCropCancel = useCallback(() => {
    setShowCropEditor(false);
    setCapturedImage(null);

    // Clear foto meter jika cancel
    dispatch({
      type: "SET_FOTO_METER",
      payload: null,
    });

    startCamera();
  }, [startCamera, dispatch]);

  // Handle reset form
  const handleReset = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
    startCamera();
  }, [dispatch, startCamera]);

  return (
    <div className="main-grid animate-up">
      {/* Crop Editor Modal (Khusus Meter) */}
      {mode === "meter" && showCropEditor && capturedImage && <MeterCropEditor imageData={capturedImage} onConfirm={handleCropConfirm} onCancel={handleCropCancel} />}

      {/* Camera Panel */}
      <CameraView videoRef={videoRef} onCapture={handleCapture} mode={mode} />

      {/* Form Panel */}
      <div className="card-glass form-panel">
        <div className="card-header">
          <h3>{mode === "qr" ? "Data Pelanggan" : "Data Lapangan"}</h3>
        </div>

        <div className="card-body">
          {/* ========================================
              MODE QR: Tampilkan Customer Info
              ======================================== */}
          {mode === "qr" && <>{state.customer ? <CustomerInfo customer={state.customer} onReset={handleReset} showReset={true} /> : <p className="hint-text">Arahkan kamera ke QR code pelanggan atau tekan tombol "AMBIL QR"</p>}</>}

          {/* ========================================
              MODE METER: Input Meter + Keluhan
              ======================================== */}
          {mode === "meter" && (
            <>
              {/* Meter Input */}
              <MeterInput
                value={state.meterValue}
                onChange={(val) =>
                  dispatch({
                    type: "SET_METER_VALUE",
                    payload: val,
                  })
                }
                isProcessing={state.isProcessing}
                onReset={handleReset}
              />

              {/* Keluhan Input */}
              <KeluhanInput />
            </>
          )}
        </div>
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

// ============================================================================
// Main App Component
// ============================================================================
export default function App() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <ErrorAlert error={state.error} onClose={() => dispatch({ type: "SET_ERROR", payload: null })} />

        <div className="scroll-container">
          <div className="content-layout">
            {/* Render different pages based on active menu */}
            {state.activeMenu === "scan_qr" && <ScanPage mode="qr" />}
            {state.activeMenu === "scan_meter" && <ScanPage mode="meter" />}
            {state.activeMenu === "foto_keadaan_rumah" && <FotoKeadaanRumah />}
            {state.activeMenu === "riwayat" && <HistoryView />}
          </div>
        </div>
      </main>
    </div>
  );
}
