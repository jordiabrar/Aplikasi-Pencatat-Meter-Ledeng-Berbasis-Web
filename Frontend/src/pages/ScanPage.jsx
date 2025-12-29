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

  return (
    <div className="container">
      <h1>Sistem Meter Air</h1>

      <p>
        Login sebagai: <b>{user.username}</b>
      </p>

      <QrScanner onSuccess={handleSuccess} />
      <hr />
      <SeriScanner onSuccess={handleSuccess} />
      <hr />
      <QrGenerator />
    </div>
  );
}

export default ScanPage;
