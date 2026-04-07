<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KategoriController
{
    public function index(): JsonResponse
    {
        $kategori = Kategori::withCount('produk')->get();

        return response()->json([
            'status' => true,
            'data'   => $kategori,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $kategori = Kategori::withCount('produk')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $kategori,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $kategori = Kategori::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Kategori berhasil dibuat.',
            'data'    => $kategori,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $kategori = Kategori::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $kategori->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Kategori berhasil diperbarui.',
            'data'    => $kategori,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $kategori = Kategori::findOrFail($id);
        $kategori->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Kategori berhasil dihapus.',
        ]);
    }
}
