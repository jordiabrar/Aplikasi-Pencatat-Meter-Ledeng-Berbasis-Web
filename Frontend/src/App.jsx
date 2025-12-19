import React, { useRef, useCallback, useEffect } from "react";
import { useAppState, useAppDispatch } from "./context/AppContext";
import { useCamera } from "./hooks/useCamera";
import { useQRScanner } from "./hooks/useQRScanner";
import { useOCR } from "./hooks/useOCR";
import { CustomerService } from "./services/CustomerService";
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

import "./styles/App.css";

// ============================================================================
// Scan Page Component (QR or Meter)
// ============================================================================
function ScanPage({ mode }) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const canvasRef = useRef(null);

  const { videoRef, startCamera, stopCamera, captureImage } = useCamera();
  const { runOCR } = useOCR();

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
      // Manual QR scan trigger
      const qrKeys = Object.keys(MOCK_DATABASE);
      const randomKey = qrKeys[Math.floor(Math.random() * qrKeys.length)];
      dispatch({
        type: "SET_CUSTOMER",
        payload: MOCK_DATABASE[randomKey],
      });
      dispatch({
        type: "SET_QR_STATUS",
        payload: "✓ Pelanggan teridentifikasi",
      });
    } else if (mode === "meter") {
      // Trigger OCR for meter reading
      runOCR(imageData);
    }
  }, [mode, captureImage, dispatch, runOCR]);

  // Handle reset form
  const handleReset = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
    startCamera();
  }, [dispatch, startCamera]);

  // Handle submit data
  const handleSubmit = useCallback(async () => {
    try {
      const data = {
        customer: state.customer,
        meterValue: state.meterValue,
        petugas: state.selectedPetugas,
        timestamp: new Date().toISOString(),
      };

      const result = await CustomerService.submitMeterReading(data);

      if (result.success) {
        // Add to history
        dispatch({
          type: "ADD_HISTORY",
          payload: {
            id: result.id.slice(-3),
            nama: state.customer?.nama || "Unknown",
            status: "Terverifikasi",
            meter: state.meterValue,
          },
        });

        // Show success message
        alert(`✓ Data terkirim!\n\n` + `Pelanggan: ${state.customer?.nama}\n` + `Meteran: ${state.meterValue} m³\n` + `Petugas: ${state.selectedPetugas}`);

        handleReset();
      }
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
  }, [state, dispatch, handleReset]);

  return (
    <div className="main-grid animate-up">
      {/* Camera Panel */}
      <CameraView videoRef={videoRef} onCapture={handleCapture} mode={mode} />

      {/* Form Panel */}
      <div className="card-glass form-panel">
        <div className="card-header">
          <h3>Data Lapangan</h3>
        </div>

        <div className="card-body">
          {state.customer ? (
            <>
              {/* Customer Information */}
              <CustomerInfo customer={state.customer} onReset={handleReset} showReset={mode === "qr"} />

              {/* Meter Input (only for meter mode) */}
              {mode === "meter" && (
                <MeterInput
                  value={state.meterValue}
                  onChange={(val) =>
                    dispatch({
                      type: "SET_METER_VALUE",
                      payload: val,
                    })
                  }
                  isProcessing={state.isProcessing}
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                />
              )}
            </>
          ) : (
            <p className="hint-text">{mode === "qr" ? 'Arahkan kamera ke QR code pelanggan atau tekan tombol "AMBIL QR"' : "Scan QR pelanggan terlebih dahulu"}</p>
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
            {state.activeMenu === "riwayat" && <HistoryView />}
          </div>
        </div>
      </main>
    </div>
  );
}
