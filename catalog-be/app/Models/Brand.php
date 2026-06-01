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
            if (\Illuminate\Support\Str::startsWith($value, ['http://', 'https://', '/'])) {
                return $value;
            }
            $url = \Illuminate\Support\Facades\Storage::url($value);
            return '/' . ltrim(parse_url($url, PHP_URL_PATH), '/');
        }
        return '/fallback-brand.png';
    }

    public function produk()
    {
        return $this->hasMany(Produk::class, 'brand_id');
    }
}
