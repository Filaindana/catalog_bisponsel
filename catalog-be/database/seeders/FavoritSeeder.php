<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavoritSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('favorit')->delete();

        // Ambil daftar user dengan role 'user'. Jika tidak ada, fallback ke semua non-admin.
        $userIds = DB::table('users')->where('peran', 'user')->pluck('id')->values()->all();
        if (empty($userIds)) {
            $userIds = DB::table('users')->where('peran', '!=', 'admin')->pluck('id')->values()->all();
        }

        // Daftar produk favorit (hanya produk_id); akan didistribusikan ke user yang tersedia.
        $productFavorites = [
            1,3,19,20,14,7,15,10,16,17,18,11,12,5,6,8,4,13,2,9,21
        ];

        $favorit = [];
        $userCount = count($userIds);
        foreach ($productFavorites as $index => $produkId) {
            $userId = $userIds[$index % max(1, $userCount)];
            $favorit[] = ['user_id' => $userId, 'produk_id' => $produkId];
        }

        if (! empty($favorit)) {
            DB::table('favorit')->insert($favorit);
        }

        $this->command->info('✅ FavoritSeeder: ' . count($favorit) . ' favorit berhasil dibuat.');
    }
}
