<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpesifikasiProduk extends Model
{
    protected $table = 'spesifikasi_produk';

    public $timestamps = false;

    protected $fillable = [
        'produk_id',
        'atribut',
        'detail',
    ];

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }
}
