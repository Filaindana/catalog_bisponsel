<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCatalog extends Model
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];
}
