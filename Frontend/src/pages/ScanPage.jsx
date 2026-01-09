import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "../components/QrScanner";
import SeriScanner from "../components/SeriScanner";
import QrGenerator from "../components/QrGenerator";
import { Card, Button } from "../components/ui";
import { DevicePhoneMobileIcon, CameraIcon, CogIcon } from "@heroicons/react/24/solid";

function ScanPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("qr");

  const handleSuccess = (pelanggan) => {
    navigate("/input-kubik", {
      state: { pelanggan },
    });
  };

  const keStatusPelanggan = () => {
    navigate("/status-pelanggan");
  };

  const tabs = [
    { id: "qr", label: "Scan QR / ID", icon: DevicePhoneMobileIcon },
    { id: "seri", label: "Scan Seri Meter", icon: CameraIcon },
    { id: "generator", label: "Generate QR", icon: CogIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Pencatatan</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Pilih metode identifikasi pelanggan</p>
        </div>

        <Button onClick={keStatusPelanggan} variant="info" size="md" className="w-full sm:w-auto">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Status Pelanggan
        </Button>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-gray-200 mb-4 sm:mb-6">
          <nav className="-mb-px flex justify-center space-x-2 sm:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-3 sm:py-4 px-3 sm:px-6 border-b-3 font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex items-center
                  ${activeTab === tab.id ? "border-blue-600 text-blue-700 bg-blue-50/50" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"}
                `}
              >
                <tab.icon className="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "qr" && <QrScanner onSuccess={handleSuccess} />}
          {activeTab === "seri" && <SeriScanner onSuccess={handleSuccess} />}
          {activeTab === "generator" && <QrGenerator />}
        </div>
      </Card>
    </div>
  );
}

export default ScanPage;
