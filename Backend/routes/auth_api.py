from flask import Blueprint, request, jsonify, session
from models import PencatatMeter
from db import db

auth_blueprint = Blueprint("auth", __name__)

# =========================
# SIGNUP
# =========================
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
        "success": True,
        "message": "Signup berhasil",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })


# =========================
# LOGIN
# =========================
@auth_blueprint.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "success": False,
            "message": "Username dan password wajib diisi"
        }), 400

    user = PencatatMeter.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({
            "success": False,
            "message": "Username atau password salah"
        }), 401

    # simpan ke session
    session["user_id"] = user.id
    session["username"] = user.username

    return jsonify({
        "success": True,
        "message": "Login berhasil",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })


# =========================
# LOGOUT
# =========================
@auth_blueprint.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({
        "success": True,
        "message": "Logout berhasil"
    })


# =========================
# CEK LOGIN (OPTIONAL)
# =========================
@auth_blueprint.route("/me", methods=["GET"])
def me():
    if "user_id" not in session:
        return jsonify({
            "logged_in": False
        }), 401

    user = PencatatMeter.query.get(session["user_id"])

    return jsonify({
        "logged_in": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    })
