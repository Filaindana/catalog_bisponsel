<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GambarProduk extends Model
{
    protected $table = 'gambar_produk';

    public $timestamps = false;

    protected $fillable = [
        'produk_id',
        'url_gambar',
    ];

    public function getUrlGambarAttribute($value)
    {
        if ($value) {
            $value = preg_replace('/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i', '', $value);
            $value = ltrim($value, '/');
            if (\Illuminate\Support\Str::startsWith($value, 'storage/')) {
                $value = substr($value, 8);
            }

            if (\Illuminate\Support\Str::startsWith($value, ['http://', 'https://'])) {
                return $value;
            }

            return asset('storage/' . $value);
        }
        return null;
    }

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }
}
