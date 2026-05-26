<?php

namespace App\Mail;

use App\Models\Kontak;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public Kontak $contact;

    public function __construct(Kontak $contact)
    {
        $this->contact = $contact;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address') ?? 'hello@example.com',
                config('mail.from.name') ?? config('app.name', 'BizPonsel'),
            ),
            subject: 'Pesan Baru dari Halaman Kontak - ' . config('app.name'),
            replyTo: [new Address($this->contact->email, $this->contact->nama)],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-message',
            with: [
                'contact' => $this->contact,
            ],
        );
    }
}
