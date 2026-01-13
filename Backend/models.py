from db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class Pelanggan(db.Model):
    __tablename__ = "pelanggan"

    id = db.Column(db.Integer, primary_key=True)
    nomor_seri_meter = db.Column(db.String(50), unique=True, nullable=False)
    nama_pelanggan = db.Column(db.String(100), nullable=False)
    alamat = db.Column(db.Text)
    golongan = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Masalah(db.Model):
    __tablename__ = "masalah"

    id = db.Column(db.Integer, primary_key=True)
    nama_masalah = db.Column(db.String(255), nullable=False, unique=True)

    def __repr__(self):
        return f"<Masalah {self.nama_masalah}>"


# =========================
# TABEL PIVOT
# =========================
pemakaian_masalah = db.Table(
    "pemakaian_masalah",
    db.Column(
        "pemakaian_id",
        db.Integer,
        db.ForeignKey("pemakaian_meter.id", ondelete="CASCADE"),
        primary_key=True
    ),
    db.Column(
        "masalah_id",
        db.Integer,
        db.ForeignKey("masalah.id", ondelete="CASCADE"),
        primary_key=True
    )
)


class PemakaianMeter(db.Model):
    __tablename__ = "pemakaian_meter"

    id = db.Column(db.Integer, primary_key=True)

    pelanggan_id = db.Column(
        db.Integer,
        db.ForeignKey("pelanggan.id"),
        nullable=False
    )

    nomor_seri_meter = db.Column(db.String(50), nullable=False)

    meter_awal = db.Column(db.Integer, nullable=False)
    meter_akhir = db.Column(db.Integer, nullable=False)
    pemakaian_kubik = db.Column(db.Integer, nullable=False)

    periode_bulan = db.Column(db.Integer, nullable=False)
    periode_tahun = db.Column(db.Integer, nullable=False)

    foto_meteran = db.Column(db.String(255))
    foto_rumah = db.Column(db.String(255))

    tanggal_catat = db.Column(db.DateTime, default=datetime.utcnow)
    petugas = db.Column(db.String(100))
    keterangan = db.Column(db.Text)

    pelanggan = db.relationship(
        "Pelanggan",
        backref="riwayat_pemakaian"
    )

    masalah = db.relationship(
        "Masalah",
        secondary=pemakaian_masalah,
        backref="pemakaian_meter"
    )

    __table_args__ = (
        db.UniqueConstraint(
            "pelanggan_id",
            "periode_bulan",
            "periode_tahun",
            name="uniq_pelanggan_periode"
        ),
    )


class PencatatMeter(db.Model):
    __tablename__ = "pencatat_meter"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
