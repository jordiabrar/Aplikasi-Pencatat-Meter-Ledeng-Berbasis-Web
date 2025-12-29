from flask import Blueprint, request, jsonify
import cv2
import numpy as np
import pytesseract
import re
from PIL import Image
import io

from models import Pelanggan

seri_meter_blueprint = Blueprint("seri_meter", __name__)

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


# =========================
# PREPROCESS IMAGE
# =========================
def preprocess(img):
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    gray = cv2.resize(gray, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    blur = cv2.GaussianBlur(gray, (3, 3), 0)

    thresh = cv2.adaptiveThreshold(
        blur,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        2
    )
    return thresh


# =========================
# OCR ALFANUMERIK SERI METER
# =========================
def read_seri_meter(img):
    config = (
        "--psm 7 "
        "-c tessedit_char_whitelist="
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-"
    )

    raw = pytesseract.image_to_string(img, config=config)

    cleaned = re.sub(r"[^A-Za-z0-9-]", "", raw)

    return cleaned.upper(), raw.strip()


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

    processed = preprocess(img)
    nomor_seri, raw_text = read_seri_meter(processed)

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
