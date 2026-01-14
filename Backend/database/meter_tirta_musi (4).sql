-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2026 at 01:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meter_tirta_musi`
--

-- --------------------------------------------------------

--
-- Table structure for table `masalah`
--

CREATE TABLE `masalah` (
  `id` int(11) NOT NULL,
  `kode` varchar(10) DEFAULT NULL,
  `nama_masalah` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `masalah`
--

INSERT INTO `masalah` (`id`, `kode`, `nama_masalah`, `created_at`) VALUES
(1, 'M01', 'Meter baik tapi ditaksir', '2026-01-12 10:39:36'),
(2, 'M02', 'Meter berputar terlalu cepat', '2026-01-12 10:39:36'),
(3, 'M03', 'Air tidak keluar', '2026-01-12 10:39:36'),
(4, 'M04', 'Meter kabur/berembun', '2026-01-12 10:39:36'),
(5, 'M05', 'Meter dilepas', '2026-01-12 10:39:36'),
(6, 'M06', 'Meter mundur', '2026-01-12 10:39:36'),
(7, 'M07', 'Meter macet', '2026-01-12 10:39:36'),
(8, 'M08', 'Kaca meter pecah', '2026-01-12 10:39:36'),
(9, 'M09', 'Meter tidak ketemu', '2026-01-12 10:39:36'),
(10, 'M10', 'Meter tertimbun', '2026-01-12 10:39:36'),
(11, 'M11', 'Meter tidak diakui', '2026-01-12 10:39:36'),
(12, 'M12', 'Meter hilang/dicuri', '2026-01-12 10:39:36'),
(13, 'M13', 'Putus sementara', '2026-01-12 10:39:36'),
(14, 'M14', 'Non fisik', '2026-01-12 10:39:36'),
(15, 'M15', 'Meter tidak ada', '2026-01-12 10:39:36'),
(16, 'M16', 'Putus permanen', '2026-01-12 10:39:36'),
(17, 'M17', 'Pelanggan tidak mau ganti meter', '2026-01-12 10:39:36'),
(18, 'M18', 'Tanah kosong rumah dibongkar', '2026-01-12 10:39:36'),
(19, 'M19', 'Rumah kosong', '2026-01-12 10:39:36'),
(20, 'M20', 'Pagar rumah terkunci', '2026-01-12 10:39:36'),
(21, 'M21', 'Penghuni tidak membukakan pintu', '2026-01-12 10:39:36'),
(22, 'M22', 'Rumah ada anjing', '2026-01-12 10:39:36'),
(23, 'M23', 'Pasangan baru', '2026-01-12 10:39:36'),
(24, 'M24', 'Meter baru dipasang/diganti', '2026-01-12 10:39:36'),
(25, 'M25', 'Ada indikasi pelanggaran', '2026-01-12 10:39:36'),
(26, 'M26', 'Meragukan', '2026-01-12 10:39:36'),
(27, 'M27', 'Banjir', '2026-01-12 10:39:36'),
(28, 'M28', 'QR code hilang', '2026-01-12 10:39:36'),
(29, 'M29', 'Papan stand ditempel', '2026-01-12 10:39:36'),
(30, 'M30', 'Pasang meter tidak standar', '2026-01-12 10:39:36'),
(31, 'M31', 'Tarif tidak sesuai', '2026-01-12 10:39:36'),
(32, 'M32', 'Stand dibacakan pelanggan', '2026-01-12 10:39:36'),
(33, 'M33', 'Kondisi bocor', '2026-01-12 10:39:36'),
(34, 'M34', 'Meter dalam rumah', '2026-01-12 10:39:36'),
(35, 'M35', 'Rumah kosong terkunci', '2026-01-12 10:39:36'),
(36, 'M36', 'Salah blok', '2026-01-12 10:39:36'),
(37, 'M37', 'Air tidak dipakai', '2026-01-12 10:39:36'),
(38, 'M38', 'Pipa dinas tidak standar', '2026-01-12 10:39:36'),
(39, 'M39', 'Pasang kembali', '2026-01-12 10:39:36'),
(40, 'M40', 'Meter baik', '2026-01-12 10:39:36'),
(41, 'M41', 'Pindah posisi meter', '2026-01-12 10:39:36'),
(42, 'M42', 'Tidak mau PPM', '2026-01-12 10:39:36'),
(43, 'M43', 'Stand via WA', '2026-01-12 10:39:36'),
(44, 'M44', 'Meter baik stand tunggu', '2026-01-12 10:39:36');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id` int(11) NOT NULL,
  `nomor_seri_meter` varchar(50) NOT NULL,
  `nama_pelanggan` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `golongan` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id`, `nomor_seri_meter`, `nama_pelanggan`, `alamat`, `golongan`, `created_at`) VALUES
(1, 'SM100001', 'Ahmad Fauzi', 'Jl. Merdeka No.1', 'A1', '2025-12-27 15:10:35'),
(2, 'SM100002', 'Siti Aisyah', 'Jl. Sudirman No.12', 'A1', '2025-12-27 15:10:35'),
(3, 'SM100003', 'Budi Santoso', 'Jl. Diponegoro No.5', 'A2', '2025-12-27 15:10:35'),
(4, 'SM100004', 'Rina Oktaviani', 'Jl. Ahmad Yani No.9', 'A1', '2025-12-27 15:10:35'),
(5, 'SM100005', 'Andi Pratama', 'Jl. Pahlawan No.3', 'A3', '2025-12-27 15:10:35'),
(6, 'SM100006', 'Dewi Lestari', 'Jl. Kartini No.8', 'A1', '2025-12-27 15:10:35'),
(7, 'SM100007', 'Rizky Ramadhan', 'Jl. Veteran No.14', 'A2', '2025-12-27 15:10:35'),
(8, 'SM100008', 'Putri Maharani', 'Jl. Anggrek No.6', 'A1', '2025-12-27 15:10:35'),
(9, 'SM100009', 'Hendra Wijaya', 'Jl. Melati No.10', 'A3', '2025-12-27 15:10:35'),
(10, 'SM100010', 'Nina Kurnia', 'Jl. Mawar No.4', 'A1', '2025-12-27 15:10:35'),
(11, 'SM100011', 'Doni Saputra', 'Jl. Kenanga No.7', 'A2', '2025-12-27 15:10:35'),
(12, 'SM100012', 'Maya Sari', 'Jl. Flamboyan No.2', 'A1', '2025-12-27 15:10:35'),
(13, 'SM100013', 'Fajar Nugroho', 'Jl. Cempaka No.15', 'A3', '2025-12-27 15:10:35'),
(14, 'SM100014', 'Lina Hartati', 'Jl. Teratai No.11', 'A1', '2025-12-27 15:10:35'),
(15, 'SM100015', 'Agus Salim', 'Jl. Rajawali No.13', 'A2', '2025-12-27 15:10:35'),
(16, 'SM100016', 'Yuni Astuti', 'Jl. Elang No.5', 'A1', '2025-12-27 15:10:35'),
(17, 'SM100017', 'Eko Prasetyo', 'Jl. Nangka No.18', 'A3', '2025-12-27 15:10:35'),
(18, 'SM100018', 'Intan Permata', 'Jl. Mangga No.20', 'A1', '2025-12-27 15:10:35'),
(19, 'SM100019', 'Arif Maulana', 'Jl. Rambutan No.16', 'A2', '2025-12-27 15:10:35'),
(20, 'SM100020', 'Sari Puspita', 'Jl. Durian No.21', 'A1', '2025-12-27 15:10:35');

-- --------------------------------------------------------

--
-- Table structure for table `pemakaian_masalah`
--

CREATE TABLE `pemakaian_masalah` (
  `pemakaian_id` int(11) NOT NULL,
  `masalah_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pemakaian_masalah`
--

INSERT INTO `pemakaian_masalah` (`pemakaian_id`, `masalah_id`) VALUES
(74, 9),
(74, 10);

-- --------------------------------------------------------

--
-- Table structure for table `pemakaian_meter`
--

CREATE TABLE `pemakaian_meter` (
  `id` int(11) NOT NULL,
  `pelanggan_id` int(11) NOT NULL,
  `nomor_seri_meter` varchar(50) NOT NULL,
  `meter_awal` int(11) NOT NULL,
  `meter_akhir` int(11) NOT NULL,
  `pemakaian_kubik` int(11) NOT NULL,
  `periode_bulan` tinyint(4) NOT NULL,
  `periode_tahun` smallint(6) NOT NULL,
  `tanggal_catat` datetime DEFAULT current_timestamp(),
  `petugas` varchar(100) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `foto_meteran` varchar(255) DEFAULT NULL,
  `foto_rumah` varchar(255) DEFAULT NULL
) ;

--
-- Dumping data for table `pemakaian_meter`
--

INSERT INTO `pemakaian_meter` (`id`, `pelanggan_id`, `nomor_seri_meter`, `meter_awal`, `meter_akhir`, `pemakaian_kubik`, `periode_bulan`, `periode_tahun`, `tanggal_catat`, `petugas`, `keterangan`, `foto_meteran`, `foto_rumah`) VALUES
(2, 1, 'SM100001', 120, 135, 15, 1, 2025, '2025-01-05 09:15:00', 'Petugas A', 'Normal', NULL, NULL),
(3, 2, 'SM100002', 98, 112, 14, 1, 2025, '2025-01-05 09:20:00', 'Petugas A', 'Normal', NULL, NULL),
(4, 3, 'SM100003', 210, 230, 20, 1, 2025, '2025-01-05 09:25:00', 'Petugas A', 'Normal', NULL, NULL),
(5, 4, 'SM100004', 75, 89, 14, 1, 2025, '2025-01-06 10:00:00', 'Petugas B', 'Normal', NULL, NULL),
(6, 5, 'SM100005', 300, 325, 25, 1, 2025, '2025-01-06 10:05:00', 'Petugas B', 'Pemakaian tinggi', NULL, NULL),
(7, 6, 'SM100006', 150, 162, 12, 1, 2025, '2025-01-06 10:10:00', 'Petugas B', 'Normal', NULL, NULL),
(8, 7, 'SM100007', 180, 198, 18, 1, 2025, '2025-01-07 08:45:00', 'Petugas C', 'Normal', NULL, NULL),
(9, 8, 'SM100008', 90, 105, 15, 1, 2025, '2025-01-07 08:50:00', 'Petugas C', 'Normal', NULL, NULL),
(10, 9, 'SM100009', 400, 430, 30, 1, 2025, '2025-01-07 08:55:00', 'Petugas C', 'Pemakaian tinggi', NULL, NULL),
(11, 10, 'SM100010', 60, 72, 12, 1, 2025, '2025-01-07 09:00:00', 'Petugas C', 'Normal', NULL, NULL),
(12, 11, 'SM100011', 220, 238, 18, 1, 2025, '2025-01-08 09:10:00', 'Petugas D', 'Normal', NULL, NULL),
(13, 12, 'SM100012', 110, 123, 13, 1, 2025, '2025-01-08 09:15:00', 'Petugas D', 'Normal', NULL, NULL),
(14, 13, 'SM100013', 500, 540, 40, 1, 2025, '2025-01-08 09:20:00', 'Petugas D', 'Pemakaian sangat tinggi', NULL, NULL),
(15, 14, 'SM100014', 85, 97, 12, 1, 2025, '2025-01-08 09:25:00', 'Petugas D', 'Normal', NULL, NULL),
(16, 15, 'SM100015', 260, 282, 22, 1, 2025, '2025-01-09 10:00:00', 'Petugas E', 'Normal', NULL, NULL),
(17, 16, 'SM100016', 95, 108, 13, 1, 2025, '2025-01-09 10:05:00', 'Petugas E', 'Normal', NULL, NULL),
(18, 17, 'SM100017', 350, 378, 28, 1, 2025, '2025-01-09 10:10:00', 'Petugas E', 'Pemakaian tinggi', NULL, NULL),
(19, 18, 'SM100018', 100, 114, 14, 1, 2025, '2025-01-09 10:15:00', 'Petugas E', 'Normal', NULL, NULL),
(20, 19, 'SM100019', 240, 260, 20, 1, 2025, '2025-01-10 08:30:00', 'Petugas F', 'Normal', NULL, NULL),
(21, 20, 'SM100020', 70, 82, 12, 1, 2025, '2025-01-10 08:35:00', 'Petugas F', 'Normal', NULL, NULL),
(22, 1, 'SM100001', 105, 120, 15, 12, 2024, '2024-12-05 09:10:00', 'Petugas A', 'Normal', NULL, NULL),
(23, 2, 'SM100002', 84, 98, 14, 12, 2024, '2024-12-05 09:15:00', 'Petugas A', 'Normal', NULL, NULL),
(24, 3, 'SM100003', 190, 210, 20, 12, 2024, '2024-12-05 09:20:00', 'Petugas A', 'Normal', NULL, NULL),
(25, 4, 'SM100004', 61, 75, 14, 12, 2024, '2024-12-06 10:00:00', 'Petugas B', 'Normal', NULL, NULL),
(26, 5, 'SM100005', 275, 300, 25, 12, 2024, '2024-12-06 10:05:00', 'Petugas B', 'Pemakaian tinggi', NULL, NULL),
(27, 6, 'SM100006', 138, 150, 12, 12, 2024, '2024-12-06 10:10:00', 'Petugas B', 'Normal', NULL, NULL),
(28, 7, 'SM100007', 162, 180, 18, 12, 2024, '2024-12-07 08:45:00', 'Petugas C', 'Normal', NULL, NULL),
(29, 8, 'SM100008', 75, 90, 15, 12, 2024, '2024-12-07 08:50:00', 'Petugas C', 'Normal', NULL, NULL),
(30, 9, 'SM100009', 370, 400, 30, 12, 2024, '2024-12-07 08:55:00', 'Petugas C', 'Pemakaian tinggi', NULL, NULL),
(31, 10, 'SM100010', 48, 60, 12, 12, 2024, '2024-12-07 09:00:00', 'Petugas C', 'Normal', NULL, NULL),
(32, 1, 'SM100001', 92, 105, 13, 11, 2024, '2024-11-05 09:10:00', 'Petugas A', 'Normal', NULL, NULL),
(33, 2, 'SM100002', 71, 84, 13, 11, 2024, '2024-11-05 09:15:00', 'Petugas A', 'Normal', NULL, NULL),
(34, 3, 'SM100003', 170, 190, 20, 11, 2024, '2024-11-05 09:20:00', 'Petugas A', 'Normal', NULL, NULL),
(35, 4, 'SM100004', 48, 61, 13, 11, 2024, '2024-11-06 10:00:00', 'Petugas B', 'Normal', NULL, NULL),
(36, 5, 'SM100005', 250, 275, 25, 11, 2024, '2024-11-06 10:05:00', 'Petugas B', 'Pemakaian tinggi', NULL, NULL),
(37, 6, 'SM100006', 126, 138, 12, 11, 2024, '2024-11-06 10:10:00', 'Petugas B', 'Normal', NULL, NULL),
(38, 7, 'SM100007', 145, 162, 17, 11, 2024, '2024-11-07 08:45:00', 'Petugas C', 'Normal', NULL, NULL),
(39, 8, 'SM100008', 61, 75, 14, 11, 2024, '2024-11-07 08:50:00', 'Petugas C', 'Normal', NULL, NULL),
(40, 9, 'SM100009', 340, 370, 30, 11, 2024, '2024-11-07 08:55:00', 'Petugas C', 'Pemakaian tinggi', NULL, NULL),
(41, 10, 'SM100010', 36, 48, 12, 11, 2024, '2024-11-07 09:00:00', 'Petugas C', 'Normal', NULL, NULL),
(42, 1, 'SM100001', 80, 92, 12, 10, 2024, '2024-10-05 09:10:00', 'Petugas A', 'Normal', NULL, NULL),
(43, 2, 'SM100002', 59, 71, 12, 10, 2024, '2024-10-05 09:15:00', 'Petugas A', 'Normal', NULL, NULL),
(44, 3, 'SM100003', 150, 170, 20, 10, 2024, '2024-10-05 09:20:00', 'Petugas A', 'Normal', NULL, NULL),
(45, 4, 'SM100004', 36, 48, 12, 10, 2024, '2024-10-06 10:00:00', 'Petugas B', 'Normal', NULL, NULL),
(46, 5, 'SM100005', 225, 250, 25, 10, 2024, '2024-10-06 10:05:00', 'Petugas B', 'Pemakaian tinggi', NULL, NULL),
(47, 6, 'SM100006', 115, 126, 11, 10, 2024, '2024-10-06 10:10:00', 'Petugas B', 'Normal', NULL, NULL),
(48, 7, 'SM100007', 130, 145, 15, 10, 2024, '2024-10-07 08:45:00', 'Petugas C', 'Normal', NULL, NULL),
(49, 8, 'SM100008', 48, 61, 13, 10, 2024, '2024-10-07 08:50:00', 'Petugas C', 'Normal', NULL, NULL),
(50, 9, 'SM100009', 310, 340, 30, 10, 2024, '2024-10-07 08:55:00', 'Petugas C', 'Pemakaian tinggi', NULL, NULL),
(51, 10, 'SM100010', 25, 36, 11, 10, 2024, '2024-10-07 09:00:00', 'Petugas C', 'Normal', NULL, NULL),
(52, 1, 'SM100001', 68, 80, 12, 9, 2024, '2024-09-05 09:10:00', 'Petugas A', 'Normal', NULL, NULL),
(53, 2, 'SM100002', 47, 59, 12, 9, 2024, '2024-09-05 09:15:00', 'Petugas A', 'Normal', NULL, NULL),
(54, 3, 'SM100003', 130, 150, 20, 9, 2024, '2024-09-05 09:20:00', 'Petugas A', 'Normal', NULL, NULL),
(55, 4, 'SM100004', 25, 36, 11, 9, 2024, '2024-09-06 10:00:00', 'Petugas B', 'Normal', NULL, NULL),
(56, 5, 'SM100005', 200, 225, 25, 9, 2024, '2024-09-06 10:05:00', 'Petugas B', 'Pemakaian tinggi', NULL, NULL),
(57, 6, 'SM100006', 104, 115, 11, 9, 2024, '2024-09-06 10:10:00', 'Petugas B', 'Normal', NULL, NULL),
(58, 7, 'SM100007', 115, 130, 15, 9, 2024, '2024-09-07 08:45:00', 'Petugas C', 'Normal', NULL, NULL),
(59, 8, 'SM100008', 36, 48, 12, 9, 2024, '2024-09-07 08:50:00', 'Petugas C', 'Normal', NULL, NULL),
(60, 9, 'SM100009', 280, 310, 30, 9, 2024, '2024-09-07 08:55:00', 'Petugas C', 'Pemakaian tinggi', NULL, NULL),
(61, 10, 'SM100010', 14, 25, 11, 9, 2024, '2024-09-07 09:00:00', 'Petugas C', 'Normal', NULL, NULL),
(62, 1, 'SM100001', 120, 135, 15, 12, 2025, '2025-12-29 00:42:58', 'Petugas Lapangan', NULL, NULL, NULL),
(63, 20, 'SM100020', 82, 95, 13, 12, 2025, '2025-12-29 03:34:20', 'Petugas Lapangan', NULL, NULL, NULL),
(64, 11, 'SM100011', 238, 257, 19, 12, 2025, '2025-12-30 02:37:16', 'Petugas Lapangan', NULL, 'meteran_11_1767037036_09021282328116.jpg', 'rumah_11_1767037036_09021382328164.jpg'),
(65, 10, 'SM100010', 72, 100, 28, 12, 2025, '2025-12-30 03:49:38', 'Petugas Lapangan', NULL, NULL, NULL),
(66, 10, 'SM100010', 100, 117, 17, 12, 2025, '2025-12-30 03:56:39', 'Petugas Lapangan', NULL, 'meteran_10_1767041799_PROFIL-FREELANCER.png', 'rumah_10_1767041799_DASHBOARD-FREELANCER.png'),
(67, 9, 'SM100009', 430, 460, 30, 12, 2025, '2025-12-30 03:58:58', 'Petugas Lapangan', NULL, 'meteran_9_1767041938_PROFIL-CLIENT.png', 'rumah_9_1767041938_DASHBOARD-CLIENT.png'),
(68, 8, 'SM100008', 105, 120, 15, 12, 2025, '2025-12-30 04:03:46', 'Petugas Lapangan', NULL, 'meteran_8_1767042226_09021282328063.jpg', 'rumah_8_1767042226_09021382328167.jpg'),
(69, 7, 'SM100007', 198, 216, 18, 12, 2025, '2025-12-31 02:24:48', 'jordi', NULL, 'meteran_7_1767122688_buah_lisya.png', 'rumah_7_1767122688_buah_pingkan.png'),
(70, 1, 'SM100001', 135, 150, 15, 1, 2026, '2026-01-06 01:13:32', 'tes', NULL, 'meteran_1_1767636812_Screenshot_2026-01-01_071444.png', 'rumah_1_1767636812_Screenshot_2026-01-01_073537.png'),
(71, 2, 'SM100002', 111, 125, 14, 1, 2026, '2026-01-11 05:26:56', 'aaa', NULL, 'meteran_2_1768084016_799eb5fc299208950aa04429af1bb303.jpg', 'rumah_2_1768084016_51f6e63be2781a819667a4dc1d701311.jpg'),
(72, 6, 'SM100006', 162, 174, 12, 1, 2026, '2026-01-12 04:37:54', 'aaa', NULL, NULL, NULL),
(73, 6, 'SM100006', 161, 173, 12, 1, 2026, '2026-01-12 04:39:38', 'aaa', NULL, NULL, NULL),
(74, 5, 'SM100005', 325, 350, 25, 1, 2026, '2026-01-12 12:16:12', 'aaa', NULL, 'meteran_5_1768194972_Screenshot_2026-01-01_071444.png', 'rumah_5_1768194972_Screenshot_2026-01-01_073537.png');

-- --------------------------------------------------------

--
-- Table structure for table `pencatat_meter`
--

CREATE TABLE `pencatat_meter` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pencatat_meter`
--

