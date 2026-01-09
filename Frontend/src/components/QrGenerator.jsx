import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

function QrGenerator() {
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setCustomerId(value);
      setError("");
    } else {
      setError("Hanya angka yang diperbolehkan");
    }
  };

  const downloadQR = () => {
    const canvas = document.querySelector('#qr-canvas');
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `QR_Pelanggan_${customerId}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-4 sm:py-6 px-4">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Generate QR Code</h2>
        <p className="text-xs sm:text-sm text-gray-600">Buat QR code untuk ID pelanggan</p>
      </div>

      <div className="w-full max-w-md space-y-2">
        <input
          type="number"
          placeholder="Masukkan ID Pelanggan"
          value={customerId}
          onChange={handleInputChange}
          min="1"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-center text-lg font-medium"
        />
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
      </div>

      {customerId.length > 0 && (
        <div className="flex flex-col items-center space-y-4 mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <QRCodeCanvas
              id="qr-canvas"
              value={customerId}
              size={220}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">ID Pelanggan</p>
            <p className="text-2xl font-bold text-blue-600">{customerId}</p>
          </div>
          <button
            onClick={downloadQR}
            className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}

export default QrGenerator;
