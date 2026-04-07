<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('penjualan_produk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produk_id')->constrained('produk')->cascadeOnDelete();
            $table->integer('total_terjual')->default(0);
            $table->date('tanggal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('penjualan_produk');
    }
};
