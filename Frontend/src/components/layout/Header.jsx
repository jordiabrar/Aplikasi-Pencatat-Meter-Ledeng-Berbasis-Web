import React from "react";
import { Menu } from "lucide-react";
import { useAppState, useAppDispatch } from "../../context/AppContext";

export function Header() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const getPageTitle = () => {
    switch (state.activeMenu) {
      case "scan_qr":
        return "PINDAI QR";
      case "scan_meter":
        return "PINDAI METER";
      case "riwayat":
        return "RIWAYAT";
      default:
        return "KIMORA FLOW";
    }
  };

  return (
    <header className="top-header">
      <button className="menu-trigger" onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })} aria-label="Toggle menu">
        <Menu size={24} />
      </button>

      <h1 className="header-title-center">{getPageTitle()}</h1>

      <div className="header-right">
        <div className="online-dot" title="Online"></div>
      </div>
    </header>
  );
}
