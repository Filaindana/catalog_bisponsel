import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import heroBg from "../assets/hero1.jpg";
import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "11px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    color: "#111827",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s ease, background 0.2s ease",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" }}>

        {/* ── KIRI - BRANDING ── */}
        <div style={{
          flex: 1,
          background: `linear-gradient(135deg, rgba(7,43,80,0.92) 0%, rgba(7,43,80,0.75) 100%), url(${heroBg}) center/cover no-repeat`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* dekorasi */}
          <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

          {/* logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={logo} alt="Logo" style={{ height: "38px", objectFit: "contain" }} />
            <div style={{ lineHeight: 1 }}>
              <div><b style={{ fontSize: "17px", color: "#FE0808" }}>BIZ</b><b style={{ fontSize: "17px", color: "#fff" }}>PONSEL</b></div>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "4px", fontWeight: 600 }}>CATALOG</span>
            </div>
          </div>

          {/* teks tengah */}
          <div>
            <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 16px 0", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              Bergabung bersama<br />ribuan pelanggan kami
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: "0 0 36px 0", maxWidth: "340px" }}>
              Temukan produk teknologi terbaik dengan harga kompetitif dan layanan terpercaya.
            </p>

            {/* benefit list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: "✓", text: "Akses ke ribuan produk elektronik" },
                { icon: "✓", text: "Notifikasi promo & flash sale eksklusif" },
                { icon: "✓", text: "Riwayat pembelian tersimpan aman" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#93c5fd", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* bottom */}
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>© 2026 BizPonsel. All rights reserved.</p>
        </div>

        {/* ── KANAN - FORM ── */}
        <div style={{
          width: "540px",
          flexShrink: 0,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 80px",
          overflowY: "auto",
        }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px 0", letterSpacing: "-0.4px" }}>Buat Akun</h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 28px 0" }}>Daftar dan nikmati kemudahan berbelanja di BizPonsel</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* NAMA LENGKAP */}
            <div>
              <label style={labelStyle}>Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama lengkap" style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.border = "1px solid #072B50"; e.currentTarget.style.background = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid #e5e7eb"; e.currentTarget.style.background = "#f9fafb"; }}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="contoh@email.com" style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.border = "1px solid #072B50"; e.currentTarget.style.background = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid #e5e7eb"; e.currentTarget.style.background = "#f9fafb"; }}
              />
            </div>

            {/* NO TELEPON */}
            <div>
              <label style={labelStyle}>No. Telepon</label>
              <input type="tel" placeholder="+62 812-xxxx-xxxx" style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.border = "1px solid #072B50"; e.currentTarget.style.background = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid #e5e7eb"; e.currentTarget.style.background = "#f9fafb"; }}
              />
            </div>

            {/* PASSWORD - 2 kolom */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} placeholder="Min. 8 karakter"
                    style={{ ...inputStyle, padding: "11px 40px 11px 16px" }}
                    onFocus={(e) => { e.currentTarget.style.border = "1px solid #072B50"; e.currentTarget.style.background = "#fff"; }}
                    onBlur={(e) => { e.currentTarget.style.border = "1px solid #e5e7eb"; e.currentTarget.style.background = "#f9fafb"; }}
                  />
                  <span onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af", display: "flex" }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Konfirmasi Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="Ulangi password"
                    style={{ ...inputStyle, padding: "11px 40px 11px 16px" }}
                    onFocus={(e) => { e.currentTarget.style.border = "1px solid #072B50"; e.currentTarget.style.background = "#fff"; }}
                    onBlur={(e) => { e.currentTarget.style.border = "1px solid #e5e7eb"; e.currentTarget.style.background = "#f9fafb"; }}
                  />
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af", display: "flex" }}>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>
              </div>
            </div>

            {/* AGREE TERMS */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)}
                style={{ accentColor: "#072B50", width: "15px", height: "15px", marginTop: "2px", flexShrink: 0 }}
              />
              <span style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>
                Saya menyetujui{" "}
                <a href="#" style={{ color: "#072B50", textDecoration: "none", fontWeight: 600 }}>Syarat & Ketentuan</a>
                {" "}dan{" "}
                <a href="#" style={{ color: "#072B50", textDecoration: "none", fontWeight: 600 }}>Kebijakan Privasi</a>
              </span>
            </label>

            {/* TOMBOL DAFTAR */}
            <button
              onClick={() => navigate("/login")}
              disabled={!agreeTerms}
              style={{ width: "100%", padding: "13px", borderRadius: "10px", background: agreeTerms ? "#072B50" : "#e5e7eb", color: agreeTerms ? "#fff" : "#9ca3af", fontSize: "14px", fontWeight: 700, border: "none", cursor: agreeTerms ? "pointer" : "not-allowed", transition: "background 0.2s ease" }}
              onMouseEnter={(e) => { if (agreeTerms) e.currentTarget.style.background = "#0e3d6e"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = agreeTerms ? "#072B50" : "#e5e7eb"; }}
            >
              Daftar Sekarang
            </button>

            {/* DIVIDER */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>atau daftar dengan</span>
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            </div>

            {/* GOOGLE LOGIN */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => { console.log("Daftar Google berhasil:", credentialResponse); navigate("/"); }}
                onError={() => console.log("Daftar Google gagal")}
                theme="outline" shape="pill" size="large" text="signup_with"
              />
            </div>

            {/* LINK LOGIN */}
            <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", margin: 0 }}>
              Sudah punya akun?{" "}
              <a href="/login" style={{ color: "#072B50", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Masuk sekarang
              </a>
            </p>
          </div>
        </div>

      </div>
    </GoogleOAuthProvider>
  );
}