<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Routing\Controller as BaseController;

class ProdukController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $query = Produk::with(['kategori', 'spesifikasi', 'gambar']);

        if ($request->filled('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        if ($request->filled('category')) {
            $categories = (array) $request->input('category');
            $query->whereHas('kategori', fn($q) => $q->whereIn('nama', $categories));
        }

        if ($request->filled('adalah_promo')) {
            $query->where('adalah_promo', filter_var($request->adalah_promo, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('discounts')) {
            $discounts = (array) $request->input('discounts');
            if (in_array('Diskon', $discounts)) {
                $query->where('adalah_promo', true);
            }
        }

        if ($request->filled('search')) {
            $query->where('nama', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('max_price')) {
            $query->where('harga', '<=', (int) $request->max_price);
        }

        if ($request->filled('status')) {
            $statusList = (array) $request->input('status');
            $query->where(function ($q) use ($statusList) {
                if (in_array('Tersedia', $statusList)) {
                    $q->orWhere('stok', '>', 0);
                }
                if (in_array('Tidak Tersedia', $statusList)) {
                    $q->orWhere('stok', '=', 0);
                }
            });
        }

        $sort = $request->input('sort', 'latest');
        match ($sort) {
            'price_asc'  => $query->orderBy('harga', 'asc'),
            'price_desc' => $query->orderBy('harga', 'desc'),
            'rating'     => $query->orderBy('rating', 'desc'),
            default      => $query->latest(),
        };

        $produk = $query->paginate($request->get('per_page', 12))
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

    public function show(string $slug): JsonResponse
    {
        $produk = Produk::with(['kategori', 'spesifikasi', 'promo', 'gambar'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'status' => true,
            'data'   => $produk,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'kategori_id'       => 'required|exists:kategori,id',
            'nama'              => 'required|string|max:255',
            'slug'              => 'nullable|string|max:255|unique:produk,slug',
            'deskripsi'         => 'nullable|string',
            'deskripsi_detail'  => 'nullable|string',
            'harga'             => 'required|integer|min:0',
            'stok'              => 'required|integer|min:0',
            'rating'            => 'nullable|numeric|min:0|max:5',
            'adalah_promo'      => 'boolean',
            'gambar'            => 'nullable|array',
            'gambar.*'          => 'nullable|string',
            'spesifikasi'       => 'nullable|array',
            'spesifikasi.*.atribut' => 'required_with:spesifikasi|string',
            'spesifikasi.*.detail'  => 'required_with:spesifikasi|string',
        ]);

        try {
            DB::beginTransaction();

            $produkData = collect($validated)->except(['gambar', 'spesifikasi'])->toArray();
            $produkData['slug'] = $validated['slug'] ?? Str::slug($validated['nama']);

            $produk = Produk::create($produkData);

            if (!empty($validated['gambar'])) {
                foreach ($validated['gambar'] as $url) {
                    $produk->gambar()->create(['url_gambar' => $url]);
                }
            }

            if (!empty($validated['spesifikasi'])) {
                foreach ($validated['spesifikasi'] as $spec) {
                    $produk->spesifikasi()->create([
                        'atribut' => $spec['atribut'],
                        'detail'  => $spec['detail'],
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Produk berhasil dibuat.',
                'data'    => $produk->load(['kategori', 'gambar', 'spesifikasi']),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, string $slug): JsonResponse
    {
        $produk = Produk::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'kategori_id'       => 'sometimes|exists:kategori,id',
            'nama'              => 'sometimes|string|max:255',
            'slug'              => 'nullable|string|max:255|unique:produk,slug,' . $produk->id,
            'deskripsi'         => 'nullable|string',
            'deskripsi_detail'  => 'nullable|string',
            'harga'             => 'sometimes|integer|min:0',
            'stok'              => 'sometimes|integer|min:0',
            'rating'            => 'nullable|numeric|min:0|max:5',
            'adalah_promo'      => 'sometimes|boolean',
            'gambar'            => 'nullable|array',
            'gambar.*'          => 'nullable|string',
            'spesifikasi'       => 'nullable|array',
            'spesifikasi.*.atribut' => 'required_with:spesifikasi|string',
            'spesifikasi.*.detail'  => 'required_with:spesifikasi|string',
        ]);

        try {
            DB::beginTransaction();

            $produkData = collect($validated)->except(['gambar', 'spesifikasi'])->toArray();
            if (empty($produkData['slug'])) {
                unset($produkData['slug']);
            }

            $produk->update($produkData);

            if (isset($validated['gambar'])) {
                $produk->gambar()->delete();
                foreach ($validated['gambar'] as $url) {
                    $produk->gambar()->create(['url_gambar' => $url]);
                }
            }

            if (isset($validated['spesifikasi'])) {
                $produk->spesifikasi()->delete();
                foreach ($validated['spesifikasi'] as $spec) {
                    $produk->spesifikasi()->create([
                        'atribut' => $spec['atribut'],
                        'detail'  => $spec['detail'],
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Produk berhasil diperbarui.',
                'data'    => $produk->load(['kategori', 'gambar', 'spesifikasi']),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(string $slug): JsonResponse
    {
        $produk = Produk::where('slug', $slug)->firstOrFail();

        try {
            DB::beginTransaction();

            $produk->gambar()->delete();
            $produk->spesifikasi()->delete();
            $produk->delete();

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Produk berhasil dihapus.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
