import React from "react";
import { RefreshCcw } from "lucide-react";

export function CustomerInfo({ customer, onReset, showReset = true }) {
  if (!customer) return null;

  return (
    <>
      <div className="pdam-info-card-high">
        <label>HASIL IDENTIFIKASI</label>
        <h4 className="text-heavy-dark">{customer.nama}</h4>
        <p className="text-heavy-gray">No. Pelanggan: {customer.no_pelanggan}</p>
        <p className="text-heavy-gray" style={{ fontSize: "0.75rem", marginTop: "4px" }}>
          {customer.alamat}
        </p>
        <p className="text-heavy-gray" style={{ fontSize: "0.7rem", marginTop: "2px", color: "#64748b" }}>
          {customer.kelurahan}, {customer.kecamatan}, {customer.kota}
        </p>
        {customer.no_telepon && (
          <p className="text-heavy-gray" style={{ fontSize: "0.7rem", marginTop: "2px", color: "#64748b" }}>
            📞 {customer.no_telepon}
          </p>
        )}
      </div>

      {showReset && (
        <button className="btn-reset" onClick={onReset}>
          <RefreshCcw size={16} /> Reset & Scan Lagi
        </button>
      )}
    </>
  );
}
