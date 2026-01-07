import os
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime
from models import PemakaianMeter, Pelanggan
from db import db
from werkzeug.utils import secure_filename

pemakaian_blueprint = Blueprint("pemakaian", __name__)


@pemakaian_blueprint.route("/pemakaian", methods=["POST"])
def tambah_pemakaian():
    data = request.form
    upload_folder = current_app.config["UPLOAD_FOLDER"]

    username_petugas = data.get("petugas")
    if not username_petugas:
        return jsonify({
            "success": False,
            "message": "Unauthorized"
        }), 401

    pelanggan = Pelanggan.query.get(data.get("pelanggan_id"))
    if not pelanggan:
        return jsonify({
            "success": False,
            "message": "Pelanggan tidak ditemukan"
        }), 404

    try:
        meter_awal = int(data.get("meter_awal"))
        meter_akhir = int(data.get("meter_akhir"))
    except (TypeError, ValueError):
        return jsonify({
            "success": False,
            "message": "Data meter tidak valid"
        }), 400

    if meter_akhir < meter_awal:
        return jsonify({
            "success": False,
            "message": "Meter akhir lebih kecil dari meter awal"
        }), 400

    foto_meteran = request.files.get("foto_meteran")
    foto_rumah = request.files.get("foto_rumah")

    meter_path = None
    rumah_path = None
    timestamp = int(datetime.utcnow().timestamp())

    if foto_meteran:
        filename = secure_filename(foto_meteran.filename)
        meter_path = f"meteran_{pelanggan.id}_{timestamp}_{filename}"
        foto_meteran.save(os.path.join(upload_folder, meter_path))

    if foto_rumah:
        filename = secure_filename(foto_rumah.filename)
        rumah_path = f"rumah_{pelanggan.id}_{timestamp}_{filename}"
        foto_rumah.save(os.path.join(upload_folder, rumah_path))

    pemakaian = PemakaianMeter(
        pelanggan_id=pelanggan.id,
        nomor_seri_meter=pelanggan.nomor_seri_meter,
        meter_awal=meter_awal,
        meter_akhir=meter_akhir,
        pemakaian_kubik=meter_akhir - meter_awal,
        periode_bulan=int(data.get("periode_bulan")),
        periode_tahun=int(data.get("periode_tahun")),
        petugas=username_petugas,
        keterangan=data.get("keterangan"),
        foto_meteran=meter_path,
        foto_rumah=rumah_path,
        tanggal_catat=datetime.utcnow()
    )

    db.session.add(pemakaian)
    db.session.commit()

    return jsonify({"success": True})


@pemakaian_blueprint.route("/pemakaian/<int:pelanggan_id>/last-3", methods=["GET"])
def pemakaian_3_bulan(pelanggan_id):
    data = (
        PemakaianMeter.query
        .filter_by(pelanggan_id=pelanggan_id)
        .order_by(
            PemakaianMeter.periode_tahun.desc(),
            PemakaianMeter.periode_bulan.desc()
        )
        .limit(3)
        .all()
    )

    return jsonify([
        {
            "periode_bulan": p.periode_bulan,
            "periode_tahun": p.periode_tahun,
            "meter_awal": p.meter_awal,
            "meter_akhir": p.meter_akhir,
            "pemakaian_kubik": p.pemakaian_kubik,
            "petugas": p.petugas,
            "foto_meteran": (
                f"{request.host_url}uploads/{p.foto_meteran}"
                if p.foto_meteran else None
            ),
            "foto_rumah": (
                f"{request.host_url}uploads/{p.foto_rumah}"
                if p.foto_rumah else None
            ),
        }
        for p in data
    ])


@pemakaian_blueprint.route("/pemakaian/<int:pelanggan_id>/avg-3", methods=["GET"])
def rata_rata_3_bulan(pelanggan_id):
    data = (
        PemakaianMeter.query
        .filter_by(pelanggan_id=pelanggan_id)
        .order_by(
            PemakaianMeter.periode_tahun.desc(),
            PemakaianMeter.periode_bulan.desc()
        )
        .limit(3)
        .all()
    )

    if not data:
        return jsonify({
            "success": False,
            "message": "Belum ada data pemakaian"
        }), 404

    total = sum(p.pemakaian_kubik for p in data)
    rata_rata = round(total / len(data))

    return jsonify({
        "success": True,
        "rata_rata": rata_rata
    })


@pemakaian_blueprint.route("/pemakaian/status-bulan-ini", methods=["GET"])
def status_pemakaian_bulan_ini():
    now = datetime.now()
    bulan = now.month
    tahun = now.year

    subquery = (
        db.session.query(PemakaianMeter.pelanggan_id)
        .filter(
            PemakaianMeter.periode_bulan == bulan,
            PemakaianMeter.periode_tahun == tahun
        )
        .subquery()
    )

    sudah_dicatat = (
        Pelanggan.query
        .filter(Pelanggan.id.in_(subquery))
        .all()
    )

    belum_dicatat = (
        Pelanggan.query
        .filter(~Pelanggan.id.in_(subquery))
        .all()
    )

    return jsonify({
        "bulan": bulan,
        "tahun": tahun,
        "sudah_dicatat": [
            {
                "id": p.id,
                "nama": p.nama_pelanggan,
                "nomor_seri_meter": p.nomor_seri_meter,
                "alamat": p.alamat
            }
            for p in sudah_dicatat
        ],
        "belum_dicatat": [
            {
                "id": p.id,
                "nama": p.nama_pelanggan,
                "nomor_seri_meter": p.nomor_seri_meter,
                "alamat": p.alamat
            }
            for p in belum_dicatat
        ]
    })

