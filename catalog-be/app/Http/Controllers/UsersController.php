<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UsersController
{
    public function index(): JsonResponse
    {
        $users = Users::select('id', 'nama', 'email', 'peran', 'dibuat_pada')->get();

        return response()->json([
            'status' => true,
            'data'   => $users,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $users = Users::findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $users,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'peran'    => 'required|in:admin,user',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $users = Users::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Users berhasil dibuat.',
            'data'    => $users,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $users = Users::findOrFail($id);

        $validated = $request->validate([
            'nama'     => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'peran'    => 'sometimes|in:admin,user',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $users->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Users berhasil diperbarui.',
            'data'    => $users,
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $users = Users::findOrFail($id);
        $users->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Users berhasil dihapus.',
        ]);
    }
}
