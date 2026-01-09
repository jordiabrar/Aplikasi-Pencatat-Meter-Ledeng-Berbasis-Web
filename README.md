# 💧 Sistem Pencatatan Meter Air - Tirta Musi

Aplikasi web modern untuk pencatatan pembacaan meter air menggunakan teknologi OCR (Optical Character Recognition) dan QR Code scanner.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Python](https://img.shields.io/badge/python-3.8+-blue)
![React](https://img.shields.io/badge/react-18.2-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Fitur Utama

### 🔐 Autentikasi

- Login dan registrasi petugas pencatat
- Session management dengan Flask

### 📱 Multiple Scan Options

1. **Scan QR Code** - Identifikasi pelanggan melalui QR code (tercepat)
2. **Scan Seri Meter** - Baca nomor seri meter menggunakan OCR/kamera
3. **Input Manual** - Cari pelanggan by ID atau nomor seri

### 📊 Pencatatan Pemakaian

- Input meter awal, meter akhir, dan pemakaian kubik (auto-calculate)
- Upload foto meteran dan rumah
- Validasi otomatis (meter akhir >= meter awal)

### 📈 Monitoring & Reporting

- **Riwayat 3 Bulan** - Lihat pemakaian 3 bulan terakhir
- **Rata-rata Otomatis** - Hitung estimasi berdasarkan rata-rata
- **Status Pelanggan** - Monitor pelanggan sudah/belum dicatat per bulan
- **Generate QR Code** - Generate dan download QR untuk pelanggan

---

## 🛠️ Teknologi Stack

### Backend

- **Flask** - Python web framework
- **MySQL + PyMySQL** - Database
- **SQLAlchemy** - ORM
- **OpenCV + Pytesseract** - OCR untuk scan seri meter
- **Flask-CORS** - Cross-origin support
- **Werkzeug** - Password hashing

### Frontend

- **React 18** + Vite - Modern UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **html5-qrcode** - QR scanner
- **qrcode.react** - QR generator
- **react-easy-crop** - Image cropping
- **TailwindCSS** - Styling

---

## 🚀 Quick Start

### Prerequisites

Pastikan sudah terinstall:

✅ **Python 3.8+** - [Download](https://www.python.org/downloads/)  
✅ **Node.js 16+** dan npm - [Download](https://nodejs.org/)  
✅ **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)  
✅ **Tesseract OCR** - Untuk fitur Scan Seri Meter

- **Windows**: Download dari [Tesseract UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
- **Linux**: `sudo apt-get install tesseract-ocr`
- **Mac**: `brew install tesseract`

---

## 📦 Instalasi

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/meter-air-tirta-musi.git
cd meter-air-tirta-musi
```

---

### 2️⃣ Setup Backend (Flask + MySQL)

#### A. Masuk ke direktori backend

```bash
cd Backend
```

#### B. Buat virtual environment

```bash
python -m venv venv
```

#### C. Aktifkan virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

**Linux/Mac:**

```bash
source venv/bin/activate
```

#### D. Install dependencies

```bash
pip install -r requirements.txt
```

#### E. Setup Database MySQL

**1. Login ke MySQL:**

```bash
mysql -u root -p
```

**2. Buat database:**

```sql
CREATE DATABASE meter_tirta_musi;
EXIT;
```

#### F. Konfigurasi Environment Variables

**1. Copy `.env.example` menjadi `.env`:**

**Windows:**

```bash
copy .env.example .env
```

**Linux/Mac:**

```bash
cp .env.example .env
```

**2. Edit file `Backend/.env` dengan text editor:**

```env
# Database Configuration
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_HOST=localhost
DB_PORT=3306
DB_NAME=meter_tirta_musi

# Flask Configuration
SECRET_KEY=ganti-dengan-random-string-yang-aman
DEBUG=True

# Server Configuration
HOST=0.0.0.0
PORT=5000

# CORS Configuration (Frontend URL)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Tesseract OCR Path (opsional - auto-detect jika di PATH)
# Windows (uncomment jika Tesseract tidak terdeteksi otomatis):
# TESSERACT_CMD=C:/Program Files/Tesseract-OCR/tesseract.exe

# Linux/Mac: kosongkan jika sudah di PATH
```

> **⚠️ PENTING:** Ganti `DB_PASSWORD` dengan password MySQL Anda!

#### G. Inisialisasi Database Tables

```bash
python
```

Di Python shell, jalankan:

```python
from app import app, db
with app.app_context():
    db.create_all()
    print("✅ Database tables created successfully!")
exit()
```

#### H. (Opsional) Insert Sample Data

Jika ingin menambahkan data pelanggan contoh:

```python
python
```

```python
from app import app, db
from models import Pelanggan

with app.app_context():
    # Sample pelanggan
    pelanggan1 = Pelanggan(
        nama_pelanggan="Ahmad Fauzi",
        alamat="Jl. Merdeka No.1",
        nomor_seri_meter="SM100001",
        golongan="Rumah Tangga"
    )

    pelanggan2 = Pelanggan(
        nama_pelanggan="Siti Aisyah",
        alamat="Jl. Sudirman No.5",
        nomor_seri_meter="SM100002",
        golongan="Rumah Tangga"
    )

    db.session.add(pelanggan1)
    db.session.add(pelanggan2)
    db.session.commit()

    print("✅ Sample data inserted!")
exit()
```

#### I. Jalankan Backend Server

```bash
python app.py
```

✅ **Backend berjalan di: `http://localhost:5000`**

Biarkan terminal ini tetap berjalan!

---

### 3️⃣ Setup Frontend (React + Vite)

**Buka terminal BARU** (jangan tutup terminal backend)

#### A. Masuk ke direktori frontend

```bash
cd Frontend
```

#### B. Install dependencies

```bash
npm install
```

#### C. Konfigurasi Environment Variables

**1. Copy `.env.example` menjadi `.env`:**

**Windows:**

```bash
copy .env.example .env
```

**Linux/Mac:**

```bash
cp .env.example .env
```

**2. Edit file `Frontend/.env`:**

```env
VITE_API_BASE_URL=http://localhost:5000
```

> **Note:** Jika backend berjalan di port lain, sesuaikan URL-nya.

#### D. Jalankan Frontend Development Server

```bash
npm run dev
```

✅ **Frontend berjalan di: `http://localhost:5173`**

---

## 🎉 Akses Aplikasi

Buka browser dan akses: **http://localhost:5173**

### Default Login (Jika Ada User)

Jika tidak ada user, buat account baru di halaman **Signup**.

---

## 📖 Cara Menggunakan

### 1. Register/Login

- Buka aplikasi → Klik **"Signup"** untuk registrasi
- Isi username, email, dan password
- Login dengan kredensial yang dibuat

### 2. Generate QR Code untuk Pelanggan

- Tab **"Generate QR Code"**
- Masukkan ID pelanggan (misal: 1, 2, 3)
- Download QR code
- Print dan tempel di rumah pelanggan

### 3. Scan QR Code (Metode Tercepat)

- Tab **"Scan QR Code"**
- Scan QR dengan kamera atau upload foto QR
- Data pelanggan otomatis muncul
- Lanjut ke input pemakaian

### 4. Scan Seri Meter (Alternatif)

- Tab **"Scan Seri Meter"**
- Foto nomor seri di meter air fisik
- Crop area nomor seri
- Klik **"Scan Seri"** → OCR baca nomor
- Data pelanggan muncul

### 5. Input Pemakaian Air

- Setelah data pelanggan muncul
- Input **Meter Awal** dan **Meter Akhir**
- Pemakaian kubik auto-calculate
- Upload foto meteran dan rumah
- Klik **"Submit"**

### 6. Monitor Status Pelanggan

- Tab **"Status Pelanggan"**
- Lihat pelanggan yang sudah/belum dicatat bulan ini
- Track progress pencatatan

---

## 🔧 Troubleshooting

### ❌ Backend Error: ModuleNotFoundError

**Solusi:**

```bash
cd Backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

### ❌ Database Connection Error

**Solusi:**

1. Pastikan MySQL server berjalan
2. Cek kredensial di `Backend/.env`
3. Test koneksi:
   ```bash
   mysql -u root -p
   USE meter_tirta_musi;
   SHOW TABLES;
   ```

### ❌ OCR Not Working (Scan Seri Meter)

**Solusi:**

1. Pastikan Tesseract sudah terinstall:

   ```bash
   # Windows
   tesseract --version

   # Atau cek path:
   "C:\Program Files\Tesseract-OCR\tesseract.exe" --version
   ```

2. Set path di `Backend/.env`:

   ```env
   TESSERACT_CMD=C:/Program Files/Tesseract-OCR/tesseract.exe
   ```

3. Restart backend server

### ❌ CORS Error di Frontend

**Solusi:**

1. Cek `CORS_ORIGINS` di `Backend/.env`
2. Pastikan URL frontend ada di list:
   ```env
   CORS_ORIGINS=http://localhost:5173,http://localhost:3000
   ```
3. Restart backend

### ❌ Frontend Tidak Bisa Connect ke Backend

**Solusi:**

1. Cek backend berjalan di `http://localhost:5000`
2. Cek `VITE_API_BASE_URL` di `Frontend/.env`
3. Test manual: buka `http://localhost:5000/api/auth/me` di browser

---

## 📂 Struktur Proyek

```
meter-air-tirta-musi/
├── Backend/
│   ├── routes/              # API endpoints
│   │   ├── auth_api.py      # Authentication
│   │   ├── pelanggan_api.py # Pelanggan (QR scan)
│   │   ├── pemakaian_api.py # Pemakaian data
│   │   └── seri_meter.py    # OCR scan seri
│   ├── utils/
│   │   └── image_processing.py  # OCR preprocessing
│   ├── uploads/             # Uploaded files
│   ├── app.py               # Main Flask app
│   ├── models.py            # Database models
│   ├── config.py            # Configuration
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── QrScanner.jsx
│   │   │   ├── QrGenerator.jsx
│   │   │   └── SeriScanner.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ScanPage.jsx
│   │   │   ├── InputKubik.jsx
│   │   │   └── PelangganStatus.jsx
│   │   ├── layouts/         # Layout components
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utility functions
│   │   └── api.js           # API client
│   ├── public/
│   │   └── water.svg        # Logo
│   ├── package.json
│   └── .env                 # Frontend environment
│
└── README.md
```

---

## 🔒 Security Notes

### ⚠️ Sebelum Deploy ke Production:

1. **Ganti SECRET_KEY:**

   ```python
   # Generate random secret key
   import secrets
   print(secrets.token_hex(32))
   ```

   Paste ke `Backend/.env`:

   ```env
   SECRET_KEY=hasil-generate-di-atas
   ```

2. **Set DEBUG=False:**

   ```env
   DEBUG=False
   ```

3. **Gunakan Password Database yang Kuat**

4. **Setup HTTPS untuk Production**

5. **Restrict CORS_ORIGINS:**
   ```env
   CORS_ORIGINS=https://yourdomain.com
   ```

---

## 📊 Database Schema

### Table: `pelanggan`

```sql
- id (INT, PK, AUTO_INCREMENT)
- nama_pelanggan (VARCHAR)
- alamat (TEXT)
- nomor_seri_meter (VARCHAR, UNIQUE)
- golongan (VARCHAR)
```

### Table: `pemakaian_meter`

```sql
- id (INT, PK, AUTO_INCREMENT)
- pelanggan_id (INT, FK)
- meter_awal (INT)
- meter_akhir (INT)
- pemakaian_kubik (INT)
- periode_bulan (INT)
- periode_tahun (INT)
- tanggal_catat (DATETIME)
- petugas (VARCHAR)
- foto_meteran (VARCHAR)
- foto_rumah (VARCHAR)
- keterangan (TEXT)
```

### Table: `pencatat_meter` (Users)

```sql
- id (INT, PK, AUTO_INCREMENT)
- username (VARCHAR, UNIQUE)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- created_at (DATETIME)
```

---

## 🚀 Production Deployment

### Backend (Flask)

**Opsi 1: Gunicorn (Linux)**

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

**Opsi 2: Waitress (Windows)**

```bash
pip install waitress
waitress-serve --port=5000 app:app
```

### Frontend (React)

**Build production:**

```bash
cd Frontend
npm run build
```

**Deploy `dist/` folder ke:**

- Netlify
- Vercel
- GitHub Pages
- Nginx/Apache static hosting

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Author

**Tirta Musi Development Team**

---

## 📞 Support

Jika ada masalah atau pertanyaan:

1. Check [Troubleshooting](#-troubleshooting) section
2. Open an issue di GitHub
3. Contact development team

---

## 🎉 Changelog

### v1.0.0 (Current)

- ✅ Authentication system
- ✅ QR Code scanning
- ✅ OCR serial number scanning (Tesseract)
- ✅ Pemakaian input with photos
- ✅ Status monitoring
- ✅ QR code generator with download
- ✅ Responsive UI with TailwindCSS
- ✅ Modern React + Vite frontend
- ✅ Flask REST API backend

---

**🎯 Sistem Pencatatan Meter Air - Production Ready!**

Made with ❤️ by Tirta Musi Team
