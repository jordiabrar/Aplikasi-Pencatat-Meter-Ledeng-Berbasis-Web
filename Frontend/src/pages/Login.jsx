import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { Button, Input, Alert } from "../components/ui";
import { UserIcon, LockClosedIcon, ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/solid";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        setLoading(false);
        return;
      }

      onLogin(data.user);
      navigate("/scan", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(`Gagal terhubung ke server: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20 animate-fadeIn">
      {/* Header with decorative element */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Selamat Datang
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium">Masuk sebagai petugas pencatat meter</p>
      </div>

      {error && (
        <div className="animate-shake">
          <Alert type="error" message={error} onClose={() => setError("")} className="mb-6" />
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <Input 
            label="Username" 
            type="text" 
            placeholder="Masukkan username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
            className="text-base"
          />
        </div>

        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <Input 
            label="Password" 
            type="password" 
            placeholder="Masukkan password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
            className="text-base"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={loading} variant="primary" className="w-full group relative overflow-hidden" size="lg">
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-semibold">Memproses...</span>
                </>
              ) : (
                <>
                  <span className="font-semibold">Masuk</span>
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link 
            to="/signup" 
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all inline-flex items-center gap-1 group"
          >
            Daftar disini
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
