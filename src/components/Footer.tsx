import logoImg from "../assets/logo.png";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Music2,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#072B50", padding: "50px 0 0 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {/* TOP SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1.5fr 1.5fr",
            gap: "40px",
            paddingBottom: "40px",
          }}
        >
          {/* KOLOM 1 - BRAND */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <img
                src={logoImg}
                alt="Logo"
                style={{ height: "36px", objectFit: "contain" }}
              />
              <span
                style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff" }}
              >
                BismarCatalog
              </span>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "#93c5fd",
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              Toko elektronik terpercaya dengan pilihan produk terlengkap dan
              harga terbaik untuk kebutuhan teknologi Anda.
            </p>
          </div>

          {/* KOLOM 2 - QUICK LINKS */}
          <div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 20px 0",
                paddingBottom: "10px",
                borderBottom: "2px solid #1e4d7b",
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {["Beranda", "Produk", "Promo", "Tentang Kami", "Kontak"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontSize: "13px",
                        color: "#93c5fd",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#ffffff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#93c5fd")
                      }
                    >
                      <span style={{ color: "#3b82f6" }}>›</span> {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* KOLOM 3 - CONTACT US */}
          <div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 20px 0",
                paddingBottom: "10px",
                borderBottom: "2px solid #1e4d7b",
              }}
            >
              Contact Us
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {[
                {
                  icon: <MapPin size={16} />,
                  text: "Jl. Contoh No. 123, Surabaya, Jawa Timur",
                },
                { icon: <Phone size={16} />, text: "+62 812-3456-7890" },
                { icon: <Mail size={16} />, text: "info@bismarcatalog.com" },
                {
                  icon: <Clock size={16} />,
                  text: "Senin - Sabtu, 08.00 - 17.00 WIB",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: "#60a5fa",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#93c5fd",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM 4 - FOLLOW US */}
          <div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 20px 0",
                paddingBottom: "10px",
                borderBottom: "2px solid #1e4d7b",
              }}
            >
              Follow Us
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: "#93c5fd",
                marginBottom: "16px",
                lineHeight: 1.6,
              }}
            >
              Ikuti kami di media sosial untuk update produk dan promo terbaru.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                {
                  label: "Facebook",
                  color: "#1877f2",
                  icon: <Facebook size={18} />,
                },
                {
                  label: "Instagram",
                  color: "#e1306c",
                  icon: <Instagram size={18} />,
                },
                {
                  label: "TikTok",
                  color: "#010101",
                  icon: <Music2 size={18} />,
                },
                {
                  label: "WhatsApp",
                  color: "#25d366",
                  icon: <MessageCircle size={18} />,
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  title={social.label}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: social.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    textDecoration: "none",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-3px)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.25)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ← tutup maxWidth di sini */}

      {/* BOTTOM BAR - di luar maxWidth agar full width */}
      <div
        style={{
          background: "#302EA6",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #1e4d7b",
        }}
      >
        <p style={{ fontSize: "12px", color: "#ffffff", margin: 0 }}>
          © 2026 BismarCatalog. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "16px" }}>
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: "12px",
                color: "#c7d2fe",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#c7d2fe")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
