<?php

namespace App\Http\Controllers;

use App\Models\Favorit;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Exception;

class FavoritController
{
    public function index(Request $request): JsonResponse
    {
        try {
            $favorit = Favorit::with(['produk', 'produk.kategori', 'produk.brand'])
                ->where('user_id', $request->user()->id)
                ->get();

            return response()->json([
                'status' => true,
                'data'   => $favorit,
            ]);
        } catch (Exception $e) {
            Log::error('Error in FavoritController@index: ' . $e->getMessage(), [
                'user_id' => $request->user()->id ?? null,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil data favorit: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'produk_id' => 'required|exists:produk,id',
            ]);

            $favorit = Favorit::firstOrCreate([
                'user_id'   => $request->user()->id,
                'produk_id' => $validated['produk_id'],
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Produk ditambahkan ke favorit.',
                'data'    => $favorit,
            ], 201);
        } catch (Exception $e) {
            Log::error('Error in FavoritController@store: ' . $e->getMessage(), [
                'user_id' => $request->user()->id ?? null,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal menambahkan favorit: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }

    public function destroy(Request $request, int $produkId): JsonResponse
    {
        try {
            Favorit::where('user_id', $request->user()->id)
                ->where('produk_id', $produkId)
                ->firstOrFail()
                ->delete();

            return response()->json([
                'status'  => true,
                'message' => 'Favorit berhasil dihapus.',
            ]);
        } catch (Exception $e) {
            Log::error('Error in FavoritController@destroy: ' . $e->getMessage(), [
                'user_id' => $request->user()->id ?? null,
                'produk_id' => $produkId,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus favorit: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }
}
