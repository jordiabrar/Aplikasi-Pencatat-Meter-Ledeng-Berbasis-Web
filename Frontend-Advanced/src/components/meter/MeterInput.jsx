import React from "react";
import { Send, RefreshCcw, Zap } from "lucide-react";

export function MeterInput({ value, onChange, isProcessing, onSubmit, onReset }) {
  return (
    <div className="input-field-group">
      {/* Label */}
      <label htmlFor="meter-input">Indeks Meteran (m³)</label>

      {/* Input Field */}
      <input id="meter-input" type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder="0000" disabled={isProcessing} min="0" />

      {/* OCR Processing Status */}
      {isProcessing && (
        <div className="ocr-status">
          <div className="spinner"></div>
          Membaca angka meter...
        </div>
      )}

      {/* AI Detection Badge */}
      {!isProcessing && value && (
        <p className="ai-status">
          <Zap size={12} /> Terdeteksi otomatis
        </p>
      )}

      {/* Submit Button */}
      <button className="btn-submit-main" onClick={onSubmit} disabled={!value || isProcessing}>
        <Send size={18} /> KIRIM DATA
      </button>

      {/* Reset Button */}
      <button className="btn-reset" onClick={onReset}>
        <RefreshCcw size={16} /> Reset & Scan Lagi
      </button>
    </div>
  );
}
