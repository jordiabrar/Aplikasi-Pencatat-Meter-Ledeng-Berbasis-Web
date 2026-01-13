# Sistem Pencatatan Meter Air - Tirta Musi

Aplikasi web untuk pencatatan pembacaan meter air menggunakan teknologi OCR (Optical Character Recognition) dan QR Code scanner.

## 📋 Fitur

- **Autentikasi**: Login dan registrasi petugas pencatat
- **Scan QR Code**: Identifikasi pelanggan melalui QR code
- **OCR Seri Meter**: Baca nomor seri meter menggunakan kamera
- **Input Pemakaian**: Catat meter awal, akhir, dan pemakaian kubik
- **Riwayat 3 Bulan**: Lihat riwayat pemakaian 3 bulan terakhir
- **Rata-rata Otomatis**: Hitung meter akhir berdasarkan rata-rata 3 bulan
- **Status Pelanggan**: Monitor pelanggan yang sudah/belum dicatat per bulan
- **Upload Foto**: Simpan foto meteran dan rumah

## 🛠️ Teknologi

### Backend

- Flask (Python web framework)
- MySQL + PyMySQL (Database)
- SQLAlchemy (ORM)
- OpenCV + Pytesseract (OCR)
- Flask-CORS (Cross-origin support)

### Frontend

- React + Vite
- React Router (Navigation)
- Axios (HTTP client)
- html5-qrcode (QR scanner)
- react-easy-crop (Image cropping)
- Tesseract.js (OCR di browser)

## 📁 Struktur Proyek

```
.
├── Backend/
│   ├── routes/           # API endpoints
│   │   ├── auth_api.py
│   │   ├── pelanggan_api.py
│   │   ├── pemakaian_api.py
│   │   └── seri_meter.py
│   ├── utils/            # Helper functions
│   │   └── image_processing.py
│   ├── app.py            # Application factory
│   ├── config.py         # Configuration
│   ├── db.py             # Database initialization
│   ├── models.py         # Database models
│   ├── requirements.txt  # Python dependencies
│   ├── .env.example      # Environment variables template
│   └── uploads/          # Uploaded images
│
└── Frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   │   ├── ui/       # UI components (Button, Input, Card, etc)
    │   │   ├── QrGenerator.jsx
    │   │   ├── QrScanner.jsx
    │   │   └── SeriScanner.jsx
    │   ├── pages/        # Page components
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── ScanPage.jsx
    │   │   ├── InputKubik.jsx
    │   │   └── PelangganStatus.jsx
    │   ├── layouts/      # Layout components
    │   │   ├── AuthLayout.jsx
    │   │   └── MainLayout.jsx
    │   ├── hooks/        # Custom React hooks
    │   │   ├── useAuth.js
    │   │   └── useFetch.js
    │   ├── utils/        # Helper functions
    │   ├── constants/    # Constants and configs
    │   ├── api.js        # API configuration
    │   └── App.jsx       # Main app component
    ├── .env.example      # Environment variables template
    └── package.json      # Node dependencies
```

## 🚀 Setup & Instalasi

### Prerequisites

1. **Python 3.8+**
2. **Node.js 16+** dan npm
3. **MySQL Server**
4. **Tesseract OCR** (untuk backend OCR)
   - Windows: Download dari [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)
   - Linux: `sudo apt-get install tesseract-ocr`
   - Mac: `brew install tesseract`

### Backend Setup

1. **Clone repository dan masuk ke folder Backend**

   ```bash
   cd Backend
   ```

2. **Buat virtual environment**

   ```bash
   python -m venv venv
   ```

3. **Aktifkan virtual environment**

   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Setup database MySQL**

   ```sql
   CREATE DATABASE meter_tirta_musi;
   ```

6. **Konfigurasi environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit file `.env` sesuai kebutuhan:

   ```env
   SECRET_KEY=your-secret-key-here
   DB_USER=root
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_NAME=meter_tirta_musi

   # Jika Tesseract tidak di PATH, set manual:
   # TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
   ```

