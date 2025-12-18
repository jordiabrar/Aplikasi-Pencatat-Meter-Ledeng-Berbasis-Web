import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, QrCode, Droplets, CheckCircle, RefreshCcw, 
  Menu, X, Gauge, Send, User, ChevronRight, History, Settings, LogOut
} from 'lucide-react';
import Tesseract from 'tesseract.js';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const [activeMenu, setActiveMenu] = useState('pencatatan'); 
  const [step, setStep] = useState(1); 
  const [previewImage, setPreviewImage] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [meterValue, setMeterValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (activeMenu === 'pencatatan' && step < 3) startCamera();
  }, [step, activeMenu]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Kamera akses ditolak");
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

    if (step === 1) {
      setCustomer({ nama: "Budi Setiadi", noPel: "109928374", alamat: "Jl. Tirta Utama No. 8" });
      setStep(2);
    } else {
      setPreviewImage(data);
      setStep(3);
      runOCR(data);
    }
  };

  const runOCR = (img) => {
    setIsProcessing(true);
    Tesseract.recognize(img, 'eng').then(({ data: { text } }) => {
      setMeterValue(text.replace(/[^0-9]/g, ""));
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
          <div className={`nav-item ${activeMenu === 'pencatatan' ? 'active' : ''}`} 
               onClick={() => { setActiveMenu('pencatatan'); setSidebarOpen(false); }}>
            <Gauge size={20} /> <span>Pencatatan</span>
          </div>
          <div className={`nav-item ${activeMenu === 'riwayat' ? 'active' : ''}`} 
               onClick={() => { setActiveMenu('riwayat'); setSidebarOpen(false); }}>
            <History size={20} /> <span>Riwayat</span>
          </div>
          <div className={`nav-item ${activeMenu === 'profil' ? 'active' : ''}`} 
               onClick={() => { setActiveMenu('profil'); setSidebarOpen(false); }}>
            <User size={20} /> <span>Profil Akun</span>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <button className="menu-trigger" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="page-title">{activeMenu.toUpperCase()}</h1>
          <div className="header-status"><div className="online-dot"></div></div>
        </header>

        <div className="scroll-area">
          <div className="centered-content">
            {activeMenu === 'pencatatan' ? (
              <div className="workflow-pencatatan animate-in">
                <div className="stepper">
                  <div className={`step-node ${step >= 1 ? 'active' : ''}`}>1. Pindai</div>
                  <ChevronRight size={14} className="arrow" />
                  <div className={`step-node ${step >= 2 ? 'active' : ''}`}>2. Foto</div>
                  <ChevronRight size={14} className="arrow" />
                  <div className={`step-node ${step === 3 ? 'active' : ''}`}>3. Simpan</div>
                </div>

                <div className="split-layout">
                  <div className="card-ui camera-box">
                    <div className="camera-viewfinder">
                      {step < 3 ? (
                        <>
                          <video ref={videoRef} autoPlay playsInline />
                          <div className={`guide-box ${step === 1 ? 'qr' : 'meter'}`}>
                            <div className="laser-line"></div>
                          </div>
                        </>
                      ) : (
                        <img src={previewImage} alt="Captured" />
                      )}
                    </div>
                    <div className="camera-actions">
                      {step < 3 ? (
                        <button className="shutter-main" onClick={handleCapture}>
                          <div className="shutter-circle"></div>
                          <span>AMBIL FOTO</span>
                        </button>
                      ) : (
                        <button className="btn-secondary" onClick={() => setStep(2)}>
                          <RefreshCcw size={16} /> FOTO ULANG
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="card-ui data-panel">
                    <div className="card-header"><h3>Informasi Laporan</h3></div>
                    <div className="card-body">
                      {step >= 2 && customer && (
                        <div className="customer-card">
                          <label>PELANGGAN AKTIF</label>
                          <h4>{customer.nama}</h4>
                          <p>{customer.noPel}</p>
                        </div>
                      )}
                      {step === 3 && (
                        <div className="input-group">
                          <label>Angka Kubik Meteran (m³)</label>
                          <input type="number" value={meterValue} onChange={(e) => setMeterValue(e.target.value)} />
                          {isProcessing && <div className="loader-text">AI memproses foto...</div>}
                        </div>
                      )}
                    </div>
                    {step === 3 && (
                      <button className="btn-primary" onClick={() => alert('Data Terkirim')}>
                        <Send size={18} /> KIRIM SEKARANG
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : activeMenu === 'riwayat' ? (
              <div className="card-ui full-card animate-in">
                <h2>Riwayat Pencatatan</h2>
                <div className="history-list">
                  {[1,2,3].map(i => (
                    <div key={i} className="history-item">
                      <div><p>Pelanggan #00{i}</p><span>18 Des 2025</span></div>
                      <span className="badge-status">Selesai</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card-ui profile-card animate-in text-center">
                <div className="avatar-big">A</div>
                <h2>Alta (Petugas Lapangan)</h2>
                <div className="profile-menu">
                  <div className="p-item"><Settings size={18}/> Pengaturan</div>
                  <div className="p-item logout"><LogOut size={18}/> Keluar</div>
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