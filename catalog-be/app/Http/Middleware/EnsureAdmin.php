<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (! $user || ! in_array($user->peran, ['admin', 'superadmin'])) {
            return response()->json([
                'status' => false,
                'message' => 'Akses ditolak. Hanya admin atau superadmin yang dapat mengakses resource ini.'
            ], 403);
        }

        return $next($request);
    }
}
