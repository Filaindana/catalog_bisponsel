<?php

namespace Database\Seeders;

use Carbon\Carbon;
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
                'email'           => 'cabang.jkt1@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid',
                'dibuat_pada'     => now()->subDays(90),
                'diperbarui_pada' => now()->subDays(90),
            ],
            [
                'kode'            => 'CBG-JKT-02',
                'nama'            => 'Cabang Jakarta Selatan',
                'kota'            => 'Jakarta',
                'alamat'          => 'Jl. TB Simatupang No. 12, Cilandak, Jakarta Selatan, DKI Jakarta 12430',
                'telepon'         => '021-78994455',
                'email'           => 'cabang.jkt2@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid',
                'dibuat_pada'     => now()->subDays(80),
                'diperbarui_pada' => now()->subDays(80),
            ],
            [
                'kode'            => 'CBG-SBY-01',
                'nama'            => 'Cabang Surabaya Pusat',
                'kota'            => 'Surabaya',
                'alamat'          => 'Jl. Tunjungan No. 1, Genteng, Surabaya, Jawa Timur 60275',
                'telepon'         => '031-50011122',
                'email'           => 'cabang.sby1@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid',
                'dibuat_pada'     => now()->subDays(75),
                'diperbarui_pada' => now()->subDays(75),
            ],
            [
                'kode'            => 'CBG-SBY-02',
                'nama'            => 'Cabang Surabaya Timur',
                'kota'            => 'Surabaya',
                'alamat'          => 'Jl. Raya Kenjeran No. 500, Bulak, Surabaya, Jawa Timur 60129',
                'telepon'         => '031-50033344',
                'email'           => 'cabang.sby2@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid',
                'dibuat_pada'     => now()->subDays(60),
                'diperbarui_pada' => now()->subDays(60),
            ],
            [
                'kode'            => 'CBG-BDG-01',
                'nama'            => 'Cabang Bandung Dago',
                'kota'            => 'Bandung',
                'alamat'          => 'Jl. Ir. H. Juanda No. 111, Coblong, Bandung, Jawa Barat 40132',
                'telepon'         => '022-25678800',
                'email'           => 'cabang.bdg@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid',
                'dibuat_pada'     => now()->subDays(55),
                'diperbarui_pada' => now()->subDays(55),
            ],
            [
                'kode'            => 'CBG-YGY-01',
                'nama'            => 'Cabang Yogyakarta Malioboro',
                'kota'            => 'Yogyakarta',
                'alamat'          => 'Jl. Malioboro No. 77, Gedongtengen, Yogyakarta, DI Yogyakarta 55271',
                'telepon'         => '0274-556677',
                'email'           => 'cabang.ygy@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!１f0!２f0!３f0!３m2!１i１０２４!２i７６８!４f１３.１!３m３!１m２!１s０ｘ２dd７fb０f１fc７c１５１%３A０x８７９a９６２３７dbe４９f５!２sPT.%２０Indo%２０Bismar!５e０!３m２!１sid!２sid!４v１７７６３１２９０３１６９!５m２!１sid!２sid',
                'dibuat_pada'     => now()->subDays(45),
                'diperbarui_pada' => now()->subDays(45),
            ],
            [
                'kode'            => 'CBG-MDN-01',
                'nama'            => 'Cabang Medan Sunggal',
                'kota'            => 'Medan',
                'alamat'          => 'Jl. Sunggal No. 200, Medan Sunggal, Medan, Sumatera Utara 20127',
                'telepon'         => '061-88990011',
                'email'           => 'cabang.mdn@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid',
                'dibuat_pada'     => now()->subDays(40),
                'diperbarui_pada' => now()->subDays(40),
            ],
            [
                'kode'            => 'CBG-MKS-01',
                'nama'            => 'Cabang Makassar Panakkukang',
                'kota'            => 'Makassar',
                'alamat'          => 'Jl. Boulevard Panakkukang No. 5, Panakkukang, Makassar, Sulawesi Selatan 90231',
                'telepon'         => '0411-447788',
                'email'           => 'cabang.mks@bizponsel.com',
                'jam_buka'        => '08:00',
                'jam_tutup'       => '17:00',
                'maps_link'       => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.359934165828!2d112.74541357541085!3d-7.31340119269457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0f1fc7c151%3A0x879a96237dbe49f5!2sPT.%20Indo%20Bismar!5e0!3m2!1sid!2sid!4v1776312903169!5m2!1sid!2sid',
                'dibuat_pada'     => now()->subDays(30),
                'diperbarui_pada' => now()->subDays(30),
            ],
        ];

        DB::table('cabang')->insert($cabang);

        $this->command->info('✅ CabangSeeder: ' . count($cabang) . ' cabang berhasil dibuat.');

    }
}
