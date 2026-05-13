<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromoProdukSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('promo_produk')->delete();

        $promoProduk = [
            // Promo 1: Mega Tech Sale → Laptop & Smartphone
            ['promo_id' => 1, 'produk_id' => 1],  // ASUS ROG Zephyrus
            ['promo_id' => 1, 'produk_id' => 2],  // Lenovo ThinkPad
            ['promo_id' => 1, 'produk_id' => 3],  // MacBook Air M2
            ['promo_id' => 1, 'produk_id' => 4],  // Acer Aspire 5
            ['promo_id' => 1, 'produk_id' => 6],  // Samsung S24 Ultra
            ['promo_id' => 1, 'produk_id' => 7],  // iPhone 15 Pro Max
            ['promo_id' => 1, 'produk_id' => 8],  // Xiaomi 14 Pro

            // Promo 2: Harbolnas 12.12 → Semua kategori pilihan
            ['promo_id' => 2, 'produk_id' => 1],  // ASUS ROG Zephyrus
            ['promo_id' => 2, 'produk_id' => 3],  // MacBook Air M2
            ['promo_id' => 2, 'produk_id' => 6],  // Samsung S24 Ultra
            ['promo_id' => 2, 'produk_id' => 7],  // iPhone 15 Pro Max
            ['promo_id' => 2, 'produk_id' => 12], // Keychron Q1 Pro
            ['promo_id' => 2, 'produk_id' => 14], // Sony WH-1000XM5
            ['promo_id' => 2, 'produk_id' => 15], // AirPods Pro 2
            ['promo_id' => 2, 'produk_id' => 19], // PlayStation 5

            // Promo 3: Gaming Festival → Produk gaming
            ['promo_id' => 3, 'produk_id' => 1],  // ASUS ROG Zephyrus (gaming laptop)
            ['promo_id' => 3, 'produk_id' => 19], // PlayStation 5
            ['promo_id' => 3, 'produk_id' => 20], // ASUS ROG Ally

            // Promo 4: Audio Lover Week → Produk audio (sudah berakhir)
            ['promo_id' => 4, 'produk_id' => 14], // Sony WH-1000XM5
            ['promo_id' => 4, 'produk_id' => 15], // AirPods Pro 2
            ['promo_id' => 4, 'produk_id' => 16], // JBL Charge 5

            // Promo 5: Back to School → Laptop & Tablet
            ['promo_id' => 5, 'produk_id' => 3],  // MacBook Air M2
            ['promo_id' => 5, 'produk_id' => 4],  // Acer Aspire 5
            ['promo_id' => 5, 'produk_id' => 10], // Samsung Galaxy Tab S9 Ultra

            ['promo_id' => 6, 'produk_id' => 2],
            ['promo_id' => 6, 'produk_id' => 7],

            ['promo_id' => 7, 'produk_id' => 8],
            ['promo_id' => 7, 'produk_id' => 10],

            ['promo_id' => 8, 'produk_id' => 14],
            ['promo_id' => 8, 'produk_id' => 15],

            ['promo_id' => 9, 'produk_id' => 1],
            ['promo_id' => 9, 'produk_id' => 3],
        ];

        DB::table('promo_produk')->insert($promoProduk);

        $this->command->info('✅ PromoProdukSeeder: ' . count($promoProduk) . ' relasi promo-produk berhasil dibuat.');
    }
}
