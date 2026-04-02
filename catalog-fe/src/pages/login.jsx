import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import heroBg from "../assets/hero1.jpg";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isReady = email.trim() !== "" && password.trim() !== "";

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
          <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={logo} alt="Logo" style={{ height: "38px", objectFit: "contain" }} />
            <div style={{ lineHeight: 1 }}>
              <div><b style={{ fontSize: "17px", color: "#FE0808" }}>BIZ</b><b style={{ fontSize: "17px", color: "#fff" }}>PONSEL</b></div>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "4px", fontWeight: 600 }}>CATALOG</span>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 16px 0", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
              Selamat datang<br />kembali!
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: "0 0 36px 0", maxWidth: "340px" }}>
              Masuk dan lanjutkan pengalaman berbelanja produk teknologi terbaik bersama kami.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {["Akses ke ribuan produk elektronik", "Notifikasi promo & flash sale eksklusif", "Riwayat pembelian tersimpan aman"].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#93c5fd", flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>© 2026 BizPonsel. All rights reserved.</p>
        </div>

        {/* ── KANAN - FORM ── */}
        <div style={{ width: "540px", flexShrink: 0, background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 80px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px 0", letterSpacing: "-0.4px" }}>Selamat Datang</h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 32px 0" }}>Masuk ke akun BizPonsel Anda</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* EMAIL */}
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={(e) => { e.currentTarget.style.border = "1px solid #072B50"; e.currentTarget.style.background = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid #e5e7eb"; e.currentTarget.style.background = "#f9fafb"; }}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* REMEMBER ME & LUPA PASSWORD */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}
                  style={{ accentColor: "#072B50", width: "15px", height: "15px" }}
                />
                <span style={{ fontSize: "13px", color: "#6b7280" }}>Ingat saya</span>
              </label>
              <a href="#" style={{ fontSize: "13px", color: "#072B50", fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Lupa password?
              </a>
            </div>

            {/* TOMBOL MASUK */}
            <button
              onClick={() => navigate("/")}
              disabled={!isReady}
              style={{
                width: "100%", padding: "13px", borderRadius: "10px",
                background: isReady ? "#072B50" : "#e5e7eb",
                color: isReady ? "#fff" : "#9ca3af",
                fontSize: "14px", fontWeight: 700, border: "none",
                cursor: isReady ? "pointer" : "not-allowed",
                transition: "background 0.2s ease, transform 0.1s ease", marginTop: "4px"
              }}
              onMouseEnter={(e) => { if (isReady) { e.currentTarget.style.background = "#0e3d6e"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = isReady ? "#072B50" : "#e5e7eb"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Masuk
            </button>

            {/* DIVIDER */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>atau masuk dengan</span>
              <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            </div>

            {/* GOOGLE LOGIN */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => { console.log("Login Google berhasil:", credentialResponse); navigate("/"); }}
                onError={() => console.log("Login Google gagal")}
                theme="outline" shape="pill" size="large" text="signin_with"
              />
            </div>

            {/* LINK DAFTAR */}
            <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", margin: 0 }}>
              Belum punya akun?{" "}
              <a href="/register" style={{ color: "#072B50", fontWeight: 700, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>

      </div>
    </GoogleOAuthProvider>
  );
}