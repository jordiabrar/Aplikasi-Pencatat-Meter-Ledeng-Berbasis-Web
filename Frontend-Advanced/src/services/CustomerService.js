import { MOCK_DATABASE } from "../constants/data";

// ============================================================================
// CUSTOMER SERVICE - API HANDLER LENGKAP
// ============================================================================

export const CustomerService = {
  // ==========================================================================
  // 1. FETCH CUSTOMER BY QR CODE
  // ==========================================================================
  async fetchByQR(qrCode) {
    try {
      await this._delay(500);
      const customer = MOCK_DATABASE[qrCode];

      if (customer) {
        console.log("✅ Customer found:", customer);
        return {
          success: true,
          data: customer,
          message: "Pelanggan ditemukan",
        };
      }

      return {
        success: false,
        data: null,
        message: "Pelanggan tidak ditemukan",
      };
    } catch (error) {
      console.error("Error fetching customer:", error);
      return {
        success: false,
        data: null,
        message: "Gagal mengambil data pelanggan",
      };
    }
  },

  // ==========================================================================
  // 2. SUBMIT METER READING (FITUR UTAMA)
  // ==========================================================================
  async submitMeterReading(data) {
    try {
      const errors = this._validateMeterReading(data);
      if (errors.length > 0) {
        return {
          success: false,
          message: errors.join(", "),
          data: null,
        };
      }

      await this._delay(1500);

      const meterReading = {
        id: Date.now(),
        petugas_id: data.petugas_id,
        pelanggan_id: data.pelanggan_id,
        nilai_meter: parseInt(data.nilai_meter),
        foto_meter_base64: data.foto_meter_base64,
        foto_rumah_base64: data.foto_rumah_base64,
        metode_input: data.metode_input || "ocr",
        catatan: data.catatan || null,
        tanggal_baca: new Date().toISOString().split("T")[0],
        created_at: new Date().toISOString(),
      };

      console.log("📤 Submitting meter reading:", {
        ...meterReading,
        foto_meter_base64: meterReading.foto_meter_base64 ? `[BASE64 ${this._getBase64Size(meterReading.foto_meter_base64)}KB]` : null,
        foto_rumah_base64: meterReading.foto_rumah_base64 ? `[BASE64 ${this._getBase64Size(meterReading.foto_rumah_base64)}KB]` : null,
      });

      return {
        success: true,
        data: meterReading,
        message: "Data pembacaan meter berhasil disimpan",
      };
    } catch (error) {
      console.error("❌ Error submitting meter reading:", error);
      return {
        success: false,
        data: null,
        message: error.message || "Gagal mengirim data pembacaan meter",
      };
    }
  },

  // ==========================================================================
  // ⭐ 3. SUBMIT KELUHAN - BARU!
  // ==========================================================================
  /**
   * Submit keluhan pelanggan
   * @param {Object} data - Data keluhan
   * @param {number} data.pembacaan_meter_id - ID pembacaan meter
   * @param {number} data.keluhan_id - ID jenis keluhan
   * @param {string} data.detail_keluhan - Detail keluhan (optional)
   * @param {string} data.foto_keluhan_base64 - JSON string array foto base64 (optional)
   * @returns {Promise<Object>}
   */
  async submitKeluhan(data) {
    try {
      // Validasi
      if (!data.pembacaan_meter_id) {
        return {
          success: false,
          message: "ID pembacaan meter wajib diisi",
          data: null,
        };
      }

      if (!data.keluhan_id) {
        return {
          success: false,
          message: "ID keluhan wajib diisi",
          data: null,
        };
      }

      await this._delay(500);

      const keluhanData = {
        id: Date.now() + Math.random(),
        pembacaan_meter_id: data.pembacaan_meter_id,
        keluhan_id: data.keluhan_id,
        detail_keluhan: data.detail_keluhan || null,
        foto_keluhan_base64: data.foto_keluhan_base64 || null,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      console.log("📝 Submitting keluhan:", {
        ...keluhanData,
        foto_keluhan_base64: keluhanData.foto_keluhan_base64 ? `[${JSON.parse(keluhanData.foto_keluhan_base64).length} foto]` : null,
      });

      return {
        success: true,
        data: keluhanData,
        message: "Keluhan berhasil dilaporkan",
      };

      // PRODUCTION: Uncomment untuk hit API
      /*
      const response = await fetch(`${API_URL}/keluhan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this._getToken()}`
        },
        body: JSON.stringify(keluhanData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit keluhan');
      }
      
      return await response.json();
      */
    } catch (error) {
      console.error("❌ Error submitting keluhan:", error);
      return {
        success: false,
        data: null,
        message: error.message || "Gagal mengirim keluhan",
      };
    }
  },

  // ==========================================================================
  // 4. FETCH HISTORY
  // ==========================================================================
  async fetchHistory(filters = {}) {
    try {
      await this._delay(300);

      console.log("📊 Fetching history with filters:", filters);

      return {
        success: true,
        data: [],
        total: 0,
        message: "Riwayat berhasil diambil",
      };
    } catch (error) {
      console.error("❌ Error fetching history:", error);
      return {
        success: false,
        data: [],
        total: 0,
        message: "Gagal mengambil riwayat pembacaan",
      };
    }
  },

  // ==========================================================================
  // 5. GET PELANGGAN BY ID
  // ==========================================================================
  async fetchPelangganById(pelangganId) {
    try {
      await this._delay(300);

      const pelanggan = Object.values(MOCK_DATABASE).find((p) => p.id === pelangganId);

      if (pelanggan) {
        return {
          success: true,
          data: pelanggan,
          message: "Pelanggan ditemukan",
        };
      }

      return {
        success: false,
        data: null,
        message: "Pelanggan tidak ditemukan",
      };
    } catch (error) {
      console.error("❌ Error fetching pelanggan:", error);
      return {
        success: false,
        data: null,
        message: "Gagal mengambil data pelanggan",
      };
    }
  },

  // ==========================================================================
  // 6. UPDATE METER READING
  // ==========================================================================
  async updateMeterReading(readingId, updateData) {
    try {
      await this._delay(500);

      console.log(`📝 Updating meter reading ${readingId}:`, updateData);

      return {
        success: true,
        data: { id: readingId, ...updateData },
        message: "Data berhasil diupdate",
      };
    } catch (error) {
      console.error("❌ Error updating meter reading:", error);
      return {
        success: false,
        data: null,
        message: "Gagal mengupdate data",
      };
    }
  },

  // ==========================================================================
  // 7. DELETE METER READING
  // ==========================================================================
  async deleteMeterReading(readingId) {
    try {
      await this._delay(500);

      console.log(`🗑️ Deleting meter reading ${readingId}`);

      return {
        success: true,
        message: "Data berhasil dihapus",
      };
    } catch (error) {
      console.error("❌ Error deleting meter reading:", error);
      return {
        success: false,
        message: "Gagal menghapus data",
      };
    }
  },

  // ==========================================================================
  // 8. UPLOAD PHOTO
  // ==========================================================================
  async uploadPhoto(base64Data, type) {
    try {
      if (!base64Data || !base64Data.startsWith("data:image")) {
        throw new Error("Format foto tidak valid");
      }

      await this._delay(1000);

      const fakeUrl = `https://storage.pdam.go.id/photos/${type}/${Date.now()}.jpg`;
      const size = this._getBase64Size(base64Data);

      console.log(`📸 Uploading ${type} photo:`, { size: `${size}KB`, url: fakeUrl });

      return {
        success: true,
        data: {
          url: fakeUrl,
          size: size,
          type: type,
        },
        message: "Foto berhasil diupload",
      };
    } catch (error) {
      console.error("❌ Error uploading photo:", error);
      return {
        success: false,
        data: null,
        message: error.message || "Gagal mengupload foto",
      };
    }
  },

  // ==========================================================================
  // 9. COMPRESS IMAGE
  // ==========================================================================
  async compressImage(base64, maxWidth = 1024, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL("image/jpeg", quality);

        console.log("🗜️ Image compressed:", {
          original: this._getBase64Size(base64) + "KB",
          compressed: this._getBase64Size(compressed) + "KB",
          reduction: Math.round((1 - this._getBase64Size(compressed) / this._getBase64Size(base64)) * 100) + "%",
        });

        resolve(compressed);
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = base64;
    });
  },

  // ==========================================================================
  // PRIVATE HELPER METHODS
  // ==========================================================================

  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  _getToken() {
    return "mock-token-12345";
  },

  _validateMeterReading(data) {
    const errors = [];

    if (!data.petugas_id) errors.push("ID Petugas wajib diisi");
    if (!data.pelanggan_id) errors.push("ID Pelanggan wajib diisi");
    if (!data.nilai_meter) errors.push("Nilai meter wajib diisi");
    if (data.nilai_meter && data.nilai_meter < 0) errors.push("Nilai meter tidak boleh negatif");
    if (!data.foto_meter_base64) errors.push("Foto meter wajib diisi");
    if (!data.foto_rumah_base64) errors.push("Foto rumah wajib diisi");

    return errors;
  },

  _getBase64Size(base64String) {
    if (!base64String) return 0;
    const stringLength = base64String.length - "data:image/jpeg;base64,".length;
    const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    return Math.round(sizeInBytes / 1024);
  },
};

// ============================================================================
// AUTHENTICATION HELPERS
// ============================================================================

export function setAuthToken(token) {
  console.log("🔐 Token set:", token);
}

export function clearAuthToken() {
  console.log("🔓 Token cleared");
}

export function isAuthenticated() {
  return true;
}
