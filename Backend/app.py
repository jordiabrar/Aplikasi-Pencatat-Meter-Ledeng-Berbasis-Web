from flask import Flask
from flask_cors import CORS
from db import init_db, db
from seri_meter import seri_meter_blueprint
from pelanggan_api import pelanggan_blueprint
from pemakaian_api import pemakaian_blueprint
from auth_api import auth_blueprint
import models

app = Flask(__name__)
CORS(app)

init_db(app)

with app.app_context():
    db.create_all()

app.register_blueprint(seri_meter_blueprint, url_prefix="/api")
app.register_blueprint(pelanggan_blueprint, url_prefix="/api")
app.register_blueprint(pemakaian_blueprint, url_prefix="/api")
app.register_blueprint(auth_blueprint, url_prefix="/api/auth")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
