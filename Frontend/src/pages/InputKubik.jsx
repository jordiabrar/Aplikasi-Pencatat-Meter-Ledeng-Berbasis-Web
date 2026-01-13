import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../api";
import { Card, Button, Input, Alert, Badge, ImageViewer } from "../components/ui";
import { MONTHS } from "../constants";

function InputKubik() {
  const location = useLocation();
  const navigate = useNavigate();
  const pelanggan = location.state?.pelanggan;

  const user = JSON.parse(localStorage.getItem("user"));

  const [meterAwal, setMeterAwal] = useState("");
  const [meterAkhir, setMeterAkhir] = useState("");
  const [masalahTerpilih, setMasalahTerpilih] = useState([]);
  const [showMasalah, setShowMasalah] = useState(false);
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
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const pemakaian = meterAwal && meterAkhir ? Number(meterAkhir) - Number(meterAwal) : 0;

  // Deteksi pemakaian tidak normal
  const isPemakaianTidakNormal = () => {
    if (pemakaian === 0) return null;
    if (pemakaian < 0) return { type: "warning", message: "Meter akhir lebih kecil dari meter awal!" };
    if (pemakaian > 50) return { type: "error", message: "Pemakaian sangat tinggi! Periksa kembali." };
    if (pemakaian < 3) return { type: "info", message: "Pemakaian sangat rendah. Pastikan sudah benar." };
    return null;
  };

  const peringatanPemakaian = isPemakaianTidakNormal();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!pelanggan) return;

    const fetchMeterTerakhir = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/pemakaian/${pelanggan.id}/last`);
        const data = await res.json();

        if (data.success) {
          setMeterAwal(String(data.meter_akhir));
        }
      } catch {
        // diamkan saja, berarti belum ada data sebelumnya
      }
    };

    fetchMeterTerakhir();
  }, [pelanggan]);

  if (!pelanggan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-gray-600 mb-4">Data pelanggan tidak ditemukan</p>
        <Button onClick={() => navigate("/scan")} variant="secondary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Scan
        </Button>
      </div>
    );
  }

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

  const DAFTAR_MASALAH = [
    { id: 1, nama: "Meter baik tapi ditaksir" },
    { id: 2, nama: "Meter berputar terlalu cepat" },
    { id: 3, nama: "Air tidak keluar" },
    { id: 4, nama: "Meter kabur atau berembun" },
    { id: 5, nama: "Meter dilepas" },
    { id: 6, nama: "Meter mundur" },
    { id: 7, nama: "Meter macet" },
    { id: 8, nama: "Kaca meter pecah" },
    { id: 9, nama: "Meter tidak ketemu" },
    { id: 10, nama: "Meter tertimbun" },
    { id: 11, nama: "Meter tidak diakui" },
    { id: 12, nama: "Meter hilang atau dicuri" },
    { id: 13, nama: "Putus sementara" },
    { id: 14, nama: "Non fisik" },
    { id: 15, nama: "Meter tidak ada" },
    { id: 16, nama: "Putus permanen" },
    { id: 17, nama: "Pelanggan tidak mau ganti meter" },
    { id: 18, nama: "Tanah kosong rumah dibongkar" },
    { id: 19, nama: "Rumah kosong" },
    { id: 20, nama: "Pagar rumah terkunci" },
    { id: 21, nama: "Penghuni tidak membukakan pintu" },
    { id: 22, nama: "Rumah ada anjing" },
    { id: 23, nama: "Pasangan baru" },
    { id: 24, nama: "Meter baru dipasang atau diganti" },
    { id: 25, nama: "Ada indikasi pelanggaran" },
    { id: 26, nama: "Meragukan" },
    { id: 27, nama: "Banjir" },
    { id: 28, nama: "QR code hilang" },
    { id: 29, nama: "Papan stand ditempel" },
    { id: 30, nama: "Pasang meter tidak standar" },
    { id: 31, nama: "Tarif tidak sesuai" },
    { id: 32, nama: "Stand dibacakan pelanggan" },
    { id: 33, nama: "Kondisi bocor" },
    { id: 34, nama: "Meter dalam rumah" },
    { id: 35, nama: "Rumah kosong terkunci" },
    { id: 36, nama: "Salah blok" },
    { id: 37, nama: "Air tidak dipakai" },
    { id: 38, nama: "Pipa dinas tidak standar" },
    { id: 39, nama: "Pasang kembali" },
    { id: 40, nama: "Meter baik" },
    { id: 41, nama: "Pindah posisi meter" },
    { id: 42, nama: "Tidak mau PPM" },
    { id: 43, nama: "Stand via WA" },
    { id: 44, nama: "Meter baik stand tunggu" },
  ];

  const toggleMasalah = (id) => {
    setMasalahTerpilih((prev) => {
      if (prev.includes(id)) {
        return prev.filter((m) => m !== id);
      } else {
        return [...prev, id];
      }
    });
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
      formData.append("masalah_ids", JSON.stringify(masalahTerpilih));

      if (fotoMeteran) formData.append("foto_meteran", fotoMeteran);
      if (fotoRumah) formData.append("foto_rumah", fotoRumah);

      const res = await fetch(`${API_BASE_URL}/api/pemakaian`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        // Try to get error message from response
        try {
          const errorData = await res.json();
          setError(errorData.message || "Gagal menyimpan data, silakan coba lagi");
        } catch {
          setError(`Gagal menyimpan data (${res.status}), silakan coba lagi`);
        }
        setLoadingSave(false);
        return;
      }

      setSuccess("Pemakaian berhasil disimpan!");
      setMeterAwal("");
      setMeterAkhir("");
      setMasalahTerpilih([]);
      setFotoMeteran(null);
      setFotoRumah(null);
      setFotoMeteranPreview(null);
      setFotoRumahPreview(null);

      setTimeout(() => {
        navigate("/scan");
      }, 1500);
    } catch (err) {
      console.error("Error saving pemakaian:", err);
      setError(`Gagal terhubung ke server: ${err.message || "Network error"}`);
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
    setSuccess("");

    if (!meterAwal) {
      setError("Isi meter awal terlebih dahulu");
      return;
    }

    const meterAwalNum = Number(meterAwal);
    if (isNaN(meterAwalNum)) {
      setError("Meter awal harus berupa angka yang valid");
      return;
    }

    setLoadingAvg(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/pemakaian/${pelanggan.id}/avg-3`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Tidak dapat menghitung rata-rata");
        setLoadingAvg(false);
        return;
      }

      const newMeterAkhir = meterAwalNum + data.rata_rata;
      setMeterAkhir(String(newMeterAkhir));
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
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
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
            <Input label="Meter Awal (m)" type="number" placeholder="0" value={meterAwal} onChange={(e) => setMeterAwal(e.target.value)} />

            <Input label="Meter Akhir (m)" type="number" placeholder="0" value={meterAkhir} onChange={(e) => setMeterAkhir(e.target.value)} />
          </div>

          {/* Pemakaian Display */}
          <div
            className={`rounded-lg p-6 ${
              peringatanPemakaian?.type === "error"
                ? "bg-gradient-to-br from-red-50 to-rose-100"
                : peringatanPemakaian?.type === "warning"
                ? "bg-gradient-to-br from-yellow-50 to-orange-100"
                : peringatanPemakaian?.type === "info"
                ? "bg-gradient-to-br from-cyan-50 to-blue-100"
                : "bg-gradient-to-br from-blue-50 to-indigo-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Total Pemakaian</p>
                <p
                  className={`text-4xl font-bold ${
                    peringatanPemakaian?.type === "error" ? "text-red-600" : peringatanPemakaian?.type === "warning" ? "text-orange-600" : peringatanPemakaian?.type === "info" ? "text-cyan-600" : "text-blue-600"
                  }`}
                >
                  {pemakaian}
                </p>
                <p className="text-sm text-gray-600">meter kubik</p>

                {peringatanPemakaian && (
                  <div
                    className={`mt-3 flex items-start space-x-2 p-3 rounded-lg ${
                      peringatanPemakaian.type === "error" ? "bg-red-100 border border-red-300" : peringatanPemakaian.type === "warning" ? "bg-yellow-100 border border-yellow-300" : "bg-cyan-100 border border-cyan-300"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${peringatanPemakaian.type === "error" ? "text-red-600" : peringatanPemakaian.type === "warning" ? "text-yellow-600" : "text-cyan-600"}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className={`text-sm font-medium ${peringatanPemakaian.type === "error" ? "text-red-800" : peringatanPemakaian.type === "warning" ? "text-yellow-800" : "text-cyan-800"}`}>{peringatanPemakaian.message}</p>
                  </div>
                )}
              </div>
              <svg
                className={`w-16 h-16 flex-shrink-0 ${
                  peringatanPemakaian?.type === "error" ? "text-red-300" : peringatanPemakaian?.type === "warning" ? "text-orange-300" : peringatanPemakaian?.type === "info" ? "text-cyan-300" : "text-blue-300"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>

          <Button onClick={() => setShowMasalah(true)} variant="warning" size="lg" className="w-full">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Lihat Daftar Masalah
          </Button>

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
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all">
                    <p className="truncate">{fotoMeteran?.name || "Foto Meteran"}</p>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-8">
                  <div className="bg-blue-50 rounded-full p-4 mb-3">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all">
                    <p className="truncate">{fotoRumah?.name || "Foto Rumah"}</p>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer py-8">
                  <div className="bg-green-50 rounded-full p-4 mb-3">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
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
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Simpan Pemakaian
            </>
          )}
        </Button>
        <Button onClick={loadRiwayat} variant="secondary" size="lg">
          <img src="/clock-history.svg" alt="History" className="w-5 h-5 mr-2" />
          Lihat Riwayat
        </Button>
      </div>

      {/* History */}
      {showRiwayat && riwayat.length > 0 && (
        <Card title="Riwayat 3 Bulan Terakhir">
          <div className="space-y-4">
            {riwayat.map((r, i) => {
              // Deteksi pemakaian tidak normal untuk riwayat
              const pemakaianRiwayat = r.pemakaian_kubik;
              let peringatanRiwayat = null;

              if (pemakaianRiwayat < 0) {
                peringatanRiwayat = { type: "warning", message: "Pemakaian minus!" };
              } else if (pemakaianRiwayat > 50) {
                peringatanRiwayat = { type: "error", message: "Pemakaian sangat tinggi!" };
              } else if (pemakaianRiwayat < 3 && pemakaianRiwayat > 0) {
                peringatanRiwayat = { type: "info", message: "Pemakaian sangat rendah" };
              }

              return (
                <div
                  key={i}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    peringatanRiwayat?.type === "error"
                      ? "border-red-300 bg-red-50/30"
                      : peringatanRiwayat?.type === "warning"
                      ? "border-yellow-300 bg-yellow-50/30"
                      : peringatanRiwayat?.type === "info"
                      ? "border-cyan-300 bg-cyan-50/30"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="info">
                      {MONTHS[r.periode_bulan - 1]} {r.periode_tahun}
                    </Badge>
                    <span className="text-sm text-gray-500">Petugas: {r.petugas}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Meter Awal</p>
                      <p className="text-lg font-semibold">{r.meter_awal} m</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Meter Akhir</p>
                      <p className="text-lg font-semibold">{r.meter_akhir} m</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Pemakaian</p>
                      <p
                        className={`text-lg font-semibold ${
                          peringatanRiwayat?.type === "error" ? "text-red-600" : peringatanRiwayat?.type === "warning" ? "text-yellow-600" : peringatanRiwayat?.type === "info" ? "text-cyan-600" : "text-blue-600"
                        }`}
                      >
                        {r.pemakaian_kubik} m³
                      </p>
                      {peringatanRiwayat && (
                        <div className="flex items-center mt-1">
                          <svg className={`w-4 h-4 mr-1 ${peringatanRiwayat.type === "error" ? "text-red-600" : peringatanRiwayat.type === "warning" ? "text-yellow-600" : "text-cyan-600"}`} fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className={`text-xs font-medium ${peringatanRiwayat.type === "error" ? "text-red-700" : peringatanRiwayat.type === "warning" ? "text-yellow-700" : "text-cyan-700"}`}>{peringatanRiwayat.message}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {(r.foto_meteran || r.foto_rumah) && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {r.foto_meteran && (
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Foto Meteran</p>
                          <img
                            src={r.foto_meteran}
                            alt="Meteran"
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              const images = [];
                              if (r.foto_meteran) images.push({ url: r.foto_meteran, label: `Foto Meteran - ${MONTHS[r.periode_bulan - 1]} ${r.periode_tahun}` });
                              if (r.foto_rumah) images.push({ url: r.foto_rumah, label: `Foto Rumah - ${MONTHS[r.periode_bulan - 1]} ${r.periode_tahun}` });
                              setSelectedImages(images);
                              setSelectedImageIndex(0);
                              setImageViewerOpen(true);
                            }}
                          />
                        </div>
                      )}
                      {r.foto_rumah && (
                        <div>
                          <p className="text-xs text-gray-600 mb-2">Foto Rumah</p>
                          <img
                            src={r.foto_rumah}
                            alt="Rumah"
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              const images = [];
                              if (r.foto_meteran) images.push({ url: r.foto_meteran, label: `Foto Meteran - ${MONTHS[r.periode_bulan - 1]} ${r.periode_tahun}` });
                              if (r.foto_rumah) images.push({ url: r.foto_rumah, label: `Foto Rumah - ${MONTHS[r.periode_bulan - 1]} ${r.periode_tahun}` });
                              setSelectedImages(images);
                              setSelectedImageIndex(r.foto_meteran ? 1 : 0);
                              setImageViewerOpen(true);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {r.masalah && r.masalah.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Riwayat Masalah</p>

                      <div className="flex flex-wrap gap-2">
                        {r.masalah.map((m, idx) => (
                          <span key={idx} className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 border border-red-300">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {showMasalah && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between sticky top-0 bg-white pb-2">
              <h2 className="text-xl font-bold text-gray-900">Pilih Masalah</h2>
              <button onClick={() => setShowMasalah(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Masalah yang sudah dipilih */}
            {masalahTerpilih.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-blue-900 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Masalah Terpilih ({masalahTerpilih.length})
                  </h3>
                  <button onClick={() => setMasalahTerpilih([])} className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline">
                    Hapus Semua
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {masalahTerpilih.map((id) => {
                    const masalah = DAFTAR_MASALAH.find((m) => m.id === id);
                    return (
                      <div key={id} className="bg-white border border-blue-300 rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm group hover:shadow-md transition-all">
                        <span className="text-sm text-gray-800">{masalah?.nama}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMasalah(id);
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1 transition-colors"
                          title="Hapus masalah ini"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Pilih dari Daftar</p>
              <p className="text-xs text-gray-500 mb-3">Klik pada item untuk memilih/membatalkan masalah</p>

              <ul className="text-sm space-y-2 max-h-64 overflow-y-auto">
                {DAFTAR_MASALAH.map((m) => (
                  <li
                    key={m.id}
                    onClick={() => toggleMasalah(m.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${masalahTerpilih.includes(m.id) ? "bg-blue-100 border-blue-500 shadow-sm" : "hover:bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{m.nama}</span>
                      {masalahTerpilih.includes(m.id) && (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={() => setShowMasalah(false)} variant="primary" size="lg" className="flex-1">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
                Selesai
              </Button>
            </div>
          </div>
        </div>
      )}

      {imageViewerOpen && <ImageViewer images={selectedImages} initialIndex={selectedImageIndex} onClose={() => setImageViewerOpen(false)} />}
    </div>
  );
}

export default InputKubik;
