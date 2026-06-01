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
                'password' => Hash::make('SuperadminBizPonsel123!'),
                'peran' => 'superadmin',
                'is_active' => true,
                'dibuat_pada' => now(),
                'diperbarui_pada' => now(),
            ],
            [
                'nama' => 'Admin',
                'email' => 'admin@bizponsel.com',
                'password' => Hash::make('AdminBizPonsel123!'),
                'peran' => 'admin',
                'is_active' => true,
                'dibuat_pada' => now(),
                'diperbarui_pada' => now(),
            ],
            [
                'nama' => 'User',
                'email' => 'user@bizponsel.com',
                'password' => Hash::make('UserBizPonsel123!'),
                'peran' => 'user',
                'is_active' => true,
                'dibuat_pada' => now(),
                'diperbarui_pada' => now(),
            ],
        ];

        DB::table('users')->insert($users);

        $this->command->info('✅ Default users created: superadmin/admin/user (password: SuperadminBizPonsel123!, AdminBizPonsel123!, UserBizPonsel123!)');
    }
}
