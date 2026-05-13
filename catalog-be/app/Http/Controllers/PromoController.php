<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class PromoController
{
    public function index(Request $request): JsonResponse
    {
        // $query = Promo::with('produk');
        $query = Promo::with('produk.kategori', 'produk.spesifikasi');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $promo = $query->orderBy('dibuat_pada', 'desc')
            ->paginate($request->get('per_page', 10));

        $promo->getCollection()->transform(function ($item) {
            $now = \Carbon\Carbon::now();

            if ($item->tanggal_mulai > $now) {
                $status = 'segera';
            } elseif ($item->tanggal_selesai < $now) {
                $status = 'berakhir';
            } else {
                $status = 'aktif';
            }

            return [
                'id' => $item->id,
                'nama' => $item->nama,
                'deskripsi' => $item->deskripsi,
                'tanggal_mulai' => $item->tanggal_mulai?->format('Y-m-d'),
                'tanggal_selesai' => $item->tanggal_selesai?->format('Y-m-d'),
                'status' => $status,
                'banner' => $item->banner,
                'produk' => $item->produk,
            ];
        });

        return response()->json([
            'status' => true,
            'data'   => $promo
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $promo = Promo::with('produk')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => [
                'id' => $promo->id,
                'nama' => $promo->nama,
                'deskripsi' => $promo->deskripsi,
                'tanggal_mulai' => $promo->tanggal_mulai?->format('Y-m-d'),
                'tanggal_selesai' => $promo->tanggal_selesai?->format('Y-m-d'),
                'status' => $promo->status,
                'banner' => $promo->banner,
                'produk' => $promo->produk,
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'banner' => 'nullable|string',
            'produk_ids' => 'nullable|array',
        ]);

        $promo = Promo::create($validated);

        if (!empty($validated['produk_ids'])) {
            $promo->produk()->sync($validated['produk_ids']);
        }

        return response()->json([
            'status' => true,
            'message' => 'Promo berhasil dibuat',
            'data' => $promo->load('produk'),
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
            'banner' => 'nullable|string',
            'produk_ids' => 'nullable|array',
        ]);

        $promo->update($validated);

        if (array_key_exists('produk_ids', $validated)) {
            $promo->produk()->sync($validated['produk_ids'] ?? []);
        }

        return response()->json([
            'status' => true,
            'message' => 'Promo berhasil diupdate',
            'data' => $promo->load('produk'),
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
