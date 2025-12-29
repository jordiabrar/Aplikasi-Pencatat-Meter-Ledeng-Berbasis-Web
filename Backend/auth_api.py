from flask import Blueprint, request, jsonify
from models import PencatatMeter
from db import db

auth_blueprint = Blueprint("auth", __name__)

@auth_blueprint.route("/signup", methods=["POST"])
def signup():
    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "Data tidak lengkap"}), 400

    if PencatatMeter.query.filter(
        (PencatatMeter.username == username) |
        (PencatatMeter.email == email)
    ).first():
        return jsonify({"message": "Username atau email sudah terdaftar"}), 400

    user = PencatatMeter(
        username=username,
        email=email
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Signup berhasil",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })


@auth_blueprint.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    user = PencatatMeter.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({"message": "Username atau password salah"}), 401

    return jsonify({
        "message": "Login berhasil",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })
