<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cabang', function (Blueprint $table) {
            $table->time('jam_buka')->nullable()->after('alamat');
            $table->time('jam_tutup')->nullable()->after('jam_buka');
            $table->string('maps_link')->nullable()->after('jam_tutup');
        });
    }

    public function down(): void
    {
        Schema::table('cabang', function (Blueprint $table) {
            $table->dropColumn(['jam_buka', 'jam_tutup', 'maps_link']);
        });
    }
};
