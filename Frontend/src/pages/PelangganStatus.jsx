import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

function PelangganStatus() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/pemakaian/status-bulan-ini`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Gagal mengambil data");
      }

      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: 20 }}>Memuat data...</p>;
  }

  if (error) {
    return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Status Pencatatan Pelanggan</h2>
      <p>
        Periode: {data.bulan}/{data.tahun}
      </p>

      <div style={{ marginTop: 30 }}>
        <h3>Sudah Dicatat</h3>
        {data.sudah_dicatat.length === 0 ? (
          <p>Tidak ada pelanggan</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>No Seri Meter</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {data.sudah_dicatat.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nama}</td>
                  <td>{p.nomor_seri_meter}</td>
                  <td>{p.alamat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>Belum Dicatat</h3>
        {data.belum_dicatat.length === 0 ? (
          <p>Tidak ada pelanggan</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>No Seri Meter</th>
                <th>Alamat</th>
              </tr>
            </thead>
            <tbody>
              {data.belum_dicatat.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nama}</td>
                  <td>{p.nomor_seri_meter}</td>
                  <td>{p.alamat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 10,
  },
};

export default PelangganStatus;
