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
      {/* Overlay untuk Mobile */}
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
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="avatar">A</div>
            <div className="user-info">
              <p className="u-name">Alta</p>
              <p className="u-role">Petugas Lapangan</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="header-title">{activeMenu.toUpperCase()}</h1>
          <div className="header-right"><div className="online-indicator"></div></div>
        </header>

        <div className="view-port">
          <div className="app-canvas">
            {activeMenu === 'pencatatan' && (
              <div className="pencatatan-flow animate-up">
                {/* Stepper Center */}
                <div className="stepper-box">
                  <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Pindai</div>
                  <ChevronRight size={14} />
                  <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Foto</div>
                  <ChevronRight size={14} />
                  <div className={`step ${step === 3 ? 'active' : ''}`}>3. Simpan</div>
                </div>

                <div className="grid-layout">
                  {/* Bagian Kiri: Kamera */}
                  <div className="card-panel visual-box">
                    <div className="camera-frame">
                      {step < 3 ? (
                        <>
                          <video ref={videoRef} autoPlay playsInline />
                          <div className={`frame-aim ${step === 1 ? 'qr' : 'meter'}`}>
                            <div className="laser"></div>
                          </div>
                        </>
                      ) : (
                        <div className="preview-container">
                           <img src={previewImage} alt="Captured" />
                        </div>
                      )}
                    </div>
                    <div className="button-area">
                      {step < 3 ? (
                        <button className="btn-capture" onClick={handleCapture}>
                          <div className="shutter-outer"><div className="shutter-inner"></div></div>
                          <span>AMBIL FOTO</span>
                        </button>
                      ) : (
                        <button className="btn-redo-full" onClick={() => setStep(2)}>
                          <RefreshCcw size={18} /> FOTO ULANG
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bagian Kanan: Data */}
                  <div className="card-panel data-box">
                    <div className="card-header"><h3>Data Pencatatan</h3></div>
                    <div className="card-body">
                      {step >= 2 && customer && (
                        <div className="pdam-info-card">
                          <label>IDENTITAS PELANGGAN</label>
                          <h4 className="high-contrast-text">{customer.nama}</h4>
                          <p className="sub-contrast-text">{customer.noPel}</p>
                        </div>
                      )}
                      {step === 3 && (
                        <div className="input-pdam-group">
                          <label>Angka Meteran (m³)</label>
                          <input type="number" value={meterValue} onChange={(e) => setMeterValue(e.target.value)} placeholder="0000" />
                          {isProcessing && <div className="loading-bar">Menganalisa...</div>}
                        </div>
                      )}
                    </div>
                    {step === 3 && (
                      <button className="btn-submit-full" onClick={() => alert('Data Terkirim')}>
                        <Send size={18} /> KIRIM SEKARANG
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Menu lain akan ditambahkan di sini */}
          </div>
        </div>
      </main>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;