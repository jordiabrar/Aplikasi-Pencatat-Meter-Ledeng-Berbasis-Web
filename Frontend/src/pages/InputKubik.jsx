import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE_URL } from "../api";
import { Card, Button, Input, Alert, Badge } from "../components/ui";
import { MONTHS } from "../constants";
import { ExclamationTriangleIcon, ArrowLeftIcon, ChartBarIcon, CameraIcon, XMarkIcon, HomeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

function InputKubik() {
  const location = useLocation();
  const navigate = useNavigate();
  const pelanggan = location.state?.pelanggan;

  const user = JSON.parse(localStorage.getItem("user"));

  const [meterAwal, setMeterAwal] = useState("");
  const [meterAkhir, setMeterAkhir] = useState("");
  const [fotoMeteran, setFotoMeteran] = useState(null);
  const [fotoRumah, setFotoRumah] = useState(null);
  const [fotoMeteranPreview, setFotoMeteranPreview] = useState(null);
  const [fotoRumahPreview, setFotoRumahPreview] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [showRiwayat, setShowRiwayat] = useState(false);
  const [loadingAvg, setLoadingAvg] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!pelanggan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <ExclamationTriangleIcon className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">Data pelanggan tidak ditemukan</p>
        <Button onClick={() => navigate("/scan")} variant="secondary">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Kembali ke Scan
        </Button>
      </div>
    );
  }

  const pemakaian = meterAwal && meterAkhir ? Number(meterAkhir) - Number(meterAwal) : 0;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const handleFotoMeteranChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoMeteran(file);
      setFotoMeteranPreview(URL.createObjectURL(file));
    }
  };

  const handleFotoRumahChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoRumah(file);
      setFotoRumahPreview(URL.createObjectURL(file));
    }
  };

  const simpan = async () => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("Silakan login ulang");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!meterAwal || !meterAkhir) {
      setError("Meter awal dan akhir wajib diisi");
      return;
    }

    if (Number(meterAkhir) < Number(meterAwal)) {
      setError("Meter akhir tidak boleh lebih kecil dari meter awal");
      return;
    }

    setLoadingSave(true);

    try {
      const formData = new FormData();
      formData.append("pelanggan_id", pelanggan.id);
      formData.append("meter_awal", meterAwal);
      formData.append("meter_akhir", meterAkhir);
      formData.append("periode_bulan", currentMonth);
      formData.append("periode_tahun", currentYear);
      formData.append("petugas", user.username);

      if (fotoMeteran) formData.append("foto_meteran", fotoMeteran);
      if (fotoRumah) formData.append("foto_rumah", fotoRumah);

      const res = await fetch(`${API_BASE_URL}/api/pemakaian`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        setError("Gagal menyimpan data, silakan coba lagi");
        setLoadingSave(false);
        return;
      }

      setSuccess("Pemakaian berhasil disimpan!");
      setMeterAwal("");
      setMeterAkhir("");
      setFotoMeteran(null);
      setFotoRumah(null);
      setFotoMeteranPreview(null);
      setFotoRumahPreview(null);

      setTimeout(() => {
        navigate("/scan");
      }, 2000);
    } catch {
      setError("Gagal terhubung ke server");
    } finally {
      setLoadingSave(false);
    }
  };

  const loadRiwayat = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/pemakaian/${pelanggan.id}/last-3`);
      const data = await res.json();
      setRiwayat(data);
      setShowRiwayat(true);
    } catch {
      setError("Gagal memuat riwayat");
    }
  };

  const hitungRataRata = async () => {
    setError("");

    if (!meterAwal) {
      setError("Isi meter awal terlebih dahulu");
      return;
    }

    setLoadingAvg(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/pemakaian/${pelanggan.id}/avg-3`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        setLoadingAvg(false);
        return;
      }

      setMeterAkhir(Number(meterAwal) + data.rata_rata);
      setSuccess(`Rata-rata 3 bulan: ${data.rata_rata} m³`);
    } catch {
      setError("Gagal menghitung rata-rata");
    } finally {
      setLoadingAvg(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Input Pemakaian Meter</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Periode: {MONTHS[currentMonth - 1]} {currentYear}
          </p>
        </div>
        <Button onClick={() => navigate("/scan")} variant="secondary" size="md" className="w-full sm:w-auto">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Alert Messages */}
      {error && <Alert type="error" message={error} onClose={() => setError("")} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess("")} />}

      {/* Customer Info */}
      <Card title="Informasi Pelanggan">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nama Pelanggan</p>
            <p className="text-lg font-semibold text-gray-900">{pelanggan.nama_pelanggan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nomor Seri Meter</p>
            <p className="text-lg font-semibold text-gray-900">{pelanggan.nomor_seri_meter}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Alamat</p>
            <p className="text-lg font-semibold text-gray-900">{pelanggan.alamat || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Golongan</p>
            <Badge variant="info">{pelanggan.golongan || "Tidak ada"}</Badge>
          </div>
        </div>
      </Card>

      {/* Input Form */}
      <Card title="Data Pemakaian">
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Meter Awal (m³)" type="number" placeholder="0" value={meterAwal} onChange={(e) => setMeterAwal(e.target.value)} />

            <Input label="Meter Akhir (m³)" type="number" placeholder="0" value={meterAkhir} onChange={(e) => setMeterAkhir(e.target.value)} />
          </div>

          {/* Pemakaian Display */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pemakaian</p>
                <p className="text-4xl font-bold text-blue-600">{pemakaian}</p>
                <p className="text-sm text-gray-600">meter kubik</p>
              </div>
              <ChartBarIcon className="w-16 h-16 text-blue-300" />
            </div>
          </div>

          <Button onClick={hitungRataRata} disabled={loadingAvg} variant="info" size="lg" className="w-full">
            {loadingAvg ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menghitung...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Gunakan Rata-rata 3 Bulan
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Upload Photos */}
      <Card title="Upload Foto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Foto Meteran */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">Foto Meteran</label>
              <span className="text-xs text-gray-500">Optional</span>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50/30 transition-all">
              {fotoMeteranPreview ? (
                <div className="relative group">
                  <img src={fotoMeteranPreview} alt="Preview Meteran" className="w-full h-56 object-cover rounded-lg shadow-sm" />
                  <button
                    onClick={() => {
                      setFotoMeteran(null);
                      setFotoMeteranPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Hapus foto"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all">
                    <p className="truncate">{fotoMeteran?.name || "Foto Meteran"}</p>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-8">
                  <div className="bg-blue-50 rounded-full p-4 mb-3">
                    <CameraIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 mb-1">Upload Foto Meteran</span>
                  <span className="text-xs text-gray-500">Click atau tap untuk memilih foto</span>
                  <input type="file" accept="image/*" capture="environment" onChange={handleFotoMeteranChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Foto Rumah */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">Foto Rumah</label>
              <span className="text-xs text-gray-500">Optional</span>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-green-500 hover:bg-green-50/30 transition-all">
              {fotoRumahPreview ? (
                <div className="relative group">
                  <img src={fotoRumahPreview} alt="Preview Rumah" className="w-full h-56 object-cover rounded-lg shadow-sm" />
                  <button
                    onClick={() => {
                      setFotoRumah(null);
                      setFotoRumahPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Hapus foto"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all">
                    <p className="truncate">{fotoRumah?.name || "Foto Rumah"}</p>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-8">
                  <div className="bg-green-50 rounded-full p-4 mb-3">
                    <HomeIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 mb-1">Upload Foto Rumah</span>
                  <span className="text-xs text-gray-500">Click atau tap untuk memilih foto</span>
                  <input type="file" accept="image/*" capture="environment" onChange={handleFotoRumahChange} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={simpan} disabled={loadingSave} variant="success" size="lg" className="sm:flex-1">
          {loadingSave ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyimpan...
            </>
          ) : (
            <>
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Simpan Pemakaian
            </>
          )}
        </Button>
        <Button onClick={loadRiwayat} variant="secondary" size="lg">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Lihat Riwayat
        </Button>
      </div>

      {/* History */}
      {showRiwayat && riwayat.length > 0 && (
        <Card title="Riwayat 3 Bulan Terakhir">
          <div className="space-y-4">
            {riwayat.map((r, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="info">
                    {MONTHS[r.periode_bulan - 1]} {r.periode_tahun}
                  </Badge>
                  <span className="text-sm text-gray-500">Petugas: {r.petugas}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Meter Awal</p>
                    <p className="text-lg font-semibold">{r.meter_awal} m³</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Meter Akhir</p>
                    <p className="text-lg font-semibold">{r.meter_akhir} m³</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Pemakaian</p>
                    <p className="text-lg font-semibold text-blue-600">{r.pemakaian_kubik} m³</p>
                  </div>
                </div>

                {(r.foto_meteran || r.foto_rumah) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {r.foto_meteran && (
                      <div>
                        <p className="text-xs text-gray-600 mb-2">Foto Meteran</p>
                        <img src={r.foto_meteran} alt="Meteran" className="w-full h-32 object-cover rounded-lg" />
                      </div>
                    )}
                    {r.foto_rumah && (
                      <div>
                        <p className="text-xs text-gray-600 mb-2">Foto Rumah</p>
                        <img src={r.foto_rumah} alt="Rumah" className="w-full h-32 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default InputKubik;
