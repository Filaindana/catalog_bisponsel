<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mapping file names to beautiful display names
        $displayNames = [
            'acer'      => 'Acer',
            'apple'     => 'Apple',
            'asus'      => 'ASUS',
            'axioo'     => 'Axioo',
            'dell'      => 'Dell',
            'fantech'   => 'Fantech',
            'hp'        => 'HP',
            'huawei'    => 'Huawei',
            'legitech'  => 'Logitech',
            'lenovo'    => 'Lenovo',
            'microsoft' => 'Microsoft',
            'msi'       => 'MSI',
            'oneplus'   => 'OnePlus',
            'oppo'      => 'OPPO',
            'pixel'     => 'Pixel',
            'poco'      => 'POCO',
            'realme'    => 'Realme',
            'rog'       => 'ROG',
            'samsung'   => 'Samsung',
            'tecno'     => 'Tecno',
            'vivo'      => 'Vivo',
            'xiaomi'    => 'Xiaomi',
        ];

        // We check the 'public' disk
        $files = Storage::disk('public')->files('brand');

        if (empty($files)) {
            // Fallback: if public disk scan is empty, scan storage path directly
            $logoPath = storage_path('app/public/brand');
            if (file_exists($logoPath)) {
                $scanned = glob($logoPath . '/*.png');
                $files = array_map(fn($f) => 'brand/' . basename($f), $scanned);
            }
        }

        foreach ($files as $file) {
            $filename = pathinfo($file, PATHINFO_FILENAME); // e.g. 'apple'
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

            if ($extension !== 'png') {
                continue;
            }

            $name = $displayNames[strtolower($filename)] ?? Str::title($filename);

            Brand::updateOrCreate(
                ['nama' => $name],
                ['logo' => $file]
            );
        }
    }
}
