export const CONFIG = {
  SCAN_INTERVAL: 1000,
  OCR_DELAY: 1500,
  QR_DETECTION_CHANCE: 0.1,
};

// ============================================================================
// DATA PETUGAS
// ============================================================================
export const PETUGAS_LIST = [
  {
    id: 1,
    nip: "NIP001",
    nama: "Alta (Kimora)",
    email: "alta@pdam.go.id",
    no_telepon: "081234567890",
    area_tugas: "Area 01",
  },
  {
    id: 2,
    nip: "NIP002",
    nama: "Budi Gunawan",
    email: "budi@pdam.go.id",
    no_telepon: "081234567891",
    area_tugas: "Area 02",
  },
  {
    id: 3,
    nip: "NIP003",
    nama: "Siti Aminah",
    email: "siti@pdam.go.id",
    no_telepon: "081234567892",
    area_tugas: "Area 03",
  },
];

// ============================================================================
// DATA PELANGGAN
// ============================================================================
export const MOCK_DATABASE = {
  QR001: {
    id: 1,
    qr_code: "QR001",
    no_pelanggan: "109928374",
    nama: "Budi Setiadi",
    alamat: "Jl. Tirta Utama No. 8",
    kelurahan: "Sukamaju",
    kecamatan: "Cibeunying",
    kota: "Bandung",
    no_telepon: "081234567801",
    status_aktif: true,
  },
  QR002: {
    id: 2,
    qr_code: "QR002",
    no_pelanggan: "109928375",
    nama: "Siti Rahayu",
    alamat: "Jl. Merdeka No. 12",
    kelurahan: "Babakan",
    kecamatan: "Bojongloa",
    kota: "Bandung",
    no_telepon: "081234567802",
    status_aktif: true,
  },
  QR003: {
    id: 3,
    qr_code: "QR003",
    no_pelanggan: "109928376",
    nama: "Ahmad Yani",
    alamat: "Jl. Sudirman No. 45",
    kelurahan: "Dago",
    kecamatan: "Coblong",
    kota: "Bandung",
    no_telepon: "081234567803",
    status_aktif: true,
  },
  QR004: {
    id: 4,
    qr_code: "QR004",
    no_pelanggan: "109928377",
    nama: "Dewi Kusuma",
    alamat: "Jl. Asia Afrika No. 20",
    kelurahan: "Braga",
    kecamatan: "Sumur Bandung",
    kota: "Bandung",
    no_telepon: "081234567804",
    status_aktif: true,
  },
  QR005: {
    id: 5,
    qr_code: "QR005",
    no_pelanggan: "109928378",
    nama: "Eko Prasetyo",
    alamat: "Jl. Cihampelas No. 88",
    kelurahan: "Cipaganti",
    kecamatan: "Coblong",
    kota: "Bandung",
    no_telepon: "081234567805",
    status_aktif: true,
  },
};

