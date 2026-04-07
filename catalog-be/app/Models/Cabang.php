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
    ];

    public function aktivitas(): HasMany
    {
        return $this->hasMany(Aktivitas::class, 'cabang_id');
    }
}
