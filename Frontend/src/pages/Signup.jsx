import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { Button, Input, Alert } from "../components/ui";
import { UserIcon, LockClosedIcon, EnvelopeIcon, CheckCircleIcon, UserPlusIcon, ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/solid";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Password strength calculator
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 10) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    const levels = {
      0: { label: "", color: "" },
      1: { label: "Lemah", color: "bg-red-500" },
      2: { label: "Sedang", color: "bg-yellow-500" },
      3: { label: "Baik", color: "bg-blue-500" },
      4: { label: "Kuat", color: "bg-green-500" },
      5: { label: "Sangat Kuat", color: "bg-emerald-500" },
    };

    return { strength, ...levels[strength] };
  }, [formData.password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (!formData.username || !formData.email || !formData.password) {
      setError("Semua field wajib diisi");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak cocok");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrasi gagal");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setError("Gagal terhubung ke server");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20 animate-fadeIn">
      {/* Header with decorative element */}
      <div className="mb-8 relative">
        <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-2xl"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheckIcon className="w-7 h-7 text-green-600 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Daftar Akun Baru
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-medium flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-yellow-500" />
            Buat akun petugas pencatat meter
          </p>
        </div>
      </div>

      {error && (
        <div className="animate-shake mb-6">
          <Alert type="error" message={error} onClose={() => setError("")} />
        </div>
      )}

      {success && (
        <div className="animate-bounce-in mb-6">
          <Alert type="success" title="Registrasi Berhasil!" message="Anda akan dialihkan ke halaman login..." />
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-5">
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <Input 
            label="Username" 
            type="text" 
            name="username" 
            placeholder="Pilih username unik" 
            value={formData.username} 
            onChange={handleChange} 
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
            className="text-base"
          />
        </div>

        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <Input 
            label="Email" 
            type="email" 
            name="email" 
            placeholder="nama@email.com" 
            value={formData.email} 
            onChange={handleChange} 
            icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
            className="text-base"
          />
        </div>

        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <Input 
            label="Password" 
            type="password" 
            name="password" 
            placeholder="Minimal 6 karakter" 
            value={formData.password} 
            onChange={handleChange} 
            icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
            className="text-base"
          />
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2 animate-fadeIn">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  ></div>
                </div>
                {passwordStrength.label && (
                  <span className="text-xs font-semibold text-gray-600">{passwordStrength.label}</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tips: Gunakan huruf besar, kecil, angka, dan simbol untuk password yang kuat
              </p>
            </div>
          )}
        </div>

        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <Input 
            label="Konfirmasi Password" 
            type="password" 
            name="confirmPassword" 
            placeholder="Ulangi password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            icon={<CheckCircleIcon className={`w-5 h-5 ${formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-green-500' : 'text-gray-400'}`} />}
            className="text-base"
          />
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-xs text-red-600 mt-1 animate-fadeIn flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Password tidak cocok
            </p>
          )}
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <p className="text-xs text-green-600 mt-1 animate-fadeIn flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Password cocok
            </p>
          )}
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={loading || success} 
            variant="success" 
            className="w-full group relative overflow-hidden" 
            size="lg"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-semibold">Memproses...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircleIcon className="w-6 h-6 mr-2 animate-bounce" />
                  <span className="font-semibold">Berhasil!</span>
                </>
              ) : (
                <>
                  <UserPlusIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Daftar Akun</span>
                </>
              )}
            </span>
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all inline-flex items-center gap-1 group"
          >
            Masuk disini
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
