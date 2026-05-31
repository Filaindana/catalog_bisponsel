<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Exception;

class UsersController
{
    /**
     * GET /api/admin/users
     * Dapatkan semua users (dengan pagination & filter)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 10);
            $search = $request->get('search', '');
            $sort = $request->get('sort', 'dibuat_pada');
            $order = $request->get('order', 'desc');

            $query = User::query();

            // Search by name or email
            if ($search) {
                $query->where('nama', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            }

            // Sorting
            $query->orderBy($sort, $order);

            $users = $query->paginate($perPage);

            return response()->json([
                'status' => true,
                'data' => $users,
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@index: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil data user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GET /api/admin/users/{id}
     * Dapatkan detail user
     */
    public function show(int $id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);

            return response()->json([
                'status' => true,
                'data' => $user,
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@show: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'User tidak ditemukan: ' . $e->getMessage(),
            ], 404);
        }
    }

    /**
     * POST /api/admin/users
     * Buat user baru
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'peran' => 'required|in:user,admin,superadmin',
            ]);

            $validated['password'] = Hash::make($validated['password']);
            $validated['is_active'] = true;

            $user = User::create($validated);

            return response()->json([
                'status' => true,
                'message' => 'User berhasil dibuat',
                'data' => $user,
            ], 201);
        } catch (Exception $e) {
            Log::error('Error in UsersController@store: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Gagal membuat user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * PUT /api/admin/users/{id}
     * Update user
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);

            $validated = $request->validate([
                'nama' => 'sometimes|string|max:255',
                'email' => [
                    'sometimes',
                    'email',
                    Rule::unique('users', 'email')->ignore($id),
                ],
                'peran' => 'sometimes|in:user,admin,superadmin',
                'is_active' => 'sometimes|boolean',
            ]);

            $user->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'User berhasil diperbarui',
                'data' => $user,
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@update: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Gagal memperbarui user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * DELETE /api/admin/users/{id}
     * Hapus user
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'status' => true,
                'message' => 'User berhasil dihapus',
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@destroy: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus user: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /api/admin/users/{id}/toggle-status
     * Ubah status active/inactive
     */
    public function toggleStatus(int $id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);
            $user->is_active = !$user->is_active;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Status user berhasil diubah',
                'data' => $user,
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@toggleStatus: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengubah status user: ' . $e->getMessage(),
            ], 500);
        }
    }
}

