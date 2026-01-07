# Testing Checklist - Frontend

## ✅ Server Status

- [x] Frontend running on http://localhost:5174
- [x] Backend running on http://localhost:5000
- [x] Tailwind installed
- [x] All dependencies installed

## 🧪 Manual Testing Steps

### 1. Login Page (http://localhost:5174/login)

- [ ] Halaman login tampil dengan gradient background
- [ ] Input username ada icon user
- [ ] Input password ada icon lock
- [ ] Button "Masuk" berwarna biru gradient
- [ ] Link "Daftar disini" ada di bawah
- [ ] Error alert muncul jika login gagal
- [ ] Loading spinner muncul saat proses login

### 2. Signup Page (http://localhost:5174/signup)

- [ ] Halaman signup tampil dengan gradient background
- [ ] Input username, email, password, confirm password ada
- [ ] Validation error muncul jika password tidak cocok
- [ ] Success alert muncul jika signup berhasil
- [ ] Redirect ke login setelah signup

### 3. Dashboard/Scan Page (Setelah Login)

- [ ] Header dengan logo "Tirta Musi" tampil
- [ ] User info dan tombol logout ada di header
- [ ] 3 tabs tampil: "Scan QR / ID", "Scan Seri Meter", "Generate QR"
- [ ] 3 info cards di bawah tabs tampil dengan gradient
- [ ] Tab switching berfungsi

### 4. Input Pemakaian Page

- [ ] Card "Informasi Pelanggan" tampil
- [ ] Card "Data Pemakaian" dengan 2 input tampil
- [ ] Box biru dengan total pemakaian tampil
- [ ] Button "Gunakan Rata-rata 3 Bulan" berfungsi
- [ ] Card "Upload Foto" dengan drag & drop area tampil
- [ ] Image preview muncul setelah upload
- [ ] Button "Simpan Pemakaian" berfungsi
- [ ] History section tampil setelah klik "Lihat Riwayat"

### 5. Status Pelanggan Page

- [ ] 3 statistics cards tampil (Sudah, Belum, Progress)
- [ ] Progress bar tampil dengan persentase yang benar
- [ ] 2 tabs tampil: "Belum Dicatat" dan "Sudah Dicatat"
- [ ] Table tampil dengan data yang benar
- [ ] Hover effect pada table row berfungsi

## 🐛 Common Issues & Solutions

### Issue: Tailwind classes tidak bekerja

**Solution:**

```bash
cd Frontend
npm install -D tailwindcss postcss autoprefixer
```

### Issue: Components tidak ditemukan

**Solution:** Check import paths:

```jsx
import { Button } from "../components/ui"; // ✅ Correct
import { Button } from "./components/ui"; // ❌ Wrong
```

### Issue: API tidak terhubung

**Solution:** Check .env file:

```
VITE_API_BASE=http://localhost:5000
```

### Issue: CORS error

**Solution:** Check backend config.py:

```python
CORS_ORIGINS = "http://localhost:5174,http://localhost:3000"
```

## 📱 Responsive Testing

Test pada berbagai ukuran layar:

- [ ] Mobile (375px) - iPhone SE
- [ ] Tablet (768px) - iPad
- [ ] Desktop (1920px) - Full HD

## 🎨 Visual Testing

Check apakah tampilan sesuai:

- [ ] Colors: Blue gradient untuk primary actions
- [ ] Spacing: Consistent padding & margins
- [ ] Typography: Clear hierarchy
- [ ] Icons: Properly sized and colored
- [ ] Shadows: Subtle on cards
- [ ] Animations: Smooth transitions

## ⚡ Performance Testing

- [ ] Page load < 3s
- [ ] No console errors
- [ ] No console warnings
- [ ] Images load quickly
- [ ] Smooth animations

## 🔒 Security Testing

- [ ] Redirect ke login jika belum login
- [ ] Tidak bisa akses /scan tanpa login
- [ ] Logout berfungsi dengan baik
- [ ] Session management works

---

## Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/auth/me

# Test frontend build
cd Frontend
npm run build

# Test production build
npm run preview
```

## Report Issues

Jika menemukan bug, catat:

1. **Browser:** Chrome/Firefox/Safari
2. **Screen Size:** Mobile/Tablet/Desktop
3. **Steps to Reproduce:** 1. Go to... 2. Click... 3. See error
4. **Expected:** What should happen
5. **Actual:** What actually happened
6. **Console Errors:** Screenshot or copy-paste
