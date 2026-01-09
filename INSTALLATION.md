# 📦 Panduan Instalasi Detail - Bahasa Indonesia

Panduan lengkap instalasi Sistem Pencatatan Meter Air Tirta Musi untuk pemula.

---

## 📋 Persiapan (Prerequisites)

### 1. Install Python 3.8+

**Windows:**

1. Download Python dari: https://www.python.org/downloads/
2. Jalankan installer
3. ✅ **CENTANG** "Add Python to PATH"
4. Klik "Install Now"
5. Verify:
   ```bash
   python --version
   ```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
python3 --version
```

**Mac:**

```bash
brew install python3
python3 --version
```

---

### 2. Install Node.js 16+

**Windows & Mac:**

1. Download dari: https://nodejs.org/
2. Pilih versi LTS (Long Term Support)
3. Jalankan installer
4. Verify:
   ```bash
   node --version
   npm --version
   ```

**Linux:**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs
node --version
npm --version
```

---

### 3. Install MySQL 8.0+

**Windows:**

1. Download MySQL Installer: https://dev.mysql.com/downloads/installer/
2. Pilih "MySQL Installer for Windows"
3. Jalankan installer → Pilih "Developer Default"
4. Set root password (INGAT PASSWORD INI!)
5. Finish installation
6. Verify:
   ```bash
   mysql --version
   ```

**Linux:**

```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
mysql --version
```

**Mac:**

```bash
brew install mysql
brew services start mysql
mysql_secure_installation
mysql --version
```

---

### 4. Install Tesseract OCR

**Windows:**

1. Download dari: https://github.com/UB-Mannheim/tesseract/wiki
2. Pilih: `tesseract-ocr-w64-setup-v5.x.x.exe`
3. Jalankan installer
4. Install ke: `C:\Program Files\Tesseract-OCR` (default)
5. Verify:
   ```bash
   "C:\Program Files\Tesseract-OCR\tesseract.exe" --version
   ```

**Linux:**

```bash
sudo apt update
sudo apt install tesseract-ocr
tesseract --version
```

**Mac:**

```bash
brew install tesseract
tesseract --version
```

---

## 🚀 Instalasi Aplikasi

### Step 1: Clone Repository

```bash
# Clone dari GitHub
git clone https://github.com/yourusername/meter-air-tirta-musi.git

# Masuk ke folder proyek
cd meter-air-tirta-musi
```

---

### Step 2: Setup Backend

#### A. Buat Virtual Environment

```bash
# Masuk ke folder Backend
cd Backend

# Buat virtual environment
python -m venv venv
```

#### B. Aktifkan Virtual Environment

**Windows:**

```bash
venv\Scripts\activate
```

Setelah aktif, prompt akan berubah menjadi:

```
(venv) C:\...\Backend>
```

**Linux/Mac:**

```bash
source venv/bin/activate
```

Setelah aktif:

```
(venv) user@computer:~/Backend$
```

#### C. Install Python Packages

```bash
pip install -r requirements.txt
```

Tunggu hingga selesai (2-5 menit).

#### D. Setup Database MySQL

**1. Login ke MySQL:**

**Windows/Linux/Mac:**

```bash
mysql -u root -p
```

Masukkan password MySQL yang Anda buat saat instalasi.

**2. Buat Database:**

```sql
CREATE DATABASE meter_tirta_musi;
SHOW DATABASES;
EXIT;
```

Pastikan `meter_tirta_musi` muncul di list database.

#### E. Konfigurasi File .env

**1. Copy file .env.example:**

**Windows:**

```bash
copy .env.example .env
```

**Linux/Mac:**

```bash
cp .env.example .env
```

**2. Edit file .env dengan Notepad/Text Editor:**

Buka `Backend/.env` dan edit:

```env
# Database Configuration
DB_USER=root
DB_PASSWORD=password_mysql_anda_disini
DB_HOST=localhost
DB_PORT=3306
DB_NAME=meter_tirta_musi

# Flask Configuration
SECRET_KEY=ubah-dengan-string-random-yang-panjang
DEBUG=True

# Server Configuration
HOST=0.0.0.0
PORT=5000

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Tesseract Path (Windows - uncomment jika perlu)
# TESSERACT_CMD=C:/Program Files/Tesseract-OCR/tesseract.exe
```

**PENTING:**

- Ganti `DB_PASSWORD` dengan password MySQL Anda
- Ganti `SECRET_KEY` dengan string random panjang

#### F. Generate Secret Key

Jalankan di Python untuk generate random key:

```bash
python
```

```python
import secrets
print(secrets.token_hex(32))
exit()
```

Copy hasil output dan paste ke `SECRET_KEY` di `.env`.

#### G. Inisialisasi Database

```bash
python
```

```python
from app import app, db
with app.app_context():
    db.create_all()
    print("Database tables created!")
exit()
```

Output yang diharapkan:

