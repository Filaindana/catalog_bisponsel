<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kategori')->delete();

        $kategori = [
            ['nama' => 'Laptop & Komputer',    'dibuat_pada' => now()->subDays(60), 'diperbarui_pada' => now()->subDays(60)],
            ['nama' => 'Smartphone & Tablet',  'dibuat_pada' => now()->subDays(60), 'diperbarui_pada' => now()->subDays(60)],
            ['nama' => 'Aksesoris Elektronik', 'dibuat_pada' => now()->subDays(55), 'diperbarui_pada' => now()->subDays(55)],
            ['nama' => 'Audio & Headphone',    'dibuat_pada' => now()->subDays(55), 'diperbarui_pada' => now()->subDays(55)],
            ['nama' => 'Kamera & Fotografi',   'dibuat_pada' => now()->subDays(50), 'diperbarui_pada' => now()->subDays(50)],
            ['nama' => 'Peralatan Rumah',      'dibuat_pada' => now()->subDays(50), 'diperbarui_pada' => now()->subDays(50)],
            ['nama' => 'Gaming',               'dibuat_pada' => now()->subDays(45), 'diperbarui_pada' => now()->subDays(45)],
            ['nama' => 'Networking',           'dibuat_pada' => now()->subDays(45), 'diperbarui_pada' => now()->subDays(45)],
        ];

        DB::table('kategori')->insert($kategori);

        $this->command->info('✅ KategoriSeeder: ' . count($kategori) . ' kategori berhasil dibuat.');
    }
}
