<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BrandController
{
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => true,
            'data'   => Brand::orderBy('nama')->get(),
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $brand = Brand::findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $brand,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:brands,nama',
        ]);

        $brand = Brand::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Brand berhasil dibuat.',
            'data'    => $brand,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $brand = Brand::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:brands,nama,' . $brand->id,
        ]);

        $brand->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Brand berhasil diperbarui.',
            'data'    => $brand,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Brand berhasil dihapus.',
        ]);
    }
}
