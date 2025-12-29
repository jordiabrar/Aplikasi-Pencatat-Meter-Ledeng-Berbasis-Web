import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const API_BASE = "http://localhost:5000";

function InputKubik() {
  const location = useLocation();
  const navigate = useNavigate();
  const pelanggan = location.state?.pelanggan;

  const [meterAwal, setMeterAwal] = useState("");
  const [meterAkhir, setMeterAkhir] = useState("");
  const [riwayat, setRiwayat] = useState([]);

  if (!pelanggan) {
    return (
      <div>
        <p>Data pelanggan tidak ditemukan</p>
        <button onClick={() => navigate("/scan")}>Kembali ke Scan</button>
      </div>
    );
  }

  const pemakaian = meterAwal && meterAkhir ? meterAkhir - meterAwal : 0;

  const simpan = async () => {
    await fetch(`${API_BASE}/api/pemakaian`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pelanggan_id: pelanggan.id,
        meter_awal: Number(meterAwal),
        meter_akhir: Number(meterAkhir),
        periode_bulan: new Date().getMonth() + 1,
        periode_tahun: new Date().getFullYear(),
        petugas: "Petugas Lapangan",
      }),
    });

    alert("Data pemakaian tersimpan");
  };

  const loadRiwayat = async () => {
    const res = await fetch(`${API_BASE}/api/pemakaian/${pelanggan.id}/last-3`);
    setRiwayat(await res.json());
  };

  return (
    <div>
      <h2>Input Pemakaian Meter</h2>

      <p>
        <b>Nama:</b> {pelanggan.nama_pelanggan}
      </p>
      <p>
        <b>Nomor Seri:</b> {pelanggan.nomor_seri_meter}
      </p>

      <input
        type="number"
        placeholder="Meter Awal"
        value={meterAwal}
        onChange={(e) => setMeterAwal(e.target.value)}
      />

      <input
        type="number"
        placeholder="Meter Akhir"
        value={meterAkhir}
        onChange={(e) => setMeterAkhir(e.target.value)}
      />

      <p>
        Pemakaian: <b>{pemakaian} m³</b>
      </p>

      <button onClick={simpan}>Simpan Pemakaian</button>

      <hr />

      <button onClick={loadRiwayat}>Lihat Pemakaian 3 Bulan Terakhir</button>

      {riwayat.map((r, i) => (
        <p key={i}>
          {r.bulan}/{r.tahun} → {r.pemakaian} m³
        </p>
      ))}
    </div>
  );
}

export default InputKubik;
