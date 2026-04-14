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
        'jam_buka',
        'jam_tutup',
        'maps_link',
    ];

    protected $casts = [
        'jam_buka'  => 'string',
        'jam_tutup' => 'string',
    ];

    public function aktivitas(): HasMany
    {
        return $this->hasMany(Aktivitas::class, 'cabang_id');
    }
}
