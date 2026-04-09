<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengaturan extends Model
{
    protected $table = 'pengaturan';

    const CREATED_AT = null;
    const UPDATED_AT = 'diperbarui_pada';

    protected $fillable = [
        'nama_situs',
        'email',
        'telepon',
        'alamat',
        'nama_ceo',
        'foto_ceo',
    ];
}
