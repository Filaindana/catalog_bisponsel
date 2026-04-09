<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PromoController
{
    public function index(Request $request): JsonResponse
    {
        $query = Promo::with('produk');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $promo = $query->orderBy('dibuat_pada', 'desc')->get();

        return response()->json([
            'status' => true,
            'data'   => $promo,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $promo = Promo::with('produk.gambar')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $promo,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama'            => 'required|string|max:255',
            'deskripsi'       => 'nullable|string',
            'tanggal_mulai'   => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'status'          => 'required|in:aktif,segera,berakhir',
            'banner'          => 'nullable|string',
            'produk_ids'      => 'nullable|array',
            'produk_ids.*'    => 'exists:produk,id',
        ]);

        $promo = Promo::create($validated);

        if (!empty($validated['produk_ids'])) {
            $promo->produk()->sync($validated['produk_ids']);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Promo berhasil dibuat.',
            'data'    => $promo->load('produk'),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $promo = Promo::findOrFail($id);

        $validated = $request->validate([
            'nama'            => 'sometimes|string|max:255',
            'deskripsi'       => 'nullable|string',
            'tanggal_mulai'   => 'sometimes|date',
            'tanggal_selesai' => 'sometimes|date|after_or_equal:tanggal_mulai',
            'status'          => 'sometimes|in:aktif,segera,berakhir',
            'banner'          => 'nullable|string',
            'produk_ids'      => 'nullable|array',
            'produk_ids.*'    => 'exists:produk,id',
        ]);

        $promo->update($validated);

        if (array_key_exists('produk_ids', $validated)) {
            $promo->produk()->sync($validated['produk_ids'] ?? []);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Promo berhasil diperbarui.',
            'data'    => $promo->load('produk'),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $promo = Promo::findOrFail($id);
        $promo->produk()->detach();
        $promo->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Promo berhasil dihapus.',
        ]);
    }
}
