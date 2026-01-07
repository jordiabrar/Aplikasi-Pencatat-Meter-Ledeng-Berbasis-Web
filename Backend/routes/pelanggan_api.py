from flask import Blueprint, jsonify
from models import Pelanggan

pelanggan_blueprint = Blueprint("pelanggan", __name__)

@pelanggan_blueprint.route("/pelanggan/id/<int:pelanggan_id>", methods=["GET"])
def get_pelanggan_by_id(pelanggan_id):
    pelanggan = Pelanggan.query.get(pelanggan_id)

    if not pelanggan:
        return jsonify({"message": "Pelanggan tidak ditemukan"}), 404

    return jsonify({
        "id": pelanggan.id,
        "nama_pelanggan": pelanggan.nama_pelanggan,
        "alamat": pelanggan.alamat,
        "golongan": pelanggan.golongan,
        "nomor_seri_meter": pelanggan.nomor_seri_meter
    })


@pelanggan_blueprint.route("/pelanggan/seri/<string:nomor_seri>", methods=["GET"])
def get_pelanggan_by_seri(nomor_seri):
    pelanggan = Pelanggan.query.filter_by(
        nomor_seri_meter=nomor_seri
    ).first()

    if not pelanggan:
        return jsonify({"message": "Pelanggan tidak ditemukan"}), 404

    return jsonify({
        "id": pelanggan.id,
        "nama_pelanggan": pelanggan.nama_pelanggan,
        "alamat": pelanggan.alamat,
        "golongan": pelanggan.golongan,
        "nomor_seri_meter": pelanggan.nomor_seri_meter
    })
