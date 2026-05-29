<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->delete();

        $users = [
            [
                'nama' => 'Superadmin',
                'email' => 'superadmin@bizponsel.com',
                'password' => Hash::make('password'),
                'peran' => 'superadmin',
                'is_active' => true,
                'dibuat_pada' => now(),
                'diperbarui_pada' => now(),
            ],
            [
                'nama' => 'Admin',
                'email' => 'admin@bizponsel.com',
                'password' => Hash::make('password'),
                'peran' => 'admin',
                'is_active' => true,
                'dibuat_pada' => now(),
                'diperbarui_pada' => now(),
            ],
            [
                'nama' => 'User',
                'email' => 'user@bizponsel.com',
                'password' => Hash::make('password'),
                'peran' => 'user',
                'is_active' => true,
                'dibuat_pada' => now(),
                'diperbarui_pada' => now(),
            ],
        ];

        DB::table('users')->insert($users);

        $this->command->info('✅ Default users created: superadmin/admin/user (password: password)');
    }
}
