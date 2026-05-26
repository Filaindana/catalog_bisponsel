<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        Setting::truncate();

        Setting::create([
            'profile' => [
                'nama' => 'Budi Hartono Santoso',
                'email' => 'admin@bizponselcatalog.com',
                'avatar' => null,
                'jabatan' => 'CEO & Founder',
                'quote' => 'Kami berkomitmen memberikan layanan teknologi terbaik dengan layanan yang mudah diakses dan terpercaya.',
            ],
            'kontak' => [
                'whatsapp' => '+62 812-3456-7890',
                'email' => 'info@bizponselcatalog.com',
                'alamat' => 'Jl. Sudirman No. 88, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220',
                'telepon' => '021-57889900',
                'maps_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.096!2d112.7452!3d-7.3118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb0b5c5e5e5f%3A0x1234567890abcdef!2sJl.%20Bendul%20Merisi%20Selatan%20XI%2C%20Bendul%20Merisi%2C%20Kec.%20Wonocolo%2C%20Kota%20SBY%2C%20Jawa%20Timur%2060239!5e0!3m2!1sid!2sid!4v1',
            ],
            'jam_operasional' => [
                'pusat' => [
                    'senin_jumat' => ['buka' => '08:30', 'tutup' => '17:00', 'libur' => false],
                    'sabtu' => ['buka' => '08:00', 'tutup' => '15:00', 'libur' => false],
                    'minggu' => ['libur' => true],
                ],
                'cabang' => [
                    [
                        'id' => 1,
                        'nama' => 'Marina',
                        'shifts' => [
                            ['label' => 'Shift 1', 'buka' => '09:30', 'tutup' => '16:00'],
                            ['label' => 'Shift 2', 'buka' => '16:00', 'tutup' => '21:30'],
                        ],
                    ],
                ],
            ],
            'social_media' => [
                ['label' => 'Instagram', 'url' => 'https://instagram.com/bizponsel.id', 'icon' => 'instagram'],
                ['label' => 'WhatsApp', 'url' => 'https://wa.me/6281234567890', 'icon' => 'whatsapp'],
            ],
        ]);
    }
}
