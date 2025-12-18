import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, QrCode, Droplets, CheckCircle, RefreshCcw, 
  Menu, X, Gauge, Send, User, ChevronDown, History, Zap
} from 'lucide-react';
import Tesseract from 'tesseract.js';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const [activeMenu, setActiveMenu] = useState('scan_qr'); // Menu: scan_qr, scan_meter, riwayat
  const [previewImage, setPreviewImage] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [meterValue, setMeterValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPetugasOpen, setIsPetugasOpen] = useState(false);
  const [selectedPetugas, setSelectedPetugas] = useState('Alta (Kimora)');

  const daftarPetugas = [
    { name: 'Alta (Kimora)', area: 'Area 01' },
    { name: 'Budi Gunawan', area: 'Area 02' },
    { name: 'Siti Aminah', area: 'Area 03' }
  ];

  // Efek untuk menyalakan kamera hanya pada menu scan
  useEffect(() => {
    if (activeMenu === 'scan_qr' || activeMenu === 'scan_meter') {
      startCamera();
    }
  }, [activeMenu]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Akses kamera ditolak");
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if(!video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/png');

    if (activeMenu === 'scan_qr') {
      // Menu Scan QR: Identifikasi Pelanggan saja
      setCustomer({ nama: "Budi Setiadi", noPel: "109928374", alamat: "Jl. Tirta Utama No. 8" });
    } else {
      // Menu Scan Meter: Memproses OCR
      setPreviewImage(data);
      runOCR(data);
    }
  };

  const runOCR = (img) => {
    setIsProcessing(true);
    Tesseract.recognize(img, 'eng').then(({ data: { text } }) => {
      const numbers = text.replace(/[^0-9]/g, "");
      setMeterValue(numbers);
      setIsProcessing(false);
    });
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sb-open' : 'sb-closed'}`}>
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo"><Droplets size={22} /></div>
          <span>KIMORA <span className="text-blue">FLOW</span></span>
        </div>
        
        <nav className="nav-menu">
          <div className={`nav-item ${activeMenu === 'scan_qr' ? 'active' : ''}`} 
               onClick={() => { setActiveMenu('scan_qr'); setSidebarOpen(false); setCustomer(null); }}>
            <QrCode size={20} /> <span>Pindai QR Pelanggan</span>
          </div>
          <div className={`nav-item ${activeMenu === 'scan_meter' ? 'active' : ''}`} 
               onClick={() => { setActiveMenu('scan_meter'); setSidebarOpen(false); setPreviewImage(null); }}>
            <Camera size={20} /> <span>Pindai Angka Meter</span>
          </div>
          <div className={`nav-item ${activeMenu === 'riwayat' ? 'active' : ''}`} 
               onClick={() => { setActiveMenu('riwayat'); setSidebarOpen(false); }}>
            <History size={20} /> <span>Riwayat Tugas</span>
          </div>

          <div className="nav-dropdown-wrapper">
            <div className="nav-item dropdown-trigger" onClick={() => setIsPetugasOpen(!isPetugasOpen)}>
              <User size={20} /> <span>Petugas</span>
              <ChevronDown size={14} className={`arrow-icon ${isPetugasOpen ? 'rotate' : ''}`} />
            </div>
            {isPetugasOpen && (
              <div className="dropdown-list-container">
                {daftarPetugas.map((p, i) => (
                  <div key={i} className="dropdown-list-item" onClick={() => { setSelectedPetugas(p.name); setIsPetugasOpen(false); }}>
                    <p className="p-name-small">{p.name}</p>
                    <p className="p-area-small">{p.area}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-summary">
            <div className="p-avatar-small">{selectedPetugas[0]}</div>
            <div className="p-info-small">
              <p className="p-name-bold">{selectedPetugas}</p>
              <p className="p-status-tag">Petugas Aktif</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <button className="menu-trigger" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          {/* Judul Muncul di Tengah Desktop & Mobile */}
          <h1 className="header-title-center">
            {activeMenu === 'scan_qr' ? 'PINDAI QR' : activeMenu === 'scan_meter' ? 'PINDAI METER' : 'RIWAYAT'}
          </h1>
          
          <div className="header-right"><div className="online-dot"></div></div>
        </header>

        <div className="scroll-container">
          <div className="content-layout">
            {(activeMenu === 'scan_qr' || activeMenu === 'scan_meter') ? (
              <div className="main-grid animate-up">
                <div className="card-glass visual-panel">
                  <div className="camera-viewfinder">
                    <video ref={videoRef} autoPlay playsInline />
                    <div className={`aim-guide ${activeMenu === 'scan_qr' ? 'qr' : 'meter'}`}>
                      <div className="laser-line"></div>
                    </div>
                  </div>
                  <div className="action-area">
                    <button className="btn-capture-pdam" onClick={handleCapture}>
                      <div className="shutter-ring"><div className="shutter-dot"></div></div>
                      <span>AMBIL {activeMenu === 'scan_qr' ? 'QR' : 'ANGKA'}</span>
                    </button>
                  </div>
                </div>

                <div className="card-glass form-panel">
                  <div className="card-header"><h3>Data Lapangan</h3></div>
                  <div className="card-body">
                    {customer ? (
                      <div className="pdam-info-card-high">
                        <label>HASIL IDENTIFIKASI</label>
                        <h4 className="text-heavy-dark">{customer.nama}</h4>
                        <p className="text-heavy-gray">{customer.noPel} • {customer.alamat}</p>
                      </div>
                    ) : activeMenu === 'scan_qr' ? (
                      <p className="hint-text">Arahkan kamera ke QR pelanggan.</p>
                    ) : null}

                    {activeMenu === 'scan_meter' && (
                      <div className="input-field-group">
                        <label>Indeks Meteran (m³)</label>
                        <input type="number" value={meterValue} onChange={(e) => setMeterValue(e.target.value)} placeholder="0000" />
                        {isProcessing ? <div className="ocr-status">Membaca...</div> : meterValue && <p className="ai-status"><Zap size={12}/> Terisi otomatis</p>}
                        <button className="btn-submit-main" onClick={() => alert('Laporan Dikirim')}>
                          <Send size={18} /> KIRIM DATA
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-glass full-card animate-up">
                <h2>Riwayat Tugas</h2>
                <div className="history-list">
                  {[1,2,3].map(i => (
                    <div key={i} className="list-item">
                      <div><p className="item-t">Pelanggan #00{i}</p><span>Sukses Terverifikasi</span></div>
                      <span className="badge-ok">TERKIRIM</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;