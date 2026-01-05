import React, { useState, useRef } from "react";
import { AlertTriangle, Camera, X, Plus } from "lucide-react";
import { useAppState, useAppDispatch } from "../../context/AppContext";
import { KELUHAN_LIST } from "../../constants/data";

// ============================================================================
// KOMPONEN INPUT KELUHAN PELANGGAN
// ============================================================================
export function KeluhanInput() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [isKeluhanOpen, setIsKeluhanOpen] = useState(false);
  const [selectedKeluhan, setSelectedKeluhan] = useState([]);
  const [detailKeluhan, setDetailKeluhan] = useState("");
  const [fotoKeluhan, setFotoKeluhan] = useState([]);
  const fileInputRef = useRef(null);

  // ============================================================================
  // HANDLE ADD KELUHAN
  // ============================================================================
  const handleAddKeluhan = (keluhan) => {
    // Cek apakah keluhan sudah dipilih
    const isAlreadySelected = selectedKeluhan.some((k) => k.id === keluhan.id);

    if (isAlreadySelected) {
      // Remove jika sudah ada
      setSelectedKeluhan(selectedKeluhan.filter((k) => k.id !== keluhan.id));
    } else {
      // Add jika belum ada
      setSelectedKeluhan([...selectedKeluhan, keluhan]);
    }
  };

  // ============================================================================
  // HANDLE REMOVE KELUHAN
  // ============================================================================
  const handleRemoveKeluhan = (keluhanId) => {
    setSelectedKeluhan(selectedKeluhan.filter((k) => k.id !== keluhanId));
  };

  // ============================================================================
  // HANDLE FOTO KELUHAN
  // ============================================================================
  const handleAddFotoKeluhan = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoKeluhan((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            base64: reader.result,
            name: file.name,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFoto = (fotoId) => {
    setFotoKeluhan(fotoKeluhan.filter((f) => f.id !== fotoId));
  };

  // ============================================================================
  // SAVE TO STATE
  // ============================================================================
  const handleSaveKeluhan = () => {
    dispatch({
      type: "SET_KELUHAN",
      payload: {
        keluhan: selectedKeluhan,
        detail: detailKeluhan,
        foto: fotoKeluhan,
      },
    });
    setIsKeluhanOpen(false);
  };

  // ============================================================================
  // CLEAR KELUHAN
  // ============================================================================
  const handleClearKeluhan = () => {
    setSelectedKeluhan([]);
    setDetailKeluhan("");
    setFotoKeluhan([]);
    dispatch({ type: "SET_KELUHAN", payload: null });
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="keluhan-container">
      {/* Toggle Button */}
      <button className="btn-keluhan-toggle" onClick={() => setIsKeluhanOpen(!isKeluhanOpen)}>
        <AlertTriangle size={18} />
        <span>Ada Keluhan?</span>
        {selectedKeluhan.length > 0 && <span className="keluhan-badge">{selectedKeluhan.length}</span>}
      </button>

      {/* Keluhan Panel */}
      {isKeluhanOpen && (
        <div className="keluhan-panel">
          {/* Header */}
          <div className="keluhan-header">
            <h4>
              <AlertTriangle size={20} />
              Laporkan Keluhan
            </h4>
            <button className="btn-close-keluhan" onClick={() => setIsKeluhanOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Keluhan List - Checkbox Multiple */}
          <div className="keluhan-list-section">
            <label className="keluhan-section-label">Pilih Jenis Keluhan (bisa lebih dari 1)</label>
            <div className="keluhan-checkbox-list">
              {KELUHAN_LIST.map((keluhan) => (
                <label key={keluhan.id} className={`keluhan-checkbox-item ${selectedKeluhan.some((k) => k.id === keluhan.id) ? "selected" : ""}`}>
                  <input type="checkbox" checked={selectedKeluhan.some((k) => k.id === keluhan.id)} onChange={() => handleAddKeluhan(keluhan)} />
                  <div className="keluhan-checkbox-content">
                    <span className="keluhan-name">{keluhan.nama_keluhan}</span>
                    <span className="keluhan-kategori">{keluhan.kategori}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Selected Keluhan */}
          {selectedKeluhan.length > 0 && (
            <div className="selected-keluhan-section">
              <label className="keluhan-section-label">Keluhan Terpilih ({selectedKeluhan.length})</label>
              <div className="selected-keluhan-list">
                {selectedKeluhan.map((keluhan) => (
                  <div key={keluhan.id} className="selected-keluhan-item">
                    <span>{keluhan.nama_keluhan}</span>
                    <button className="btn-remove-keluhan" onClick={() => handleRemoveKeluhan(keluhan.id)}>
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detail Keluhan */}
          {selectedKeluhan.length > 0 && (
            <>
              <div className="keluhan-detail-section">
                <label className="keluhan-section-label">Detail Keluhan (Opsional)</label>
                <textarea className="keluhan-textarea" value={detailKeluhan} onChange={(e) => setDetailKeluhan(e.target.value)} placeholder="Contoh: Meteran rusak bagian kaca pecah, air tidak mengalir dengan lancar..." rows={3} />
              </div>

              {/* Foto Keluhan */}
              <div className="keluhan-foto-section">
                <label className="keluhan-section-label">Foto Bukti Keluhan (Opsional)</label>

                <button className="btn-add-foto-keluhan" onClick={handleAddFotoKeluhan}>
                  <Camera size={18} />
                  Tambah Foto Bukti
                </button>

                <input ref={fileInputRef} type="file" accept="image/*" capture="environment" multiple style={{ display: "none" }} onChange={handleFileChange} />

                {/* Preview Foto */}
                {fotoKeluhan.length > 0 && (
                  <div className="foto-keluhan-preview-list">
                    {fotoKeluhan.map((foto) => (
                      <div key={foto.id} className="foto-keluhan-preview-item">
                        <img src={foto.base64} alt={foto.name} />
                        <button className="btn-remove-foto-keluhan" onClick={() => handleRemoveFoto(foto.id)}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="keluhan-action-buttons">
                <button className="btn-save-keluhan" onClick={handleSaveKeluhan}>
                  Simpan Keluhan
                </button>
                <button className="btn-clear-keluhan" onClick={handleClearKeluhan}>
                  Batal
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Display Saved Keluhan Summary */}
      {state.keluhan && state.keluhan.keluhan.length > 0 && !isKeluhanOpen && (
        <div className="keluhan-summary">
          <div className="keluhan-summary-header">
            <AlertTriangle size={16} className="text-orange-600" />
            <span className="keluhan-summary-title">{state.keluhan.keluhan.length} Keluhan Terlaporkan</span>
          </div>
          <div className="keluhan-summary-items">
            {state.keluhan.keluhan.map((k, idx) => (
              <span key={idx} className="keluhan-summary-tag">
                {k.nama_keluhan}
              </span>
            ))}
          </div>
          <button className="btn-edit-keluhan" onClick={() => setIsKeluhanOpen(true)}>
            Edit Keluhan
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   CSS - TAMBAHKAN KE index.css
   ============================================================================

.keluhan-container {
  margin-top: 20px;
}

.btn-keluhan-toggle {
  width: 100%;
  padding: 14px 16px;
  background: #fff7ed;
  border: 2px solid #fed7aa;
  border-radius: 12px;
  color: #ea580c;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.btn-keluhan-toggle:hover {
  background: #ffedd5;
  border-color: #fb923c;
}

.keluhan-badge {
  position: absolute;
  right: 12px;
  background: #ea580c;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
}

.keluhan-panel {
  margin-top: 12px;
  background: white;
  border: 2px solid #fed7aa;
  border-radius: 12px;
  padding: 16px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.keluhan-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #fed7aa;
}

.keluhan-header h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 800;
  color: #ea580c;
  margin: 0;
}

.btn-close-keluhan {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
}

.btn-close-keluhan:hover {
  background: #fee2e2;
  color: #dc2626;
}

.keluhan-list-section {
  margin-bottom: 16px;
}

.keluhan-section-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
}

.keluhan-checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 4px;
}

.keluhan-checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.keluhan-checkbox-item:hover {
  border-color: #fed7aa;
  background: #fffbeb;
}

.keluhan-checkbox-item.selected {
  border-color: #ea580c;
  background: #fff7ed;
}

.keluhan-checkbox-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #ea580c;
}

.keluhan-checkbox-content {
  flex: 1;
}

.keluhan-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 2px;
}

.keluhan-kategori {
  display: inline-block;
  font-size: 11px;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: capitalize;
}

.selected-keluhan-section {
  margin-bottom: 16px;
}

.selected-keluhan-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.selected-keluhan-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ea580c;
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.btn-remove-keluhan {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-remove-keluhan:hover {
  background: rgba(255, 255, 255, 0.5);
}

.keluhan-detail-section {
  margin-bottom: 16px;
}

.keluhan-textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s;
}

.keluhan-textarea:focus {
  outline: none;
  border-color: #ea580c;
}

.keluhan-foto-section {
  margin-bottom: 16px;
}

.btn-add-foto-keluhan {
  width: 100%;
  padding: 12px;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 10px;
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-add-foto-keluhan:hover {
  border-color: #ea580c;
  color: #ea580c;
  background: #fff7ed;
}

.foto-keluhan-preview-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.foto-keluhan-preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
}

.foto-keluhan-preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-foto-keluhan {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(239, 68, 68, 0.9);
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-remove-foto-keluhan:hover {
  background: #dc2626;
}

.keluhan-action-buttons {
  display: flex;
  gap: 10px;
}

.btn-save-keluhan {
  flex: 1;
  padding: 14px;
  background: #ea580c;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save-keluhan:hover {
  background: #c2410c;
}

.btn-clear-keluhan {
  padding: 14px 20px;
  background: #f1f5f9;
  color: #64748b;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear-keluhan:hover {
  background: #e2e8f0;
}

.keluhan-summary {
  margin-top: 12px;
  background: #fff7ed;
  border: 2px solid #fed7aa;
  border-radius: 12px;
  padding: 14px;
}

.keluhan-summary-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.keluhan-summary-title {
  font-size: 14px;
  font-weight: 700;
  color: #ea580c;
}

.keluhan-summary-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.keluhan-summary-tag {
  font-size: 12px;
  color: #9a3412;
  background: #ffedd5;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.btn-edit-keluhan {
  width: 100%;
  padding: 10px;
  background: white;
  border: 2px solid #fed7aa;
  border-radius: 8px;
  color: #ea580c;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit-keluhan:hover {
  background: #ffedd5;
}

@media (max-width: 768px) {
  .foto-keluhan-preview-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

============================================================================ */
