<?php

namespace App\Http\Controllers;

use App\Models\Favorit;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FavoritController
{
    public function index(Request $request): JsonResponse
    {
        // $favorit = Favorit::with('produk.gambar')
        $favorit = Favorit::with('produk')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json([
            'status' => true,
            'data'   => $favorit,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
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
    }

    public function destroy(Request $request, int $produkId): JsonResponse
    {
        Favorit::where('user_id', $request->user()->id)
            ->where('produk_id', $produkId)
            ->firstOrFail()
            ->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Favorit berhasil dihapus.',
        ]);
    }
}
