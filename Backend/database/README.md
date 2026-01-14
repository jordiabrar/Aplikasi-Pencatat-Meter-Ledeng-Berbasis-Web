# Database Setup - Tirta Musi

## 📋 Cara Setup Database

### 1. Buat Database
```sql
CREATE DATABASE meter_tirta_musi CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

### 2. Import File SQL
```bash
# Via command line
mysql -u root -p meter_tirta_musi < "meter_tirta_musi (4).sql"

# Atau via phpMyAdmin
# 1. Pilih database meter_tirta_musi
# 2. Tab "Import"
# 3. Pilih file "meter_tirta_musi (4).sql"
# 4. Klik "Go"
```

### 3. Update File .env
```env
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=meter_tirta_musi
```

### 4. Test Koneksi
```bash
cd Backend
python -c "from app import create_app; app = create_app(); print('Database connected!')"
```

## 📊 Struktur Database

### Tabel Utama:
- **pelanggan** - Data pelanggan dan nomor seri meter
- **masalah** - Master data 44 jenis masalah meter (M01-M44)
- **pemakaian_meter** - Riwayat pencatatan meter bulanan
- **pemakaian_masalah** - Relasi many-to-many (pivot table)
- **pencatat_meter** - User/petugas pencatat

### Master Data Masalah:
File SQL sudah include 44 jenis masalah standar:
- M01: Meter baik tapi ditaksir
- M02: Meter berputar terlalu cepat
- M03: Air tidak keluar
- ... (dan 41 lainnya)

## ⚠️ Catatan Penting

- File SQL ini berisi struktur tabel + master data masalah
- Jangan commit data pelanggan production ke Git!
- Gunakan `.env` untuk credentials database (jangan hardcode)
- Backup database secara berkala

## 🔄 Update Schema

Jika ada perubahan di `models.py`:
1. Update models di `Backend/models.py`
2. Generate migration atau update manual SQL file
3. Test di development environment dulu
4. Deploy ke production

## 📞 Troubleshooting

### Error: "Access denied for user"
```bash
# Periksa credentials di .env
# Atau buat user baru:
CREATE USER 'tirta_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON meter_tirta_musi.* TO 'tirta_user'@'localhost';
FLUSH PRIVILEGES;
```

### Error: "Unknown database"
```bash
# Pastikan database sudah dibuat:
CREATE DATABASE meter_tirta_musi;
```

### Error: "Table already exists"
```bash
# Drop database dulu jika ingin fresh install:
DROP DATABASE meter_tirta_musi;
CREATE DATABASE meter_tirta_musi;
# Lalu import ulang SQL file
```
