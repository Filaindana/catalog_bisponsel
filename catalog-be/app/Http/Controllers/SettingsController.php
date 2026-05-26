<?php

namespace App\Http\Controllers;

use App\Services\SettingsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function __construct(private SettingsService $service)
    {
    }

    public function show(): JsonResponse
    {
        $settings = $this->service->getSettings();

        return response()->json($this->formatSettings($settings));
    }

    public function update(Request $request): JsonResponse
    {
        $payload = $this->parseNestedJsonPayload($request);

        $validator = Validator::make($payload, [
            'profile' => 'sometimes|array',
            'profile.nama' => 'nullable|string|max:255',
            'profile.email' => 'nullable|email|max:255',
            'profile.avatar' => 'nullable|string|max:1024',
            'profile.jabatan' => 'nullable|string|max:255',
            'profile.quote' => 'nullable|string|max:500',

            'kontak' => 'sometimes|array',
            'kontak.whatsapp' => 'nullable|string|max:50',
            'kontak.email' => 'nullable|email|max:255',
            'kontak.alamat' => 'nullable|string|max:1000',
            'kontak.telepon' => 'nullable|string|max:50',
            'kontak.maps_embed' => 'nullable|string|max:2000',

            'jam_operasional' => 'sometimes|array',
            'jam_operasional.pusat' => 'sometimes|array',
            'jam_operasional.pusat.senin_jumat' => 'sometimes|array',
            'jam_operasional.pusat.senin_jumat.buka' => 'nullable|date_format:H:i',
            'jam_operasional.pusat.senin_jumat.tutup' => 'nullable|date_format:H:i',
            'jam_operasional.pusat.senin_jumat.libur' => 'nullable|boolean',
            'jam_operasional.pusat.sabtu' => 'sometimes|array',
            'jam_operasional.pusat.sabtu.buka' => 'nullable|date_format:H:i',
            'jam_operasional.pusat.sabtu.tutup' => 'nullable|date_format:H:i',
            'jam_operasional.pusat.sabtu.libur' => 'nullable|boolean',
            'jam_operasional.pusat.minggu' => 'sometimes|array',
            'jam_operasional.pusat.minggu.libur' => 'nullable|boolean',
            'jam_operasional.cabang' => 'nullable|array',
            'jam_operasional.cabang.*.id' => 'nullable|integer',
            'jam_operasional.cabang.*.nama' => 'nullable|string|max:255',
            'jam_operasional.cabang.*.shifts' => 'nullable|array',
            'jam_operasional.cabang.*.shifts.*.label' => 'nullable|string|max:255',
            'jam_operasional.cabang.*.shifts.*.buka' => 'nullable|date_format:H:i',
            'jam_operasional.cabang.*.shifts.*.tutup' => 'nullable|date_format:H:i',

            'social_media' => 'nullable|array',
            'social_media.*.label' => 'required_with:social_media|string|max:50',
            'social_media.*.url' => 'required_with:social_media|url|max:1000',
            'social_media.*.icon' => 'required_with:social_media|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $avatarFile = $request->file('avatar');

        try {
            $settings = $this->service->saveSettings($validator->validated(), $avatarFile);

            return response()->json($this->formatSettings($settings));
        } catch (\Throwable $exception) {
            Log::error('Settings update failed: '.$exception->getMessage(), [
                'trace' => $exception->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to update settings. Please try again later.',
            ], 500);
        }
    }

    private function parseNestedJsonPayload(Request $request): array
    {
        $payload = $request->all();

        foreach (['profile', 'kontak', 'jam_operasional', 'social_media'] as $key) {
            if ($request->has($key) && is_string($request->input($key))) {
                $decoded = json_decode($request->input($key), true);

                if (json_last_error() === JSON_ERROR_NONE) {
                    $payload[$key] = $decoded;
                }
            }
        }

        return $payload;
    }

    private function formatSettings($settings): array
    {
        $profile = is_array($settings->profile ?? null) ? $settings->profile : [];

        if (! empty($profile['avatar_path']) && Storage::disk('public')->exists($profile['avatar_path'])) {
            $profile['avatar'] = Storage::url($profile['avatar_path']);
        }

        unset($profile['avatar_path']);

        $jamOperasional = array_merge([
            'pusat' => [
                'senin_jumat' => ['buka' => null, 'tutup' => null, 'libur' => false],
                'sabtu' => ['buka' => null, 'tutup' => null, 'libur' => false],
                'minggu' => ['libur' => true],
            ],
            'cabang' => [],
        ], $settings->jam_operasional ?? []);

        $jamOperasional['cabang'] = is_array($jamOperasional['cabang'] ?? null) ? $jamOperasional['cabang'] : [];

        return [
            'profile' => array_merge([
                'nama' => null,
                'email' => null,
                'avatar' => null,
                'jabatan' => null,
                'quote' => null,
            ], $profile),
            'kontak' => array_merge([
                'whatsapp' => null,
                'email' => null,
                'alamat' => null,
                'telepon' => null,
                'maps_embed' => null,
            ], $settings->kontak ?? []),
            'jam_operasional' => $jamOperasional,
            'social_media' => is_array($settings->social_media ?? null)
                ? array_values($settings->social_media)
                : [],
        ];
    }
}
