import React from "react";
import { useAppState } from "../../context/AppContext";

export function CameraView({ videoRef, onCapture, mode }) {
  const state = useAppState();

  return (
    <div className="card-glass visual-panel">
      {/* Camera Viewfinder */}
      <div className="camera-viewfinder">
        <video ref={videoRef} autoPlay playsInline />

        {/* Aim Guide Overlay */}
        <div className={`aim-guide ${mode === "qr" ? "qr" : "meter"}`}>
          <div className="laser-line"></div>
        </div>
      </div>

      {/* Action Area */}
      <div className="action-area">
        <button className="btn-capture-pdam" onClick={onCapture} aria-label={`Capture ${mode === "qr" ? "QR code" : "meter reading"}`}>
          <div className="shutter-ring">
            <div className="shutter-dot"></div>
          </div>
          <span>AMBIL {mode === "qr" ? "QR" : "ANGKA"}</span>
        </button>

        {/* QR Status Display */}
        {mode === "qr" && state.qrScanStatus && <div className="qr-status">{state.qrScanStatus}</div>}
      </div>
    </div>
  );
}
