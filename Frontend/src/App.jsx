import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ScanPage from "./pages/ScanPage";
import InputKubik from "./pages/InputKubik";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

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
    <Routes>
      <Route path="/scan" element={<ScanPage user={user} />} />
      <Route path="/input-kubik" element={<InputKubik />} />
      <Route path="*" element={<Navigate to="/scan" />} />
    </Routes>
  );
}

export default App;
