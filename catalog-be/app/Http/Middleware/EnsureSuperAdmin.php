<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureSuperAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (! $user || $user->peran !== 'superadmin') {
            return response()->json([
                'status' => false,
                'message' => 'Akses ditolak. Hanya superadmin yang dapat mengakses resource ini.'
            ], 403);
        }

        return $next($request);
    }
}
