<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('promo')->delete();

        $now = Carbon::now();

        $promo = [];

        $data = [
            ['Flash Gadget Sale', 'Diskon hingga 50% untuk gadget terbaru.'],
            ['Laptop Clearance', 'Cuci gudang laptop berbagai brand.'],
            ['Smartphone Week', 'Promo spesial smartphone flagship & mid-range.'],
            ['Weekend Deal', 'Diskon spesial akhir pekan.'],
            ['Midnight Sale', 'Promo terbatas hanya tengah malam.'],
            ['Ramadhan Sale', 'Diskon spesial Ramadhan + cashback.'],
            ['Lebaran Big Sale', 'Promo besar menjelang Lebaran.'],
            ['11.11 Super Sale', 'Diskon besar 11.11 + gratis ongkir.'],
            ['12.12 Year End Sale', 'Promo akhir tahun besar-besaran.'],
            ['New Year Blast', 'Promo awal tahun penuh diskon.'],
            ['Office Essentials', 'Diskon perlengkapan kantor & kerja.'],
            ['Content Creator Gear', 'Diskon kamera & aksesoris.'],
            ['Work From Home Kit', 'Promo perangkat kerja dari rumah.'],
            ['Smart Living Sale', 'Diskon smart home devices.'],
            ['Gaming Gear Rush', 'Diskon keyboard, mouse, headset gaming.'],
        ];

        foreach ($data as $i => $item) {

            if ($i < 7) {
                $status = 'aktif';
                $start = $now->copy()->subDays(rand(1, 5));
                $end   = $now->copy()->addDays(rand(5, 15));
            } elseif ($i < 11) {
                $status = 'segera';
                $start = $now->copy()->addDays(rand(5, 15));
                $end   = $start->copy()->addDays(rand(5, 10));
            } else {
                $status = 'berakhir';
                $start = $now->copy()->subDays(rand(20, 40));
                $end   = $now->copy()->subDays(rand(1, 10));
            }

            $promo[] = [
                'nama' => $item[0],
                'deskripsi' => $item[1],
                'tanggal_mulai' => $start,
                'tanggal_selesai' => $end,
                'status' => $status,
                'banner' => 'promo/banner' . (($i % 6) + 1) . '.jpeg',
                'dibuat_pada' => $start->copy()->subDays(rand(5, 15)),
                'diperbarui_pada' => $start,
            ];
        }

        DB::table('promo')->insert($promo);

        $this->command->info('✅ PromoSeeder: ' . count($promo) . ' promo berhasil dibuat.');
    }
}
