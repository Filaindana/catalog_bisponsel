<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

    class ProdukSeeder extends Seeder
    {
        public function run(): void
        {
            DB::table('spesifikasi_produk')->delete();
            DB::table('produk')->delete();

            // kategori_id: 1=Laptop, 2=Smartphone, 3=Aksesoris, 4=Audio, 5=Kamera, 6=Rumah, 7=Gaming, 8=Networking
            $produk = [
                // ── Laptop & Komputer (kategori_id=1) ──────────────────────────
                ['kategori_id' => 1, 'nama' => 'ASUS ROG Zephyrus G14', 'deskripsi' => 'Laptop gaming ultra-slim AMD Ryzen 9, GPU RTX 4060, Layar QHD 165Hz.', 'harga' => 22999000, 'stok' => 15, 'rating' => 4.8, 'adalah_promo' => true, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(40), 'diperbarui_pada' => now()->subDays(2)],
                ['kategori_id' => 1, 'nama' => 'Lenovo ThinkPad X1 Carbon Gen 11', 'deskripsi' => 'Laptop bisnis premium, Intel i7-13th Gen, RAM 16GB, OLED 14 inch.', 'harga' => 28500000, 'stok' => 8, 'rating' => 4.7, 'adalah_promo' => false, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(38), 'diperbarui_pada' => now()->subDays(38)],
                ['kategori_id' => 1, 'nama' => 'MacBook Air M2 13"', 'deskripsi' => 'Chip M2, Baterai 18 jam, Layar Liquid Retina 13.6 inch.', 'harga' => 18999000, 'stok' => 20, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(35), 'diperbarui_pada' => now()->subDays(35)],
                ['kategori_id' => 1, 'nama' => 'Acer Aspire 5 A515', 'deskripsi' => 'Intel Core i5 gen-12, RAM 8GB, SSD 512GB. Cocok untuk harian.', 'harga' => 8499000, 'stok' => 30, 'rating' => 4.3, 'adalah_promo' => true, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(30), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 1, 'nama' => 'Dell XPS 15 OLED', 'deskripsi' => 'Layar OLED 3.5K, Intel Core i9, NVIDIA RTX 4070.', 'harga' => 34500000, 'stok' => 5, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(28), 'diperbarui_pada' => now()->subDays(28)],
                ['kategori_id' => 1, 'nama' => 'HP Victus 15', 'deskripsi' => 'Laptop gaming entry-level, Ryzen 5, RTX 3050, 144Hz screen.', 'harga' => 11500000, 'stok' => 12, 'rating' => 4.4, 'adalah_promo' => false, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(27), 'diperbarui_pada' => now()->subDays(27)],
                ['kategori_id' => 1, 'nama' => 'MSI Katana GF66', 'deskripsi' => 'Gaming laptop, i7-12th Gen, RTX 3060, desain elegan.', 'harga' => 16200000, 'stok' => 10, 'rating' => 4.5, 'adalah_promo' => true, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(26), 'diperbarui_pada' => now()->subDays(5)],

                // ── Smartphone & Tablet (kategori_id=2) ────────────────────────
                ['kategori_id' => 2, 'nama' => 'Samsung Galaxy S24 Ultra', 'deskripsi' => 'Snapdragon 8 Gen 3, Kamera 200MP, S Pen terintegrasi.', 'harga' => 19999000, 'stok' => 25, 'rating' => 4.8, 'adalah_promo' => true, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(25), 'diperbarui_pada' => now()->subDays(3)],
                ['kategori_id' => 2, 'nama' => 'iPhone 15 Pro Max', 'deskripsi' => 'Chip A17 Pro, bodi titanium, kamera Tetraprism telephoto.', 'harga' => 23999000, 'stok' => 18, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(22), 'diperbarui_pada' => now()->subDays(22)],
                ['kategori_id' => 2, 'nama' => 'Xiaomi 14 Pro', 'deskripsi' => 'Snapdragon 8 Gen 3, kamera Leica 50MP, 120W HyperCharge.', 'harga' => 13999000, 'stok' => 30, 'rating' => 4.6, 'adalah_promo' => true, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(20), 'diperbarui_pada' => now()->subDays(4)],
                ['kategori_id' => 2, 'nama' => 'OPPO Find X7 Ultra', 'deskripsi' => 'Kamera Hasselblad, Dimensity 9300, 100W SuperVOOC.', 'harga' => 16500000, 'stok' => 12, 'rating' => 4.7, 'adalah_promo' => false, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(18), 'diperbarui_pada' => now()->subDays(18)],
                ['kategori_id' => 2, 'nama' => 'Samsung Galaxy Tab S9 Ultra', 'deskripsi' => 'Layar 14.6 inch, Snapdragon 8 Gen 2, S Pen, IP68.', 'harga' => 17999000, 'stok' => 10, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(15), 'diperbarui_pada' => now()->subDays(15)],
                ['kategori_id' => 2, 'nama' => 'Google Pixel 8 Pro', 'deskripsi' => 'Chip Tensor G3, kamera AI terbaik, Android murni.', 'harga' => 15500000, 'stok' => 7, 'rating' => 4.7, 'adalah_promo' => false, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(14), 'diperbarui_pada' => now()->subDays(14)],
                ['kategori_id' => 2, 'nama' => 'iPad Pro M2 12.9"', 'deskripsi' => 'Layar Liquid Retina XDR, Chip M2, Thunderbolt support.', 'harga' => 21000000, 'stok' => 15, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(13), 'diperbarui_pada' => now()->subDays(13)],

                // ── Aksesoris Elektronik (kategori_id=3) ───────────────────────
                ['kategori_id' => 3, 'nama' => 'Logitech MX Master 3S', 'deskripsi' => 'Mouse wireless 8000 DPI, scroll MagSpeed senyap.', 'harga' => 1299000, 'stok' => 50, 'rating' => 4.7, 'adalah_promo' => false, 'gambar' => 'products/mouse.png', 'dibuat_pada' => now()->subDays(14), 'diperbarui_pada' => now()->subDays(14)],
                ['kategori_id' => 3, 'nama' => 'Keychron Q1 Pro', 'deskripsi' => 'Keyboard mekanikal wireless 75%, hot-swappable.', 'harga' => 1850000, 'stok' => 35, 'rating' => 4.8, 'adalah_promo' => true, 'gambar' => 'products/keyboard.png', 'dibuat_pada' => now()->subDays(12), 'diperbarui_pada' => now()->subDays(2)],
                ['kategori_id' => 3, 'nama' => 'Anker 733 Power Bank', 'deskripsi' => 'Hybrid charger 65W, kapasitas 10000mAh.', 'harga' => 699000, 'stok' => 80, 'rating' => 4.5, 'adalah_promo' => true, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(10), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 3, 'nama' => 'Razer Goliathus Chroma', 'deskripsi' => 'Mousepad RGB lebar dengan permukaan kain mikro.', 'harga' => 850000, 'stok' => 40, 'rating' => 4.6, 'adalah_promo' => false, 'gambar' => 'products/mouse.png', 'dibuat_pada' => now()->subDays(11), 'diperbarui_pada' => now()->subDays(11)],
                ['kategori_id' => 3, 'nama' => 'Samsung T7 Shield 1TB', 'deskripsi' => 'SSD Eksternal tangguh, tahan jatuh dan air IP65.', 'harga' => 1750000, 'stok' => 25, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/mouse.png', 'dibuat_pada' => now()->subDays(10), 'diperbarui_pada' => now()->subDays(10)],
                ['kategori_id' => 3, 'nama' => 'Baseus GaN5 Pro 100W', 'deskripsi' => 'Charger multiport ringkas untuk laptop dan smartphone.', 'harga' => 450000, 'stok' => 100, 'rating' => 4.7, 'adalah_promo' => true, 'gambar' => 'products/sound.png', 'dibuat_pada' => now()->subDays(9), 'diperbarui_pada' => now()->subDays(1)],

                // ── Audio & Headphone (kategori_id=4) ──────────────────────────
                ['kategori_id' => 4, 'nama' => 'Sony WH-1000XM5', 'deskripsi' => 'Headphone noise cancelling terbaik, 30 jam baterai.', 'harga' => 4999000, 'stok' => 22, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(9), 'diperbarui_pada' => now()->subDays(9)],
                ['kategori_id' => 4, 'nama' => 'Apple AirPods Pro 2', 'deskripsi' => 'TWS chip H2, Active Noise Cancellation, MagSafe Case.', 'harga' => 3799000, 'stok' => 40, 'rating' => 4.8, 'adalah_promo' => true, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(8), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 4, 'nama' => 'JBL Charge 5', 'deskripsi' => 'Speaker Bluetooth IP67, 20 jam playback, powerbank built-in.', 'harga' => 1599000, 'stok' => 45, 'rating' => 4.6, 'adalah_promo' => false, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(7), 'diperbarui_pada' => now()->subDays(7)],
                ['kategori_id' => 4, 'nama' => 'Bose QuietComfort Ultra', 'deskripsi' => 'Immersive audio headphone, kenyamanan maksimal.', 'harga' => 5800000, 'stok' => 15, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(6), 'diperbarui_pada' => now()->subDays(6)],
                ['kategori_id' => 4, 'nama' => 'Sennheiser Momentum TW3', 'deskripsi' => 'Audiophile-grade wireless earbuds, aptX Adaptive.', 'harga' => 3999000, 'stok' => 12, 'rating' => 4.7, 'adalah_promo' => true, 'gambar' => 'products/handphone.png', 'dibuat_pada' => now()->subDays(5), 'diperbarui_pada' => now()->subDays(2)],
                ['kategori_id' => 4, 'nama' => 'Marshall Emberton II', 'deskripsi' => 'Speaker portable ikonik, 30+ jam waktu putar.', 'harga' => 2400000, 'stok' => 20, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(4), 'diperbarui_pada' => now()->subDays(4)],

                // ── Kamera & Fotografi (kategori_id=5) ─────────────────────────
                ['kategori_id' => 5, 'nama' => 'Sony Alpha A7 IV', 'deskripsi' => 'Mirrorless Full-frame 33MP, Video 4K 60fps.', 'harga' => 39999000, 'stok' => 6, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(6), 'diperbarui_pada' => now()->subDays(6)],
                ['kategori_id' => 5, 'nama' => 'DJI Pocket 3', 'deskripsi' => 'Gimbal mini sensor 1 inch, ActiveTrack 6.0.', 'harga' => 7499000, 'stok' => 20, 'rating' => 4.7, 'adalah_promo' => true, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(5), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 5, 'nama' => 'Fujifilm X-T5', 'deskripsi' => 'Kamera APS-C 40MP, desain retro, video 6K.', 'harga' => 26500000, 'stok' => 9, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(10), 'diperbarui_pada' => now()->subDays(10)],
                ['kategori_id' => 5, 'nama' => 'GoPro Hero 12 Black', 'deskripsi' => 'Action cam tangguh, stabilisasi HyperSmooth 6.0.', 'harga' => 6499000, 'stok' => 30, 'rating' => 4.6, 'adalah_promo' => true, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(8), 'diperbarui_pada' => now()->subDays(2)],
                ['kategori_id' => 5, 'nama' => 'Canon EOS R6 Mark II', 'deskripsi' => 'Kamera hybrid cepat, 40fps burst shooting.', 'harga' => 36000000, 'stok' => 5, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/laptop.png', 'dibuat_pada' => now()->subDays(7), 'diperbarui_pada' => now()->subDays(7)],

                // ── Rumah Pintar / Smart Home (kategori_id=6) ───────────────────
                ['kategori_id' => 6, 'nama' => 'Xiaomi Mi Smart Air Purifier 4', 'deskripsi' => 'Pembersih udara dengan filter HEPA, kontrol via App.', 'harga' => 2200000, 'stok' => 25, 'rating' => 4.7, 'adalah_promo' => true, 'gambar' => 'products/monitor.png', 'dibuat_pada' => now()->subDays(15), 'diperbarui_pada' => now()->subDays(3)],
                ['kategori_id' => 6, 'nama' => 'Roborock S8 Robot Vacuum', 'deskripsi' => 'Robot pembersih dengan daya hisap 6000Pa.', 'harga' => 8900000, 'stok' => 10, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/monitor.png', 'dibuat_pada' => now()->subDays(12), 'diperbarui_pada' => now()->subDays(12)],
                ['kategori_id' => 6, 'nama' => 'Philips Hue Bridge', 'deskripsi' => 'Otak dari sistem pencahayaan pintar Philips Hue.', 'harga' => 950000, 'stok' => 40, 'rating' => 4.5, 'adalah_promo' => false, 'gambar' => 'products/monitor.png', 'dibuat_pada' => now()->subDays(10), 'diperbarui_pada' => now()->subDays(10)],
                ['kategori_id' => 6, 'nama' => 'Bardi Smart Light Bulb 12W', 'deskripsi' => 'Lampu RGB pintar dengan jutaan warna, support Google Home.', 'harga' => 125000, 'stok' => 150, 'rating' => 4.6, 'adalah_promo' => true, 'gambar' => 'products/monitor.png', 'dibuat_pada' => now()->subDays(20), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 6, 'nama' => 'Ecobee Smart Thermostat', 'deskripsi' => 'Pengatur suhu ruangan pintar penghemat energi.', 'harga' => 3200000, 'stok' => 8, 'rating' => 4.4, 'adalah_promo' => false, 'gambar' => 'products/monitor.png', 'dibuat_pada' => now()->subDays(5), 'diperbarui_pada' => now()->subDays(5)],

                // ── Gaming (kategori_id=7) ──────────────────────────────────────
                ['kategori_id' => 7, 'nama' => 'PlayStation 5 Slim', 'deskripsi' => 'Konsol gaming Sony SSD 825GB, 4K gaming.', 'harga' => 8999000, 'stok' => 15, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/keyboard.png', 'dibuat_pada' => now()->subDays(4), 'diperbarui_pada' => now()->subDays(4)],
                ['kategori_id' => 7, 'nama' => 'ASUS ROG Ally', 'deskripsi' => 'Handheld gaming PC, Ryzen Z1 Extreme, 120Hz.', 'harga' => 9999000, 'stok' => 12, 'rating' => 4.6, 'adalah_promo' => true, 'gambar' => 'products/keyboard.png', 'dibuat_pada' => now()->subDays(3), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 7, 'nama' => 'Nintendo Switch OLED', 'deskripsi' => 'Konsol hybrid layar OLED 7 inch, warna vibrant.', 'harga' => 4500000, 'stok' => 25, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/keyboard.png', 'dibuat_pada' => now()->subDays(20), 'diperbarui_pada' => now()->subDays(20)],
                ['kategori_id' => 7, 'nama' => 'SteelSeries Arctis Nova Pro', 'deskripsi' => 'Headset gaming high-fidelity dengan DAC.', 'harga' => 5200000, 'stok' => 10, 'rating' => 4.7, 'adalah_promo' => true, 'gambar' => 'products/keyboard.png', 'dibuat_pada' => now()->subDays(10), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 7, 'nama' => 'Xbox Series X', 'deskripsi' => 'Konsol Microsoft terkuat, 12 Teraflops power.', 'harga' => 8500000, 'stok' => 8, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/keyboard.png', 'dibuat_pada' => now()->subDays(15), 'diperbarui_pada' => now()->subDays(15)],
                ['kategori_id' => 7, 'nama' => 'Logitech G Pro X Superlight', 'deskripsi' => 'Mouse gaming ultra ringan untuk kompetitif.', 'harga' => 1800000, 'stok' => 30, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/keyboard.png', 'dibuat_pada' => now()->subDays(11), 'diperbarui_pada' => now()->subDays(11)],

                // ── Networking (kategori_id=8) ──────────────────────────────────
                ['kategori_id' => 8, 'nama' => 'TP-Link Archer AXE75', 'deskripsi' => 'Router WiFi 6E tri-band kecepatan 5400Mbps.', 'harga' => 1999000, 'stok' => 28, 'rating' => 4.5, 'adalah_promo' => false, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(2), 'diperbarui_pada' => now()->subDays(2)],
                ['kategori_id' => 8, 'nama' => 'Ubiquiti UniFi Dream Machine', 'deskripsi' => 'All-in-one console untuk networking enterprise.', 'harga' => 6500000, 'stok' => 5, 'rating' => 4.9, 'adalah_promo' => false, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(30), 'diperbarui_pada' => now()->subDays(30)],
                ['kategori_id' => 8, 'nama' => 'ASUS RT-AX88U Pro', 'deskripsi' => 'Router gaming WiFi 6 dengan perlindungan AiProtection.', 'harga' => 4800000, 'stok' => 10, 'rating' => 4.7, 'adalah_promo' => true, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(5), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 8, 'nama' => 'Google Nest WiFi Pro', 'deskripsi' => 'Sistem mesh WiFi 6E yang cerdas dan estetik.', 'harga' => 3500000, 'stok' => 15, 'rating' => 4.6, 'adalah_promo' => false, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(10), 'diperbarui_pada' => now()->subDays(10)],
                ['kategori_id' => 8, 'nama' => 'Netgear Nighthawk M6', 'deskripsi' => 'Mobile hotspot 5G tercepat untuk traveling.', 'harga' => 9500000, 'stok' => 4, 'rating' => 4.8, 'adalah_promo' => false, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(20), 'diperbarui_pada' => now()->subDays(20)],
                ['kategori_id' => 8, 'nama' => 'Xiaomi AX3000 Mesh', 'deskripsi' => 'Solusi mesh murah dengan performa WiFi 6 stabil.', 'harga' => 990000, 'stok' => 40, 'rating' => 4.4, 'adalah_promo' => true, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(8), 'diperbarui_pada' => now()->subDays(1)],
                ['kategori_id' => 8, 'nama' => 'MikroTik hAP ax3', 'deskripsi' => 'Router modern dengan dukungan hardware encryption.', 'harga' => 2100000, 'stok' => 20, 'rating' => 4.7, 'adalah_promo' => false, 'gambar' => 'products/kabel.png', 'dibuat_pada' => now()->subDays(12), 'diperbarui_pada' => now()->subDays(12)],
            ];


            $detailMap = DetailDeskripsiSeeder::get();

             foreach ($produk as $item) {

                $colors = $this->randomColors();
                $colorLabels = $this->randomColorLabels(count($colors));
                $images = $this->randomImages($item['gambar']);
                $specs = $this->randomSpecs();

                // 🔥 ambil berdasarkan nama
                $deskripsiDetail = $detailMap[$item['nama']] ?? 'Deskripsi produk belum tersedia.';

                // INSERT PRODUK
                $produkId = DB::table('produk')->insertGetId([
                    ...$item,
                    'slug' => Str::slug($item['nama']),
                    'deskripsi_detail' => $deskripsiDetail, // 🔥 INI DIA
                    'colors' => json_encode($colors),
                    'color_labels' => json_encode($colorLabels),
                    'images' => json_encode($images),
                    // 'specs' => json_encode($specs),
                    'reviews' => 0,
                    'dibuat_pada' => now(),
                    'diperbarui_pada' => now(),
                ]);

                // INSERT KE TABEL RELASI
                foreach ($specs as $spec) {
                    DB::table('spesifikasi_produk')->insert([
                        'produk_id' => $produkId,
                        'atribut' => $spec['attribute'],
                        'detail' => $spec['detail'],
                    ]);
                }
            }

            $this->command->info('✅ Seeder berhasil! Data produk lengkap + relasi masuk.');
        }

        // ================= HELPER =================

        private function randomColors()
        {
            $colors = ["#1e1e1e","#1a3a5c","#5c1a1a","#2d5c1a","#5c3a1a"];
            shuffle($colors);
            return array_slice($colors, 0, rand(2,4));
        }

        private function randomColorLabels($count)
        {
            $labels = ["Onyx Black","Navy Blue","Cardinal Red","Forest Green","Amber Brown"];
            shuffle($labels);
            return array_slice($labels, 0, $count);
        }

        private function randomSpecs()
        {
            $allSpecs = [
                ["attribute"=>"Prosesor","detail"=>"AMD Ryzen 7 7700X"],
                ["attribute"=>"GPU","detail"=>"RTX 4060"],
                ["attribute"=>"RAM","detail"=>"16GB DDR5"],
                ["attribute"=>"Storage","detail"=>"SSD 1TB"],
                ["attribute"=>"OS","detail"=>"Windows 11"],
            ];

            shuffle($allSpecs);
            return array_slice($allSpecs, 0, rand(3,5));
        }

        private function randomImages($gambar)
        {
            return [
                $gambar,
                $gambar,
                $gambar
            ];
        }
    }
