<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('produk')->delete();

        // kategori_id: 1=Laptop, 2=Smartphone, 3=Aksesoris, 4=Audio, 5=Kamera, 6=Rumah, 7=Gaming, 8=Networking
        $produk = [
            // ── Laptop & Komputer (kategori_id=1) ──────────────────────────
            [
                'kategori_id'  => 1,
                'nama'         => 'ASUS ROG Zephyrus G14',
                'deskripsi'    => 'Laptop gaming ultra-slim dengan prosesor AMD Ryzen 9 dan GPU NVIDIA RTX 4060. Layar QHD 165Hz dengan kecepatan respons tinggi, cocok untuk gaming dan kreator konten.',
                'harga'        => 22999000,
                'stok'         => 15,
                'rating'       => 4.8,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(40),
                'diperbarui_pada' => now()->subDays(2),
            ],
            [
                'kategori_id'  => 1,
                'nama'         => 'Lenovo ThinkPad X1 Carbon Gen 11',
                'deskripsi'    => 'Laptop bisnis premium dengan bobot hanya 1.12 kg. Dilengkapi Intel Core i7 generasi ke-13, RAM 16GB LPDDR5, dan layar OLED 14 inch anti-glare.',
                'harga'        => 28500000,
                'stok'         => 8,
                'rating'       => 4.7,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(38),
                'diperbarui_pada' => now()->subDays(38),
            ],
            [
                'kategori_id'  => 1,
                'nama'         => 'MacBook Air M2 13"',
                'deskripsi'    => 'Laptop tipis Apple dengan chip M2 yang revolusioner. Performa luar biasa, baterai tahan hingga 18 jam, dan layar Liquid Retina 13.6 inch.',
                'harga'        => 18999000,
                'stok'         => 20,
                'rating'       => 4.9,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(35),
                'diperbarui_pada' => now()->subDays(35),
            ],
            [
                'kategori_id'  => 1,
                'nama'         => 'Acer Aspire 5 A515',
                'deskripsi'    => 'Laptop harian yang terjangkau dengan Intel Core i5 gen-12, RAM 8GB, dan SSD 512GB. Cocok untuk pelajar dan pekerja kantoran.',
                'harga'        => 8499000,
                'stok'         => 30,
                'rating'       => 4.3,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(30),
                'diperbarui_pada' => now()->subDays(1),
            ],
            [
                'kategori_id'  => 1,
                'nama'         => 'Dell XPS 15 OLED',
                'deskripsi'    => 'Laptop premium dengan layar OLED 3.5K yang menakjubkan, Intel Core i9, dan NVIDIA RTX 4070. Pilihan terbaik untuk profesional kreatif.',
                'harga'        => 34500000,
                'stok'         => 5,
                'rating'       => 4.9,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(28),
                'diperbarui_pada' => now()->subDays(28),
            ],

            // ── Smartphone & Tablet (kategori_id=2) ────────────────────────
            [
                'kategori_id'  => 2,
                'nama'         => 'Samsung Galaxy S24 Ultra',
                'deskripsi'    => 'Flagship Android terbaru dengan Snapdragon 8 Gen 3, kamera 200MP, layar Dynamic AMOLED 2X 6.8 inch, dan S Pen terintegrasi.',
                'harga'        => 19999000,
                'stok'         => 25,
                'rating'       => 4.8,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(25),
                'diperbarui_pada' => now()->subDays(3),
            ],
            [
                'kategori_id'  => 2,
                'nama'         => 'iPhone 15 Pro Max',
                'deskripsi'    => 'Smartphone Apple terdepan dengan chip A17 Pro, kamera sistem pro dengan Tetraprism telephoto, dan bodi titanium yang elegan.',
                'harga'        => 23999000,
                'stok'         => 18,
                'rating'       => 4.9,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(22),
                'diperbarui_pada' => now()->subDays(22),
            ],
            [
                'kategori_id'  => 2,
                'nama'         => 'Xiaomi 14 Pro',
                'deskripsi'    => 'Smartphone premium Xiaomi dengan Snapdragon 8 Gen 3, kamera Leica 50MP, pengisian cepat 120W HyperCharge, dan layar AMOLED 2K.',
                'harga'        => 13999000,
                'stok'         => 30,
                'rating'       => 4.6,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(20),
                'diperbarui_pada' => now()->subDays(4),
            ],
            [
                'kategori_id'  => 2,
                'nama'         => 'OPPO Find X7 Ultra',
                'deskripsi'    => 'Smartphone flagship OPPO dengan kamera Hasselblad, Dimensity 9300, layar 6.82 inch LTPO AMOLED, dan baterai 5000mAh SuperVOOC 100W.',
                'harga'        => 16500000,
                'stok'         => 12,
                'rating'       => 4.7,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(18),
                'diperbarui_pada' => now()->subDays(18),
            ],
            [
                'kategori_id'  => 2,
                'nama'         => 'Samsung Galaxy Tab S9 Ultra',
                'deskripsi'    => 'Tablet Android premium dengan layar AMOLED 14.6 inch, Snapdragon 8 Gen 2, S Pen, dan RAM 12GB. Ideal untuk produktivitas dan hiburan.',
                'harga'        => 17999000,
                'stok'         => 10,
                'rating'       => 4.8,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(15),
                'diperbarui_pada' => now()->subDays(15),
            ],

            // ── Aksesoris Elektronik (kategori_id=3) ───────────────────────
            [
                'kategori_id'  => 3,
                'nama'         => 'Logitech MX Master 3S',
                'deskripsi'    => 'Mouse wireless premium untuk profesional dengan sensor 8000 DPI, scroll MagSpeed senyap, dan koneksi multi-device Bolt & Bluetooth.',
                'harga'        => 1299000,
                'stok'         => 50,
                'rating'       => 4.7,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(14),
                'diperbarui_pada' => now()->subDays(14),
            ],
            [
                'kategori_id'  => 3,
                'nama'         => 'Keychron Q1 Pro Mechanical Keyboard',
                'deskripsi'    => 'Keyboard mekanikal wireless 75% dengan layout QMK/VIA, hot-swappable switch, dan gasket mount. Tersedia dengan switch Gateron Pro Brown.',
                'harga'        => 1850000,
                'stok'         => 35,
                'rating'       => 4.8,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(12),
                'diperbarui_pada' => now()->subDays(2),
            ],
            [
                'kategori_id'  => 3,
                'nama'         => 'Anker 733 Power Bank & Charger',
                'deskripsi'    => 'Power bank 2-in-1 dengan GaNPrime 65W yang bisa sekaligus menjadi charger dinding. Kapasitas 10000mAh dengan 3 port output.',
                'harga'        => 699000,
                'stok'         => 80,
                'rating'       => 4.5,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(10),
                'diperbarui_pada' => now()->subDays(1),
            ],

            // ── Audio & Headphone (kategori_id=4) ──────────────────────────
            [
                'kategori_id'  => 4,
                'nama'         => 'Sony WH-1000XM5',
                'deskripsi'    => 'Headphone over-ear dengan noise cancelling terbaik di kelasnya. 8 mikrofon, 30 jam baterai, dan audio Hi-Res Wireless dengan LDAC.',
                'harga'        => 4999000,
                'stok'         => 22,
                'rating'       => 4.9,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(9),
                'diperbarui_pada' => now()->subDays(9),
            ],
            [
                'kategori_id'  => 4,
                'nama'         => 'Apple AirPods Pro 2nd Gen',
                'deskripsi'    => 'TWS earbuds Apple dengan Active Noise Cancellation, Adaptive Transparency, chip H2, dan case MagSafe. Ideal untuk pengguna iPhone.',
                'harga'        => 3799000,
                'stok'         => 40,
                'rating'       => 4.8,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(8),
                'diperbarui_pada' => now()->subDays(1),
            ],
            [
                'kategori_id'  => 4,
                'nama'         => 'JBL Charge 5',
                'deskripsi'    => 'Speaker Bluetooth portable dengan IP67 waterproof, 20 jam playback, dan PowerBank built-in. Bass ekstra dalam yang khas JBL.',
                'harga'        => 1599000,
                'stok'         => 45,
                'rating'       => 4.6,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(7),
                'diperbarui_pada' => now()->subDays(7),
            ],

            // ── Kamera & Fotografi (kategori_id=5) ─────────────────────────
            [
                'kategori_id'  => 5,
                'nama'         => 'Sony Alpha A7 IV',
                'deskripsi'    => 'Kamera mirrorless full-frame 33MP dengan autofokus AI real-time, video 4K 60fps, dan dual card slot. Pilihan utama fotografer profesional.',
                'harga'        => 39999000,
                'stok'         => 6,
                'rating'       => 4.9,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(6),
                'diperbarui_pada' => now()->subDays(6),
            ],
            [
                'kategori_id'  => 5,
                'nama'         => 'DJI Pocket 3',
                'deskripsi'    => 'Kamera gimbal mini dengan sensor 1 inch, video 4K 120fps, layar sentuh 2 inch putar, dan ActiveTrack 360 otomatis.',
                'harga'        => 7499000,
                'stok'         => 20,
                'rating'       => 4.7,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(5),
                'diperbarui_pada' => now()->subDays(1),
            ],

            // ── Gaming (kategori_id=7) ──────────────────────────────────────
            [
                'kategori_id'  => 7,
                'nama'         => 'PlayStation 5 Slim',
                'deskripsi'    => 'Konsol gaming terbaru Sony dengan prosesor custom AMD Zen2, GPU RDNA2, SSD 825GB ultra-cepat, dan dukungan ray tracing serta 4K gaming.',
                'harga'        => 8999000,
                'stok'         => 15,
                'rating'       => 4.9,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(4),
                'diperbarui_pada' => now()->subDays(4),
            ],
            [
                'kategori_id'  => 7,
                'nama'         => 'ASUS ROG Ally',
                'deskripsi'    => 'Handheld gaming PC dengan AMD Ryzen Z1 Extreme, layar 7 inch FHD 120Hz, Windows 11, dan kompatibel dengan semua game PC.',
                'harga'        => 9999000,
                'stok'         => 12,
                'rating'       => 4.6,
                'adalah_promo' => true,
                'dibuat_pada'  => now()->subDays(3),
                'diperbarui_pada' => now()->subDays(1),
            ],

            // ── Networking (kategori_id=8) ──────────────────────────────────
            [
                'kategori_id'  => 8,
                'nama'         => 'TP-Link Archer AXE75 WiFi 6E',
                'deskripsi'    => 'Router WiFi 6E tri-band dengan kecepatan hingga 5400Mbps, 6 antena, dan band 6GHz eksklusif untuk koneksi ultra-cepat dan latensi rendah.',
                'harga'        => 1999000,
                'stok'         => 28,
                'rating'       => 4.5,
                'adalah_promo' => false,
                'dibuat_pada'  => now()->subDays(2),
                'diperbarui_pada' => now()->subDays(2),
            ],
        ];

        DB::table('produk')->insert($produk);

        $this->command->info('✅ ProdukSeeder: ' . count($produk) . ' produk berhasil dibuat.');
    }
}
