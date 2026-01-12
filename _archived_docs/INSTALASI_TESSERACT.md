# 📥 Panduan Instalasi Tesseract OCR

## 🎯 Untuk Apa Tesseract?

Tesseract OCR diperlukan untuk fitur **Scan Seri Meter** menggunakan kamera. Dengan Tesseract, aplikasi bisa otomatis membaca nomor seri meter dari foto.

**PENTING:** Aplikasi tetap bisa digunakan tanpa Tesseract! Anda masih bisa input nomor seri meter secara manual.

---

## 📋 Langkah-Langkah Instalasi

### 1. Download Installer

1. Buka link yang sudah dibuka di browser: https://github.com/UB-Mannheim/tesseract/wiki
2. Cari section **"Tesseract at UB Mannheim"**
3. Download file: **`tesseract-ocr-w64-setup-v5.x.x.exe`** (pilih versi terbaru)
   - Atau direct link: https://digi.bib.uni-mannheim.de/tesseract/

### 2. Install Tesseract

1. Jalankan file installer yang sudah didownload
2. Ikuti wizard instalasi:
   - **Install Location:** Biarkan default `C:\Program Files\Tesseract-OCR`
   - **Components:** Pilih semua (terutama English language data)
   - Klik **Next → Next → Install**
3. Tunggu hingga instalasi selesai
4. Klik **Finish**

### 3. Konfigurasi Otomatis

Setelah Tesseract terinstall, jalankan script konfigurasi otomatis:

```powershell
powershell -ExecutionPolicy Bypass -File tmp_rovodev_configure_tesseract.ps1
```

Script ini akan otomatis:
- ✅ Detect lokasi instalasi Tesseract
- ✅ Update file `Backend/.env` dengan path yang benar
- ✅ Siap untuk restart backend

### 4. Restart Backend Server

1. Stop backend server yang sedang berjalan (tekan `Ctrl+C` di terminal backend)
2. Jalankan ulang backend:
   ```bash
   cd Backend
   python app.py
   ```

### 5. Test Fitur Scan OCR

1. Buka aplikasi di browser: http://localhost:5173
2. Login ke aplikasi
3. Klik tab **"Scan Seri Meter"**
4. Klik **"Choose File"** atau gunakan kamera
5. Ambil foto nomor seri meter (usahakan jelas dan fokus)
6. Crop area nomor seri meter
7. Klik **"Crop"** lalu **"Scan Seri"**
8. Sistem akan otomatis membaca nomor seri dan mencari pelanggan

---

## ✅ Verifikasi Instalasi

Untuk memastikan Tesseract terinstall dengan benar:

```powershell
# Cek apakah file exe ada
Test-Path "C:\Program Files\Tesseract-OCR\tesseract.exe"

# Harusnya return: True
```

Atau buka PowerShell dan ketik:
```powershell
& "C:\Program Files\Tesseract-OCR\tesseract.exe" --version
```

Jika berhasil, akan muncul versi Tesseract seperti:
```
tesseract v5.3.0
```

---

## 🔧 Troubleshooting

### Problem: Script konfigurasi tidak menemukan Tesseract

**Solusi 1 - Cek lokasi instalasi:**
```powershell
Get-ChildItem "C:\Program Files\Tesseract-OCR\" -Recurse -Filter "tesseract.exe"
```

**Solusi 2 - Manual configuration:**
1. Buka file `Backend\.env`
2. Cari atau tambahkan baris:
   ```
   TESSERACT_CMD=C:/Program Files/Tesseract-OCR/tesseract.exe
   ```
   (Perhatikan: gunakan forward slash `/` bukan backslash `\`)
3. Save file
4. Restart backend

### Problem: OCR tidak bisa membaca nomor seri

**Tips untuk foto yang baik:**
- ✅ Pencahayaan cukup terang
- ✅ Fokus pada nomor seri
- ✅ Tidak blur atau buram
- ✅ Nomor seri terlihat jelas
- ✅ Tidak ada bayangan atau refleksi
- ✅ Crop hanya area nomor seri saja

**Jika tetap tidak bisa:**
- Gunakan fallback: Input manual nomor seri di bagian bawah halaman

### Problem: Backend error setelah install Tesseract

1. Cek apakah path di `.env` benar
2. Pastikan menggunakan forward slash `/` 
3. Restart backend server
4. Cek log error di terminal backend

---

## 📊 Perbandingan: Dengan vs Tanpa Tesseract

| Fitur | Tanpa Tesseract | Dengan Tesseract |
|-------|----------------|------------------|
| Scan QR Code | ✅ Berfungsi | ✅ Berfungsi |
| Input Manual ID | ✅ Berfungsi | ✅ Berfungsi |
| Input Manual Seri | ✅ Berfungsi | ✅ Berfungsi |
| **Scan OCR Seri** | ❌ Tidak bisa | ✅ Berfungsi |
| Input Pemakaian | ✅ Berfungsi | ✅ Berfungsi |
| Status Pelanggan | ✅ Berfungsi | ✅ Berfungsi |

**Kesimpulan:** Aplikasi tetap **100% fungsional** tanpa Tesseract. OCR hanya mempermudah input seri meter.

---

## 🚀 Quick Start (Setelah Instalasi)

```bash
# Terminal 1 - Backend
cd Backend
python app.py

# Terminal 2 - Frontend  
cd Frontend
npm run dev
```

Buka browser: http://localhost:5173

Test fitur Scan Seri Meter OCR! 🎉

---

## 📞 Butuh Bantuan?

Jika mengalami kesulitan, silakan:
1. Cek section Troubleshooting di atas
2. Pastikan semua langkah instalasi sudah diikuti
3. Gunakan fallback input manual seri meter

---

**Instalasi Tesseract adalah OPTIONAL. Aplikasi sudah berjalan sempurna tanpanya!**
