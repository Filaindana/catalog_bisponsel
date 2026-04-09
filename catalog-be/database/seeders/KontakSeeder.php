<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KontakSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kontak')->delete();

        $kontak = [
            [
                'nama'       => 'Ahmad Fauzi',
                'email'      => 'ahmad.fauzi@gmail.com',
                'telepon'    => '081234567890',
                'pesan'      => 'Halo, saya ingin menanyakan apakah ASUS ROG Zephyrus G14 tersedia dalam warna lain selain hitam? Dan apakah bisa cicilan 0% menggunakan kartu kredit BCA?',
                'dibuat_pada'=> now()->subDays(15),
            ],
            [
                'nama'       => 'Ratna Dewi',
                'email'      => 'ratna.dewi@yahoo.com',
                'telepon'    => '082345678901',
                'pesan'      => 'Saya tertarik dengan iPhone 15 Pro Max. Apakah tersedia program trade-in untuk iPhone 13 saya? Berapa estimasi nilai trade-innya?',
                'dibuat_pada'=> now()->subDays(12),
            ],
            [
                'nama'       => 'Hendra Kurniawan',
                'email'      => 'hendra.k@outlook.com',
                'telepon'    => '083456789012',
                'pesan'      => 'Apakah cabang Surabaya menyediakan layanan service untuk MacBook Air M2? Laptop saya mengalami masalah pada keyboard beberapa tombol tidak berfungsi.',
                'dibuat_pada'=> now()->subDays(10),
            ],
            [
                'nama'       => 'Nadia Putri',
                'email'      => 'nadia.putri@gmail.com',
                'telepon'    => '084567890123',
                'pesan'      => 'Saya ingin pesan Sony WH-1000XM5 untuk hadiah ulang tahun suami saya minggu depan. Apakah ada layanan gift wrapping? Dan bisa dikirim ke Bandung dalam 1-2 hari?',
                'dibuat_pada'=> now()->subDays(8),
            ],
            [
                'nama'       => 'Doni Setiawan',
                'email'      => 'doni.s@gmail.com',
                'telepon'    => '085678901234',
                'pesan'      => 'Berapa harga Samsung Galaxy S24 Ultra jika beli cash? Apakah bisa dapat diskon lebih? Saya berencana beli 2 unit sekaligus untuk saya dan istri.',
                'dibuat_pada'=> now()->subDays(6),
            ],
            [
                'nama'       => 'Fitria Handayani',
                'email'      => 'fitria.h@gmail.com',
                'telepon'    => '086789012345',
                'pesan'      => 'Apakah TP-Link Archer AXE75 kompatibel dengan modem Indihome ZTE? Saya butuh router yang bisa coverage area rumah 2 lantai sekitar 150m2.',
                'dibuat_pada'=> now()->subDays(5),
            ],
            [
                'nama'       => 'Bagas Prasetyo',
                'email'      => 'bagas.p@gmail.com',
                'telepon'    => null,
                'pesan'      => 'Kapan PlayStation 5 Slim restock? Sudah 2 minggu saya pantau tapi selalu habis. Bisa daftarkan nama saya untuk pre-order atau waiting list?',
                'dibuat_pada'=> now()->subDays(4),
            ],
            [
                'nama'       => 'Sri Wahyuni',
                'email'      => 'sri.wahyuni@gmail.com',
                'telepon'    => '087890123456',
                'pesan'      => 'Saya seorang guru dan ingin membeli laptop untuk mengajar online. Budget saya sekitar Rp 7-9 juta. Apa rekomendasi terbaik untuk kebutuhan presentasi dan video conference?',
                'dibuat_pada'=> now()->subDays(3),
            ],
            [
                'nama'       => 'Gilang Ramadhan',
                'email'      => 'gilang.r@gmail.com',
                'telepon'    => '088901234567',
                'pesan'      => 'Harga DJI Pocket 3 apakah termasuk accessories combo? Dan apakah ada garansi resmi Indonesia? Saya seorang content creator dan butuh kamera yang ringan untuk vlog.',
                'dibuat_pada'=> now()->subDays(2),
            ],
            [
                'nama'       => 'Anisa Maharani',
                'email'      => 'anisa.m@gmail.com',
                'telepon'    => '089012345678',
                'pesan'      => 'Apakah ada program loyalty member? Saya sudah beberapa kali berbelanja di toko ini. Ingin tahu apakah ada rewards atau poin yang bisa dikumpulkan untuk pembelian berikutnya.',
                'dibuat_pada'=> now()->subDay(),
            ],
        ];

        DB::table('kontak')->insert($kontak);

        $this->command->info('✅ KontakSeeder: ' . count($kontak) . ' pesan kontak berhasil dibuat.');
    }
}
