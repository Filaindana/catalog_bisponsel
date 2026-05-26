<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class SettingsService
{
    public function getSettings(): Setting
    {
        return Setting::firstOrCreate([]);
    }

    public function saveSettings(array $payload, ?UploadedFile $avatarFile = null): Setting
    {
        $settings = Setting::firstOrCreate([]);

        $profile = Arr::get($payload, 'profile', []);
        $kontak = Arr::get($payload, 'kontak', []);
        $jamOperasional = Arr::get($payload, 'jam_operasional', []);
        $socialMedia = Arr::get($payload, 'social_media', []);

        if ($avatarFile) {
            $this->deleteOldAvatar($settings);
            $path = $avatarFile->store('avatars', 'public');
            $profile['avatar'] = Storage::url($path);
            $profile['avatar_path'] = $path;
        }

        $settings->profile = array_merge($settings->profile ?? [], $profile);
        $settings->kontak = array_merge($settings->kontak ?? [], $kontak);
        $settings->jam_operasional = array_merge($settings->jam_operasional ?? [], $jamOperasional);
        $settings->social_media = array_values($socialMedia ?? []);

        $settings->save();

        return $settings;
    }

    private function deleteOldAvatar(Setting $settings): void
    {
        $oldPath = data_get($settings->profile, 'avatar_path');

        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
            Storage::disk('public')->delete($oldPath);
        }
    }
}
