<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GambarProdukSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('gambar_produk')->delete();

        // Setiap produk mendapat 2-3 gambar
        // produk_id mengikuti urutan insert ProdukSeeder (1-20)
        $gambar = [
            // Produk 1 - ASUS ROG Zephyrus G14
            ['produk_id' => 1, 'url_gambar' => 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800'],
            ['produk_id' => 1, 'url_gambar' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'],
            ['produk_id' => 1, 'url_gambar' => 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'],

            // Produk 2 - Lenovo ThinkPad X1
            ['produk_id' => 2, 'url_gambar' => 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800'],
            ['produk_id' => 2, 'url_gambar' => 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800'],

            // Produk 3 - MacBook Air M2
            ['produk_id' => 3, 'url_gambar' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'],
            ['produk_id' => 3, 'url_gambar' => 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'],
            ['produk_id' => 3, 'url_gambar' => 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800'],

            // Produk 4 - Acer Aspire 5
            ['produk_id' => 4, 'url_gambar' => 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'],
            ['produk_id' => 4, 'url_gambar' => 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'],

            // Produk 5 - Dell XPS 15
            ['produk_id' => 5, 'url_gambar' => 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800'],
            ['produk_id' => 5, 'url_gambar' => 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800'],

            // Produk 6 - Samsung Galaxy S24 Ultra
            ['produk_id' => 6, 'url_gambar' => 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'],
            ['produk_id' => 6, 'url_gambar' => 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800'],
            ['produk_id' => 6, 'url_gambar' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800'],

            // Produk 7 - iPhone 15 Pro Max
            ['produk_id' => 7, 'url_gambar' => 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'],
            ['produk_id' => 7, 'url_gambar' => 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800'],

            // Produk 8 - Xiaomi 14 Pro
            ['produk_id' => 8, 'url_gambar' => 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800'],
            ['produk_id' => 8, 'url_gambar' => 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'],

            // Produk 9 - OPPO Find X7
            ['produk_id' => 9, 'url_gambar' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'],
            ['produk_id' => 9, 'url_gambar' => 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800'],

            // Produk 10 - Samsung Galaxy Tab S9 Ultra
            ['produk_id' => 10, 'url_gambar' => 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800'],
            ['produk_id' => 10, 'url_gambar' => 'https://images.unsplash.com/photo-1542751110-a514c0740ea3?w=800'],

            // Produk 11 - Logitech MX Master 3S
            ['produk_id' => 11, 'url_gambar' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'],
            ['produk_id' => 11, 'url_gambar' => 'https://images.unsplash.com/photo-1613141411244-0e4ac259d45d?w=800'],

            // Produk 12 - Keychron Q1 Pro
            ['produk_id' => 12, 'url_gambar' => 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800'],
            ['produk_id' => 12, 'url_gambar' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'],

            // Produk 13 - Anker Power Bank
            ['produk_id' => 13, 'url_gambar' => 'https://images.unsplash.com/photo-1609592786362-1f62bd656f71?w=800'],
            ['produk_id' => 13, 'url_gambar' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],

            // Produk 14 - Sony WH-1000XM5
            ['produk_id' => 14, 'url_gambar' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
            ['produk_id' => 14, 'url_gambar' => 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'],

            // Produk 15 - AirPods Pro
            ['produk_id' => 15, 'url_gambar' => 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800'],
            ['produk_id' => 15, 'url_gambar' => 'https://images.unsplash.com/photo-1633477189729-9290b3261d0a?w=800'],

            // Produk 16 - JBL Charge 5
            ['produk_id' => 16, 'url_gambar' => 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'],
            ['produk_id' => 16, 'url_gambar' => 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800'],

            // Produk 17 - Sony Alpha A7 IV
            ['produk_id' => 17, 'url_gambar' => 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'],
            ['produk_id' => 17, 'url_gambar' => 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=800'],

            // Produk 18 - DJI Pocket 3
            ['produk_id' => 18, 'url_gambar' => 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800'],
            ['produk_id' => 18, 'url_gambar' => 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],

            // Produk 19 - PlayStation 5
            ['produk_id' => 19, 'url_gambar' => 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800'],
            ['produk_id' => 19, 'url_gambar' => 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800'],

            // Produk 20 - ASUS ROG Ally
            ['produk_id' => 20, 'url_gambar' => 'https://images.unsplash.com/photo-1640955014216-75201dc57df9?w=800'],
            ['produk_id' => 20, 'url_gambar' => 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800'],

            // Produk 21 - TP-Link Router
            ['produk_id' => 21, 'url_gambar' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800'],
            ['produk_id' => 21, 'url_gambar' => 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800'],
        ];

        DB::table('gambar_produk')->insert($gambar);

        $this->command->info('✅ GambarProdukSeeder: ' . count($gambar) . ' gambar berhasil dibuat.');
    }
}
