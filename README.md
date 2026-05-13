# BizPonsel Catalog

Aplikasi katalog produk elektronik berbasis web, terdiri dari frontend React dan backend Laravel.

## Tech Stack

| Layer    | Teknologi                              |
|----------|----------------------------------------|
| Frontend | React 19, Vite 8, Tailwind CSS v4      |
| Backend  | Laravel 13, PHP 8.3, Laravel Sanctum   |
| Database | MySQL (via XAMPP)                      |

---

## Struktur Proyek

```
catalog_bisponsel/
├── catalog-fe/     # Frontend (React + Vite)
└── catalog-be/     # Backend (Laravel 13)
```

---

## Cara Menjalankan

### 1. Clone Repo

```bash
git clone https://github.com/Filaindana/catalog_bisponsel.git
cd catalog_bisponsel
```

---

### 2. Backend (Laravel)

```bash
cd catalog-be
cp .env.example .env
composer install
php artisan key:generate
```

Sesuaikan konfigurasi database di `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bizponsel_catalog
DB_USERNAME=root
DB_PASSWORD=
DB_SOCKET=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock  # khusus macOS XAMPP
```

Jalankan migrasi dan seeder:

```bash
php artisan migrate
php artisan db:seed
```

Jalankan server:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

---

### 3. Frontend (React)

```bash
cd catalog-fe
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173` dan melakukan proxy ke backend di port `8000`.

---

## Akun Default (Seeder)

| Role  | Email                    | Password |
|-------|--------------------------|----------|
| Admin | admin@tokoonline.com     | password123 |
| User  | budi@gmail.com           | password123 |

---

## Fitur

- Katalog produk dengan filter kategori, harga, diskon, dan sorting
- Halaman detail produk dengan produk terkait
- Halaman promo dengan ticker dan countdown
- Simpan produk favorit (perlu login)
- Manajemen profil (edit nama, email, password)
- Dashboard admin (produk, promo, cabang, pengaturan)
- Autentikasi menggunakan Laravel Sanctum

---

## Database

Tabel utama:

- `users` — akun pengguna
- `kategori` — kategori produk
- `produks` — data produk
- `gambar_produks` — gambar produk
- `spesifikasi_produks` — spesifikasi produk
- `promos` — data promo
- `favorits` — produk favorit per user
- `cabangs` — data cabang toko
- `kontaks` — pesan dari halaman kontak
