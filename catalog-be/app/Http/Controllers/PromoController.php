<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;
use Carbon\Carbon;

class PromoController
{
    private function getStatus(Promo $promo): string
    {
        $now = Carbon::now();
        $mulai = $promo->tanggal_mulai ? Carbon::parse($promo->tanggal_mulai) : null;
        $selesai = $promo->tanggal_selesai ? Carbon::parse($promo->tanggal_selesai) : null;

        if ($mulai && $mulai->isFuture()) {
            return 'segera';
        }

        if ($selesai && $selesai->isPast()) {
            return 'berakhir';
        }

        return 'aktif';
    }

    private function formatPromo(Promo $promo): array
    {
        $promo->loadMissing('produk.kategori', 'produk.spesifikasi');

        return [
            'id' => $promo->id,
            'nama' => $promo->nama,
            'deskripsi' => $promo->deskripsi,
            'tanggal_mulai' => optional($promo->tanggal_mulai)->format('Y-m-d'),
            'tanggal_selesai' => optional($promo->tanggal_selesai)->format('Y-m-d'),
            'status' => $this->getStatus($promo),
            'banner' => $promo->banner,
            'produk' => $promo->produk->map(function ($produk) {
                return [
                    'id' => $produk->id,
                    'slug' => $produk->slug,
                    'nama' => $produk->nama,
                    'harga' => $produk->harga,
                    'stok' => $produk->stok,
                    'rating' => $produk->rating,
                    'gambar' => $produk->gambar,
                    'kategori' => $produk->kategori ? [
                        'id' => $produk->kategori->id,
                        'nama' => $produk->kategori->nama,
                    ] : null,
                    'spesifikasi' => $produk->spesifikasi->map(function ($detail) {
                        return [
                            'id' => $detail->id,
                            'detail' => $detail->detail,
                        ];
                    })->all(),
                ];
            })->all(),
        ];
    }

    public function promosIndex(): JsonResponse
    {
        $promos = Promo::orderBy('dibuat_pada', 'desc')->get();
        $formatted = $promos->map(function ($promo) {
            return [
                'id' => $promo->id,
                'nama' => $promo->nama,
                'deskripsi' => $promo->deskripsi,
                'banner' => $promo->banner,
                'banner_url' => $promo->banner_url,
                'status' => $this->getStatus($promo),
            ];
        });
        return response()->json([
            'status' => true,
            'data' => $formatted,
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Promo::with('produk.kategori', 'produk.spesifikasi');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $promo = $query->orderBy('dibuat_pada', 'desc')
            ->paginate($request->get('per_page', 10));

        $promo->getCollection()->transform(function ($item) {
            return $this->formatPromo($item);
        });

        $aktifCount = Promo::whereDate('tanggal_mulai', '<=', now())
            ->whereDate('tanggal_selesai', '>=', now())
            ->count();

        $segeraCount = Promo::whereDate('tanggal_mulai', '>', now())
            ->count();

        $berakhirCount = Promo::whereDate('tanggal_selesai', '<', now())
            ->count();

        return response()->json([
            'status' => true,
            'data' => $promo,
            'meta' => [
                'aktif_count' => $aktifCount,
                'segera_count' => $segeraCount,
                'berakhir_count' => $berakhirCount,
            ],
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $promo = Promo::with('produk.kategori', 'produk.spesifikasi')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $this->formatPromo($promo),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'banner' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'produk_terkait' => 'nullable|array',
            'produk_terkait.*' => 'integer|exists:produk,id',
            'produk_ids' => 'nullable|array',
            'produk_ids.*' => 'integer|exists:produk,id',
        ]);

        if ($request->hasFile('banner')) {
            $validated['banner'] = $request->file('banner')->store('promo', 'public');
        } else {
            unset($validated['banner']);
        }

        $related = $validated['produk_terkait'] ?? $validated['produk_ids'] ?? [];
        $promo = Promo::create(Arr::except($validated, ['produk_terkait', 'produk_ids']));

        if (!empty($related)) {
            $promo->produk()->sync($related);
        }

        $promo->refresh();

        return response()->json([
            'status' => true,
            'message' => 'Promo berhasil dibuat',
            'data' => $this->formatPromo($promo),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $promo = Promo::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'sometimes|date',
            'tanggal_selesai' => 'sometimes|date',
            'banner' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'produk_terkait' => 'nullable|array',
            'produk_terkait.*' => 'integer|exists:produk,id',
            'produk_ids' => 'nullable|array',
            'produk_ids.*' => 'integer|exists:produk,id',
        ]);

        if ($request->hasFile('banner')) {
            $validated['banner'] = $request->file('banner')->store('promo', 'public');
        } else {
            unset($validated['banner']);
        }

        $related = $validated['produk_terkait'] ?? $validated['produk_ids'] ?? null;
        $promo->update(Arr::except($validated, ['produk_terkait', 'produk_ids']));

        if ($related !== null) {
            $promo->produk()->sync($related);
        }

        $promo->refresh();

        return response()->json([
            'status' => true,
            'message' => 'Promo berhasil diupdate',
            'data' => $this->formatPromo($promo),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $promo = Promo::findOrFail($id);
        $promo->produk()->detach();
        $promo->delete();

        return response()->json([
            'status' => true,
            'message' => 'Promo berhasil dihapus',
        ]);
    }
}
