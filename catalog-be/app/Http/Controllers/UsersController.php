<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Exception;

class UsersController
{
    public function index(): JsonResponse
    {
        try {
            $users = Users::select('id', 'nama', 'email', 'peran', 'dibuat_pada')->get();

            return response()->json([
                'status' => true,
                'data'   => $users,
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@index: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'request' => request()->all(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil data users: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $users = Users::findOrFail($id);

            return response()->json([
                'status' => true,
                'data'   => $users,
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@show: ' . $e->getMessage(), [
                'id' => $id,
                'trace' => $e->getTraceAsString(),
                'request' => request()->all(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal mengambil data user: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
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
        } catch (Exception $e) {
            Log::error('Error in UsersController@store: ' . $e->getMessage(), [
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal membuat user: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        try {
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
        } catch (Exception $e) {
            Log::error('Error in UsersController@update: ' . $e->getMessage(), [
                'id' => $id,
                'request' => $request->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal memperbarui user: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $users = Users::findOrFail($id);
            $users->delete();

            return response()->json([
                'status'  => true,
                'message' => 'Users berhasil dihapus.',
            ]);
        } catch (Exception $e) {
            Log::error('Error in UsersController@destroy: ' . $e->getMessage(), [
                'id' => $id,
                'trace' => $e->getTraceAsString(),
                'request' => request()->all(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus user: ' . $e->getMessage(),
                'debug' => [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                ],
            ], 500);
        }
    }
}
