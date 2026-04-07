<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Produk extends Model
{
    protected $table = 'produk';

    const CREATED_AT = 'dibuat_pada';
    const UPDATED_AT = 'diperbarui_pada';

    protected $fillable = [
        'kategori_id',
        'nama',
        'deskripsi',
        'harga',
        'stok',
        'rating',
        'adalah_promo',
    ];

    protected $casts = [
        'harga'       => 'integer',
        'stok'        => 'integer',
        'rating'      => 'float',
        'adalah_promo' => 'boolean',
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }

    public function gambar(): HasMany
    {
        return $this->hasMany(GambarProduk::class, 'produk_id');
    }

    public function spesifikasi(): HasMany
    {
        return $this->hasMany(SpesifikasiProduk::class, 'produk_id');
    }

    public function promo(): BelongsToMany
    {
        return $this->belongsToMany(Promo::class, 'promo_produk', 'produk_id', 'promo_id');
    }

    public function penjualan(): HasMany
    {
        return $this->hasMany(PenjualanProduk::class, 'produk_id');
    }

    public function difavoritkan(): HasMany
    {
        return $this->hasMany(Favorit::class, 'produk_id');
    }
}
