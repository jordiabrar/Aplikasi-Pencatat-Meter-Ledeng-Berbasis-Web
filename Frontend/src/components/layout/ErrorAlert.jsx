import React from "react";
import { AlertCircle, X } from "lucide-react";

export function ErrorAlert({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="error-alert">
      <div className="error-content">
        <AlertCircle size={20} />
        <span>{error.message}</span>
      </div>
      <button onClick={onClose} className="error-close" aria-label="Close error">
        <X size={18} />
      </button>
    </div>
  );
}
