import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const API_BASE = "http://localhost:5000";

function InputKubik() {
  const location = useLocation();
  const navigate = useNavigate();
  const pelanggan = location.state?.pelanggan;

  const user = JSON.parse(localStorage.getItem("user"));

  const [meterAwal, setMeterAwal] = useState("");
  const [meterAkhir, setMeterAkhir] = useState("");
  const [fotoMeteran, setFotoMeteran] = useState(null);
  const [fotoRumah, setFotoRumah] = useState(null);
  const [riwayat, setRiwayat] = useState([]);
  const [loadingAvg, setLoadingAvg] = useState(false);

  if (!pelanggan) {
    return (
      <div>
        <p>Data pelanggan tidak ditemukan</p>
        <button onClick={() => navigate("/scan")}>Kembali</button>
      </div>
    );
  }

  const pemakaian =
    meterAwal && meterAkhir ? Number(meterAkhir) - Number(meterAwal) : 0;

  const simpan = async () => {
    if (!user) {
      alert("Silakan login ulang");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("pelanggan_id", pelanggan.id);
    formData.append("meter_awal", meterAwal);
    formData.append("meter_akhir", meterAkhir);
    formData.append("periode_bulan", new Date().getMonth() + 1);
    formData.append("periode_tahun", new Date().getFullYear());
    formData.append("petugas", user.username);

    if (fotoMeteran) formData.append("foto_meteran", fotoMeteran);
    if (fotoRumah) formData.append("foto_rumah", fotoRumah);

    const res = await fetch(`${API_BASE}/api/pemakaian`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Unauthorized, silakan login ulang");
      navigate("/login");
      return;
    }

    alert("Pemakaian tersimpan");
    setMeterAwal("");
    setMeterAkhir("");
    setFotoMeteran(null);
    setFotoRumah(null);
  };

  const loadRiwayat = async () => {
    const res = await fetch(`${API_BASE}/api/pemakaian/${pelanggan.id}/last-3`);
    const data = await res.json();
    setRiwayat(data);
  };

  const hitungRataRata = async () => {
    if (!meterAwal) {
      alert("Isi meter awal terlebih dahulu");
      return;
    }

    setLoadingAvg(true);
    const res = await fetch(`${API_BASE}/api/pemakaian/${pelanggan.id}/avg-3`);
    const data = await res.json();
    setLoadingAvg(false);

    if (!data.success) {
      alert(data.message);
      return;
    }

    setMeterAkhir(Number(meterAwal) + data.rata_rata);
    alert(`Rata rata pemakaian: ${data.rata_rata} m³`);
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
        <b>Pemakaian:</b> {pemakaian} m³
      </p>

      <button onClick={hitungRataRata} disabled={loadingAvg}>
        {loadingAvg ? "Menghitung..." : "Gunakan Rata Rata 3 Bulan"}
      </button>

      <hr />

      <label>Foto Meteran</label>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => setFotoMeteran(e.target.files[0])}
      />

      <label>Foto Rumah</label>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => setFotoRumah(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={simpan}>Simpan Pemakaian</button>

      <hr />

      <button onClick={loadRiwayat}>Lihat 3 Bulan Terakhir</button>

      {riwayat.map((r, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginTop: 10,
          }}
        >
          <p>
            <b>Periode:</b> {r.periode_bulan}/{r.periode_tahun}
          </p>
          <p>Meter Awal: {r.meter_awal}</p>
          <p>Meter Akhir: {r.meter_akhir}</p>
          <p>Pemakaian: {r.pemakaian_kubik} m³</p>

          {r.foto_meteran && (
            <div>
              <b>Foto Meteran</b>
              <br />
              <img src={r.foto_meteran} width="200" />
            </div>
          )}

          {r.foto_rumah && (
            <div style={{ marginTop: 8 }}>
              <b>Foto Rumah</b>
              <br />
              <img src={r.foto_rumah} width="200" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default InputKubik;
