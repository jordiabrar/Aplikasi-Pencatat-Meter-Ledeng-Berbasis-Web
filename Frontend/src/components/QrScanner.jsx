import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const API_BASE = "http://localhost:5000";

function QrScanner({ onSuccess }) {
  const scannerRef = useRef(null);
  const [manualId, setManualId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (scannerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: false,
        videoConstraints: { facingMode: "environment" },
      },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        handleFetchById(decodedText.trim());
      },
      () => {}
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
      const el = document.getElementById("qr-reader");
      if (el) el.innerHTML = "";
    };
  }, []);

  const handleFetchById = async (id) => {
    if (!/^\d+$/.test(id)) {
      setError("ID pelanggan harus berupa angka");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/pelanggan/id/${id}`);
      if (!res.ok) throw new Error("Pelanggan tidak ditemukan");

      const data = await res.json();
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>QR / Input ID Pelanggan</h2>

      <div id="qr-reader" style={{ width: 300 }} />

      <hr />

      <h4>Cari Manual ID Pelanggan</h4>
      <input
        type="text"
        placeholder="Masukkan ID pelanggan"
        value={manualId}
        onChange={(e) => setManualId(e.target.value)}
        style={{ padding: 8, width: "100%" }}
      />

      <button
        onClick={() => handleFetchById(manualId)}
        style={{ marginTop: 10, width: "100%" }}
      >
        Cari Pelanggan
      </button>

      {loading && <p>Memuat...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default QrScanner;
