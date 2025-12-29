from flask import Blueprint, request, jsonify
from datetime import datetime
from models import PemakaianMeter, Pelanggan
from db import db

pemakaian_blueprint = Blueprint("pemakaian", __name__)

# SIMPAN PEMAKAIAN BARU
@pemakaian_blueprint.route("/pemakaian", methods=["POST"])
def tambah_pemakaian():
    data = request.json

    pelanggan = Pelanggan.query.get(data["pelanggan_id"])
    if not pelanggan:
        return jsonify({"success": False, "message": "Pelanggan tidak ditemukan"}), 404

    meter_awal = int(data["meter_awal"])
    meter_akhir = int(data["meter_akhir"])

    if meter_akhir < meter_awal:
        return jsonify({"success": False, "message": "Meter akhir tidak valid"}), 400

    pemakaian = PemakaianMeter(
        pelanggan_id=pelanggan.id,
        nomor_seri_meter=pelanggan.nomor_seri_meter,
        meter_awal=meter_awal,
        meter_akhir=meter_akhir,
        pemakaian_kubik=meter_akhir - meter_awal,
        periode_bulan=data["periode_bulan"],
        periode_tahun=data["periode_tahun"],
        petugas=data.get("petugas"),
        keterangan=data.get("keterangan"),
    )

    db.session.add(pemakaian)
    db.session.commit()

    return jsonify({"success": True})


# RIWAYAT 3 BULAN TERAKHIR
@pemakaian_blueprint.route("/pemakaian/<int:pelanggan_id>/last-3", methods=["GET"])
def pemakaian_3_bulan(pelanggan_id):
    data = (
        PemakaianMeter.query
        .filter_by(pelanggan_id=pelanggan_id)
        .order_by(PemakaianMeter.periode_tahun.desc(), PemakaianMeter.periode_bulan.desc())
        .limit(3)
        .all()
    )

    return jsonify([
        {
            "bulan": p.periode_bulan,
            "tahun": p.periode_tahun,
            "meter_awal": p.meter_awal,
            "meter_akhir": p.meter_akhir,
            "pemakaian": p.pemakaian_kubik
        }
        for p in data
    ])
