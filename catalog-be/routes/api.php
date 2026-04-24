<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// 🔐 AUTH
// use App\Http\Controllers\Api\AuthController;

// 📦 CONTROLLERS (INDONESIA)
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\PromoProdukController;
use App\Http\Controllers\CabangController;
use App\Http\Controllers\AktivitasController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\FavoritController;
use App\Http\Controllers\PenjualanProdukController;
use App\Http\Controllers\GambarProdukController;
use App\Http\Controllers\SpesifikasiProdukController;
use App\Http\Controllers\PengaturanController;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// =======================
// 🔐 AUTH
// =======================
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
    });
});


// =======================
// 🌐 PUBLIC
// =======================

// Produk + relasi
// Route::get('/produk/latest', [ProdukController::class, 'latest']);
// Route::get('/produk/latest/list', [ProdukController::class, 'latest']);
Route::apiResource('produk', ProdukController::class)->only(['index', 'show']);
Route::apiResource('kategori', KategoriController::class)->only(['index', 'show']);
Route::apiResource('promo', PromoController::class)->only(['index', 'show']);

// Relasi tambahan
Route::get('/produk/{id}', [GambarProdukController::class, 'show']);
Route::get('/produk/{id}/gambar', [GambarProdukController::class, 'index']);
Route::get('/produk/{id}/spesifikasi', [SpesifikasiProdukController::class, 'index']);

// Cabang & aktivitas
Route::apiResource('cabang', CabangController::class)->only(['index', 'show']);
Route::apiResource('aktivitas', AktivitasController::class)->only(['index', 'show']);

// Kontak (public bisa kirim)
Route::post('/kontak', [KontakController::class, 'store']);


// =======================
// 🔒 PROTECTED (LOGIN)
// =======================
Route::middleware('auth:sanctum')->group(function () {

    // 👤 User
    Route::get('/users', [UsersController::class, 'index']);
    Route::put('/users/{id}', [UsersController::class, 'update']);

    // 🛍️ Produk
    Route::apiResource('produk', ProdukController::class)->except(['index', 'show']);

    // 📁 Kategori
    Route::apiResource('kategori', KategoriController::class)->except(['index', 'show']);

    // 🎁 Promo
    Route::apiResource('promo', PromoController::class)->except(['index', 'show']);

    // 🔗 Promo Produk
    // Route::apiResource('promo-produk', PromoProdukController::class);

    // 🏢 Cabang & Aktivitas
    Route::apiResource('cabang', CabangController::class)->except(['index', 'show']);
    Route::apiResource('aktivitas', AktivitasController::class)->except(['index', 'show']);

    // ⭐ Favorit
    Route::get('/favorit', [FavoritController::class, 'index']);
    // Route::post('/favorit/{produk_id}', [FavoritController::class, 'store']);
    Route::post('/favorit', [FavoritController::class, 'store']);
    Route::delete('/favorit/{produk_id}', [FavoritController::class, 'destroy']);

    // 📊 Penjualan
    Route::apiResource('penjualan', PenjualanProdukController::class);

    // ⚙️ Pengaturan
    Route::get('/pengaturan', [PengaturanController::class, 'index']);
    Route::put('/pengaturan', [PengaturanController::class, 'update']);

    // 📩 Kontak (admin lihat pesan)
    Route::get('/kontak', [KontakController::class, 'index']);
});
