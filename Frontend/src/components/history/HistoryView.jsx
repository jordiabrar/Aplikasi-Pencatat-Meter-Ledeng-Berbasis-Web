import React from "react";
import { useAppState } from "../../context/AppContext";

export function HistoryView() {
  const state = useAppState();

  return (
    <div className="card-glass full-card animate-up">
      <h2>Riwayat Tugas</h2>

      {state.history.length === 0 ? (
        <p className="hint-text">Belum ada riwayat pembacaan meter</p>
      ) : (
        <div className="history-list">
          {state.history.map((item, i) => (
            <div key={i} className="list-item">
              <div>
                <p className="item-t">Pelanggan #{item.id}</p>
                <span>
                  {item.nama} - {item.status}
                  {item.meter && ` • ${item.meter} m³`}
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
