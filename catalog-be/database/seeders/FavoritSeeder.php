<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavoritSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('favorit')->delete();

        // user_id 3-8 adalah user biasa (bukan admin)
        $favorit = [
            // Budi (user_id=3) - suka laptop & gaming
            ['user_id' => 3, 'produk_id' => 1],   // ASUS ROG Zephyrus
            ['user_id' => 3, 'produk_id' => 3],   // MacBook Air M2
            ['user_id' => 3, 'produk_id' => 19],  // PlayStation 5
            ['user_id' => 3, 'produk_id' => 20],  // ASUS ROG Ally
            ['user_id' => 3, 'produk_id' => 14],  // Sony WH-1000XM5

            // Siti (user_id=4) - suka smartphone & audio
            ['user_id' => 4, 'produk_id' => 7],   // iPhone 15 Pro Max
            ['user_id' => 4, 'produk_id' => 15],  // AirPods Pro 2
            ['user_id' => 4, 'produk_id' => 10],  // Samsung Tab S9 Ultra
            ['user_id' => 4, 'produk_id' => 16],  // JBL Charge 5

            // Agus (user_id=5) - suka kamera & aksesoris
            ['user_id' => 5, 'produk_id' => 17],  // Sony Alpha A7 IV
            ['user_id' => 5, 'produk_id' => 18],  // DJI Pocket 3
            ['user_id' => 5, 'produk_id' => 11],  // Logitech MX Master 3S
            ['user_id' => 5, 'produk_id' => 12],  // Keychron Q1 Pro
            ['user_id' => 5, 'produk_id' => 5],   // Dell XPS 15

            // Dewi (user_id=6) - suka smartphone & laptop entry
            ['user_id' => 6, 'produk_id' => 6],   // Samsung S24 Ultra
            ['user_id' => 6, 'produk_id' => 8],   // Xiaomi 14 Pro
            ['user_id' => 6, 'produk_id' => 4],   // Acer Aspire 5
            ['user_id' => 6, 'produk_id' => 13],  // Anker Power Bank

            // Rizky (user_id=7) - suka semua produk premium
            ['user_id' => 7, 'produk_id' => 2],   // Lenovo ThinkPad X1
            ['user_id' => 7, 'produk_id' => 5],   // Dell XPS 15
            ['user_id' => 7, 'produk_id' => 9],   // OPPO Find X7
            ['user_id' => 7, 'produk_id' => 14],  // Sony WH-1000XM5
            ['user_id' => 7, 'produk_id' => 21],  // TP-Link Router

            // Rina (user_id=8) - suka gadget harian
            ['user_id' => 8, 'produk_id' => 7],   // iPhone 15 Pro Max
            ['user_id' => 8, 'produk_id' => 11],  // Logitech MX Master 3S
            ['user_id' => 8, 'produk_id' => 13],  // Anker Power Bank
            ['user_id' => 8, 'produk_id' => 16],  // JBL Charge 5
        ];

        DB::table('favorit')->insert($favorit);

        $this->command->info('✅ FavoritSeeder: ' . count($favorit) . ' favorit berhasil dibuat.');
    }
}