INSERT INTO `pencatat_meter` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'jordi', 'jordiabrar@gmail.com', 'scrypt:32768:8:1$2pktNqicOvWbPTL7$8d0d5eb74aff14a3c760766f2909f6031abe227be237a062ec922be14fba2321c92b0360d5eb699e10e8da934f073d83073242824e167563d2d8c1a13afa68df', '2025-12-29 01:32:27', '2025-12-29 01:32:27'),
(2, 'tes', 'testis@gmail.com', 'scrypt:32768:8:1$jE9suYVoBIjI2UTi$21d38d57661cecdc36a9fa003634d56fd5e03688531e30981df5e7c6b40b0838205ce15ef449b3dad5024ce92f502657f83dab71dc370b4356ff097ba648b635', '2025-12-29 02:16:24', '2025-12-29 02:16:24'),
(3, 'tirta', 'tirtamusi@gmail.com', 'scrypt:32768:8:1$9iD0X7kimaADYQoZ$1f2fb2f2020dbab15c14b99ac8feb2d33bccea65d384507e94057c87c1e99357b4fcad596910a81731ba50ad203be18f461dfacda45686e04a29fbeb0a6ecf62', '2025-12-30 00:51:58', '2025-12-30 00:51:58'),
(4, 'aaa', 'aaa@gmail.com', 'scrypt:32768:8:1$nxsAwxQ0kNSkixLl$a55ce2ac062203fbe7e8ab926d22828460b48e093f1693c32c37fb479a3c4812b2a6c673ec7d28f7418174ed5841ad34e28c7748a77650c349b2200447f3a2b5', '2026-01-11 05:08:44', '2026-01-11 05:08:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `masalah`
--
ALTER TABLE `masalah`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode` (`kode`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nomor_seri_meter` (`nomor_seri_meter`);

--
-- Indexes for table `pemakaian_masalah`
--
ALTER TABLE `pemakaian_masalah`
  ADD PRIMARY KEY (`pemakaian_id`,`masalah_id`),
  ADD KEY `masalah_id` (`masalah_id`);

--
-- Indexes for table `pemakaian_meter`
--
ALTER TABLE `pemakaian_meter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pemakaian_pelanggan` (`pelanggan_id`),
  ADD KEY `idx_pemakaian_periode` (`periode_tahun`,`periode_bulan`),
  ADD KEY `idx_nomor_seri` (`nomor_seri_meter`);

--
-- Indexes for table `pencatat_meter`
--
ALTER TABLE `pencatat_meter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `masalah`
--
ALTER TABLE `masalah`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `pemakaian_meter`
--
ALTER TABLE `pemakaian_meter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pencatat_meter`
--
ALTER TABLE `pencatat_meter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pemakaian_masalah`
--
ALTER TABLE `pemakaian_masalah`
  ADD CONSTRAINT `pemakaian_masalah_ibfk_1` FOREIGN KEY (`pemakaian_id`) REFERENCES `pemakaian_meter` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pemakaian_masalah_ibfk_2` FOREIGN KEY (`masalah_id`) REFERENCES `masalah` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pemakaian_meter`
--
ALTER TABLE `pemakaian_meter`
  ADD CONSTRAINT `fk_pemakaian_pelanggan` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
