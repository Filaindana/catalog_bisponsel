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
            ['produk_id' => 1, 'atribut' => 'Prosesor',     'detail' => 'AMD Ryzen 9 7940HS (8 Core, 4.0GHz - 5.2GHz)'],
            ['produk_id' => 1, 'atribut' => 'GPU',           'detail' => 'NVIDIA GeForce RTX 4060 8GB GDDR6'],
            ['produk_id' => 1, 'atribut' => 'RAM',           'detail' => '16GB DDR5 4800MHz (2x8GB)'],
            ['produk_id' => 1, 'atribut' => 'Storage',       'detail' => '1TB PCIe Gen4 NVMe SSD'],
            ['produk_id' => 1, 'atribut' => 'Layar',         'detail' => '14" QHD+ 165Hz, 100% DCI-P3, Dolby Vision'],
            ['produk_id' => 1, 'atribut' => 'Baterai',       'detail' => '76Wh, USB-C 100W Fast Charging'],
            ['produk_id' => 1, 'atribut' => 'Bobot',         'detail' => '1.65 kg'],
            ['produk_id' => 1, 'atribut' => 'OS',            'detail' => 'Windows 11 Home'],

            // Produk 2 - Lenovo ThinkPad X1 Carbon
            ['produk_id' => 2, 'atribut' => 'Prosesor',     'detail' => 'Intel Core i7-1365U (10 Core, up to 5.2GHz)'],
            ['produk_id' => 2, 'atribut' => 'RAM',           'detail' => '16GB LPDDR5 5200MHz (soldered)'],
            ['produk_id' => 2, 'atribut' => 'Storage',       'detail' => '512GB M.2 PCIe Gen4 SSD'],
            ['produk_id' => 2, 'atribut' => 'Layar',         'detail' => '14" OLED 2.8K 120Hz, 400nits, Anti-glare'],
            ['produk_id' => 2, 'atribut' => 'Bobot',         'detail' => '1.12 kg'],
            ['produk_id' => 2, 'atribut' => 'Baterai',       'detail' => '57Wh, Rapid Charge 80% dalam 1 jam'],
            ['produk_id' => 2, 'atribut' => 'Konektivitas',  'detail' => 'WiFi 6E, Bluetooth 5.3, 4G LTE (opsional)'],
            ['produk_id' => 2, 'atribut' => 'OS',            'detail' => 'Windows 11 Pro'],

            // Produk 3 - MacBook Air M2
            ['produk_id' => 3, 'atribut' => 'Chip',         'detail' => 'Apple M2 (8-core CPU, 10-core GPU, 16-core Neural Engine)'],
            ['produk_id' => 3, 'atribut' => 'RAM',           'detail' => '8GB Unified Memory'],
            ['produk_id' => 3, 'atribut' => 'Storage',       'detail' => '256GB SSD'],
            ['produk_id' => 3, 'atribut' => 'Layar',         'detail' => '13.6" Liquid Retina (2560x1664), 500nits, True Tone'],
            ['produk_id' => 3, 'atribut' => 'Baterai',       'detail' => 'Hingga 18 jam, MagSafe 3 30W/67W'],
            ['produk_id' => 3, 'atribut' => 'Kamera',        'detail' => '1080p FaceTime HD, 3-mic array'],
            ['produk_id' => 3, 'atribut' => 'Bobot',         'detail' => '1.24 kg'],
            ['produk_id' => 3, 'atribut' => 'Port',          'detail' => '2x USB-C Thunderbolt 4, MagSafe 3, 3.5mm audio'],

            // Produk 4 - Acer Aspire 5
            ['produk_id' => 4, 'atribut' => 'Prosesor',     'detail' => 'Intel Core i5-1235U (10 Core, up to 4.4GHz)'],
            ['produk_id' => 4, 'atribut' => 'RAM',           'detail' => '8GB DDR4 3200MHz'],
            ['produk_id' => 4, 'atribut' => 'Storage',       'detail' => '512GB NVMe SSD'],
            ['produk_id' => 4, 'atribut' => 'Layar',         'detail' => '15.6" Full HD IPS (1920x1080), 60Hz'],
            ['produk_id' => 4, 'atribut' => 'Grafis',        'detail' => 'Intel Iris Xe Graphics'],
            ['produk_id' => 4, 'atribut' => 'Baterai',       'detail' => '57.5Wh, 45W Adapter'],
            ['produk_id' => 4, 'atribut' => 'OS',            'detail' => 'Windows 11 Home'],

            // Produk 5 - Dell XPS 15 OLED
            ['produk_id' => 5, 'atribut' => 'Prosesor',     'detail' => 'Intel Core i9-13900H (20 Core, up to 5.4GHz)'],
            ['produk_id' => 5, 'atribut' => 'GPU',           'detail' => 'NVIDIA RTX 4070 8GB GDDR6'],
            ['produk_id' => 5, 'atribut' => 'RAM',           'detail' => '32GB DDR5 4800MHz'],
            ['produk_id' => 5, 'atribut' => 'Storage',       'detail' => '1TB M.2 PCIe Gen4 SSD'],
            ['produk_id' => 5, 'atribut' => 'Layar',         'detail' => '15.6" OLED 3.5K (3456x2160), 60Hz, 100% DCI-P3'],
            ['produk_id' => 5, 'atribut' => 'Baterai',       'detail' => '86Wh, 130W USB-C Charging'],
            ['produk_id' => 5, 'atribut' => 'OS',            'detail' => 'Windows 11 Pro'],

            // Produk 6 - Samsung Galaxy S24 Ultra
            ['produk_id' => 6, 'atribut' => 'Prosesor',     'detail' => 'Snapdragon 8 Gen 3 for Galaxy (4nm)'],
            ['produk_id' => 6, 'atribut' => 'RAM',           'detail' => '12GB LPDDR5X'],
            ['produk_id' => 6, 'atribut' => 'Storage',       'detail' => '256GB / 512GB / 1TB UFS 4.0'],
            ['produk_id' => 6, 'atribut' => 'Layar',         'detail' => '6.8" Dynamic AMOLED 2X, QHD+, 120Hz, 2600nits'],
            ['produk_id' => 6, 'atribut' => 'Kamera Utama',  'detail' => '200MP f/1.7 + 12MP Ultra-wide + 10MP 3x + 50MP 5x Telephoto'],
            ['produk_id' => 6, 'atribut' => 'Baterai',       'detail' => '5000mAh, 45W Wired, 15W Wireless'],
            ['produk_id' => 6, 'atribut' => 'OS',            'detail' => 'Android 14, One UI 6.1'],
            ['produk_id' => 6, 'atribut' => 'Fitur Khusus',  'detail' => 'S Pen built-in, Galaxy AI, IP68'],

            // Produk 7 - iPhone 15 Pro Max
            ['produk_id' => 7, 'atribut' => 'Chip',         'detail' => 'Apple A17 Pro (6-core CPU, 6-core GPU, 3nm)'],
            ['produk_id' => 7, 'atribut' => 'RAM',           'detail' => '8GB'],
            ['produk_id' => 7, 'atribut' => 'Storage',       'detail' => '256GB / 512GB / 1TB'],
            ['produk_id' => 7, 'atribut' => 'Layar',         'detail' => '6.7" Super Retina XDR OLED, ProMotion 120Hz, 2000nits'],
            ['produk_id' => 7, 'atribut' => 'Kamera',        'detail' => '48MP Main + 12MP Ultra-wide + 12MP 5x Tetraprism Telephoto'],
            ['produk_id' => 7, 'atribut' => 'Baterai',       'detail' => '4422mAh, 27W Wired, 15W MagSafe'],
            ['produk_id' => 7, 'atribut' => 'Material',      'detail' => 'Titanium frame, Textured matte glass back'],
            ['produk_id' => 7, 'atribut' => 'Konektivitas',  'detail' => '5G, WiFi 6E, Bluetooth 5.3, Thread, UWB'],

            // Produk 8 - Xiaomi 14 Pro
            ['produk_id' => 8, 'atribut' => 'Prosesor',     'detail' => 'Snapdragon 8 Gen 3 (4nm)'],
            ['produk_id' => 8, 'atribut' => 'RAM',           'detail' => '12GB / 16GB LPDDR5X'],
            ['produk_id' => 8, 'atribut' => 'Storage',       'detail' => '256GB / 512GB / 1TB UFS 4.0'],
            ['produk_id' => 8, 'atribut' => 'Layar',         'detail' => '6.73" LTPO AMOLED 4K, 120Hz, 3000nits'],
            ['produk_id' => 8, 'atribut' => 'Kamera',        'detail' => 'Leica 50MP Light Fusion 900 + 50MP Ultra-wide + 50MP 3.2x Telephoto'],
            ['produk_id' => 8, 'atribut' => 'Baterai',       'detail' => '4880mAh, 120W HyperCharge, 50W Wireless'],
            ['produk_id' => 8, 'atribut' => 'OS',            'detail' => 'MIUI 14 / HyperOS, Android 14'],

            // Produk 9 - OPPO Find X7 Ultra
            ['produk_id' => 9, 'atribut' => 'Prosesor',     'detail' => 'Dimensity 9300 (4nm)'],
            ['produk_id' => 9, 'atribut' => 'RAM',           'detail' => '16GB LPDDR5T'],
            ['produk_id' => 9, 'atribut' => 'Storage',       'detail' => '512GB UFS 4.0'],
            ['produk_id' => 9, 'atribut' => 'Layar',         'detail' => '6.82" LTPO AMOLED, 2K, 120Hz, 4500nits'],
            ['produk_id' => 9, 'atribut' => 'Kamera',        'detail' => 'Hasselblad 50MP + 50MP + 50MP (3x) + 50MP (6x)'],
            ['produk_id' => 9, 'atribut' => 'Baterai',       'detail' => '5000mAh, 100W SUPERVOOC, 50W AirVOOC'],

            // Produk 10 - Samsung Galaxy Tab S9 Ultra
            ['produk_id' => 10, 'atribut' => 'Prosesor',    'detail' => 'Snapdragon 8 Gen 2 for Galaxy (4nm)'],
            ['produk_id' => 10, 'atribut' => 'RAM',          'detail' => '12GB LPDDR5X'],
            ['produk_id' => 10, 'atribut' => 'Storage',      'detail' => '256GB / 512GB UFS 4.0 + microSD'],
            ['produk_id' => 10, 'atribut' => 'Layar',        'detail' => '14.6" Dynamic AMOLED 2X, 2960x1848, 120Hz'],
            ['produk_id' => 10, 'atribut' => 'Kamera',       'detail' => '13MP + 8MP Ultra-wide (Belakang), 12MP + 12MP (Depan)'],
            ['produk_id' => 10, 'atribut' => 'Baterai',      'detail' => '11200mAh, 45W Fast Charging'],
            ['produk_id' => 10, 'atribut' => 'Aksesori',     'detail' => 'S Pen included, Book Cover Keyboard (opsional)'],

            // Produk 11 - Logitech MX Master 3S
            ['produk_id' => 11, 'atribut' => 'Sensor',      'detail' => 'Darkfield, 200 - 8000 DPI'],
            ['produk_id' => 11, 'atribut' => 'Konektivitas', 'detail' => 'Logi Bolt USB Receiver & Bluetooth (multi-device 3 perangkat)'],
            ['produk_id' => 11, 'atribut' => 'Baterai',      'detail' => 'Li-Po 500mAh, hingga 70 hari, USB-C Fast Charge'],
            ['produk_id' => 11, 'atribut' => 'Tombol',       'detail' => '7 tombol, MagSpeed scroll, side scroll'],
            ['produk_id' => 11, 'atribut' => 'Kompatibilitas','detail' => 'Windows, macOS, Linux, ChromeOS'],

            // Produk 12 - Keychron Q1 Pro
            ['produk_id' => 12, 'atribut' => 'Layout',      'detail' => '75% (84 keys) QMK/VIA programmable'],
            ['produk_id' => 12, 'atribut' => 'Switch',       'detail' => 'Gateron Pro Brown (hot-swappable, 3/5-pin)'],
            ['produk_id' => 12, 'atribut' => 'Konektivitas', 'detail' => 'Bluetooth 5.1 (3 device) & USB-C'],
            ['produk_id' => 12, 'atribut' => 'Baterai',      'detail' => '4000mAh'],
            ['produk_id' => 12, 'atribut' => 'Backlight',    'detail' => 'RGB per-key'],
            ['produk_id' => 12, 'atribut' => 'Build',        'detail' => 'Full aluminum body, gasket mount, double-shot PBT keycaps'],

            // Produk 13 - Anker 733 Power Bank
            ['produk_id' => 13, 'atribut' => 'Kapasitas',   'detail' => '10000mAh'],
            ['produk_id' => 13, 'atribut' => 'Output',       'detail' => 'USB-C 65W, USB-A 12W, USB-A 22.5W'],
            ['produk_id' => 13, 'atribut' => 'Mode',         'detail' => 'Power Bank + Wall Charger 2-in-1'],
            ['produk_id' => 13, 'atribut' => 'Teknologi',    'detail' => 'GaNPrime, ActiveShield 2.0 temperature control'],

            // Produk 14 - Sony WH-1000XM5
            ['produk_id' => 14, 'atribut' => 'Driver',      'detail' => '30mm, Dynamic'],
            ['produk_id' => 14, 'atribut' => 'ANC',          'detail' => '8 mikrofon dengan HD Noise Cancelling Processor QN1'],
            ['produk_id' => 14, 'atribut' => 'Codec',        'detail' => 'SBC, AAC, LDAC (Hi-Res Wireless)'],
            ['produk_id' => 14, 'atribut' => 'Baterai',      'detail' => '30 jam (ANC on), 3 jam dari charge 3 menit'],
            ['produk_id' => 14, 'atribut' => 'Fitur',        'detail' => 'Multipoint 2 device, Speak-to-Chat, Precise Voice Pickup'],
            ['produk_id' => 14, 'atribut' => 'Bobot',        'detail' => '250 gram'],

            // Produk 15 - AirPods Pro 2
            ['produk_id' => 15, 'atribut' => 'Chip',        'detail' => 'Apple H2'],
            ['produk_id' => 15, 'atribut' => 'ANC',          'detail' => 'Active Noise Cancellation + Adaptive Transparency'],
            ['produk_id' => 15, 'atribut' => 'Baterai',      'detail' => '6 jam (ANC on) + 24 jam dengan case MagSafe'],
            ['produk_id' => 15, 'atribut' => 'Fitur',        'detail' => 'Personalized Spatial Audio, Adaptive EQ, Touch control'],
            ['produk_id' => 15, 'atribut' => 'Konektivitas', 'detail' => 'Bluetooth 5.3, USB-C / Lightning case'],

            // Produk 16 - JBL Charge 5
            ['produk_id' => 16, 'atribut' => 'Output',      'detail' => '30W RMS'],
            ['produk_id' => 16, 'atribut' => 'Baterai',      'detail' => '7500mAh, 20 jam playback, PartyBoost'],
            ['produk_id' => 16, 'atribut' => 'Waterproof',   'detail' => 'IP67 (Tahan debu & air hingga 1m/30 menit)'],
            ['produk_id' => 16, 'atribut' => 'PowerBank',    'detail' => 'USB-A output untuk charge perangkat lain'],
            ['produk_id' => 16, 'atribut' => 'Konektivitas', 'detail' => 'Bluetooth 5.1'],

            // Produk 17 - Sony Alpha A7 IV
            ['produk_id' => 17, 'atribut' => 'Sensor',      'detail' => 'Full-frame CMOS 33MP BSI'],
            ['produk_id' => 17, 'atribut' => 'Prosesor',     'detail' => 'BIONZ XR'],
            ['produk_id' => 17, 'atribut' => 'Autofokus',    'detail' => '759-point Phase-detect AF, Real-time AI Tracking'],
            ['produk_id' => 17, 'atribut' => 'Video',        'detail' => '4K 60fps 10-bit, 4:2:2, S-Log3'],
            ['produk_id' => 17, 'atribut' => 'Stabilisasi',  'detail' => '5-axis In-body IS, 5.5 stop'],
            ['produk_id' => 17, 'atribut' => 'ISO',          'detail' => '100 - 51200 (expandable 50-204800)'],
            ['produk_id' => 17, 'atribut' => 'Koneksi',      'detail' => 'Dual card slot (CFexpress A + SD UHS-II)'],

            // Produk 18 - DJI Pocket 3
            ['produk_id' => 18, 'atribut' => 'Sensor',      'detail' => '1-inch CMOS, 20MP'],
            ['produk_id' => 18, 'atribut' => 'Video',        'detail' => '4K 120fps, 10-bit D-Log M'],
            ['produk_id' => 18, 'atribut' => 'Stabilisasi',  'detail' => '3-axis mechanical gimbal, RockSteady 3.0+'],
            ['produk_id' => 18, 'atribut' => 'Layar',        'detail' => '2 inch OLED touchscreen, putar 360°'],
            ['produk_id' => 18, 'atribut' => 'Fitur',        'detail' => 'ActiveTrack 360, Face/Body Tracking'],
            ['produk_id' => 18, 'atribut' => 'Baterai',      'detail' => '1300mAh, 116 menit, USB-C charging'],

            // Produk 19 - PlayStation 5 Slim
            ['produk_id' => 19, 'atribut' => 'CPU',         'detail' => 'AMD Zen 2, 8-core 3.5GHz (variabel)'],
            ['produk_id' => 19, 'atribut' => 'GPU',          'detail' => 'AMD RDNA 2, 10.3 TFLOPS'],
            ['produk_id' => 19, 'atribut' => 'RAM',          'detail' => '16GB GDDR6'],
            ['produk_id' => 19, 'atribut' => 'Storage',      'detail' => '1TB NVMe SSD (5500 MB/s)'],
            ['produk_id' => 19, 'atribut' => 'Output Video',  'detail' => '4K 120fps, 8K, HDR, HDMI 2.1, VRR'],
            ['produk_id' => 19, 'atribut' => 'Audio',        'detail' => 'Tempest 3D AudioTech'],
            ['produk_id' => 19, 'atribut' => 'Kontroler',    'detail' => 'DualSense Wireless (Haptic Feedback, Adaptive Trigger)'],

            // Produk 20 - ASUS ROG Ally
            ['produk_id' => 20, 'atribut' => 'Prosesor',    'detail' => 'AMD Ryzen Z1 Extreme (8-core, 5.1GHz)'],
            ['produk_id' => 20, 'atribut' => 'GPU',          'detail' => 'AMD RDNA 3 iGPU, 8.6 TFLOPS'],
            ['produk_id' => 20, 'atribut' => 'RAM',          'detail' => '16GB LPDDR5 6400MHz'],
            ['produk_id' => 20, 'atribut' => 'Storage',      'detail' => '512GB PCIe Gen4 NVMe SSD'],
            ['produk_id' => 20, 'atribut' => 'Layar',        'detail' => '7" FHD IPS 120Hz, 500nits, 7ms'],
            ['produk_id' => 20, 'atribut' => 'Baterai',      'detail' => '40Wh, 65W USB-C Charging'],
            ['produk_id' => 20, 'atribut' => 'OS',           'detail' => 'Windows 11 Home + ROG Armoury Crate SE'],

            // Produk 21 - TP-Link Archer AXE75
            ['produk_id' => 21, 'atribut' => 'WiFi Standard','detail' => 'WiFi 6E (802.11ax) Tri-band'],
            ['produk_id' => 21, 'atribut' => 'Kecepatan',   'detail' => '5400Mbps (574 + 2402 + 2402 Mbps)'],
            ['produk_id' => 21, 'atribut' => 'Band',         'detail' => '2.4GHz + 5GHz + 6GHz'],
            ['produk_id' => 21, 'atribut' => 'Antena',       'detail' => '6 antena eksternal Hi-Gain'],
            ['produk_id' => 21, 'atribut' => 'Port',         'detail' => 'WAN 2.5G + 4x LAN Gigabit + USB 3.0'],
            ['produk_id' => 21, 'atribut' => 'Teknologi',    'detail' => 'OFDMA, MU-MIMO, BSS Coloring, Beamforming'],
        ];

        DB::table('spesifikasi_produk')->insert($spesifikasi);

        $this->command->info('✅ SpesifikasiProdukSeeder: ' . count($spesifikasi) . ' spesifikasi berhasil dibuat.');
    }
}
