/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { INITIAL_HISTORY } from "../constants/data";

// Create Contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Initial State
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
};

// Reducer Function
function appReducer(state, action) {
  switch (action.type) {
    // Sidebar Actions
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };

    case "SET_SIDEBAR":
      return { ...state, isSidebarOpen: action.payload };

    // Navigation
    case "SET_ACTIVE_MENU":
      return {
        ...state,
        activeMenu: action.payload,
        customer: null,
        error: null,
      };

    // Customer Data
    case "SET_CUSTOMER":
      return { ...state, customer: action.payload, error: null };

    // Meter Value
    case "SET_METER_VALUE":
      return { ...state, meterValue: action.payload };

    // Processing State
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload };

    // Petugas Selection
    case "SET_PETUGAS":
      return { ...state, selectedPetugas: action.payload };

    // QR Scanner Status
    case "SET_QR_STATUS":
      return { ...state, qrScanStatus: action.payload };

    // Error Handling
    case "SET_ERROR":
      return { ...state, error: action.payload };

    // History Management
    case "ADD_HISTORY":
      return {
        ...state,
        history: [action.payload, ...state.history],
      };

    // Reset Form
    case "RESET_FORM":
      return {
        ...state,
        customer: null,
        meterValue: "",
        qrScanStatus: "",
        error: null,
        isProcessing: false,
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
