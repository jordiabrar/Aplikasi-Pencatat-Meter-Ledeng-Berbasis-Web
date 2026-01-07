# 🔧 Fix: Error "Gagal terhubung dengan server" saat Login

## 🐛 Masalah
Saat mencoba login, muncul error: **"Gagal terhubung dengan server"**

## 🔍 Penyebab
`fetch()` di frontend tidak mengirim **credentials (cookies)** ke backend. Backend Flask menggunakan **session cookies** untuk authentication, sehingga tanpa credentials, request akan gagal.

## ✅ Solusi
Menambahkan `credentials: "include"` pada semua `fetch()` request yang membutuhkan session/authentication.

## 📝 File yang Diperbaiki

### 1. Frontend/src/pages/Login.jsx
```jsx
const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",  // ✅ DITAMBAHKAN
  body: JSON.stringify({ username, password }),
});
```

### 2. Frontend/src/pages/Signup.jsx
```jsx
const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",  // ✅ DITAMBAHKAN
  body: JSON.stringify({
    username: formData.username,
    email: formData.email,
    password: formData.password,
  }),
});
```

### 3. Frontend/src/pages/InputKubik.jsx
```jsx
const res = await fetch(`${API_BASE_URL}/api/pemakaian`, {
  method: "POST",
  credentials: "include",  // ✅ DITAMBAHKAN
  body: formData,
});
```

## 🎯 Kapan Perlu `credentials: "include"`?

### ✅ Perlu (POST requests dengan auth):
- Login
- Signup
- Input Pemakaian (butuh username petugas dari session)
- Logout
- Update data yang butuh auth

### ⚠️ Tidak Perlu (GET requests public):
- Get pelanggan by ID
- Get pelanggan by Seri
- Get status pemakaian (jika tidak butuh auth)

## 🧪 Testing

### 1. Test Login:
```
Username: testuser
Password: test123
```

### 2. Expected Result:
- ✅ Login berhasil
- ✅ Redirect ke /scan
- ✅ Session tersimpan (bisa akses fitur lain)

### 3. Jika Masih Error:
- Pastikan backend running di http://localhost:5000
- Pastikan frontend running di http://localhost:5173
- Cek browser console untuk error detail
- Pastikan CORS configured di backend

## 🔧 Konfigurasi Backend (sudah OK)

Backend sudah dikonfigurasi dengan benar:

```python
# Backend/app.py
CORS(
    app,
    supports_credentials=True,  # ✅ Allow credentials
    origins=app.config["CORS_ORIGINS"]  # localhost:5173
)
```

```python
# Backend/config.py
CORS_ORIGINS = "http://localhost:5173,http://localhost:3000"
```

## 📊 Summary

| Item | Status |
|------|--------|
| Backend API | ✅ Working |
| CORS Config | ✅ Configured |
| Session Config | ✅ Configured |
| Frontend fetch() | ✅ Fixed (credentials added) |
| Test User | ✅ Created (testuser/test123) |

## 🎉 Status: FIXED!

Login seharusnya berfungsi dengan baik sekarang. Silakan refresh browser dan test!

---

**Date Fixed:** 2026-01-07  
**Issue:** Login error "Gagal terhubung dengan server"  
**Root Cause:** Missing `credentials: "include"` in fetch()  
**Solution:** Added credentials to all POST requests
