import { useNavigate } from "react-router-dom";
import QrScanner from "../components/QrScanner";
import SeriScanner from "../components/SeriScanner";
import QrGenerator from "../components/QrGenerator";

function ScanPage({ user }) {
  const navigate = useNavigate();

  const handleSuccess = (pelanggan) => {
    navigate("/input-kubik", {
      state: { pelanggan },
    });
  };

  const keStatusPelanggan = () => {
    navigate("/status-pelanggan");
  };

  return (
    <div className="container">
      <h1>Sistem Meter Air</h1>

      <p>
        Login sebagai: <b>{user.username}</b>
      </p>

      <button
        onClick={keStatusPelanggan}
        style={{
          marginBottom: 16,
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Lihat Status Pelanggan Bulan Ini
      </button>

      <QrScanner onSuccess={handleSuccess} />
      <hr />
      <SeriScanner onSuccess={handleSuccess} />
      <hr />
      <QrGenerator />
    </div>
  );
}

export default ScanPage;
