<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KontakController
{
    public function index(): JsonResponse
    {
        $kontak = Kontak::orderBy('dibuat_pada', 'desc')->paginate(20);

        return response()->json([
            'status' => true,
            'data'   => $kontak,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $kontak = Kontak::findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $kontak,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama'    => 'required|string|max:255',
            'email'   => 'required|email',
            'telepon' => 'nullable|string|max:20',
            'pesan'   => 'required|string',
        ]);

        $kontak = Kontak::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Pesan berhasil dikirim.',
            'data'    => $kontak,
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $kontak = Kontak::findOrFail($id);
        $kontak->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Pesan berhasil dihapus.',
        ]);
    }
}
