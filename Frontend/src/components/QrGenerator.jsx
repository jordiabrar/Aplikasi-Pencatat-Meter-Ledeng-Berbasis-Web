import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QrGenerator() {
  const [customerId, setCustomerId] = useState("");

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
        <div className="flex flex-col items-center space-y-4 mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <QRCodeCanvas
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
        </div>
      )}
    </div>
  );
}

export default QrGenerator;
