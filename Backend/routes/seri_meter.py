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

    try:
        image_file = request.files["image"]
        
        # Validate file size (max 10MB)
        if image_file.content_length and image_file.content_length > 10 * 1024 * 1024:
            return jsonify({
                "success": False,
                "message": "File terlalu besar. Maksimal 10MB"
            }), 400
        
        image_bytes = image_file.read()
        
        # Validate image can be opened
        try:
            img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception as e:
            return jsonify({
                "success": False,
                "message": "File bukan gambar yang valid"
            }), 400
        
        img = np.array(img)

        # Process image
        try:
            processed = preprocess_image(img)
            nomor_seri, raw_text = read_serial_number(processed)
        except Exception as e:
            return jsonify({
                "success": False,
                "message": f"Gagal memproses gambar: {str(e)}"
            }), 500

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
                        "golongan": pelanggan.golongan,
                        "nomor_seri_meter": pelanggan.nomor_seri_meter
                    } if pelanggan else None
                }
            ]
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Terjadi kesalahan: {str(e)}"
        }), 500
