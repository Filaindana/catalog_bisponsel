<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Users::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            UserSeeder::class,
            KategoriSeeder::class,
            ProdukSeeder::class,
            GambarProdukSeeder::class,
            SpesifikasiProdukSeeder::class,
            // DetailDeskripsiSeeder::class,
            CabangSeeder::class,
            AktivitasSeeder::class,
            PromoSeeder::class,
            PromoProdukSeeder::class,
            KontakSeeder::class,
            PengaturanSeeder::class,
            PenjualanProdukSeeder::class,
            FavoritSeeder::class,
        ]);
    }
}
