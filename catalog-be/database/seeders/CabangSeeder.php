<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CabangSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cabang')->delete();

        $cabang = [
            [
                'kode'            => 'CBG-JKT-01',
                'nama'            => 'Cabang Jakarta Pusat',
                'kota'            => 'Jakarta',
                'alamat'          => 'Jl. Sudirman No. 88, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220',
                'telepon'         => '021-57889900',
                'dibuat_pada'     => now()->subDays(90),
                'diperbarui_pada' => now()->subDays(90),
            ],
            [
                'kode'            => 'CBG-JKT-02',
                'nama'            => 'Cabang Jakarta Selatan',
                'kota'            => 'Jakarta',
                'alamat'          => 'Jl. TB Simatupang No. 12, Cilandak, Jakarta Selatan, DKI Jakarta 12430',
                'telepon'         => '021-78994455',
                'dibuat_pada'     => now()->subDays(80),
                'diperbarui_pada' => now()->subDays(80),
            ],
            [
                'kode'            => 'CBG-SBY-01',
                'nama'            => 'Cabang Surabaya Pusat',
                'kota'            => 'Surabaya',
                'alamat'          => 'Jl. Tunjungan No. 1, Genteng, Surabaya, Jawa Timur 60275',
                'telepon'         => '031-50011122',
                'dibuat_pada'     => now()->subDays(75),
                'diperbarui_pada' => now()->subDays(75),
            ],
            [
                'kode'            => 'CBG-SBY-02',
                'nama'            => 'Cabang Surabaya Timur',
                'kota'            => 'Surabaya',
                'alamat'          => 'Jl. Raya Kenjeran No. 500, Bulak, Surabaya, Jawa Timur 60129',
                'telepon'         => '031-50033344',
                'dibuat_pada'     => now()->subDays(60),
                'diperbarui_pada' => now()->subDays(60),
            ],
            [
                'kode'            => 'CBG-BDG-01',
                'nama'            => 'Cabang Bandung Dago',
                'kota'            => 'Bandung',
                'alamat'          => 'Jl. Ir. H. Juanda No. 111, Coblong, Bandung, Jawa Barat 40132',
                'telepon'         => '022-25678800',
                'dibuat_pada'     => now()->subDays(55),
                'diperbarui_pada' => now()->subDays(55),
            ],
            [
                'kode'            => 'CBG-YGY-01',
                'nama'            => 'Cabang Yogyakarta Malioboro',
                'kota'            => 'Yogyakarta',
                'alamat'          => 'Jl. Malioboro No. 77, Gedongtengen, Yogyakarta, DI Yogyakarta 55271',
                'telepon'         => '0274-556677',
                'dibuat_pada'     => now()->subDays(45),
                'diperbarui_pada' => now()->subDays(45),
            ],
            [
                'kode'            => 'CBG-MDN-01',
                'nama'            => 'Cabang Medan Sunggal',
                'kota'            => 'Medan',
                'alamat'          => 'Jl. Sunggal No. 200, Medan Sunggal, Medan, Sumatera Utara 20127',
                'telepon'         => '061-88990011',
                'dibuat_pada'     => now()->subDays(40),
                'diperbarui_pada' => now()->subDays(40),
            ],
            [
                'kode'            => 'CBG-MKS-01',
                'nama'            => 'Cabang Makassar Panakkukang',
                'kota'            => 'Makassar',
                'alamat'          => 'Jl. Boulevard Panakkukang No. 5, Panakkukang, Makassar, Sulawesi Selatan 90231',
                'telepon'         => '0411-447788',
                'dibuat_pada'     => now()->subDays(30),
                'diperbarui_pada' => now()->subDays(30),
            ],
        ];

        DB::table('cabang')->insert($cabang);

        $this->command->info('✅ CabangSeeder: ' . count($cabang) . ' cabang berhasil dibuat.');
    }
}
