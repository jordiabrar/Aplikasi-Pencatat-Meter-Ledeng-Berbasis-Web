import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { Card, Button, Badge, Alert } from "../components/ui";
import { MONTHS } from "../constants";
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, ChartBarIcon } from "@heroicons/react/24/solid";

function PelangganStatus() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("belum");

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
                ${activeTab === "belum" ? "border-yellow-600 text-yellow-700 bg-yellow-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"}
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
                ${activeTab === "sudah" ? "border-green-600 text-green-700 bg-green-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"}
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

        {/* Table Content */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          {activeTab === "belum" ? (
            data.belum_dicatat.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Semua pelanggan sudah dicatat!</p>
                <p className="text-gray-500 text-sm mt-1">Tidak ada pelanggan yang perlu dicatat</p>
              </div>
            ) : (
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelanggan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Seri Meter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

export default PelangganStatus;
