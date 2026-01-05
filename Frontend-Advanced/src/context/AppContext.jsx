/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { INITIAL_HISTORY } from "../constants/data";

// Create Contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Initial State - LENGKAP
const initialState = {
  isSidebarOpen: false,
  activeMenu: "scan_qr",
  customer: null,
  meterValue: "",
  isProcessing: false,
  selectedPetugas: "Alta (Kimora)",
  qrScanStatus: "",
  error: null,
  history: INITIAL_HISTORY,

  // Data Foto & Keluhan
  fotoMeter: null, // Base64 string foto meter
  fotoRumah: null, // Base64 string foto rumah
  fotoRumahPreview: null, // Preview foto rumah
  keluhan: null, // { keluhan: [], detail: "", foto: [] }
  catatan: "", // Catatan tambahan
};

// Reducer Function - LENGKAP
function appReducer(state, action) {
  switch (action.type) {
    // ========================================
    // SIDEBAR ACTIONS
    // ========================================
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };

    case "SET_SIDEBAR":
      return { ...state, isSidebarOpen: action.payload };

    // ========================================
    // NAVIGATION
    // ========================================
    case "SET_ACTIVE_MENU":
      return {
        ...state,
        activeMenu: action.payload,
        error: null,
      };

    // ========================================
    // CUSTOMER DATA
    // ========================================
    case "SET_CUSTOMER":
      return { ...state, customer: action.payload, error: null };

    // ========================================
    // METER VALUE
    // ========================================
    case "SET_METER_VALUE":
      return { ...state, meterValue: action.payload };

    // ========================================
    // PROCESSING STATE
    // ========================================
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload };

    // ========================================
    // PETUGAS SELECTION
    // ========================================
    case "SET_PETUGAS":
      return { ...state, selectedPetugas: action.payload };

    // ========================================
    // QR SCANNER STATUS
    // ========================================
    case "SET_QR_STATUS":
      return { ...state, qrScanStatus: action.payload };

    // ========================================
    // ERROR HANDLING
    // ========================================
    case "SET_ERROR":
      return { ...state, error: action.payload };

    // ========================================
    // HISTORY MANAGEMENT
    // ========================================
    case "ADD_HISTORY":
      return {
        ...state,
        history: [action.payload, ...state.history],
      };

    // ========================================
    // FOTO METER
    // ========================================
    case "SET_FOTO_METER":
      return {
        ...state,
        fotoMeter: action.payload,
      };

    // ========================================
    // FOTO RUMAH
    // ========================================
    case "SET_FOTO_RUMAH":
      return {
        ...state,
        fotoRumah: action.payload,
      };

    // ========================================
    // FOTO RUMAH PREVIEW
    // ========================================
    case "SET_FOTO_RUMAH_PREVIEW":
      return {
        ...state,
        fotoRumahPreview: action.payload,
      };

    // ========================================
    // KELUHAN
    // ========================================
    case "SET_KELUHAN":
      return {
        ...state,
        keluhan: action.payload,
      };

    // ========================================
    // CATATAN
    // ========================================
    case "SET_CATATAN":
      return {
        ...state,
        catatan: action.payload,
      };

    // ========================================
    // RESET FORM - HAPUS SEMUA DATA
    // ========================================
    case "RESET_FORM":
      return {
        ...state,
        customer: null,
        meterValue: "",
        qrScanStatus: "",
        error: null,
        isProcessing: false,
        fotoMeter: null,
        fotoRumah: null,
        fotoRumahPreview: null,
        keluhan: null,
        catatan: "",
      };

    default:
      return state;
  }
}

// Provider Component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// Custom Hooks for Easy Access
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within AppProvider");
  }
  return context;
}
