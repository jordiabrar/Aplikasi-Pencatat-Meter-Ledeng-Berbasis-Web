import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { Card, Button, Badge, Alert, Modal, ImageViewer } from "../components/ui";
import { MONTHS } from "../constants";
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/solid";

function PelangganStatus() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("belum");
  const [selectedPelanggan, setSelectedPelanggan] = useState(null);
  const [riwayatData, setRiwayatData] = useState([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [imageViewerData, setImageViewerData] = useState([]);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/pemakaian/status-bulan-ini`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Gagal mengambil data");
      }

      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRiwayat = async (pelangganId) => {
    try {
      setLoadingRiwayat(true);
      const res = await fetch(`${API_BASE_URL}/api/pemakaian/${pelangganId}/last-3`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error("Gagal mengambil riwayat");
      }

      setRiwayatData(json);
    } catch (err) {
      console.error("Error fetching riwayat:", err);
      setRiwayatData([]);
    } finally {
      setLoadingRiwayat(false);
    }
  };

  const handlePelangganClick = async (pelanggan) => {
    setSelectedPelanggan(pelanggan);
    await fetchRiwayat(pelanggan.id);
  };

  const closeModal = () => {
    setSelectedPelanggan(null);
    setRiwayatData([]);
  };

  const openImageViewer = (images, startIndex = 0) => {
    setImageViewerData(images);
    setImageViewerIndex(startIndex);
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
    setImageViewerData([]);
    setImageViewerIndex(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Alert type="error" title="Error" message={error} />
      </div>
    );
  }

  const totalPelanggan = data.sudah_dicatat.length + data.belum_dicatat.length;
  const persenSelesai = totalPelanggan > 0 ? Math.round((data.sudah_dicatat.length / totalPelanggan) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Status Pencatatan</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Periode: {MONTHS[data.bulan - 1]} {data.tahun}
          </p>
        </div>
        <Button onClick={() => navigate("/scan")} variant="secondary" size="md" className="w-full sm:w-auto">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900">Sudah Dicatat</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{data.sudah_dicatat.length}</p>
              <p className="text-xs text-green-700 mt-1">pelanggan</p>
            </div>
            <div className="bg-green-500 rounded-full p-3">
              <CheckCircleIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-900">Belum Dicatat</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{data.belum_dicatat.length}</p>
              <p className="text-xs text-yellow-700 mt-1">pelanggan</p>
            </div>
            <div className="bg-yellow-500 rounded-full p-3">
              <ClockIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{persenSelesai}%</p>
              <p className="text-xs text-blue-700 mt-1">selesai</p>
            </div>
            <div className="bg-blue-500 rounded-full p-3">
              <ChartBarIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${persenSelesai}%` }} />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200 mb-4 sm:mb-6">
          <nav className="-mb-px flex justify-center space-x-4 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("belum")}
              className={`
                py-3 sm:py-4 px-4 sm:px-6 border-b-3 font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 flex items-center whitespace-nowrap
                ${activeTab === "belum" 
                  ? "border-yellow-600 text-yellow-700 bg-yellow-50/50" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"}
              `}
            >
              <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Belum Dicatat</span>
              <span className="sm:hidden">Belum</span>
              <Badge variant="warning" size="sm" className="ml-2">
                {data.belum_dicatat.length}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab("sudah")}
              className={`
                py-3 sm:py-4 px-4 sm:px-6 border-b-3 font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 flex items-center whitespace-nowrap
                ${activeTab === "sudah" 
                  ? "border-green-600 text-green-700 bg-green-50/50" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"}
              `}
            >
              <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Sudah Dicatat</span>
              <span className="sm:hidden">Sudah</span>
              <Badge variant="success" size="sm" className="ml-2">
                {data.sudah_dicatat.length}
              </Badge>
            </button>
          </nav>
        </div>

        {/* Table Content - Responsive */}
        <div>
          {activeTab === "belum" ? (
            data.belum_dicatat.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Semua pelanggan sudah dicatat!</p>
                <p className="text-gray-500 text-sm mt-1">Tidak ada pelanggan yang perlu dicatat</p>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block md:hidden space-y-3">
                  {data.belum_dicatat.map((p) => (
                    <div key={p.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">#{p.id}</span>
                        <h3 className="font-semibold text-gray-900">{p.nama}</h3>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex gap-2">
                          <span className="text-gray-500 w-20">No Seri:</span>
                          <code className="bg-white px-2 py-0.5 rounded text-xs border">{p.nomor_seri_meter}</code>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-gray-500 w-20">Alamat:</span>
                          <span className="text-gray-700">{p.alamat || "-"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelanggan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Seri Meter</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.belum_dicatat.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.nama}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <code className="bg-gray-100 px-2 py-1 rounded">{p.nomor_seri_meter}</code>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{p.alamat || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )
          ) : data.sudah_dicatat.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-gray-600 font-medium">Belum ada yang dicatat</p>
              <p className="text-gray-500 text-sm mt-1">Mulai pencatatan sekarang!</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block md:hidden space-y-3">
                {data.sudah_dicatat.map((p) => (
                  <div 
                    key={p.id} 
                    className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors cursor-pointer"
                    onClick={() => handlePelangganClick(p)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">#{p.id}</span>
                        <h3 className="font-semibold text-gray-900">{p.nama}</h3>
                      </div>
                      <Badge variant="success">Selesai</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-500 w-20">No Seri:</span>
                        <code className="bg-white px-2 py-0.5 rounded text-xs border">{p.nomor_seri_meter}</code>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-500 w-20">Alamat:</span>
                        <span className="text-gray-700">{p.alamat || "-"}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-blue-600 font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Lihat Riwayat
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelanggan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Seri Meter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.sudah_dicatat.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.nama}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <code className="bg-gray-100 px-2 py-1 rounded">{p.nomor_seri_meter}</code>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{p.alamat || "-"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="success">Selesai</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handlePelangganClick(p)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Lihat Riwayat
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Modal Riwayat Pemakaian */}
      <Modal
        isOpen={selectedPelanggan !== null}
        onClose={closeModal}
        title={`Riwayat Pemakaian - ${selectedPelanggan?.nama}`}
        size="xl"
      >
        {loadingRiwayat ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat riwayat...</p>
            </div>
          </div>
        ) : riwayatData.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 font-medium">Belum ada riwayat pemakaian</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Info Pelanggan */}
            {selectedPelanggan && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 font-medium">ID Pelanggan:</span>
                    <span className="ml-2 text-gray-900 font-semibold">#{selectedPelanggan.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">No Seri Meter:</span>
                    <code className="ml-2 bg-white px-2 py-1 rounded text-xs border">{selectedPelanggan.nomor_seri_meter}</code>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-600 font-medium">Alamat:</span>
                    <span className="ml-2 text-gray-900">{selectedPelanggan.alamat || "-"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Riwayat Cards */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {riwayatData.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                  {/* Header Periode */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {MONTHS[item.periode_bulan - 1]} {item.periode_tahun}
                        </h4>
                        <p className="text-xs text-gray-500">Dicatat oleh: {item.petugas || "N/A"}</p>
                      </div>
                    </div>
                    <Badge variant="info" size="sm">{item.pemakaian_kubik} m³</Badge>
                  </div>

                  {/* Detail Pemakaian */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Meter Awal</p>
                      <p className="text-lg font-bold text-gray-900">{item.meter_awal}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Meter Akhir</p>
                      <p className="text-lg font-bold text-gray-900">{item.meter_akhir}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 col-span-2 md:col-span-1">
                      <p className="text-xs text-blue-600 mb-1">Pemakaian</p>
                      <p className="text-lg font-bold text-blue-700">{item.pemakaian_kubik} m³</p>
                    </div>
                  </div>

                  {/* Masalah */}
                  {item.masalah && item.masalah.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-2">Masalah:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.masalah.map((m, idx) => (
                          <Badge key={idx} variant="warning" size="sm">{m}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Foto */}
                  {(item.foto_meteran || item.foto_rumah) && (
                    <div className="grid grid-cols-2 gap-3">
                      {item.foto_meteran && (
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Foto Meteran</p>
                          <img
                            src={item.foto_meteran}
                            alt="Meteran"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => {
                              const images = [];
                              if (item.foto_meteran) {
                                images.push({ url: item.foto_meteran, label: `Foto Meteran - ${MONTHS[item.periode_bulan - 1]} ${item.periode_tahun}` });
                              }
                              if (item.foto_rumah) {
                                images.push({ url: item.foto_rumah, label: `Foto Rumah - ${MONTHS[item.periode_bulan - 1]} ${item.periode_tahun}` });
                              }
                              openImageViewer(images, 0);
                            }}
                          />
                        </div>
                      )}
                      {item.foto_rumah && (
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Foto Rumah</p>
                          <img
                            src={item.foto_rumah}
                            alt="Rumah"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => {
                              const images = [];
                              if (item.foto_meteran) {
                                images.push({ url: item.foto_meteran, label: `Foto Meteran - ${MONTHS[item.periode_bulan - 1]} ${item.periode_tahun}` });
                              }
                              if (item.foto_rumah) {
                                images.push({ url: item.foto_rumah, label: `Foto Rumah - ${MONTHS[item.periode_bulan - 1]} ${item.periode_tahun}` });
                              }
                              openImageViewer(images, 1);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Image Viewer */}
      {imageViewerOpen && (
        <ImageViewer
          images={imageViewerData}
          initialIndex={imageViewerIndex}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}

export default PelangganStatus;
