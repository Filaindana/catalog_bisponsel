-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 29 Bulan Mei 2026 pada 08.21
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
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