// ============================================================================
// ⭐ DATA KELUHAN - FOKUS MASALAH PEMINDAIAN METER
// ============================================================================
export const KELUHAN_LIST = [
  // ========================================
  // KATEGORI 1: KONDISI FISIK METER
  // ========================================
  {
    id: 1,
    nama_keluhan: "Kaca Meter Buram/Berembun",
    kategori: "kondisi_meter",
    severity: "high",
    deskripsi: "Kaca penutup meter berkabut atau berembun sehingga angka tidak terlihat jelas",
    impact_ocr: "Sangat Mengganggu - OCR tidak dapat membaca angka dengan akurat",
    solusi: "Bersihkan kaca meter atau ganti kaca baru",
  },
  {
    id: 2,
    nama_keluhan: "Kaca Meter Pecah/Retak",
    kategori: "kondisi_meter",
    severity: "critical",
    deskripsi: "Kaca meter pecah atau retak sehingga angka tertutup retakan",
    impact_ocr: "Sangat Mengganggu - Retakan menutupi sebagian angka",
    solusi: "Ganti kaca meter segera",
  },
  {
    id: 3,
    nama_keluhan: "Kaca Meter Kotor/Berlumut",
    kategori: "kondisi_meter",
    severity: "high",
    deskripsi: "Permukaan kaca meter kotor, berlumut, atau berdebu tebal",
    impact_ocr: "Sangat Mengganggu - OCR tidak dapat membaca angka",
    solusi: "Bersihkan kaca meter secara berkala",
  },
  {
    id: 4,
    nama_keluhan: "Angka Meter Pudar/Aus",
    kategori: "kondisi_meter",
    severity: "high",
    deskripsi: "Angka pada roda meter sudah pudar, aus, atau tidak jelas",
    impact_ocr: "Sangat Mengganggu - OCR kesulitan mengenali angka yang aus",
    solusi: "Ganti unit meter yang sudah aus",
  },
  {
    id: 5,
    nama_keluhan: "Roda Meter Macet/Tidak Berputar",
    kategori: "kondisi_meter",
    severity: "critical",
    deskripsi: "Roda angka meter macet atau tidak berputar sama sekali",
    impact_ocr: "Tidak Mengganggu OCR - Tapi meter tidak berfungsi",
    solusi: "Ganti meter baru",
  },

  // ========================================
  // KATEGORI 2: KONDISI PENCAHAYAAN
  // ========================================
  {
    id: 6,
    nama_keluhan: "Lokasi Meter Gelap/Kurang Cahaya",
    kategori: "pencahayaan",
    severity: "high",
    deskripsi: "Meter berada di lokasi yang gelap atau minim pencahayaan",
    impact_ocr: "Sangat Mengganggu - OCR memerlukan cahaya cukup untuk akurat",
    solusi: "Pasang lampu penerangan atau gunakan senter saat pemindaian",
  },
  {
    id: 7,
    nama_keluhan: "Meter Terkena Pantulan Cahaya Langsung",
    kategori: "pencahayaan",
    severity: "medium",
    deskripsi: "Cahaya matahari atau lampu langsung memantul pada kaca meter (silau)",
    impact_ocr: "Mengganggu - Pantulan cahaya membuat angka tidak terbaca",
    solusi: "Pasang pelindung atau ubah posisi pemindaian",
  },
  {
    id: 8,
    nama_keluhan: "Meter di Dalam Box Tertutup Tanpa Cahaya",
    kategori: "pencahayaan",
    severity: "high",
    deskripsi: "Meter berada dalam box pelindung tertutup yang sangat gelap",
    impact_ocr: "Sangat Mengganggu - Tidak ada cahaya untuk OCR",
    solusi: "Buka box atau pasang lampu LED di dalam box",
  },

  // ========================================
  // KATEGORI 3: POSISI & AKSESIBILITAS METER
  // ========================================
  {
    id: 9,
    nama_keluhan: "Meter Terlalu Tinggi/Rendah",
    kategori: "posisi",
    severity: "medium",
    deskripsi: "Posisi meter terlalu tinggi atau terlalu rendah sehingga sulit dipindai",
    impact_ocr: "Mengganggu - Sudut pemindaian tidak optimal",
    solusi: "Ubah posisi meter ke ketinggian standar (1-1.5m dari tanah)",
  },
  {
    id: 10,
    nama_keluhan: "Meter Tertutup Tanaman/Semak",
    kategori: "posisi",
    severity: "high",
    deskripsi: "Meter tertutup oleh tanaman, semak, atau dedaunan",
    impact_ocr: "Sangat Mengganggu - Meter tidak terlihat jelas",
    solusi: "Potong tanaman yang menutupi meter",
  },
  {
    id: 11,
    nama_keluhan: "Meter Tertimbun Tanah/Pasir",
    kategori: "posisi",
    severity: "critical",
    deskripsi: "Meter tertimbun tanah, pasir, atau material lain",
    impact_ocr: "Sangat Mengganggu - Meter tidak dapat dipindai sama sekali",
    solusi: "Bersihkan dan naikkan posisi meter",
  },
  {
    id: 12,
    nama_keluhan: "Meter di Dalam Box Rusak/Sulit Dibuka",
    kategori: "posisi",
    severity: "high",
    deskripsi: "Box pelindung meter rusak, berkarat, atau sulit dibuka",
    impact_ocr: "Sangat Mengganggu - Tidak dapat mengakses meter",
    solusi: "Perbaiki atau ganti box pelindung",
  },
  {
    id: 13,
    nama_keluhan: "Meter Terlalu Jauh dari Jalan/Akses",
    kategori: "posisi",
    severity: "medium",
    deskripsi: "Posisi meter terlalu jauh masuk ke dalam properti",
    impact_ocr: "Tidak Langsung - Tapi menyulitkan petugas",
    solusi: "Relokasi meter ke posisi yang lebih mudah diakses",
  },

  // ========================================
  // KATEGORI 4: KONDISI LINGKUNGAN
  // ========================================
  {
    id: 14,
    nama_keluhan: "Meter Terendam Air/Banjir",
    kategori: "lingkungan",
    severity: "critical",
    deskripsi: "Meter terendam air atau sering terendam saat hujan",
    impact_ocr: "Sangat Mengganggu - Air menutupi kaca meter",
    solusi: "Naikkan posisi meter atau pasang pelindung anti air",
  },
  {
    id: 15,
    nama_keluhan: "Meter Terkena Hujan/Basah",
    kategori: "lingkungan",
    severity: "medium",
    deskripsi: "Meter terkena air hujan langsung sehingga kaca basah",
    impact_ocr: "Mengganggu - Air di kaca membuat pantulan",
    solusi: "Pasang atap pelindung atau box meter",
  },
  {
    id: 16,
    nama_keluhan: "Meter Berkarat/Korosi",
    kategori: "lingkungan",
    severity: "high",
    deskripsi: "Body meter berkarat parah atau korosi",
    impact_ocr: "Mengganggu - Karat dapat menutupi sebagian angka",
    solusi: "Bersihkan karat atau ganti meter baru",
  },

  // ========================================
  // KATEGORI 5: MASALAH TEKNIS METER
  // ========================================
  {
    id: 17,
    nama_keluhan: "Kaca Meter Berembun dari Dalam",
    kategori: "teknis",
    severity: "high",
    deskripsi: "Embun atau uap air terbentuk di dalam kaca meter",
    impact_ocr: "Sangat Mengganggu - Tidak dapat dibersihkan dari luar",
    solusi: "Ganti segel meter atau ganti unit meter",
  },
  {
    id: 18,
    nama_keluhan: "Format Angka Tidak Standar",
    kategori: "teknis",
    severity: "medium",
    deskripsi: "Meter menggunakan format angka yang berbeda atau tidak standar",
    impact_ocr: "Mengganggu - OCR dilatih untuk format standar",
    solusi: "Sesuaikan model OCR atau catat manual",
  },
  {
    id: 19,
    nama_keluhan: "Meter Digital Layar Mati/Rusak",
    kategori: "teknis",
    severity: "critical",
    deskripsi: "Untuk meter digital, layar tidak menyala atau rusak",
    impact_ocr: "Sangat Mengganggu - Tidak ada angka yang ditampilkan",
    solusi: "Ganti baterai atau ganti meter digital",
  },
  {
    id: 20,
    nama_keluhan: "Angka Meter Terbalik/Miring",
    kategori: "teknis",
    severity: "medium",
    deskripsi: "Posisi angka pada roda meter terbalik atau miring",
    impact_ocr: "Mengganggu - OCR kesulitan membaca orientasi abnormal",
    solusi: "Betulkan posisi roda atau ganti meter",
  },

  // ========================================
  // KATEGORI 6: KONDISI STRUKTURAL
  // ========================================
  {
    id: 21,
    nama_keluhan: "Box Meter Rusak/Tidak Ada Tutup",
    kategori: "struktural",
    severity: "medium",
    deskripsi: "Box pelindung meter rusak atau tidak memiliki tutup",
    impact_ocr: "Tidak Langsung - Tapi meter jadi cepat kotor",
    solusi: "Pasang atau perbaiki box meter",
  },
  {
    id: 22,
    nama_keluhan: "Jarak Antara Meter dan Kaca Terlalu Jauh",
    kategori: "struktural",
    severity: "low",
    deskripsi: "Jarak antara unit meter dengan kaca pelindung terlalu jauh",
    impact_ocr: "Sedikit Mengganggu - Membuat angka terlihat kecil",
    solusi: "Sesuaikan jarak atau ganti kaca lebih dekat",
  },

  // ========================================
  // KATEGORI 7: GANGGUAN EKSTERNAL
  // ========================================
  {
    id: 23,
    nama_keluhan: "Ada Stiker/Label Menutupi Angka",
    kategori: "gangguan",
    severity: "high",
    deskripsi: "Ada stiker, label, atau tanda lain yang menutupi sebagian angka",
    impact_ocr: "Sangat Mengganggu - Angka tidak dapat dibaca lengkap",
    solusi: "Lepas stiker atau pindahkan ke tempat lain",
  },
  {
    id: 24,
    nama_keluhan: "Sarang Serangga/Laba-laba di Meter",
    kategori: "gangguan",
    severity: "medium",
    deskripsi: "Ada sarang serangga, sarang laba-laba, atau kotoran hewan di meter",
    impact_ocr: "Mengganggu - Menutupi sebagian permukaan kaca",
    solusi: "Bersihkan secara berkala",
  },
  {
    id: 25,
    nama_keluhan: "Benda Asing Menghalangi Pemindaian",
    kategori: "gangguan",
    severity: "medium",
    deskripsi: "Ada benda asing (plastik, kertas, dll) yang menghalangi meter",
    impact_ocr: "Mengganggu - Meter tidak dapat dipindai dengan jelas",
    solusi: "Singkirkan benda asing",
  },

  // ========================================
  // KATEGORI 8: KELUHAN UMUM
  // ========================================
  {
    id: 26,
    nama_keluhan: "Meter Lama/Model Usang",
    kategori: "umum",
    severity: "low",
    deskripsi: "Meter sudah sangat lama dan model usang",
    impact_ocr: "Sedikit Mengganggu - Model lama kadang sulit dibaca OCR",
    solusi: "Ganti dengan meter model baru",
  },
  {
    id: 27,
    nama_keluhan: "Lainnya (Masalah Pemindaian Tidak Terdaftar)",
    kategori: "umum",
    severity: "medium",
    deskripsi: "Masalah lain yang menyebabkan kesulitan pemindaian meter",
    impact_ocr: "Bervariasi",
    solusi: "Jelaskan detail di kolom keterangan",
  },
];

// ============================================================================
// DATA RIWAYAT PEMBACAAN
// ============================================================================
export const INITIAL_HISTORY = [
  {
    id: 1,
    petugas_id: 1,
    pelanggan_id: 1,
    no_pelanggan: "109928374",
    nama_pelanggan: "Budi Setiadi",
    nilai_meter: 1234,
    metode_input: "ocr",
    created_at: "2024-12-15 08:30:00",
  },
  {
    id: 2,
    petugas_id: 1,
    pelanggan_id: 2,
    no_pelanggan: "109928375",
    nama_pelanggan: "Siti Rahayu",
    nilai_meter: 5678,
    metode_input: "ocr",
    created_at: "2024-12-15 09:15:00",
  },
  {
    id: 3,
    petugas_id: 2,
    pelanggan_id: 3,
    no_pelanggan: "109928376",
    nama_pelanggan: "Ahmad Yani",
    nilai_meter: 9012,
    metode_input: "manual",
    created_at: "2024-12-15 10:00:00",
  },
];
