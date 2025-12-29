import { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import { normalizeImage } from "../utils/normalizeImage";

const API_BASE = "http://localhost:5000";

function SeriScanner({ onSuccess }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);

  const [manualSeri, setManualSeri] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCropComplete = (_, areaPixels) => {
    setCroppedArea(areaPixels);
  };

  const handleCropImage = async () => {
    if (!croppedArea) return;
    const blob = await getCroppedImg(imageSrc, croppedArea);
    setCroppedBlob(blob);
  };

  const fetchBySeri = async (seri) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/pelanggan/seri/${seri}`);
      if (!res.ok) throw new Error("Pelanggan tidak ditemukan");

      const data = await res.json();
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async () => {
    if (!croppedBlob) return;

    const formData = new FormData();
    formData.append("image", croppedBlob, "seri.jpg");

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/seri-meter`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal scan");

      const data = await res.json();
      const pelanggan = data.results[0]?.pelanggan;

      if (!pelanggan) throw new Error("Pelanggan tidak ditemukan");

      onSuccess(pelanggan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Scan / Input Seri Meter</h2>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const normalized = await normalizeImage(file);
          setImageSrc(normalized);
        }}
      />

      {imageSrc && (
        <>
          <div
            style={{ position: "relative", height: "50vh", background: "#000" }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <button onClick={handleCropImage}>Crop</button>
          <button onClick={handleScan}>Scan Seri</button>
        </>
      )}

      <hr />

      <h4>Cari Manual Seri Meter</h4>
      <input
        type="text"
        placeholder="Masukkan seri meter"
        value={manualSeri}
        onChange={(e) => setManualSeri(e.target.value)}
        style={{ padding: 8, width: "100%" }}
      />

      <button
        onClick={() => fetchBySeri(manualSeri)}
        style={{ marginTop: 10, width: "100%" }}
      >
        Cari Seri Meter
      </button>

      {loading && <p>Memproses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default SeriScanner;
