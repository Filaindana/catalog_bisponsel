<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Promo extends Model
{
    protected $table = 'promo';

    const CREATED_AT = 'dibuat_pada';
    const UPDATED_AT = 'diperbarui_pada';

    protected $fillable = [
        'nama',
        'deskripsi',
        'tanggal_mulai',
        'tanggal_selesai',
        'banner',
        'status',
    ];

    protected $appends = [
        'banner_url',
    ];

    public function getBannerUrlAttribute()
    {
        if ($this->banner) {
            $val = preg_replace('/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i', '', $this->banner);
            $val = ltrim($val, '/');
            if (\Illuminate\Support\Str::startsWith($val, 'storage/')) {
                $val = substr($val, 8);
            }

            if (\Illuminate\Support\Str::startsWith($val, ['http://', 'https://'])) {
                return $val;
            }

            return asset('storage/' . $val);
        }
        return '/fallback-promo.png';
    }

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
    ];

    public function produk(): BelongsToMany
    {
        return $this->belongsToMany(Produk::class, 'promo_produk', 'promo_id', 'produk_id');
    }

    // 🔥 AUTO STATUS
    public function getStatusAutoAttribute()
    {
        $now = Carbon::now();

        if ($this->tanggal_mulai > $now) return 'segera';
        if ($this->tanggal_selesai < $now) return 'berakhir';
        return 'aktif';
    }
}
