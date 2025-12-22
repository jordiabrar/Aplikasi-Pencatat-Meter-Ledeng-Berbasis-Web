export const CONFIG = {
  SCAN_INTERVAL: 1000, // Interval scan QR (ms)
  OCR_DELAY: 1500, // Delay simulasi OCR (ms)
  QR_DETECTION_CHANCE: 0.1, // 10% chance deteksi per scan
};

// ============================================================================
// DATA PETUGAS (Sesuai struktur database)
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
// DATA PELANGGAN (Sesuai struktur database)
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
// DATA RIWAYAT PEMBACAAN (Sesuai struktur database)
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
