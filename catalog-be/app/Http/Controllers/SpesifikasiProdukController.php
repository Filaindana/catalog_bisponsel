<?php

namespace App\Http\Controllers;

use App\Models\SpesifikasiProduk;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SpesifikasiProdukController
{
    public function index(int $produkId): JsonResponse
    {
        $produk = Produk::findOrFail($produkId);

        return response()->json([
            'status' => true,
            'data'   => $produk->spesifikasi,
        ]);
    }

    public function store(Request $request, int $produkId): JsonResponse
    {
        Produk::findOrFail($produkId);

        $validated = $request->validate([
            'spesifikasi'           => 'required|array|min:1',
            'spesifikasi.*.atribut' => 'required|string|max:255',
            'spesifikasi.*.detail'  => 'required|string|max:500',
        ]);

        $inserted = [];
        foreach ($validated['spesifikasi'] as $spec) {
            $inserted[] = SpesifikasiProduk::create([
                'produk_id' => $produkId,
                'atribut'   => $spec['atribut'],
                'detail'    => $spec['detail'],
            ]);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Spesifikasi berhasil ditambahkan.',
            'data'    => $inserted,
        ], 201);
    }

    public function update(Request $request, int $produkId, int $id): JsonResponse
    {
        $spesifikasi = SpesifikasiProduk::where('produk_id', $produkId)->findOrFail($id);

        $validated = $request->validate([
            'atribut' => 'sometimes|string|max:255',
            'detail'  => 'sometimes|string|max:500',
        ]);

        $spesifikasi->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Spesifikasi berhasil diperbarui.',
            'data'    => $spesifikasi,
        ]);
    }

    public function destroy(int $produkId, int $id): JsonResponse
    {
        $spesifikasi = SpesifikasiProduk::where('produk_id', $produkId)->findOrFail($id);
        $spesifikasi->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Spesifikasi berhasil dihapus.',
        ]);
    }
}
