import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QrGenerator() {
  const [customerId, setCustomerId] = useState("");

  return (
    <div style={{ marginTop: 30, textAlign: "center" }}>
      <h2>Generate QR ID Pelanggan</h2>

      <input
        type="text"
        placeholder="Masukkan ID Pelanggan"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        style={{
          marginTop: 10,
          padding: 10,
          width: 220,
          borderRadius: 8,
          border: "1px solid #000",
        }}
      />

      {customerId.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <QRCodeCanvas
            value={customerId}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin
          />
          <p>
            ID Pelanggan: <strong>{customerId}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default QrGenerator;
