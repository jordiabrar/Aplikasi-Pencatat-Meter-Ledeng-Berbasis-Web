import React, { useState } from "react";
import { QrCode, Camera, History, User, ChevronDown, Droplet } from "lucide-react";
import { useAppState, useAppDispatch } from "../../context/AppContext";
import { PETUGAS_LIST } from "../../constants/data";

export function Sidebar() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [isPetugasOpen, setIsPetugasOpen] = useState(false);

  const handleMenuClick = (menu) => {
    dispatch({ type: "SET_ACTIVE_MENU", payload: menu });
    dispatch({ type: "SET_SIDEBAR", payload: false });
  };

  const handlePetugasSelect = (nama) => {
    dispatch({ type: "SET_PETUGAS", payload: nama });
    setIsPetugasOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {state.isSidebarOpen && <div className="sidebar-overlay" onClick={() => dispatch({ type: "SET_SIDEBAR", payload: false })} />}

      {/* Sidebar */}
      <aside className={`sidebar ${state.isSidebarOpen ? "open" : ""}`}>
        {/* Brand Logo PDAM */}
        <div className="sidebar-brand">
          <div className="brand-logo pdam-logo">
            <Droplet size={24} />
          </div>
          <div className="brand-text">
            <div className="brand-title">PDAM</div>
            <div className="brand-subtitle">Pencatat Meter</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          {/* Scan QR Menu */}
          <div className={`nav-item ${state.activeMenu === "scan_qr" ? "active" : ""}`} onClick={() => handleMenuClick("scan_qr")} role="button" tabIndex={0}>
            <QrCode size={20} />
            <span>Pindai QR Pelanggan</span>
          </div>

          {/* Scan Meter Menu */}
          <div className={`nav-item ${state.activeMenu === "scan_meter" ? "active" : ""}`} onClick={() => handleMenuClick("scan_meter")} role="button" tabIndex={0}>
            <Camera size={20} />
            <span>Pindai Angka Meter</span>
          </div>

          {/* History Menu */}
          <div className={`nav-item ${state.activeMenu === "riwayat" ? "active" : ""}`} onClick={() => handleMenuClick("riwayat")} role="button" tabIndex={0}>
            <History size={20} />
            <span>Riwayat Tugas</span>
          </div>

          {/* Dropdown Petugas */}
          <div className="nav-dropdown-wrapper">
            <div className="nav-item dropdown-trigger" onClick={() => setIsPetugasOpen(!isPetugasOpen)} role="button" tabIndex={0}>
              <User size={20} />
              <span>Petugas</span>
              <ChevronDown size={14} className={`arrow-icon ${isPetugasOpen ? "rotate" : ""}`} />
            </div>

            {isPetugasOpen && (
              <div className="dropdown-list-container">
                {PETUGAS_LIST.map((p, i) => (
                  <div key={i} className="dropdown-list-item" onClick={() => handlePetugasSelect(p.nama)} role="button" tabIndex={0}>
                    <p className="p-name-small">{p.nama}</p>
                    <p className="p-area-small">{p.area_tugas}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Footer - Active User Info */}
        <div className="sidebar-footer">
          <div className="user-profile-summary">
            <div className="p-avatar-small">{state.selectedPetugas[0]}</div>
            <div className="p-info-small">
              <p className="p-name-bold">{state.selectedPetugas}</p>
              <p className="p-status-tag">Petugas Aktif</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
