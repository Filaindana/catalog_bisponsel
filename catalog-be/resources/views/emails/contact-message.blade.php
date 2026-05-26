<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesan Baru dari Halaman Kontak</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f7fb; margin: 0; padding: 0;">
    <div style="max-width: 640px; margin: 0 auto; padding: 24px; background-color: #ffffff; border-radius: 12px; border: 1px solid #dce6f0;">
        <div style="background-color: #072B50; color: #ffffff; padding: 20px; border-radius: 10px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 22px;">Pesan Baru dari Halaman Kontak</h2>
            <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9;">Sistem menerima pesan baru dari pengunjung website.</p>
        </div>

        <p style="margin: 0 0 16px; color: #1f2937; font-size: 16px; line-height: 1.6;">
            Berikut adalah detail pesan yang masuk:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; color: #1f2937;">
            <tr>
                <td style="padding: 10px 0; width: 140px; font-weight: 700;">Nama Pengirim</td>
                <td style="padding: 10px 0;">{{ $contact->nama }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; font-weight: 700;">Email Pengirim</td>
                <td style="padding: 10px 0;">{{ $contact->email }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; font-weight: 700;">Nomor Telepon</td>
                <td style="padding: 10px 0;">{{ $contact->telepon ?: '-' }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; font-weight: 700;">Subjek</td>
                <td style="padding: 10px 0;">Pesan Baru dari Halaman Kontak</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; font-weight: 700; vertical-align: top;">Isi Pesan</td>
                <td style="padding: 10px 0; line-height: 1.7;">{{ nl2br(e($contact->pesan)) }}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; font-weight: 700;">Waktu Kirim</td>
                <td style="padding: 10px 0;">{{ optional($contact->dibuat_pada)->format('d F Y, H:i') ?? now()->format('d F Y, H:i') }}</td>
            </tr>
        </table>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; color: #4b5563; font-size: 13px; line-height: 1.6;">
            <p style="margin: 0;">Pesan ini dikirim otomatis oleh sistem BizPonsel.</p>
            <p style="margin: 8px 0 0;">Anda dapat membalas langsung ke alamat pengirim melalui fitur balas email.</p>
        </div>
    </div>
</body>
</html>
