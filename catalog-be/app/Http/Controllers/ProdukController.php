<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\GambarProduk;
use App\Models\SpesifikasiProduk;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProdukController
{
    public function index(Request $request): JsonResponse
    {
        $query = Produk::with(['kategori', 'spesifikasi']);

        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        if ($request->filled('adalah_promo')) {
            $query->where('adalah_promo', filter_var($request->adalah_promo, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }

        // PAGINATION (buat table)
        // $produk = $query->orderBy('dibuat_pada', 'desc')
        //     ->paginate($request->get('per_page', 12));
        $produk = $query->orderBy('dibuat_pada', 'desc')
            ->paginate($request->get('per_page', 12))
            ->appends($request->query());

        // 🔥 GLOBAL COUNT (BUKAN PER PAGE)
        $totalProduk = Produk::count();
        $promoCount = Produk::where('adalah_promo', true)->count();
        $lowStockCount = Produk::where('stok', '<', 10)->count();

        return response()->json([
            'status' => true,
            'data'   => $produk,
            'meta'   => [
                'total'           => $totalProduk,
                'promo_count'     => $promoCount,
                'low_stock_count' => $lowStockCount,
            ]
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $produk = Produk::with(['kategori', 'spesifikasi', 'promo'])->findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $produk,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'kategori_id'  => 'required|exists:kategori,id',
            'nama'         => 'required|string|max:255',
            'deskripsi'    => 'nullable|string',
            'harga'        => 'required|integer|min:0',
            'stok'         => 'required|integer|min:0',
            'rating'       => 'nullable|numeric|min:0|max:5',
            'adalah_promo' => 'boolean',
            'gambar'       => 'nullable|array',
            'gambar.*'     => 'url',
            'spesifikasi'  => 'nullable|array',
            'spesifikasi.*.atribut' => 'required_with:spesifikasi|string',
            'spesifikasi.*.detail'  => 'required_with:spesifikasi|string',
        ]);

        $produk = Produk::create($validated);

        if (!empty($validated['gambar'])) {
            foreach ($validated['gambar'] as $url) {
                GambarProduk::create(['produk_id' => $produk->id, 'url_gambar' => $url]);
            }
        }

        if (!empty($validated['spesifikasi'])) {
            foreach ($validated['spesifikasi'] as $spec) {
                SpesifikasiProduk::create([
                    'produk_id' => $produk->id,
                    'atribut'   => $spec['atribut'],
                    'detail'    => $spec['detail'],
                ]);
            }
        }

        return response()->json([
            'status'  => true,
            'message' => 'Produk berhasil dibuat.',
            'data'    => $produk->load(['kategori', 'gambar', 'spesifikasi']),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $produk = Produk::findOrFail($id);

        $validated = $request->validate([
            'kategori_id'  => 'sometimes|exists:kategori,id',
            'nama'         => 'sometimes|string|max:255',
            'deskripsi'    => 'nullable|string',
            'harga'        => 'sometimes|integer|min:0',
            'stok'         => 'sometimes|integer|min:0',
            'rating'       => 'nullable|numeric|min:0|max:5',
            'adalah_promo' => 'boolean',
            'gambar'       => 'nullable|array',
            'gambar.*'     => 'url',
            'spesifikasi'  => 'nullable|array',
            'spesifikasi.*.atribut' => 'required_with:spesifikasi|string',
            'spesifikasi.*.detail'  => 'required_with:spesifikasi|string',
        ]);

        $produk->update($validated);

        if (isset($validated['gambar'])) {
            $produk->gambar()->delete();
            foreach ($validated['gambar'] as $url) {
                GambarProduk::create(['produk_id' => $produk->id, 'url_gambar' => $url]);
            }
        }

        if (isset($validated['spesifikasi'])) {
            $produk->spesifikasi()->delete();
            foreach ($validated['spesifikasi'] as $spec) {
                SpesifikasiProduk::create([
                    'produk_id' => $produk->id,
                    'atribut'   => $spec['atribut'],
                    'detail'    => $spec['detail'],
                ]);
            }
        }

        return response()->json([
            'status'  => true,
            'message' => 'Produk berhasil diperbarui.',
            'data'    => $produk->load(['kategori', 'gambar', 'spesifikasi']),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $produk = Produk::findOrFail($id);
        $produk->gambar()->delete();
        $produk->spesifikasi()->delete();
        $produk->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Produk berhasil dihapus.',
        ]);
    }
}
