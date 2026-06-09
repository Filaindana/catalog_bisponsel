<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $table = 'brands';

    protected $fillable = [
        'nama',
        'logo',
    ];

    public function getLogoAttribute($value)
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

            $url = \Illuminate\Support\Facades\Storage::url($value);
            return \Illuminate\Support\Str::startsWith($url, 'http') ? $url : asset($url);
        }
        return '/fallback-brand.png';
    }

    public function produk()
    {
        return $this->hasMany(Produk::class, 'brand_id');
    }
}
