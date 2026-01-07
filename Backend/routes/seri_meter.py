from flask import Blueprint, request, jsonify
import numpy as np
from PIL import Image
import io

from models import Pelanggan
from utils.image_processing import preprocess_image, read_serial_number

seri_meter_blueprint = Blueprint("seri_meter", __name__)


# =========================
# ENDPOINT SCAN SERI METER
# =========================
@seri_meter_blueprint.route("/seri-meter", methods=["POST"])
def scan_seri_meter():
    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "image not found"
        }), 400

    image_bytes = request.files["image"].read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = np.array(img)

    processed = preprocess_image(img)
    nomor_seri, raw_text = read_serial_number(processed)

    pelanggan = None
    if nomor_seri:
        pelanggan = Pelanggan.query.filter_by(
            nomor_seri_meter=nomor_seri
        ).first()

    return jsonify({
        "success": True,
        "results": [
            {
                "value": nomor_seri,
                "raw_text": raw_text,
                "panjang": len(nomor_seri),
                "valid": len(nomor_seri) >= 5,
                "pelanggan": {
                    "id": pelanggan.id,
                    "nama": pelanggan.nama_pelanggan,
                    "alamat": pelanggan.alamat,
                    "golongan": pelanggan.golongan
                } if pelanggan else None
            }
        ]
    })
