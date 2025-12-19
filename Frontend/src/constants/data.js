export const CONFIG = {
  SCAN_INTERVAL: 1000, // Interval scan QR (ms)
  OCR_DELAY: 1500, // Delay simulasi OCR (ms)
  QR_DETECTION_CHANCE: 0.1, // 10% chance deteksi per scan
};

export const MOCK_DATABASE = {
  QR001: {
    nama: "Budi Setiadi",
    noPel: "109928374",
    alamat: "Jl. Tirta Utama No. 8",
  },
  QR002: {
    nama: "Siti Rahayu",
    noPel: "109928375",
    alamat: "Jl. Merdeka No. 12",
  },
  QR003: {
    nama: "Ahmad Yani",
    noPel: "109928376",
    alamat: "Jl. Sudirman No. 45",
  },
};

export const PETUGAS_LIST = [
  { name: "Alta (Kimora)", area: "Area 01" },
  { name: "Budi Gunawan", area: "Area 02" },
  { name: "Siti Aminah", area: "Area 03" },
];

export const INITIAL_HISTORY = [
  { id: "001", nama: "Budi Setiadi", status: "Terverifikasi", meter: "1234" },
  { id: "002", nama: "Siti Rahayu", status: "Terverifikasi", meter: "5678" },
  { id: "003", nama: "Ahmad Yani", status: "Terverifikasi", meter: "9012" },
];
