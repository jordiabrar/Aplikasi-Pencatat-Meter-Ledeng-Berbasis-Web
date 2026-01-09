import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import { normalizeImage } from "../utils/normalizeImage";
import { API_BASE_URL } from "../api";

function QrScanner({ onSuccess }) {
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [manualId, setManualId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Crop states
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (_, areaPixels) => {
    setCroppedArea(areaPixels);
  };

  const fetchById = async (id) => {
    // Trim whitespace and normalize
    const cleanId = id.trim().replace(/\s+/g, '');
    
    if (!/^\d+$/.test(cleanId)) {
      setError("ID pelanggan harus berupa angka");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/pelanggan/id/${cleanId}`);
      if (!res.ok) throw new Error("Pelanggan tidak ditemukan");

      const data = await res.json();
      onSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScanFromImage = async () => {
    if (!croppedArea || !imageSrc) return;

    try {
      setLoading(true);
      setError(null);

      const blob = await getCroppedImg(imageSrc, croppedArea);
      const file = new File([blob], "qr.jpg", { type: "image/jpeg" });

      // Scan QR from cropped image
      const { Html5Qrcode } = await import("html5-qrcode");
      const html5QrCode = new Html5Qrcode("qr-scan-result");
      
      const decodedText = await html5QrCode.scanFile(file, true);
      await fetchById(decodedText.trim());
      html5QrCode.clear();
      
      // Reset crop state after successful scan
      setImageSrc(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch (err) {
      setError("QR Code tidak terdeteksi. Pastikan gambar jelas dan mengandung QR code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scannerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250, // Can be a number or { width, height } - Made simpler for better flexibility
        rememberLastUsedCamera: false,
        videoConstraints: { 
          facingMode: "environment",
          aspectRatio: 1.0 // Square aspect ratio for QR
        },
      },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        fetchById(decodedText.trim());
      },
      () => {}
    );

    // Replace file input button with custom upload area
    setTimeout(() => {
      const fileSection = document.querySelector('#qr-reader__dashboard_section_fsr');
      if (fileSection) {
        fileSection.innerHTML = '';
        
        const uploadDiv = document.createElement('div');
        uploadDiv.className = 'custom-upload-area';
        uploadDiv.style.cssText = `
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          border: 2px dashed #d1d5db;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
          background: transparent;
          margin-top: 1rem;
        `;
        
        uploadDiv.innerHTML = `
          <svg class="camera-icon" style="width: 2.5rem; height: 2.5rem; margin-bottom: 0.75rem; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p style="margin-bottom: 0; font-size: 0.875rem; color: #6b7280; text-align: center; line-height: 1.5;">
            <span style="font-weight: 600;">Click to upload</span> foto QR code
          </p>
        `;
        
        uploadDiv.addEventListener('mouseenter', () => {
          uploadDiv.style.borderColor = '#3b82f6';
          uploadDiv.style.backgroundColor = '#eff6ff';
        });
        
        uploadDiv.addEventListener('mouseleave', () => {
          uploadDiv.style.borderColor = '#d1d5db';
          uploadDiv.style.backgroundColor = 'transparent';
        });
        
        uploadDiv.addEventListener('click', () => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        });
        
        fileSection.appendChild(uploadDiv);
      }
    }, 100);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
      const el = document.getElementById("qr-reader");
      if (el) el.innerHTML = "";
    };
  }, [onSuccess]);

  const handleFetchById = async (id) => {
    // Trim whitespace and normalize
    const cleanId = id.trim().replace(/\s+/g, '');
    
    if (!/^\d+$/.test(cleanId)) {
      setError("ID pelanggan harus berupa angka");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/api/pelanggan/id/${cleanId}`);
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
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-4 sm:py-6 px-4 w-full max-w-3xl mx-auto">
      <div className="text-center w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Scan QR Code</h2>
        <p className="text-xs sm:text-sm text-gray-600">Arahkan kamera ke QR code pelanggan</p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setError(null);
          const normalized = await normalizeImage(file);
          setImageSrc(normalized);
        }}
      />

      {!imageSrc ? (
        /* QR Scanner */
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-3 sm:p-4 w-full">
          <div id="qr-reader" className="w-full qr-scanner-responsive" />
        </div>
      ) : (
        /* Cropper for uploaded image */
        <div className="w-full space-y-4">
          <div className="relative h-[50vh] sm:h-[60vh] bg-black rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <p className="text-xs sm:text-sm text-blue-800">
              <span className="font-semibold">💡 Tip:</span> Geser untuk posisikan QR, pinch/scroll untuk zoom
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setImageSrc(null);
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setError(null);
              }}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Batal
            </button>
            <button
              onClick={handleScanFromImage}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Scan QR
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Hidden scan result div */}
      <div id="qr-scan-result" className="hidden" />

      {/* Manual Input Section */}
      <div className="w-full border-t-2 border-gray-200 pt-6 sm:pt-8 mt-4 sm:mt-6">
        <div className="text-center mb-4 sm:mb-5">
          <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">Input ID Manual</h4>
          <p className="text-xs sm:text-sm text-gray-500">Jika tidak memiliki QR code</p>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <input
              type="text"
              placeholder="Masukkan ID pelanggan"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-center font-medium text-sm sm:text-base"
            />
          </div>

          <button
            onClick={() => handleFetchById(manualId)}
            disabled={loading || !manualId}
            className="w-full px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mencari...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari Pelanggan
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
            <p className="text-center text-red-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrScanner;
