<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PenjualanProduk extends Model
{
    protected $table = 'penjualan_produk';

    public $timestamps = false;

    protected $fillable = [
        'produk_id',
        'total_terjual',
        'tanggal',
    ];

    protected $casts = [
        'tanggal'      => 'date',
        'total_terjual' => 'integer',
    ];

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }
}
