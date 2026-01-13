from flask import Blueprint, jsonify
from models import Pelanggan

pelanggan_blueprint = Blueprint("pelanggan", __name__)

@pelanggan_blueprint.route("/pelanggan/id/<int:pelanggan_id>", methods=["GET"])
def get_pelanggan_by_id(pelanggan_id):
    try:
        pelanggan = Pelanggan.query.get(pelanggan_id)

        if not pelanggan:
            return jsonify({
                "success": False,
                "message": "Pelanggan tidak ditemukan"
            }), 404

        return jsonify({
            "success": True,
            "id": pelanggan.id,
            "nama_pelanggan": pelanggan.nama_pelanggan,
            "alamat": pelanggan.alamat,
            "golongan": pelanggan.golongan,
            "nomor_seri_meter": pelanggan.nomor_seri_meter
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Terjadi kesalahan: {str(e)}"
        }), 500


@pelanggan_blueprint.route("/pelanggan/seri/<string:nomor_seri>", methods=["GET"])
def get_pelanggan_by_seri(nomor_seri):
    try:
        if not nomor_seri or not nomor_seri.strip():
            return jsonify({
                "success": False,
                "message": "Nomor seri tidak boleh kosong"
            }), 400

        pelanggan = Pelanggan.query.filter_by(
            nomor_seri_meter=nomor_seri.strip()
        ).first()

        if not pelanggan:
            return jsonify({
                "success": False,
                "message": "Pelanggan tidak ditemukan"
            }), 404

        return jsonify({
            "success": True,
            "id": pelanggan.id,
            "nama_pelanggan": pelanggan.nama_pelanggan,
            "alamat": pelanggan.alamat,
            "golongan": pelanggan.golongan,
            "nomor_seri_meter": pelanggan.nomor_seri_meter
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Terjadi kesalahan: {str(e)}"
        }), 500
