import React from "react";
import { RefreshCcw } from "lucide-react";

export function CustomerInfo({ customer, onReset, showReset = true }) {
  if (!customer) return null;

  return (
    <>
      <div className="pdam-info-card-high">
        <label>HASIL IDENTIFIKASI</label>
        <h4 className="text-heavy-dark">{customer.nama}</h4>
        <p className="text-heavy-gray">
          {customer.noPel} • {customer.alamat}
        </p>
      </div>

      {showReset && (
        <button className="btn-reset" onClick={onReset}>
          <RefreshCcw size={16} /> Reset & Scan Lagi
        </button>
      )}
    </>
  );
}
