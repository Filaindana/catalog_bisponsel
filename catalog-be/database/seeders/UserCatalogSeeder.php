<?php

namespace Database\Seeders;

use App\Models\UserCatalog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserCatalogSeeder extends Seeder
{
    public function run(): void
    {
        // 👑 ADMIN
        UserCatalog::create([
            'name' => 'Admin Bizponsel',
            'email' => 'admin@bizponsel.com',
            'password' => Hash::make('123456'),
            'role' => 'admin'
        ]);

        // 👤 USER PUBLIC
        UserCatalog::create([
            'name' => 'User Bizponsel',
            'email' => 'user@bizponsel.com',
            'password' => Hash::make('123456'),
            'role' => 'user'
        ]);
    }
}
