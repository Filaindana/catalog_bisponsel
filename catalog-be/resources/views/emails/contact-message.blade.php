<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesan Baru Website BizPonsel</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fb; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7fb; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 18px rgba(7, 43, 80, 0.05); border: 1px solid #dde6f0;">
                    
                    <!-- HEADER -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #072B50 0%, #0c3e75 100%); padding: 35px 40px; text-align: center;">
                            <div style="font-size: 11px; font-weight: 800; color: #60a5fa; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px;">BIZPONSEL CATALOG</div>
                            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px;">Notifikasi Pesan Baru Website</h1>
                        </td>
                    </tr>

                    <!-- BODY CARD -->
                    <tr>
                        <td style="padding: 40px 40px 30px;">
                            <p style="margin: 0 0 24px; color: #374151; font-size: 15px; line-height: 1.6; font-weight: 500;">
                                Halo Admin,
                            </p>
                            <p style="margin: 0 0 24px; color: #4b5563; font-size: 14.5px; line-height: 1.6;">
                                Sistem telah menerima pesan baru dari formulir kontak website. Berikut adalah detail informasi pengirim:
                            </p>

                            <!-- DATA TABLE -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafbfd; border-radius: 12px; border: 1px solid #e8eff6; padding: 20px; margin-bottom: 28px; font-size: 13.5px;">
                                <tr>
                                    <td style="padding: 8px 0; width: 120px; font-weight: 700; color: #072B50; vertical-align: top;">Nama</td>
                                    <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">{{ $contact->nama }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 700; color: #072B50; vertical-align: top;">Email</td>
                                    <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">
                                        <a href="mailto:{{ $contact->email }}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">{{ $contact->email }}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 700; color: #072B50; vertical-align: top;">Telepon</td>
                                    <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">{{ $contact->telepon ?: '-' }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 700; color: #072B50; vertical-align: top;">Waktu</td>
                                    <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">{{ optional($contact->dibuat_pada)->format('d F Y • H:i') ?? now()->format('d F Y • H:i') }} WIB</td>
                                </tr>
                            </table>

                            <!-- PESAN BLOCK -->
                            <div style="background-color: #f8fafc; border-left: 4px solid #072B50; border-radius: 4px 12px 12px 4px; padding: 22px 24px; margin-bottom: 10px;">
                                <div style="font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px;">Isi Pesan</div>
                                <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.7; white-space: pre-wrap; font-style: italic;">"{{ $contact->pesan }}"</p>
                            </div>
                        </td>
                    </tr>

                    <!-- FOOTER BUTTON -->
                    <tr>
                        <td style="padding: 0 40px 40px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #e2e8f0; padding-top: 24px; color: #64748b; font-size: 12px; line-height: 1.6; text-align: center;">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 8px; font-weight: 600;">Email ini dikirim secara otomatis oleh sistem BizPonsel.</p>
                                        <p style="margin: 0;">Untuk membalas pengirim secara langsung, cukup klik tombol <strong>Reply (Balas)</strong> pada klien email Anda.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
