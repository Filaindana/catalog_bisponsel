<?php

namespace App\Http\Controllers;

use App\Models\GambarProduk;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GambarProdukController
{
    public function index(int $produkId): JsonResponse
    {
        $produk = Produk::findOrFail($produkId);

        return response()->json([
            'status' => true,
            'data'   => $produk->gambar,
        ]);
    }

    public function store(Request $request, int $produkId): JsonResponse
    {
        Produk::findOrFail($produkId);

        $validated = $request->validate([
            'gambar'      => 'required|array|min:1',
            'gambar.*'    => 'required|string|max:500',
        ]);

        $inserted = [];
        foreach ($validated['gambar'] as $url) {
            $inserted[] = GambarProduk::create([
                'produk_id' => $produkId,
                'url_gambar' => $url,
            ]);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Gambar berhasil ditambahkan.',
            'data'    => $inserted,
        ], 201);
    }

    public function destroy(int $produkId, int $id): JsonResponse
    {
        $gambar = GambarProduk::where('produk_id', $produkId)->findOrFail($id);
        $gambar->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Gambar berhasil dihapus.',
        ]);
    }
}
