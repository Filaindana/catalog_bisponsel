<?php

namespace App\Http\Controllers;

use App\Models\Aktivitas;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AktivitasController
{
    public function index(Request $request): JsonResponse
    {
        $query = Aktivitas::with('cabang');

        if ($request->filled('cabang_id')) {
            $query->where('cabang_id', $request->cabang_id);
        }

        $aktivitas = $query->orderBy('dibuat_pada', 'desc')->get();

        return response()->json([
            'status' => true,
            'data'   => $aktivitas,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $aktivitas = Aktivitas::with('cabang')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $aktivitas,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'judul'     => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'cabang_id' => 'required|exists:cabang,id',
        ]);

        $aktivitas = Aktivitas::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Aktivitas berhasil dibuat.',
            'data'    => $aktivitas->load('cabang'),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $aktivitas = Aktivitas::findOrFail($id);

        $validated = $request->validate([
            'judul'     => 'sometimes|string|max:255',
            'deskripsi' => 'nullable|string',
            'cabang_id' => 'sometimes|exists:cabang,id',
        ]);

        $aktivitas->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Aktivitas berhasil diperbarui.',
            'data'    => $aktivitas->load('cabang'),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $aktivitas = Aktivitas::findOrFail($id);
        $aktivitas->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Aktivitas berhasil dihapus.',
        ]);
    }
}
