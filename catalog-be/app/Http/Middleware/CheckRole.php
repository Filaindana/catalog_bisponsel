<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!auth('sanctum')->check()) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = auth('sanctum')->user();

        if (!in_array($user->peran, $roles)) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden - Akses hanya untuk role: ' . implode(', ', $roles),
            ], 403);
        }

        return $next($request);
    }
}
