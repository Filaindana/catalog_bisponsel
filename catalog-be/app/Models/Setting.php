<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $table = 'settings';

    protected $fillable = [
        'profile',
        'kontak',
        'jam_operasional',
        'social_media',
    ];

    protected $casts = [
        'profile' => 'array',
        'kontak' => 'array',
        'jam_operasional' => 'array',
        'social_media' => 'array',
    ];
}
