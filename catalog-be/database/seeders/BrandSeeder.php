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

        foreach ($displayNames as $filename => $name) {
            $possiblePath = 'brand/' . $filename . '.png';
            $logo = null;

            if (Storage::disk('public')->exists($possiblePath)) {
                $logo = $possiblePath;
            } else {
                $fullPath = storage_path('app/public/' . $possiblePath);
                if (file_exists($fullPath)) {
                    $logo = $possiblePath;
                }
            }

            Brand::updateOrCreate(
                ['nama' => $name],
                ['logo' => $logo]
            );
        }
    }
}
