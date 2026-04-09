<?php

namespace App\Http\Controllers;

use App\Models\PenjualanProduk;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PenjualanProdukController
{
    public function index(Request $request): JsonResponse
    {
        $query = PenjualanProduk::with('produk:id,nama,harga');

        if ($request->filled('produk_id')) {
            $query->where('produk_id', $request->produk_id);
        }

        if ($request->filled('dari') && $request->filled('sampai')) {
            $query->whereBetween('tanggal', [$request->dari, $request->sampai]);
        }

        $penjualan = $query->orderBy('tanggal', 'desc')->get();

        $totalTerjual = $penjualan->sum('total_terjual');

        return response()->json([
            'status' => true,
            'data'   => $penjualan,
            'meta'   => [
                'total_terjual' => $totalTerjual,
            ],
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $penjualan = PenjualanProduk::with('produk')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $penjualan,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'produk_id'     => 'required|exists:produk,id',
            'total_terjual' => 'required|integer|min:1',
            'tanggal'       => 'required|date',
        ]);

        $penjualan = PenjualanProduk::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Data penjualan berhasil dicatat.',
            'data'    => $penjualan->load('produk'),
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $penjualan = PenjualanProduk::findOrFail($id);

        $validated = $request->validate([
            'produk_id'     => 'sometimes|exists:produk,id',
            'total_terjual' => 'sometimes|integer|min:1',
            'tanggal'       => 'sometimes|date',
        ]);

        $penjualan->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Data penjualan berhasil diperbarui.',
            'data'    => $penjualan->load('produk'),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        PenjualanProduk::findOrFail($id)->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Data penjualan berhasil dihapus.',
        ]);
    }

    public function rekap(Request $request): JsonResponse
    {
        $rekap = PenjualanProduk::select(
                'produk_id',
                DB::raw('SUM(total_terjual) as total_terjual'),
                DB::raw('MAX(tanggal) as terakhir_terjual')
            )
            ->with('produk:id,nama,harga')
            ->groupBy('produk_id')
            ->orderByDesc('total_terjual')
            ->get();

        return response()->json([
            'status' => true,
            'data'   => $rekap,
        ]);
    }
}
