<?php

namespace App\Http\Controllers;

use App\Models\Pengaturan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PengaturanController
{
    public function show(): JsonResponse
    {
        // Pengaturan selalu 1 baris (singleton)
        $pengaturan = Pengaturan::firstOrCreate([]);

        return response()->json([
            'status' => true,
            'data'   => $pengaturan,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama_situs' => 'sometimes|string|max:255',
            'email'      => 'sometimes|email',
            'telepon'    => 'nullable|string|max:20',
            'alamat'     => 'nullable|string',
            'nama_ceo'   => 'nullable|string|max:255',
            'foto_ceo'   => 'nullable|string',
        ]);

        $pengaturan = Pengaturan::firstOrCreate([]);
        $pengaturan->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Pengaturan berhasil diperbarui.',
            'data'    => $pengaturan,
        ]);
    }
}
