<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpesifikasiProdukSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('spesifikasi_produk')->delete();

        $spesifikasi = [
            // Produk 1 - ASUS ROG Zephyrus G14
            ['produk_id' => 1, 'atribut' => 'Prosesor',     'detail' => 'AMD Ryzen 9 7940HS (8 Core, 16 Threads, up to 5.2GHz)'],
            ['produk_id' => 1, 'atribut' => 'GPU',           'detail' => 'NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP up to 125W)'],
            ['produk_id' => 1, 'atribut' => 'RAM',           'detail' => '16GB DDR5 4800MHz (Dual Channel Support)'],
            ['produk_id' => 1, 'atribut' => 'Storage',       'detail' => '1TB M.2 NVMe PCIe 4.0 SSD'],
            ['produk_id' => 1, 'atribut' => 'Layar',         'detail' => '14" ROG Nebula Display QHD+ (2560x1600) 165Hz, 100% DCI-P3'],
            ['produk_id' => 1, 'atribut' => 'Baterai',       'detail' => '76Whrs, 4-cell Li-ion, Support 100W Type-C Charging'],
            ['produk_id' => 1, 'atribut' => 'Bobot',         'detail' => '1.65 kg (Sangat Ringan untuk Laptop Gaming)'],
            ['produk_id' => 1, 'atribut' => 'Fitur Khusus',  'detail' => 'AniMe Matrix LED display pada cover, MUX Switch + NVIDIA Advanced Optimus'],
            ['produk_id' => 1, 'atribut' => 'Konektivitas',  'detail' => 'Wi-Fi 6E, Bluetooth 5.3, USB 4.0 Support'],
            ['produk_id' => 1, 'atribut' => 'OS',            'detail' => 'Windows 11 Home'],

            // Produk 2 - Lenovo ThinkPad X1 Carbon Gen 11
            ['produk_id' => 2, 'atribut' => 'Prosesor',     'detail' => 'Intel Core i7-1365U vPro (10 Core, up to 5.2GHz)'],
            ['produk_id' => 2, 'atribut' => 'RAM',           'detail' => '16GB LPDDR5 5200MHz (Soldered)'],
            ['produk_id' => 2, 'atribut' => 'Storage',       'detail' => '512GB M.2 PCIe Gen4 NVMe Performance SSD'],
            ['produk_id' => 2, 'atribut' => 'Layar',         'detail' => '14" OLED 2.8K (2880x1800) 400 nits, 100% DCI-P3, HDR True Black 500'],
            ['produk_id' => 2, 'atribut' => 'Grafis',        'detail' => 'Intel Iris Xe Graphics'],
            ['produk_id' => 2, 'atribut' => 'Baterai',       'detail' => '57Wh, Rapid Charge (isi daya 80% dalam 60 menit)'],
            ['produk_id' => 2, 'atribut' => 'Bobot',         'detail' => '1.12 kg (Bahan Carbon Fiber premium)'],
            ['produk_id' => 2, 'atribut' => 'Kamera',        'detail' => '1080p FHD & IR Camera dengan Privacy Shutter'],
            ['produk_id' => 2, 'atribut' => 'Keamanan',      'detail' => 'Fingerprint Reader, dTPM 2.0, Kensington Nano Security Slot'],
            ['produk_id' => 2, 'atribut' => 'OS',            'detail' => 'Windows 11 Pro'],

            // Produk 3 - MacBook Air M2 13"
            ['produk_id' => 3, 'atribut' => 'Chip',          'detail' => 'Apple M2 (8-core CPU, 8-core GPU, 16-core Neural Engine)'],
            ['produk_id' => 3, 'atribut' => 'RAM',           'detail' => '8GB Unified Memory'],
            ['produk_id' => 3, 'atribut' => 'Storage',       'detail' => '256GB Superfast SSD'],
            ['produk_id' => 3, 'atribut' => 'Layar',         'detail' => '13.6" Liquid Retina Display (2560x1664) with True Tone, 500 nits'],
            ['produk_id' => 3, 'atribut' => 'Baterai',       'detail' => 'Hingga 18 jam pemutaran film aplikasi Apple TV'],
            ['produk_id' => 3, 'atribut' => 'Kamera',        'detail' => '1080p FaceTime HD camera'],
            ['produk_id' => 3, 'atribut' => 'Audio',         'detail' => 'Four-speaker sound system with Spatial Audio support'],
            ['produk_id' => 3, 'atribut' => 'Port',          'detail' => 'MagSafe 3 charging port, 2x Thunderbolt / USB 4 ports, 3.5mm Headphone jack'],
            ['produk_id' => 3, 'atribut' => 'Bobot',         'detail' => '1.24 kg'],
            ['produk_id' => 3, 'atribut' => 'OS',            'detail' => 'macOS (Versi terbaru)'],

            // Produk 4 - Acer Aspire 5 A515
            ['produk_id' => 4, 'atribut' => 'Prosesor',     'detail' => 'Intel Core i5-1235U (10 Core, up to 4.4GHz)'],
            ['produk_id' => 4, 'atribut' => 'RAM',           'detail' => '8GB DDR4 3200MHz (Upgradeable up to 24GB)'],
            ['produk_id' => 4, 'atribut' => 'Storage',       'detail' => '512GB NVMe Gen4 SSD (Tersedia slot HDD/SSD tambahan)'],
            ['produk_id' => 4, 'atribut' => 'Layar',         'detail' => '15.6" Full HD (1920x1080) Acer ComfyView LED-backlit TFT LCD'],
            ['produk_id' => 4, 'atribut' => 'Grafis',        'detail' => 'Intel Iris Xe Graphics'],
            ['produk_id' => 4, 'atribut' => 'Baterai',       'detail' => '50Wh 3-cell Li-ion, Hingga 7 jam penggunaan harian'],
            ['produk_id' => 4, 'atribut' => 'Konektivitas',  'detail' => 'Wi-Fi 6, Bluetooth 5.1, Gigabit Ethernet (RJ-45)'],
            ['produk_id' => 4, 'atribut' => 'Port',          'detail' => '1x HDMI 2.1, 3x USB 3.2 Gen 1, 1x USB Type-C (Thunderbolt 4)'],
            ['produk_id' => 4, 'atribut' => 'Bobot',         'detail' => '1.77 kg'],
            ['produk_id' => 4, 'atribut' => 'OS',            'detail' => 'Windows 11 Home + Office Home & Student 2021'],

            // Produk 5 - Dell XPS 15 OLED
            ['produk_id' => 5, 'atribut' => 'Prosesor',     'detail' => 'Intel Core i9-13900H (14 Core, 20 Threads, up to 5.4GHz)'],
            ['produk_id' => 5, 'atribut' => 'GPU',           'detail' => 'NVIDIA GeForce RTX 4070 8GB GDDR6 (40W)'],
            ['produk_id' => 5, 'atribut' => 'RAM',           'detail' => '32GB DDR5 4800MHz (2x16GB, Dual Channel)'],
            ['produk_id' => 5, 'atribut' => 'Storage',       'detail' => '1TB M.2 PCIe Gen4 NVMe SSD'],
            ['produk_id' => 5, 'atribut' => 'Layar',         'detail' => '15.6" 3.5K (3456x2160) InfinityEdge OLED Touch, 400 nits, 100% DCI-P3'],
            ['produk_id' => 5, 'atribut' => 'Baterai',       'detail' => '86Wh (6-Cell), 130W USB-C Power Adapter'],
            ['produk_id' => 5, 'atribut' => 'Audio',         'detail' => 'Studio quality tuning dengan Waves MaxxAudio Pro dan Waves Nx 3D audio'],
            ['produk_id' => 5, 'atribut' => 'Material',      'detail' => 'CNC machined aluminum with carbon fiber palm rest'],
            ['produk_id' => 5, 'atribut' => 'Port',          'detail' => '2x Thunderbolt 4 (USB-C), 1x USB-C 3.2 Gen 2, Full-size SD card reader'],
            ['produk_id' => 5, 'atribut' => 'OS',            'detail' => 'Windows 11 Pro'],

            // Produk 6 - HP Victus 15
            ['produk_id' => 6, 'atribut' => 'Prosesor',     'detail' => 'AMD Ryzen 5 7535HS (6 Core, 12 Threads, up to 4.5GHz)'],
            ['produk_id' => 6, 'atribut' => 'GPU',           'detail' => 'NVIDIA GeForce RTX 3050 4GB GDDR6'],
            ['produk_id' => 6, 'atribut' => 'RAM',           'detail' => '8GB DDR5 4800MHz (Upgradeable up to 32GB)'],
            ['produk_id' => 6, 'atribut' => 'Storage',       'detail' => '512GB PCIe Gen4 NVMe M.2 SSD'],
            ['produk_id' => 6, 'atribut' => 'Layar',         'detail' => '15.6" FHD (1920x1080) 144Hz, IPS, Micro-edge, Anti-glare'],
            ['produk_id' => 6, 'atribut' => 'Baterai',       'detail' => '70Wh 4-cell Li-ion polymer, 200W Smart AC Adapter'],
            ['produk_id' => 6, 'atribut' => 'Sistem Pendingin', 'detail' => 'Dual speakers by B&O, Thermal management ditingkatkan'],
            ['produk_id' => 6, 'atribut' => 'Kamera',        'detail' => 'HP Wide Vision 720p HD camera with temporal noise reduction'],
            ['produk_id' => 6, 'atribut' => 'Bobot',         'detail' => '2.29 kg'],
            ['produk_id' => 6, 'atribut' => 'OS',            'detail' => 'Windows 11 Home'],

            // Produk 7 - MSI Katana GF66
            ['produk_id' => 7, 'atribut' => 'Prosesor',     'detail' => 'Intel Core i7-12650H (10 Core, 16 Threads, up to 4.7GHz)'],
            ['produk_id' => 7, 'atribut' => 'GPU',           'detail' => 'NVIDIA GeForce RTX 3060 6GB GDDR6 (TGP up to 105W)'],
            ['produk_id' => 7, 'atribut' => 'RAM',           'detail' => '16GB DDR4 3200MHz (2x8GB, Dual Channel)'],
            ['produk_id' => 7, 'atribut' => 'Storage',       'detail' => '512GB NVMe PCIe Gen4 SSD'],
            ['produk_id' => 7, 'atribut' => 'Layar',         'detail' => '15.6" FHD (1920x1080) 144Hz, IPS-Level Thin Bezel'],
            ['produk_id' => 7, 'atribut' => 'Keyboard',      'detail' => 'Red Backlit Gaming Keyboard'],
            ['produk_id' => 7, 'atribut' => 'Baterai',       'detail' => '53.5Wh 3-cell Li-Polymer, 180W Power Adapter'],
            ['produk_id' => 7, 'atribut' => 'Sistem Pendingin', 'detail' => 'Cooler Boost 5 (2 Fans & 6 Heat Pipes)'],
            ['produk_id' => 7, 'atribut' => 'Konektivitas',  'detail' => 'Gigabit LAN, Wi-Fi 6, Bluetooth 5.2'],
            ['produk_id' => 7, 'atribut' => 'OS',            'detail' => 'Windows 11 Home'],

            // Produk 8 - Samsung Galaxy S24 Ultra
            ['produk_id' => 8, 'atribut' => 'Prosesor',     'detail' => 'Snapdragon 8 Gen 3 for Galaxy (4nm)'],
            ['produk_id' => 8, 'atribut' => 'RAM',           'detail' => '12GB LPDDR5X'],
            ['produk_id' => 8, 'atribut' => 'Storage',       'detail' => '256GB / 512GB / 1TB UFS 4.0'],
            ['produk_id' => 8, 'atribut' => 'Layar',         'detail' => '6.8" Dynamic LTPO AMOLED 2X, QHD+, 120Hz, 2600 nits, Gorilla Armor'],
            ['produk_id' => 8, 'atribut' => 'Kamera Utama',  'detail' => 'Quad 200MP (Wide) + 50MP (5x Periscope) + 10MP (3x Tele) + 12MP (Ultra-wide)'],
            ['produk_id' => 8, 'atribut' => 'Baterai',       'detail' => '5000mAh, 45W Fast Charging, 15W Wireless Charging'],
            ['produk_id' => 8, 'atribut' => 'Material',      'detail' => 'Titanium Frame, IP68 Dust/Water Resistant'],
            ['produk_id' => 8, 'atribut' => 'Fitur AI',      'detail' => 'Galaxy AI (Circle to Search, Live Translate, Note Assist)'],
            ['produk_id' => 8, 'atribut' => 'S-Pen',         'detail' => 'Built-in S-Pen dengan Bluetooth (Latensi 2.8ms)'],
            ['produk_id' => 8, 'atribut' => 'OS',            'detail' => 'Android 14, One UI 6.1 (Update hingga 7 tahun)'],

            // Produk 9 - iPhone 15 Pro Max
            ['produk_id' => 9, 'atribut' => 'Chip',          'detail' => 'Apple A17 Pro (6-core CPU, 6-core GPU, 16-core Neural Engine)'],
            ['produk_id' => 9, 'atribut' => 'RAM',           'detail' => '8GB LPDDR5X'],
            ['produk_id' => 9, 'atribut' => 'Storage',       'detail' => '256GB / 512GB / 1TB NVMe'],
            ['produk_id' => 9, 'atribut' => 'Layar',         'detail' => '6.7" LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 2000 nits'],
            ['produk_id' => 9, 'atribut' => 'Kamera Utama',  'detail' => '48MP (Wide) + 12MP (5x Periscope Telephoto) + 12MP (Ultra-wide) + LiDAR'],
            ['produk_id' => 9, 'atribut' => 'Baterai',       'detail' => '4441mAh, USB-C 3.0, 15W MagSafe Wireless Charging'],
            ['produk_id' => 9, 'atribut' => 'Material',      'detail' => 'Titanium Grade 5 Frame, Ceramic Shield Front, IP68'],
            ['produk_id' => 9, 'atribut' => 'Fitur Khusus',  'detail' => 'Action Button, Dynamic Island, Log Video Recording'],
            ['produk_id' => 9, 'atribut' => 'Konektivitas',  'detail' => '5G, Wi-Fi 6E, Bluetooth 5.3, Second-gen Ultra Wideband (UWB)'],
            ['produk_id' => 9, 'atribut' => 'OS',            'detail' => 'iOS 17 (Upgradeable to latest version)'],

            // Produk 10 - Xiaomi 14 Pro
            ['produk_id' => 10, 'atribut' => 'Prosesor',     'detail' => 'Snapdragon 8 Gen 3 (4nm)'],
            ['produk_id' => 10, 'atribut' => 'RAM',           'detail' => '12GB / 16GB LPDDR5X'],
            ['produk_id' => 10, 'atribut' => 'Storage',       'detail' => '256GB / 512GB / 1TB UFS 4.0'],
            ['produk_id' => 10, 'atribut' => 'Layar',         'detail' => '6.73" LTPO AMOLED (3200 x 1440), 120Hz, 3000 nits, Xiaomi Ceramic Glass'],
            ['produk_id' => 10, 'atribut' => 'Kamera Utama',  'detail' => 'Triple 50MP Leica: Main (Variable Aperture) + Floating Telephoto + Ultra-wide'],
            ['produk_id' => 10, 'atribut' => 'Baterai',       'detail' => '4880mAh, 120W HyperCharge (100% dalam 18 menit), 50W Wireless'],
            ['produk_id' => 10, 'atribut' => 'Material',      'detail' => 'Aluminum/Titanium frame, IP68 Dust/Water Resistant'],
            ['produk_id' => 10, 'atribut' => 'Audio',         'detail' => 'Stereo Speakers, Dolby Atmos, Hi-Res Audio'],
            ['produk_id' => 10, 'atribut' => 'Konektivitas',  'detail' => 'Wi-Fi 7, Bluetooth 5.4, NFC, USB-C 3.2 Gen 2'],
            ['produk_id' => 10, 'atribut' => 'OS',            'detail' => 'Xiaomi HyperOS berbasis Android 14'],

            // Produk 11 - OPPO Find X7 Ultra
            ['produk_id' => 11, 'atribut' => 'Prosesor',     'detail' => 'Snapdragon 8 Gen 3 (4nm)'],
            ['produk_id' => 11, 'atribut' => 'RAM',           'detail' => '12GB / 16GB LPDDR5X'],
            ['produk_id' => 11, 'atribut' => 'Storage',       'detail' => '256GB / 512GB UFS 4.0'],
            ['produk_id' => 11, 'atribut' => 'Layar',         'detail' => '6.82" LTPO AMOLED, 1B colors, 120Hz, Dolby Vision, 4500 nits (Peak)'],
            ['produk_id' => 11, 'atribut' => 'Kamera Utama',  'detail' => 'Quad 50MP Hasselblad: 1" Main Sensor + Dual Periscope (3x & 6x Optical) + Ultra-wide'],
            ['produk_id' => 11, 'atribut' => 'Baterai',       'detail' => '5000mAh, 100W SUPERVOOC (100% dalam 26 menit), 50W Wireless'],
            ['produk_id' => 11, 'atribut' => 'Material',      'detail' => 'Glass front, Eco-leather back, Aluminum frame, IP68'],
            ['produk_id' => 11, 'atribut' => 'Fitur Khusus',  'detail' => 'Hasselblad Color Calibration, Dedicated Security Chip, Alert Slider'],
            ['produk_id' => 11, 'atribut' => 'Konektivitas',  'detail' => 'Wi-Fi 7, Bluetooth 5.4, NFC, Satellite Communication (Optional)'],
            ['produk_id' => 11, 'atribut' => 'OS',            'detail' => 'ColorOS 14 berbasis Android 14'],

            // Produk 12 - Samsung Galaxy Tab S9 Ultra
            ['produk_id' => 12, 'atribut' => 'Prosesor',     'detail' => 'Snapdragon 8 Gen 2 for Galaxy (4 nm)'],
            ['produk_id' => 12, 'atribut' => 'RAM',           'detail' => '12GB / 16GB LPDDR5X'],
            ['produk_id' => 12, 'atribut' => 'Storage',       'detail' => '256GB / 512GB / 1TB (Slot microSD hingga 1TB)'],
            ['produk_id' => 12, 'atribut' => 'Layar',         'detail' => '14.6" Dynamic AMOLED 2X, 120Hz, HDR10+, Corning Gorilla Glass'],
            ['produk_id' => 12, 'atribut' => 'Kamera Utama',  'detail' => 'Dual 13MP (Wide) + 8MP (Ultra-wide)'],
            ['produk_id' => 12, 'atribut' => 'Kamera Depan',  'detail' => 'Dual 12MP (Wide) + 12MP (Ultra-wide)'],
            ['produk_id' => 12, 'atribut' => 'Baterai',       'detail' => '11,200mAh, 45W Fast Charging'],
            ['produk_id' => 12, 'atribut' => 'Material',      'detail' => 'Armor Aluminum Frame, IP68 Dust/Water Resistant (Tablet & S-Pen)'],
            ['produk_id' => 12, 'atribut' => 'S-Pen',         'detail' => 'Termasuk dalam paket penjualan (Latensi ultra rendah 2.8ms)'],
            ['produk_id' => 12, 'atribut' => 'OS',            'detail' => 'Android 13 (Upgradeable to Android 14), One UI 6'],

            // Produk 13 - Google Pixel 8 Pro
            ['produk_id' => 13, 'atribut' => 'Prosesor',     'detail' => 'Google Tensor G3 (4nm) dengan Titan M2 Security Coprocessor'],
            ['produk_id' => 13, 'atribut' => 'RAM',           'detail' => '12GB LPDDR5X'],
            ['produk_id' => 13, 'atribut' => 'Storage',       'detail' => '128GB / 256GB / 512GB / 1TB UFS 3.1'],
            ['produk_id' => 13, 'atribut' => 'Layar',         'detail' => '6.7" Super Actua Display LTPO OLED, 1-120Hz, 2400 nits (Peak), HDR10+'],
            ['produk_id' => 13, 'atribut' => 'Kamera Utama',  'detail' => 'Triple: 50MP (Wide) + 48MP (5x Optical Zoom) + 48MP (Ultra-wide)'],
            ['produk_id' => 13, 'atribut' => 'Baterai',       'detail' => '5050mAh, 30W Wired, 23W Wireless Charging, Battery Share'],
            ['produk_id' => 13, 'atribut' => 'Sensor Unik',   'detail' => 'Termometer (Infrared temperature sensor)'],
            ['produk_id' => 13, 'atribut' => 'Fitur AI',      'detail' => 'Magic Editor, Best Take, Audio Magic Eraser, Ultra HDR'],
            ['produk_id' => 13, 'atribut' => 'Ketahanan',     'detail' => 'Gorilla Glass Victus 2 (Depan & Belakang), IP68'],
            ['produk_id' => 13, 'atribut' => 'OS',            'detail' => 'Android 14 (Jaminan update OS & keamanan 7 tahun)'],

            // Produk 14 - iPad Pro M2 12.9"
            ['produk_id' => 14, 'atribut' => 'Chip',          'detail' => 'Apple M2 (8-core CPU, 10-core GPU, 16-core Neural Engine)'],
            ['produk_id' => 14, 'atribut' => 'RAM',           'detail' => '8GB RAM (pada model 128/256/512GB) atau 16GB RAM (pada model 1/2TB)'],
            ['produk_id' => 14, 'atribut' => 'Storage',       'detail' => '128GB / 256GB / 512GB / 1TB / 2TB'],
            ['produk_id' => 14, 'atribut' => 'Layar',         'detail' => '12.9" Liquid Retina XDR (Mini-LED), ProMotion 120Hz, 1600 nits (Peak)'],
            ['produk_id' => 14, 'atribut' => 'Kamera Utama',  'detail' => 'Dual 12MP (Wide) + 10MP (Ultra-wide) + LiDAR Scanner'],
            ['produk_id' => 14, 'atribut' => 'Kamera Depan',  'detail' => '12MP Ultra Wide dengan fitur Center Stage'],
            ['produk_id' => 14, 'atribut' => 'Baterai',       'detail' => '40.88 Wh, Hingga 10 jam penggunaan (Wi-Fi)'],
            ['produk_id' => 14, 'atribut' => 'Konektivitas',  'detail' => 'Thunderbolt / USB 4, Wi-Fi 6E, Bluetooth 5.3, 5G (Opsional)'],
            ['produk_id' => 14, 'atribut' => 'Aksesori',     'detail' => 'Support Apple Pencil 2nd Gen (Hover feature) & Magic Keyboard'],
            ['produk_id' => 14, 'atribut' => 'OS',            'detail' => 'iPadOS 16 (Upgradeable to latest version)'],

            // Produk 15 - Logitech MX Master 3S
            ['produk_id' => 15, 'atribut' => 'Sensor',       'detail' => 'Darkfield High Precision, 200 - 8000 DPI (Dapat diatur per kelipatan 50)'],
            ['produk_id' => 15, 'atribut' => 'Klik',          'detail' => 'Quiet Clicks (90% lebih senyap dibanding versi MX Master 3)'],
            ['produk_id' => 15, 'atribut' => 'Scrolling',     'detail' => 'MagSpeed Electromagnetic Scrolling (1000 baris dalam 1 detik)'],
            ['produk_id' => 15, 'atribut' => 'Baterai',       'detail' => 'Li-Po 500 mAh, Hingga 70 hari, Fast Charging 1 menit untuk 3 jam'],
            ['produk_id' => 15, 'atribut' => 'Konektivitas',  'detail' => 'Bluetooth Low Energy & Logi Bolt USB Receiver (Tidak kompatibel Unifying)'],
            ['produk_id' => 15, 'atribut' => 'Multi-Device',  'detail' => 'Easy-Switch (Hubungkan hingga 3 perangkat) & Logitech Flow'],
            ['produk_id' => 15, 'atribut' => 'Tombol',        'detail' => '7 Tombol (Left/Right, Back/Forward, App-Switch, Wheel Mode-Shift, Middle Click)'],
            ['produk_id' => 15, 'atribut' => 'Thumb Wheel',   'detail' => 'Ya, untuk scrolling horizontal dan kontrol gestur'],
            ['produk_id' => 15, 'atribut' => 'Software',      'detail' => 'Logi Options+ (Tersedia di macOS dan Windows)'],
            ['produk_id' => 15, 'atribut' => 'Ergonomi',      'detail' => 'Desain hand-sculpted khusus untuk tangan kanan'],

            // Produk 16 - Keychron Q1 Pro
            ['produk_id' => 16, 'atribut' => 'Tipe Keyboard', 'detail' => 'Wireless Custom Mechanical Keyboard (Layout 75%)'],
            ['produk_id' => 16, 'atribut' => 'Material',      'detail' => 'Full CNC Machined Aluminum Body'],
            ['produk_id' => 16, 'atribut' => 'Konektivitas',  'detail' => 'Bluetooth 5.1 & USB Type-C Wired (Polling Rate 1000Hz)'],
            ['produk_id' => 16, 'atribut' => 'Switch',        'detail' => 'Keychron K Pro Mechanical (Hot-swappable 3-pin & 5-pin)'],
            ['produk_id' => 16, 'atribut' => 'Keycaps',       'detail' => 'KSA Profile Double-shot PBT (Non-shine through)'],
            ['produk_id' => 16, 'atribut' => 'Mounting',      'detail' => 'Double-Gasket Design untuk pengalaman mengetik lebih empuk'],
            ['produk_id' => 16, 'atribut' => 'Baterai',       'detail' => '4000 mAh Rechargeable Li-polymer (Hingga 300 jam tanpa RGB)'],
            ['produk_id' => 16, 'atribut' => 'Software',      'detail' => 'Support QMK/VIA (Remap tombol dan macro via browser)'],
            ['produk_id' => 16, 'atribut' => 'Stabilizer',    'detail' => 'Screw-in PCB Stabilizers (Lebih stabil dan minim rattling)'],
            ['produk_id' => 16, 'atribut' => 'Backlight',     'detail' => 'South-facing RGB LED (Kompatibel dengan lebih banyak jenis keycaps)'],

            // Produk 17 - Anker 733 Power Bank (GaNPrime PowerCore 65W)
            ['produk_id' => 17, 'atribut' => 'Tipe Perangkat', 'detail' => '2-in-1 Hybrid Charger (Wall Charger + Portable Charger)'],
            ['produk_id' => 17, 'atribut' => 'Kapasitas Baterai', 'detail' => '10,000 mAh'],
            ['produk_id' => 17, 'atribut' => 'Output Mode Charger', 'detail' => 'Maksimal 65W (via USB-C) saat terhubung ke outlet dinding'],
            ['produk_id' => 17, 'atribut' => 'Output Mode Power Bank', 'detail' => 'Maksimal 30W (via USB-C) saat penggunaan portabel'],
            ['produk_id' => 17, 'atribut' => 'Jumlah Port',     'detail' => '3 Port (2x USB-C, 1x USB-A)'],
            ['produk_id' => 17, 'atribut' => 'Teknologi',       'detail' => 'GaNPrime (Lebih dingin, efisien, dan ringkas)'],
            ['produk_id' => 17, 'atribut' => 'Fitur Keamanan',  'detail' => 'ActiveShield 2.0 (Pemantauan suhu cerdas)'],
            ['produk_id' => 17, 'atribut' => 'Kompatibilitas', 'detail' => 'PowerIQ 4.0 (Deteksi kebutuhan daya otomatis untuk laptop/HP)'],
            ['produk_id' => 17, 'atribut' => 'Input Daya',      'detail' => 'AC 100-240V (Wall) atau USB-C Input'],
            ['produk_id' => 17, 'atribut' => 'Bobot',           'detail' => '320 gram'],

            // Produk 18 - Razer Goliathus Chroma
            ['produk_id' => 18, 'atribut' => 'Tipe Mousepad', 'detail' => 'Soft Gaming Mouse Mat dengan pencahayaan Razer Chroma RGB'],
            ['produk_id' => 18, 'atribut' => 'Permukaan',      'detail' => 'Kain mikro-tekstur (Micro-textured cloth) untuk kontrol dan kecepatan'],
            ['produk_id' => 18, 'atribut' => 'Optimasi Sensor', 'detail' => 'Dioptimalkan untuk semua pengaturan sensitivitas dan sensor mouse'],
            ['produk_id' => 18, 'atribut' => 'Pencahayaan',    'detail' => '16.8 juta warna RGB, sinkronisasi antar perangkat (Chroma Sync)'],
            ['produk_id' => 18, 'atribut' => 'Dasar (Base)',   'detail' => 'Karet anti-slip (Non-slip rubber base)'],
            ['produk_id' => 18, 'atribut' => 'Konektivitas',  'detail' => 'Kabel USB tetap (Braided cable)'],
            ['produk_id' => 18, 'atribut' => 'Fitur Khusus',  'detail' => 'Built-in cable catch untuk manajemen kabel mouse'],
            ['produk_id' => 18, 'atribut' => 'Ketebalan',     'detail' => '3 mm'],
            ['produk_id' => 18, 'atribut' => 'Software',      'detail' => 'Razer Synapse 3 untuk kustomisasi efek lampu'],
            ['produk_id' => 18, 'atribut' => 'Ukuran',        'detail' => '255 mm x 355 mm (Medium Size)'],

            // Produk 19 - Samsung T7 Shield 1TB
            ['produk_id' => 19, 'atribut' => 'Tipe Drive',      'detail' => 'Portable External SSD (Rugged Design)'],
            ['produk_id' => 19, 'atribut' => 'Kapasitas',       'detail' => '1TB'],
            ['produk_id' => 19, 'atribut' => 'Kecepatan Baca',  'detail' => 'Hingga 1,050 MB/s'],
            ['produk_id' => 19, 'atribut' => 'Kecepatan Tulis', 'detail' => 'Hingga 1,000 MB/s'],
            ['produk_id' => 19, 'atribut' => 'Antarmuka',       'detail' => 'USB 3.2 Gen 2 (10Gbps)'],
            ['produk_id' => 19, 'atribut' => 'Ketahanan',       'detail' => 'IP65 (Tahan Air & Debu), Tahan jatuh hingga 3 meter'],
            ['produk_id' => 19, 'atribut' => 'Material',        'detail' => 'Eksterior elastomer berteknologi tinggi (Karet Anti-Slip)'],
            ['produk_id' => 19, 'atribut' => 'Keamanan',        'detail' => 'Enkripsi Perangkat Keras AES 256-bit'],
            ['produk_id' => 19, 'atribut' => 'Kompatibilitas',  'detail' => 'PC, Mac, Android, Konsol Game (PS5/Xbox)'],
            ['produk_id' => 19, 'atribut' => 'Dimensi/Berat',   'detail' => '88 x 59 x 13 mm / 98 gram'],

            // Produk 20 - Baseus GaN5 Pro 100W
            ['produk_id' => 20, 'atribut' => 'Tipe Charger',    'detail' => 'Fast Desktop Charger (GaN Technology)'],
            ['produk_id' => 20, 'atribut' => 'Total Output',    'detail' => 'Maksimal 100W'],
            ['produk_id' => 20, 'atribut' => 'Jumlah Port',     'detail' => '4 Port (2x USB-C, 2x USB-A)'],
            ['produk_id' => 20, 'atribut' => 'Teknologi GaN',   'detail' => 'GaN5 (Generasi kelima, konversi daya lebih tinggi & minim panas)'],
            ['produk_id' => 20, 'atribut' => 'Proteksi',        'detail' => 'BPS II (Baseus Power Split) untuk distribusi daya cerdas'],
            ['produk_id' => 20, 'atribut' => 'Keamanan',        'detail' => 'Over-voltage, Over-current, Over-power, Static, & Short-circuit protection'],
            ['produk_id' => 20, 'atribut' => 'Input Daya',      'detail' => 'AC 100V-240V, 50/60Hz'],
            ['produk_id' => 20, 'atribut' => 'Kompatibilitas',  'detail' => 'Laptop (MacBook/Dell/HP), Tablet, iPhone, Samsung PPS'],
            ['produk_id' => 20, 'atribut' => 'Fitur Khusus',    'detail' => 'Termasuk kabel data Type-C to Type-C 100W dalam paket'],
            ['produk_id' => 20, 'atribut' => 'Desain',          'detail' => 'Compact & Portable dengan indikator lampu LED'],

            // Produk 21 - Sony WH-1000XM5
            ['produk_id' => 21, 'atribut' => 'Tipe Headphone',  'detail' => 'Over-Ear Wireless Noise Cancelling'],
            ['produk_id' => 21, 'atribut' => 'Noise Cancelling','detail' => 'HD Noise Cancelling Processor QN1 & Integrated Processor V1'],
            ['produk_id' => 21, 'atribut' => 'Driver Unit',     'detail' => '30mm (Specially designed carbon fiber)'],
            ['produk_id' => 21, 'atribut' => 'Baterai',         'detail' => 'Hingga 30 jam (ANC On), 40 jam (ANC Off)'],
            ['produk_id' => 21, 'atribut' => 'Fast Charging',   'detail' => 'Isi daya 3 menit untuk penggunaan 3 jam (via USB-PD)'],
            ['produk_id' => 21, 'atribut' => 'Mikrofon',        'detail' => '8 Mikrofon dengan teknologi Precise Voice Pickup'],
            ['produk_id' => 21, 'atribut' => 'Konektivitas',    'detail' => 'Bluetooth 5.2, Multipoint Connection (2 Perangkat sekaligus)'],
            ['produk_id' => 21, 'atribut' => 'Codec Audio',     'detail' => 'SBC, AAC, LDAC (Hi-Res Audio Wireless)'],
            ['produk_id' => 21, 'atribut' => 'Fitur Cerdas',    'detail' => 'Speak-to-Chat, Wearing Detection, Spotify Tap'],
            ['produk_id' => 21, 'atribut' => 'OS Support',      'detail' => 'Kompatibel dengan Google Assistant & Alexa'],

            // Produk 22 - Apple AirPods Pro 2
            ['produk_id' => 22, 'atribut' => 'Chipset',         'detail' => 'Apple H2 Chip (New) & U1 Chip di Charging Case'],
            ['produk_id' => 22, 'atribut' => 'Audio',           'detail' => 'Active Noise Cancellation (2x lebih kuat dari Gen 1)'],
            ['produk_id' => 22, 'atribut' => 'Mode Suara',      'detail' => 'Adaptive Transparency & Personalized Spatial Audio'],
            ['produk_id' => 22, 'atribut' => 'Baterai Buds',    'detail' => 'Hingga 6 jam waktu dengar sekali isi daya'],
            ['produk_id' => 22, 'atribut' => 'Total Baterai',   'detail' => 'Hingga 30 jam dengan Casing Pengisian Daya MagSafe'],
            ['produk_id' => 22, 'atribut' => 'Charging Case',   'detail' => 'Support USB-C, MagSafe, & Apple Watch charger'],
            ['produk_id' => 22, 'atribut' => 'Kontrol Sentuh',  'detail' => 'Swipe up/down untuk mengatur volume, Press untuk play/pause'],
            ['produk_id' => 22, 'atribut' => 'Ketahanan',       'detail' => 'IP54 (Tahan debu, keringat, dan air)'],
            ['produk_id' => 22, 'atribut' => 'Ear Tips',        'detail' => '4 ukuran silicon (XS, S, M, L)'],
            ['produk_id' => 22, 'atribut' => 'Fitur Find My',   'detail' => 'Precision Finding dengan speaker internal pada case'],

            // Produk 23 - JBL Charge 5
            ['produk_id' => 23, 'atribut' => 'Transduser',      'detail' => '52mm x 90mm Woofer, 20mm Tweeter'],
            ['produk_id' => 23, 'atribut' => 'Daya Output',     'detail' => '30W RMS (Woofer) + 10W RMS (Tweeter)'],
            ['produk_id' => 23, 'atribut' => 'Baterai',         'detail' => '7500 mAh (27 Wh)'],
            ['produk_id' => 23, 'atribut' => 'Waktu Putar',     'detail' => 'Hingga 20 jam (Tergantung level volume)'],
            ['produk_id' => 23, 'atribut' => 'Waktu Isi Daya',  'detail' => '4 jam (5V / 3A)'],
            ['produk_id' => 23, 'atribut' => 'Fitur Powerbank', 'detail' => 'Ya, via port USB-A (Power out 5V / 2A max)'],
            ['produk_id' => 23, 'atribut' => 'Ketahanan',       'detail' => 'IP67 (Kedap air dan debu)'],
            ['produk_id' => 23, 'atribut' => 'PartyBoost',      'detail' => 'Hubungkan beberapa speaker JBL PartyBoost secara bersamaan'],
            ['produk_id' => 23, 'atribut' => 'Konektivitas',    'detail' => 'Bluetooth 5.1'],
            ['produk_id' => 23, 'atribut' => 'Dimensi/Berat',   'detail' => '223 x 96.5 x 94 mm / 0.96 kg'],

            // Produk 24 - Bose QuietComfort Ultra
            ['produk_id' => 24, 'atribut' => 'Tipe Headphone',  'detail' => 'Over-Ear Wireless dengan Immersive Audio'],
            ['produk_id' => 24, 'atribut' => 'Noise Cancelling','detail' => 'Teknologi CustomTune untuk kalibrasi suara & ANC otomatis'],
            ['produk_id' => 24, 'atribut' => 'Audio Mode',      'detail' => 'Quiet Mode, Aware Mode, dan Immersion Mode'],
            ['produk_id' => 24, 'atribut' => 'Baterai',         'detail' => 'Hingga 24 jam (Hingga 18 jam dengan Immersive Audio)'],
            ['produk_id' => 24, 'atribut' => 'Material',        'detail' => 'Aluminium murni, Kulit sintetis protein, Plastik premium'],
            ['produk_id' => 24, 'atribut' => 'Kontrol',         'detail' => 'Touch strip untuk volume, Multi-function button'],
            ['produk_id' => 24, 'atribut' => 'Mikrofon',        'detail' => 'Sistem mikrofon canggih untuk kejernihan panggilan suara'],
            ['produk_id' => 24, 'atribut' => 'Konektivitas',    'detail' => 'Bluetooth 5.3, Snapdragon Sound (aptX Adaptive)'],
            ['produk_id' => 24, 'atribut' => 'Fitur Khusus',    'detail' => 'Bose Immersive Audio (Spatial Audio yang statis atau dinamis)'],
            ['produk_id' => 24, 'atribut' => 'Software',        'detail' => 'Bose Music App untuk kustomisasi EQ'],

            // Produk 25 - Sennheiser Momentum TW3
            ['produk_id' => 25, 'atribut' => 'Tipe Audio',      'detail' => 'True Wireless Earbuds (TWS)'],
            ['produk_id' => 25, 'atribut' => 'Driver',          'detail' => '7mm TrueResponse Transducer (Audiophile-grade)'],
            ['produk_id' => 25, 'atribut' => 'Noise Cancelling','detail' => 'Adaptive Noise Cancellation (Otomatis menyesuaikan lingkungan)'],
            ['produk_id' => 25, 'atribut' => 'Codec',           'detail' => 'aptX Adaptive, aptX, AAC, SBC'],
            ['produk_id' => 25, 'atribut' => 'Baterai Buds',    'detail' => '7 jam waktu putar'],
            ['produk_id' => 25, 'atribut' => 'Total Baterai',   'detail' => '28 jam dengan Charging Case (Kain premium)'],
            ['produk_id' => 25, 'atribut' => 'Ketahanan',       'detail' => 'IPX4 (Tahan percikan air)'],
            ['produk_id' => 25, 'atribut' => 'Charging',        'detail' => 'Qi Wireless Charging & USB-C'],
            ['produk_id' => 25, 'atribut' => 'Fitur Khusus',    'detail' => 'Sound Personalization melalui aplikasi Smart Control'],
            ['produk_id' => 25, 'atribut' => 'Mikrofon',        'detail' => '3 mikrofon per earbud untuk peredaman kebisingan angin'],

            // Produk 26 - Marshall Emberton II
            ['produk_id' => 26, 'atribut' => 'Tipe Speaker',    'detail' => 'Portable Bluetooth Speaker'],
            ['produk_id' => 26, 'atribut' => 'Teknologi Suara', 'detail' => 'True Stereophonic (Multi-directional sound 360°)'],
            ['produk_id' => 26, 'atribut' => 'Amplifier',       'detail' => 'Dua 10W Class D amplifiers'],
            ['produk_id' => 26, 'atribut' => 'Baterai',         'detail' => '30+ jam waktu putar portabel'],
            ['produk_id' => 26, 'atribut' => 'Fast Charging',   'detail' => 'Isi daya 20 menit untuk 4 jam waktu putar'],
            ['produk_id' => 26, 'atribut' => 'Ketahanan',       'detail' => 'IP67 (Kedap air dan debu)'],
            ['produk_id' => 26, 'atribut' => 'Stack Mode',      'detail' => 'Hubungkan ke speaker Emberton II lain untuk suara lebih besar'],
            ['produk_id' => 26, 'atribut' => 'Konektivitas',    'detail' => 'Bluetooth 5.1'],
            ['produk_id' => 26, 'atribut' => 'Material',        'detail' => 'Bahan ramah lingkungan (50% plastik daur ulang)'],
            ['produk_id' => 26, 'atribut' => 'Dimensi/Berat',   'detail' => '68 x 160 x 76 mm / 0.7 kg'],

            // Produk 27 - Sony Alpha A7 IV
            ['produk_id' => 27, 'atribut' => 'Sensor',          'detail' => '33.0 MP Full-frame Exmor R CMOS (Back-illuminated)'],
            ['produk_id' => 27, 'atribut' => 'Prosesor',        'detail' => 'BIONZ XR (8x lebih cepat dibanding generasi sebelumnya)'],
            ['produk_id' => 27, 'atribut' => 'Video',           'detail' => '4K 60p (Super 35mm), 4K 30p 10-bit 4:2:2 (All-I)'],
            ['produk_id' => 27, 'atribut' => 'Autofokus',       'detail' => '759 titik Phase-detection AF, Real-time Eye AF (Human/Animal/Bird)'],
            ['produk_id' => 27, 'atribut' => 'ISO',             'detail' => '100 - 51200 (Bisa ditingkatkan ke 50 - 204800)'],
            ['produk_id' => 27, 'atribut' => 'Stabilisasi',     'detail' => '5-axis optical in-body image stabilization (5.5 step)'],
            ['produk_id' => 27, 'atribut' => 'Layar',           'detail' => '3.0-type Vari-angle Touch Screen'],
            ['produk_id' => 27, 'atribut' => 'Viewfinder',      'detail' => '3.68 million-dot OLED Quad-VGA'],
            ['produk_id' => 27, 'atribut' => 'Streaming',       'detail' => '4K 15p / FHD 60p via USB (UVC/UAC support)'],
            ['produk_id' => 27, 'atribut' => 'Media Slot',      'detail' => 'Dual slots (Slot 1: SD/CFexpress Type A, Slot 2: SD)'],

            // Produk 28 - DJI Pocket 3
            ['produk_id' => 28, 'atribut' => 'Sensor',          'detail' => '1-inch CMOS'],
            ['produk_id' => 28, 'atribut' => 'Resolusi Video',  'detail' => '4K (16:9): 120fps, 4K (9:16): 60fps'],
            ['produk_id' => 28, 'atribut' => 'Warna Video',     'detail' => '10-bit D-Log M & 10-bit HLG'],
            ['produk_id' => 28, 'atribut' => 'Layar',           'detail' => '2-inch OLED Rotatable Touchscreen'],
            ['produk_id' => 28, 'atribut' => 'Stabilisasi',     'detail' => '3-Axis Mechanical Gimbal'],
            ['produk_id' => 28, 'atribut' => 'Pelacakan',       'detail' => 'ActiveTrack 6.0 (Face Auto-Detect, Dynamic Framing)'],
            ['produk_id' => 28, 'atribut' => 'Audio',           'detail' => 'Built-in 3-mic array (Stereo recording & noise reduction)'],
            ['produk_id' => 28, 'atribut' => 'Baterai',         'detail' => 'Pengisian cepat 80% dalam 16 menit'],
            ['produk_id' => 28, 'atribut' => 'Fitur Khusus',    'detail' => 'Glamour Effects 2.0, Full-Pixel Fast Focusing'],
            ['produk_id' => 28, 'atribut' => 'Penyimpanan',     'detail' => 'microSD (Hingga 512 GB)'],

            // Produk 29 - Fujifilm X-T5
            ['produk_id' => 29, 'atribut' => 'Sensor',          'detail' => '40.2 MP APS-C X-Trans CMOS 5 HR'],
            ['produk_id' => 29, 'atribut' => 'Prosesor',        'detail' => 'X-Processor 5'],
            ['produk_id' => 29, 'atribut' => 'Video',           'detail' => '6.2K 30p 10-bit internal recording'],
            ['produk_id' => 29, 'atribut' => 'Stabilisasi',     'detail' => 'In-body Image Stabilization (IBIS) hingga 7.0 stop'],
            ['produk_id' => 29, 'atribut' => 'Shutter',         'detail' => 'Maksimum 1/180,000 detik (Electronic Shutter)'],
            ['produk_id' => 29, 'atribut' => 'Layar',           'detail' => 'Three-way Tilting Touch LCD (1.84 million dots)'],
            ['produk_id' => 29, 'atribut' => 'Film Simulation', 'detail' => '19 mode (Termasuk Nostalgic Neg. & Eterna)'],
            ['produk_id' => 29, 'atribut' => 'Autofokus',       'detail' => 'Intelligent Hybrid AF dengan Subject Detection (Pesawat/Mobil/Hewan)'],
            ['produk_id' => 29, 'atribut' => 'Desain',          'detail' => 'Retro dengan dial kontrol fisik untuk ISO, Shutter, & Kompensasi Eksposur'],
            ['produk_id' => 29, 'atribut' => 'Bobot',           'detail' => '557 gram (Termasuk baterai dan memori)'],

            // Produk 30 - GoPro Hero 12 Black
            ['produk_id' => 30, 'atribut' => 'Resolusi Video',  'detail' => '5.3K 60fps, 4K 120fps, 2.7K 240fps'],
            ['produk_id' => 30, 'atribut' => 'Stabilisasi',     'detail' => 'HyperSmooth 6.0 dengan 360° Horizon Lock'],
            ['produk_id' => 30, 'atribut' => 'Foto',            'detail' => '27 MP & Frame Grabs 24.7 MP dari video'],
            ['produk_id' => 30, 'atribut' => 'Audio',           'detail' => 'Support Bluetooth Audio (AirPods/Mic external)'],
            ['produk_id' => 30, 'atribut' => 'Baterai',         'detail' => 'Enduro Battery (Hingga 70 menit pada 5.3K60)'],
            ['produk_id' => 30, 'atribut' => 'Ketahanan',       'detail' => 'Tangguh & Kedap air hingga 10 meter (33 kaki)'],
            ['produk_id' => 30, 'atribut' => 'Fitur HDR',       'detail' => 'HDR Video + Foto untuk detail lebih tajam di area terang/gelap'],
            ['produk_id' => 30, 'atribut' => 'Mounting',        'detail' => 'Folding Fingers built-in + 1/4-20 mounting thread'],
            ['produk_id' => 30, 'atribut' => 'Color Depth',     'detail' => '10-bit Color & Log Encoding (GP-Log)'],
            ['produk_id' => 30, 'atribut' => 'Penyimpanan',     'detail' => 'microSD V30 atau UHS-3 recommended'],


        ];

        DB::table('spesifikasi_produk')->insert($spesifikasi);

        $this->command->info('✅ SpesifikasiProdukSeeder: ' . count($spesifikasi) . ' spesifikasi berhasil dibuat.');
    }
}
