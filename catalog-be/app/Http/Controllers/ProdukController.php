<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProdukController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $query = Produk::with(['kategori', 'brand', 'spesifikasi', 'gambar', 'promo']);

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

        $produk = $query->paginate($request->get('per_page', 15))
            ->appends($request->query());

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
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $produk = Produk::with(['kategori', 'brand', 'spesifikasi', 'promo', 'gambar'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'status' => true,
            'data'   => $produk,
        ]);
    }

    private function resolveBrandId(Request $request): ?int
    {
        Log::info('resolveBrandId request details', [
            'brand_id_input' => $request->input('brand_id'),
            'brand_input' => $request->input('brand'),
            'brand_id_filled' => $request->filled('brand_id'),
            'brand_filled' => $request->filled('brand'),
        ]);

        if ($request->has('brand_id') && !is_null($request->input('brand_id')) && $request->input('brand_id') !== '') {
            $brandId = (int) $request->input('brand_id');
            $exists = Brand::where('id', $brandId)->exists();
            Log::info('brand_id existence check', ['brandId' => $brandId, 'exists' => $exists]);
            if ($exists) {
                return $brandId;
            }
        }

        if ($request->filled('brand')) {
            $brandName = trim((string) $request->input('brand'));

            if ($brandName !== '') {
                $brand = Brand::firstOrCreate(['nama' => $brandName]);
                Log::info('brand resolved by name', ['brandName' => $brandName, 'id' => $brand->id]);
                return $brand->id;
            }
        }

        return null;
    }

    public function store(Request $request): JsonResponse
    {
        Log::info('Create Product Payload', $request->all());
        Log::info('Produk store payload', ['payload' => $request->all()]);

        $validated = $request->validate([
            'kategori_id'           => 'required|exists:kategori,id',
            'brand_id'              => 'nullable|exists:brands,id',
            'brand'                 => 'nullable|string|max:255',
            'nama'                  => 'required|string|max:255',
            'slug'                  => 'nullable|string|max:255|unique:produk,slug',
            'deskripsi'             => 'nullable|string',
            'deskripsi_detail'      => 'nullable|string',
            'harga'                 => 'required|integer|min:0',
            'stok'                  => 'required|integer|min:0',
            'rating'                => 'nullable|numeric|min:0|max:5',
            'adalah_promo'          => 'boolean',
            'promo_ids'             => 'nullable|array',
            'promo_ids.*'           => 'integer|exists:promo,id',
            'colors'                => 'nullable|array',
            'colors.*'              => 'string',
            'color_labels'          => 'nullable|array',
            'color_labels.*'        => 'string',
            'gambar'                => 'nullable|array',
            'gambar.*'              => 'nullable|string',
            'spesifikasi'           => 'nullable|array',
            'spesifikasi.*.atribut' => 'required_with:spesifikasi|string',
            'spesifikasi.*.detail'  => 'required_with:spesifikasi|string',
        ]);

        try {
            DB::beginTransaction();

            $produkData = collect($validated)
                ->except(['gambar', 'spesifikasi', 'promo_ids', 'brand'])
                ->toArray();

            $produkData['brand_id'] = $this->resolveBrandId($request);
            $produkData['slug'] = $validated['slug'] ?? Str::slug($validated['nama']);

            if (array_key_exists('promo_ids', $validated)) {
                $produkData['adalah_promo'] = count($validated['promo_ids'] ?? []) > 0;
            } elseif (array_key_exists('adalah_promo', $validated)) {
                $produkData['adalah_promo'] = $validated['adalah_promo'];
            }

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

            if (array_key_exists('promo_ids', $validated)) {
                $produk->promo()->sync($validated['promo_ids'] ?? []);
            } elseif (array_key_exists('adalah_promo', $validated) && !$validated['adalah_promo']) {
                // jika admin menandai produk bukan promo, hapus relasi promo
                $produk->promo()->sync([]);
            }

            DB::commit();

            Log::info('Produk stored', [
                'id'         => $produk->id,
                'kategori_id' => $produk->kategori_id,
                'brand_id'   => $produk->brand_id,
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Produk berhasil dibuat.',
                'data'    => $produk->load(['kategori', 'brand', 'gambar', 'spesifikasi', 'promo']),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, string $slug): JsonResponse
    {
        $produk = Produk::where('slug', $slug)->firstOrFail();

        Log::info('Update Product Payload', $request->all());
        Log::info('Produk update payload', ['slug' => $slug, 'payload' => $request->all()]);

        $validated = $request->validate([
            'kategori_id'           => 'sometimes|exists:kategori,id',
            'brand_id'              => 'sometimes|nullable|exists:brands,id',
            'brand'                 => 'nullable|string|max:255',
            'nama'                  => 'sometimes|string|max:255',
            'slug'                  => 'nullable|string|max:255|unique:produk,slug,' . $produk->id,
            'deskripsi'             => 'nullable|string',
            'deskripsi_detail'      => 'nullable|string',
            'harga'                 => 'sometimes|integer|min:0',
            'stok'                  => 'sometimes|integer|min:0',
            'rating'                => 'nullable|numeric|min:0|max:5',
            'adalah_promo'          => 'sometimes|boolean',
            'promo_ids'             => 'nullable|array',
            'promo_ids.*'           => 'integer|exists:promo,id',
            'colors'                => 'nullable|array',
            'colors.*'              => 'string',
            'color_labels'          => 'nullable|array',
            'color_labels.*'        => 'string',
            'gambar'                => 'nullable|array',
            'gambar.*'              => 'nullable|string',
            'spesifikasi'           => 'nullable|array',
            'spesifikasi.*.atribut' => 'required_with:spesifikasi|string',
            'spesifikasi.*.detail'  => 'required_with:spesifikasi|string',
        ]);

        try {
            DB::beginTransaction();

            $produkData = collect($validated)
                ->except(['gambar', 'spesifikasi', 'promo_ids', 'brand'])
                ->toArray();

            if ($request->has('brand_id') || $request->has('brand')) {
                $produkData['brand_id'] = $this->resolveBrandId($request);
            }

            if (array_key_exists('promo_ids', $validated)) {
                $produkData['adalah_promo'] = count($validated['promo_ids'] ?? []) > 0;
            } elseif (array_key_exists('adalah_promo', $validated)) {
                $produkData['adalah_promo'] = $validated['adalah_promo'];
            }

            if (empty($produkData['slug'] ?? null)) {
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

            if (array_key_exists('promo_ids', $validated)) {
                $produk->promo()->sync($validated['promo_ids'] ?? []);
            }

            DB::commit();

            Log::info('Produk updated', [
                'slug'       => $slug,
                'kategori_id' => $produk->kategori_id,
                'brand_id'   => $produk->brand_id,
            ]);

            return response()->json([
                'status'  => true,
                'message' => 'Produk berhasil diperbarui.',
                'data'    => $produk->fresh()->load(['kategori', 'brand', 'gambar', 'spesifikasi', 'promo']),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status'  => false,
                'message' => $e->getMessage(),
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
                'status'  => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
