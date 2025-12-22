import { MOCK_DATABASE } from "../constants/data";

export const CustomerService = {
  /**
   * Fetch customer data by QR code
   * @param {string} qrCode - QR code string (misal: "QR001")
   * @returns {Promise<Object|null>}
   */
  async fetchByQR(qrCode) {
    // Simulasi API call dengan delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const customer = MOCK_DATABASE[qrCode];

    if (customer) {
      console.log("✅ Customer found:", customer);
      return customer;
    }

    console.log("❌ Customer not found for QR:", qrCode);
    return null;
  },

  /**
   * Submit meter reading to backend
   * Sesuai dengan struktur tabel METER_READINGS
   * @param {Object} data - Reading data
   * @param {number} data.petugas_id - ID petugas yang mencatat
   * @param {number} data.pelanggan_id - ID pelanggan
   * @param {number} data.nilai_meter - Angka meter dalam m³
   * @param {string} data.foto_meter - Path/URL foto meter
   * @param {string} data.metode_input - 'qr_scan' | 'manual' | 'ocr'
   * @param {string} data.catatan - Catatan tambahan (optional)
   * @returns {Promise<Object>}
   */
  async submitMeterReading(data) {
    // Simulasi submit ke backend
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Format data sesuai struktur database
    const meterReading = {
      id: Date.now(), // Auto increment di database
      petugas_id: data.petugas_id,
      pelanggan_id: data.pelanggan_id,
      nilai_meter: parseInt(data.nilai_meter),
      foto_meter: data.foto_meter || null,
      metode_input: data.metode_input || "ocr",
      catatan: data.catatan || null,
      created_at: new Date().toISOString(),
    };

    console.log("📤 Submitting meter reading:", meterReading);

    // Simulasi response dari backend
    return {
      success: true,
      data: meterReading,
      message: "Data pembacaan meter berhasil disimpan",
    };
  },

  /**
   * Get reading history
   * @param {Object} filters - Filter options
   * @param {number} filters.petugas_id - Filter by petugas ID
   * @param {number} filters.pelanggan_id - Filter by pelanggan ID
   * @param {string} filters.start_date - Start date filter
   * @param {string} filters.end_date - End date filter
   * @returns {Promise<Array>}
   */
  async fetchHistory(filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log("📊 Fetching history with filters:", filters);

    // Simulasi fetch dari backend
    // Di production, ini akan hit API endpoint
    return [];
  },

  /**
   * Get pelanggan details by ID
   * @param {number} pelangganId
   * @returns {Promise<Object|null>}
   */
  async fetchPelangganById(pelangganId) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find in mock database
    const pelanggan = Object.values(MOCK_DATABASE).find((p) => p.id === pelangganId);

    return pelanggan || null;
  },
};
