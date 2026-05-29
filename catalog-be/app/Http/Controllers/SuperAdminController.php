<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Exception;

class SuperAdminController extends Controller
{
    // List users (all)
    public function users(Request $request): JsonResponse
    {
        try {
            $query = User::query();

            if ($request->filled('search')) {
                $s = $request->get('search');
                $query->where('nama', 'like', "%{$s}%")->orWhere('email', 'like', "%{$s}%");
            }

            if ($request->filled('status')) {
                if ($request->status === 'active') $query->where('is_active', true);
                if ($request->status === 'inactive') $query->where('is_active', false);
            }

            $users = $query->orderBy('dibuat_pada', 'desc')->paginate(25);

            return response()->json(['status' => true, 'data' => $users]);
        } catch (Exception $e) {
            Log::error('SuperAdminController@users: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Gagal mengambil daftar user.'], 500);
        }
    }

    public function showUser($id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);
            return response()->json(['status' => true, 'data' => $user]);
        } catch (Exception $e) {
            Log::error('SuperAdminController@showUser: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'User tidak ditemukan.'], 404);
        }
    }

    public function toggleStatus($id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);
            $user->is_active = ! $user->is_active;
            $user->save();

            return response()->json(['status' => true, 'message' => 'Status user diperbarui.', 'data' => $user]);
        } catch (Exception $e) {
            Log::error('SuperAdminController@toggleStatus: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Gagal mengubah status user.'], 500);
        }
    }

    // Admin management
    public function storeAdmin(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        try {
            $user = User::create([
                'nama' => $validated['nama'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'peran' => 'admin',
                'is_active' => true,
                'dibuat_pada' => now(),
            ]);

            return response()->json(['status' => true, 'message' => 'Admin berhasil dibuat.', 'data' => $user], 201);
        } catch (Exception $e) {
            Log::error('SuperAdminController@storeAdmin: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Gagal membuat admin.'], 500);
        }
    }

    public function updateAdmin(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:8',
        ]);

        try {
            $user = User::where('id', $id)->where('peran', 'admin')->firstOrFail();

            $data = [];
            if (isset($validated['nama'])) $data['nama'] = $validated['nama'];
            if (isset($validated['email'])) $data['email'] = $validated['email'];
            if (!empty($validated['password'])) $data['password'] = Hash::make($validated['password']);

            $user->update($data);

            return response()->json(['status' => true, 'message' => 'Admin berhasil diperbarui.', 'data' => $user]);
        } catch (Exception $e) {
            Log::error('SuperAdminController@updateAdmin: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Gagal memperbarui admin.'], 500);
        }
    }

    public function deleteAdmin($id): JsonResponse
    {
        try {
            $user = User::where('id', $id)->where('peran', 'admin')->firstOrFail();
            $user->delete();

            return response()->json(['status' => true, 'message' => 'Admin berhasil dihapus.']);
        } catch (Exception $e) {
            Log::error('SuperAdminController@deleteAdmin: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Gagal menghapus admin.'], 500);
        }
    }

    // Stats
    public function stats(): JsonResponse
    {
        try {
            $totalUsers = User::count();
            $totalActive = User::where('is_active', true)->count();
            $totalInactive = User::where('is_active', false)->count();
            $totalAdmins = User::where('peran', 'admin')->count();
            $totalSuperadmins = User::where('peran', 'superadmin')->count();

            return response()->json([
                'status' => true,
                'data' => compact('totalUsers', 'totalActive', 'totalInactive', 'totalAdmins', 'totalSuperadmins')
            ]);
        } catch (Exception $e) {
            Log::error('SuperAdminController@stats: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Gagal mengambil statistik.'], 500);
        }
    }
}
