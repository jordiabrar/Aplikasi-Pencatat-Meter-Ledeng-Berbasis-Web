import React, { useRef, useCallback, useEffect } from "react";
import { useAppState, useAppDispatch } from "./context/AppContext";
import { useCamera } from "./hooks/useCamera";
import { useQRScanner } from "./hooks/useQRScanner";
import { useOCR } from "./hooks/useOCR";
import { CustomerService } from "./services/CustomerService";
import { MOCK_DATABASE, PETUGAS_LIST } from "./constants/data";

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
    captureImage(canvasRef.current);

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
        payload: "✓ Pelanggan teridentifikasi",
      });
    } else if (mode === "meter") {
      // ✅ FIX: Jika belum ada customer, pilih random dulu
      if (!state.customer) {
        const qrKeys = Object.keys(MOCK_DATABASE);
        const randomKey = qrKeys[Math.floor(Math.random() * qrKeys.length)];
        const customer = MOCK_DATABASE[randomKey];

        dispatch({
          type: "SET_CUSTOMER",
          payload: customer,
        });
      }

      // Trigger OCR for meter reading
      runOCR();
    }
  }, [mode, captureImage, dispatch, runOCR, state.customer]);

  // Handle reset form
  const handleReset = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
    startCamera();
  }, [dispatch, startCamera]);

  // Handle submit data
  const handleSubmit = useCallback(async () => {
    try {
      // Get petugas ID dari petugas yang dipilih
      const selectedPetugasData = PETUGAS_LIST.find((p) => p.nama === state.selectedPetugas);

      // Prepare data sesuai struktur database METER_READINGS
      const meterData = {
        petugas_id: selectedPetugasData?.id || 1,
        pelanggan_id: state.customer?.id,
        nilai_meter: parseInt(state.meterValue),
        foto_meter: null, // Bisa diisi dengan base64 atau URL foto
        metode_input: "ocr", // 'qr_scan' | 'manual' | 'ocr'
        catatan: null,
      };

      const result = await CustomerService.submitMeterReading(meterData);

      if (result.success) {
        // Add to history
        dispatch({
          type: "ADD_HISTORY",
          payload: {
            id: result.data.id,
            petugas_id: result.data.petugas_id,
            pelanggan_id: result.data.pelanggan_id,
            no_pelanggan: state.customer?.no_pelanggan,
            nama_pelanggan: state.customer?.nama,
            nilai_meter: result.data.nilai_meter,
            metode_input: result.data.metode_input,
            created_at: result.data.created_at,
          },
        });

        // Show success message
        alert(`✓ Data terkirim!\n\n` + `Pelanggan: ${state.customer?.nama}\n` + `No. Pelanggan: ${state.customer?.no_pelanggan}\n` + `Meteran: ${state.meterValue} m³\n` + `Petugas: ${state.selectedPetugas}`);

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
      {/* Camera Panel - ✅ ALWAYS SHOW */}
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
            <p className="hint-text">{mode === "qr" ? 'Arahkan kamera ke QR code pelanggan atau tekan tombol "AMBIL QR"' : 'Tekan tombol "AMBIL ANGKA" untuk memindai meter. Data pelanggan akan otomatis terdeteksi.'}</p>
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
