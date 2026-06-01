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

    public function brandsIndex(): JsonResponse
    {
        $brands = Brand::orderBy('nama')->get();
        \Illuminate\Support\Facades\Log::info('GET /api/brands response', ['data' => $brands->toArray()]);
        return response()->json($brands);
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
        \Illuminate\Support\Facades\Log::info('Create Brand Payload', $request->all());
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:brands,nama',
            'logo' => 'nullable|string',
        ]);

        $logoPath = null;
        if ($request->filled('logo')) {
            $logoData = $request->input('logo');
            if (preg_match('/^data:image\/(\w+);base64,/', $logoData, $type)) {
                $logoData = substr($logoData, strpos($logoData, ',') + 1);
                $type = strtolower($type[1]);
                if (in_array($type, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                    $logoData = base64_decode($logoData);
                    if ($logoData !== false) {
                        $fileName = 'brand/' . \Illuminate\Support\Str::slug($request->input('nama')) . '_' . time() . '.' . $type;
                        \Illuminate\Support\Facades\Storage::disk('public')->put($fileName, $logoData);
                        $logoPath = $fileName;
                    }
                }
            } else {
                $cleanPath = $logoData;
                if (str_contains($cleanPath, '/storage/')) {
                    $cleanPath = substr($cleanPath, strpos($cleanPath, '/storage/') + 9);
                }
                $logoPath = $cleanPath;
            }
        }

        $brand = Brand::create([
            'nama' => $validated['nama'],
            'logo' => $logoPath,
        ]);

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
            'logo' => 'nullable|string',
        ]);

        $logoPath = $brand->getRawOriginal('logo');
        if ($request->filled('logo')) {
            $logoData = $request->input('logo');
            if (preg_match('/^data:image\/(\w+);base64,/', $logoData, $type)) {
                $logoData = substr($logoData, strpos($logoData, ',') + 1);
                $type = strtolower($type[1]);
                if (in_array($type, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                    $logoData = base64_decode($logoData);
                    if ($logoData !== false) {
                        // Delete old logo if exists
                        if ($logoPath) {
                            \Illuminate\Support\Facades\Storage::disk('public')->delete($logoPath);
                        }
                        $fileName = 'brand/' . \Illuminate\Support\Str::slug($request->input('nama')) . '_' . time() . '.' . $type;
                        \Illuminate\Support\Facades\Storage::disk('public')->put($fileName, $logoData);
                        $logoPath = $fileName;
                    }
                }
            } else {
                $cleanPath = $logoData;
                if (str_contains($cleanPath, '/storage/')) {
                    $cleanPath = substr($cleanPath, strpos($cleanPath, '/storage/') + 9);
                }
                $logoPath = $cleanPath;
            }
        }

        $brand->update([
            'nama' => $validated['nama'],
            'logo' => $logoPath,
        ]);

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
