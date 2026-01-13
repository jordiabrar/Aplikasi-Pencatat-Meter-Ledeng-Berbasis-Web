import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QrGenerator() {
  const [customerId, setCustomerId] = useState("");
  const qrRef = useRef(null);

  const downloadQR = (format = "png") => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    if (format === "png") {
      // Download as PNG
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `QR-Pelanggan-${customerId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "svg") {
      // Download as SVG
      const svgData = canvas.toDataURL("image/svg+xml");
      const link = document.createElement("a");
      link.href = svgData;
      link.download = `QR-Pelanggan-${customerId}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-4 sm:py-6 px-4">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Generate QR Code</h2>
        <p className="text-xs sm:text-sm text-gray-600">Buat QR code untuk ID pelanggan</p>
      </div>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Masukkan ID Pelanggan"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-center text-lg font-medium"
        />
      </div>

      {customerId.length > 0 && (
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 mt-4 sm:mt-8 w-full max-w-md">
          {/* QR Code Display */}
          <div className="w-full p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl sm:rounded-2xl shadow-lg">
            <div ref={qrRef} className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg mx-auto w-fit">
              <QRCodeCanvas 
                value={customerId} 
                size={window.innerWidth < 640 ? 180 : 220} 
                bgColor="#ffffff" 
                fgColor="#000000" 
                level="H" 
                includeMargin 
              />
            </div>
            <div className="text-center mt-3 sm:mt-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">ID Pelanggan</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 break-all">{customerId}</p>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={() => downloadQR("png")}
            className="group w-full flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm sm:text-base">Download QR Code</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default QrGenerator;
