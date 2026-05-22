<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cabang extends Model
{
    protected $table = 'cabang';

    const CREATED_AT = 'dibuat_pada';
    const UPDATED_AT = 'diperbarui_pada';

    protected $fillable = [
        'kode',
        'nama',
        'kota',
        'alamat',
        'telepon',
        'email',
        'jam_buka',
        'jam_tutup',
        'maps_link',
        'foto',
    ];

    protected $casts = [
        'jam_buka'  => 'string',
        'jam_tutup' => 'string',
    ];

    protected $appends = ['foto_url'];

    public function getFotoUrlAttribute(): ?string
    {
        if (! $this->foto) {
            return null;
        }

        return asset('storage/' . $this->foto);
    }


    public function aktivitas(): HasMany
    {
        return $this->hasMany(Aktivitas::class, 'cabang_id');
    }
}
