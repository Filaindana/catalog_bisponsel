<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('kategori')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $kategori = [
            ['nama' => 'Laptop & Komputer',    'gambar' => 'kategori/laptop.png', 'dibuat_pada' => now()->subDays(60), 'diperbarui_pada' => now()->subDays(60)],
            ['nama' => 'Smartphone & Tablet',  'gambar' => 'kategori/handphone.png', 'dibuat_pada' => now()->subDays(60), 'diperbarui_pada' => now()->subDays(60)],
            ['nama' => 'Aksesoris Elektronik', 'gambar' => 'kategori/kabel.png', 'dibuat_pada' => now()->subDays(55), 'diperbarui_pada' => now()->subDays(55)],
            ['nama' => 'Audio & Headphone',    'gambar' => 'kategori/sound.png', 'dibuat_pada' => now()->subDays(55), 'diperbarui_pada' => now()->subDays(55)],
            ['nama' => 'Kamera & Fotografi',   'gambar' => 'kategori/monitor.png', 'dibuat_pada' => now()->subDays(50), 'diperbarui_pada' => now()->subDays(50)],
            ['nama' => 'Peralatan Rumah',      'gambar' => 'kategori/mouse.png', 'dibuat_pada' => now()->subDays(50), 'diperbarui_pada' => now()->subDays(50)],
            ['nama' => 'Gaming',               'gambar' => 'kategori/keyboard.png', 'dibuat_pada' => now()->subDays(45), 'diperbarui_pada' => now()->subDays(45)],
            ['nama' => 'Networking',           'gambar' => 'kategori/kabel.png', 'dibuat_pada' => now()->subDays(45), 'diperbarui_pada' => now()->subDays(45)],
        ];

        foreach ($kategori as $item) {
            Kategori::create($item);
        }

        $this->command->info('✅ KategoriSeeder: ' . count($kategori) . ' kategori berhasil dibuat.');
    }
}