7. **Jalankan aplikasi**

   ```bash
   python app.py
   ```

   Backend akan berjalan di `http://localhost:5000`

### Frontend Setup

1. **Masuk ke folder Frontend**

   ```bash
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit file `.env`:

   ```env
   VITE_API_BASE=http://localhost:5000
   ```

4. **Jalankan aplikasi**

   ```bash
   npm run dev
   ```

   Frontend akan berjalan di `http://localhost:5173`

## 📊 Database Schema

### Tabel: `pelanggan`

- `id` (INT, PK)
- `nomor_seri_meter` (VARCHAR, UNIQUE)
- `nama_pelanggan` (VARCHAR)
- `alamat` (TEXT)
- `golongan` (VARCHAR)

### Tabel: `pemakaian_meter`

- `id` (INT, PK)
- `pelanggan_id` (INT, FK)
- `nomor_seri_meter` (VARCHAR)
- `meter_awal` (INT)
- `meter_akhir` (INT)
- `pemakaian_kubik` (INT)
- `periode_bulan` (INT)
- `periode_tahun` (INT)
- `foto_meteran` (VARCHAR)
- `foto_rumah` (VARCHAR)
- `tanggal_catat` (DATETIME)
- `petugas` (VARCHAR)
- `keterangan` (TEXT)
- UNIQUE: `pelanggan_id`, `periode_bulan`, `periode_tahun`

### Tabel: `pencatat_meter`

- `id` (INT, PK)
- `username` (VARCHAR, UNIQUE)
- `email` (VARCHAR, UNIQUE)
- `password` (VARCHAR, hashed)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register petugas baru
- `POST /api/auth/login` - Login petugas
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Pelanggan

- `GET /api/pelanggan/id/:id` - Get pelanggan by ID
- `GET /api/pelanggan/seri/:nomor_seri` - Get pelanggan by nomor seri

### Pemakaian

- `POST /api/pemakaian` - Tambah pemakaian baru
- `GET /api/pemakaian/:pelanggan_id/last-3` - Get 3 bulan terakhir
- `GET /api/pemakaian/:pelanggan_id/avg-3` - Get rata-rata 3 bulan
- `GET /api/pemakaian/status-bulan-ini` - Status pencatatan bulan ini

### OCR

- `POST /api/seri-meter` - Scan nomor seri meter dari foto

### Static Files

- `GET /uploads/:filename` - Serve uploaded images

## 📱 Cara Penggunaan

1. **Login** dengan akun petugas
2. **Scan QR Code** atau input ID pelanggan untuk identifikasi
3. **Scan Seri Meter** menggunakan kamera (atau input manual)
4. **Input Data Pemakaian**:
   - Isi meter awal dan akhir
   - Atau gunakan fitur "Rata-rata 3 Bulan"
   - Upload foto meteran dan rumah
5. **Simpan** data pemakaian
6. **Monitor** status pencatatan di menu "Status Pelanggan"

## 🔧 Development

### Backend Development

```bash
cd Backend
source venv/bin/activate  # atau venv\Scripts\activate di Windows
python app.py
```

### Frontend Development

```bash
cd Frontend
npm run dev
```

### Build untuk Production

```bash
cd Frontend
npm run build
```

## 🐛 Troubleshooting

### Tesseract Error

Jika OCR tidak bekerja, pastikan:

1. Tesseract sudah terinstall
2. Path Tesseract sudah benar di `.env` (jika diperlukan)
3. Coba set manual: `TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe`

### Database Connection Error

1. Pastikan MySQL server berjalan
2. Cek kredensial database di `.env`
3. Pastikan database sudah dibuat

### CORS Error

1. Pastikan `CORS_ORIGINS` di backend `.env` sesuai dengan URL frontend
2. Default: `http://localhost:5173,http://localhost:3000`

## 📝 License

Private project - Tirta Musi

## 👥 Contributors

- Developer Team

---

**Note**: Pastikan untuk mengubah `SECRET_KEY` dan credentials database di production!