```
Database tables created!
```

#### H. (Opsional) Insert Data Test

```bash
python
```

```python
from app import app, db
from models import Pelanggan

with app.app_context():
    # Buat pelanggan test
    p1 = Pelanggan(
        nama_pelanggan="Ahmad Fauzi",
        alamat="Jl. Merdeka No.1",
        nomor_seri_meter="SM100001",
        golongan="Rumah Tangga"
    )
    p2 = Pelanggan(
        nama_pelanggan="Siti Aisyah",
        alamat="Jl. Sudirman No.5",
        nomor_seri_meter="SM100002",
        golongan="Rumah Tangga"
    )

    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    print("Sample data created!")
exit()
```

#### I. Jalankan Backend

```bash
python app.py
```

Output yang diharapkan:

```
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.x.x:5000
```

✅ **Backend berhasil berjalan!**

**JANGAN TUTUP TERMINAL INI!** Biarkan tetap running.

---

### Step 3: Setup Frontend

**BUKA TERMINAL BARU** (terminal kedua)

#### A. Masuk ke Folder Frontend

```bash
cd Frontend
```

(Dari root proyek)

#### B. Install NPM Packages

```bash
npm install
```

Tunggu hingga selesai (2-5 menit). Akan download banyak packages.

#### C. Konfigurasi .env

**1. Copy .env.example:**

**Windows:**

```bash
copy .env.example .env
```

**Linux/Mac:**

```bash
cp .env.example .env
```

**2. Edit Frontend/.env:**

```env
VITE_API_BASE_URL=http://localhost:5000
```

(Biasanya sudah benar, tidak perlu diubah)

#### D. Jalankan Frontend

```bash
npm run dev
```

Output yang diharapkan:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

✅ **Frontend berhasil berjalan!**

---

## 🎉 Akses Aplikasi

### Buka Browser

Akses: **http://localhost:5173**

### Halaman Pertama

Anda akan melihat halaman **Login/Signup**.

### Buat Account

1. Klik **"Signup"**
2. Isi form:
   - Username: `admin`
   - Email: `admin@example.com`
   - Password: `password123`
3. Klik **"Daftar"**
4. Login dengan kredensial yang dibuat

### Test Aplikasi

1. **Generate QR Code**

   - Tab "Generate QR Code"
   - Input ID: `1`
   - Download QR

2. **Scan QR Code**

   - Tab "Scan QR Code"
   - Upload QR yang di-download
   - Data pelanggan muncul

3. **Input Pemakaian**
   - Setelah scan QR
   - Input meter awal & akhir
   - Submit

✅ **Aplikasi berfungsi dengan baik!**

---

## 🔧 Troubleshooting

### Error: "python: command not found"

**Solusi:**

```bash
# Coba dengan python3
python3 --version
python3 app.py

# Atau add to PATH (Windows)
# System Properties > Environment Variables > Path
# Add: C:\Users\YourName\AppData\Local\Programs\Python\Python3x
```

---

### Error: "Access denied for user 'root'@'localhost'"

**Solusi:**

1. Password MySQL salah di `.env`
2. Atau reset password MySQL:
   ```bash
   mysql -u root -p
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
   FLUSH PRIVILEGES;
   ```

---

### Error: "Port 5000 is already in use"

**Solusi:**

**Windows:**

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**

```bash
lsof -i :5000
kill -9 <PID>
```

Atau ubah port di `Backend/.env`:

```env
PORT=5001
```

---

### Error: "npm ERR! code ENOENT"

**Solusi:**

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

---

### OCR Tidak Bekerja

**Solusi:**

1. **Check Tesseract:**

   ```bash
   tesseract --version
   ```

2. **Set path di .env (Windows):**

   ```env
   TESSERACT_CMD=C:/Program Files/Tesseract-OCR/tesseract.exe
   ```

3. **Restart backend**

---

## 📞 Butuh Bantuan?

1. Baca [Troubleshooting](#-troubleshooting) di atas
2. Check file README.md
3. Buat issue di GitHub
4. Contact development team

---

## ✅ Checklist Instalasi

- [ ] Python 3.8+ terinstall
- [ ] Node.js 16+ terinstall
- [ ] MySQL 8.0+ terinstall
- [ ] Tesseract OCR terinstall
- [ ] Repository di-clone
- [ ] Backend virtual environment dibuat
- [ ] Backend dependencies terinstall
- [ ] Database dibuat
- [ ] Backend .env dikonfigurasi
- [ ] Database tables dibuat
- [ ] Backend berjalan di :5000
- [ ] Frontend dependencies terinstall
- [ ] Frontend .env dikonfigurasi
- [ ] Frontend berjalan di :5173
- [ ] Bisa akses http://localhost:5173
- [ ] Bisa signup/login
- [ ] Bisa test fitur-fitur

---

**🎉 Selamat! Aplikasi sudah siap digunakan!**
