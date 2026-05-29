-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 29 Bulan Mei 2026 pada 08.25
-- Versi server: 8.0.30
-- Versi PHP: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bizponsel_catalog_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `aktivitas`
--

CREATE TABLE `aktivitas` (
  `id` bigint UNSIGNED NOT NULL,
  `judul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `cabang_id` bigint UNSIGNED NOT NULL,
  `dibuat_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `aktivitas`
--

INSERT INTO `aktivitas` (`id`, `judul`, `deskripsi`, `cabang_id`, `dibuat_pada`) VALUES
(1, 'Grand Opening Cabang Jakarta Pusat', 'Pembukaan resmi cabang pertama kami di jantung ibukota. Acara dimeriahkan dengan promo diskon hingga 50% untuk semua produk, demo produk terbaru, dan hadiah menarik bagi 100 pengunjung pertama.', 1, '2026-02-26 21:26:52'),
(2, 'Workshop Fotografi Profesional', 'Workshop eksklusif bersama fotografer profesional untuk memaksimalkan penggunaan kamera mirrorless terbaru. Peserta mendapat diskon khusus 15% untuk pembelian produk kamera.', 1, '2026-03-28 21:26:52'),
(3, 'Pameran Teknologi Terkini Jakarta Selatan', 'Pameran selama 3 hari menampilkan produk-produk elektronik terbaru 2024. Pengunjung dapat mencoba langsung laptop gaming, smartphone flagship, dan berbagai gadget kekinian.', 2, '2026-04-02 21:26:52'),
(4, 'Grand Opening Cabang Surabaya Pusat', 'Hadir di Surabaya! Pembukaan cabang ke-3 kami dengan konsep toko interaktif pertama di Jawa Timur. Nikmati promo spesial opening dan cicilan 0% untuk semua produk.', 3, '2026-03-13 21:26:52'),
(5, 'Gaming Tournament Surabaya 2024', 'Turnamen gaming terbuka untuk umum dengan total hadiah Rp 25.000.000. Cabang kami menjadi venue utama dengan PlayStation 5 dan PC Gaming terbaru sebagai arena pertandingan.', 3, '2026-04-12 21:26:52'),
(6, 'Peluncuran iPhone 15 Series Surabaya Timur', 'Menjadi salah satu toko resmi pertama yang meluncurkan iPhone 15 Pro Max di Surabaya. Antrian pre-order telah mencapai 200+ orang dengan berbagai program trade-in menarik.', 4, '2026-04-17 21:26:52'),
(7, 'Back to School Festival Bandung', 'Program khusus pelajar dan mahasiswa dengan diskon laptop hingga 30% dan gratis tas laptop senilai Rp 350.000. Cicilan pelajar tersedia mulai 0% selama 12 bulan.', 5, '2026-04-22 21:26:52'),
(8, 'Tech Talk: AI & Gadget Masa Depan', 'Seminar teknologi gratis menghadirkan pembicara dari industri teknologi terkemuka. Membahas tren kecerdasan buatan, IoT, dan bagaimana teknologi mengubah gaya hidup kita.', 5, '2026-05-02 21:26:52'),
(9, 'Promo Hari Batik Yogyakarta', 'Rayakan Hari Batik Nasional bersama kami! Setiap pembelian produk di atas Rp 1.000.000 mendapatkan kain batik eksklusif Yogyakarta. Khusus cabang Malioboro.', 6, '2026-05-07 21:26:52'),
(10, 'Peluncuran Samsung Galaxy S24 Medan', 'Event perdana peluncuran Samsung Galaxy S24 Ultra di Medan dengan demo langsung fitur AI Galaxy dan S Pen. Free case premium untuk 50 pembeli pertama.', 7, '2026-05-12 21:26:52'),
(11, 'Grand Opening Cabang Makassar', 'Ekspansi kami ke Indonesia Timur! Pembukaan cabang Makassar dengan promo gila-gilaan: beli 1 gratis aksesoris senilai Rp 500.000 selama hari pertama pembukaan.', 8, '2026-04-27 21:26:52'),
(12, 'Service Day: Gratis Cek & Clean Perangkat', 'Hari pelayanan gratis! Bawa laptop, smartphone, atau gadget Anda untuk pengecekan kondisi, pembersihan, dan konsultasi tanpa biaya. Terbatas untuk 50 perangkat per hari.', 8, '2026-05-17 21:26:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `brands`
--

CREATE TABLE `brands` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cabang`
--

CREATE TABLE `cabang` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kota` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maps_link` text COLLATE utf8mb4_unicode_ci,
  `jam_buka` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jam_tutup` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dibuat_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cabang`
--

INSERT INTO `cabang` (`id`, `kode`, `nama`, `kota`, `alamat`, `telepon`, `email`, `maps_link`, `jam_buka`, `jam_tutup`, `foto`, `dibuat_pada`, `diperbarui_pada`) VALUES
(1, 'CBG-JKT-01', 'Cabang Jakarta Pusat', 'Jakarta', 'Jl. Sudirman No. 88, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220', '021-57889900', 'cabang.jkt1@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid', '08:00', '17:00', NULL, '2026-02-26 21:26:52', '2026-02-26 21:26:52'),
(2, 'CBG-JKT-02', 'Cabang Jakarta Selatan', 'Jakarta', 'Jl. TB Simatupang No. 12, Cilandak, Jakarta Selatan, DKI Jakarta 12430', '021-78994455', 'cabang.jkt2@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid', '08:00', '17:00', NULL, '2026-03-08 21:26:52', '2026-03-08 21:26:52'),
(3, 'CBG-SBY-01', 'Cabang Surabaya Pusat', 'Surabaya', 'Jl. Tunjungan No. 1, Genteng, Surabaya, Jawa Timur 60275', '031-50011122', 'cabang.sby1@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid', '08:00', '17:00', NULL, '2026-03-13 21:26:52', '2026-03-13 21:26:52'),
(4, 'CBG-SBY-02', 'Cabang Surabaya Timur', 'Surabaya', 'Jl. Raya Kenjeran No. 500, Bulak, Surabaya, Jawa Timur 60129', '031-50033344', 'cabang.sby2@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid', '08:00', '17:00', NULL, '2026-03-28 21:26:52', '2026-03-28 21:26:52'),
(5, 'CBG-BDG-01', 'Cabang Bandung Dago', 'Bandung', 'Jl. Ir. H. Juanda No. 111, Coblong, Bandung, Jawa Barat 40132', '022-25678800', 'cabang.bdg@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid', '08:00', '17:00', NULL, '2026-04-02 21:26:52', '2026-04-02 21:26:52'),
(6, 'CBG-YGY-01', 'Cabang Yogyakarta Malioboro', 'Yogyakarta', 'Jl. Malioboro No. 77, Gedongtengen, Yogyakarta, DI Yogyakarta 55271', '0274-556677', 'cabang.ygy@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!１f0!２f0!３f0!３m2!１i１０２４!２i７６８!４f１３.１!３m３!１m２!１s０ｘ２dd７fb０f１fc７c１５１%３A０x８７９a９６２３７dbe４９f５!２sPT.%２０Indo%２０Bismar!５e０!３m２!１sid!２sid!４v１７７６３１２９０３１６９!５m２!１sid!２sid', '08:00', '17:00', NULL, '2026-04-12 21:26:52', '2026-04-12 21:26:52'),
(7, 'CBG-MDN-01', 'Cabang Medan Sunggal', 'Medan', 'Jl. Sunggal No. 200, Medan Sunggal, Medan, Sumatera Utara 20127', '061-88990011', 'cabang.mdn@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid', '08:00', '17:00', NULL, '2026-04-17 21:26:52', '2026-04-17 21:26:52'),
(8, 'CBG-MKS-01', 'Cabang Makassar Panakkukang', 'Makassar', 'Jl. Boulevard Panakkukang No. 5, Panakkukang, Makassar, Sulawesi Selatan 90231', '0411-447788', 'cabang.mks@bizponsel.com', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid', '08:00', '17:00', NULL, '2026-04-27 21:26:52', '2026-04-27 21:26:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `favorit`
--

CREATE TABLE `favorit` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `favorit`
--

INSERT INTO `favorit` (`id`, `user_id`, `produk_id`) VALUES
(1, 3, 1),
(19, 3, 2),
(2, 3, 3),
(17, 3, 4),
(14, 3, 5),
(15, 3, 6),
(6, 3, 7),
(16, 3, 8),
(20, 3, 9),
(8, 3, 10),
(12, 3, 11),
(13, 3, 12),
(18, 3, 13),
(5, 3, 14),
(7, 3, 15),
(9, 3, 16),
(10, 3, 17),
(11, 3, 18),
(3, 3, 19),
(4, 3, 20),
(21, 3, 21);

-- --------------------------------------------------------

--
-- Struktur dari tabel `gambar_produk`
--

CREATE TABLE `gambar_produk` (
  `id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `url_gambar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `gambar_produk`
--

INSERT INTO `gambar_produk` (`id`, `produk_id`, `url_gambar`) VALUES
(1, 1, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800'),
(2, 1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'),
(3, 1, 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'),
(4, 2, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800'),
(5, 2, 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800'),
(6, 3, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'),
(7, 3, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'),
(8, 3, 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800'),
(9, 4, 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'),
(10, 4, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'),
(11, 5, 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800'),
(12, 5, 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800'),
(13, 6, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'),
(14, 6, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800'),
(15, 6, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'),
(16, 7, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'),
(17, 7, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800'),
(18, 8, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800'),
(19, 8, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'),
(20, 9, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'),
(21, 9, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800'),
(22, 10, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800'),
(23, 10, 'https://images.unsplash.com/photo-1542751110-a514c0740ea3?w=800'),
(24, 11, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'),
(25, 11, 'https://images.unsplash.com/photo-1613141411244-0e4ac259d45d?w=800'),
(26, 12, 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800'),
(27, 12, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'),
(28, 13, 'https://images.unsplash.com/photo-1609592786362-1f62bd656f71?w=800'),
(29, 13, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'),
(30, 14, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'),
(31, 14, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'),
(32, 15, 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800'),
(33, 15, 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=800'),
(34, 16, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'),
(35, 16, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800'),
(36, 17, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'),
(37, 17, 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=800'),
(38, 18, 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'),
(39, 18, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'),
(40, 19, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800'),
(41, 19, 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800'),
(42, 20, 'https://images.unsplash.com/photo-1640955014216-75201dc57df9?w=800'),
(43, 20, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800'),
(44, 21, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800'),
(45, 21, 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800'),
(46, 50, 'http://127.0.0.1:8000/storage/products/vkxlkrRf99CvHi8ksXYfRUBfjZwYjzEU51QCc8G4.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dibuat_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id`, `nama`, `dibuat_pada`, `diperbarui_pada`) VALUES
(1, 'Laptop & Komputer', '2026-03-28 21:26:51', '2026-03-28 21:26:51'),
(2, 'Smartphone & Tablet', '2026-03-28 21:26:51', '2026-03-28 21:26:51'),
(3, 'Aksesoris Elektronik', '2026-04-02 21:26:51', '2026-04-02 21:26:51'),
(4, 'Audio & Headphone', '2026-04-02 21:26:51', '2026-04-02 21:26:51'),
(5, 'Kamera & Fotografi', '2026-04-07 21:26:51', '2026-04-07 21:26:51'),
(6, 'Peralatan Rumah', '2026-04-07 21:26:51', '2026-04-07 21:26:51'),
(7, 'Gaming', '2026-04-12 21:26:51', '2026-04-12 21:26:51'),
(8, 'Networking', '2026-04-12 21:26:51', '2026-04-12 21:26:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kontak`
--

CREATE TABLE `kontak` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pesan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `dibuat_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kontak`
--

INSERT INTO `kontak` (`id`, `nama`, `email`, `telepon`, `pesan`, `dibuat_pada`) VALUES
(1, 'Ahmad Fauzi', 'ahmad.fauzi@gmail.com', '081234567890', 'Halo, saya ingin menanyakan apakah ASUS ROG Zephyrus G14 tersedia dalam warna lain selain hitam? Dan apakah bisa cicilan 0% menggunakan kartu kredit BCA?', '2026-05-12 21:26:52'),
(2, 'Ratna Dewi', 'ratna.dewi@yahoo.com', '082345678901', 'Saya tertarik dengan iPhone 15 Pro Max. Apakah tersedia program trade-in untuk iPhone 13 saya? Berapa estimasi nilai trade-innya?', '2026-05-15 21:26:52'),
(3, 'Hendra Kurniawan', 'hendra.k@outlook.com', '083456789012', 'Apakah cabang Surabaya menyediakan layanan service untuk MacBook Air M2? Laptop saya mengalami masalah pada keyboard beberapa tombol tidak berfungsi.', '2026-05-17 21:26:52'),
(4, 'Nadia Putri', 'nadia.putri@gmail.com', '084567890123', 'Saya ingin pesan Sony WH-1000XM5 untuk hadiah ulang tahun suami saya minggu depan. Apakah ada layanan gift wrapping? Dan bisa dikirim ke Bandung dalam 1-2 hari?', '2026-05-19 21:26:52'),
(5, 'Doni Setiawan', 'doni.s@gmail.com', '085678901234', 'Berapa harga Samsung Galaxy S24 Ultra jika beli cash? Apakah bisa dapat diskon lebih? Saya berencana beli 2 unit sekaligus untuk saya dan istri.', '2026-05-21 21:26:52'),
(6, 'Fitria Handayani', 'fitria.h@gmail.com', '086789012345', 'Apakah TP-Link Archer AXE75 kompatibel dengan modem Indihome ZTE? Saya butuh router yang bisa coverage area rumah 2 lantai sekitar 150m2.', '2026-05-22 21:26:52'),
(7, 'Bagas Prasetyo', 'bagas.p@gmail.com', NULL, 'Kapan PlayStation 5 Slim restock? Sudah 2 minggu saya pantau tapi selalu habis. Bisa daftarkan nama saya untuk pre-order atau waiting list?', '2026-05-23 21:26:52'),
(8, 'Sri Wahyuni', 'sri.wahyuni@gmail.com', '087890123456', 'Saya seorang guru dan ingin membeli laptop untuk mengajar online. Budget saya sekitar Rp 7-9 juta. Apa rekomendasi terbaik untuk kebutuhan presentasi dan video conference?', '2026-05-24 21:26:52'),
(9, 'Gilang Ramadhan', 'gilang.r@gmail.com', '088901234567', 'Harga DJI Pocket 3 apakah termasuk accessories combo? Dan apakah ada garansi resmi Indonesia? Saya seorang content creator dan butuh kamera yang ringan untuk vlog.', '2026-05-25 21:26:52'),
(10, 'Anisa Maharani', 'anisa.m@gmail.com', '089012345678', 'Apakah ada program loyalty member? Saya sudah beberapa kali berbelanja di toko ini. Ingin tahu apakah ada rewards atau poin yang bisa dikumpulkan untuk pembelian berikutnya.', '2026-05-26 21:26:52'),
(11, 'Elok Faiqoh', 'elokfaiqoh885@gmail.com', '082331774409', 'jkshkjhkhk', '2026-05-29 00:51:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2026_04_01_085348_create_users_table', 1),
(2, '2026_04_01_085350_create_kategoris_table', 1),
(3, '2026_04_01_085357_create_brands_table', 1),
(4, '2026_04_01_085358_create_produks_table', 1),
(5, '2026_04_01_085404_create_gambar_produks_table', 1),
(6, '2026_04_01_085410_create_spesifikasi_produks_table', 1),
(7, '2026_04_01_085415_create_promos_table', 1),
(8, '2026_04_01_085420_create_promo_produks_table', 1),
(9, '2026_04_01_085426_create_cabangs_table', 1),
(10, '2026_04_01_085453_create_pengaturans_table', 1),
(11, '2026_04_01_085457_create_aktivitas_table', 1),
(12, '2026_04_01_085502_create_penjualan_produks_table', 1),
(13, '2026_04_01_085506_create_favorits_table', 1),
(14, '2026_04_01_085514_create_kontaks_table', 1),
(15, '2026_04_07_092603_create_sessions_table', 1),
(16, '2026_04_08_045813_create_personal_access_tokens_table', 1),
(17, '2026_05_05_041053_create_cache_table', 1),
(18, '2026_05_22_000000_create_settings_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengaturan`
--

CREATE TABLE `pengaturan` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_situs` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telepon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `nama_ceo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_ceo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diperbarui_pada` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pengaturan`
--

INSERT INTO `pengaturan` (`id`, `nama_situs`, `email`, `telepon`, `alamat`, `nama_ceo`, `foto_ceo`, `diperbarui_pada`) VALUES
(1, 'TechStore Indonesia', 'info@techstore.id', '021-57889900', 'Jl. Sudirman No. 88, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220', 'Budi Hartono Santoso', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '2026-05-27 21:26:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penjualan_produk`
--

CREATE TABLE `penjualan_produk` (
  `id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `total_terjual` int NOT NULL DEFAULT '0',
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `penjualan_produk`
--

INSERT INTO `penjualan_produk` (`id`, `produk_id`, `total_terjual`, `tanggal`) VALUES
(1, 1, 14, '2025-12-08'),
(2, 1, 7, '2025-12-15'),
(3, 1, 19, '2025-12-22'),
(4, 1, 16, '2025-12-29'),
(5, 1, 12, '2026-01-05'),
(6, 1, 9, '2026-01-12'),
(7, 1, 15, '2026-01-19'),
(8, 1, 15, '2026-01-26'),
(9, 1, 18, '2026-02-02'),
(10, 1, 15, '2026-02-09'),
(11, 1, 14, '2026-02-16'),
(12, 1, 11, '2026-02-23'),
(13, 1, 12, '2026-03-02'),
(14, 1, 17, '2026-03-09'),
(15, 1, 18, '2026-03-16'),
(16, 1, 15, '2026-03-23'),
(17, 1, 18, '2026-03-30'),
(18, 1, 17, '2026-04-06'),
(19, 1, 15, '2026-04-13'),
(20, 1, 16, '2026-04-20'),
(21, 1, 16, '2026-04-27'),
(22, 1, 17, '2026-05-04'),
(23, 1, 19, '2026-05-11'),
(24, 1, 10, '2026-05-18'),
(25, 1, 10, '2026-05-25'),
(26, 2, 10, '2025-12-08'),
(27, 2, 7, '2025-12-15'),
(28, 2, 10, '2025-12-22'),
(29, 2, 9, '2025-12-29'),
(30, 2, 11, '2026-01-05'),
(31, 2, 13, '2026-01-12'),
(32, 2, 7, '2026-01-19'),
(33, 2, 11, '2026-01-26'),
(34, 2, 10, '2026-02-02'),
(35, 2, 9, '2026-02-09'),
(36, 2, 11, '2026-02-16'),
(37, 2, 14, '2026-02-23'),
(38, 2, 8, '2026-03-02'),
(39, 2, 12, '2026-03-09'),
(40, 2, 14, '2026-03-16'),
(41, 2, 12, '2026-03-23'),
(42, 2, 8, '2026-03-30'),
(43, 2, 13, '2026-04-06'),
(44, 2, 12, '2026-04-13'),
(45, 2, 12, '2026-04-20'),
(46, 2, 10, '2026-04-27'),
(47, 2, 13, '2026-05-04'),
(48, 2, 12, '2026-05-11'),
(49, 2, 12, '2026-05-18'),
(50, 2, 19, '2026-05-25'),
(51, 3, 22, '2025-12-08'),
(52, 3, 23, '2025-12-15'),
(53, 3, 24, '2025-12-22'),
(54, 3, 33, '2025-12-29'),
(55, 3, 26, '2026-01-05'),
(56, 3, 17, '2026-01-12'),
(57, 3, 34, '2026-01-19'),
(58, 3, 29, '2026-01-26'),
(59, 3, 16, '2026-02-02'),
(60, 3, 14, '2026-02-09'),
(61, 3, 19, '2026-02-16'),
(62, 3, 14, '2026-02-23'),
(63, 3, 17, '2026-03-02'),
(64, 3, 28, '2026-03-09'),
(65, 3, 21, '2026-03-16'),
(66, 3, 26, '2026-03-23'),
(67, 3, 20, '2026-03-30'),
(68, 3, 30, '2026-04-06'),
(69, 3, 30, '2026-04-13'),
(70, 3, 30, '2026-04-20'),
(71, 3, 21, '2026-04-27'),
(72, 3, 33, '2026-05-04'),
(73, 3, 24, '2026-05-11'),
(74, 3, 51, '2026-05-18'),
(75, 3, 22, '2026-05-25'),
(76, 4, 21, '2025-12-08'),
(77, 4, 34, '2025-12-15'),
(78, 4, 41, '2025-12-22'),
(79, 4, 25, '2025-12-29'),
(80, 4, 26, '2026-01-05'),
(81, 4, 34, '2026-01-12'),
(82, 4, 42, '2026-01-19'),
(83, 4, 26, '2026-01-26'),
(84, 4, 27, '2026-02-02'),
(85, 4, 36, '2026-02-09'),
(86, 4, 49, '2026-02-16'),
(87, 4, 40, '2026-02-23'),
(88, 4, 47, '2026-03-02'),
(89, 4, 30, '2026-03-09'),
(90, 4, 42, '2026-03-16'),
(91, 4, 24, '2026-03-23'),
(92, 4, 36, '2026-03-30'),
(93, 4, 29, '2026-04-06'),
(94, 4, 22, '2026-04-13'),
(95, 4, 40, '2026-04-20'),
(96, 4, 37, '2026-04-27'),
(97, 4, 28, '2026-05-04'),
(98, 4, 69, '2026-05-11'),
(99, 4, 58, '2026-05-18'),
(100, 4, 70, '2026-05-25'),
(101, 5, 8, '2025-12-08'),
(102, 5, 9, '2025-12-15'),
(103, 5, 14, '2025-12-22'),
(104, 5, 8, '2025-12-29'),
(105, 5, 9, '2026-01-05'),
(106, 5, 11, '2026-01-12'),
(107, 5, 14, '2026-01-19'),
(108, 5, 7, '2026-01-26'),
(109, 5, 7, '2026-02-02'),
(110, 5, 11, '2026-02-09'),
(111, 5, 11, '2026-02-16'),
(112, 5, 10, '2026-02-23'),
(113, 5, 14, '2026-03-02'),
(114, 5, 7, '2026-03-09'),
(115, 5, 8, '2026-03-16'),
(116, 5, 9, '2026-03-23'),
(117, 5, 12, '2026-03-30'),
(118, 5, 10, '2026-04-06'),
(119, 5, 9, '2026-04-13'),
(120, 5, 10, '2026-04-20'),
(121, 5, 9, '2026-04-27'),
(122, 5, 8, '2026-05-04'),
(123, 5, 13, '2026-05-11'),
(124, 5, 21, '2026-05-18'),
(125, 5, 21, '2026-05-25'),
(126, 6, 35, '2025-12-08'),
(127, 6, 31, '2025-12-15'),
(128, 6, 28, '2025-12-22'),
(129, 6, 16, '2025-12-29'),
(130, 6, 17, '2026-01-05'),
(131, 6, 18, '2026-01-12'),
(132, 6, 33, '2026-01-19'),
(133, 6, 17, '2026-01-26'),
(134, 6, 24, '2026-02-02'),
(135, 6, 33, '2026-02-09'),
(136, 6, 17, '2026-02-16'),
(137, 6, 15, '2026-02-23'),
(138, 6, 23, '2026-03-02'),
(139, 6, 34, '2026-03-09'),
(140, 6, 18, '2026-03-16'),
(141, 6, 19, '2026-03-23'),
(142, 6, 26, '2026-03-30'),
(143, 6, 33, '2026-04-06'),
(144, 6, 26, '2026-04-13'),
(145, 6, 20, '2026-04-20'),
(146, 6, 35, '2026-04-27'),
(147, 6, 31, '2026-05-04'),
(148, 6, 40, '2026-05-11'),
(149, 6, 43, '2026-05-18'),
(150, 6, 31, '2026-05-25'),
(151, 7, 25, '2025-12-08'),
(152, 7, 24, '2025-12-15'),
(153, 7, 28, '2025-12-22'),
(154, 7, 24, '2025-12-29'),
(155, 7, 28, '2026-01-05'),
(156, 7, 14, '2026-01-12'),
(157, 7, 17, '2026-01-19'),
(158, 7, 27, '2026-01-26'),
(159, 7, 18, '2026-02-02'),
(160, 7, 27, '2026-02-09'),
(161, 7, 26, '2026-02-16'),
(162, 7, 28, '2026-02-23'),
(163, 7, 28, '2026-03-02'),
(164, 7, 15, '2026-03-09'),
(165, 7, 19, '2026-03-16'),
(166, 7, 16, '2026-03-23'),
(167, 7, 27, '2026-03-30'),
(168, 7, 27, '2026-04-06'),
(169, 7, 21, '2026-04-13'),
(170, 7, 17, '2026-04-20'),
(171, 7, 17, '2026-04-27'),
(172, 7, 21, '2026-05-04'),
(173, 7, 28, '2026-05-11'),
(174, 7, 39, '2026-05-18'),
(175, 7, 36, '2026-05-25'),
(176, 8, 22, '2025-12-08'),
(177, 8, 23, '2025-12-15'),
(178, 8, 21, '2025-12-22'),
(179, 8, 17, '2025-12-29'),
(180, 8, 20, '2026-01-05'),
(181, 8, 20, '2026-01-12'),
(182, 8, 15, '2026-01-19'),
(183, 8, 17, '2026-01-26'),
(184, 8, 23, '2026-02-02'),
(185, 8, 28, '2026-02-09'),
(186, 8, 14, '2026-02-16'),
(187, 8, 23, '2026-02-23'),
(188, 8, 25, '2026-03-02'),
(189, 8, 16, '2026-03-09'),
(190, 8, 14, '2026-03-16'),
(191, 8, 17, '2026-03-23'),
(192, 8, 22, '2026-03-30'),
(193, 8, 21, '2026-04-06'),
(194, 8, 26, '2026-04-13'),
(195, 8, 25, '2026-04-20'),
(196, 8, 28, '2026-04-27'),
(197, 8, 18, '2026-05-04'),
(198, 8, 36, '2026-05-11'),
(199, 8, 40, '2026-05-18'),
(200, 8, 21, '2026-05-25'),
(201, 9, 14, '2025-12-08'),
(202, 9, 20, '2025-12-15'),
(203, 9, 10, '2025-12-22'),
(204, 9, 10, '2025-12-29'),
(205, 9, 10, '2026-01-05'),
(206, 9, 15, '2026-01-12'),
(207, 9, 19, '2026-01-19'),
(208, 9, 21, '2026-01-26'),
(209, 9, 21, '2026-02-02'),
(210, 9, 9, '2026-02-09'),
(211, 9, 17, '2026-02-16'),
(212, 9, 14, '2026-02-23'),
(213, 9, 12, '2026-03-02'),
(214, 9, 7, '2026-03-09'),
(215, 9, 12, '2026-03-16'),
(216, 9, 12, '2026-03-23'),
(217, 9, 21, '2026-03-30'),
(218, 9, 11, '2026-04-06'),
(219, 9, 10, '2026-04-13'),
(220, 9, 13, '2026-04-20'),
(221, 9, 13, '2026-04-27'),
(222, 9, 17, '2026-05-04'),
(223, 9, 12, '2026-05-11'),
(224, 9, 16, '2026-05-18'),
(225, 9, 16, '2026-05-25'),
(226, 10, 18, '2025-12-08'),
(227, 10, 21, '2025-12-15'),
(228, 10, 21, '2025-12-22'),
(229, 10, 12, '2025-12-29'),
(230, 10, 11, '2026-01-05'),
(231, 10, 13, '2026-01-12'),
(232, 10, 15, '2026-01-19'),
(233, 10, 16, '2026-01-26'),
(234, 10, 20, '2026-02-02'),
(235, 10, 13, '2026-02-09'),
(236, 10, 20, '2026-02-16'),
(237, 10, 13, '2026-02-23'),
(238, 10, 12, '2026-03-02'),
(239, 10, 19, '2026-03-09'),
(240, 10, 19, '2026-03-16'),
(241, 10, 13, '2026-03-23'),
(242, 10, 11, '2026-03-30'),
(243, 10, 9, '2026-04-06'),
(244, 10, 10, '2026-04-13'),
(245, 10, 8, '2026-04-20'),
(246, 10, 11, '2026-04-27'),
(247, 10, 20, '2026-05-04'),
(248, 10, 31, '2026-05-11'),
(249, 10, 19, '2026-05-18'),
(250, 10, 10, '2026-05-25'),
(251, 11, 42, '2025-12-08'),
(252, 11, 32, '2025-12-15'),
(253, 11, 44, '2025-12-22'),
(254, 11, 43, '2025-12-29'),
(255, 11, 42, '2026-01-05'),
(256, 11, 41, '2026-01-12'),
(257, 11, 25, '2026-01-19'),
(258, 11, 46, '2026-01-26'),
(259, 11, 44, '2026-02-02'),
(260, 11, 38, '2026-02-09'),
(261, 11, 40, '2026-02-16'),
(262, 11, 50, '2026-02-23'),
(263, 11, 24, '2026-03-02'),
(264, 11, 35, '2026-03-09'),
(265, 11, 31, '2026-03-16'),
(266, 11, 56, '2026-03-23'),
(267, 11, 23, '2026-03-30'),
(268, 11, 27, '2026-04-06'),
(269, 11, 43, '2026-04-13'),
(270, 11, 33, '2026-04-20'),
(271, 11, 47, '2026-04-27'),
(272, 11, 52, '2026-05-04'),
(273, 11, 72, '2026-05-11'),
(274, 11, 76, '2026-05-18'),
(275, 11, 70, '2026-05-25'),
(276, 12, 18, '2025-12-08'),
(277, 12, 25, '2025-12-15'),
(278, 12, 24, '2025-12-22'),
(279, 12, 32, '2025-12-29'),
(280, 12, 29, '2026-01-05'),
(281, 12, 33, '2026-01-12'),
(282, 12, 26, '2026-01-19'),
(283, 12, 32, '2026-01-26'),
(284, 12, 31, '2026-02-02'),
(285, 12, 34, '2026-02-09'),
(286, 12, 17, '2026-02-16'),
(287, 12, 23, '2026-02-23'),
(288, 12, 24, '2026-03-02'),
(289, 12, 25, '2026-03-09'),
(290, 12, 25, '2026-03-16'),
(291, 12, 19, '2026-03-23'),
(292, 12, 26, '2026-03-30'),
(293, 12, 33, '2026-04-06'),
(294, 12, 15, '2026-04-13'),
(295, 12, 24, '2026-04-20'),
(296, 12, 24, '2026-04-27'),
(297, 12, 35, '2026-05-04'),
(298, 12, 24, '2026-05-11'),
(299, 12, 33, '2026-05-18'),
(300, 12, 52, '2026-05-25'),
(301, 13, 58, '2025-12-08'),
(302, 13, 48, '2025-12-15'),
(303, 13, 49, '2025-12-22'),
(304, 13, 45, '2025-12-29'),
(305, 13, 42, '2026-01-05'),
(306, 13, 69, '2026-01-12'),
(307, 13, 64, '2026-01-19'),
(308, 13, 79, '2026-01-26'),
(309, 13, 67, '2026-02-02'),
(310, 13, 48, '2026-02-09'),
(311, 13, 54, '2026-02-16'),
(312, 13, 37, '2026-02-23'),
(313, 13, 72, '2026-03-02'),
(314, 13, 49, '2026-03-09'),
(315, 13, 51, '2026-03-16'),
(316, 13, 60, '2026-03-23'),
(317, 13, 83, '2026-03-30'),
(318, 13, 49, '2026-04-06'),
(319, 13, 36, '2026-04-13'),
(320, 13, 53, '2026-04-20'),
(321, 13, 59, '2026-04-27'),
(322, 13, 82, '2026-05-04'),
(323, 13, 117, '2026-05-11'),
(324, 13, 67, '2026-05-18'),
(325, 13, 57, '2026-05-25'),
(326, 14, 16, '2025-12-08'),
(327, 14, 18, '2025-12-15'),
(328, 14, 17, '2025-12-22'),
(329, 14, 24, '2025-12-29'),
(330, 14, 25, '2026-01-05'),
(331, 14, 22, '2026-01-12'),
(332, 14, 19, '2026-01-19'),
(333, 14, 19, '2026-01-26'),
(334, 14, 25, '2026-02-02'),
(335, 14, 16, '2026-02-09'),
(336, 14, 16, '2026-02-16'),
(337, 14, 17, '2026-02-23'),
(338, 14, 16, '2026-03-02'),
(339, 14, 17, '2026-03-09'),
(340, 14, 15, '2026-03-16'),
(341, 14, 20, '2026-03-23'),
(342, 14, 19, '2026-03-30'),
(343, 14, 28, '2026-04-06'),
(344, 14, 24, '2026-04-13'),
(345, 14, 18, '2026-04-20'),
(346, 14, 14, '2026-04-27'),
(347, 14, 25, '2026-05-04'),
(348, 14, 25, '2026-05-11'),
(349, 14, 28, '2026-05-18'),
(350, 14, 33, '2026-05-25'),
(351, 15, 30, '2025-12-08'),
(352, 15, 28, '2025-12-15'),
(353, 15, 22, '2025-12-22'),
(354, 15, 36, '2025-12-29'),
(355, 15, 27, '2026-01-05'),
(356, 15, 25, '2026-01-12'),
(357, 15, 26, '2026-01-19'),
(358, 15, 21, '2026-01-26'),
(359, 15, 38, '2026-02-02'),
(360, 15, 29, '2026-02-09'),
(361, 15, 40, '2026-02-16'),
(362, 15, 26, '2026-02-23'),
(363, 15, 29, '2026-03-02'),
(364, 15, 38, '2026-03-09'),
(365, 15, 29, '2026-03-16'),
(366, 15, 28, '2026-03-23'),
(367, 15, 27, '2026-03-30'),
(368, 15, 33, '2026-04-06'),
(369, 15, 34, '2026-04-13'),
(370, 15, 28, '2026-04-20'),
(371, 15, 41, '2026-04-27'),
(372, 15, 26, '2026-05-04'),
(373, 15, 63, '2026-05-11'),
(374, 15, 49, '2026-05-18'),
(375, 15, 57, '2026-05-25'),
(376, 16, 36, '2025-12-08'),
(377, 16, 37, '2025-12-15'),
(378, 16, 33, '2025-12-22'),
(379, 16, 29, '2025-12-29'),
(380, 16, 22, '2026-01-05'),
(381, 16, 41, '2026-01-12'),
(382, 16, 40, '2026-01-19'),
(383, 16, 39, '2026-01-26'),
(384, 16, 40, '2026-02-02'),
(385, 16, 33, '2026-02-09'),
(386, 16, 41, '2026-02-16'),
(387, 16, 42, '2026-02-23'),
(388, 16, 37, '2026-03-02'),
(389, 16, 34, '2026-03-09'),
(390, 16, 21, '2026-03-16'),
(391, 16, 33, '2026-03-23'),
(392, 16, 47, '2026-03-30'),
(393, 16, 38, '2026-04-06'),
(394, 16, 29, '2026-04-13'),
(395, 16, 46, '2026-04-20'),
(396, 16, 24, '2026-04-27'),
(397, 16, 30, '2026-05-04'),
(398, 16, 43, '2026-05-11'),
(399, 16, 69, '2026-05-18'),
(400, 16, 55, '2026-05-25'),
(401, 17, 11, '2025-12-08'),
(402, 17, 10, '2025-12-15'),
(403, 17, 13, '2025-12-22'),
(404, 17, 11, '2025-12-29'),
(405, 17, 7, '2026-01-05'),
(406, 17, 13, '2026-01-12'),
(407, 17, 12, '2026-01-19'),
(408, 17, 8, '2026-01-26'),
(409, 17, 8, '2026-02-02'),
(410, 17, 7, '2026-02-09'),
(411, 17, 14, '2026-02-16'),
(412, 17, 12, '2026-02-23'),
(413, 17, 8, '2026-03-02'),
(414, 17, 10, '2026-03-09'),
(415, 17, 7, '2026-03-16'),
(416, 17, 9, '2026-03-23'),
(417, 17, 14, '2026-03-30'),
(418, 17, 11, '2026-04-06'),
(419, 17, 13, '2026-04-13'),
(420, 17, 14, '2026-04-20'),
(421, 17, 11, '2026-04-27'),
(422, 17, 9, '2026-05-04'),
(423, 17, 19, '2026-05-11'),
(424, 17, 12, '2026-05-18'),
(425, 17, 19, '2026-05-25'),
(426, 18, 20, '2025-12-08'),
(427, 18, 12, '2025-12-15'),
(428, 18, 7, '2025-12-22'),
(429, 18, 12, '2025-12-29'),
(430, 18, 7, '2026-01-05'),
(431, 18, 18, '2026-01-12'),
(432, 18, 14, '2026-01-19'),
(433, 18, 11, '2026-01-26'),
(434, 18, 9, '2026-02-02'),
(435, 18, 15, '2026-02-09'),
(436, 18, 17, '2026-02-16'),
(437, 18, 17, '2026-02-23'),
(438, 18, 9, '2026-03-02'),
(439, 18, 21, '2026-03-09'),
(440, 18, 18, '2026-03-16'),
(441, 18, 8, '2026-03-23'),
(442, 18, 9, '2026-03-30'),
(443, 18, 9, '2026-04-06'),
(444, 18, 13, '2026-04-13'),
(445, 18, 19, '2026-04-20'),
(446, 18, 10, '2026-04-27'),
(447, 18, 10, '2026-05-04'),
(448, 18, 28, '2026-05-11'),
(449, 18, 22, '2026-05-18'),
(450, 18, 10, '2026-05-25'),
(451, 19, 16, '2025-12-08'),
(452, 19, 20, '2025-12-15'),
(453, 19, 25, '2025-12-22'),
(454, 19, 27, '2025-12-29'),
(455, 19, 27, '2026-01-05'),
(456, 19, 28, '2026-01-12'),
(457, 19, 26, '2026-01-19'),
(458, 19, 19, '2026-01-26'),
(459, 19, 19, '2026-02-02'),
(460, 19, 23, '2026-02-09'),
(461, 19, 20, '2026-02-16'),
(462, 19, 24, '2026-02-23'),
(463, 19, 26, '2026-03-02'),
(464, 19, 17, '2026-03-09'),
(465, 19, 23, '2026-03-16'),
(466, 19, 24, '2026-03-23'),
(467, 19, 15, '2026-03-30'),
(468, 19, 17, '2026-04-06'),
(469, 19, 19, '2026-04-13'),
(470, 19, 27, '2026-04-20'),
(471, 19, 19, '2026-04-27'),
(472, 19, 14, '2026-05-04'),
(473, 19, 34, '2026-05-11'),
(474, 19, 24, '2026-05-18'),
(475, 19, 25, '2026-05-25'),
(476, 20, 15, '2025-12-08'),
(477, 20, 17, '2025-12-15'),
(478, 20, 8, '2025-12-22'),
(479, 20, 7, '2025-12-29'),
(480, 20, 7, '2026-01-05'),
(481, 20, 13, '2026-01-12'),
(482, 20, 19, '2026-01-19'),
(483, 20, 15, '2026-01-26'),
(484, 20, 12, '2026-02-02'),
(485, 20, 17, '2026-02-09'),
(486, 20, 11, '2026-02-16'),
(487, 20, 8, '2026-02-23'),
(488, 20, 15, '2026-03-02'),
(489, 20, 16, '2026-03-09'),
(490, 20, 20, '2026-03-16'),
(491, 20, 12, '2026-03-23'),
(492, 20, 13, '2026-03-30'),
(493, 20, 10, '2026-04-06'),
(494, 20, 21, '2026-04-13'),
(495, 20, 14, '2026-04-20'),
(496, 20, 13, '2026-04-27'),
(497, 20, 16, '2026-05-04'),
(498, 20, 30, '2026-05-11'),
(499, 20, 24, '2026-05-18'),
(500, 20, 21, '2026-05-25'),
(501, 21, 26, '2025-12-08'),
(502, 21, 25, '2025-12-15'),
(503, 21, 30, '2025-12-22'),
(504, 21, 30, '2025-12-29'),
(505, 21, 35, '2026-01-05'),
(506, 21, 29, '2026-01-12'),
(507, 21, 21, '2026-01-19'),
(508, 21, 31, '2026-01-26'),
(509, 21, 33, '2026-02-02'),
(510, 21, 29, '2026-02-09'),
(511, 21, 17, '2026-02-16'),
(512, 21, 17, '2026-02-23'),
(513, 21, 33, '2026-03-02'),
(514, 21, 28, '2026-03-09'),
(515, 21, 16, '2026-03-16'),
(516, 21, 14, '2026-03-23'),
(517, 21, 24, '2026-03-30'),
(518, 21, 15, '2026-04-06'),
(519, 21, 15, '2026-04-13'),
(520, 21, 23, '2026-04-20'),
(521, 21, 26, '2026-04-27'),
(522, 21, 30, '2026-05-04'),
(523, 21, 48, '2026-05-11'),
(524, 21, 49, '2026-05-18'),
(525, 21, 21, '2026-05-25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'auth_token', 'c479772319bafbfd71a726039b64f581fabbf03618190af1e4e2908cb571045d', '[\"*\"]', '2026-05-29 01:03:02', NULL, '2026-05-29 00:42:32', '2026-05-29 01:03:02'),
(2, 'App\\Models\\User', 1, 'auth_token', 'cce193c34c810009e73cd913a44d97e9cd354cc6b156eb8532d920a63f91d881', '[\"*\"]', '2026-05-29 01:02:49', NULL, '2026-05-29 00:45:36', '2026-05-29 01:02:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id` bigint UNSIGNED NOT NULL,
  `kategori_id` bigint UNSIGNED NOT NULL,
  `brand_id` bigint UNSIGNED DEFAULT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `deskripsi_detail` text COLLATE utf8mb4_unicode_ci,
  `harga` bigint NOT NULL,
  `stok` int NOT NULL DEFAULT '0',
  `rating` double NOT NULL DEFAULT '0',
  `adalah_promo` tinyint(1) NOT NULL DEFAULT '0',
  `gambar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `colors` json DEFAULT NULL,
  `color_labels` json DEFAULT NULL,
  `images` json DEFAULT NULL,
  `specs` json DEFAULT NULL,
  `reviews` int NOT NULL DEFAULT '0',
  `dibuat_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id`, `kategori_id`, `brand_id`, `nama`, `slug`, `deskripsi`, `deskripsi_detail`, `harga`, `stok`, `rating`, `adalah_promo`, `gambar`, `colors`, `color_labels`, `images`, `specs`, `reviews`, `dibuat_pada`, `diperbarui_pada`) VALUES
(1, 1, NULL, 'ASUS ROG Zephyrus G14', 'asus-rog-zephyrus-g14', 'Laptop gaming ultra-slim AMD Ryzen 9, GPU RTX 4060, Layar QHD 165Hz.', '\nASUS ROG Zephyrus G14 adalah puncak dari rekayasa laptop gaming ultra-portabel yang sesungguhnya. Dibangun untuk mereka yang menolak kompromi antara performa dan mobilitas, laptop ini hadir dengan prosesor AMD Ryzen 9 7940HS yang dilengkapi 8 core dan 16 thread, mampu melaju hingga kecepatan boost 5,2 GHz untuk menangani beban kerja paling berat sekalipun — mulai dari sesi gaming marathon, rendering 3D intensif, hingga kompilasi kode berskala besar.\n\nDi balik desain bodinya yang ramping dan elegan dengan ketebalan hanya 19,9 mm dan bobot 1,65 kg, tersimpan GPU NVIDIA GeForce RTX 4060 dengan 8 GB GDDR6 yang dilengkapi teknologi DLSS 3.0 dan Ray Tracing generasi terbaru. Ini bukan sekadar laptop gaming — ini adalah workstation portabel yang sesungguhnya.\n\nLayar QHD (2560x1600) dengan refresh rate 165Hz dan waktu respons 3ms memastikan setiap frame terbuka sempurna tanpa ghosting maupun screen tearing. Dukungan Adaptive Sync (G-Sync Compatible) membuat transisi visual terasa mulus secara konsisten. Akurasi warna 100% sRGB dengan kecerahan 500 nit menjadikan layar ini tak hanya hebat untuk gaming, tetapi juga untuk desain grafis dan pengeditan foto.\n\nSistem pendingin ROG Intelligent Cooling dengan dua kipas Arc Flow generasi baru dan liquid metal thermal compound dari Thermal Grizzly secara drastis menurunkan suhu CPU hingga 15°C dibanding pasta biasa. Empat heat pipe tembaga berukuran besar bekerja sinergis memastikan performa tetap konsisten meski dalam sesi gaming berjam-jam.\n\nRAM 16GB DDR5 dual-channel 4800MHz sudah tersolder langsung di motherboard untuk performa optimal, didampingi penyimpanan SSD NVMe PCIe 4.0 berkapasitas 512GB yang mampu kecepatan baca hingga 7.000 MB/s. Slot SSD kosong tersedia untuk upgrade kapasitas sesuai kebutuhan.\n\nKeyboard chiclet berukuran penuh dengan travel key 1,7 mm, anti-ghosting N-key rollover, dan backlit single-zone RGB memberikan pengalaman mengetik yang nyaman bahkan dalam kondisi redup. ROG Armoury Crate memungkinkan kustomisasi mendalam atas performa, lampu, dan profil gaming hanya dalam satu aplikasi terintegrasi.\n\nKonektivitas modern dengan WiFi 6E (802.11ax), Bluetooth 5.3, dua port USB-A 3.2 Gen 1, dua port USB-C (satu dengan Thunderbolt 4 dan DisplayPort 1.4), HDMI 2.1 yang mampu output 4K@120Hz ke monitor eksternal, dan port audio 3.5mm kombinasi. Baterai 76Wh dengan pengisian cepat 100W mampu mengisi penuh dalam sekitar 1,5 jam dan menyediakan hingga 10 jam penggunaan ringan sehari-hari.\n\nDirancang dengan casing magnesium-aluminium yang kokoh namun ringan, dan tersedia dalam pilihan warna Eclipse Gray dan Moonlight White yang elegan. Zephyrus G14 adalah pernyataan gaya sekaligus senjata performa bagi gamer dan kreator modern yang tak mau terikat di satu tempat.\n            ', 22999000, 15, 4.8, 1, 'products/laptop.png', '[\"#5c1a1a\", \"#1e1e1e\", \"#2d5c1a\"]', '[\"Onyx Black\", \"Cardinal Red\", \"Navy Blue\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(2, 1, NULL, 'Lenovo ThinkPad X1 Carbon Gen 11', 'lenovo-thinkpad-x1-carbon-gen-11', 'Laptop bisnis premium, Intel i7-13th Gen, RAM 16GB, OLED 14 inch.', '\nLenovo ThinkPad X1 Carbon Gen 11 melanjutkan warisan 30 tahun keunggulan ThinkPad dalam sebuah paket yang lebih ringan, lebih cepat, dan lebih cerdas dari sebelumnya. Dengan bobot mulai dari 1,12 kg dan ketebalan hanya 14,9 mm, laptop bisnis premium ini adalah perjalanan panjang yang terasa seperti tidak membawa beban sama sekali.\n\nDitenagai prosesor Intel Core i7-1365U generasi ke-13 dengan arsitektur hybrid yang menggabungkan Performance Core dan Efficient Core untuk distribusi beban kerja yang lebih cerdas, ThinkPad X1 Carbon Gen 11 mampu memproses tugas produktivitas kompleks, konferensi video multi-aplikasi, dan analisis data besar dengan responsivitas yang konsisten sepanjang hari.\n\nLayar OLED 2.8K (2880x1800) 14 inci dengan refresh rate 90Hz, akurasi warna Delta E < 1, color gamut 100% DCI-P3, dan dukungan Dolby Vision menjadikan setiap konten — dari spreadsheet korporat hingga presentasi kreatif — tampak hidup dan tajam. Kecerahan puncak 400 nit membuatnya nyaman digunakan di berbagai kondisi pencahayaan, termasuk di bawah cahaya matahari langsung.\n\nKeunggulan ThinkPad yang sesungguhnya terletak pada keyboard-nya: keyboard ThinkPad ikonik dengan travel key 1,5 mm, desain anti-tumpahan (water-resistant), dan backlit dua tingkat yang telah memenangkan berbagai penghargaan desain industri. Trackpad berukuran besar dengan permukaan kaca dan TrackPoint merah legendaris di tengah keyboard memastikan navigasi presisi tanpa memindahkan jari dari posisi mengetik.\n\nDaya tahan baterai 57Wh dengan teknologi manajemen daya cerdas Lenovo mampu bertahan hingga 15 jam dalam penggunaan campuran. Pengisian cepat melalui USB-C RapidCharge dapat mengisi 80% kapasitas hanya dalam 1 jam — sempurna untuk profesional yang selalu dalam pergerakan.\n\nKeamanan enterprise-grade dihadirkan melalui sensor sidik jari terintegrasi pada tombol power, kamera IR Windows Hello untuk login wajah tanpa kata sandi, penutup kamera fisik (ThinkShutter), modul Trusted Platform Module (TPM) 2.0, dan opsi kartu SIM 4G LTE untuk konektivitas di mana saja — tanpa bergantung pada WiFi publik yang rentan.\n\nKonektivitas lengkap: dua port Thunderbolt 4, dua port USB-A 3.2 Gen 1, HDMI 2.0b, jack audio 3.5mm, dan slot kartu nano-SIM. WiFi 6E dan Bluetooth 5.1 memastikan koneksi nirkabel yang stabil dan cepat. Webcam 1080p dengan noise cancellation berbasis AI dan empat mikrofon array terarah menjamin kualitas komunikasi video yang profesional.\n\nTelah lulus uji militer MIL-SPEC 810H untuk ketahanan terhadap guncangan, kelembaban, tekanan udara rendah, dan perubahan suhu ekstrem. Chassis terbuat dari carbon fiber yang ditenun khusus — ringan seringan aluminium namun kuat sekuat baja. ThinkPad X1 Carbon Gen 11 adalah definisi sesungguhnya dari laptop bisnis premium yang tidak membuat kompromi di segmen apa pun.\n            ', 28500000, 8, 4.7, 0, 'products/laptop.png', '[\"#1e1e1e\", \"#5c3a1a\"]', '[\"Navy Blue\", \"Cardinal Red\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(3, 1, NULL, 'MacBook Air M2 13\"', 'macbook-air-m2-13', 'Chip M2, Baterai 18 jam, Layar Liquid Retina 13.6 inch.', '\nMacBook Air M2 13 inci menandai lompatan revolusioner dalam desain laptop Apple — kini hadir dalam bodi yang sepenuhnya baru, tanpa kipas pendingin, tanpa kompromi. Dengan ketebalan seragam 11,3 mm (bukan wedge seperti pendahulunya) dan bobot hanya 1,24 kg, ini adalah laptop paling ramping dan ringan yang pernah diproduksi Apple, sekaligus yang paling bertenaga dalam kategorinya.\n\nChip Apple M2 yang diproduksi dengan proses fabrikasi 5nm generasi kedua menghadirkan CPU 8-core dengan 4 Performance Core dan 4 Efficiency Core yang mampu memproses tugas-tugas berat dengan kecepatan yang menakjubkan — hingga 18% lebih cepat dari M1. GPU 10-core (pada konfigurasi tertentu) membawa akselerasi grafis untuk pengeditan video ProRes, desain 3D, dan gaming kasual dengan performa yang tak terduga dari laptop tanpa kipas sekalipun.\n\nNeural Engine 16-core yang tertanam memungkinkan fitur AI seperti Live Text, Smart Noise Cancellation, dan Portrait Mode berjalan langsung di perangkat tanpa bergantung cloud — menjaga privasi sekaligus memberikan respons instan. Bandwidth memori hingga 100 GB/s memastikan data berpindah antara CPU, GPU, dan Neural Engine dengan kecepatan yang tidak tertandingi oleh arsitektur konvensional.\n\nLayar Liquid Retina 13,6 inci (2560x1664) dengan True Tone Technology menyesuaikan warna layar secara otomatis berdasarkan kondisi pencahayaan sekitar untuk kenyamanan visual optimal. Color gamut P3 dengan 1 miliar warna menampilkan gradasi yang halus dan warna yang akurat — sempurna untuk fotografer, desainer, dan editor video yang membutuhkan akurasi warna tinggi.\n\nDaya tahan baterai M2 benar-benar mengesankan: hingga 18 jam pemutaran video, atau sekitar 15 jam browsing WiFi aktif. Ini berarti Anda bisa melewati seharian penuh pekerjaan tanpa pernah mencari-cari stop kontak. Pengisian daya via USB-C (MagSafe 3 juga tersedia) mendukung fast charging yang bisa mengisi 50% dalam 30 menit.\n\nSistem audio empat speaker dengan Spatial Audio dan dukungan Dolby Atmos menciptakan pengalaman sinematik dari speaker internal yang terdengar jauh lebih besar dari ukuran fisiknya. Mikrofon tiga array dengan pemrosesan arah memastikan suara Anda terdengar jernih dalam panggilan video, bahkan di ruangan berisik.\n\nWebcam 1080p dengan ISP (Image Signal Processor) M2 menghasilkan kualitas gambar video call yang jauh di atas standar laptop di kelas harganya. Keyboard Magic Keyboard dengan Touch ID terintegrasi untuk keamanan login yang instan dan aman, serta trackpad Force Touch yang luas dengan haptic feedback presisi.\n\nTersedia dalam empat warna ikonik: Midnight, Starlight, Space Gray, dan Silver. MacBook Air M2 bukan sekadar laptop — ini adalah pernyataan bahwa efisiensi dan performa tidak harus saling mengorbankan satu sama lain.\n            ', 18999000, 20, 4.9, 0, 'products/laptop.png', '[\"#5c1a1a\", \"#2d5c1a\", \"#1e1e1e\", \"#5c3a1a\"]', '[\"Navy Blue\", \"Cardinal Red\", \"Amber Brown\", \"Forest Green\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(4, 1, NULL, 'Acer Aspire 5 A515', 'acer-aspire-5-a515', 'Intel Core i5 gen-12, RAM 8GB, SSD 512GB. Cocok untuk harian.', '\nAcer Aspire 5 A515 adalah bukti nyata bahwa laptop yang terjangkau tidak harus berarti murahan. Didesain untuk memenuhi kebutuhan pelajar, mahasiswa, dan pekerja kantoran yang memerlukan perangkat andal untuk aktivitas sehari-hari, laptop 15,6 inci ini menghadirkan kombinasi performa solid, layar besar yang nyaman, dan daya tahan yang mengagumkan dalam satu paket harga yang kompetitif.\n\nDitenagai prosesor Intel Core i5-1235U generasi ke-12 dengan arsitektur hybrid (2 P-Core + 8 E-Core), laptop ini mampu menangani multitasking ringan hingga sedang dengan sangat mulus — mulai dari menulis laporan, video call panjang, membuka banyak tab browser sekaligus, hingga menggunakan aplikasi perkantoran populer seperti Microsoft Office dan Google Workspace. Prosesor ini juga mengintegrasikan Intel Iris Xe Graphics yang cukup mumpuni untuk pengeditan foto kasual dan streaming video beresolusi tinggi.\n\nLayar IPS 15,6 inci Full HD (1920x1080) dengan panel anti-glare meminimalkan refleksi cahaya sekitar sehingga mata tidak mudah lelah meski digunakan berjam-jam. Sudut pandang wide viewing angle 178° memungkinkan layar terlihat jelas dari berbagai posisi — praktis untuk presentasi atau menonton bersama. Kecerahan 300 nit cukup untuk penggunaan dalam ruangan dan kondisi cahaya moderat di luar ruangan.\n\nRAM 8GB DDR4 dual-channel menyediakan memori yang cukup untuk menjalankan berbagai aplikasi secara bersamaan tanpa hambatan, dan dapat di-upgrade hingga 32GB jika kebutuhan bertambah di masa depan. SSD PCIe NVMe 512GB menawarkan kecepatan boot dan loading aplikasi yang jauh lebih cepat dibanding HDD konvensional — Windows akan aktif siap pakai dalam hitungan detik.\n\nKeyboard berukuran penuh dengan numpad di sisi kanan sangat berguna untuk pekerjaan yang melibatkan banyak input angka seperti akuntansi atau analisis data. Trackpad berukuran besar dengan dukungan gesture multi-finger memudahkan navigasi. Desain palm rest yang luas memberikan ruang istirahat yang nyaman untuk pergelangan tangan selama sesi kerja panjang.\n\nKonektivitas lengkap untuk produktivitas tanpa batas: satu port USB-C 3.2 Gen 1, dua port USB-A 3.2 Gen 1, satu port USB-A 2.0, HDMI 2.0 untuk koneksi monitor eksternal, pembaca kartu SD, jack audio 3.5mm kombinasi, dan port Ethernet RJ-45 untuk koneksi kabel yang stabil. WiFi 6 (802.11ax) dan Bluetooth 5.0 melengkapi konektivitas nirkabel modern.\n\nBaterai 57.5Wh mampu bertahan hingga 9–10 jam penggunaan ringan, cukup untuk menemani hari penuh kuliah atau kerja. Pengisian 65W via adaptor bawaan cukup responsif. Bobot 1,76 kg terbilang wajar untuk laptop 15 inci sehingga masih nyaman dibawa dalam tas setiap hari.\n\nChassis berbahan plastik berkualitas tinggi dengan finishing matte moon silver terasa solid dan tidak mudah meninggalkan bekas sidik jari. Terdapat webcam 720p dengan mikrofon built-in untuk kebutuhan video conference dasar. Sensor sidik jari terintegrasi pada tombol power memungkinkan login Windows Hello yang cepat dan aman. Acer Aspire 5 A515 adalah investasi cerdas untuk kebutuhan komputasi harian yang tidak ingin menguras anggaran.\n            ', 8499000, 30, 4.3, 1, 'products/laptop.png', '[\"#5c1a1a\", \"#1e1e1e\"]', '[\"Cardinal Red\", \"Forest Green\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(5, 1, NULL, 'Dell XPS 15 OLED', 'dell-xps-15-oled', 'Layar OLED 3.5K, Intel Core i9, NVIDIA RTX 4070.', '\nDell XPS 15 dengan layar OLED adalah salah satu laptop paling menawan yang pernah ada — sebuah perpaduan sempurna antara estetika premium, performa workstation, dan kualitas layar yang benar-benar membuat rahang turun. Ini bukan sekadar laptop; ini adalah pernyataan profesional untuk mereka yang bekerja dengan visual sebagai mata pencaharian.\n\nLayar OLED 15,6 inci beresolusi 3.5K (3456x2160) dengan refresh rate 60Hz merupakan bintang utama laptop ini. Teknologi OLED menghadirkan kontras tak terbatas (true black), warna yang meledak hidup dengan color gamut 100% DCI-P3, akurasi warna Delta E < 2, dan waktu respons piksel di bawah 1 ms. Bagi fotografer, videografer, dan desainer grafis, ini adalah layar terbaik yang bisa Anda miliki di laptop. Dukungan Dolby Vision dan HDR500 True Black menjadikan konten HDR terlihat benar-benar seperti yang dimaksudkan oleh sang pembuat konten.\n\nDi balik layar memesona itu, tersimpan mesin performa kelas berat: prosesor Intel Core i9-13900H dengan 14 core (6 P-Core + 8 E-Core) dan clock boost hingga 5.4 GHz mampu menyelesaikan render Blender, kompresi video 8K, dan simulasi teknik dengan kecepatan yang mengintimidasi laptop lain. GPU NVIDIA GeForce RTX 4070 dengan 8 GB GDDR6 dan teknologi Ada Lovelace memberikan akselerasi CUDA yang signifikan untuk DaVinci Resolve, Adobe Premiere, dan aplikasi kreatif lainnya.\n\nRAM 32GB DDR5 dual-channel 4800MHz (upgradeable hingga 64GB) dengan SSD NVMe PCIe 4.0 berkapasitas 1TB (kecepatan baca hingga 7.000 MB/s) memastikan tidak ada bottleneck dalam pipeline kreatif Anda. Penanganan file RAW resolusi tinggi, timeline video multi-layer, dan proyek After Effects berat terasa ringan di tangan laptop ini.\n\nChassis Dell XPS 15 terbuat dari aluminium CNC machined yang dipoles dengan aksen carbon fiber pada palmrest — terasa presisi di tangan dan memancarkan kesan mewah tanpa berlebihan. Desain InfinityEdge dengan bezel tipis di tiga sisi menciptakan rasio layar ke bodi sebesar 93,7%, memaksimalkan real estate visual dalam dimensi fisik yang relatif kompak.\n\nSistem pendingin Dual Fan dengan enam heat pipe tembaga dan thermal paste premium dirancang untuk menjaga performa tetap konsisten bahkan dalam beban kerja intens berkepanjangan. Mode kerja dapat diatur antara Ultra Performance, Optimized, dan Cool & Quiet sesuai prioritas Anda.\n\nKeyboard backlit 4-zone dengan travel key 1,3 mm yang lembut, trackpad besar dengan permukaan kaca yang licin, dan pembaca sidik jari terintegrasi melengkapi pengalaman penggunaan premium. Webcam 720p dengan penutup privasi fisik serta mikrofon array empat arah dengan noise cancellation AI menjamin kualitas komunikasi yang baik.\n\nPort: dua Thunderbolt 4 (40Gbps), satu USB-C 3.2 Gen 2, slot kartu SD UHS-III yang langka di laptop seukuran ini, dan jack audio 3.5mm. Baterai 86Wh dengan pengisian 130W mampu mengisi cepat — dari 0 ke 80% dalam kurang dari satu jam. Dell XPS 15 OLED adalah pilihan tanpa penyesalan bagi para profesional kreatif yang membutuhkan yang terbaik dari yang terbaik.\n            ', 34500000, 5, 4.9, 0, 'products/laptop.png', '[\"#5c3a1a\", \"#1a3a5c\", \"#1e1e1e\", \"#2d5c1a\"]', '[\"Forest Green\", \"Cardinal Red\", \"Navy Blue\", \"Amber Brown\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(6, 1, NULL, 'HP Victus 15', 'hp-victus-15', 'Laptop gaming entry-level, Ryzen 5, RTX 3050, 144Hz screen.', '\nHP Victus 15 hadir sebagai jawaban HP untuk mereka yang ingin menjelajahi dunia gaming tanpa harus merogoh kocek terlalu dalam. Dengan desain yang bersih, modern, dan justru menghindari kesan \'gaming berlebihan\' yang stereotip, Victus 15 adalah laptop gaming yang bisa Anda bawa ke kelas, ke kantor, atau ke kafe tanpa merasa canggung.\n\nDitenagai AMD Ryzen 5 7535HS — prosesor mobile kelas menengah dengan 6 core dan 12 thread yang di-boost hingga 4.55 GHz — laptop ini mampu menjalankan game-game kompetitif populer seperti Valorant, CS2, Apex Legends, dan League of Legends dengan frame rate yang nyaman di atas 60fps pada setting medium-high. Dikombinasikan dengan GPU NVIDIA GeForce RTX 3050 berkapasitas 4 GB GDDR6, pengalaman gaming yang mulus dan responsif tersedia dalam genggaman.\n\nLayar IPS 15,6 inci Full HD (1920x1080) dengan refresh rate 144Hz memberikan keunggulan visual yang signifikan dibanding laptop standar 60Hz — gerakan terlihat lebih mulus, animasi lebih tajam, dan respons visual lebih cepat yang memberikan keunggulan kompetitif nyata dalam game. Waktu respons 9ms dan dukungan AMD FreeSync menghilangkan screen tearing untuk pengalaman visual yang bersih.\n\nRAM 8GB DDR5 (dapat di-upgrade hingga 32GB) dan SSD NVMe 512GB PCIe 4.0 menjamin loading game yang cepat dan multitasking yang lancar antara game, Discord, browser, dan aplikasi lainnya. Slot RAM kosong tersedia untuk upgrade mudah di kemudian hari sesuai perkembangan kebutuhan.\n\nHP Command Center memungkinkan Anda mengontrol mode performa (Performance, Balanced, Comfort) dan kecepatan kipas secara manual langsung dari aplikasi. Mode Performance mengaktifkan kipas pada kecepatan penuh untuk memaksimalkan output GPU dan CPU dalam sesi gaming intensif. Dual fan dengan dual heat pipe memastikan sirkulasi udara yang memadai untuk menjaga suhu tetap dalam batas aman.\n\nKeyboard gaming dengan backlit ungu khas gaming signature dan anti-ghosting 26-key (bukan N-key rollover penuh, namun memadai untuk mayoritas game) memberikan respons input yang konsisten. Touchpad berukuran besar dengan gesture multi-finger mendukung produktivitas saat tidak sedang gaming.\n\nKonektivitas: satu USB-C 3.2 Gen 1, dua USB-A 3.2 Gen 1, satu USB-A 2.0, HDMI 2.1 untuk output ke TV atau monitor gaming eksternal, pembaca kartu microSD, RJ-45 Ethernet, dan jack audio 3.5mm. WiFi 6 dan Bluetooth 5.0 melengkapi opsi koneksi nirkabel. Baterai 70.9Wh mendukung penggunaan hingga 8 jam di luar gaming, dengan adaptor 150W yang menjamin performa penuh saat terhubung ke daya.\n\nBobot 2,29 kg dengan ketebalan 23,5 mm terbilang masih portabel untuk ukuran laptop gaming 15 inci. Finishing mica silver dengan aksen hitam memberikan tampilan yang bersih tanpa kesan norak. HP Victus 15 adalah titik masuk gaming yang tepat dan cerdas.\n            ', 11500000, 12, 4.4, 0, 'products/laptop.png', '[\"#1e1e1e\", \"#1a3a5c\"]', '[\"Cardinal Red\", \"Forest Green\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(7, 1, NULL, 'MSI Katana GF66', 'msi-katana-gf66', 'Gaming laptop, i7-12th Gen, RTX 3060, desain elegan.', '\nMSI Katana GF66 mengambil inspirasi dari ketajaman dan ketepatan pedang Katana Jepang — sebuah filosofi yang tercermin dalam desain dan performa laptop gaming kelas menengah-atas ini. Dengan DNA gaming yang kuat namun harga yang masih terjangkau, Katana GF66 mengincar para gamer serius yang ingin pengalaman gaming premium tanpa harga flagship.\n\nJantung dari Katana GF66 adalah prosesor Intel Core i7-12700H generasi ke-12 dengan 14 core (6 P-Core + 8 E-Core) dan clock boost hingga 4.7 GHz — salah satu CPU mobile paling bertenaga di kelasnya. Dikombinasikan dengan GPU NVIDIA GeForce RTX 3060 berkapasitas 6 GB GDDR6 dengan dukungan DLSS 2.0 dan Ray Tracing, laptop ini mampu menjalankan game AAA terbaru seperti Cyberpunk 2077, Elden Ring, hingga Star Wars Jedi: Survivor dengan setting high-to-ultra pada resolusi Full HD.\n\nLayar IPS 15,6 inci Full HD (1920x1080) dengan refresh rate 144Hz dan waktu respons 3ms menciptakan pengalaman visual gaming yang responsif dan mulus. Anti-glare coating memastikan kenyamanan bermain bahkan di ruangan berterang. Layar ini juga merupakan pilihan solid untuk konten kreatif ringan dengan reproduksi warna yang cukup akurat.\n\nMSI Cooler Boost 5 dengan dua kipas besar dan enam heat pipe tembaga berdiameter bervariasi adalah tulang punggung sistem pendingin Katana. Teknologi ini memungkinkan sirkulasi udara yang agresif untuk menjaga GPU dan CPU tetap dalam rentang suhu optimal bahkan saat bermain game berat dalam durasi panjang. Software MSI Center memungkinkan pengguna memilih antara mode Extreme Performance, Balanced, dan Silent sesuai situasi.\n\nRAM 16GB DDR4 dual-channel 3200MHz sudah terpasang dalam konfigurasi optimal, dengan dua slot tersedia untuk upgrade hingga 64GB jika kebutuhan meningkat. SSD NVMe PCIe 3.0 512GB dilengkapi satu slot SSD kosong dan bracket HDD 2.5 inci untuk ekspansi penyimpanan maksimal. Total tiga slot penyimpanan memberikan fleksibilitas yang jarang ditemukan di laptop seukurannya.\n\nKeyboard RGB per-key backlit dengan warna merah ikonik MSI dan single-zone merah memiliki tactile feedback yang memuaskan dengan anti-ghosting penuh. Numpad terintegrasi memberikan nilai tambah bagi yang sering berurusan dengan angka. Audio dari dua speaker stereo dengan teknologi Nahimic menghadirkan soundstage yang imersif untuk gaming.\n\nKonektivitas mumpuni: satu USB-C 3.2 Gen 1 (dengan DisplayPort), tiga USB-A 3.2 Gen 1, HDMI 2.0b, RJ-45 Gigabit LAN, dan jack audio 3.5mm. WiFi 6 (802.11ax) dan Bluetooth 5.2 melengkapi koneksi nirkabel. Baterai 53.5Wh didukung adaptor 230W untuk memastikan performa penuh saat gaming. Desain chassis hitam metalik dengan aksen merah memancarkan aura gaming yang tegas dan maskulin. MSI Katana GF66 adalah pilihan yang tidak akan mengecewakan untuk gamer yang bermain serius.\n            ', 16200000, 10, 4.5, 1, 'products/laptop.png', '[\"#2d5c1a\", \"#1e1e1e\"]', '[\"Navy Blue\", \"Cardinal Red\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(8, 2, NULL, 'Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Snapdragon 8 Gen 3, Kamera 200MP, S Pen terintegrasi.', '\nSamsung Galaxy S24 Ultra bukan sekadar smartphone — ini adalah ekosistem produktivitas, kamera profesional, dan platform AI yang terkemas dalam satu perangkat titanium yang menawan. Sebagai puncak lini Galaxy S 2024, S24 Ultra mendefinisikan ulang apa yang bisa dilakukan sebuah smartphone di era kecerdasan buatan.\n\nDitenagai Snapdragon 8 Gen 3 for Galaxy — varian yang dioptimalkan khusus oleh Samsung untuk ekosistem Galaxy — prosesor ini memberikan peningkatan performa CPU sebesar 30% dan GPU 25% dibanding generasi sebelumnya. Lebih dari sekadar kecepatan mentah, Snapdragon 8 Gen 3 adalah otak dari ekosistem Galaxy AI yang revolusioner: Circle to Search with Google, Live Translate percakapan telepon real-time, Chat Assist untuk memoles tulisan, dan Transcript Assist yang mentranskrip rekaman suara secara otomatis.\n\nSistem kamera quad-lens adalah kebanggaan S24 Ultra. Kamera utama 200MP dengan sensor ISOCELL HP2 dan apertur f/1.7 menangkap cahaya dalam jumlah masif untuk foto yang kaya detail bahkan dalam kondisi remang-remang. Teknologi Adaptive Pixel secara cerdas menggabungkan piksel (16-in-1 pixel binning) untuk foto malam yang bersih dari noise. Kamera telefoto 10MP dengan periskop 5x optical zoom (hingga 100x Space Zoom digital) dan kamera telefoto 10MP 3x memberi fleksibilitas focal length yang luar biasa, sementara ultra-wide 12MP dengan autofocus memungkinkan close-up macro yang mendetail.\n\nLayar Dynamic AMOLED 2X 6,8 inci dengan resolusi QHD+ (3088x1440) dan refresh rate adaptif 1-120Hz memberikan visual yang memukau dalam kondisi apapun. Kecerahan puncak 2.600 nit — paling terang di kelasnya — memastikan layar tetap terbaca bahkan di bawah terik matahari langsung di pantai. Vision Booster secara otomatis meningkatkan kontras dan warna saat outdoor untuk kenyamanan visual optimal.\n\nS Pen sudah terintegrasi di dalam bodi — bukan aksesori terpisah — dengan latensi 2.8ms yang hampir tidak terasa bedanya dengan menulis di atas kertas. Kini didukung AI Sketch to Image yang mengubah coretan kasar menjadi ilustrasi halus instan, dan Note Assist yang merangkum catatan panjang menjadi poin-poin penting secara otomatis.\n\nBaterai 5.000mAh dengan pengisian kabel 45W, wireless charging 15W, dan reverse wireless charging 4.5W memastikan S24 Ultra bertahan sepanjang hari paling sibuk sekalipun. RAM 12GB (atau 12GB pada versi tertentu) dengan UFS 4.0 internal storage 256GB/512GB/1TB memberikan kecepatan akses data yang melampaui batas konvensional.\n\nDesain titanium dengan sudut datar khas premium yang terinspirasi Galaxy Z Fold — bukan baja tahan karat seperti pendahulunya — lebih ringan namun lebih kuat. Layar Corning Gorilla Glass Armor pertama di industri memiliki reflektivitas anti-silau 75% lebih rendah dari kaca standar. Rating IP68 untuk ketahanan air dan debu, tersedia dalam Titanium Black, Gray, Violet, dan Yellow. Samsung Galaxy S24 Ultra adalah smartphone terlengkap dan tercanggih yang tersedia saat ini.\n            ', 19999000, 25, 4.8, 1, 'products/handphone.png', '[\"#1a3a5c\", \"#5c1a1a\"]', '[\"Onyx Black\", \"Cardinal Red\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(9, 2, NULL, 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'Chip A17 Pro, bodi titanium, kamera Tetraprism telephoto.', '\niPhone 15 Pro Max menghadirkan desain paling berani dari Apple dalam bertahun-tahun — pertama kalinya iPhone menggunakan frame titanium aerospace grade, menghasilkan smartphone yang terasa kokoh seperti instrumen presisi namun lebih ringan 19 gram dari pendahulunya berbingkai stainless steel. Titanium Grade 5 yang sama digunakan dalam pesawat luar angkasa dan implan medis kini membungkus teknologi paling canggih dari Apple.\n\nChip A17 Pro yang diproduksi dengan proses 3nm generasi pertama adalah chip ponsel paling bertenaga yang pernah ada. CPU 6-core (2 Performance + 4 Efficiency), GPU 6-core dengan dukungan hardware Ray Tracing dan mesh shading membawa kemampuan gaming konsol ke genggaman tangan. Neural Engine 16-core memproses 35 triliun operasi per detik untuk fitur AI lokal seperti Real-Time Phonetic Transliteration, autocorrect berbasis large language model, dan Voice Memo Transcription.\n\nSistem kamera pro hadir dengan kamera utama 48MP dengan sensor yang 65% lebih besar dari iPhone 14 Pro, memungkinkan low-light photography yang dramatis. Namun bintang sesungguhnya adalah kamera telefoto 12MP dengan lensa Tetraprism inovatif — sistem prisma tetraeder yang melipatkan jalur cahaya di dalam bodi tipis untuk menghadirkan 5x optical zoom (setara 120mm) yang tajam kristal. Ini adalah zoom optik terpanjang yang pernah hadir di iPhone. Ultra-wide 12MP dengan kemampuan macro hingga 2cm melengkapi trio kamera yang sudah sangat lengkap.\n\nVideo ProRes 4K@60fps via USB-C (fitur baru) memungkinkan transfer file langsung ke penyimpanan eksternal atau merekam langsung ke SSD untuk film-maker serius. Log video color profile yang baru memberikan fleksibilitas color grading maksimal dalam pasca-produksi. Apple juga memperkenalkan format spatial video — rekaman untuk Apple Vision Pro — menjadikan iPhone 15 Pro Max sebagai kamera spatial video konsumer pertama di dunia.\n\nAction Button baru yang dapat dikustomisasi menggantikan tombol silent switch lama, dapat diprogram untuk lebih dari 10 fungsi berbeda: buka kamera langsung ke mode tertentu, aktifkan senter, jalankan shortcut favorit, atau fungsi aksesibilitas. Dynamic Island yang diperkenalkan tahun lalu kini terintegrasi lebih dalam dengan ekosistem app pihak ketiga.\n\nLayar Super Retina XDR 6,7 inci dengan ProMotion 120Hz adaptif dan kecerahan outdoor puncak 2.000 nit menjaga visibilitas di semua kondisi. Selalu menyala (Always-On Display) menampilkan waktu, notifikasi, dan widget tanpa perlu mengangkat ponsel. Baterai yang meningkat secara signifikan kini mampu bertahan hingga 29 jam pemutaran video — rekor baru untuk iPhone Pro Max.\n\nKonektivitas USB 3 via USB-C (kecepatan hingga 10 Gbps) menggantikan Lightning yang sudah satu dekade — perubahan bersejarah. Wi-Fi 6E, Bluetooth 5.3, Ultra Wideband chip generasi terbaru, dan Thread untuk ekosistem smart home melengkapi konektivitas. iPhone 15 Pro Max tersedia dalam Natural Titanium, Blue Titanium, White Titanium, dan Black Titanium — empat warna yang menampilkan keindahan alami titanium itu sendiri.\n            ', 23999000, 18, 4.9, 0, 'products/handphone.png', '[\"#2d5c1a\", \"#1a3a5c\"]', '[\"Amber Brown\", \"Navy Blue\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(10, 2, NULL, 'Xiaomi 14 Pro', 'xiaomi-14-pro', 'Snapdragon 8 Gen 3, kamera Leica 50MP, 120W HyperCharge.', '\nXiaomi 14 Pro adalah flagship yang berani — sebuah deklarasi bahwa Xiaomi telah tiba di liga paling atas smartphone dunia. Dengan kolaborasi eksklusif bersama Leica dan spesifikasi yang tidak berkompromi di segmen apapun, 14 Pro adalah perangkat yang akan membuat pengguna meragukan perlunya membayar lebih mahal untuk merek lain.\n\nSistem kamera Leica Summilux adalah mahkota dari Xiaomi 14 Pro. Lensa kamera utama 50MP dengan apertur f/1.42 — salah satu yang terbesar di industri smartphone — menangkap cahaya dalam jumlah luar biasa untuk foto malam yang bersih dan penuh detail. Karakter Leica yang khas: tone warna yang hangat dan organik, kontras natural dengan highlight yang tidak mudah blown-out, dan bokeh yang lembut seperti lensa kamera mirrorless premium. Mode Leica Vibrant memberikan tampilan vivid penuh warna, sementara Leica Authentic menghadirkan reproduksi warna yang setia seperti mata manusia melihat.\n\nKamera telefoto periskop 50MP dengan zoom optik 3.2x (lensa floating yang merupakan teknologi pertama Xiaomi) memberikan ketajaman yang konsisten di seluruh rentang zoom. Ultra-wide 50MP dengan autofocus memungkinkan makro landscape yang tak terduga. Tiga sensor 50MP merupakan keseragaman resolusi yang langka dan memberikan kualitas konsisten di semua focal length.\n\nSnapdragon 8 Gen 3 yang sama dengan kompetitor flagship lain dijalankan oleh sistem pendingin HyperCool yang lebih agresif — vapor chamber yang 20% lebih besar dari generasi sebelumnya memungkinkan sustained performance yang lebih tinggi dalam durasi lebih lama tanpa throttling. Benchmark menunjukkan Xiaomi 14 Pro mampu mempertahankan performa puncak lebih lama dibanding kebanyakan pesaingnya.\n\nLayar LTPO OLED 6,73 inci dengan resolusi 1440x3200 (522 ppi), refresh rate adaptif 1-120Hz, kecerahan puncak 3.000 nit (tertinggi di industri saat peluncuran), dan Dolby Vision + HDR10+ menghadirkan visual yang sungguh menakjubkan. Mikrolensa layer di atas panel meningkatkan efisiensi transmisi cahaya untuk kecerahan lebih tinggi dengan konsumsi daya lebih rendah.\n\nHyperCharge 120W kabel adalah salah satu pengisian tercepat yang tersedia secara komersial — mengisi baterai 4.880mAh dari 0 ke 100% hanya dalam 23 menit. Wireless charging 50W mengisi baterai dalam sekitar 45 menit tanpa kabel sama sekali. Reverse wireless charging 10W memungkinkan 14 Pro menjadi charger nirkabel darurat untuk perangkat lain.\n\nBodi ceramic glass dengan frame titanium memberikan premium feel yang tidak ditawarkan plastik atau bahkan aluminium. Tersedia dalam Titanium Black, Titanium White, dan Eco Leather edisi khusus. Rating IP68 untuk ketahanan air 1,5m selama 30 menit. RAM 12GB/16GB LPDDR5X dengan storage hingga 1TB UFS 4.0. HyperOS — sistem operasi generasi baru Xiaomi — memberikan pengalaman yang lebih responsif, privasi yang lebih baik, dan ekosistem Xiaomi yang lebih terintegrasi.\n            ', 13999000, 30, 4.6, 1, 'products/handphone.png', '[\"#5c1a1a\", \"#1a3a5c\"]', '[\"Forest Green\", \"Navy Blue\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(11, 2, NULL, 'OPPO Find X7 Ultra', 'oppo-find-x7-ultra', 'Kamera Hasselblad, Dimensity 9300, 100W SuperVOOC.', '\nOPPO Find X7 Ultra menuliskan sejarah dengan menghadirkan sistem kamera periskop ganda pertama di dunia — dua kamera telefoto dengan lensa periskop berbeda dalam satu bodi smartphone. Ini bukan hanya pencapaian rekayasa; ini adalah redefinisi total dari apa yang mungkin dilakukan kamera smartphone.\n\nKemitraan dengan Hasselblad memberikan sentuhan artistik yang nyata dan terukur pada sistem kamera Find X7 Ultra. Kalibrasi Natural Colour Calibration dengan Hasselblad memastikan reproduksi warna yang akurat secara ilmiah, dan bukan sekadar label marketing. Mode Hasselblad Professional menghadirkan antarmuka berbasis filosofi kamera Hasselblad medium format dengan kontrol manual penuh yang intuitif bagi fotografer berpengalaman.\n\nSensor kamera utama 1 inci Sony LYT-900 dengan 50.3MP dan apertur variable f/1.8-f/4.0 adalah sensor terbesar yang pernah digunakan OPPO — sensor yang lebih besar secara fisik berarti lebih banyak cahaya ditangkap, menghasilkan dynamic range yang superior dan noise yang minimal. Dua kamera periskop: satu 50MP dengan 3x optical zoom dan satu lagi 50MP dengan 6x optical zoom, keduanya menggunakan sensor Sony berkualitas tinggi. Ultra-wide 50MP melengkapi kuartet kamera dengan kemampuan macro 4cm.\n\nMariSilicon X2 — chip NPU imaging proprietary OPPO generasi kedua — bertugas memproses computational photography dengan kecepatan dan efisiensi yang tidak bisa dilakukan oleh Snapdragon 8 Gen 3 sendirian. Ini menghasilkan RAW Night Photography yang mampu menangkap bintang-bintang di langit malam, video 4K dengan noise reduction real-time, dan mode AI Portrait yang memisahkan subjek dari latar dengan ketepatan yang mengesankan.\n\nLayar LTPO AMOLED 6,82 inci melengkung di keempat sisinya dengan resolusi QHD+ (3168x1440), refresh rate adaptif 1-120Hz, kecerahan puncak 4.500 nit (rekor dunia saat peluncuran), dan ultra-thin film yang meminimalkan efek layar melengkung berlebihan. Always-On Display yang efisien dan desain yang imersif menjadikan Find X7 Ultra adalah display smartphone terbaik yang pernah ada.\n\nBaterai 5.000mAh didukung SUPERVOOC 100W kabel yang mengisi dari 0 ke 100% dalam 26 menit, AIRVOOC 50W wireless yang memimpin di kelas wireless charging, dan reverse wireless 10W. Snapdragon 8 Gen 3 dengan RAM 16GB LPDDR5X dan storage 256GB/512GB UFS 4.0. ColorOS 14 berbasis Android 14 dengan BlokGuard anti-malware dan Private Safe untuk privasi data.\n\nBodi Ceramic White atau Titanium Gray dengan frame titanium memberikan kesan soliditas yang luar biasa. Ketebalan 9,5 mm dan bobot 220 gram adalah trade-off yang masuk akal untuk teknologi yang dikandungnya. IP68 water resistance. OPPO Find X7 Ultra adalah untuk para enthusiast kamera yang tidak mau kompromi sedikitpun dalam kualitas imaging.\n            ', 16500000, 12, 4.7, 0, 'products/handphone.png', '[\"#2d5c1a\", \"#5c1a1a\", \"#5c3a1a\", \"#1a3a5c\"]', '[\"Amber Brown\", \"Navy Blue\", \"Forest Green\", \"Cardinal Red\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(12, 2, NULL, 'Samsung Galaxy Tab S9 Ultra', 'samsung-galaxy-tab-s9-ultra', 'Layar 14.6 inch, Snapdragon 8 Gen 2, S Pen, IP68.', '\nSamsung Galaxy Tab S9 Ultra hadir dengan keyakinan penuh bahwa tablet Android bisa menjadi pengganti laptop yang sesungguhnya — bukan sekadar pengganti yang terpaksa dipilih karena keterbatasan. Dengan layar 14,6 inci yang mendominasi ruang pandang dan spesifikasi setara flagship phone premium, Tab S9 Ultra adalah pernyataan ambisius tentang masa depan komputasi mobile.\n\nDynamic AMOLED 2X 14,6 inci dengan resolusi 2960x1848 (240 ppi) dan refresh rate 120Hz adalah layar tablet terbaik yang pernah diproduksi Samsung. Kecerahan puncak 930 nit outdoor dan warna akurat 120% P3 membuat karya desain, video, dan foto terlihat lebih baik di layar ini dibanding di banyak monitor desktop biasa. Rasio aspek 16:10 memberikan keseimbangan sempurna antara produktivitas lanskap dan konsumsi konten portrait.\n\nSnapdragon 8 Gen 2 for Galaxy — varian overclock khusus Samsung — menggerakkan Tab S9 Ultra dengan performa yang melampaui kebanyakan laptop Windows entry-level. Ditunjang RAM 12GB atau 16GB LPDDR5X (tergantung konfigurasi), multi-window berat dengan empat aplikasi sekaligus, pengeditan video 4K di CapCut atau LumaFusion, dan rendering 3D di aplikasi seperti Shapr3D berjalan mulus tanpa keringat.\n\nS Pen sudah termasuk dalam kotak — sesuatu yang Apple tidak berikan pada iPad Pro. Dengan latensi 2,8ms, ketebalan 9mm, dan sudut deteksi 4.096 level tekanan, menulis dan menggambar di S Pen terasa sangat natural. Fitur Air Actions memungkinkan kontrol gesture jarak jauh untuk presentasi atau shutter kamera remot. Samsung Notes dengan AI Handwriting Summarization mengkonversi catatan tangan menjadi teks digital dan merangkumnya secara otomatis.\n\nKetahanan IP68 (tahan debu dan air hingga 1,5m selama 30 menit) menjadikan Tab S9 Ultra teman yang andal di berbagai situasi — di tepi kolam, dalam kondisi hujan ringan, atau di dapur. Bodi aluminum yang solid terasa premium di tangan. Tersedia dalam Graphite dan Beige — warna-warna profesional yang tidak terlihat seperti mainan.\n\nQuad speaker stereo yang di-tuning oleh AKG dengan Dolby Atmos menghadirkan audio yang mengisi ruangan — sangat memuaskan untuk menonton film. Kamera depan 12MP ultra-wide dengan auto-framing (mengikuti wajah dalam video call) dan kamera belakang 13MP + ultra-wide 8MP mencukupi kebutuhan dokumentasi sehari-hari. Samsung DeX mode mengubah Tab S9 Ultra menjadi pengalaman desktop Android yang sesungguhnya saat terhubung ke monitor, keyboard, dan mouse eksternal — satu perangkat yang menggantikan tablet dan komputer sekaligus.\n\nBaterai 11.200mAh yang besar didukung pengisian 45W — mengisi penuh dalam sekitar 2,5 jam. WiFi 6E dan opsi WiFi + 5G untuk konektivitas di mana saja. Ekosistem Samsung Multi-Control memungkinkan satu mouse dan keyboard mengontrol Tab S9 Ultra dan Galaxy laptop secara bersamaan, mentransfer file hanya dengan drag-and-drop antar perangkat.\n            ', 17999000, 10, 4.8, 0, 'products/handphone.png', '[\"#1e1e1e\", \"#5c1a1a\", \"#1a3a5c\", \"#5c3a1a\"]', '[\"Amber Brown\", \"Onyx Black\", \"Forest Green\", \"Cardinal Red\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(13, 2, NULL, 'Google Pixel 8 Pro', 'google-pixel-8-pro', 'Chip Tensor G3, kamera AI terbaik, Android murni.', '\nGoogle Pixel 8 Pro adalah argumen paling meyakinkan bahwa smartphone terbaik tidak harus yang memiliki spesifikasi hardware tertinggi di atas kertas — melainkan yang mengintegrasikan hardware dan software paling harmonis. Di Pixel 8 Pro, Google membuktikan filosofi ini dengan cara yang belum pernah ada sebelumnya.\n\nTensor G3 — chip AI kedua yang dirancang sepenuhnya oleh Google — adalah lebih dari sekadar prosesor ponsel. Ini adalah mesin inferensi AI yang dirancang khusus untuk menjalankan model bahasa besar (LLM) dan model visual AI langsung di perangkat, tanpa cloud. Hasilnya adalah fitur-fitur AI yang merespons instan, privat, dan bisa bekerja bahkan tanpa koneksi internet: Magic Eraser yang menghapus objek dan rekonstruksi latar belakang dengan sempurna, Best Take yang menggabungkan ekspresi terbaik dari multiple foto grup, Video Boost yang menggunakan Google Cloud untuk meningkatkan kualitas video secara dramatis (Night Sight Video), dan Call Screen yang menyaring panggilan spam secara otomatis.\n\nSistem kamera triple-lens yang ditingkatkan: kamera utama 50MP GN2 dengan apertur f/1.68 dan Optical Image Stabilization generasi terbaru mampu menghasilkan foto yang tajam dalam kondisi hampir gelap total. Telefoto 48MP dengan 5x optical zoom (setara 120mm) adalah lompatan besar dari Pixel 7 Pro yang hanya 4.8x. Ultra-wide 48MP dengan autofocus mampu makro dari jarak 2cm. Semua diproses oleh ISP Tensor G3 yang mampu merekam video Night Sight untuk pertama kalinya — video di lingkungan dengan pencahayaan sangat minim yang masih terlihat terang dan detail.\n\nLayar LTPO OLED 6,7 inci dengan resolusi QHD+ (1344x2992), refresh rate adaptif 1-120Hz, kecerahan outdoor 2.400 nit, dan Temperature Sensor (fitur pertama di dunia pada smartphone) yang dapat mengukur suhu permukaan benda membuatnya benar-benar berbeda dari kompetitor. Layar ini mendukung Dolby Vision dan termasuk yang terbaik di segmennya dalam hal reproduksi warna.\n\nJaminan update 7 tahun — software AND keamanan hingga tahun 2030 — adalah komitmen yang tidak ditawarkan oleh Android OEM manapun. Ini menjamin investasi jangka panjang yang signifikan. Baterai 5.050mAh dengan pengisian kabel 30W, wireless 23W, dan reverse wireless 12W. RAM 12GB LPDDR5, storage hingga 1TB UFS 3.1. IP68 water resistance, frame polished aluminum, belakang matte glass. Warna: Obsidian, Porcelain, Bay (biru), dan Mint — pilihan yang segar dan berbeda dari mainstream hitam-putih. Pixel 8 Pro adalah Android terbaik bagi mereka yang menginginkan AI terdepan.\n            ', 15500000, 7, 4.7, 0, 'products/handphone.png', '[\"#5c1a1a\", \"#1e1e1e\", \"#1a3a5c\", \"#2d5c1a\"]', '[\"Onyx Black\", \"Amber Brown\", \"Cardinal Red\", \"Forest Green\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(14, 2, NULL, 'iPad Pro M2 12.9\"', 'ipad-pro-m2-129', 'Layar Liquid Retina XDR, Chip M2, Thunderbolt support.', '\niPad Pro M2 12,9 inci dengan layar Liquid Retina XDR bukan sekadar tablet — ini adalah pernyataan bahwa Apple serius ingin iPad Pro menjadi komputer sejati, bukan sekadar layar sentuh yang lebih besar. Dengan chip M2 yang sama dengan MacBook dan layar yang oleh banyak profesional dinilai sebagai layar terbaik yang pernah ada di perangkat portable, iPad Pro M2 adalah alat kerja yang sesungguhnya.\n\nLayar Liquid Retina XDR 12,9 inci menggunakan teknologi Mini-LED — ribuan LED mini yang masing-masing dapat dikontrol secara individual untuk lokal dimming yang presisi. Hasilnya: kontras true-to-HDR, hitam yang benar-benar gelap (1.000:1 contrast ratio penuh, 1.000.000:1 contrast ratio dengan lokal dimming), kecerahan puncak 1.600 nit untuk konten HDR, dan kecerahan layar penuh 1.000 nit untuk penggunaan umum. ProMotion 120Hz adaptif (10Hz hingga 120Hz) membuat scrolling dan animasi terasa seperti gerak fisik yang nyata. P3 wide color gamut, True Tone, dan anti-reflective coating melengkapi spesifikasi layar yang tidak tertandingi oleh tablet manapun di kelas harganya.\n\nChip M2 yang sama dengan MacBook Air M2 — CPU 8-core, GPU 10-core, Neural Engine 16-core, dan unified memory bandwidth 100 GB/s — memberikan iPad Pro kemampuan yang sungguh mengejutkan. Procreate dengan brush engine yang memanfaatkan M2 menghasilkan respons yang terasa seperti pensil di atas kertas. DaVinci Resolve mampu mengedit timeline multi-layer 4K ProRes tanpa render proxy. Shapr3D dan Nomad Sculpt menjalankan model 3D kompleks dengan performa setara workstation kompak.\n\nApple Pencil 2 (dijual terpisah) dengan latensi di bawah 9ms, pengenalan sudut, dan fitur double-tap untuk ganti tool menjadikan iPad Pro sebagai drawing tablet digital terbaik yang bisa Anda beli. Center Stage memastikan kamera depan 12MP TrueDepth selalu mempertahankan Anda dalam frame selama video call meski Anda bergerak — sangat berguna untuk presentasi atau pengajaran online.\n\nUSB4 / Thunderbolt 4 — fitur yang tidak ada di iPad lain — memungkinkan transfer data 40 Gbps, koneksi ke display Pro Display XDR 6K, atau hub Thunderbolt yang menghubungkan berbagai periferal sekaligus. Magic Keyboard (dijual terpisah) mengubah iPad Pro menjadi laptop touchscreen dengan trackpad yang responsif. Studio-quality four-speaker audio dengan Spatial Audio memenuhi ruangan dengan suara yang jauh melampaui ekspektasi dari form factor setipis 6,4 mm.\n\nWiFi 6E untuk koneksi nirkabel tercepat, opsi 5G untuk mobilitas total, dan Smart Connector untuk aksesori tanpa kabel. Tersedia dalam Space Gray dan Silver, dengan opsi RAM 8GB atau 16GB dan storage dari 128GB hingga 2TB. Baterai 10.758mAh mampu bertahan hingga 10 jam penggunaan aktif. iPad Pro M2 12,9 inci adalah rekomendasi tanpa reservasi untuk profesional kreatif yang bekerja di ekosistem Apple.\n            ', 21000000, 15, 4.9, 0, 'products/handphone.png', '[\"#5c1a1a\", \"#1e1e1e\"]', '[\"Amber Brown\", \"Forest Green\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(15, 3, NULL, 'Logitech MX Master 3S', 'logitech-mx-master-3s', 'Mouse wireless 8000 DPI, scroll MagSpeed senyap.', '\nLogitech MX Master 3S adalah puncak evolusi dari lini mouse produktivitas yang sudah merajai meja kerja para profesional selama bertahun-tahun. \'S\' dalam namanya bukan sekadar suffix pemasaran — ini merepresentasikan peningkatan substansial yang menjawab satu-satunya kritik terhadap pendahulunya: kebisingan klik. Dengan Quiet Clicks yang 90% lebih senyap namun tetap terasa taktil dan memuaskan, MX Master 3S adalah mouse yang bisa digunakan pukul 2 pagi tanpa membangunkan siapapun.\n\nSensor Darkfield 8000 DPI adalah satu-satunya sensor mouse di dunia yang mampu bekerja di atas permukaan kaca — bukan hanya kaca berwarna atau bertekstur, tetapi juga kaca bening sepenuhnya. Ini berarti MX Master 3S tidak memerlukan mousepad sama sekali, menjadikannya sempurna untuk penggunaan di meja kaca, meja marmer, atau permukaan apapun. Presisi sensor ini juga melampaui kebutuhan mayoritas pengguna produktivitas dan bahkan banyak gamer kasual.\n\nMagSpeed Electromagnetic Scrolling adalah teknologi scroll yang benar-benar mengubah cara berinteraksi dengan dokumen panjang. Roda scroll elektromagnetik ini memiliki dua mode yang berpindah otomatis berdasarkan kecepatan scroll: mode Click-to-Click yang terasa seperti scroll mekanis biasa untuk navigasi presisi per-line, dan mode FreeWheeling yang berputar dengan inersia hampir tanpa gesekan — satu swipe bisa menggulir ribuan baris dalam hitungan detik. Kecepatan scroll ini 90% lebih cepat dari scroll konvensional dan menjadi fitur yang paling disukai pengguna setelah mencobanya.\n\nTombol horizontal scroll di ibu jari adalah fitur tersembunyi yang sangat berguna untuk spreadsheet, timeline video, atau peta yang lebar. Rocker button di belakang wheel dan gesture button tambahan (total 7 tombol programmable) memungkinkan kustomisasi alur kerja yang dalam melalui software Logi Options+. Setiap tombol dapat diprogram berbeda untuk setiap aplikasi secara otomatis — tombol yang sama berfungsi berbeda di Photoshop, Excel, dan VS Code.\n\nKoneksi Logi Bolt (USB receiver) atau Bluetooth LE memungkinkan MX Master 3S terhubung hingga tiga perangkat secara bersamaan dan berpindah dengan satu tekan tombol Easy-Switch. Flow technology memungkinkan mouse bergerak mulus antara dua komputer berbeda bahkan lintas platform (Mac dan Windows) — kursor secara otomatis berpindah ke komputer kedua saat mencapai tepi layar, dan copy-paste berfungsi antar perangkat yang berbeda OS.\n\nBaterai internal 500mAh diisi via USB-C dalam 3 jam dan bertahan hingga 70 hari dalam penggunaan normal — lebih dari dua bulan kerja tanpa khawatir kehabisan daya. Ergonomi dirancang oleh para insinyur Logitech berdasarkan studi ekstensif tentang posisi tangan selama penggunaan jangka panjang. Thumb rest yang lebar, permukaan karet yang lembut, dan lekuk yang mengikuti kontur tangan alami memastikan kenyamanan dalam sesi kerja marathon sekalipun. MX Master 3S adalah investasi produktivitas terbaik yang bisa Anda lakukan untuk meja kerja Anda.\n            ', 1299000, 50, 4.7, 0, 'products/mouse.png', '[\"#2d5c1a\", \"#5c3a1a\", \"#1a3a5c\"]', '[\"Navy Blue\", \"Onyx Black\", \"Forest Green\"]', '[\"products/mouse.png\", \"products/mouse.png\", \"products/mouse.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51');
INSERT INTO `produk` (`id`, `kategori_id`, `brand_id`, `nama`, `slug`, `deskripsi`, `deskripsi_detail`, `harga`, `stok`, `rating`, `adalah_promo`, `gambar`, `colors`, `color_labels`, `images`, `specs`, `reviews`, `dibuat_pada`, `diperbarui_pada`) VALUES
(16, 3, NULL, 'Keychron Q1 Pro', 'keychron-q1-pro', 'Keyboard mekanikal wireless 75%, hot-swappable.', '\nKeychron Q1 Pro adalah keyboard mekanikal yang memasuki liga serius enthusiast keyboard tanpa memerlukan Anda membangun dari komponen terpisah atau menghabiskan anggaran yang tidak masuk akal. Ini adalah keyboard yang sudah selesai, sudah sempurna dari kotak, namun masih menawarkan ruang kustomisasi yang nyaris tak terbatas bagi yang menginginkan lebih.\n\nKonstruksi aluminum CNC machined setebal 6,2mm pada bodi utama adalah hal pertama yang Anda rasakan — dingin, solid, berat (1,3 kg), dan kokoh seperti instrumen presisi yang mahal. Tidak ada flex, tidak ada creak, tidak ada kompromi. Ini adalah keyboard yang akan bertahan lebih lama dari kebanyakan laptop di atas meja yang sama.\n\nSistem mounting gasket — menggunakan lapisan silikon yang menggantungkan PCB di antara bodi atas dan bawah — adalah alasan mengapa Q1 Pro memiliki suara dan feel ketukan yang khas. Gasket mount menyerap energi ketukan secara lateral sehingga setiap keystroke terasa \'bouncy\' atau empuk dengan suara yang lebih rendah dan dalam (thocky) dibanding top atau bottom mount konvensional. Ini adalah desain yang biasanya hanya ditemukan pada keyboard custom yang dijual seharga tiga kali lipat.\n\nHot-swappable switches (south-facing PCB, Kailh hot-swap socket) memungkinkan Anda mengganti switch tanpa soldering — hanya dengan pencabut switch yang disertakan. Tersedia dengan pilihan switch Gateron G Pro 2.0 Red (linear, sangat mulus), Brown (tactile), atau Blue (clicky), dan kompatibel dengan switches 3-pin maupun 5-pin standar MX. Pre-lubed dari pabrik memberikan kelembutan yang memadai out-of-the-box.\n\nDouble-gasket layer tambahan berupa poron foam di bawah PCB dan bantalan silikon di dasar kasing mempertebal sound dampening. Poron foam di antara switch dan PCB (switch pad) lebih jauh mengurangi noise plastik dari housing switch. Hasilnya adalah suara yang terdengar konsisten, dalam, dan memuaskan — bukan berisik, bukan flat, tetapi tepat di titik manis yang diinginkan enthusiast.\n\nKonektivitas wireless 2.4GHz via USB dongle memberikan latensi ultra-rendah yang tidak terasa berbeda dari kabel dalam penggunaan normal dan gaming kasual, dengan koneksi USB-C kabel sebagai alternatif untuk lag zero absolute. Bluetooth 5.1 untuk multi-device pairing hingga 3 perangkat dengan Easy Switch. Kompatibel dengan Windows, macOS, Linux, iOS, dan Android.\n\nBacklit single-zone RGB per-key dengan 16.7 juta warna dan efek yang dapat dikustomisasi via Keychron Launcher (software berbasis web, tidak perlu install) atau melalui on-board memory. QMK/VIA compatible — framework open-source pemrograman keyboard yang memungkinkan remapping tombol, makro, layer, dan setiap aspek fungsi keyboard secara granular tanpa batas. Ini adalah tingkat kustomisasi yang biasanya hanya ada di keyboard DIY kelas atas.\n\nLayout 75% (84 tombol) mempertahankan navigasi cluster dan F-row dalam ukuran yang lebih kompak dari full-size, ideal untuk meja yang lebih rapi. Keycap double-shot PBT yang tebal tahan lama, anti-shine, dan anti-yellowing. Q1 Pro tersedia dalam Fully Assembled maupun Barebone (tanpa switch dan keycap) untuk enthusiast yang ingin build sendiri. Ini adalah keyboard terbaik yang bisa Anda beli tanpa menyentuh soldering iron.\n            ', 1850000, 35, 4.8, 1, 'products/keyboard.png', '[\"#5c3a1a\", \"#2d5c1a\", \"#1e1e1e\", \"#1a3a5c\"]', '[\"Amber Brown\", \"Cardinal Red\", \"Navy Blue\", \"Onyx Black\"]', '[\"products/keyboard.png\", \"products/keyboard.png\", \"products/keyboard.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(17, 3, NULL, 'Anker 733 Power Bank', 'anker-733-power-bank', 'Hybrid charger 65W, kapasitas 10000mAh.', '\nAnker 733 Power Bank (GaNPrime PowerCore 65W) adalah solusi pengisian daya yang menjawab pertanyaan yang sering diajukan para traveler modern: mengapa harus membawa charger laptop dan power bank terpisah jika satu perangkat bisa melakukan keduanya? Dengan desain 2-in-1 yang cerdas, 733 menggabungkan wall charger 65W dan power bank 10.000mAh dalam satu perangkat yang cukup ringan untuk dimasukkan ke saku jaket.\n\nTeknologi GaNPrime (Gallium Nitride generasi terbaru) adalah kunci mengapa Anker 733 bisa sekompak ini meski membawa daya 65W. GaN secara inheren lebih efisien dari semikonduktor silikon konvensional — menghasilkan panas yang jauh lebih sedikit untuk jumlah daya yang sama, memungkinkan komponen lebih padat tanpa thermal throttling. ActiveShield 2.0 memonitor suhu lebih dari 3 juta kali per hari untuk menjaga keamanan pengisian bahkan dalam kondisi paling intensif.\n\nMode Wall Charger: Colokkan langsung ke stop kontak melalui dua pin lipat yang terintegrasi dan manfaatkan total 65W output yang terbagi antara dua port USB-C dan satu port USB-A. Port USB-C pertama mengeluarkan hingga 65W sendirian — cukup untuk mengisi MacBook Air, iPad Pro, atau hampir semua laptop tipis modern via USB-C Power Delivery. Port USB-C kedua memberikan hingga 30W, sementara USB-A mengeluarkan hingga 22.5W dengan dukungan VOOC, FCP, AFC, dan Apple Fast Charging untuk kompatibilitas maksimal.\n\nMode Power Bank: Dalam kondisi bepergian tanpa akses stop kontak, 733 beralih fungsi menjadi power bank 10.000mAh yang mengisi daya perangkat via dua port USB-C dan satu USB-A. Kapasitas 10.000mAh cukup untuk mengisi iPhone 15 hingga penuh lebih dari dua kali, Samsung Galaxy S24 hampir dua kali, atau memberi dorongan signifikan pada laptop ultrabook saat baterai hampir habis.\n\nPengisian 733 sendiri via USB-C membutuhkan sekitar 3-4 jam dari kosongan dengan charger 65W — cukup cepat untuk diisi dalam semalam dan siap penuh keesokan harinya. Indikator LED 4-level menampilkan estimasi kapasitas tersisa secara visual. Berat total 310 gram dan dimensi yang tidak jauh beda dengan kotak sabun menjadikannya companion perjalanan yang tidak menambah beban tas secara signifikan. Sertifikasi Airline Safe (di bawah batas 100Wh) memungkinkan 733 dibawa dalam kabin pesawat. Anker 733 adalah salah satu aksesori travel paling cerdas yang pernah ada.\n            ', 699000, 80, 4.5, 1, 'products/kabel.png', '[\"#5c3a1a\", \"#1a3a5c\", \"#1e1e1e\"]', '[\"Amber Brown\", \"Forest Green\", \"Navy Blue\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(18, 3, NULL, 'Razer Goliathus Chroma', 'razer-goliathus-chroma', 'Mousepad RGB lebar dengan permukaan kain mikro.', '\nRazer Goliathus Chroma Extended adalah mousepad gaming yang menggabungkan fungsionalitas esensial dengan estetika RGB yang menjadi ciri khas ekosistem Razer. Untuk pemain yang mengutamakan presisi, konsistensi, dan penampilan setup gaming yang imersif, Goliathus Chroma Extended menawarkan paket yang sulit disamakan di kelasnya.\n\nDimensi Extended (920x294x3mm) cukup besar untuk menampung mouse dan keyboard sekaligus dalam satu permukaan yang terpadu — konsep yang semakin populer di komunitas gaming dan setup streamer. Ini menghilangkan batas antara area mouse dan keyboard, memberikan fleksibilitas posisi periferal yang lebih bebas dan meja yang terlihat lebih rapi.\n\nPermukaan kain mikro-tekstur yang menjadi andalan lini Goliathus dikembangkan untuk memberikan keseimbangan yang diukur dengan presisi antara dua variabel penting: kontrol (surface memiliki cukup resistansi untuk gerakan presisi lambat) dan kecepatan (cukup licin untuk gerakan akurat cepat saat flick shot). Tekstur yang konsisten di seluruh permukaan — tanpa zona berbeda — memastikan sensasi sensor mouse yang seragam di mana pun pointer bergerak di atas pad.\n\nKompatibel dengan semua sensor optik dan laser presisi tinggi yang umum digunakan. Tidak seperti permukaan keras yang bisa meningkatkan CPI/DPI efektif secara tidak konsisten, tekstur kain Goliathus memberikan sensor tracking yang lebih dapat diprediksi dan dapat diandalkan. Razer bahkan menguji secara internal kompatibilitas dengan semua mouse Razer flagship untuk memastikan sinergi optimal.\n\nPencahayaan RGB Razer Chroma sepanjang tepi mousepad menggunakan 19 zona pencahayaan individual yang dapat dikonfigurasi melalui Razer Synapse. Ratusan efek tersedia: breathing, spectrum cycling, static color, reactive (berubah warna saat mouse bergerak), dan sinkronisasi dengan lebih dari 150 game yang mendukung Razer Chroma SDK. Ekosistem Chroma juga mensinkronkan warna dengan periferal Razer lain dan bahkan lampu Philips Hue untuk ambiance yang kohesif.\n\nDasar karet anti-slip dengan ketebalan 3mm memastikan mousepad tidak bergeser bahkan dalam momen paling intens — saat mengeksekusi flick shot di CS2 atau manuver cepat di Valorant. Tepi mousepad dijahit dengan benang tebal yang tahan lama, mencegah fraying dan mempertahankan penampilan bersih meski sudah digunakan bertahun-tahun. Mudah dibersihkan dengan air hangat dan sabun ringan. Kabel USB yang terhubung ke motherboard memiliki panjang 1,5 meter yang cukup untuk setup meja standar.\n            ', 850000, 40, 4.6, 0, 'products/mouse.png', '[\"#5c3a1a\", \"#2d5c1a\", \"#5c1a1a\"]', '[\"Navy Blue\", \"Amber Brown\", \"Cardinal Red\"]', '[\"products/mouse.png\", \"products/mouse.png\", \"products/mouse.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(19, 3, NULL, 'Samsung T7 Shield 1TB', 'samsung-t7-shield-1tb', 'SSD Eksternal tangguh, tahan jatuh dan air IP65.', '\nSamsung T7 Shield adalah SSD eksternal yang dirancang untuk mereka yang tidak punya waktu untuk khawatir tentang penyimpanan data mereka. Pelindung karet yang menyelubungi bodi logam aluminium memberikan proteksi komprehensif terhadap elemen yang paling sering mengancam data berharga: benturan, air, dan debu — semuanya dalam satu perangkat yang nyaman dimasukkan ke saku.\n\nKecepatan baca berurutan hingga 1.050 MB/s dan tulis hingga 1.000 MB/s via interface USB 3.2 Gen 2 (10 Gbps) menjadikan T7 Shield secara konsisten di antara SSD eksternal tercepat yang tersedia untuk konsumen. Untuk perspektif nyata: transfer file 10GB (setara sekitar 100 foto RAW atau video 4K beberapa menit) selesai dalam waktu kurang dari 15 detik. Backup library foto 50GB? Sekitar 1 menit. Dibandingkan HDD eksternal yang membutuhkan 10-15 menit untuk pekerjaan yang sama, perbedaannya sangat terasa.\n\nTeknologi Dynamic Thermal Guard dari Samsung secara otomatis mengoptimalkan performa dan mencegah overheating, mempertahankan kecepatan konsisten dalam transfer file berukuran besar. Tidak ada throttling drastis yang umum ditemui pada SSD eksternal murah saat digunakan dalam durasi panjang. Internal V-NAND 3-bit MLC Samsung generasi terbaru memberikan keandalan dan kecepatan yang sudah terbukti.\n\nRating IP65 untuk proteksi debu penuh (tidak ada debu yang masuk) dan ketahanan terhadap semprotan air dari segala arah. Ini bukan sekadar \'tahan cipratan\' — T7 Shield bertahan dari hujan deras, debu konstruksi, dan lingkungan berpasir. Uji jatuh dari ketinggian 3 meter memberikan kepercayaan diri tambahan untuk penggunaan di lapangan, hiking, atau pekerjaan konstruksi. Sertifikasi MIL-STD-810G untuk shock resistance.\n\nPermukaan karet tekstur yang membungkus bodi aluminium memberikan grip yang nyaman di tangan — tidak akan tergelincir dari genggaman bahkan saat tangan basah atau berkeringat. Bobot 98 gram dan dimensi 88x59x17mm menjadikannya mudah dibawa ke mana saja. Tersedia dalam Beige, Blue, dan Black — pilihan warna yang lebih ekspresif dari SSD eksternal biasa yang selalu hitam.\n\nKoneksi via USB-C yang sudah terpasang di bodi (bukan kabel terpisah yang mudah hilang), dengan kabel USB-C ke USB-C dan adapter USB-C ke USB-A disertakan untuk kompatibilitas maksimal. Enkripsi AES 256-bit opsional via software Samsung Magician memproteksi data sensitif. Kompatibel dengan Windows, Mac, Android, dan iPad Pro — satu perangkat untuk semua ekosistem digital Anda. Garansi 3 tahun dari Samsung memberikan ketenangan pikiran jangka panjang.\n            ', 1750000, 25, 4.8, 0, 'products/mouse.png', '[\"#5c1a1a\", \"#1e1e1e\"]', '[\"Onyx Black\", \"Cardinal Red\"]', '[\"products/mouse.png\", \"products/mouse.png\", \"products/mouse.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(20, 3, NULL, 'Baseus GaN5 Pro 100W', 'baseus-gan5-pro-100w', 'Charger multiport ringkas untuk laptop dan smartphone.', '\nBaseus GaN5 Pro 100W adalah charger meja yang dirancang untuk era multi-device — ketika Anda tidak hanya mengisi laptop, tetapi juga smartphone, earbuds, smartwatch, dan tablet secara bersamaan, dan ingin semua terisi secepat mungkin tanpa menggunakan empat adaptor berbeda yang memenuhi stop kontak.\n\nTeknologi GaN generasi kelima (Gen 5) adalah lompatan dari GaN yang digunakan pada charger 65W sebelumnya. Komponen GaN Gen 5 lebih efisien secara termal, memungkinkan GaN5 Pro beroperasi dengan suhu lebih rendah meski mengeluarkan daya lebih besar. Baseus mengklaim efisiensi konversi daya di atas 93% — artinya sangat sedikit energi yang terbuang sebagai panas, menjaga charger dan kabel tetap sejuk bahkan saat digunakan penuh.\n\nEmpat port output yang dapat digunakan bersamaan: dua port USB-C dan dua port USB-A. Distribusi daya yang cerdas (Power Distribution Technology) secara otomatis mengalokasikan daya optimal berdasarkan perangkat yang terhubung. Skenario tipikal: laptop via USB-C1 (hingga 100W), smartphone via USB-C2 (30W), earbuds via USB-A1 (18W), dan smartwatch via USB-A2 (10W) — semuanya terisi secara bersamaan dengan distribusi daya yang tepat. Total output maksimal 100W dibagi secara dinamis, bukan dibagi rata 25W per port.\n\nProtokol pengisian cepat yang didukung mencakup hampir semua standar yang ada: USB Power Delivery 3.0 (PD 3.0) hingga 100W, Qualcomm Quick Charge 4+ (QC 4+), Apple Fast Charging, Samsung Super Fast Charging, Huawei SuperCharge, dan VOOC. Kompatibilitas ini memastikan setiap perangkat yang Anda miliki — terlepas dari merek dan model — mendapatkan kecepatan pengisian optimal sesuai kemampuan perangkatnya.\n\nFitur perlindungan yang komprehensif: perlindungan over-voltage, over-current, over-power, over-temperature, dan short-circuit. Sistem monitoring real-time memastikan pengisian aman untuk baterai perangkat jangka panjang. Bahan housing PC+ABS V0 flame-retardant yang telah tersertifikasi memberikan lapisan keamanan tambahan.\n\nDimensi 75x75x32mm — lebih kecil dari buku catatan kecil dan hanya sedikit lebih tebal dari smartphone — namun menghadirkan daya yang secara historis hanya bisa dilakukan oleh brick charger berukuran jauh lebih besar. Lipatan pin EU/UK/US tersedia tergantung varian, atau colokan langsung untuk pasar Indonesia. Kabel USB-C ke USB-C 100W 1,5 meter disertakan. Baseus GaN5 Pro 100W adalah upgrade meja kerja yang membuat Anda bertanya-tanya bagaimana bisa bertahan dengan charger lama sebelumnya.\n            ', 450000, 100, 4.7, 1, 'products/sound.png', '[\"#1a3a5c\", \"#2d5c1a\", \"#5c3a1a\"]', '[\"Amber Brown\", \"Cardinal Red\", \"Navy Blue\"]', '[\"products/sound.png\", \"products/sound.png\", \"products/sound.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(21, 4, NULL, 'Sony WH-1000XM5', 'sony-wh-1000xm5', 'Headphone noise cancelling terbaik, 30 jam baterai.', '\nSony WH-1000XM5 melanjutkan warisan XM4 yang sudah memenangkan penghargaan sebagai headphone noise cancelling terbaik, dan kemudian melampaui warisan tersebut. Dengan desain yang sepenuhnya baru, prosesor ANC baru, dan refinement audio yang substansial, XM5 bukan sekadar iterasi — ini adalah pernyataan ulang tentang standar terbaik noise cancelling consumer.\n\nSistem noise cancelling XM5 menggunakan dua prosesor yang bekerja bersamaan: QN1 untuk pemrosesan audio dan Integrated Processor V1 yang baru khusus untuk pemrosesan sinyal ANC. Delapan mikrofon (empat per sisi) bekerja secara terkoordinasi untuk mendeteksi, menganalisis, dan menekan noise sekitar dengan presisi yang belum pernah ada sebelumnya dari Sony. Hasilnya adalah ANC yang menurut pengujian independen mengungguli semua kompetitor di kelasnya termasuk Bose QuietComfort 45 dalam pengukuran objective. Suara engine pesawat, AC gedung, dan kebisingan urban bisa direduksi hingga hampir tak terdengar.\n\nDriver 30mm yang baru dan eksklusif dengan diaphragm berlapis karbon fiber menghasilkan suara dengan detail tinggi di semua frekuensi. Mid-range yang kaya dan natural untuk vokal dan instrumen akustik, treble yang extended tanpa terasa harsh, dan bass yang bertenaga namun terkontrol. LDAC codec (dikembangkan oleh Sony) memungkinkan transmisi Bluetooth audio pada bitrate hingga 990 kbps — tiga kali lebih tinggi dari standar SBC — mendekati kualitas CD bahkan melalui koneksi nirkabel.\n\nFitur Speak-to-Chat adalah salah satu inovasi paling berguna yang sering luput dari perhatian: ketika headphone mendeteksi Anda mulai berbicara, musik secara otomatis dijeda dan ANC berkurang sehingga Anda bisa mendengar percakapan. Tidak perlu pause manual atau melepas headphone. Setelah percakapan selesai, musik dan ANC kembali otomatis dalam beberapa detik. Quick Attention mode memungkinkan Anda menurunkan volume dan meningkatkan suara sekitar hanya dengan menaruh telapak tangan di earcup.\n\nMultipoint Connection yang ditingkatkan memungkinkan XM5 terhubung ke dua perangkat Bluetooth secara bersamaan — misalnya laptop dan smartphone — dan secara otomatis mendeteksi dari mana audio sedang diputar dan berpindah secara seamless. Ini sangat berguna dalam workflow kerja modern dimana Anda berpindah antara video call di laptop dan panggilan telepon.\n\nDesain XM5 berbeda dramatis dari XM4: konstruksi yang lebih ramping tanpa engsel lipat di earcup (headphone terlipat datar ke dalam pouch, bukan folding). Bantalan earcup berbentuk oval dengan busa memory foam 10mm yang lebih dalam memberikan isolasi fisik yang lebih baik. Bobot 250 gram terdistribusi dengan seimbang. Baterai 30 jam dengan ANC aktif, 40 jam tanpa ANC — lebih dari cukup untuk penerbangan internasional terpanjang. Pengisian cepat 3 menit memberikan 3 jam playback. Tersedia dalam Platinum Silver dan Midnight Black.\n            ', 4999000, 22, 4.9, 0, 'products/handphone.png', '[\"#1e1e1e\", \"#1a3a5c\"]', '[\"Forest Green\", \"Amber Brown\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(22, 4, NULL, 'Apple AirPods Pro 2', 'apple-airpods-pro-2', 'TWS chip H2, Active Noise Cancellation, MagSafe Case.', '\nApple AirPods Pro generasi kedua membuktikan bahwa penerus sebuah produk legendaris bisa secara signifikan melampaui pendahulunya daripada sekadar iterasi. Dengan chip H2 yang baru, ANC yang dua kali lebih kuat, dan fitur-fitur inovatif yang tidak ditemukan di TWS lain, AirPods Pro 2 memperlebar jarak antara dirinya dan kompetitor.\n\nChip H2 yang dikembangkan khusus Apple untuk AirPods adalah mesin komputasi akustik yang memproses suara dalam hitungan mikrodetik. Computational Audio yang ditenagai H2 menganalisis suara sekitar 48.000 kali per detik untuk ANC yang adaptif dan real-time — jauh lebih cepat dari yang bisa dilakukan chip generasi sebelumnya. Hasilnya adalah ANC yang dua kali lebih kuat dari AirPods Pro generasi pertama secara terukur, dan Transparency Mode yang lebih alami dari sebelumnya karena suara sekitar diproses ulang secara akustik sebelum disampaikan ke telinga.\n\nPersonalized Spatial Audio dengan Dynamic Head Tracking adalah fitur yang harus dicoba untuk benar-benar diapresiasi. TrueDepth camera iPhone memindai geometri unik telinga dan kepala Anda, dan algoritma Apple mengkalibrasi Spatial Audio secara personal. Ketika kepala Anda bergerak, audio seperti terpaku di ruang — musik dari speaker di depan Anda tetap terdengar dari depan meski kepala menoleh ke kiri atau kanan. Ini bukan hanya efek stereo — ini adalah simulasi akustik ruang tiga dimensi yang dipersonalisasi untuk anatomi telinga Anda.\n\nKasing pengisian generasi kedua hadir dengan speaker built-in yang membunyikan nada saat menggunakan Find My untuk melacak kasing yang hilang — solusi untuk masalah nyata yang sering dihadapi pengguna AirPods. Strap loop di bagian bawah kasing memungkinkan pengait karabiner atau tali. Kasing mendukung pengisian via Lightning (versi lama) atau USB-C (versi baru), MagSafe, Qi wireless, dan bahkan permukaan pengisian jam tangan Apple Watch.\n\nPenggantian ear tips kini lebih mudah dengan sistem snap-on/off yang tidak memerlukan tarikan berlebih. Ear tips XS tersedia untuk telinga terkecil, meningkatkan kenyamanan dan isolasi pasif untuk lebih banyak pengguna. Touch control yang sensitif di batang AirPods untuk play/pause, skip, dan kontrol volume (fitur baru di Gen 2) serta gesture mencubit untuk berganti mode.\n\nANC adaptif secara otomatis menyesuaikan level peredaman berdasarkan tingkat kebisingan lingkungan — di perpustakaan tenang, ANC lebih lembut untuk menghemat baterai; di bandara bising, ANC bekerja maksimal. Adaptive Transparency memfilter suara keras seperti konstruksi atau klakson mobil secara real-time, mempertahankan suara percakapan sembari melindungi pendengaran. Baterai 6 jam (dengan ANC) dan 30 jam total dengan kasing. Chip H2 juga meningkatkan efisiensi pencocokan koneksi dengan perangkat Apple untuk perpindahan yang lebih cepat.\n            ', 3799000, 40, 4.8, 1, 'products/kabel.png', '[\"#2d5c1a\", \"#1a3a5c\", \"#5c1a1a\"]', '[\"Onyx Black\", \"Cardinal Red\", \"Amber Brown\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(23, 4, NULL, 'JBL Charge 5', 'jbl-charge-5', 'Speaker Bluetooth IP67, 20 jam playback, powerbank built-in.', '\nJBL Charge 5 adalah speaker Bluetooth portable yang telah memenangkan kepercayaan jutaan pengguna di seluruh dunia — bukan karena pemasaran yang hebat, tetapi karena ia secara konsisten menghadirkan apa yang dijanjikan: suara JBL yang bertenaga dan berdenyut bass dalam bodi yang bisa diajak ke mana saja tanpa khawatir.\n\nJBL Pro Sound yang ditanamkan dalam Charge 5 menghadirkan karakteristik suara yang sudah dikenal dari speaker panggung JBL yang digunakan di ribuan venue konser: bass yang dalam dan fisik terasa di dada, mid-range yang tegas dan hadir, dan treble yang jernih tanpa terasa sharp. Dua driver pasif radiator (satu di setiap ujung silinder) bekerja bersama satu driver aktif untuk menghasilkan bass yang jauh melampaui ukuran fisik speaker.\n\nDaya output 40W total (20W woofer + 20W tweeter terpisah) menjadikan Charge 5 cukup keras untuk mengisi ruangan berukuran sedang dengan suara yang merata. Dalam kondisi outdoor — di taman, di pantai, atau di kolam renang — suara JBL Charge 5 mampu menembus kebisingan angin dan lingkungan tanpa terdistorsi di volume tinggi.\n\nRating IPX7 berarti Charge 5 tahan terhadap perendaman penuh dalam air hingga kedalaman 1 meter selama 30 menit. Ini bukan sekadar \'tahan hujan\' atau \'percikan air\' — Anda bisa menaruhnya di tepi kolam renang, membiarkan ombak mengenaiku di pantai, atau secara tidak sengaja jatuh ke dalam bak mandi tanpa panik. Casing fabric dan plastik berkualitas tinggi juga tahan debu penuh (IP67 untuk debu).\n\nFitur PowerBank built-in adalah pembeda nyata Charge 5 dari kompetitor di kelasnya. Menggunakan port USB-A yang disediakan, Charge 5 dapat mengisi daya smartphone Anda saat speaker itu sendiri sedang berputar musik — berguna saat berkemah atau festival musik dimana stop kontak adalah barang langka. Baterai 7.500mAh mendukung penggunaan hingga 20 jam pada volume sedang, dengan pengisian ulang speaker sendiri via USB-C 20W.\n\nJBL PartyBoost memungkinkan pasangan dua unit Charge 5 (atau JBL speaker PartyBoost-compatible lain) menjadi sistem stereo sungguhan dengan pemisahan channel kiri dan kanan yang nyata — tidak hanya suara yang lebih keras, tetapi soundstage yang lebih lebar dan imersif. Connect+ mode memungkinkan lebih dari 100 speaker JBL terhubung untuk instalasi area besar seperti acara outdoor atau ruang pameran.\n\nEQ dapat disesuaikan melalui aplikasi JBL Portable yang tersedia gratis, dengan preset untuk berbagai genre musik. Konektor USB-C untuk pengisian dan kabel audio 3.5mm sebagai fallback analog jika Bluetooth bermasalah. Tersedia dalam banyak warna cerah: Black, Blue, Red, Squad (kamuflase), dan warna edisi khusus musiman. Strap karabiner memudahkan penggantungan di ransel. Garansi 1 tahun resmi dari JBL Indonesia.\n            ', 1599000, 45, 4.6, 0, 'products/kabel.png', '[\"#1e1e1e\", \"#2d5c1a\"]', '[\"Navy Blue\", \"Cardinal Red\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(24, 4, NULL, 'Bose QuietComfort Ultra', 'bose-quietcomfort-ultra', 'Immersive audio headphone, kenyamanan maksimal.', '\nBose QuietComfort Ultra merepresentasikan titik tertinggi yang pernah dicapai Bose dalam perjalanan panjang mereka memenangkan ketenangan bagi para pendengar di seluruh dunia. Lebih dari setengah abad setelah pendiri Bose, Dr. Amar Bose, mulai meneliti noise cancellation, QuietComfort Ultra hadir sebagai kristalisasi semua pembelajaran tersebut dalam sepasang headphone yang menetapkan standar baru industri.\n\nCustomTune — teknologi kalibrasi akustik personal terbaru Bose — aktif bekerja setiap kali Anda memakai headphone. Mikrofon internal mengukur karakteristik akustik unik saluran telinga Anda dalam hitungan detik dan mengkalibrasi profil ANC serta penyampaian audio secara real-time agar sesuai dengan geometri telinga individual Anda. Tidak ada dua telinga yang sama, dan QuietComfort Ultra mengakui fakta ini dengan penyesuaian yang benar-benar dipersonalisasi — sesuatu yang tidak ditawarkan kompetitor.\n\nBose Immersive Audio adalah implementasi Bose terhadap spatial audio yang memanfaatkan chip pemrosesan baru dan data head-tracking dari sensor gyroscope internal. Mode World menciptakan soundstage yang terasa berada di depan Anda seperti speaker stereo sungguhan — bahkan saat headphone meredam dunia luar. Mode Still mempertahankan staging itu meski kepala bergerak, untuk pengalaman bioskop personal yang konsisten. Ini berbeda dari implementasi spatial audio kompetitor yang sering terasa artifisial — Bose Immersive Audio memiliki karakter yang organik dan tidak memaksakan efek.\n\nDesain earcup oval dengan bantalan kain breathable yang lebih tebal dari generasi sebelumnya memberikan kenyamanan pemakaian jangka panjang yang Bose sudah sangat terkenal. Headband dengan bahan sintetis lembut yang terdistribusi tekanannya secara merata memungkinkan pemakaian 4-6 jam tanpa rasa tidak nyaman. Bobot 250 gram seimbang dengan kualitas suara dan isolasi yang dihadirkan.\n\nMode Aware yang ditingkatkan memfilter angin secara cerdas — saat bersepeda atau berlari di luar, Bose QuietComfort Ultra mampu menyampaikan suara sekitar yang berguna (percakapan, klakson) tanpa noise angin yang biasanya mengganggu di kondisi ini. Shortcut fisik untuk berpindah antara QuietComfort (ANC penuh), Aware, dan mode immersive tersedia langsung di earcup.\n\nMultipoint connection ke dua perangkat Bluetooth 5.1 secara bersamaan dengan perpindahan audio yang intelijen — memutuskan audio mana yang diutamakan berdasarkan perangkat mana yang sedang aktif berkomunikasi. Voice assistant natively supported untuk Google Assistant dan Amazon Alexa. Baterai 24 jam dengan ANC aktif, pengisian cepat 15 menit memberikan 2,5 jam playback. Kabel audio 2.5mm ke 3.5mm disertakan untuk penggunaan wired di pesawat. Tersedia dalam Sandstone White dan Black. Garansi global Bose 1 tahun.\n            ', 5800000, 15, 4.9, 0, 'products/handphone.png', '[\"#1e1e1e\", \"#5c3a1a\", \"#1a3a5c\", \"#5c1a1a\"]', '[\"Amber Brown\", \"Onyx Black\", \"Navy Blue\", \"Cardinal Red\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(25, 4, NULL, 'Sennheiser Momentum TW3', 'sennheiser-momentum-tw3', 'Audiophile-grade wireless earbuds, aptX Adaptive.', '\nSennheiser Momentum True Wireless 3 adalah TWS untuk mereka yang tidak mau berkompromi dalam kualitas audio — para audiophile yang ingin menikmati musik dengan integritas penuh bahkan dari earbuds nirkabel. Sennheiser, dengan warisan lebih dari 75 tahun dalam rekayasa akustik dan transducer presisi tinggi, menghadirkan semua keahlian tersebut dalam bentuk earbud kecil yang terlihat jauh dari besar prestasi yang dikandungnya.\n\nDriver 7mm TrueResponse yang dikembangkan dan diproduksi secara in-house oleh Sennheiser (bukan sourcing dari pihak ketiga) adalah inti dari karakter suara yang membedakan Momentum TW3. Respons frekuensi yang extended (5Hz-21.000Hz), distorsi harmonik total (THD) yang sangat rendah, dan sensitivitas tinggi memungkinkan deteksi nuansa mikro dalam rekaman — subtlety yang earbuds biasa lewatkan begitu saja. Bass yang precise dan textured (bukan boom sembarangan), midrange yang kaya untuk vokal, dan treble yang extended namun tidak fatigue untuk pendengaran jangka panjang.\n\nDukungan aptX Adaptive adalah pembeda teknis terbesar Momentum TW3 dari mayoritas TWS premium lain. aptX Adaptive secara dinamis menyesuaikan bitrate antara 276 Kbps hingga 420 Kbps (atau hingga 420 Kbps dalam mode low-latency) berdasarkan kondisi koneksi Bluetooth — memberikan kualitas mendekati lossless saat kondisi RF bersih, dan tetap stabil saat lingkungan penuh interferensi. Untuk perangkat yang mendukung aptX Adaptive (berbagai ponsel Android flagship terkini), perbedaan kualitas dibanding AAC atau SBC sangat terasa pada musik beresolusi tinggi.\n\nHybrid ANC yang digabungkan dengan fitur Transparent Hearing memberikan fleksibilitas yang diperlukan untuk berbagai skenario penggunaan: ANC penuh untuk konsentrasi di ruang ramai, Transparent Mode untuk tetap aware terhadap lingkungan saat berlari, dan tanpa ANC untuk penggunaan dalam ruangan tenang yang menghemat baterai. Adaptive NoiseGard menyesuaikan level ANC secara otomatis berdasarkan kebisingan sekitar yang terdeteksi sensor.\n\nFit detection otomatis menjeda musik saat earbud dikeluarkan dari telinga — detail kecil namun sangat berguna dalam kehidupan sehari-hari. Touch control di permukaan earbud dapat dikonfigurasi melalui Sennheiser Smart Control app yang komprehensif: pilih fungsi untuk single tap, double tap, triple tap, dan hold secara terpisah untuk setiap earbud. Equalizer 5-band yang dapat dikustomisasi, sound profiles yang dapat disimpan, dan pengaturan Transparency level sesuai preferensi tersedia dalam aplikasi.\n\nKasing berkualitas premium dilapisi tekstil yang memberikan kesan berbeda dari plastik glossy kebanyakan TWS. Engsel dan magnet presisi memastikan penutupan yang solid. Baterai 7 jam per earbud + 21 jam tambahan dari kasing (28 jam total) dengan pengisian USB-C. Fit kit dengan tiga ukuran ear tip silicone disertakan. Sertifikasi IPX4 untuk proteksi keringat dan cipratan air. Garansi 2 tahun — lebih panjang dari kebanyakan kompetitor.\n            ', 3999000, 12, 4.7, 1, 'products/handphone.png', '[\"#5c3a1a\", \"#5c1a1a\", \"#2d5c1a\", \"#1e1e1e\"]', '[\"Amber Brown\", \"Onyx Black\", \"Cardinal Red\", \"Forest Green\"]', '[\"products/handphone.png\", \"products/handphone.png\", \"products/handphone.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(26, 4, NULL, 'Marshall Emberton II', 'marshall-emberton-ii', 'Speaker portable ikonik, 30+ jam waktu putar.', '\nMarshall Emberton II adalah speaker yang tidak perlu diperkenalkan kepada siapapun yang pernah melihat amplifier gitar ikonik Marshall berdiri di atas panggung rock legend. Desain yang terinspirasi langsung dari amplifier Marshall — dengan logo emas, knob logam, sudut persegi, dan material fabric hitam — membuat Emberton II bukan sekadar speaker, melainkan pernyataan identitas bagi para pecinta musik.\n\nSuara Marshall selalu identik dengan karakter yang khas: midrange yang warm dan present, bass yang bertenaga namun tidak bloated, dan treble yang detailed tanpa terasa sharp. Tim akustik Marshall merancang Emberton II dengan dua driver full-range yang menghadap berlawanan (left dan right) dan dua passive radiators yang menghadap atas dan bawah, menciptakan efek stereo sungguhan dari sebuah speaker mono — atau lebih tepatnya, soundstage 360 derajat yang terasa melingkupi pendengar dari segala sisi. Ini berbeda dari klaim \'360° sound\' banyak kompetitor yang sebenarnya hanya mono dengan tambahan efek DSP.\n\nKetahanan klem bass yang terasa dalam tubuh adalah kebanggaan Marshall Emberton II — untuk speaker seukurannya (sekitar telapak tangan), ia mampu menghasilkan bass yang terasa secara fisik, bukan hanya terdengar. Ini adalah karakter yang sangat cocok untuk genre rock, electronic, dan hip-hop yang mengandalkan low-end yang kuat. Namun karena karakter mid yang baik, genre seperti jazz, klasik, dan akustik juga terdengar sangat menyenangkan.\n\nBaterai 2600mAh yang menghasilkan playback hingga 30+ jam pada volume sedang adalah salah satu daya tahan terpanjang di kelas speaker compact premium ini. Anda bisa memutar musik sepanjang hari dari pagi hingga malam selama berkemah atau piknik panjang tanpa khawatir. Pengisian via USB-C 5V/2A standard.\n\nRating IPX7 (tahan rendam 1m selama 30 menit) memberikan ketenangan pikiran untuk penggunaan outdoor yang tidak terduga. Bodi fabric tahan air, corner metal yang melindungi sudut dari benturan, dan bobot 700 gram yang kompak menjadikan Emberton II companion outdoor yang ideal. Loop tali di bagian belakang memungkinkan digantung di ransel atau kaitan karabiner.\n\nStack Mode memungkinkan dua unit Emberton II terhubung secara nirkabel untuk suara yang lebih keras — bukan stereo pairing, melainkan amplifikasi power yang berguna untuk area outdoor yang lebih besar. Koneksi Bluetooth 5.1 dengan jangkauan hingga 10m. Tersedia dalam Black and Brass (warna ikonik) dan Cream. Marshall Emberton II adalah salah satu produk audio yang paling memuaskan secara emosional untuk dimiliki dan digunakan setiap hari.\n            ', 2400000, 20, 4.8, 0, 'products/kabel.png', '[\"#1e1e1e\", \"#5c3a1a\", \"#1a3a5c\"]', '[\"Forest Green\", \"Amber Brown\", \"Navy Blue\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(27, 5, NULL, 'Sony Alpha A7 IV', 'sony-alpha-a7-iv', 'Mirrorless Full-frame 33MP, Video 4K 60fps.', '\nSony Alpha A7 IV bukan sekadar pembaruan dari A7 III yang sudah legendaris — ini adalah redefinisi dari apa yang seharusnya menjadi standar kamera hybrid prosumer di era modern. Dengan sensor 33 megapiksel baru, kemampuan video 4K 60p yang sebelumnya eksklusif kelas di atasnya, dan sistem autofokus AI generasi terbaru, A7 IV memposisikan dirinya sebagai kamera yang tumbuh bersama karir pemotretnya.\n\nSensor BSI CMOS 33 megapiksel full-frame generasi baru menghadirkan resolusi yang cukup untuk crop agresif dalam pasca-produksi tanpa kehilangan detail, print berskala besar tanpa pixelation, dan file RAW yang kaya detail untuk grading warna yang ekstensif. Dynamic range yang diklaim 15 stop memastikan highlight dan shadow tetap terjaga bahkan dalam kondisi kontras ekstrem — backlit portrait, golden hour yang overexposed, atau interior gelap dengan jendela terang di belakang.\n\nReal-time Tracking dan Real-time Eye AF (untuk manusia dan hewan) menggunakan neural network processing dalam chip BIONZ XR — Sony mengklaim 8x peningkatan pemrosesan dibanding BIONZ X pada A7 III. Dalam praktiknya, AF A7 IV mampu mengunci mata dalam kondisi yang sebelumnya mustahil: wajah yang sebagian tertutup, mata yang tertutup sebentar, gerakan cepat. Untuk fotografer aksi, wildlife, dan pernikahan, kemampuan ini secara fundamental mengubah rasio foto yang berhasil vs. yang missed focus.\n\nVideo 4K 60p dengan full pixel readout (tanpa crop) menggunakan oversampling dari resolusi lebih tinggi untuk ketajaman detail yang superior. Super 35mm mode pada video memberikan 4K 120p untuk slow motion yang dramatis. Log profile (S-Log 3 dan S-Cinetone) memberikan fleksibilitas color grading maksimal. Rekaman internal 10-bit 4:2:2 via XAVC HS format memberikan color depth yang hampir setara dengan kamera cinema.\n\nBody A7 IV mengadopsi desain bodi yang diperbesar dari A7S III dengan grip yang lebih dalam dan lebih nyaman — perubahan yang disambut sangat positif oleh fotografer dengan tangan lebih besar. Joystick untuk kontrol AF point langsung dengan ibu jari kanan, desain dial yang lebih intuitif, dan tombol customizable yang berlimpah (11 tombol dapat diprogram) memberikan workflow yang dapat disesuaikan sepenuhnya.\n\nDual card slot (CFexpress Type A + SD UHS-II) memungkinkan strategi backup atau overflow yang fleksibel. Buffer shot yang dalam memastikan burst 10 fps tidak terhenti prematur saat shooting sequence panjang. WiFi 5GHz dan Bluetooth 5.0 untuk transfer image wireless yang cepat ke smartphone atau FTP langsung ke workstation. USB-C 3.2 Gen 2 untuk charging dan data transfer. Baterai NP-FZ100 yang kompatibel dengan A7 III memberikan sekitar 520 shot per charge. Weather sealing kelas professional. A7 IV adalah kamera yang tidak akan membatasi Anda bahkan saat karir Anda berkembang ke level lebih tinggi.\n            ', 39999000, 6, 4.9, 0, 'products/laptop.png', '[\"#1a3a5c\", \"#1e1e1e\", \"#5c1a1a\"]', '[\"Cardinal Red\", \"Amber Brown\", \"Onyx Black\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(28, 5, NULL, 'DJI Pocket 3', 'dji-pocket-3', 'Gimbal mini sensor 1 inch, ActiveTrack 6.0.', '\nDJI Pocket 3 menghapus semua alasan untuk tidak merekam video berkualitas tinggi dalam kehidupan sehari-hari. Ketika kamera mirrorless terlalu besar dan kamera smartphone terlalu terbatas, DJI Pocket 3 hadir di celah tersebut dengan proposisi yang meyakinkan: sensor 1 inci yang lebih besar dari kebanyakan smartphone, gimbal 3-axis yang menjamin stabilisasi sempurna, dan ukuran yang benar-benar muat di saku kemeja.\n\nSensor CMOS 1 inci dengan 20 megapiksel adalah lompatan signifikan dari sensor 1/1.7 inci di Pocket 2 sebelumnya. Sensor lebih besar menangkap lebih banyak cahaya — secara langsung berarti low-light performance yang dramatik lebih baik. Video 4K@120fps dengan large sensor ini menghasilkan slow-motion yang detail dan bersih bahkan dalam kondisi indoor dengan pencahayaan moderat. Apertur f/2.0 yang lebar memungkinkan depth of field yang estetis dengan background yang blur secara natural, memberikan \'look\' sinematik yang selama ini hanya bisa didapat dari kamera besar.\n\nGimbal 3-axis DJI yang sudah legendaris handal menstabilkan footage secara mekanis — bukan digital. Ini berbeda fundamental dari EIS (Electronic Image Stabilization) yang memotong sebagian frame. Gimbal mekanis menghilangkan guncangan tanpa cropping, tanpa warping, dan tanpa lag. Mode ActiveTrack 3.0 mengunci subjek dan mengikutinya secara otomatis — sempurna untuk vlogging solo atau merekam aktivitas tanpa cameraman.\n\nLayar putar 2 inci (dari Pocket 2 yang 1.4 inci) adalah upgrade yang sangat terasa dalam penggunaan sehari-hari. Layar yang cukup besar untuk melihat komposisi dengan jelas bahkan di bawah cahaya matahari, dan dapat diputar untuk pengambilan video vertikal yang sempurna untuk konten Instagram Reels atau TikTok. Mode Vertical membingkai 9:16 secara native tanpa perlu crop atau rekomposisi pasca-rekam.\n\nMikrofon stereo built-in yang ditingkatkan menangkap audio dengan kualitas yang memuaskan untuk vlog dan video casual. Slot cold shoe memungkinkan penambahan mikrofol eksternal atau light LED untuk produksi yang lebih serius. DJI Mic Wireless (dijual terpisah) dapat dipasangkan langsung tanpa adapter untuk audio lapel wireless yang sangat mudah digunakan.\n\nKonektivitas dengan smartphone via USB-C memberikan akses ke kamera tambahan smartphone (untuk angle berbeda) atau sebagai layar monitoring yang lebih besar. DJI Mimo app memperluas kontrol: kustomisasi quick controls, akses ke filter warna yang terinspirasi sinematografi, dan tools edit video basic langsung di smartphone. Baterai 1.300mAh didukung fast charging 30W dan bertahan sekitar 70 menit perekaman aktif. Aksesori DJI yang luas — case, mini tripod, stick extension, microphone — melengkapi ekosistem Pocket 3.\n            ', 7499000, 20, 4.7, 1, 'products/laptop.png', '[\"#5c3a1a\", \"#2d5c1a\", \"#1a3a5c\", \"#1e1e1e\"]', '[\"Onyx Black\", \"Forest Green\", \"Cardinal Red\", \"Amber Brown\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(29, 5, NULL, 'Fujifilm X-T5', 'fujifilm-x-t5', 'Kamera APS-C 40MP, desain retro, video 6K.', '\nFujifilm X-T5 adalah kamera untuk fotografer yang jatuh cinta pada proses fotografi itu sendiri — bukan hanya hasilnya. Dengan dial eksposur fisik yang berlapis-lapis di atas bodi magnesium yang kompak, X-T5 mengembalikan kontrol langsung dan intuitif ke tangan fotografer, jauh dari filosofi menu digital yang mendominasi kamera modern lainnya.\n\nSensor X-Trans CMOS 5 HR 40.2 megapiksel adalah sensor APS-C beresolusi tertinggi yang pernah ada dalam sejarah fotografi digital — melampaui bahkan beberapa kamera full-frame yang harganya dua kali lipat. Resolusi ini memungkinkan crop sangat agresif untuk komposisi ulang pasca-pengambilan, cetak ukuran sangat besar untuk pameran, dan detail yang mengejutkan dalam foto lanskap atau arsitektur. Tanpa Low Pass Filter (anti-aliasing), setiap detail yang ditangkap lensa direproduksi tanpa pengeluaran resolusi.\n\nFilm Simulation adalah jiwa dari Fujifilm — dan X-T5 hadir dengan 20 mode simulasi film, termasuk tambahan terbaru: Reala Ace (simulasi film Fujicolor Reala yang dikenal untuk skin tone alami dan color rendition yang subtle), dan Nostalgic Neg yang menghadirkan warna pastel vintage khas film negatif era 70-80an. Bagi fotografer yang ingin minimal editing, JPEG langsung dari X-T5 dengan Film Simulation yang tepat sudah siap dipublikasikan — tidak perlu post-processing berjam-jam.\n\nBodi magnesium alloy yang weather-sealed di 79 titik mampu beroperasi hingga suhu -10°C — sangat cocok untuk fotografi pegunungan, pantai dalam cuaca buruk, atau event outdoor tanpa kompromi keamanan kamera. Dibandingkan X-T4 yang lebih besar, X-T5 mengecil secara signifikan: 25% lebih ringan dan 20% lebih tipis. Ini adalah kamera profesional yang bisa dimasukkan ke jaket.\n\nIBIS (In-Body Image Stabilization) 7-stop yang ditingkatkan dari X-T4 memungkinkan exposure panjang handheld yang sebelumnya memerlukan tripod. Fotografer street bisa memotret dalam kondisi cahaya redup dengan shutter speed rendah tanpa blur. Pixel Shift Multi-Shot menggabungkan 20 frame untuk menghasilkan gambar 160 megapiksel untuk penggunaan studio yang membutuhkan resolusi ultra-tinggi.\n\nVideo 6.2K 30p dan 4K 60p (dengan beberapa crop) memberikan kemampuan video yang solid meski X-T5 secara filosofis adalah kamera foto. F-Log2 profile memberikan dynamic range rekaman hingga 13+ stop untuk color grading fleksibel. Layar belakang 3 inci yang dapat dimiringkan (bukan fully articulating seperti X-T4 — pilihan yang disengaja untuk menjaga desain purist). EVF 0.5 inci 3.69 juta dot dengan magnifikasi 0.8x untuk framing akurat. AF hybrid Phase Detection + Contrast yang sangat responsif. X-T5 adalah kamera yang semakin Anda gunakan, semakin Anda menyukainya.\n            ', 26500000, 9, 4.8, 0, 'products/laptop.png', '[\"#1e1e1e\", \"#5c1a1a\", \"#1a3a5c\"]', '[\"Amber Brown\", \"Cardinal Red\", \"Forest Green\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(30, 5, NULL, 'GoPro Hero 12 Black', 'gopro-hero-12-black', 'Action cam tangguh, stabilisasi HyperSmooth 6.0.', '\nGoPro Hero 12 Black adalah action cam yang telah melewati 12 generasi penyempurnaan untuk menjadi yang terbaik dalam kategorinya — sebuah perangkat yang cukup kuat untuk konten kreator profesional, cukup mudah untuk pemula, dan cukup tangguh untuk bertahan dari perlakuan paling kasar yang bisa dibayangkan.\n\nHyperSmooth 6.0 adalah sistem stabilisasi yang menjadi benchmark industri — bukan hanya dalam kategori action cam, tetapi dibandingkan dengan banyak gimbal fisik pula. Horizon Lock memastikan garis horizon tetap lurus meski kamera berputar 360 derajat (dalam mode tertentu). Horizon Lock juga kompatibel dengan lensa Modular seperti Max Lens Mod 2.0 yang menghadirkan stabilisasi bahkan lebih agresif. Hasilnya adalah footage yang tampak seolah direkam dengan gimbal profesional meski kamera hanya diikat di helm atau dada.\n\nResolusi video hingga 5.3K 60fps (dengan video 4K@120fps untuk slow-motion) dan foto 27MP menghasilkan konten yang lebih dari cukup untuk post-cropping, stabilisasi pasca-rekam, dan output apapun dari media sosial hingga layar bioskop. Codec H.265 (HEVC) mengkompres file lebih efisien tanpa mengorbankan kualitas — ukuran file yang lebih kecil untuk kualitas yang sama atau kualitas lebih baik untuk ukuran yang sama.\n\nTahan air tanpa casing hingga kedalaman 10 meter — langsung dari kotak, tanpa aksesori tambahan. Ini berarti Hero 12 Black siap untuk selancar, menyelam snorkeling, kayak, atau aktivitas air lainnya tanpa persiapan khusus. Bodi yang sangat kompak (71x55x34mm) dan bobot hanya 154 gram (tanpa casing) tidak terasa mengganggu bahkan saat dipakai di helm sepeda atau papan dada lari.\n\nKoneksi Bluetooth audio adalah fitur baru yang sangat ditunggu oleh kreator konten: Hero 12 Black kini dapat terhubung langsung ke mikrofon nirkabel Bluetooth kompatibel (termasuk GoPro mic series baru) tanpa adapter fisik yang mencuat. Ini membuat setup lebih bersih dan lebih kecil. Audio internal yang sudah meningkat signifikan dari generasi sebelumnya memberikan kualitas suara yang cukup memuaskan untuk vlog casual.\n\nLayar sentuh belakang 2.27 inci dan layar depan 1.4 inci untuk selfie dan monitoring composisi. Baterai Enduro (tersedia sebagai upgrade) memberikan daya tahan yang lebih baik dalam suhu dingin ekstrem. Pengisian via USB-C dengan kemampuan merekam sambil mengisi daya untuk setup live streaming. Ekosistem aksesori GoPro yang luas — mount helm, chest harness, bike mount, underwater lighting, extension poles — menjadikan Hero 12 Black kompatibel dengan hampir semua aktivitas yang bisa Anda bayangkan.\n            ', 6499000, 30, 4.6, 1, 'products/laptop.png', '[\"#2d5c1a\", \"#1a3a5c\", \"#5c1a1a\", \"#1e1e1e\"]', '[\"Cardinal Red\", \"Amber Brown\", \"Navy Blue\", \"Forest Green\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:51', '2026-05-27 21:26:51');
INSERT INTO `produk` (`id`, `kategori_id`, `brand_id`, `nama`, `slug`, `deskripsi`, `deskripsi_detail`, `harga`, `stok`, `rating`, `adalah_promo`, `gambar`, `colors`, `color_labels`, `images`, `specs`, `reviews`, `dibuat_pada`, `diperbarui_pada`) VALUES
(31, 5, NULL, 'Canon EOS R6 Mark II', 'canon-eos-r6-mark-ii', 'Kamera hybrid cepat, 40fps burst shooting.', '\nCanon EOS R6 Mark II adalah kamera yang seolah dibuat dengan mendengarkan setiap keluhan dan setiap permintaan dari pengguna R6 original — kemudian mengimplementasikannya semua sekaligus. Hasilnya adalah kamera hybrid yang tidak hanya meningkat, tetapi melompat ke level yang berbeda dalam hampir setiap aspek yang penting.\n\n40 fps burst rate dalam mode electronic shutter (12 fps mechanical) menjadikan R6 Mark II salah satu kamera produksi serial tercepat yang pernah ada. Bagi fotografer wildlife, aksi olahraga, atau momen decisif dalam fotografi jurnalistik, burst rate ini memberikan jaminan bahwa momen puncak — gerakan tertentu satwa, ekspresi wajah yang sempurna, puncak lompatan atlet — pasti tertangkap. Buffer yang cukup dalam memungkinkan burst berkelanjutan tanpa jeda menunggu yang frustrasi.\n\nSensor CMOS 24.2MP full-frame tanpa anti-aliasing filter mengoptimalkan keseimbangan antara resolusi yang cukup untuk cropping fleksibel dan kecepatan pemrosesan yang diperlukan untuk burst 40fps. Processor DIGIC X generasi terbaru mengolah data dari sensor dengan kecepatan yang memungkinkan AF tracking kompleks pada 40fps — sesuatu yang secara teknis sangat menantang.\n\nSistem Dual Pixel CMOS AF II Canon adalah salah satu sistem AF paling reliabel dan versatil yang ada. Eye Detection untuk manusia bekerja dari jarak yang mengesankan dan dalam kondisi pencahayaan yang sangat minim. Animal AF mendeteksi mata, wajah, dan seluruh tubuh berbagai hewan dari anjing dan kucing hingga burung yang terbang — termasuk mata burung yang kecil. Vehicle AF mengunci mobil balap dan pesawat dalam kecepatan tinggi. Deep Learning AF yang terus diperbarui melalui firmware menjadikan kamera ini semakin baik seiring waktu.\n\nVideo 4K 60p dengan full-frame readout (tanpa crop) menggunakan oversampling dari 6K untuk ketajaman yang superior. 4K 30p dari area full-frame dengan kecepatan dual card recording (CFexpress Type B + SD UHS-II) untuk redundancy. Canon Log 3 dan 10-bit 4:2:2 internal untuk color grading yang luas. Waveform monitor, false color, dan zebras langsung di viewfinder untuk monitoring eksposur akurat tanpa monitor eksternal. Overheating yang menjadi masalah pada R6 original sudah teratasi secara substansial — perekaman tanpa batas pada 4K 60p kini dimungkinkan dengan pendinginan yang tepat.\n\nIBIS 8-stop yang dikombinasikan dengan IS lensa (Coordinated IS) memberikan stabilisasi yang memungkinkan handheld shooting dalam kondisi yang sebelumnya tidak mungkin. Weather sealing yang ditingkatkan setara dengan 1-series Canon untuk perlindungan dari elemen. Baterai LP-E6NH yang kompatibel dengan LP-E6N memberikan fleksibilitas dan kemampuan berbagi baterai dengan berbagai kamera Canon lainnya. R6 Mark II adalah pilihan teratas untuk fotografer dan videografer yang membutuhkan versatilitas sejati dalam satu bodi.\n            ', 36000000, 5, 4.9, 0, 'products/laptop.png', '[\"#5c3a1a\", \"#1e1e1e\"]', '[\"Onyx Black\", \"Cardinal Red\"]', '[\"products/laptop.png\", \"products/laptop.png\", \"products/laptop.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(32, 6, NULL, 'Xiaomi Mi Smart Air Purifier 4', 'xiaomi-mi-smart-air-purifier-4', 'Pembersih udara dengan filter HEPA, kontrol via App.', '\nXiaomi Mi Smart Air Purifier 4 menjawab kebutuhan yang semakin mendesak di perkotaan modern: udara dalam ruangan yang benar-benar bersih dan termonitor secara berkelanjutan. Di tengah meningkatnya polusi udara, alergen, dan perhatian terhadap kualitas udara pasca-pandemi, memiliki purifier yang cerdas bukan lagi kemewahan — ini adalah kebutuhan kesehatan.\n\nFilter 3-layer H13 True HEPA (High Efficiency Particulate Air) adalah inti dari kemampuan pembersihan Mi Air Purifier 4. Layer pertama adalah pre-filter untuk partikel besar seperti debu, bulu hewan, dan rambut. Layer kedua adalah HEPA H13 yang mampu menangkap 99,97% partikel berukuran 0,3 mikron — termasuk PM2.5, serbuk sari, tungau debu, bakteri, dan bahkan sebagian besar virus. Layer ketiga adalah activated carbon filter yang mengabsorb gas berbahaya, VOC (Volatile Organic Compounds), formaldehida, dan bau tidak sedap.\n\nCoverage area efektif hingga 48 m² dalam satu jam (CADR 400m³/jam) menjadikan Mi Air Purifier 4 cocok untuk ruang tamu, kamar tidur besar, atau ruang kerja berukuran sedang. Ini berarti volume udara seluruh ruangan dapat disirkulasikan dan disaring secara efektif dalam interval yang singkat, menjaga kualitas udara konsisten sepanjang hari.\n\nSensor PM2.5 laser precision built-in mengukur konsentrasi partikel udara secara real-time setiap detik dan menampilkan indeks kualitas udara (AQI) langsung pada LED display depan. Warna indikator berubah dari hijau (udara bersih) ke kuning (moderat) ke merah (tidak sehat) secara visual yang mudah dipahami sekilas tanpa harus membuka aplikasi. Sensor suhu dan kelembaban juga terintegrasi untuk monitoring kondisi ruangan yang komprehensif.\n\nKonektivitas WiFi dengan aplikasi Mi Home (atau Xiaomi Home) memungkinkan kontrol penuh dari jarak jauh melalui smartphone — nyalakan purifier dari tempat kerja agar rumah sudah bersih saat Anda tiba, atau jadwalkan otomatisasi berdasarkan waktu. Integrasi dengan Google Assistant, Amazon Alexa, dan Apple HomeKit memungkinkan kontrol suara. Mode otomatis menyesuaikan kecepatan kipas secara dinamis berdasarkan bacaan sensor PM2.5 real-time — lebih efisien dari timer manual.\n\nTingkat kebisingan serendah 34 dB(A) pada kecepatan minimum menjadikannya hampir tidak terdengar saat digunakan di kamar tidur — Anda bisa menjalankannya sepanjang malam tanpa gangguan tidur. Filter memiliki umur pakai sekitar 12 bulan pada kondisi penggunaan normal (berbeda tergantung kualitas udara lingkungan), dan mudah diganti oleh pengguna sendiri tanpa perlu teknisi. Desain silinder putih yang bersih dan minimalis cocok dengan berbagai interior modern.\n            ', 2200000, 25, 4.7, 1, 'products/monitor.png', '[\"#2d5c1a\", \"#1e1e1e\"]', '[\"Navy Blue\", \"Cardinal Red\"]', '[\"products/monitor.png\", \"products/monitor.png\", \"products/monitor.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(33, 6, NULL, 'Roborock S8 Robot Vacuum', 'roborock-s8-robot-vacuum', 'Robot pembersih dengan daya hisap 6000Pa.', '\nRoborock S8 adalah robot vacuum yang secara serius bersaing dengan membersihkan sendiri menggunakan pel tangan dan sapu. Bukan karena ia sempurna dalam setiap aspek, tetapi karena ia menggabungkan vakum bertenaga tinggi dan sistem pengepelan aktif dalam satu perangkat yang benar-benar cerdas dalam menavigasi dan membersihkan rumah Anda secara otonom.\n\nDaya hisap 6.000 Pa menjadikan S8 sebagai salah satu robot vacuum terkuat di kelasnya untuk konsumen. Angka ini bukan sekadar spesifikasi marketing — dalam praktiknya, daya hisap ini mampu mengangkat pasir halus yang terperangkap dalam serat karpet tebal, kotoran hewan peliharaan yang menempel, dan debu yang terakumulasi di celah-celah. Brush roll utama DuoRoller (dua brush counter-rotating) mencegah rambut terlilit seperti yang terjadi pada single brush konvensional — masalah yang selama ini menjadi bane para pengguna robot vacuum di rumah dengan anggota keluarga berambut panjang atau hewan berbulu.\n\nSistem VibraRise adalah inovasi yang benar-benar membedakan S8 dari kompetitor: kain pel yang bergetar 3.000 kali per menit (bukan hanya menyeret kain basah seperti sistem drag mop biasa) secara aktif menggosok lantai untuk mengangkat noda membandel seperti tumpahan kopi yang sudah mengering atau bekas jejak sepatu. Yang lebih cerdas lagi, VibraRise secara otomatis mengangkat kain pel saat mendeteksi karpet — sehingga karpet Anda tidak ikut dibasahi. Sensor karpet bekerja dengan sangat akurat bahkan untuk karpet tipis.\n\nNavigasi PreciSense LiDAR menggunakan laser Time-of-Flight untuk memetakan seluruh rumah dengan akurasi milimeter, menciptakan peta virtual yang sangat detail. Multi-floor mapping menyimpan peta hingga 4 lantai yang berbeda, secara otomatis mengenali lantai mana yang sedang dibersihkan. Obstacle avoidance berbasis AI mengidentifikasi dan menghindari kabel, sepatu, mainan, dan bahkan kotoran hewan peliharaan di lantai — objek yang dulu menyebabkan robot tersangkut atau salah bersih.\n\nRoborock app memberikan kontrol granular yang tidak ada tandingannya: gambar peta interaktif yang menunjukkan posisi robot real-time, pembagian zona pembersihan (ruang tamu, kamar, dapur) masing-masing dengan pengaturan berbeda, jadwal otomatis per hari per zona, dan riwayat pembersihan yang menampilkan area mana yang dilalui dan seberapa sering. Integrasi dengan Google Home, Alexa, dan Apple Siri untuk kontrol suara.\n\nDocking station dengan auto-empty (dalam varian tertentu) mengumpulkan debu dari dustbin robot ke kantong berkapasitas besar yang hanya perlu dikosongkan setiap 7-10 kali sesi pembersihan — meminimalkan kontak manual dengan debu yang dapat memicu alergi. Dustbin robot 350ml yang mudah dilepas dan dicuci. Baterai 5.200mAh dengan pengisian otomatis dan resume cleaning — robot kembali mengisi daya jika hampir habis dan melanjutkan pembersihan dari posisi terakhir secara otomatis.\n            ', 8900000, 10, 4.8, 0, 'products/monitor.png', '[\"#5c3a1a\", \"#5c1a1a\"]', '[\"Cardinal Red\", \"Onyx Black\"]', '[\"products/monitor.png\", \"products/monitor.png\", \"products/monitor.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(34, 6, NULL, 'Philips Hue Bridge', 'philips-hue-bridge', 'Otak dari sistem pencahayaan pintar Philips Hue.', '\nPhilips Hue Bridge adalah otak dari salah satu ekosistem smart lighting paling matang dan terpercaya yang tersedia saat ini. Kotak kecil berbentuk cakram putih ini mungkin terlihat sederhana, namun ia menjadi fondasi yang memungkinkan rumah Anda berubah menjadi lingkungan cahaya yang benar-benar cerdas, responsif, dan terpersonalisasi.\n\nBridge menghubungkan lampu-lampu Philips Hue via protokol Zigbee — protokol mesh networking yang dirancang khusus untuk perangkat IoT rumahan. Zigbee beroperasi pada frekuensi 2.4GHz yang berbeda dari WiFi biasa, menghindari interferensi dan menyediakan jaringan yang dedicated hanya untuk lampu. Setiap lampu Hue yang terhubung juga berfungsi sebagai node yang memperluas jangkauan jaringan Zigbee, menciptakan mesh yang semakin kuat seiring bertambahnya lampu dalam ekosistem.\n\nKapasitas hingga 50 lampu dan aksesori pintar dalam satu Bridge memberikan skala yang cukup untuk rumah besar sekalipun. Lampu, dimmer switch, motion sensor, gradient lightstrip, outdoor sensor, dan berbagai aksesori Hue semuanya dikelola dari satu titik kontrol terpadu melalui aplikasi Philips Hue yang sangat lengkap fiturnya. Aplikasi memungkinkan pembuatan scene (kombinasi warna dan intensitas untuk semua lampu sekaligus), jadwal otomatis, dan rutinitas berbasis waktu matahari (sunrise/sunset lokal yang dihitung secara presisi).\n\nPhilips Hue Entertainment adalah fitur yang mengubah cara menikmati media. Sinkronisasi lampu dengan film via Hue Sync (untuk PC/Mac atau Apple TV dengan box sync) menciptakan ambient lighting yang mengikuti warna dan mood konten secara real-time — layar yang menampilkan adegan biru laut akan membuat lampu seisi ruangan menjadi biru, scene aksi akan membuat lampu berkedip mengikuti ledakan. Ini bukan efek sederhana — ada pemrosesan video real-time yang menganalisis rata-rata warna per zona layar dan memetakannya ke lampu yang posisinya sesuai di ruangan.\n\nKompatibilitas dengan semua asisten suara utama (Amazon Alexa, Google Assistant, Apple Siri via HomeKit) dan platform smart home terkemuka (SmartThings, IFTTT, Matter, Thread) menjadikan Hue Bridge pusat yang kompatibel dengan ekosistem apapun yang Anda pilih. Matter dan Thread (yang sudah didukung via update firmware) memastikan kompatibilitas jangka panjang dengan standar smart home generasi berikutnya.\n\nKoneksi via Ethernet ke router memastikan stabilitas koneksi yang lebih reliable dibanding WiFi langsung. API yang didokumentasikan dengan baik memungkinkan developer dan pengguna teknis membuat automasi custom dan integrasi pihak ketiga yang tak terbatas. Update firmware otomatis menjaga Bridge selalu dengan fitur terbaru dan patch keamanan.\n            ', 950000, 40, 4.5, 0, 'products/monitor.png', '[\"#5c1a1a\", \"#5c3a1a\", \"#1e1e1e\"]', '[\"Navy Blue\", \"Cardinal Red\", \"Amber Brown\"]', '[\"products/monitor.png\", \"products/monitor.png\", \"products/monitor.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(35, 6, NULL, 'Bardi Smart Light Bulb 12W', 'bardi-smart-light-bulb-12w', 'Lampu RGB pintar dengan jutaan warna, support Google Home.', '\nBardi Smart Light Bulb 12W adalah titik masuk yang sempurna ke dunia smart home yang sesungguhnya — tanpa kerumitan berlebih, tanpa biaya yang besar, dan tanpa keharusan mengganti seluruh instalasi lampu rumah Anda. Cukup ganti bola lampu lama dengan Bardi, dan ruangan Anda langsung bertransformasi menjadi bagian dari rumah yang cerdas.\n\nFitting E27 standar memastikan kompatibilitas dengan hampir semua lampu yang ada di rumah Indonesia — tidak perlu membeli fixture baru atau memanggil tukang listrik. Daya 12W yang efisien menggunakan teknologi LED menghasilkan luminansi setara lampu pijar 75W konvensional, menghemat hingga 85% biaya listrik untuk pencahayaan. Umur pakai LED yang diklaim lebih dari 20.000 jam berarti Anda tidak perlu mengganti lampu selama bertahun-tahun.\n\nPalet warna RGB + White yang mencakup 16 juta warna memungkinkan personalisasi pencahayaan yang benar-benar bebas. Lebih dari sekadar merah-hijau-biru yang mencolok untuk ambiance gaming — Bardi Smart Bulb juga mampu menghasilkan white tunable yang hangat dari 2.700K (cahaya warm white seperti lampu pijar, cocok untuk malam hari yang relaks) hingga 6.500K (daylight putih terang, ideal untuk kerja atau membaca). Penyesuaian color temperature ini jauh lebih berguna dalam kehidupan sehari-hari dibanding efek RGB yang terang.\n\nAplikasi Bardi Smart Home yang tersedia di Android dan iOS memberikan kontrol lengkap dan intuitif: nyalakan/matikan, atur kecerahan 1-100%, pilih warna dari color wheel, buat jadwal otomatis (misalnya, lampu menyala 10 menit sebelum alarm pagi untuk bangun lebih nyaman), dan buat scene (kombinasi setting untuk semua lampu Bardi di rumah dengan sekali tap). Kontrol dari mana saja via internet — pastikan lampu mati sebelum tidur meski sudah di kasur, atau nyalakan lampu dari kantor agar rumah tampak berpenghuni.\n\nKompatibilitas dengan Google Assistant dan Amazon Alexa memungkinkan kontrol suara natural: \'Hey Google, matikan lampu kamar tidur\', \'Alexa, set lampu ruang tamu ke 50 persen dan warna kuning\'. Tidak perlu hub tambahan — Bardi terhubung langsung ke WiFi 2.4GHz rumah Anda, menyederhanakan setup secara signifikan dibanding sistem yang memerlukan bridge terpisah.\n\nMode Sinkronisasi Musik (Music Sync) menggunakan mikrofon smartphone untuk mendeteksi ritme musik dan mengubah warna lampu secara sinkron — fitur yang sangat populer untuk pesta atau sesi gaming. Mode Sleep Timer mematikan lampu secara perlahan dalam durasi yang Anda tentukan, membantu ritual tidur yang lebih natural. Bardi Smart Bulb 12W adalah cara paling ekonomis dan termudah untuk memulai perjalanan smart home yang sesungguhnya.\n            ', 125000, 150, 4.6, 1, 'products/monitor.png', '[\"#1e1e1e\", \"#2d5c1a\", \"#5c3a1a\", \"#5c1a1a\"]', '[\"Onyx Black\", \"Forest Green\", \"Cardinal Red\", \"Amber Brown\"]', '[\"products/monitor.png\", \"products/monitor.png\", \"products/monitor.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(36, 6, NULL, 'Ecobee Smart Thermostat', 'ecobee-smart-thermostat', 'Pengatur suhu ruangan pintar penghemat energi.', '\nEcobee Smart Thermostat Premium hadir dengan filosofi bahwa kenyamanan dan efisiensi energi bukan pilihan yang saling mengorbankan — melainkan dua hal yang bisa dicapai bersamaan dengan teknologi yang tepat. Sebagai salah satu termostat pintar paling canggih di pasar, Ecobee menggabungkan hardware premium dengan algoritma cerdas untuk mewujudkan filosofi tersebut.\n\nSistem SmartSensor adalah keunggulan kompetitif utama Ecobee. Sensor suhu dan occupancy tambahan (satu disertakan dalam paket Premium) dapat ditempatkan di ruangan berbeda untuk mengukur suhu dan mendeteksi keberadaan orang secara individual. Ini mengatasi masalah fundamental termostat biasa: termostat yang dipasang di lorong tidak tahu bahwa kamar tidur utama 3 derajat lebih panas, atau bahwa ruang tamu yang kosong sudah mencapai suhu nyaman sementara dapur masih kepanasan. Ecobee menggunakan data dari semua sensor untuk mengkondisikan ruangan yang benar-benar ditempati orang.\n\nSmart Home/Away secara otomatis mendeteksi kapan semua penghuni meninggalkan rumah dan beralih ke mode hemat energi tanpa intervensi manual. Menggunakan occupancy sensor dan geofencing via smartphone untuk memprediksi kapan penghuni akan kembali dan mulai mengkondisikan rumah tepat sebelum kedatangan — tidak ada lagi pulang ke rumah yang terlalu panas atau terlalu dingin. Follow Me memfokuskan kenyamanan di ruangan yang sedang ditempati orang daripada menyeragamkan seluruh rumah.\n\nKompatibilitas yang luas mencakup mayoritas sistem HVAC yang umum digunakan — termasuk heat pump, sistem multi-stage, dan bahkan beberapa konfigurasi radiant heating. Proses setup dipandu dengan sangat jelas melalui layar besar 3,5 inci di unit atau via aplikasi, dengan diagram wiring yang mencocokkan konfigurasi sistem spesifik Anda. Dukungan teknis via chat langsung tersedia untuk instalasi yang lebih kompleks.\n\nIntegrasi ekosistem yang paling luas dari termostat manapun: Apple HomeKit (satu-satunya termostat yang kompatibel penuh), Amazon Alexa built-in (speaker dan mikrofon terintegrasi di unit fisik — bisa digunakan sebagai Echo sekaligus), Google Assistant, Samsung SmartThings, IFTTT, dan berbagai platform otomasi rumah pihak ketiga. Kompatibilitas Matter generasi mendatang sudah diumumkan melalui update firmware.\n\nLaporan energi bulanan yang detail menampilkan konsumsi HVAC dan perbandingan dengan bulan sebelumnya serta rata-rata regional — data yang berguna untuk memantau efisiensi dan mengidentifikasi anomali penggunaan. Home IQ analytics memberikan rekomendasi spesifik untuk menghemat energi lebih lanjut berdasarkan pola penggunaan. Ecobee mengklaim penghematan rata-rata 26% pada tagihan pemanas dan 15% pada tagihan AC dibanding termostat konvensional — penghematan yang secara kumulatif menutupi biaya investasi dalam beberapa bulan.\n            ', 3200000, 8, 4.4, 0, 'products/monitor.png', '[\"#5c1a1a\", \"#2d5c1a\"]', '[\"Amber Brown\", \"Forest Green\"]', '[\"products/monitor.png\", \"products/monitor.png\", \"products/monitor.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(37, 7, NULL, 'PlayStation 5 Slim', 'playstation-5-slim', 'Konsol gaming Sony SSD 825GB, 4K gaming.', '\nPlayStation 5 Slim adalah PlayStation 5 yang akhirnya sempurna untuk dipajang di ruang tamu tanpa mendominasi seluruh ruang. Dengan desain yang 30% lebih ramping dan bobot yang berkurang signifikan dari PS5 original yang besar dan berat, PS5 Slim menghadirkan semua keunggulan generasi PS5 dalam form factor yang jauh lebih elegan dan praktis.\n\nSSD custom NVMe PCIe Gen 4 berkapasitas 1TB dengan bandwidth mencapai 5.5 GB/s mengubah cara game dimuat. Gim-gim yang dirancang untuk PS5 seperti Ratchet and Clank: Rift Apart, Demon\'s Souls Remake, dan Marvel\'s Spider-Man 2 memanfaatkan kecepatan ini untuk menghilangkan loading screen konvensional sepenuhnya — perpindahan antar dunia dalam Rrift Apart terjadi dalam hitungan detik atau bahkan realtime. Ini bukan sekadar iterasi dari PS4 Pro — ini adalah arsitektur penyimpanan yang fundamental berbeda yang mengubah desain game itu sendiri.\n\nGPU custom RDNA 2 dari AMD dengan 10.28 teraflop mampu merender game 4K native 60fps dengan ray tracing yang aktif secara bersamaan — sesuatu yang jarang mungkin dilakukan di PC dengan harga yang setara. DualSense controller generasi berikutnya dengan haptic feedback yang presisi (berbeda dari rumble konvensional — dapat mensimulasikan sensasi permukaan berbeda, tekanan air, atau bahkan detak jantung karakter) dan Adaptive Triggers yang memberikan resistansi fisik berbeda untuk aksi berbeda dalam game adalah game changer yang membuat pengalaman bermain jauh lebih imersif secara fisik.\n\nTempest 3D AudioTech adalah implementasi audio spasial Sony yang memproses suara untuk headphone (atau speaker yang kompatibel) menciptakan soundscape 360 derajat yang menempatkan suara di lokasi yang tepat dalam ruang tiga dimensi. Mendengar langkah musuh dari atas atau di belakang dalam game horror menjadi pengalaman yang jauh lebih menegangkan ketika suara benar-benar datang dari arah yang tepat.\n\nBackward compatibility dengan hampir semua library PS4 (ribuan judul) memastikan koleksi game lama Anda tidak menjadi usang. Game Share Play via PSN memungkinkan berbagi game dengan teman secara online. PlayStation Plus Essential/Extra/Premium memberikan akses ke ratusan game tanpa biaya tambahan per judul. Storage dapat diperluas dengan SSD NVMe PCIe 4.0 M.2 pihak ketiga (slot sudah tersedia dan mudah diakses). HDMI 2.1 mendukung output 4K@120fps dan 8K@60fps untuk monitor gaming terbaru. PS5 Slim hadir dalam versi Digital (tanpa disc drive) dan versi dengan optical drive yang dapat dilepas.\n            ', 8999000, 15, 4.9, 0, 'products/keyboard.png', '[\"#5c1a1a\", \"#1e1e1e\", \"#5c3a1a\"]', '[\"Onyx Black\", \"Navy Blue\", \"Amber Brown\"]', '[\"products/keyboard.png\", \"products/keyboard.png\", \"products/keyboard.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(38, 7, NULL, 'ASUS ROG Ally', 'asus-rog-ally', 'Handheld gaming PC, Ryzen Z1 Extreme, 120Hz.', '\nASUS ROG Ally adalah pernyataan berani bahwa pengalaman gaming PC sejati kini tidak lagi harus terikat di satu tempat. Handheld gaming device ini bukan sekadar konsol portabel — ini adalah PC Windows 11 penuh yang terkemas dalam form factor genggaman, membawa library game Steam, Epic, Xbox Game Pass, dan platform lain ke perjalanan, kamar tidur, atau mana saja Anda mau.\n\nAMD Ryzen Z1 Extreme — prosesor yang dirancang secara eksklusif untuk ROG Ally bersama AMD — mengintegrasikan 8 CPU core Zen 4 dan 12 GPU Compute Units RDNA 3 dalam satu chip yang dioptimalkan untuk efisiensi daya mobile tanpa mengorbankan performa. Hasilnya adalah kemampuan menjalankan game AAA seperti Cyberpunk 2077, Elden Ring, dan Starfield pada setting medium dengan frame rate yang playable — sesuatu yang tidak bisa dilakukan oleh Steam Deck original dengan chip AMD yang lebih tua. VRAM hingga 8GB diambil dari RAM 16GB LPDDR5 yang tersedia.\n\nLayar IPS Full HD (1920x1080) 7 inci dengan refresh rate 120Hz adalah keunggulan signifikan dibanding Valve Steam Deck yang hanya 800p@60Hz. Resolusi penuh dan refresh rate tinggi ini terasa nyata dalam gameplay — detail yang lebih tajam dan gerakan yang lebih mulus secara konsisten. Kecerahan 500 nit cukup untuk penggunaan di dalam ruangan dan moderat di luar ruangan.\n\nWindows 11 Home native membawa fleksibilitas tanpa batas: install Heroic Games Launcher untuk Epic, Battle.net untuk Blizzard, Xbox app untuk Game Pass (termasuk EA Play), dan bahkan emulator. Tidak ada keterbatasan platform yang sering menjadi kendala konsol proprietary. ASUS Armoury Crate Special Edition memberikan antarmuka touchscreen yang dioptimalkan untuk handheld, mempermudah navigasi library game dan pengaturan performa tanpa keyboard fisik.\n\nROG XG Mobile port adalah teknologi proprietary yang memungkinkan koneksi GPU eksternal (dijual terpisah) yang bisa meningkatkan performa gaming ketika digunakan di meja. Koneksi via konektor khusus berkecepatan PCIe 3.0 x8 memberikan bandwidth yang cukup untuk GPU desktop class. Ini menjadikan ROG Ally sebagai perangkat yang benar-benar hybrid: portabel saat bepergian, diupgrade dengan GPU eksternal saat di rumah.\n\nKontroller terintegrasi dengan thumbstick Hall effect (lebih presisi dan lebih tahan lama dari potentiometer biasa yang rentan drift), tombol ABXY, bumper, trigger, d-pad, dan gyroscope 6-axis untuk aiming berbasis gerak. USB-C dengan DisplayPort untuk koneksi ke TV/monitor dan dock. MicroSD slot untuk ekspansi storage. Baterai 40Wh dengan pengisian 65W — sekitar 1-2 jam gaming tergantung beban game, dengan mode TDP rendah untuk gaming ringan yang bisa mencapai 3 jam lebih. Bobot 608 gram terbilang kompetitif untuk spesifikasi yang dikandungnya.\n            ', 9999000, 12, 4.6, 1, 'products/keyboard.png', '[\"#2d5c1a\", \"#5c3a1a\", \"#1a3a5c\", \"#5c1a1a\"]', '[\"Navy Blue\", \"Amber Brown\", \"Onyx Black\", \"Forest Green\"]', '[\"products/keyboard.png\", \"products/keyboard.png\", \"products/keyboard.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(39, 7, NULL, 'Nintendo Switch OLED', 'nintendo-switch-oled', 'Konsol hybrid layar OLED 7 inch, warna vibrant.', '\nNintendo Switch OLED bukan sekadar upgrade layar dari Switch original — ini adalah Switch yang terasa selesai, sempurna, dan siap untuk dinikmati tanpa reservasi. Dengan layar OLED 7 inci yang menakjubkan sebagai pusat perhatian, Switch OLED membuktikan bahwa nilai terbesar Switch bukan pada spesifikasi hardware yang bersaing dengan PS5 atau Xbox, tetapi pada cara uniknya memfasilitasi kesenangan bermain di mana saja dan kapan saja.\n\nLayar OLED 7 inci dengan resolusi 720p menghasilkan visual yang jauh melampaui LCD 6.2 inci di Switch original meski angka resolusinya sama. Teknologi OLED menghadirkan warna yang lebih kaya dan saturasi yang lebih tinggi, hitam yang benar-benar gelap (tidak ada cahaya latar seperti LCD yang membuat hitam terlihat abu-abu), dan kontras yang dramatis. Dalam game-game visual seperti Breath of the Wild, Metroid Dread, atau Kirby and the Forgotten Land, perbedaannya sungguh terasa dan membuat pengalaman bermain jauh lebih imersif dalam mode handheld.\n\nKickstand yang dapat diatur sudutnya (bukan kickstand tipis mudah patah di Switch original) memungkinkan bermain di berbagai permukaan — meja pesawat, bangku taman, atau meja kafe — dengan sudut yang dapat dioptimalkan. Kickstand yang lebar dan stabil ini juga mencakup area penyimpanan kartrid game di bawahnya. Mode tabletop bersama dua Joy-Con yang dilepas memungkinkan multiplayer lokal spontan di mana saja tanpa memerlukan TV.\n\nPort LAN wired yang terintegrasi di dock (bukan hanya WiFi) adalah peningkatan kecil namun signifikan untuk gamer kompetitif online yang ingin latensi terendah dan koneksi paling stabil untuk game seperti Splatoon 3, Mario Kart 8 Deluxe Online, atau SMASH Bros Ultimate. Audio yang ditingkatkan via speaker yang diperbaiki menghasilkan sound yang lebih jernih dan lebih bertenaga dalam mode handheld — lebih memuaskan saat bermain tanpa headphone.\n\nStorage internal 64GB (dua kali lipat Switch original 32GB) dan slot microSD yang mendukung hingga 2TB memberikan ruang yang cukup untuk library digital yang besar. Chip custom NVIDIA Tegra X1+ yang efisien mendukung semua game Nintendo Switch yang sudah ada dan yang akan datang — kompatibilitas backward penuh dengan seluruh library Switch yang sudah ada (1000+ judul dan terus bertambah). Harga berlangganan Nintendo Switch Online yang terjangkau memberikan akses multiplayer online, cloud saves, dan ratusan game klasik NES, SNES, N64, Game Boy, dan Mega Drive.\n            ', 4500000, 25, 4.8, 0, 'products/keyboard.png', '[\"#5c1a1a\", \"#1e1e1e\", \"#2d5c1a\"]', '[\"Amber Brown\", \"Cardinal Red\", \"Navy Blue\"]', '[\"products/keyboard.png\", \"products/keyboard.png\", \"products/keyboard.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(40, 7, NULL, 'SteelSeries Arctis Nova Pro', 'steelseries-arctis-nova-pro', 'Headset gaming high-fidelity dengan DAC.', '\nSteelSeries Arctis Nova Pro Wireless adalah headset gaming yang melampaui kategorinya sendiri — ia bukan hanya headset gaming terbaik yang pernah SteelSeries buat, tetapi juga headset yang dengan percaya diri bersaing dengan headphone audiophile high-end dalam kualitas suara murni, sambil tetap mempertahankan semua fitur gaming yang dibutuhkan gamer kompetitif dan casual sekaligus.\n\nDriver speaker generasi baru dengan diameter 40mm menggunakan neodymium magnet high-grade dan membran komposit yang dioptimalkan untuk respons frekuensi yang flat dan akurat — karakteristik yang dicari audiophile untuk monitoring, bukan suara yang di-boost secara artifisial untuk gaming. Ini berarti Arctis Nova Pro terdengar baik untuk semua genre musik, podcast, dan konten media, bukan hanya game. Respons frekuensi 10Hz-40kHz melampaui batas pendengaran manusia di kedua ujung, memastikan semua detail dalam rekaman audio berkualitas tinggi tersampaikan.\n\nGameDAC Gen 2 adalah DAC/amp eksternal yang terhubung ke headset via kabel — sebuah komponen audio berkualitas tinggi yang mengkonversi sinyal digital dari konsol atau PC menjadi analog dengan kualitas 96kHz/24-bit. Bagi referensi, CD audio standar adalah 44.1kHz/16-bit — GameDAC Gen 2 memproses audio pada resolusi yang secara signifikan lebih tinggi. Ini bukan sekadar marketing — dalam blind test dengan headphone audiophile, perbedaan DAC yang baik vs biasa dapat terdengar jelas oleh pendengar yang terlatih.\n\nSistem ANC yang terintegrasi (bukan ANC sederhana) menggunakan mikrofon feedback dan feedforward untuk menekan noise ambient secara efektif — berguna bagi gamer yang bermain di lingkungan berisik atau streamer yang perlu konsentrasi. Transparansi mode memungkinkan suara lingkungan masuk saat perlu berbicara tanpa melepas headset.\n\nMikrofon ClearCast Gen 2 retractable (lipat ke atas saat tidak digunakan) menggunakan desain bidirectional yang secara fisik menolak suara dari arah belakang (keyboard, kipas, kebisingan ruangan) untuk menangkap hanya suara yang berasal langsung dari depan — suara Anda. Dalam pengujian Discord, kualitas suara mikrofon ini dibandingkan dengan mikrofon USB standalone yang harganya jauh lebih mahal.\n\nSistem baterai dual ganda adalah inovasi unik: dua baterai yang dapat diswap — saat satu hampir habis, ganti dengan yang lain yang sudah terisi, tanpa mati satu detik pun. Masing-masing baterai memberikan sekitar 22 jam penggunaan, berarti secara praktis Arctis Nova Pro adalah headset wireless yang tidak pernah mati. Kompatibel dengan PlayStation, PC, dan mobile dengan konektivitas 2.4GHz lossless dan Bluetooth multipoint. Nova Pro Wireless adalah headset yang tidak akan pernah menjadi bottleneck dalam pengalaman audio Anda.\n            ', 5200000, 10, 4.7, 1, 'products/keyboard.png', '[\"#5c3a1a\", \"#1e1e1e\", \"#5c1a1a\"]', '[\"Forest Green\", \"Onyx Black\", \"Navy Blue\"]', '[\"products/keyboard.png\", \"products/keyboard.png\", \"products/keyboard.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(41, 7, NULL, 'Xbox Series X', 'xbox-series-x', 'Konsol Microsoft terkuat, 12 Teraflops power.', '\nXbox Series X berdiri sebagai pernyataan teknis yang paling tegas dari Microsoft: ini adalah konsol gaming paling bertenaga yang pernah mereka buat, dan salah satu yang paling bertenaga yang pernah ada. Kemampuan 4K native pada 120fps bukan janji pemasaran yang terbatas pada beberapa judul tertentu — ini adalah arsitektur yang dirancang dari awal untuk mewujudkan target tersebut secara konsisten.\n\nGPU custom RDNA 2 dengan 12 teraflop computing power menempatkan Series X hampir dua kali lipat lebih kuat dari Xbox One X sebelumnya dan setara dengan GPU desktop kelas menengah-atas dalam benchmark gaming. Ray Tracing hardware-accelerated memungkinkan rendering pencahayaan, refleksi, dan bayangan yang secara fundamental berbeda dari rasterization konvensional — objek memantulkan cahaya secara realitis berdasarkan material dan sumber cahaya, air bergenang mencerminkan lingkungan sekitar dengan akurat, dan bayangan memiliki gradasi halus yang sesuai dengan sumber cahaya.\n\nVelocity Architecture adalah ekosistem teknologi yang menggabungkan SSD custom 1TB NVMe, DirectStorage API (yang memungkinkan GPU mengambil data langsung dari SSD tanpa melalui CPU), dan Sampler Feedback Streaming (yang hanya memuat bagian tekstur yang benar-benar terlihat oleh kamera). Hasil kolaborasi semua ini: game bisa memiliki dunia yang jauh lebih besar dari kapasitas RAM fisik, dengan streaming data yang seamless dan tak terasa loading screen konvensional.\n\nQuick Resume memungkinkan berpindah antara hingga 5 game yang berbeda dalam hitungan detik — masing-masing melanjutkan tepat dari tempat terakhir Anda tinggalkan. Ini melampaui simple suspend: bahkan game online tertentu bisa di-resume ke sesi yang masih aktif. Waktu boot dari daya penuh ke layar home sekitar 3 detik.\n\nGame Pass Ultimate adalah layanan berlangganan yang mencakup Xbox Game Pass (library 100+ game yang terus bertambah termasuk semua first-party Microsoft mulai hari pertama rilis), EA Play (ratusan game EA), Xbox Live Gold (multiplayer online), dan cloud gaming (streaming game ke smartphone atau browser PC via xCloud). Untuk gamer yang ingin bermain banyak judul yang berbeda tanpa membeli satu-per-satu, Game Pass adalah proposisi nilai yang sulit ditolak.\n\nBackward compatibility adalah komitmen unik Xbox: Series X kompatibel dengan game Xbox One, Xbox 360, dan bahkan beberapa judul Xbox original. Ribuan game dari tiga generasi sebelumnya dapat dimainkan, banyak di antaranya mendapatkan Auto HDR (penambahan HDR otomatis oleh konsol pada game yang tidak memiliki HDR native) dan FPS Boost (menggandakan atau melipatgandakan frame rate original game secara otomatis untuk judul tertentu). Desain tower vertikal dengan sistem pendingin custom yang membawa udara dari bawah ke atas memberikan pendinginan efisien yang tenang. HDMI 2.1 untuk output 4K@120fps langsung dari kotak.\n            ', 8500000, 8, 4.8, 0, 'products/keyboard.png', '[\"#1a3a5c\", \"#5c3a1a\", \"#5c1a1a\"]', '[\"Cardinal Red\", \"Amber Brown\", \"Onyx Black\"]', '[\"products/keyboard.png\", \"products/keyboard.png\", \"products/keyboard.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(42, 7, NULL, 'Logitech G Pro X Superlight', 'logitech-g-pro-x-superlight', 'Mouse gaming ultra ringan untuk kompetitif.', '\nLogitech G Pro X Superlight adalah mouse gaming yang diciptakan atas masukan langsung dari para profesional esports terbaik dunia, kemudian dioptimalkan hingga setiap gram yang tidak diperlukan dieliminasi. Hasilnya adalah mouse wireless gaming terbaik di kelasnya dalam hal bobot — 61 gram (Superlight 2) yang jauh di bawah kompetitor wireless manapun tanpa mengorbankan sensor, baterai, atau keandalan.\n\nFilosofi \'less weight = more speed\' bukan sekadar preferensi subyektif di komunitas esports — studi biomekanik menunjukkan bahwa mouse yang lebih ringan memungkinkan accelerasi yang lebih cepat, arm fatigue yang lebih rendah dalam sesi panjang, dan kontrol yang lebih presisi dalam gerakan mikro (micro-adjustments) saat aiming. Para pro seperti s1mple, NiKo, dan Zywoo secara aktif berkontribusi dalam feedback pengembangan G Pro X Superlight.\n\nSensor HERO 25K (terbaru, di Superlight 2) yang dikembangkan oleh Logitech sendiri menawarkan resolusi hingga 25.600 DPI dengan zero smoothing, zero filtering, dan zero acceleration — tiga karakteristik yang berarti sensor melaporan pergerakan mouse secara akurat dan mentah tanpa pemrosesan yang mengubah data input. Respons tracking 500+ IPS (inch per second) dengan akurasi piksel sempurna dalam kecepatan tersebut. Polling rate 2000Hz (di Superlight 2) berarti posisi mouse dilaporkan ke PC 2000 kali per detik — dua kali lebih sering dari 1000Hz standar, menghasilkan pergerakan kursor yang lebih smooth dan latensi yang lebih rendah.\n\nTeknologi LIGHTSPEED wireless Logitech menggunakan frekuensi radio 2.4GHz dengan protokol custom yang memberikan latensi di bawah 1ms — secara klinis tidak dapat dibedakan dari koneksi kabel dalam skenario gaming aktual. Tidak ada drift, tidak ada dropout, tidak ada interferensi yang terasa. Baterai mampu bertahan hingga 70 jam pada Superlight (40 jam pada Superlight 2 dengan polling 2000Hz) — lebih dari cukup untuk seminggu penggunaan harian tanpa pengisian.\n\nForm factor berbentuk ambidextrous (simetris) dengan tonjolan kanan yang lebih dominan memberikan dukungan palm grip yang sangat nyaman untuk pengguna tangan kanan. Tidak ada tonjolan atau fitur yang tidak diperlukan di sisi kiri untuk menjaga bobot seminimal mungkin. Klik utama menggunakan switch mekanis yang telah dimodifikasi untuk tidak memerlukan pre-travel sebelum aktuasi — setiap tekanan sekecil apapun langsung terdaftar sebagai klik.\n\nLogitech G HUB software memungkinkan kustomisasi DPI (profil hingga 5 level), penugasan tombol, dan sinkronisasi dengan game tertentu melalui profil otomatis. POWERPLAY-compatible: mousepad Logitech POWERPLAY secara nirkabel mengisi baterai mouse saat digunakan — Anda tidak pernah perlu mengisi daya secara aktif. Tersedia dalam putih dan hitam. G Pro X Superlight adalah mouse yang para pro dunia percayakan dalam kompetisi jutaan dolar — lebih dari rekomendasi yang cukup untuk penggunaan sehari-hari.\n            ', 1800000, 30, 4.9, 0, 'products/keyboard.png', '[\"#5c3a1a\", \"#2d5c1a\", \"#1a3a5c\"]', '[\"Cardinal Red\", \"Forest Green\", \"Navy Blue\"]', '[\"products/keyboard.png\", \"products/keyboard.png\", \"products/keyboard.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(43, 8, NULL, 'TP-Link Archer AXE75', 'tp-link-archer-axe75', 'Router WiFi 6E tri-band kecepatan 5400Mbps.', '\nTP-Link Archer AXE75 membuka era konektivitas baru untuk rumah tangga modern dengan menghadirkan teknologi WiFi 6E — standar yang menambahkan pita frekuensi 6GHz ke arsenal nirkabel yang sebelumnya hanya menggunakan 2.4GHz dan 5GHz. Hasilnya adalah router yang tidak hanya lebih cepat, tetapi secara fundamental memberikan lingkungan nirkabel yang lebih bersih dan lebih dapat diandalkan.\n\nPita 6GHz yang ditambahkan WiFi 6E adalah territory yang hampir kosong dari interferensi saat ini — karena standar ini masih baru, tidak ada router tetangga, microwave, atau perangkat Bluetooth yang mengganggu frekuensi tersebut. Ini berarti perangkat yang terhubung di 6GHz mendapatkan channel yang bersih untuk throughput konsisten yang tidak terpengaruh lingkungan nirkabel sekitar. Kecepatan teoritis kombinasi tiga pita: AX5400 total (574 Mbps di 2.4GHz + 2.402 Mbps di 5GHz + 2.402 Mbps di 6GHz).\n\nUntuk perangkat yang mendukung 6GHz (smartphone dan laptop WiFi 6E terbaru), koneksi di pita ini memberikan latensi yang jauh lebih rendah dan konsistensi yang jauh lebih baik dibanding 5GHz yang sudah penuh sesak di lingkungan padat. Ini penting sekali untuk aplikasi yang sensitif latensi: video call, cloud gaming, virtual reality, dan trading real-time.\n\nTarget Wake Time (TWT) dari standar WiFi 6 memungkinkan router dan perangkat bernegosiasi jadwal wake-up yang efisien, mengurangi konsumsi daya perangkat IoT baterai seperti sensor pintu, kamera baterai, dan sensor suhu hingga 7 kali lipat. Rumah yang penuh perangkat smart home mendapatkan manfaat besar dari efisiensi daya ini.\n\nKedelapan antena eksternal (empat untuk MIMO) memberikan jangkauan dan throughput yang optimal ke seluruh sudut rumah. Fitur beamforming mengarahkan sinyal secara intelijens menuju perangkat yang terhubung daripada memancar secara omnidirectional. MU-MIMO 4x4 memungkinkan komunikasi simultan dengan empat perangkat berbeda dalam satu transmisi, tidak bergantian seperti standar lama.\n\nTP-Link HomeCare (bertenaga Trend Micro) memberikan keamanan tingkat enterprise: antivirus untuk semua perangkat di jaringan, parental control per perangkat dengan filter kategori konten dan jadwal akses internet, QoS (Quality of Service) untuk memprioritaskan bandwidth ke aplikasi atau perangkat tertentu. Tether app yang intuitif memberikan kontrol penuh dari smartphone. Dua port WAN/LAN Gigabit, empat port LAN Gigabit. TP-Link OneMesh compatible untuk easy mesh expansion. Archer AXE75 adalah investasi jaringan untuk 5-10 tahun ke depan.\n            ', 1999000, 28, 4.5, 0, 'products/kabel.png', '[\"#1e1e1e\", \"#1a3a5c\"]', '[\"Amber Brown\", \"Navy Blue\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(44, 8, NULL, 'Ubiquiti UniFi Dream Machine', 'ubiquiti-unifi-dream-machine', 'All-in-one console untuk networking enterprise.', '\nUbiquiti UniFi Dream Machine (UDM) membawa konsep manajemen jaringan kelas enterprise yang selama ini eksklusif untuk perusahaan besar ke tangan pengguna rumahan dan bisnis kecil yang menginginkan visibilitas dan kontrol penuh atas infrastruktur jaringan mereka. Ini bukan router biasa dengan antarmuka web sederhana — ini adalah platform jaringan lengkap dalam satu perangkat.\n\nAll-in-one dalam arti yang sesungguhnya: UDM mengintegrasikan security gateway (firewall tingkat lanjut), router 4-port Gigabit, switch managed, dan access point dual-band WiFi 802.11ac Wave 2 dalam satu unit fisik yang elegan. Tidak perlu rak server, tidak perlu kabel yang berbelit, tidak perlu lisensi terpisah — semuanya terintegrasi dan dikelola dari satu antarmuka.\n\nUniFi Controller yang tertanam (tidak perlu server PC terpisah untuk menjalankan controller software seperti pada produk UniFi sebelumnya) adalah satu peningkatan fundamental. Akses antarmuka manajemen penuh dari browser lokal atau via UniFi Remote Access dari mana saja di dunia, tanpa VPN. Dashboard real-time menampilkan traffic per client, penggunaan bandwidth, aktivitas firewall, connected clients (dengan identifikasi nama hostname, IP, dan MAC address), dan statistik sinyal WiFi semua device.\n\nDeep Packet Inspection (DPI) mengidentifikasi jenis traffic per aplikasi — berapa bandwidth yang dikonsumsi Netflix vs YouTube vs Microsoft Teams vs torrent, per device. Data ini memungkinkan QoS (traffic shaping) yang benar-benar cerdas: prioritaskan Zoom meeting dan VoIP di atas streaming HD, dan streaming HD di atas update background. Intrusion Detection System (IDS) dan Intrusion Prevention System (IPS) built-in memonitor dan memblokir pola traffic mencurigakan secara real-time.\n\nGuest WiFi dengan portal landing yang dapat dikustomisasi, voucher system untuk bisnis yang menjual akses WiFi, dan isolasi tamu dari jaringan utama mudah dikonfigurasi. VLAN untuk segmentasi jaringan (pisahkan IoT dari perangkat utama untuk keamanan yang lebih baik) tersedia dengan antarmuka yang lebih ramah dari kebanyakan router consumer. Remote access management memungkinkan IT admin mengelola jaringan klien dari jarak jauh.\n\nUntuk skala, UDM dirancang untuk diekspansi: tambahkan switch UniFi untuk lebih banyak port kabel, tambahkan access point UniFi untuk jangkauan WiFi yang lebih luas, semuanya dikelola dalam UniFi Controller yang sama dengan tampilan unified. Ini adalah fondasi yang tumbuh bersama kebutuhan. UDM adalah untuk mereka yang ingin memahami, mengendalikan, dan mengoptimalkan setiap aspek jaringan rumah atau kantor kecil mereka.\n            ', 6500000, 5, 4.9, 0, 'products/kabel.png', '[\"#1e1e1e\", \"#2d5c1a\", \"#1a3a5c\"]', '[\"Navy Blue\", \"Cardinal Red\", \"Forest Green\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(45, 8, NULL, 'ASUS RT-AX88U Pro', 'asus-rt-ax88u-pro', 'Router gaming WiFi 6 dengan perlindungan AiProtection.', '\nASUS RT-AX88U Pro adalah router WiFi 6 yang tidak mau dikompromikan dalam hal apapun — dirancang secara eksplisit untuk pengguna power-user yang mengerti apa yang mereka inginkan dari perangkat jaringan dan tidak puas dengan router \'cukup baik\'. Dengan delapan antena eksternal yang mencolok, dua port 2.5G WAN/LAN, dan fitur keamanan enterprise-grade, RT-AX88U Pro hadir untuk mendominasi segmen premium.\n\nAX6000 WiFi 6 dual-band (1148 Mbps di 2.4GHz + 4804 Mbps di 5GHz) memberikan throughput agregat yang cukup untuk rumah dengan koneksi internet gigabit penuh, multiple stream 4K/8K simultan, dan gaming online dengan latensi ultra rendah sekaligus. Teknologi OFDMA (Orthogonal Frequency Division Multiple Access) dari WiFi 6 memungkinkan satu transmisi melayani multiple client secara bersamaan (bukan bergantian), dramatis meningkatkan efisiensi jaringan di rumah yang ramai perangkat.\n\nDual 2.5G port (satu WAN + satu LAN yang dapat dikonfigurasi) mengantisipasi ketersediaan internet multi-gigabit yang mulai umum di berbagai kota besar Indonesia — dengan port 1G biasa, koneksi 2.5G atau lebih tidak dapat dimanfaatkan penuh. Port LAN 2.5G juga ideal untuk NAS, workstation, atau gaming PC yang mengunduh file besar dan membutuhkan kecepatan maksimal kabel.\n\nAiProtection Pro bertenaga Trend Micro memberikan lapisan keamanan yang mencakup: deteksi dan pemblokiran situs berbahaya secara real-time (malicious site blocking yang diperbarui otomatis dari database Trend Micro cloud), deteksi perangkat yang terinfeksi malware dalam jaringan Anda (Infected Device Prevention and Blocking), dan Two-Way IPS yang memantau traffic masuk DAN keluar. Fitur ini aktif tanpa biaya berlangganan tambahan selama perangkat masih didukung.\n\nASUS Router app yang matang dan komprehensif memberikan kontrol penuh dari smartphone: monitoring penggunaan bandwidth per client dalam grafik yang informatif, parental control dengan profil per perangkat dan jadwal waktu internet, VPN Server (OpenVPN dan WireGuard built-in) untuk akses aman ke jaringan rumah saat bepergian, dan QoS tiga mode (Adaptive, Bandwidth Limiter, Traditional) untuk prioritisasi traffic yang fleksibel.\n\nAI Traffic Manager secara otomatis mengalokasikan bandwidth berdasarkan analisis pola penggunaan historical — bukan hanya konfigurasi statis. AI Protection secara otomatis memperbarui signature ancaman. AiMesh-compatible untuk membangun sistem mesh dengan unit ASUS lain tanpa konfigurasi kompleks. Delapan LAN port Gigabit + dua 2.5G port memberikan konektivitas kabel yang berlimpah. USB 3.2 port untuk berbagi printer atau storage via jaringan (Samba, AiCloud). RT-AX88U Pro adalah pilihan router yang tidak perlu diganti dalam 5-7 tahun ke depan.\n            ', 4800000, 10, 4.7, 1, 'products/kabel.png', '[\"#5c1a1a\", \"#2d5c1a\"]', '[\"Onyx Black\", \"Cardinal Red\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(46, 8, NULL, 'Google Nest WiFi Pro', 'google-nest-wifi-pro', 'Sistem mesh WiFi 6E yang cerdas dan estetik.', '\nGoogle Nest WiFi Pro adalah respons Google terhadap pertanyaan sederhana namun sering tidak terjawab: mengapa konfigurasi WiFi rumah harus rumit? Sistem mesh WiFi 6E ini dirancang dengan prinsip bahwa pengguna tidak boleh perlu memahami channel, band steering, atau roaming thresholds untuk mendapatkan jaringan yang bekerja dengan sempurna di seluruh sudut rumah.\n\nSetiap unit Nest WiFi Pro berisi router lengkap yang bekerja secara otonom namun terkoordinasi dalam sistem mesh. Tiga pita frekuensi — 2.4GHz, 5GHz, dan 6GHz — digunakan secara cerdas: 6GHz terutama digunakan sebagai backhaul (koneksi antar node mesh), sementara 2.4GHz dan 5GHz melayani perangkat klien. Ini memisahkan traffic backbone dari traffic perangkat, menghasilkan koneksi yang lebih cepat dan lebih konsisten untuk klien bahkan ketika sistem mesh sedang aktif merutekan traffic antar unit.\n\nPerpindahan seamless antar node (roaming 802.11r/k/v) terjadi secara otomatis dan transparan saat Anda berjalan membawa smartphone dari satu ujung rumah ke ujung lain. Tidak ada koneksi yang putus, tidak ada perlu reconect manual — perangkat secara otomatis berpindah ke node dengan sinyal terbaik tanpa interupsi aktivitas yang sedang berjalan. Wi-Fi Speed Test bawaan di aplikasi Google Home memungkinkan pengujian kecepatan di setiap titik rumah untuk memverifikasi coverage.\n\nDukungan Matter dan Thread adalah investasi masa depan yang significan. Matter adalah standar interoperabilitas smart home yang didukung Apple, Google, Amazon, dan ratusan manufaktur perangkat — menjamin bahwa perangkat smart home baru apapun yang membeli di masa depan akan kompatibel. Thread adalah protokol mesh networking untuk perangkat IoT berdaya rendah yang lebih andal dari WiFi untuk perangkat seperti sensor, kunci pintar, dan lampu. Nest WiFi Pro berfungsi sebagai Thread Border Router, menjadi hub yang menghubungkan perangkat Thread ke internet.\n\nPrivasi adalah prioritas desain: tidak ada mikrofon di unit (berbeda dari Nest WiFi sebelumnya yang memiliki speaker Google Home terintegrasi), dan Google secara eksplisit menyatakan tidak menggunakan traffic jaringan untuk targeting iklan. WPA3 encryption dan Automatic Security Updates memastikan keamanan yang current. Setiap unit memiliki satu port Ethernet 2.5G untuk koneksi wired ke perangkat penting atau daisy-chaining antar node untuk performa mesh yang lebih baik. Setup awal via Google Home app umumnya selesai dalam 10-15 menit tanpa pengetahuan teknis. Tersedia dalam Snow, Linen, dan Fog — warna yang menyatu dengan dekor rumah modern.\n            ', 3500000, 15, 4.6, 0, 'products/kabel.png', '[\"#1a3a5c\", \"#2d5c1a\", \"#5c3a1a\"]', '[\"Onyx Black\", \"Cardinal Red\", \"Navy Blue\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52');
INSERT INTO `produk` (`id`, `kategori_id`, `brand_id`, `nama`, `slug`, `deskripsi`, `deskripsi_detail`, `harga`, `stok`, `rating`, `adalah_promo`, `gambar`, `colors`, `color_labels`, `images`, `specs`, `reviews`, `dibuat_pada`, `diperbarui_pada`) VALUES
(47, 8, NULL, 'Netgear Nighthawk M6', 'netgear-nighthawk-m6', 'Mobile hotspot 5G tercepat untuk traveling.', '\nNetgear Nighthawk M6 adalah mobile hotspot yang mendefinisikan ulang apa yang bisa Anda harapkan dari konektivitas internet saat bepergian. Di era remote work yang semakin umum, kemampuan memiliki koneksi internet pribadi yang cepat dan andal di mana saja — bukan bergantung pada WiFi hotel yang tidak dapat diprediksi atau hotspot smartphone yang menguras baterai — telah berubah dari kemewahan menjadi kebutuhan profesional.\n\nModem 5G Sub-6 dan mmWave terintegrasi memungkinkan M6 mengakses jaringan 5G generasi terbaru yang kini semakin luas tersedia. Kecepatan download teoritis hingga 2.5 Gbps (Sub-6) menjadikannya hotspot yang lebih cepat dari koneksi internet rumahan mayoritas pengguna — Anda secara harfiah bisa mendapatkan koneksi lebih cepat saat bepergian dengan M6 dibanding di rumah dengan kabel. Bahkan di area 4G LTE Cat 20, kecepatan agregat hingga 2 Gbps via carrier aggregation memberikan pengalaman yang jauh melampaui hotspot 4G generasi lama.\n\nLayar LCD touchscreen 2.8 inci built-in memberikan informasi yang berguna tanpa membuka aplikasi: kekuatan sinyal per pita (5G/4G), jumlah perangkat yang terhubung, kecepatan upload/download real-time, kapasitas baterai tersisa, dan data yang sudah digunakan. Konfigurasi dasar — nama WiFi, password, dan beberapa setting — dapat dilakukan langsung dari layar tanpa memerlukan smartphone sama sekali.\n\nBand WiFi 6 (802.11ax) 2.4GHz dan 5GHz memastikan perangkat yang terhubung ke M6 mendapatkan kecepatan WiFi terbaru. Hingga 32 perangkat dapat terhubung secara bersamaan — cukup untuk satu tim kerja yang sedang meeting di lokasi tanpa internet, atau seluruh bus perjalanan wisata. Guest WiFi yang terpisah dengan password berbeda untuk mengizinkan akses tamu tanpa memberikan akses ke pengaturan jaringan utama.\n\nBaterai 5040mAh memberikan sekitar 13 jam penggunaan aktif pada kondisi jaringan 5G dengan beberapa perangkat terhubung — cukup untuk perjalanan udara lintas benua. Pengisian via USB-C 27W mengisi penuh dalam sekitar 2.5 jam. Konektor USB-C juga berfungsi sebagai tethering ke laptop untuk koneksi yang lebih stabil dan bebas latensi tambahan WiFi jika diperlukan.\n\nNetgear Insight Cloud Management memungkinkan administrator IT perusahaan mengelola fleet M6 yang digunakan karyawan remote dari satu dashboard terpusat — memantau penggunaan data, mengkonfigurasi pengaturan, dan memecahkan masalah tanpa harus secara fisik mengakses perangkat. Kompatibel dengan kartu SIM nano dari semua operator utama di Indonesia (Telkomsel, XL, Indosat, Tri, Smartfren) — pilih operator dengan coverage terbaik di wilayah tujuan Anda.\n            ', 9500000, 4, 4.8, 0, 'products/kabel.png', '[\"#1e1e1e\", \"#5c1a1a\"]', '[\"Onyx Black\", \"Amber Brown\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(48, 8, NULL, 'Xiaomi AX3000 Mesh', 'xiaomi-ax3000-mesh', 'Solusi mesh murah dengan performa WiFi 6 stabil.', '\nXiaomi AX3000 Mesh System menawarkan proposisi yang sulit diabaikan: teknologi WiFi 6 dengan kemampuan mesh yang sesungguhnya, dalam paket harga yang jauh di bawah sistem mesh premium seperti Eero Pro atau Netgear Orbi, tanpa mengorbankan fungsionalitas yang benar-benar penting untuk mayoritas pengguna rumahan.\n\nSetiap unit AX3000 adalah router dual-band WiFi 6 yang lengkap dengan 2402 Mbps di 5GHz dan 574 Mbps di 2.4GHz (AX3000 total per unit). Dalam konfigurasi mesh dua atau tiga unit, jangkauan yang bisa dicapai sangat mengesankan untuk harganya. Satu unit primer sudah mampu mencakup apartemen atau rumah bertipe 36-72 m² dengan sinyal yang konsisten; dua unit mampu mencakup rumah dua lantai atau rumah dengan layout yang kompleks; tiga unit untuk villa atau rumah besar.\n\nTeknologi Mesh Auto-Topology secara otomatis mengoptimalkan topologi jaringan mesh — memilih antara daisy-chain atau star configuration berdasarkan penempatan fisik unit dan kualitas koneksi antar unit. Anda cukup meletakkan unit-unit di posisi yang masuk akal secara intuitif; sistem akan mengurus routing yang optimal. Tidak perlu mode \'access point\' manual atau konfigurasi channel manual.\n\nRoaming 802.11r (Fast BSS Transition) yang tersertifikasi memastikan smartphone, laptop, dan perangkat IoT berpindah antar unit mesh tanpa putus koneksi yang terasa. Steering algoritmik mendorong perangkat ke unit terdekat dengan sinyal terbaik secara proaktif, bukan menunggu sinyal turun drastis sebelum berpindah seperti implementasi dasar.\n\nXiaomi Mi Home app (atau Xiaomi Home) memberikan antarmuka manajemen yang visual dan ramah pengguna: peta jaringan yang menampilkan semua perangkat terhubung dengan nama dan status, kontrol parental dengan jadwal internet per perangkat (sangat berguna untuk mengatur waktu layar anak-anak), traffic prioritization untuk perangkat gaming atau streaming, dan monitoring penggunaan bandwidth historis.\n\nCPU quad-core 1.0 GHz yang bertenaga untuk kelasnya memastikan routing, NAT, dan firewall berjalan tanpa bottleneck bahkan dengan banyak perangkat terhubung simultan. RAM 512MB yang cukup untuk tabel routing yang besar. Tiga port Gigabit Ethernet per unit (satu WAN + dua LAN, atau semua LAN untuk unit satelit). Koneksi mesh dapat menggunakan backhaul nirkabel 5GHz atau kabel Ethernet untuk performa yang lebih tinggi antara unit. IPv6 native support. WPA3 security. Update firmware otomatis via cloud. Garansi 2 tahun resmi Xiaomi Indonesia.\n            ', 990000, 40, 4.4, 1, 'products/kabel.png', '[\"#5c1a1a\", \"#1e1e1e\"]', '[\"Forest Green\", \"Amber Brown\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(49, 8, NULL, 'MikroTik hAP ax3', 'mikrotik-hap-ax3', 'Router modern dengan dukungan hardware encryption.', '\nMikroTik hAP ax3 adalah router untuk individu yang menganggap router sebagai alat jaringan yang sesungguhnya — bukan sekadar kotak hitam yang \'asal jalan\'. Dengan RouterOS v7 yang legendaris di komunitas networking profesional dan hardware WiFi 6 yang solid, hAP ax3 adalah router yang memberikan kontrol dan fleksibilitas yang tidak tertandingi oleh produk consumer manapun di planet ini, dengan harga yang masih terjangkau.\n\nProsesor quad-core ARM Cortex-A55 1.8 GHz dengan pengkodean/dekodean enkripsi hardware (IPsec, AES) memungkinkan hAP ax3 menjalankan VPN tunnel terenkripsi penuh pada kecepatan gigabit tanpa CPU throttling — sesuatu yang menjadi bottleneck menyakitkan di router consumer berbasis MIPS generasi lama. Ini penting untuk remote worker yang bergantung pada VPN kantor, atau pengguna yang menjalankan VPN untuk privasi dengan throughput penuh.\n\nWiFi 6 dual-band (574 Mbps di 2.4GHz + 2.402 Mbps di 5GHz) dengan standard 802.11ax dan OFDMA. Chain MIMO 4x4 di 5GHz memberikan konektivitas yang substansial untuk perangkat WiFi 6 modern. Lima antena eksternal dapat diarahkan untuk optimasi jangkauan manual. Internal chain bypass mode memungkinkan koneksi chain ke antena eksternal custom untuk instalasi yang membutuhkan jangkauan sangat jauh (Point-to-Point atau coverage area besar).\n\nRouterOS v7 adalah sistem operasi jaringan yang digunakan oleh ISP, enterprise, dan network engineer di seluruh dunia. Dalam konteks router rumahan, ini berarti akses ke fitur-fitur yang tidak ada di produk consumer manapun: Firewall dengan filter L7 (Layer 7 packet inspection untuk identifikasi aplikasi), Routing OSPF/BGP/MPLS untuk jaringan kompleks, Scripting dengan bahasa Mikrotik Scripting Language untuk automasi yang sangat fleksibel, Hotspot server lengkap dengan portal dan user management, PPPoE server, Traffic shaping per-queue dengan Hierarchical Token Bucket (HTB), dan VPN dengan protokol L2TP, SSTP, PPPoE, OVPN, WireGuard, dan IPSec semua terintegrasi.\n\nWinbox — software GUI gratis dari MikroTik — memberikan antarmuka visual yang sangat lengkap untuk konfigurasi semua fitur RouterOS, lebih cocok untuk yang belum terbiasa dengan CLI. WebFig memberikan akses konfigurasi via browser. CLI via SSH atau Telnet memberikan kontrol penuh bagi administrator yang terbiasa dengan command line. Semua tiga cara akses tersedia simultan.\n\nLima port Gigabit Ethernet (satu WAN + empat LAN, atau dapat dikonfigurasi ulang sepenuhnya). Port SFP untuk koneksi fiber optik langsung. USB port untuk modem 4G/5G sebagai WAN backup atau sharing storage. PoE-in pada port ETH1 untuk power-over-Ethernet (dapat ditenagai dari switch PoE tanpa adaptor terpisah). Dimensi yang kompak (175x125x45mm) untuk kemampuan yang sangat besar. RouterOS lisensi Level 4 sudah termasuk — lisensi yang bernilai puluhan dolar jika dibeli terpisah. hAP ax3 adalah router terakhir yang perlu Anda beli jika Anda siap untuk kurva belajar yang ada.\n            ', 2100000, 20, 4.7, 0, 'products/kabel.png', '[\"#5c1a1a\", \"#1a3a5c\"]', '[\"Navy Blue\", \"Forest Green\"]', '[\"products/kabel.png\", \"products/kabel.png\", \"products/kabel.png\"]', NULL, 0, '2026-05-27 21:26:52', '2026-05-27 21:26:52'),
(50, 2, NULL, 'iphone 17 pro max', 'iphone-17-pro-max', 'fitur unggulan', 'deskripsi detail', 45000000, 20, 4.9, 0, NULL, NULL, NULL, NULL, NULL, 0, '2026-05-29 00:44:54', '2026-05-29 00:44:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `promo`
--

CREATE TABLE `promo` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `banner` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('aktif','segera','berakhir') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'segera',
  `dibuat_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `promo`
--

INSERT INTO `promo` (`id`, `nama`, `deskripsi`, `tanggal_mulai`, `tanggal_selesai`, `banner`, `status`, `dibuat_pada`, `diperbarui_pada`) VALUES
(1, 'Flash Gadget Sale', 'Diskon hingga 50% untuk gadget terbaru.', '2026-05-26', '2026-06-05', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=10/1200/600', 'aktif', '2026-05-12 21:26:52', '2026-05-25 21:26:52'),
(2, 'Laptop Clearance', 'Cuci gudang laptop berbagai brand.', '2026-05-23', '2026-06-04', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=11/1200/600', 'aktif', '2026-05-09 21:26:52', '2026-05-22 21:26:52'),
(3, 'Smartphone Week', 'Promo spesial smartphone flagship & mid-range.', '2026-05-23', '2026-06-12', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=12/1200/600', 'aktif', '2026-05-12 21:26:52', '2026-05-22 21:26:52'),
(4, 'Weekend Deal', 'Diskon spesial akhir pekan.', '2026-05-24', '2026-06-08', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=13/1200/600', 'aktif', '2026-05-16 21:26:52', '2026-05-23 21:26:52'),
(5, 'Midnight Sale', 'Promo terbatas hanya tengah malam.', '2026-05-24', '2026-06-11', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=14/1200/600', 'aktif', '2026-05-13 21:26:52', '2026-05-23 21:26:52'),
(6, 'Ramadhan Sale', 'Diskon spesial Ramadhan + cashback.', '2026-05-23', '2026-06-06', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=15/1200/600', 'aktif', '2026-05-11 21:26:52', '2026-05-22 21:26:52'),
(7, 'Lebaran Big Sale', 'Promo besar menjelang Lebaran.', '2026-05-27', '2026-06-05', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=16/1200/600', 'aktif', '2026-05-16 21:26:52', '2026-05-26 21:26:52'),
(8, '11.11 Super Sale', 'Diskon besar 11.11 + gratis ongkir.', '2026-06-03', '2026-06-09', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=17/1200/600', 'segera', '2026-05-21 21:26:52', '2026-06-02 21:26:52'),
(9, '12.12 Year End Sale', 'Promo akhir tahun besar-besaran.', '2026-06-06', '2026-06-14', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=18/1200/600', 'segera', '2026-05-31 21:26:52', '2026-06-05 21:26:52'),
(10, 'New Year Blast', 'Promo awal tahun penuh diskon.', '2026-06-08', '2026-06-15', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=19/1200/600', 'segera', '2026-05-27 21:26:52', '2026-06-07 21:26:52'),
(11, 'Office Essentials', 'Diskon perlengkapan kantor & kerja.', '2026-06-02', '2026-06-12', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=110/1200/600', 'segera', '2026-05-20 21:26:52', '2026-06-01 21:26:52'),
(12, 'Content Creator Gear', 'Diskon kamera & aksesoris.', '2026-04-19', '2026-05-26', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=111/1200/600', 'berakhir', '2026-04-05 21:26:52', '2026-04-18 21:26:52'),
(13, 'Work From Home Kit', 'Promo perangkat kerja dari rumah.', '2026-04-18', '2026-05-25', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=112/1200/600', 'berakhir', '2026-04-06 21:26:52', '2026-04-17 21:26:52'),
(14, 'Smart Living Sale', 'Diskon smart home devices.', '2026-04-28', '2026-05-25', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=113/1200/600', 'berakhir', '2026-04-21 21:26:52', '2026-04-27 21:26:52'),
(15, 'Gaming Gear Rush', 'Diskon keyboard, mouse, headset gaming.', '2026-04-25', '2026-05-20', 'https://i0.wp.com/pemmztechie.id/wp-content/uploads/2022/05/Desain-Banner-Web-Pemmztechie-Promo-MEI_.jpg?ssl=114/1200/600', 'berakhir', '2026-04-09 21:26:52', '2026-04-24 21:26:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `promo_produk`
--

CREATE TABLE `promo_produk` (
  `id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `promo_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `promo_produk`
--

INSERT INTO `promo_produk` (`id`, `produk_id`, `promo_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 6, 1),
(6, 7, 1),
(7, 8, 1),
(8, 1, 2),
(9, 3, 2),
(10, 6, 2),
(11, 7, 2),
(12, 12, 2),
(13, 14, 2),
(14, 15, 2),
(15, 19, 2),
(16, 1, 3),
(17, 19, 3),
(18, 20, 3),
(19, 14, 4),
(20, 15, 4),
(21, 16, 4),
(22, 3, 5),
(23, 4, 5),
(24, 10, 5),
(25, 2, 6),
(26, 7, 6),
(27, 8, 7),
(28, 10, 7),
(29, 14, 8),
(30, 15, 8),
(31, 1, 9),
(32, 3, 9);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `settings`
--

CREATE TABLE `settings` (
  `id` bigint UNSIGNED NOT NULL,
  `profile` json DEFAULT NULL,
  `kontak` json DEFAULT NULL,
  `jam_operasional` json DEFAULT NULL,
  `social_media` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `settings`
--

INSERT INTO `settings` (`id`, `profile`, `kontak`, `jam_operasional`, `social_media`, `created_at`, `updated_at`) VALUES
(1, '{\"nama\": \"Budi Hartono Santoso\", \"email\": \"admin@bizponselcatalog.com\", \"quote\": \"Kami berkomitmen memberikan layanan teknologi terbaik dengan layanan yang mudah diakses dan terpercaya.\", \"avatar\": \"/storage/avatars/3GT3LHeLKccfeEaZmxNle7mvUFNnARCBJIkrh53y.jpg\", \"jabatan\": \"CEO & Founder\", \"avatar_path\": \"avatars/3GT3LHeLKccfeEaZmxNle7mvUFNnARCBJIkrh53y.jpg\"}', '{\"email\": \"info@bizponselcatalog.com\", \"alamat\": \"Jl. Sudirman No. 88, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220\", \"telepon\": \"021-57889900\", \"whatsapp\": \"+62 812-3456-7890\", \"maps_embed\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.096!2d112.7452!3d-7.3118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0b5c5e5e5f%3A0x1234567890abcdef!2sJl.%20Bendul%20Merisi%20Selatan%20XI%2C%20Bendul%20Merisi%2C%20Kec.%20Wonocolo%2C%20Kota%20SBY%2C%20Jawa%20Timur%2060239!5e0!3m2!1sid!2sid!4v1\"}', '{\"pusat\": {\"sabtu\": {\"buka\": \"08:00\", \"libur\": false, \"tutup\": \"15:00\"}, \"minggu\": {\"libur\": true}, \"senin_jumat\": {\"buka\": \"08:30\", \"libur\": false, \"tutup\": \"17:00\"}}, \"cabang\": [{\"id\": 1, \"nama\": \"Marina\", \"shifts\": [{\"buka\": \"09:30\", \"label\": \"Shift 1\", \"tutup\": \"16:00\"}, {\"buka\": \"16:00\", \"label\": \"Shift 2\", \"tutup\": \"21:30\"}]}]}', '[{\"url\": \"https://instagram.com/bizponsel.id\", \"icon\": \"instagram\", \"label\": \"Instagram\"}, {\"url\": \"https://wa.me/6281234567890\", \"icon\": \"whatsapp\", \"label\": \"WhatsApp\"}]', '2026-05-27 21:26:52', '2026-05-29 00:48:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `spesifikasi_produk`
--

CREATE TABLE `spesifikasi_produk` (
  `id` bigint UNSIGNED NOT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `atribut` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `spesifikasi_produk`
--

INSERT INTO `spesifikasi_produk` (`id`, `produk_id`, `atribut`, `detail`) VALUES
(198, 1, 'Prosesor', 'AMD Ryzen 9 7940HS (8 Core, 16 Threads, up to 5.2GHz)'),
(199, 1, 'GPU', 'NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP up to 125W)'),
(200, 1, 'RAM', '16GB DDR5 4800MHz (Dual Channel Support)'),
(201, 1, 'Storage', '1TB M.2 NVMe PCIe 4.0 SSD'),
(202, 1, 'Layar', '14\" ROG Nebula Display QHD+ (2560x1600) 165Hz, 100% DCI-P3'),
(203, 1, 'Baterai', '76Whrs, 4-cell Li-ion, Support 100W Type-C Charging'),
(204, 1, 'Bobot', '1.65 kg (Sangat Ringan untuk Laptop Gaming)'),
(205, 1, 'Fitur Khusus', 'AniMe Matrix LED display pada cover, MUX Switch + NVIDIA Advanced Optimus'),
(206, 1, 'Konektivitas', 'Wi-Fi 6E, Bluetooth 5.3, USB 4.0 Support'),
(207, 1, 'OS', 'Windows 11 Home'),
(208, 2, 'Prosesor', 'Intel Core i7-1365U vPro (10 Core, up to 5.2GHz)'),
(209, 2, 'RAM', '16GB LPDDR5 5200MHz (Soldered)'),
(210, 2, 'Storage', '512GB M.2 PCIe Gen4 NVMe Performance SSD'),
(211, 2, 'Layar', '14\" OLED 2.8K (2880x1800) 400 nits, 100% DCI-P3, HDR True Black 500'),
(212, 2, 'Grafis', 'Intel Iris Xe Graphics'),
(213, 2, 'Baterai', '57Wh, Rapid Charge (isi daya 80% dalam 60 menit)'),
(214, 2, 'Bobot', '1.12 kg (Bahan Carbon Fiber premium)'),
(215, 2, 'Kamera', '1080p FHD & IR Camera dengan Privacy Shutter'),
(216, 2, 'Keamanan', 'Fingerprint Reader, dTPM 2.0, Kensington Nano Security Slot'),
(217, 2, 'OS', 'Windows 11 Pro'),
(218, 3, 'Chip', 'Apple M2 (8-core CPU, 8-core GPU, 16-core Neural Engine)'),
(219, 3, 'RAM', '8GB Unified Memory'),
(220, 3, 'Storage', '256GB Superfast SSD'),
(221, 3, 'Layar', '13.6\" Liquid Retina Display (2560x1664) with True Tone, 500 nits'),
(222, 3, 'Baterai', 'Hingga 18 jam pemutaran film aplikasi Apple TV'),
(223, 3, 'Kamera', '1080p FaceTime HD camera'),
(224, 3, 'Audio', 'Four-speaker sound system with Spatial Audio support'),
(225, 3, 'Port', 'MagSafe 3 charging port, 2x Thunderbolt / USB 4 ports, 3.5mm Headphone jack'),
(226, 3, 'Bobot', '1.24 kg'),
(227, 3, 'OS', 'macOS (Versi terbaru)'),
(228, 4, 'Prosesor', 'Intel Core i5-1235U (10 Core, up to 4.4GHz)'),
(229, 4, 'RAM', '8GB DDR4 3200MHz (Upgradeable up to 24GB)'),
(230, 4, 'Storage', '512GB NVMe Gen4 SSD (Tersedia slot HDD/SSD tambahan)'),
(231, 4, 'Layar', '15.6\" Full HD (1920x1080) Acer ComfyView LED-backlit TFT LCD'),
(232, 4, 'Grafis', 'Intel Iris Xe Graphics'),
(233, 4, 'Baterai', '50Wh 3-cell Li-ion, Hingga 7 jam penggunaan harian'),
(234, 4, 'Konektivitas', 'Wi-Fi 6, Bluetooth 5.1, Gigabit Ethernet (RJ-45)'),
(235, 4, 'Port', '1x HDMI 2.1, 3x USB 3.2 Gen 1, 1x USB Type-C (Thunderbolt 4)'),
(236, 4, 'Bobot', '1.77 kg'),
(237, 4, 'OS', 'Windows 11 Home + Office Home & Student 2021'),
(238, 5, 'Prosesor', 'Intel Core i9-13900H (14 Core, 20 Threads, up to 5.4GHz)'),
(239, 5, 'GPU', 'NVIDIA GeForce RTX 4070 8GB GDDR6 (40W)'),
(240, 5, 'RAM', '32GB DDR5 4800MHz (2x16GB, Dual Channel)'),
(241, 5, 'Storage', '1TB M.2 PCIe Gen4 NVMe SSD'),
(242, 5, 'Layar', '15.6\" 3.5K (3456x2160) InfinityEdge OLED Touch, 400 nits, 100% DCI-P3'),
(243, 5, 'Baterai', '86Wh (6-Cell), 130W USB-C Power Adapter'),
(244, 5, 'Audio', 'Studio quality tuning dengan Waves MaxxAudio Pro dan Waves Nx 3D audio'),
(245, 5, 'Material', 'CNC machined aluminum with carbon fiber palm rest'),
(246, 5, 'Port', '2x Thunderbolt 4 (USB-C), 1x USB-C 3.2 Gen 2, Full-size SD card reader'),
(247, 5, 'OS', 'Windows 11 Pro'),
(248, 6, 'Prosesor', 'AMD Ryzen 5 7535HS (6 Core, 12 Threads, up to 4.5GHz)'),
(249, 6, 'GPU', 'NVIDIA GeForce RTX 3050 4GB GDDR6'),
(250, 6, 'RAM', '8GB DDR5 4800MHz (Upgradeable up to 32GB)'),
(251, 6, 'Storage', '512GB PCIe Gen4 NVMe M.2 SSD'),
(252, 6, 'Layar', '15.6\" FHD (1920x1080) 144Hz, IPS, Micro-edge, Anti-glare'),
(253, 6, 'Baterai', '70Wh 4-cell Li-ion polymer, 200W Smart AC Adapter'),
(254, 6, 'Sistem Pendingin', 'Dual speakers by B&O, Thermal management ditingkatkan'),
(255, 6, 'Kamera', 'HP Wide Vision 720p HD camera with temporal noise reduction'),
(256, 6, 'Bobot', '2.29 kg'),
(257, 6, 'OS', 'Windows 11 Home'),
(258, 7, 'Prosesor', 'Intel Core i7-12650H (10 Core, 16 Threads, up to 4.7GHz)'),
(259, 7, 'GPU', 'NVIDIA GeForce RTX 3060 6GB GDDR6 (TGP up to 105W)'),
(260, 7, 'RAM', '16GB DDR4 3200MHz (2x8GB, Dual Channel)'),
(261, 7, 'Storage', '512GB NVMe PCIe Gen4 SSD'),
(262, 7, 'Layar', '15.6\" FHD (1920x1080) 144Hz, IPS-Level Thin Bezel'),
(263, 7, 'Keyboard', 'Red Backlit Gaming Keyboard'),
(264, 7, 'Baterai', '53.5Wh 3-cell Li-Polymer, 180W Power Adapter'),
(265, 7, 'Sistem Pendingin', 'Cooler Boost 5 (2 Fans & 6 Heat Pipes)'),
(266, 7, 'Konektivitas', 'Gigabit LAN, Wi-Fi 6, Bluetooth 5.2'),
(267, 7, 'OS', 'Windows 11 Home'),
(268, 8, 'Prosesor', 'Snapdragon 8 Gen 3 for Galaxy (4nm)'),
(269, 8, 'RAM', '12GB LPDDR5X'),
(270, 8, 'Storage', '256GB / 512GB / 1TB UFS 4.0'),
(271, 8, 'Layar', '6.8\" Dynamic LTPO AMOLED 2X, QHD+, 120Hz, 2600 nits, Gorilla Armor'),
(272, 8, 'Kamera Utama', 'Quad 200MP (Wide) + 50MP (5x Periscope) + 10MP (3x Tele) + 12MP (Ultra-wide)'),
(273, 8, 'Baterai', '5000mAh, 45W Fast Charging, 15W Wireless Charging'),
(274, 8, 'Material', 'Titanium Frame, IP68 Dust/Water Resistant'),
(275, 8, 'Fitur AI', 'Galaxy AI (Circle to Search, Live Translate, Note Assist)'),
(276, 8, 'S-Pen', 'Built-in S-Pen dengan Bluetooth (Latensi 2.8ms)'),
(277, 8, 'OS', 'Android 14, One UI 6.1 (Update hingga 7 tahun)'),
(278, 9, 'Chip', 'Apple A17 Pro (6-core CPU, 6-core GPU, 16-core Neural Engine)'),
(279, 9, 'RAM', '8GB LPDDR5X'),
(280, 9, 'Storage', '256GB / 512GB / 1TB NVMe'),
(281, 9, 'Layar', '6.7\" LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 2000 nits'),
(282, 9, 'Kamera Utama', '48MP (Wide) + 12MP (5x Periscope Telephoto) + 12MP (Ultra-wide) + LiDAR'),
(283, 9, 'Baterai', '4441mAh, USB-C 3.0, 15W MagSafe Wireless Charging'),
(284, 9, 'Material', 'Titanium Grade 5 Frame, Ceramic Shield Front, IP68'),
(285, 9, 'Fitur Khusus', 'Action Button, Dynamic Island, Log Video Recording'),
(286, 9, 'Konektivitas', '5G, Wi-Fi 6E, Bluetooth 5.3, Second-gen Ultra Wideband (UWB)'),
(287, 9, 'OS', 'iOS 17 (Upgradeable to latest version)'),
(288, 10, 'Prosesor', 'Snapdragon 8 Gen 3 (4nm)'),
(289, 10, 'RAM', '12GB / 16GB LPDDR5X'),
(290, 10, 'Storage', '256GB / 512GB / 1TB UFS 4.0'),
(291, 10, 'Layar', '6.73\" LTPO AMOLED (3200 x 1440), 120Hz, 3000 nits, Xiaomi Ceramic Glass'),
(292, 10, 'Kamera Utama', 'Triple 50MP Leica: Main (Variable Aperture) + Floating Telephoto + Ultra-wide'),
(293, 10, 'Baterai', '4880mAh, 120W HyperCharge (100% dalam 18 menit), 50W Wireless'),
(294, 10, 'Material', 'Aluminum/Titanium frame, IP68 Dust/Water Resistant'),
(295, 10, 'Audio', 'Stereo Speakers, Dolby Atmos, Hi-Res Audio'),
(296, 10, 'Konektivitas', 'Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2 Gen 2'),
(297, 10, 'OS', 'Xiaomi HyperOS berbasis Android 14'),
(298, 11, 'Prosesor', 'Snapdragon 8 Gen 3 (4nm)'),
(299, 11, 'RAM', '12GB / 16GB LPDDR5X'),
(300, 11, 'Storage', '256GB / 512GB UFS 4.0'),
(301, 11, 'Layar', '6.82\" LTPO AMOLED, 1B colors, 120Hz, Dolby Vision, 4500 nits (Peak)'),
(302, 11, 'Kamera Utama', 'Quad 50MP Hasselblad: 1\" Main Sensor + Dual Periscope (3x & 6x Optical) + Ultra-wide'),
(303, 11, 'Baterai', '5000mAh, 100W SUPERVOOC (100% dalam 26 menit), 50W Wireless'),
(304, 11, 'Material', 'Glass front, Eco-leather back, Aluminum frame, IP68'),
(305, 11, 'Fitur Khusus', 'Hasselblad Color Calibration, Dedicated Security Chip, Alert Slider'),
(306, 11, 'Konektivitas', 'Wi-Fi 7, Bluetooth 5.4, NFC, Satellite Communication (Optional)'),
(307, 11, 'OS', 'ColorOS 14 berbasis Android 14'),
(308, 12, 'Prosesor', 'Snapdragon 8 Gen 2 for Galaxy (4 nm)'),
(309, 12, 'RAM', '12GB / 16GB LPDDR5X'),
(310, 12, 'Storage', '256GB / 512GB / 1TB (Slot microSD hingga 1TB)'),
(311, 12, 'Layar', '14.6\" Dynamic AMOLED 2X, 120Hz, HDR10+, Corning Gorilla Glass'),
(312, 12, 'Kamera Utama', 'Dual 13MP (Wide) + 8MP (Ultra-wide)'),
(313, 12, 'Kamera Depan', 'Dual 12MP (Wide) + 12MP (Ultra-wide)'),
(314, 12, 'Baterai', '11,200mAh, 45W Fast Charging'),
(315, 12, 'Material', 'Armor Aluminum Frame, IP68 Dust/Water Resistant (Tablet & S-Pen)'),
(316, 12, 'S-Pen', 'Termasuk dalam paket penjualan (Latensi ultra rendah 2.8ms)'),
(317, 12, 'OS', 'Android 13 (Upgradeable to Android 14), One UI 6'),
(318, 13, 'Prosesor', 'Google Tensor G3 (4nm) dengan Titan M2 Security Coprocessor'),
(319, 13, 'RAM', '12GB LPDDR5X'),
(320, 13, 'Storage', '128GB / 256GB / 512GB / 1TB UFS 3.1'),
(321, 13, 'Layar', '6.7\" Super Actua Display LTPO OLED, 1-120Hz, 2400 nits (Peak), HDR10+'),
(322, 13, 'Kamera Utama', 'Triple: 50MP (Wide) + 48MP (5x Optical Zoom) + 48MP (Ultra-wide)'),
(323, 13, 'Baterai', '5050mAh, 30W Wired, 23W Wireless Charging, Battery Share'),
(324, 13, 'Sensor Unik', 'Termometer (Infrared temperature sensor)'),
(325, 13, 'Fitur AI', 'Magic Editor, Best Take, Audio Magic Eraser, Ultra HDR'),
(326, 13, 'Ketahanan', 'Gorilla Glass Victus 2 (Depan & Belakang), IP68'),
(327, 13, 'OS', 'Android 14 (Jaminan update OS & keamanan 7 tahun)'),
(328, 14, 'Chip', 'Apple M2 (8-core CPU, 10-core GPU, 16-core Neural Engine)'),
(329, 14, 'RAM', '8GB RAM (pada model 128/256/512GB) atau 16GB RAM (pada model 1/2TB)'),
(330, 14, 'Storage', '128GB / 256GB / 512GB / 1TB / 2TB'),
(331, 14, 'Layar', '12.9\" Liquid Retina XDR (Mini-LED), ProMotion 120Hz, 1600 nits (Peak)'),
(332, 14, 'Kamera Utama', 'Dual 12MP (Wide) + 10MP (Ultra-wide) + LiDAR Scanner'),
(333, 14, 'Kamera Depan', '12MP Ultra Wide dengan fitur Center Stage'),
(334, 14, 'Baterai', '40.88 Wh, Hingga 10 jam penggunaan (Wi-Fi)'),
(335, 14, 'Konektivitas', 'Thunderbolt / USB 4, Wi-Fi 6E, Bluetooth 5.3, 5G (Opsional)'),
(336, 14, 'Aksesori', 'Support Apple Pencil 2nd Gen (Hover feature) & Magic Keyboard'),
(337, 14, 'OS', 'iPadOS 16 (Upgradeable to latest version)'),
(338, 15, 'Sensor', 'Darkfield High Precision, 200 - 8000 DPI (Dapat diatur per kelipatan 50)'),
(339, 15, 'Klik', 'Quiet Clicks (90% lebih senyap dibanding versi MX Master 3)'),
(340, 15, 'Scrolling', 'MagSpeed Electromagnetic Scrolling (1000 baris dalam 1 detik)'),
(341, 15, 'Baterai', 'Li-Po 500 mAh, Hingga 70 hari, Fast Charging 1 menit untuk 3 jam'),
(342, 15, 'Konektivitas', 'Bluetooth Low Energy & Logi Bolt USB Receiver (Tidak kompatibel Unifying)'),
(343, 15, 'Multi-Device', 'Easy-Switch (Hubungkan hingga 3 perangkat) & Logitech Flow'),
(344, 15, 'Tombol', '7 Tombol (Left/Right, Back/Forward, App-Switch, Wheel Mode-Shift, Middle Click)'),
(345, 15, 'Thumb Wheel', 'Ya, untuk scrolling horizontal dan kontrol gestur'),
(346, 15, 'Software', 'Logi Options+ (Tersedia di macOS dan Windows)'),
(347, 15, 'Ergonomi', 'Desain hand-sculpted khusus untuk tangan kanan'),
(348, 16, 'Tipe Keyboard', 'Wireless Custom Mechanical Keyboard (Layout 75%)'),
(349, 16, 'Material', 'Full CNC Machined Aluminum Body'),
(350, 16, 'Konektivitas', 'Bluetooth 5.1 & USB Type-C Wired (Polling Rate 1000Hz)'),
(351, 16, 'Switch', 'Keychron K Pro Mechanical (Hot-swappable 3-pin & 5-pin)'),
(352, 16, 'Keycaps', 'KSA Profile Double-shot PBT (Non-shine through)'),
(353, 16, 'Mounting', 'Double-Gasket Design untuk pengalaman mengetik lebih empuk'),
(354, 16, 'Baterai', '4000 mAh Rechargeable Li-polymer (Hingga 300 jam tanpa RGB)'),
(355, 16, 'Software', 'Support QMK/VIA (Remap tombol dan macro via browser)'),
(356, 16, 'Stabilizer', 'Screw-in PCB Stabilizers (Lebih stabil dan minim rattling)'),
(357, 16, 'Backlight', 'South-facing RGB LED (Kompatibel dengan lebih banyak jenis keycaps)'),
(358, 17, 'Tipe Perangkat', '2-in-1 Hybrid Charger (Wall Charger + Portable Charger)'),
(359, 17, 'Kapasitas Baterai', '10,000 mAh'),
(360, 17, 'Output Mode Charger', 'Maksimal 65W (via USB-C) saat terhubung ke outlet dinding'),
(361, 17, 'Output Mode Power Bank', 'Maksimal 30W (via USB-C) saat penggunaan portabel'),
(362, 17, 'Jumlah Port', '3 Port (2x USB-C, 1x USB-A)'),
(363, 17, 'Teknologi', 'GaNPrime (Lebih dingin, efisien, dan ringkas)'),
(364, 17, 'Fitur Keamanan', 'ActiveShield 2.0 (Pemantauan suhu cerdas)'),
(365, 17, 'Kompatibilitas', 'PowerIQ 4.0 (Deteksi kebutuhan daya otomatis untuk laptop/HP)'),
(366, 17, 'Input Daya', 'AC 100-240V (Wall) atau USB-C Input'),
(367, 17, 'Bobot', '320 gram'),
(368, 18, 'Tipe Mousepad', 'Soft Gaming Mouse Mat dengan pencahayaan Razer Chroma RGB'),
(369, 18, 'Permukaan', 'Kain mikro-tekstur (Micro-textured cloth) untuk kontrol dan kecepatan'),
(370, 18, 'Optimasi Sensor', 'Dioptimalkan untuk semua pengaturan sensitivitas dan sensor mouse'),
(371, 18, 'Pencahayaan', '16.8 juta warna RGB, sinkronisasi antar perangkat (Chroma Sync)'),
(372, 18, 'Dasar (Base)', 'Karet anti-slip (Non-slip rubber base)'),
(373, 18, 'Konektivitas', 'Kabel USB tetap (Braided cable)'),
(374, 18, 'Fitur Khusus', 'Built-in cable catch untuk manajemen kabel mouse'),
(375, 18, 'Ketebalan', '3 mm'),
(376, 18, 'Software', 'Razer Synapse 3 untuk kustomisasi efek lampu'),
(377, 18, 'Ukuran', '255 mm x 355 mm (Medium Size)'),
(378, 19, 'Tipe Drive', 'Portable External SSD (Rugged Design)'),
(379, 19, 'Kapasitas', '1TB'),
(380, 19, 'Kecepatan Baca', 'Hingga 1,050 MB/s'),
(381, 19, 'Kecepatan Tulis', 'Hingga 1,000 MB/s'),
(382, 19, 'Antarmuka', 'USB 3.2 Gen 2 (10Gbps)'),
(383, 19, 'Ketahanan', 'IP65 (Tahan Air & Debu), Tahan jatuh hingga 3 meter'),
(384, 19, 'Material', 'Eksterior elastomer berteknologi tinggi (Karet Anti-Slip)'),
(385, 19, 'Keamanan', 'Enkripsi Perangkat Keras AES 256-bit'),
(386, 19, 'Kompatibilitas', 'PC, Mac, Android, Konsol Game (PS5/Xbox)'),
(387, 19, 'Dimensi/Berat', '88 x 59 x 13 mm / 98 gram'),
(388, 20, 'Tipe Charger', 'Fast Desktop Charger (GaN Technology)'),
(389, 20, 'Total Output', 'Maksimal 100W'),
(390, 20, 'Jumlah Port', '4 Port (2x USB-C, 2x USB-A)'),
(391, 20, 'Teknologi GaN', 'GaN5 (Generasi kelima, konversi daya lebih tinggi & minim panas)'),
(392, 20, 'Proteksi', 'BPS II (Baseus Power Split) untuk distribusi daya cerdas'),
(393, 20, 'Keamanan', 'Over-voltage, Over-current, Over-power, Static, & Short-circuit protection'),
(394, 20, 'Input Daya', 'AC 100V-240V, 50/60Hz'),
(395, 20, 'Kompatibilitas', 'Laptop (MacBook/Dell/HP), Tablet, iPhone, Samsung PPS'),
(396, 20, 'Fitur Khusus', 'Termasuk kabel data Type-C to Type-C 100W dalam paket'),
(397, 20, 'Desain', 'Compact & Portable dengan indikator lampu LED'),
(398, 21, 'Tipe Headphone', 'Over-Ear Wireless Noise Cancelling'),
(399, 21, 'Noise Cancelling', 'HD Noise Cancelling Processor QN1 & Integrated Processor V1'),
(400, 21, 'Driver Unit', '30mm (Specially designed carbon fiber)'),
(401, 21, 'Baterai', 'Hingga 30 jam (ANC On), 40 jam (ANC Off)'),
(402, 21, 'Fast Charging', 'Isi daya 3 menit untuk penggunaan 3 jam (via USB-PD)'),
(403, 21, 'Mikrofon', '8 Mikrofon dengan teknologi Precise Voice Pickup'),
(404, 21, 'Konektivitas', 'Bluetooth 5.2, Multipoint Connection (2 Perangkat sekaligus)'),
(405, 21, 'Codec Audio', 'SBC, AAC, LDAC (Hi-Res Audio Wireless)'),
(406, 21, 'Fitur Cerdas', 'Speak-to-Chat, Wearing Detection, Spotify Tap'),
(407, 21, 'OS Support', 'Kompatibel dengan Google Assistant & Alexa'),
(408, 22, 'Chipset', 'Apple H2 Chip (New) & U1 Chip di Charging Case'),
(409, 22, 'Audio', 'Active Noise Cancellation (2x lebih kuat dari Gen 1)'),
(410, 22, 'Mode Suara', 'Adaptive Transparency & Personalized Spatial Audio'),
(411, 22, 'Baterai Buds', 'Hingga 6 jam waktu dengar sekali isi daya'),
(412, 22, 'Total Baterai', 'Hingga 30 jam dengan Casing Pengisian Daya MagSafe'),
(413, 22, 'Charging Case', 'Support USB-C, MagSafe, & Apple Watch charger'),
(414, 22, 'Kontrol Sentuh', 'Swipe up/down untuk mengatur volume, Press untuk play/pause'),
(415, 22, 'Ketahanan', 'IP54 (Tahan debu, keringat, dan air)'),
(416, 22, 'Ear Tips', '4 ukuran silicon (XS, S, M, L)'),
(417, 22, 'Fitur Find My', 'Precision Finding dengan speaker internal pada case'),
(418, 23, 'Transduser', '52mm x 90mm Woofer, 20mm Tweeter'),
(419, 23, 'Daya Output', '30W RMS (Woofer) + 10W RMS (Tweeter)'),
(420, 23, 'Baterai', '7500 mAh (27 Wh)'),
(421, 23, 'Waktu Putar', 'Hingga 20 jam (Tergantung level volume)'),
(422, 23, 'Waktu Isi Daya', '4 jam (5V / 3A)'),
(423, 23, 'Fitur Powerbank', 'Ya, via port USB-A (Power out 5V / 2A max)'),
(424, 23, 'Ketahanan', 'IP67 (Kedap air dan debu)'),
(425, 23, 'PartyBoost', 'Hubungkan beberapa speaker JBL PartyBoost secara bersamaan'),
(426, 23, 'Konektivitas', 'Bluetooth 5.1'),
(427, 23, 'Dimensi/Berat', '223 x 96.5 x 94 mm / 0.96 kg'),
(428, 24, 'Tipe Headphone', 'Over-Ear Wireless dengan Immersive Audio'),
(429, 24, 'Noise Cancelling', 'Teknologi CustomTune untuk kalibrasi suara & ANC otomatis'),
(430, 24, 'Audio Mode', 'Quiet Mode, Aware Mode, dan Immersion Mode'),
(431, 24, 'Baterai', 'Hingga 24 jam (Hingga 18 jam dengan Immersive Audio)'),
(432, 24, 'Material', 'Aluminium murni, Kulit sintetis protein, Plastik premium'),
(433, 24, 'Kontrol', 'Touch strip untuk volume, Multi-function button'),
(434, 24, 'Mikrofon', 'Sistem mikrofon canggih untuk kejernihan panggilan suara'),
(435, 24, 'Konektivitas', 'Bluetooth 5.3, Snapdragon Sound (aptX Adaptive)'),
(436, 24, 'Fitur Khusus', 'Bose Immersive Audio (Spatial Audio yang statis atau dinamis)'),
(437, 24, 'Software', 'Bose Music App untuk kustomisasi EQ'),
(438, 25, 'Tipe Audio', 'True Wireless Earbuds (TWS)'),
(439, 25, 'Driver', '7mm TrueResponse Transducer (Audiophile-grade)'),
(440, 25, 'Noise Cancelling', 'Adaptive Noise Cancellation (Otomatis menyesuaikan lingkungan)'),
(441, 25, 'Codec', 'aptX Adaptive, aptX, AAC, SBC'),
(442, 25, 'Baterai Buds', '7 jam waktu putar'),
(443, 25, 'Total Baterai', '28 jam dengan Charging Case (Kain premium)'),
(444, 25, 'Ketahanan', 'IPX4 (Tahan percikan air)'),
(445, 25, 'Charging', 'Qi Wireless Charging & USB-C'),
(446, 25, 'Fitur Khusus', 'Sound Personalization melalui aplikasi Smart Control'),
(447, 25, 'Mikrofon', '3 mikrofon per earbud untuk peredaman kebisingan angin'),
(448, 26, 'Tipe Speaker', 'Portable Bluetooth Speaker'),
(449, 26, 'Teknologi Suara', 'True Stereophonic (Multi-directional sound 360°)'),
(450, 26, 'Amplifier', 'Dua 10W Class D amplifiers'),
(451, 26, 'Baterai', '30+ jam waktu putar portabel'),
(452, 26, 'Fast Charging', 'Isi daya 20 menit untuk 4 jam waktu putar'),
(453, 26, 'Ketahanan', 'IP67 (Kedap air dan debu)'),
(454, 26, 'Stack Mode', 'Hubungkan ke speaker Emberton II lain untuk suara lebih besar'),
(455, 26, 'Konektivitas', 'Bluetooth 5.1'),
(456, 26, 'Material', 'Bahan ramah lingkungan (50% plastik daur ulang)'),
(457, 26, 'Dimensi/Berat', '68 x 160 x 76 mm / 0.7 kg'),
(458, 27, 'Sensor', '33.0 MP Full-frame Exmor R CMOS (Back-illuminated)'),
(459, 27, 'Prosesor', 'BIONZ XR (8x lebih cepat dibanding generasi sebelumnya)'),
(460, 27, 'Video', '4K 60p (Super 35mm), 4K 30p 10-bit 4:2:2 (All-I)'),
(461, 27, 'Autofokus', '759 titik Phase-detection AF, Real-time Eye AF (Human/Animal/Bird)'),
(462, 27, 'ISO', '100 - 51200 (Bisa ditingkatkan ke 50 - 204800)'),
(463, 27, 'Stabilisasi', '5-axis optical in-body image stabilization (5.5 step)'),
(464, 27, 'Layar', '3.0-type Vari-angle Touch Screen'),
(465, 27, 'Viewfinder', '3.68 million-dot OLED Quad-VGA'),
(466, 27, 'Streaming', '4K 15p / FHD 60p via USB (UVC/UAC support)'),
(467, 27, 'Media Slot', 'Dual slots (Slot 1: SD/CFexpress Type A, Slot 2: SD)'),
(468, 28, 'Sensor', '1-inch CMOS'),
(469, 28, 'Resolusi Video', '4K (16:9): 120fps, 4K (9:16): 60fps'),
(470, 28, 'Warna Video', '10-bit D-Log M & 10-bit HLG'),
(471, 28, 'Layar', '2-inch OLED Rotatable Touchscreen'),
(472, 28, 'Stabilisasi', '3-Axis Mechanical Gimbal'),
(473, 28, 'Pelacakan', 'ActiveTrack 6.0 (Face Auto-Detect, Dynamic Framing)'),
(474, 28, 'Audio', 'Built-in 3-mic array (Stereo recording & noise reduction)'),
(475, 28, 'Baterai', 'Pengisian cepat 80% dalam 16 menit'),
(476, 28, 'Fitur Khusus', 'Glamour Effects 2.0, Full-Pixel Fast Focusing'),
(477, 28, 'Penyimpanan', 'microSD (Hingga 512 GB)'),
(478, 29, 'Sensor', '40.2 MP APS-C X-Trans CMOS 5 HR'),
(479, 29, 'Prosesor', 'X-Processor 5'),
(480, 29, 'Video', '6.2K 30p 10-bit internal recording'),
(481, 29, 'Stabilisasi', 'In-body Image Stabilization (IBIS) hingga 7.0 stop'),
(482, 29, 'Shutter', 'Maksimum 1/180,000 detik (Electronic Shutter)'),
(483, 29, 'Layar', 'Three-way Tilting Touch LCD (1.84 million dots)'),
(484, 29, 'Film Simulation', '19 mode (Termasuk Nostalgic Neg. & Eterna)'),
(485, 29, 'Autofokus', 'Intelligent Hybrid AF dengan Subject Detection (Pesawat/Mobil/Hewan)'),
(486, 29, 'Desain', 'Retro dengan dial kontrol fisik untuk ISO, Shutter, & Kompensasi Eksposur'),
(487, 29, 'Bobot', '557 gram (Termasuk baterai dan memori)'),
(488, 30, 'Resolusi Video', '5.3K 60fps, 4K 120fps, 2.7K 240fps'),
(489, 30, 'Stabilisasi', 'HyperSmooth 6.0 dengan 360° Horizon Lock'),
(490, 30, 'Foto', '27 MP & Frame Grabs 24.7 MP dari video'),
(491, 30, 'Audio', 'Support Bluetooth Audio (AirPods/Mic external)'),
(492, 30, 'Baterai', 'Enduro Battery (Hingga 70 menit pada 5.3K60)'),
(493, 30, 'Ketahanan', 'Tangguh & Kedap air hingga 10 meter (33 kaki)'),
(494, 30, 'Fitur HDR', 'HDR Video + Foto untuk detail lebih tajam di area terang/gelap'),
(495, 30, 'Mounting', 'Folding Fingers built-in + 1/4-20 mounting thread'),
(496, 30, 'Color Depth', '10-bit Color & Log Encoding (GP-Log)'),
(497, 30, 'Penyimpanan', 'microSD V30 atau UHS-3 recommended'),
(498, 31, 'Sensor', '24.2 MP Full-Frame CMOS'),
(499, 31, 'Prosesor', 'DIGIC X'),
(500, 31, 'Kecepatan Foto', 'Hingga 40 fps (Electronic Shutter), 12 fps (Mechanical)'),
(501, 31, 'Video', '4K 60p (Uncropped), 6K Raw External Recording'),
(502, 31, 'Autofokus', 'Dual Pixel CMOS AF II dengan AI Tracking Manusia/Hewan/Kendaraan'),
(503, 31, 'Stabilisasi', 'In-body Image Stabilizer (IBIS) hingga 8.0 stop'),
(504, 31, 'ISO', '100 - 102,400 (Expandable to 204,800)'),
(505, 31, 'Layar', '3.0\" Vari-angle Touchscreen LCD'),
(506, 31, 'Konektivitas', 'Wi-Fi 5GHz, Bluetooth 5.0, USB-C (UVC/UAC)'),
(507, 31, 'Media Slot', 'Dual Card Slots (SD/SDHC/SDXC UHS-II)'),
(508, 32, 'CADR', 'Hingga 400 m³/jam (Area efektif 28-48 m²)'),
(509, 32, 'Filtrasi', 'Three-in-one filter (Menghilangkan 99.97% partikel 0.3μm)'),
(510, 32, 'Sensor', 'PM2.5 Laser Sensor & Sensor Suhu/Kelembapan'),
(511, 32, 'Fitur Khusus', 'Ionisasi negatif membantu menjaga udara tetap segar'),
(512, 32, 'Kebisingan', 'Rendah 32.1dB pada Mode Tidur'),
(513, 32, 'Kontrol Pintar', 'Aplikasi Mi Home, Google Assistant, & Amazon Alexa'),
(514, 32, 'Layar', 'OLED Touch Display dengan indikator kualitas udara real-time'),
(515, 32, 'Daya', '30W (Efisiensi energi tinggi)'),
(516, 33, 'Daya Hisap', '6000 Pa HyperForce Suction'),
(517, 33, 'Sistem Sikat', 'DuoRoller Riser Brush (Sikat karet ganda anti-lilitan)'),
(518, 33, 'Sistem Pel', 'VibraRise Mopping System (3000 getaran/menit + Auto-lift)'),
(519, 33, 'Navigasi', 'PreciSense LiDAR Navigation'),
(520, 33, 'Hindari Rintangan', 'Reactive 3D Obstacle Avoidance (Deteksi objek di area gelap)'),
(521, 33, 'Baterai', '5200 mAh (Hingga 180 menit penggunaan)'),
(522, 33, 'Kapasitas', '400ml Dustbin & 300ml Water Tank'),
(523, 33, 'Software', 'Custom Cleaning Routines & 3D Mapping via App'),
(524, 34, 'Fungsi Utama', 'Otak dari ekosistem pencahayaan pintar Philips Hue'),
(525, 34, 'Kapasitas Kontrol', 'Mendukung hingga 50 lampu dan 12 aksesori'),
(526, 34, 'Protokol', 'Zigbee Network Technology'),
(527, 34, 'Kompatibilitas', 'Apple HomeKit, Google Assistant, Amazon Alexa, IFTTT'),
(528, 34, 'Fitur', 'Kontrol di luar rumah, Sinkronisasi lampu dengan musik/film'),
(529, 34, 'Input Daya', '100–240 V AC / 50–60Hz'),
(530, 34, 'Dimensi', '90.9 mm x 26 mm'),
(531, 35, 'Kecerahan', '1110 Lumens (Sangat Terang)'),
(532, 35, 'Warna', '16 Juta Warna (RGB) + Warm White to Cool White'),
(533, 35, 'Konektivitas', 'WiFi 2.4GHz (Tanpa perlu hub tambahan)'),
(534, 35, 'Fitting', 'E27 (Standar lampu rumah Indonesia)'),
(535, 35, 'Fitur App', 'Schedule, Grouping, Music Rhythm Sync'),
(536, 35, 'Umur Lampu', 'Hingga 50,000 jam'),
(537, 35, 'Daya', '12W'),
(538, 36, 'Sensor', 'Termasuk SmartSensor (Deteksi suhu & okupansi ruangan)'),
(539, 36, 'Audio', 'Speaker & Mikrofon internal (Support Alexa & Siri)'),
(540, 36, 'Layar', 'Vibrant Glass Touch Display'),
(541, 36, 'Penghematan', 'Hingga 26% penghematan biaya pemanasan/pendinginan'),
(542, 36, 'Konektivitas', 'Dual-band Wi-Fi, Bluetooth, Apple HomeKit'),
(543, 36, 'Keamanan', 'Bisa berfungsi sebagai hub untuk sistem keamanan Ecobee'),
(544, 37, 'Volume Desain', '30% lebih kecil dibanding model standar'),
(545, 37, 'Storage', '1TB Custom SSD (Internal)'),
(546, 37, 'Drive Optik', 'Ultra HD Blu-ray Disc Drive (Bisa dilepas pasang)'),
(547, 37, 'Output', 'Support 4K 120Hz, HDR, VRR, & 8K'),
(548, 37, 'Port Depan', '2x USB-C'),
(549, 37, 'Audio', 'Tempest 3D AudioTech'),
(550, 38, 'Prosesor', 'AMD Ryzen Z1 Extreme (8-core, 16-thread, 8.6 TFLOPS)'),
(551, 38, 'Layar', '7\" FHD (1920x1080) 120Hz, 500 nits, FreeSync Premium'),
(552, 38, 'RAM', '16GB LPDDR5 6400MHz'),
(553, 38, 'Storage', '512GB PCIe 4.0 NVMe SSD (M.2 2230)'),
(554, 38, 'Pendingin', 'Zero Gravity Thermal System (Dual Fan)'),
(555, 38, 'Fitur', 'Armoury Crate SE, Fingerprint Power Button'),
(556, 38, 'OS', 'Windows 11 Home'),
(557, 39, 'Layar', '7-inch OLED Touchscreen (Vibrant Colors)'),
(558, 39, 'Storage', '64GB Internal (Support microSD hingga 2TB)'),
(559, 39, 'Dock', 'Wired LAN Port terintegrasi di dock'),
(560, 39, 'Audio', 'Enhanced Audio dari onboard speaker'),
(561, 39, 'Stand', 'Wide adjustable stand untuk mode tabletop'),
(562, 39, 'Mode Main', 'Handheld, Tabletop, & TV Mode'),
(563, 40, 'Driver', 'Premium High Fidelity Drivers'),
(564, 40, 'Audio Hub', 'GameDAC Gen 2 (96KHz/24-Bit resolution)'),
(565, 40, 'Mikrofon', 'ClearCast Gen 2 Noise Cancelling (Bidirectional)'),
(566, 40, 'Fitur Suara', '360° Spatial Audio & Sonar Software EQ'),
(567, 40, 'Konektivitas', 'Multi-System Connect (Dual USB Ports untuk PC/Konsol)'),
(568, 40, 'Ergonomi', 'ComfortMAX System (Height-adjustable earmuffs)'),
(569, 41, 'CPU', '8X Cores @ 3.8 GHz (3.66 GHz w/SMT) Custom Zen 2 CPU'),
(570, 41, 'GPU', '12 TFLOPS, 52 CUs @1.825 GHz Custom RDNA 2 GPU'),
(571, 41, 'RAM', '16GB GDDR6 w/320b bus'),
(572, 41, 'Storage', '1TB Custom NVME SSD (Support Expansion Card)'),
(573, 41, 'Output Video', 'True 4K @ 120fps, Up to 8K HDR, DirectX Raytracing'),
(574, 41, 'Fitur Utama', 'Quick Resume, Velocity Architecture, Smart Delivery'),
(575, 41, 'Drive Optik', '4K UHD Blu-ray'),
(576, 42, 'Bobot', 'Kurang dari 63 gram (Ultra Lightweight)'),
(577, 42, 'Sensor', 'HERO 25K (100 - 25,600 DPI)'),
(578, 42, 'Konektivitas', 'LIGHTSPEED Wireless (1ms report rate)'),
(579, 42, 'Baterai', 'Hingga 70 jam penggunaan konstan'),
(580, 42, 'Kaki Mouse', 'Large additive-free PTFE feet (Glide halus)'),
(581, 42, 'Prosesor', '32-bit ARM'),
(582, 42, 'Fitur', 'POWERPLAY compatible, Onboard memory'),
(583, 43, 'Standar WiFi', 'WiFi 6E (802.11ax) Tri-Band'),
(584, 43, 'Kecepatan', '5400 Mbps (6GHz: 2402Mbps, 5GHz: 2402Mbps, 2.4GHz: 574Mbps)'),
(585, 43, 'Prosesor', '1.7 GHz Quad-Core CPU'),
(586, 43, 'Antena', '6× High-Performance Antennas'),
(587, 43, 'Fitur Keamanan', 'TP-Link HomeShield & WPA3'),
(588, 43, 'Port USB', '1× USB 3.0 Port'),
(589, 44, 'Tipe Perangkat', 'All-in-one Router, Switch, & Access Point'),
(590, 44, 'WiFi Standard', '802.11ac (WiFi 5) Wave 2'),
(591, 44, 'Port', '4x LAN Gigabit Ports, 1x WAN Gigabit Port'),
(592, 44, 'Fitur Enterprise', 'Integrated UniFi Network Controller Software'),
(593, 44, 'Keamanan', 'Advanced Firewall, IDS/IPS, & DPI'),
(594, 44, 'Antena', 'Internal 4x4 MU-MIMO untuk 5GHz'),
(595, 45, 'Standar WiFi', 'WiFi 6 (802.11ax) Dual-Band'),
(596, 45, 'Kecepatan', '6000 Mbps (4804 Mbps di 5GHz, 1148 Mbps di 2.4GHz)'),
(597, 45, 'Port Ethernet', 'Dual 2.5G Ports (WAN/LAN) + 4x Gigabit LAN'),
(598, 45, 'Prosesor', '2.0 GHz quad-core 64-bit CPU'),
(599, 45, 'Fitur Gaming', 'Mobile Game Mode, Gear Accelerator, OpenNAT'),
(600, 45, 'Keamanan', 'AiProtection Pro bertenaga Trend Micro'),
(601, 46, 'Teknologi Mesh', 'WiFi 6E Tri-Band Mesh System'),
(602, 46, 'Cakupan', 'Hingga 120 meter persegi per router'),
(603, 46, 'Smart Home', 'Matter hub terintegrasi & Thread border router'),
(604, 46, 'Port', '2x Ethernet ports (1 Gbps) per router'),
(605, 46, 'Fitur AI', 'Self-monitoring & Auto-optimization jaringan'),
(606, 46, 'Keamanan', 'Secure Boot & Firmware updates otomatis'),
(607, 47, 'Tipe Perangkat', '5G Mobile Hotspot Router'),
(608, 47, 'Kecepatan 5G', 'Sub-6 5G up to 2.5 Gbps'),
(609, 47, 'WiFi Standard', 'WiFi 6 (AX3600)'),
(610, 47, 'Baterai', '5040 mAh (Hingga 13 jam penggunaan)'),
(611, 47, 'Layar', '2.4\" LCD Touch Screen'),
(612, 47, 'Port', '2.5G Ethernet Port & USB-C'),
(613, 48, 'Standar WiFi', 'WiFi 6 (802.11ax) Dual-Band'),
(614, 48, 'Kecepatan', '2976 Mbps (2402 Mbps @5GHz + 574 Mbps @2.4GHz)'),
(615, 48, 'Bandwidth', 'Support 160MHz high bandwidth'),
(616, 48, 'Prosesor', 'Qualcomm IPQ5000 Dual-core CPU'),
(617, 48, 'Mesh Tech', 'Xiaomi self-developed Mesh (Connect up to 10 devices)'),
(618, 48, 'RAM/ROM', '256MB RAM'),
(619, 49, 'Standar WiFi', 'WiFi 6 (802.11ax) + 802.11ac support'),
(620, 49, 'CPU', 'Quad-Core IPQ-6010 1.8 GHz'),
(621, 49, 'RAM', '1GB RAM'),
(622, 49, 'Port', '1x 2.5G Ethernet, 4x Gigabit Ethernet, 1x USB 3.0'),
(623, 49, 'OS', 'RouterOS v7 (License level 6)'),
(624, 49, 'Antena', 'External high-gain antennas (Up to 5.5 dBi)'),
(625, 50, 'satu', '98798'),
(626, 50, 'dua', '378723979');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peran` enum('superadmin','admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `dibuat_pada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `diperbarui_pada` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `peran`, `is_active`, `dibuat_pada`, `diperbarui_pada`) VALUES
(1, 'Superadmin', 'superadmin@bizponsel.com', '$2y$12$1HT3Sj4AWyCJaN28PLD17uOpX4l4wnQppACV5GLGQUB4NUEF7xyfu', 'superadmin', 1, '2026-05-27 21:26:50', '2026-05-27 21:26:50'),
(2, 'Admin', 'admin@bizponsel.com', '$2y$12$14j2k1AC/6k8AN4OSJmf8uEMBEqzMZUwOylOMqotA4MZE6lE3zth.', 'admin', 1, '2026-05-27 21:26:51', '2026-05-27 21:26:51'),
(3, 'User', 'user@bizponsel.com', '$2y$12$BLxpJxrClQux7zASWIwJPuZ6b/5rxq7aE8kodTVZgEfh60f4jtu5.', 'user', 1, '2026-05-27 21:26:51', '2026-05-27 21:26:51');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `aktivitas`
--
ALTER TABLE `aktivitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aktivitas_cabang_id_foreign` (`cabang_id`);

--
-- Indeks untuk tabel `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_nama_unique` (`nama`);

--
-- Indeks untuk tabel `cabang`
--
ALTER TABLE `cabang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cabang_kode_unique` (`kode`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indeks untuk tabel `favorit`
--
ALTER TABLE `favorit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorit_user_id_produk_id_unique` (`user_id`,`produk_id`),
  ADD KEY `favorit_produk_id_foreign` (`produk_id`);

--
-- Indeks untuk tabel `gambar_produk`
--
ALTER TABLE `gambar_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gambar_produk_produk_id_foreign` (`produk_id`);

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kontak`
--
ALTER TABLE `kontak`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pengaturan`
--
ALTER TABLE `pengaturan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `penjualan_produk`
--
ALTER TABLE `penjualan_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `penjualan_produk_produk_id_foreign` (`produk_id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `produk_slug_unique` (`slug`),
  ADD KEY `produk_kategori_id_foreign` (`kategori_id`),
  ADD KEY `produk_brand_id_foreign` (`brand_id`);

--
-- Indeks untuk tabel `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `promo_produk`
--
ALTER TABLE `promo_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `promo_produk_produk_id_foreign` (`produk_id`),
  ADD KEY `promo_produk_promo_id_foreign` (`promo_id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `spesifikasi_produk`
--
ALTER TABLE `spesifikasi_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `spesifikasi_produk_produk_id_foreign` (`produk_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `aktivitas`
--
ALTER TABLE `aktivitas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `cabang`
--
ALTER TABLE `cabang`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `favorit`
--
ALTER TABLE `favorit`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `gambar_produk`
--
ALTER TABLE `gambar_produk`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `kontak`
--
ALTER TABLE `kontak`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `pengaturan`
--
ALTER TABLE `pengaturan`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `penjualan_produk`
--
ALTER TABLE `penjualan_produk`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=526;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `produk`
--
ALTER TABLE `produk`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT untuk tabel `promo`
--
ALTER TABLE `promo`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `promo_produk`
--
ALTER TABLE `promo_produk`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `spesifikasi_produk`
--
ALTER TABLE `spesifikasi_produk`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=627;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `aktivitas`
--
ALTER TABLE `aktivitas`
  ADD CONSTRAINT `aktivitas_cabang_id_foreign` FOREIGN KEY (`cabang_id`) REFERENCES `cabang` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `favorit`
--
ALTER TABLE `favorit`
  ADD CONSTRAINT `favorit_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorit_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `gambar_produk`
--
ALTER TABLE `gambar_produk`
  ADD CONSTRAINT `gambar_produk_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penjualan_produk`
--
ALTER TABLE `penjualan_produk`
  ADD CONSTRAINT `penjualan_produk_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `produk_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `produk_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `promo_produk`
--
ALTER TABLE `promo_produk`
  ADD CONSTRAINT `promo_produk_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `promo_produk_promo_id_foreign` FOREIGN KEY (`promo_id`) REFERENCES `promo` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `spesifikasi_produk`
--
ALTER TABLE `spesifikasi_produk`
  ADD CONSTRAINT `spesifikasi_produk_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produk` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
