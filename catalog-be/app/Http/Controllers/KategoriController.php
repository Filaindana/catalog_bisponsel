<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'gambar' => 'nullable|string',
        ]);

        $gambarPath = null;
        if ($request->filled('gambar')) {
            $gambarData = $request->input('gambar');
            if (preg_match('/^data:image\/(\w+);base64,/', $gambarData, $type)) {
                $gambarData = substr($gambarData, strpos($gambarData, ',') + 1);
                $type = strtolower($type[1]);
                if (in_array($type, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                    $gambarData = base64_decode($gambarData);
                    if ($gambarData !== false) {
                        $fileName = 'kategori/' . Str::slug($request->input('nama')) . '_' . time() . '.' . $type;
                        Storage::disk('public')->put($fileName, $gambarData);
                        $gambarPath = $fileName;
                    }
                }
            } else {
                $cleanPath = $gambarData;
                if (str_contains($cleanPath, '/storage/')) {
                    $cleanPath = substr($cleanPath, strpos($cleanPath, '/storage/') + 9);
                }
                $gambarPath = $cleanPath;
            }
        }

        $kategori = Kategori::create([
            'nama' => $validated['nama'],
            'gambar' => $gambarPath,
        ]);

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
            'gambar' => 'nullable|string',
        ]);

        $gambarPath = $kategori->getRawOriginal('gambar');
        if ($request->filled('gambar')) {
            $gambarData = $request->input('gambar');
            if (preg_match('/^data:image\/(\w+);base64,/', $gambarData, $type)) {
                $gambarData = substr($gambarData, strpos($gambarData, ',') + 1);
                $type = strtolower($type[1]);
                if (in_array($type, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                    $gambarData = base64_decode($gambarData);
                    if ($gambarData !== false) {
                        // Delete old image if exists
                        if ($gambarPath) {
                            Storage::disk('public')->delete($gambarPath);
                        }
                        $fileName = 'kategori/' . Str::slug($request->input('nama')) . '_' . time() . '.' . $type;
                        Storage::disk('public')->put($fileName, $gambarData);
                        $gambarPath = $fileName;
                    }
                }
            } else {
                $cleanPath = $gambarData;
                if (str_contains($cleanPath, '/storage/')) {
                    $cleanPath = substr($cleanPath, strpos($cleanPath, '/storage/') + 9);
                }
                $gambarPath = $cleanPath;
            }
        }

        $kategori->update([
            'nama' => $validated['nama'],
            'gambar' => $gambarPath,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Kategori berhasil diperbarui.',
            'data'    => $kategori,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $kategori = Kategori::findOrFail($id);

        // Delete image from storage if exists
        $gambarPath = $kategori->getRawOriginal('gambar');
        if ($gambarPath) {
            Storage::disk('public')->delete($gambarPath);
        }

        $kategori->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Kategori berhasil dihapus.',
        ]);
    }
}

