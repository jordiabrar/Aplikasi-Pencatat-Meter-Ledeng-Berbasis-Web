import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScanPage from "./pages/ScanPage";
import InputKubik from "./pages/InputKubik";
import PelangganStatus from "./pages/PelangganStatus";

function App() {
  const { user, login, logout } = useAuth();

  // =====================
  // BELUM LOGIN
  // =====================
  if (!user) {
    return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // =====================
  // SUDAH LOGIN
  // =====================
  return (
    <Routes>
      <Route element={<MainLayout user={user} onLogout={logout} />}>
        <Route path="/scan" element={<ScanPage user={user} />} />
        <Route path="/input-kubik" element={<InputKubik />} />
        <Route path="/status-pelanggan" element={<PelangganStatus />} />
        <Route path="*" element={<Navigate to="/scan" />} />
      </Route>
    </Routes>
  );
}

export default App;
