<?php

namespace Tests\Feature;

use App\Models\Users;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_settings_returns_expected_payload(): void
    {
        $response = $this->getJson('/api/settings');

        $response->assertOk()
            ->assertJsonStructure([
                'profile' => [
                    'nama',
                    'email',
                    'avatar',
                    'jabatan',
                    'quote',
                ],
                'kontak' => [
                    'whatsapp',
                    'email',
                    'alamat',
                    'telepon',
                    'maps_embed',
                ],
                'jam_operasional' => [
                    'pusat' => [
                        'senin_jumat',
                        'sabtu',
                        'minggu',
                    ],
                    'cabang',
                ],
                'social_media',
            ])
            ->assertJsonMissingPath('cabang')
            ->assertJsonMissingPath('profile.avatar_path');
    }

    public function test_update_settings_persists_database_and_returns_consistent_payload(): void
    {
        $user = Users::create([
            'nama' => 'Test Admin',
            'email' => 'admin@test.example',
            'password' => bcrypt('password'),
            'peran' => 'admin',
        ]);

        $payload = [
            'profile' => [
                'nama' => 'Nama CEO Baru',
                'email' => 'ceo@newmail.test',
                'jabatan' => 'Chief Executive Officer',
                'quote' => 'Kutipan baru untuk halaman kontak',
            ],
            'kontak' => [
                'whatsapp' => '+62 899-0000-1111',
                'email' => 'contact@newmail.test',
                'alamat' => 'Jl. Baru No. 1',
                'telepon' => '021-1111-2222',
                'maps_embed' => 'https://maps.example.test/embed/abc',
            ],
            'jam_operasional' => [
                'pusat' => [
                    'senin_jumat' => ['buka' => '09:00', 'tutup' => '17:30', 'libur' => false],
                    'sabtu' => ['buka' => '09:00', 'tutup' => '14:00', 'libur' => false],
                    'minggu' => ['libur' => true],
                ],
                'cabang' => [],
            ],
            'social_media' => [
                ['label' => 'Instagram', 'url' => 'https://instagram.com/newbizponsel', 'icon' => 'instagram'],
                ['label' => 'WhatsApp', 'url' => 'https://wa.me/6289900001111', 'icon' => 'whatsapp'],
            ],
        ];

        $response = $this->actingAs($user)->putJson('/api/settings', $payload);

        $response->assertOk()
            ->assertJsonPath('profile.nama', 'Nama CEO Baru')
            ->assertJsonPath('profile.email', 'ceo@newmail.test')
            ->assertJsonPath('profile.jabatan', 'Chief Executive Officer')
            ->assertJsonPath('profile.quote', 'Kutipan baru untuk halaman kontak')
            ->assertJsonPath('kontak.email', 'contact@newmail.test')
            ->assertJsonPath('kontak.telepon', '021-1111-2222')
            ->assertJsonPath('social_media.0.label', 'Instagram')
            ->assertJsonMissingPath('profile.avatar_path')
            ->assertJsonMissingPath('cabang');

        $this->assertDatabaseHas('settings', [
            'id' => 1,
        ]);

        $settings = \App\Models\Setting::first();

        $this->assertSame('Nama CEO Baru', $settings->profile['nama']);
        $this->assertSame('ceo@newmail.test', $settings->profile['email']);
        $this->assertSame('contact@newmail.test', $settings->kontak['email']);
        $this->assertSame('https://wa.me/6289900001111', $settings->social_media[1]['url']);
    }
}
