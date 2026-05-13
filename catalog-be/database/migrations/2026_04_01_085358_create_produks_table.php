<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_id')->constrained('kategori')->cascadeOnDelete();
            $table->string('nama');
            $table->string('slug')->unique();
            $table->text('deskripsi')->nullable();
            $table->text('deskripsi_detail')->nullable();
            $table->bigInteger('harga');
            $table->integer('stok')->default(0);
            $table->float('rating')->default(0);
            $table->boolean('adalah_promo')->default(false);
            $table->string('gambar')->nullable();
            $table->timestamp('dibuat_pada')->useCurrent();
            $table->timestamp('diperbarui_pada')->useCurrentOnUpdate()->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};
