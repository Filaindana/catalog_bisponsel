<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class UploadController extends BaseController
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'images' => 'required|array|min:1',
            'images.*' => 'required|file|image|mimes:jpeg,png,webp|max:5120',
        ]);

        $uploaded = [];

        foreach ($validated['images'] as $file) {
            $path = $file->store('products', 'public');

            $uploaded[] = [
                'path' => $path,
                'url' => asset("storage/{$path}"),
            ];
        }

        return response()->json([
            'status' => true,
            'message' => 'Upload berhasil.',
            'data' => $uploaded,
        ], 201);
    }
}
