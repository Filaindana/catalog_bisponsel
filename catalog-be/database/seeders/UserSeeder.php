<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // DB::table('users')->truncate();
        DB::table('users')->delete();

        $users = [
            [
                'nama'           => 'Super Admin',
                'email'          => 'admin@bizponsel.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'admin',
                'dibuat_pada'    => now(),
                'diperbarui_pada'=> now(),
            ],
            [
                'nama'           => 'Manajer Toko',
                'email'          => 'manajer@bizponsel.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'admin',
                'dibuat_pada'    => now()->subDays(30),
                'diperbarui_pada'=> now()->subDays(30),
            ],
            [
                'nama'           => 'Budi Santoso',
                'email'          => 'budi@gmail.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'user',
                'dibuat_pada'    => now()->subDays(20),
                'diperbarui_pada'=> now()->subDays(20),
            ],
            [
                'nama'           => 'Siti Rahayu',
                'email'          => 'siti@gmail.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'user',
                'dibuat_pada'    => now()->subDays(15),
                'diperbarui_pada'=> now()->subDays(15),
            ],
            [
                'nama'           => 'Agus Wijaya',
                'email'          => 'agus@gmail.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'user',
                'dibuat_pada'    => now()->subDays(10),
                'diperbarui_pada'=> now()->subDays(10),
            ],
            [
                'nama'           => 'Dewi Lestari',
                'email'          => 'dewi@gmail.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'user',
                'dibuat_pada'    => now()->subDays(5),
                'diperbarui_pada'=> now()->subDays(5),
            ],
            [
                'nama'           => 'Rizky Pratama',
                'email'          => 'rizky@gmail.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'user',
                'dibuat_pada'    => now()->subDays(3),
                'diperbarui_pada'=> now()->subDays(3),
            ],
            [
                'nama'           => 'Rina Marlina',
                'email'          => 'rina@gmail.com',
                'password'       => Hash::make('password123'),
                'peran'          => 'user',
                'dibuat_pada'    => now()->subDay(),
                'diperbarui_pada'=> now()->subDay(),
            ],
        ];

        DB::table('users')->insert($users);

        $this->command->info('✅ UserSeeder: ' . count($users) . ' users berhasil dibuat.');
        $this->command->info('   Admin  → admin@tokoonline.com / password123');
        $this->command->info('   User   → budi@gmail.com / password123');
    }
}
