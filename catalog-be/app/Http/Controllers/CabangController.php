<?php

namespace App\Http\Controllers;

use App\Models\Cabang;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CabangController
{
    public function index(): JsonResponse
    {
        $cabang = Cabang::withCount('aktivitas')->get();

        return response()->json([
            'status' => true,
            'data'   => $cabang,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $cabang = Cabang::with('aktivitas')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $cabang,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'kode'    => 'required|string|max:50|unique:cabang,kode',
            'nama'    => 'required|string|max:255',
            'kota'    => 'required|string|max:100',
            'alamat'  => 'required|string',
            'telepon' => 'nullable|string|max:20',
            'jam_buka'   => 'nullable|date_format:H:i',
            'jam_tutup'  => 'nullable|date_format:H:i',
            'maps_link'  => 'nullable|url',
        ]);

        $cabang = Cabang::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Cabang berhasil dibuat.',
            'data'    => $cabang,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $cabang = Cabang::findOrFail($id);

        $validated = $request->validate([
            'kode'    => 'sometimes|string|max:50|unique:cabang,kode,' . $id,
            'nama'    => 'sometimes|string|max:255',
            'kota'    => 'sometimes|string|max:100',
            'alamat'  => 'sometimes|string',
            'telepon' => 'nullable|string|max:20',
            'jam_buka'   => 'nullable|date_format:H:i',
            'jam_tutup'  => 'nullable|date_format:H:i',
            'maps_link'  => 'nullable|url',
        ]);

        $cabang->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Cabang berhasil diperbarui.',
            'data'    => $cabang,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $cabang = Cabang::findOrFail($id);
        $cabang->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Cabang berhasil dihapus.',
        ]);
    }
}
