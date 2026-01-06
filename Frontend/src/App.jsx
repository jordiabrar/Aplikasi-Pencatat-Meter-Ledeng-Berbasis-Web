import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScanPage from "./pages/ScanPage";
import InputKubik from "./pages/InputKubik";
import PelangganStatus from "./pages/PelangganStatus";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // =====================
  // BELUM LOGIN
  // =====================
  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={(u) => {
                setUser(u);
                localStorage.setItem("user", JSON.stringify(u));
              }}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // =====================
  // SUDAH LOGIN
  // =====================
  return (
    <>
      {/* HEADER */}
      <div style={styles.header}>
        <span>Halo, {user.username || "User"}</span>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>

      <Routes>
        <Route path="/scan" element={<ScanPage user={user} />} />
        <Route path="/input-kubik" element={<InputKubik />} />
        <Route path="/status-pelanggan" element={<PelangganStatus />} />
        <Route path="*" element={<Navigate to="/scan" />} />
      </Routes>
    </>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  logout: {
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default App;
