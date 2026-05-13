import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { MapPin, Phone, Mail, Clock, X } from "lucide-react";

const PRIVACY_CONTENT = `
**Kebijakan Privasi BizPonsel**
Terakhir diperbarui: April 2026

BizPonsel berkomitmen untuk melindungi privasi pengguna. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.

**1. Informasi yang Kami Kumpulkan**
Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, alamat email, dan nomor telepon saat mendaftar atau menghubungi kami.

**2. Penggunaan Informasi**
Informasi Anda digunakan untuk memproses pesanan, mengirimkan pembaruan produk, memberikan layanan pelanggan, dan meningkatkan pengalaman pengguna di platform kami.

**3. Keamanan Data**
Kami menggunakan enkripsi SSL dan langkah-langkah keamanan industri standar untuk melindungi data Anda dari akses tidak sah.

**4. Berbagi Informasi**
Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum.

**5. Cookie**
Kami menggunakan cookie untuk meningkatkan pengalaman penelusuran Anda. Anda dapat menonaktifkan cookie melalui pengaturan browser kapan saja.

**6. Hak Pengguna**
Anda berhak mengakses, memperbarui, atau menghapus informasi pribadi Anda dengan menghubungi kami di info@bismarcatalog.com.

**7. Perubahan Kebijakan**
Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan signifikan akan diberitahukan melalui email atau notifikasi di website.
`;

const TERMS_CONTENT = `
**Syarat & Ketentuan BizPonsel**
Terakhir diperbarui: April 2026

Dengan menggunakan layanan BizPonsel, Anda menyetujui syarat dan ketentuan berikut.

**1. Penggunaan Layanan**
Platform ini hanya boleh digunakan untuk tujuan yang sah. Pengguna dilarang melakukan aktivitas yang melanggar hukum atau merugikan pengguna lain.

**2. Akun Pengguna**
Anda bertanggung jawab menjaga kerahasiaan kredensial akun Anda. Setiap aktivitas yang terjadi di bawah akun Anda menjadi tanggung jawab Anda sepenuhnya.

**3. Informasi Produk**
Kami berusaha menyajikan informasi produk yang akurat, namun tidak menjamin ketersediaan atau harga produk setiap saat. Harga dapat berubah tanpa pemberitahuan sebelumnya.

**4. Layanan Pelanggan**
Untuk pertanyaan atau keluhan, hubungi kami melalui halaman Kontak atau email info@bismarcatalog.com. Kami akan merespons dalam 1x24 jam kerja.

**5. Hak Kekayaan Intelektual**
Seluruh konten, logo, dan materi di platform ini adalah milik BizPonsel dan dilindungi hak cipta. Dilarang menyalin atau mendistribusikan tanpa izin tertulis.

**6. Batasan Tanggung Jawab**
BizPonsel tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan platform ini di luar kendali kami.

**7. Hukum yang Berlaku**
Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Segala sengketa diselesaikan melalui pengadilan yang berwenang di Surabaya.
`;

function PolicyModal({ title, content, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[16px] font-bold text-[#072B50] m-0">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3">
          {content.trim().split("\n\n").map((block, i) => {
            if (block.startsWith("**") && block.endsWith("**") && !block.slice(2).includes("**")) {
              return <h3 key={i} className="text-[13px] font-bold text-[#072B50] mt-2 mb-0">{block.replace(/\*\*/g, "")}</h3>;
            }
            const parts = block.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} className="text-[13px] text-gray-600 leading-relaxed m-0">
                {parts.map((part, j) =>
                  part.startsWith("**") ? <strong key={j} className="text-[#072B50]">{part.replace(/\*\*/g, "")}</strong> : part
                )}
              </p>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-[13px] font-semibold text-white transition-colors"
            style={{ background: "#072B50" }}
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}

const FacebookIcon  = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>);
const InstagramIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>);
const TikTokIcon    = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>);
const WhatsAppIcon  = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>);

