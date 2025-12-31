from flask import Flask, send_from_directory
from flask_cors import CORS
from db import init_db, db
from seri_meter import seri_meter_blueprint
from pelanggan_api import pelanggan_blueprint
from pemakaian_api import pemakaian_blueprint
from auth_api import auth_blueprint
import models
import os

app = Flask(__name__)

# =========================
# CONFIG
# =========================
app.config["SECRET_KEY"] = "rahasia_aplikasi_meter_air"
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_HTTPONLY"] = True

# CORS agar frontend bisa kirim cookie session
CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173", "http://localhost:3000"]
)

# =========================
# INIT DATABASE
# =========================
init_db(app)

with app.app_context():
    db.create_all()

# =========================
# REGISTER BLUEPRINT
# =========================
app.register_blueprint(seri_meter_blueprint, url_prefix="/api")
app.register_blueprint(pelanggan_blueprint, url_prefix="/api")
app.register_blueprint(pemakaian_blueprint, url_prefix="/api")
app.register_blueprint(auth_blueprint, url_prefix="/api/auth")

# =========================
# SERVE FILE UPLOADS
# =========================
UPLOAD_FOLDER = "uploads"

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# =========================
# MAIN
# =========================
if __name__ == "__main__":
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
