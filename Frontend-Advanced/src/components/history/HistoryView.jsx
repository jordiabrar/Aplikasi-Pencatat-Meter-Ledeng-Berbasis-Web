import React from "react";
import { useAppState } from "../../context/AppContext";

export function HistoryView() {
  const state = useAppState();

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Format metode input
  const formatMetode = (metode) => {
    const metodeMap = {
      ocr: "OCR Auto",
      manual: "Manual",
      qr_scan: "QR Scan",
    };
    return metodeMap[metode] || metode;
  };

  return (
    <div className="card-glass full-card animate-up">
      <h2>Riwayat Pembacaan Meter</h2>

      {state.history.length === 0 ? (
        <p className="hint-text">Belum ada riwayat pembacaan meter</p>
      ) : (
        <div className="history-list">
          {state.history.map((item) => (
            <div key={item.id} className="list-item">
              <div style={{ flex: 1 }}>
                <p className="item-t">{item.nama_pelanggan || "Unknown"}</p>
                <span style={{ fontSize: "11px", color: "#64748b", display: "block", marginTop: "2px" }}>
                  No. Pel: {item.no_pelanggan} • {item.nilai_meter} m³
                </span>
                <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginTop: "4px" }}>
                  {formatDate(item.created_at)} • {formatMetode(item.metode_input)}
                </span>
              </div>
              <span className="badge-ok">TERKIRIM</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