export default function Footer() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const links = [
    { label: "Beranda", path: "/" },
    { label: "Produk",  path: "/product" },
    { label: "Promo",   path: "/promo" },
    { label: "Kontak",  path: "/contact" },
  ];

  const contacts = [
    { icon: <MapPin size={16} />, text: "Jl. Contoh No. 123, Surabaya, Jawa Timur" },
    { icon: <Phone size={16} />,  text: "+62 812-3456-7890" },
    { icon: <Mail size={16} />,   text: "info@bismarcatalog.com" },
    { icon: <Clock size={16} />,  text: "Senin - Sabtu, 08.00 - 17.00 WIB" },
  ];

  const socials = [
    { label: "Facebook",  bg: "bg-[#1877f2]",   icon: <FacebookIcon /> },
    { label: "Instagram", bg: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]", icon: <InstagramIcon /> },
    { label: "TikTok",    bg: "bg-[#010101]",   icon: <TikTokIcon /> },
    { label: "WhatsApp",  bg: "bg-[#25d366]",   icon: <WhatsAppIcon /> },
  ];

  return (
    <>
    {activeModal === "privacy" && (
      <PolicyModal title="Privacy Policy" content={PRIVACY_CONTENT} onClose={() => setActiveModal(null)} />
    )}
    {activeModal === "terms" && (
      <PolicyModal title="Terms of Service" content={TERMS_CONTENT} onClose={() => setActiveModal(null)} />
    )}
    <footer className="bg-[#072B50]">

      {/* ACCENT LINE */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #a78bfa 100%)" }} />

      <div className="px-10 mx-auto max-w-300 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1.6fr_1.6fr] gap-10 pb-10">

          {/* KOLOM 1 - BRAND */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoImg} alt="Logo" className="object-contain h-9" />
              <span className="text-lg font-bold text-white">BizPonsel</span>
            </div>
            <p className="text-[13px] text-[#b0bec5] leading-[1.9] m-0 mb-5">
              Toko elektronik terpercaya dengan pilihan produk terlengkap dan
              harga terbaik untuk kebutuhan teknologi Anda.
            </p>
            {/* rating/trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              <span style={{ color: "#facc15", fontSize: 13 }}>★★★★★</span>
              <span className="text-[12px] text-white/60">Terpercaya sejak 2015</span>
            </div>
          </div>

          {/* KOLOM 2 - QUICK LINKS */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {links.map((item) => (
                <li key={item.label}>
                  <span
                    onClick={() => { navigate(item.path); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="footer-link"
                  >
                    <span className="footer-link-arrow">›</span>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3 - CONTACT US */}
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <div className="flex flex-col gap-3">
              {contacts.map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span className="shrink-0 mt-0.5 text-blue-400">{item.icon}</span>
                  <span className="text-[13px] text-[#b0bec5] leading-[1.6] group-hover:text-white transition-colors duration-200">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM 4 - FOLLOW US */}
          <div>
            <h4 className="footer-heading">Follow Us</h4>
            <p className="text-[13px] text-[#b0bec5] mb-4 leading-[1.7]">
              Ikuti kami di media sosial untuk update produk dan promo terbaru.
            </p>
            <div className="flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  title={social.label}
                  className={`footer-social ${social.bg}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)" }} />
      </div>

      {/* BOTTOM BAR */}
      <div className="py-4 px-10 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="m-0 text-xs text-white/40">© 2026 BismarCatalog. All rights reserved.</p>
        <div className="flex gap-4">
          <button onClick={() => setActiveModal("privacy")}
            className="text-xs text-white/40 bg-transparent border-none cursor-pointer hover:text-white transition-colors duration-200 p-0">
            Privacy Policy
          </button>
          <button onClick={() => setActiveModal("terms")}
            className="text-xs text-white/40 bg-transparent border-none cursor-pointer hover:text-white transition-colors duration-200 p-0">
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
    </>
  );
}