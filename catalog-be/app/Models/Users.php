<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

class Users extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'users';

    const CREATED_AT = 'dibuat_pada';
    const UPDATED_AT = 'diperbarui_pada';

    protected $fillable = [
        'nama',
        'email',
        'password',
        'peran',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'peran' => 'string',
    ];

    public function favorit(): HasMany
    {
        return $this->hasMany(Favorit::class, 'user_id');
    }

    public function produkFavorit()
    {
        return $this->belongsToMany(Produk::class, 'favorit', 'user_id', 'produk_id');
    }
}
