import { MOCK_DATABASE } from "../constants/data";

export const CustomerService = {
  /**
   * Fetch customer data by QR code
   * @param {string} qrCode - QR code string
   * @returns {Promise<Object|null>}
   */
  async fetchByQR(qrCode) {
    // Simulasi API call dengan delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_DATABASE[qrCode] || null;
  },

  /**
   * Submit meter reading to backend
   * @param {Object} data - Reading data
   * @returns {Promise<Object>}
   */
  async submitMeterReading(data) {
    // Simulasi submit ke backend
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("📤 Submitting data:", data);

    return {
      success: true,
      id: Date.now().toString(),
      message: "Data berhasil disimpan",
    };
  },

  /**
   * Get reading history (untuk future use)
   * @returns {Promise<Array>}
   */
  async fetchHistory() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [];
  },
};
