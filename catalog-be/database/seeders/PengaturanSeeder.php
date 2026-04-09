<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PengaturanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('pengaturan')->delete();

        DB::table('pengaturan')->insert([
            'nama_situs'      => 'TechStore Indonesia',
            'email'           => 'info@techstore.id',
            'telepon'         => '021-57889900',
            'alamat'          => 'Jl. Sudirman No. 88, Tanah Abang, Jakarta Pusat, DKI Jakarta 10220',
            'nama_ceo'        => 'Budi Hartono Santoso',
            'foto_ceo'        => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            'diperbarui_pada' => now(),
        ]);

        $this->command->info('✅ PengaturanSeeder: Pengaturan situs berhasil dibuat.');
    }
}
