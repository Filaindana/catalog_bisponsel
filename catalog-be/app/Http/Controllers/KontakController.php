<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use App\Models\Kontak;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class KontakController
{
    public function index(): JsonResponse
    {
        $kontak = Kontak::orderBy('dibuat_pada', 'desc')->paginate(20);

        return response()->json([
            'status' => true,
            'data'   => $kontak,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $kontak = Kontak::findOrFail($id);

        return response()->json([
            'status' => true,
            'data'   => $kontak,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama'    => 'required|string|max:255',
            'email'   => 'required|email:rfc,dns',
            'telepon' => 'nullable|string|max:20',
            'pesan'   => 'required|string',
        ]);

        try {
            $kontak = Kontak::create($validated);

            $mailTo = config('mail.from.address');
            $mailFrom = config('mail.from.address');

            Log::info('Sending contact notification email', [
                'contact_id' => $kontak->id,
                'to' => $mailTo,
                'from' => $mailFrom,
                'mailer' => config('mail.default'),
                'host' => config('mail.mailers.smtp.host'),
                'port' => config('mail.mailers.smtp.port'),
                'encryption' => config('mail.mailers.smtp.encryption'),
            ]);

            try {
                Mail::to($mailTo)
                    ->send(new ContactMessageMail($kontak));

                Log::info('Contact notification email sent successfully', [
                    'contact_id' => $kontak->id,
                    'to' => $mailTo,
                ]);
            } catch (\Throwable $mailException) {
                Log::error('Contact email notification failed', [
                    'contact_id' => $kontak->id,
                    'name' => $kontak->nama,
                    'email' => $kontak->email,
                    'to' => $mailTo,
                    'message' => $mailException->getMessage(),
                    'trace' => $mailException->getTraceAsString(),
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'Pesan berhasil dikirim.',
                'data' => $kontak,
            ], 201);
        } catch (\Throwable $exception) {
            Log::error('Failed to create contact message', [
                'message' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Gagal menyimpan pesan. Silakan coba lagi.',
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        $kontak = Kontak::findOrFail($id);
        $kontak->delete();

        return response()->json([
            'status' => true,
            'message' => 'Pesan berhasil dihapus.',
        ]);
    }
}
