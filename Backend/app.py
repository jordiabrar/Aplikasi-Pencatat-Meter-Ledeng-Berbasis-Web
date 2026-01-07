from flask import Flask, send_from_directory
from flask_cors import CORS
from db import init_db, db
from config import config
from routes.seri_meter import seri_meter_blueprint
from routes.pelanggan_api import pelanggan_blueprint
from routes.pemakaian_api import pemakaian_blueprint
from routes.auth_api import auth_blueprint
import models
import os


def create_app(config_name='default'):
    """Application factory."""
    app = Flask(__name__)
    
    # =========================
    # CONFIG
    # =========================
    app.config.from_object(config[config_name])
    
    # CORS agar frontend bisa kirim cookie session
    CORS(
        app,
        supports_credentials=True,
        origins=app.config["CORS_ORIGINS"],
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
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
    upload_folder = app.config["UPLOAD_FOLDER"]
    
    @app.route("/uploads/<path:filename>")
    def uploaded_file(filename):
        return send_from_directory(upload_folder, filename)
    
    # Create upload folder if not exists
    os.makedirs(upload_folder, exist_ok=True)
    
    return app


# =========================
# MAIN
# =========================
if __name__ == "__main__":
    env = os.getenv("FLASK_ENV", "development")
    app = create_app(env)
    
    app.run(
        host=app.config["HOST"],
        port=app.config["PORT"],
        debug=app.config["DEBUG"]
    )
