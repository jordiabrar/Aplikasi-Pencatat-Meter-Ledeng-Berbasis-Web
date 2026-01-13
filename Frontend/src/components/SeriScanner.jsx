import { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import { normalizeImage } from "../utils/normalizeImage";
import { API_BASE_URL } from "../api";

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

      const res = await fetch(`${API_BASE_URL}/api/pelanggan/seri/${seri}`);
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

      const res = await fetch(`${API_BASE_URL}/api/seri-meter`, {
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
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-4 sm:py-6 px-4">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Scan Nomor Seri Meter</h2>
        <p className="text-xs sm:text-sm text-gray-600">Upload foto nomor seri untuk OCR</p>
      </div>

      <div className="w-full max-w-md">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> atau ambil foto
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const normalized = await normalizeImage(file);
              setImageSrc(normalized);
            }}
          />
        </label>
      </div>

      {imageSrc && (
        <div className="w-full max-w-2xl space-y-4">
          <div className="relative h-[50vh] bg-black rounded-xl overflow-hidden">
            <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={4 / 1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCropImage}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 transform active:scale-95"
            >
              ✂️ Crop Image
            </button>
            <button
              onClick={handleScan}
              disabled={!croppedBlob || loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
            >
              {loading ? "Scanning..." : "🔍 Scan Seri"}
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Atau Input Seri Manual</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Masukkan nomor seri meter"
            value={manualSeri}
            onChange={(e) => setManualSeri(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />

          <button
            onClick={() => fetchBySeri(manualSeri)}
            disabled={loading || !manualSeri}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            {loading ? "Mencari..." : "Cari Seri Meter"}
          </button>
        </div>

        {loading && <p className="text-center text-blue-600 mt-4 font-medium">Memproses...</p>}
        {error && <p className="text-center text-red-600 mt-4 font-medium">{error}</p>}
      </div>
    </div>
  );
}

export default SeriScanner;
