<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('promo')->delete();

        $promo = [
            [
                'nama'            => 'Mega Tech Sale 2024',
                'deskripsi'       => 'Event sale terbesar tahun ini! Dapatkan diskon hingga 40% untuk semua produk laptop dan smartphone premium. Berlaku untuk pembelian langsung di toko maupun online.',
                'tanggal_mulai'   => now()->subDays(5)->toDateString(),
                'tanggal_selesai' => now()->addDays(10)->toDateString(),
                'status'          => 'aktif',
                'banner'          => 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
                'dibuat_pada'     => now()->subDays(15),
                'diperbarui_pada' => now()->subDays(5),
            ],
            [
                'nama'            => 'Harbolnas 12.12',
                'deskripsi'       => 'Hari Belanja Online Nasional 12 Desember! Promo flash sale setiap jam dengan diskon ekstra 50%, gratis ongkir seluruh Indonesia, dan cashback hingga Rp 500.000.',
                'tanggal_mulai'   => now()->addDays(20)->toDateString(),
                'tanggal_selesai' => now()->addDays(21)->toDateString(),
                'status'          => 'segera',
                'banner'          => 'https://images.unsplash.com/photo-1607082349566-187342175400?w=1200',
                'dibuat_pada'     => now()->subDays(10),
                'diperbarui_pada' => now()->subDays(10),
            ],
            [
                'nama'            => 'Gaming Festival',
                'deskripsi'       => 'Promo spesial untuk para gamer! Diskon 25% untuk semua produk gaming, bundling controller gratis untuk pembelian konsol, dan cicilan 0% hingga 24 bulan.',
                'tanggal_mulai'   => now()->subDays(3)->toDateString(),
                'tanggal_selesai' => now()->addDays(7)->toDateString(),
                'status'          => 'aktif',
                'banner'          => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200',
                'dibuat_pada'     => now()->subDays(10),
                'diperbarui_pada' => now()->subDays(3),
            ],
            [
                'nama'            => 'Audio Lover Week',
                'deskripsi'       => 'Pekan khusus produk audio! Diskon 30% untuk headphone dan speaker pilihan, gratis earphone senilai Rp 200.000 setiap pembelian di atas Rp 2.000.000.',
                'tanggal_mulai'   => now()->subDays(20)->toDateString(),
                'tanggal_selesai' => now()->subDays(13)->toDateString(),
                'status'          => 'berakhir',
                'banner'          => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200',
                'dibuat_pada'     => now()->subDays(30),
                'diperbarui_pada' => now()->subDays(13),
            ],
            [
                'nama'            => 'Back to School 2024',
                'deskripsi'       => 'Persiapkan tahun ajaran baru dengan laptop dan tablet terbaik! Diskon khusus pelajar hingga 20% dengan bukti kartu pelajar/mahasiswa aktif. Cicilan pelajar mulai 0%.',
                'tanggal_mulai'   => now()->addDays(30)->toDateString(),
                'tanggal_selesai' => now()->addDays(44)->toDateString(),
                'status'          => 'segera',
                'banner'          => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
                'dibuat_pada'     => now()->subDays(5),
                'diperbarui_pada' => now()->subDays(5),
            ],
        ];

        DB::table('promo')->insert($promo);

        $this->command->info('✅ PromoSeeder: ' . count($promo) . ' promo berhasil dibuat.');
    }
}
