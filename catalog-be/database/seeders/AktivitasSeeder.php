<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AktivitasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('aktivitas')->delete();

        $aktivitas = [
            [
                'judul'      => 'Grand Opening Cabang Jakarta Pusat',
                'deskripsi'  => 'Pembukaan resmi cabang pertama kami di jantung ibukota. Acara dimeriahkan dengan promo diskon hingga 50% untuk semua produk, demo produk terbaru, dan hadiah menarik bagi 100 pengunjung pertama.',
                'cabang_id'  => 1,
                'dibuat_pada'=> now()->subDays(90),
            ],
            [
                'judul'      => 'Workshop Fotografi Profesional',
                'deskripsi'  => 'Workshop eksklusif bersama fotografer profesional untuk memaksimalkan penggunaan kamera mirrorless terbaru. Peserta mendapat diskon khusus 15% untuk pembelian produk kamera.',
                'cabang_id'  => 1,
                'dibuat_pada'=> now()->subDays(60),
            ],
            [
                'judul'      => 'Pameran Teknologi Terkini Jakarta Selatan',
                'deskripsi'  => 'Pameran selama 3 hari menampilkan produk-produk elektronik terbaru 2024. Pengunjung dapat mencoba langsung laptop gaming, smartphone flagship, dan berbagai gadget kekinian.',
                'cabang_id'  => 2,
                'dibuat_pada'=> now()->subDays(55),
            ],
            [
                'judul'      => 'Grand Opening Cabang Surabaya Pusat',
                'deskripsi'  => 'Hadir di Surabaya! Pembukaan cabang ke-3 kami dengan konsep toko interaktif pertama di Jawa Timur. Nikmati promo spesial opening dan cicilan 0% untuk semua produk.',
                'cabang_id'  => 3,
                'dibuat_pada'=> now()->subDays(75),
            ],
            [
                'judul'      => 'Gaming Tournament Surabaya 2024',
                'deskripsi'  => 'Turnamen gaming terbuka untuk umum dengan total hadiah Rp 25.000.000. Cabang kami menjadi venue utama dengan PlayStation 5 dan PC Gaming terbaru sebagai arena pertandingan.',
                'cabang_id'  => 3,
                'dibuat_pada'=> now()->subDays(45),
            ],
            [
                'judul'      => 'Peluncuran iPhone 15 Series Surabaya Timur',
                'deskripsi'  => 'Menjadi salah satu toko resmi pertama yang meluncurkan iPhone 15 Pro Max di Surabaya. Antrian pre-order telah mencapai 200+ orang dengan berbagai program trade-in menarik.',
                'cabang_id'  => 4,
                'dibuat_pada'=> now()->subDays(40),
            ],
            [
                'judul'      => 'Back to School Festival Bandung',
                'deskripsi'  => 'Program khusus pelajar dan mahasiswa dengan diskon laptop hingga 30% dan gratis tas laptop senilai Rp 350.000. Cicilan pelajar tersedia mulai 0% selama 12 bulan.',
                'cabang_id'  => 5,
                'dibuat_pada'=> now()->subDays(35),
            ],
            [
                'judul'      => 'Tech Talk: AI & Gadget Masa Depan',
                'deskripsi'  => 'Seminar teknologi gratis menghadirkan pembicara dari industri teknologi terkemuka. Membahas tren kecerdasan buatan, IoT, dan bagaimana teknologi mengubah gaya hidup kita.',
                'cabang_id'  => 5,
                'dibuat_pada'=> now()->subDays(25),
            ],
            [
                'judul'      => 'Promo Hari Batik Yogyakarta',
                'deskripsi'  => 'Rayakan Hari Batik Nasional bersama kami! Setiap pembelian produk di atas Rp 1.000.000 mendapatkan kain batik eksklusif Yogyakarta. Khusus cabang Malioboro.',
                'cabang_id'  => 6,
                'dibuat_pada'=> now()->subDays(20),
            ],
            [
                'judul'      => 'Peluncuran Samsung Galaxy S24 Medan',
                'deskripsi'  => 'Event perdana peluncuran Samsung Galaxy S24 Ultra di Medan dengan demo langsung fitur AI Galaxy dan S Pen. Free case premium untuk 50 pembeli pertama.',
                'cabang_id'  => 7,
                'dibuat_pada'=> now()->subDays(15),
            ],
            [
                'judul'      => 'Grand Opening Cabang Makassar',
                'deskripsi'  => 'Ekspansi kami ke Indonesia Timur! Pembukaan cabang Makassar dengan promo gila-gilaan: beli 1 gratis aksesoris senilai Rp 500.000 selama hari pertama pembukaan.',
                'cabang_id'  => 8,
                'dibuat_pada'=> now()->subDays(30),
            ],
            [
                'judul'      => 'Service Day: Gratis Cek & Clean Perangkat',
                'deskripsi'  => 'Hari pelayanan gratis! Bawa laptop, smartphone, atau gadget Anda untuk pengecekan kondisi, pembersihan, dan konsultasi tanpa biaya. Terbatas untuk 50 perangkat per hari.',
                'cabang_id'  => 8,
                'dibuat_pada'=> now()->subDays(10),
            ],
        ];

        DB::table('aktivitas')->insert($aktivitas);

        $this->command->info('✅ AktivitasSeeder: ' . count($aktivitas) . ' aktivitas berhasil dibuat.');
    }
}
