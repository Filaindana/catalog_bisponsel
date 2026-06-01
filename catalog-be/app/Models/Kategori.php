<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kategori extends Model
{
    protected $table = 'kategori';

    const CREATED_AT = 'dibuat_pada';
    const UPDATED_AT = 'diperbarui_pada';

    protected $fillable = [
        'nama',
        'slug',
        'gambar',
    ];

    protected $appends = [
        'gambar_url',
        'jumlah_produk',
    ];

    protected static function booted()
    {
        static::saving(function ($kategori) {
            if (empty($kategori->slug)) {
                $kategori->slug = \Illuminate\Support\Str::slug($kategori->nama);
            }
        });
    }

    public function getGambarUrlAttribute()
    {
        if ($this->gambar) {
            if (\Illuminate\Support\Str::startsWith($this->gambar, ['http://', 'https://', '/'])) {
                return $this->gambar;
            }
            return asset('storage/' . ltrim($this->gambar, '/'));
        }
        return '/fallback-category.jpg';
    }

    public function getJumlahProdukAttribute()
    {
        return $this->produk_count ?? $this->produk()->count();
    }

    public function produk(): HasMany
    {
        return $this->hasMany(Produk::class, 'kategori_id');
    }
}
