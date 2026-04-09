<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenjualanProdukSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('penjualan_produk')->delete();

        $penjualan = [];

        // Data penjualan 6 bulan terakhir per produk
        // Format: [produk_id, volume harian rata-rata]
        $produkVolume = [
            1  => [1, 3],   // ASUS ROG Zephyrus - 1-3/hari
            2  => [1, 2],   // Lenovo ThinkPad
            3  => [2, 5],   // MacBook Air M2 - laku keras
            4  => [3, 7],   // Acer Aspire 5 - laptop entry-level paling laku
            5  => [1, 2],   // Dell XPS 15 - premium, terbatas
            6  => [2, 5],   // Samsung Galaxy S24 Ultra
            7  => [2, 4],   // iPhone 15 Pro Max
            8  => [2, 4],   // Xiaomi 14 Pro
            9  => [1, 3],   // OPPO Find X7
            10 => [1, 3],   // Samsung Tab S9 Ultra
            11 => [3, 8],   // Logitech MX Master - aksesoris paling laku
            12 => [2, 5],   // Keychron Q1 Pro
            13 => [5, 12],  // Anker Power Bank - volume tinggi
            14 => [2, 4],   // Sony WH-1000XM5
            15 => [3, 6],   // AirPods Pro 2
            16 => [3, 7],   // JBL Charge 5
            17 => [1, 2],   // Sony Alpha A7 IV - kamera mahal
            18 => [1, 3],   // DJI Pocket 3
            19 => [2, 4],   // PlayStation 5
            20 => [1, 3],   // ASUS ROG Ally
            21 => [2, 5],   // TP-Link Router
        ];

        // Generate data 6 bulan terakhir, 1 record per minggu per produk
        for ($produkId = 1; $produkId <= 21; $produkId++) {
            [$min, $max] = $produkVolume[$produkId];

            for ($minggu = 24; $minggu >= 0; $minggu--) {
                $tanggal = now()->subWeeks($minggu)->startOfWeek()->toDateString();
                $totalTerjual = rand($min * 7, $max * 7);

                // Boost penjualan saat periode promo aktif
                if ($minggu <= 2) {
                    $totalTerjual = intval($totalTerjual * 1.5);
                }

                $penjualan[] = [
                    'produk_id'     => $produkId,
                    'total_terjual' => $totalTerjual,
                    'tanggal'       => $tanggal,
                ];
            }
        }

        // Insert dalam batch untuk efisiensi
        foreach (array_chunk($penjualan, 100) as $chunk) {
            DB::table('penjualan_produk')->insert($chunk);
        }

        $this->command->info('✅ PenjualanProdukSeeder: ' . count($penjualan) . ' record penjualan berhasil dibuat (6 bulan x 21 produk).');
    }
}
