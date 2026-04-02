<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 🔐 AUTH
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// 🛍️ PRODUCTS
Route::apiResource('products', ProductController::class);

// 📁 CATEGORIES
Route::apiResource('categories', CategoryController::class);

// 🏷️ BRANDS
Route::apiResource('brands', BrandController::class);

// 🎁 PROMOS
Route::apiResource('promos', PromoController::class);

// 👤 TEST USER LOGIN (optional)
Route::get('/me', function (Request $request) {
    return response()->json([
        'message' => 'API is working 🚀'
    ]);
});
