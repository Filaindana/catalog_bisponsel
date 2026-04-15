import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import heroBg from "../assets/hero1.jpg";
import logo from "../assets/logo.png";
import { register } from "../utils/services/authService";

const inputStyle = {
  width: "100%",
  padding: "11px 16px",
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  color: "#111827",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  transition: "border 0.2s ease, background 0.2s ease",
  fontFamily: "inherit",
};

const labelStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: "#374151",
  display: "block",
  marginBottom: 6,
};

const features = [
  "Akses ke ribuan produk elektronik",
  "Filter & cari produk dengan mudah",
  "Simpan produk favorit & kelola profilmu",
];

export default function Register() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert("Password tidak sama");
    }

    try {
      await register({
        nama,
        email,
        phone,
        password,
        password_confirmation: confirmPassword,
        peran: "user",
      });

      alert("Register berhasil!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  const onFocus = (e) => {
    e.currentTarget.style.border = "1px solid #072B50";
    e.currentTarget.style.background = "#fff";
  };
  const onBlur = (e) => {
    e.currentTarget.style.border = "1px solid #e5e7eb";
    e.currentTarget.style.background = "#f9fafb";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* KIRI - BRANDING */}
      <div
        style={{
          flex: 1,
          background: `linear-gradient(135deg, rgba(7,43,80,0.92) 0%, rgba(7,43,80,0.75) 100%), url(${heroBg}) center/cover no-repeat`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: 38, objectFit: "contain" }}
          />
          <div style={{ lineHeight: 1 }}>
            <div>
              <b style={{ fontSize: 17, color: "#FE0808" }}>BIZ</b>
              <b style={{ fontSize: 17, color: "#fff" }}>PONSEL</b>
            </div>
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "4px",
                fontWeight: 600,
              }}
            >
              CATALOG
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative" }}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 16px 0",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            Temukan produk 
            <br />
            yang kamu cari!
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              margin: "0 0 36px 0",
              maxWidth: 340,
            }}
          >
            Buat akun untuk mengakses katalog lengkap dan menyimpan produk favoritmu.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {features.map((text, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#93c5fd",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 500,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            margin: 0,
            position: "relative",
          }}
        >
          © 2026 BizPonsel. All rights reserved.
        </p>
      </div>

      {/* KANAN - FORM */}
      <div
        style={{
          width: 540,
          flexShrink: 0,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 64px",
          overflowY: "auto",
        }}
      >
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 4px 0",
            letterSpacing: "-0.4px",
          }}
        >
          Buat Akun
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 28px 0" }}>
          Daftar dan simpan produk favoritmu di BizPonsel
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label style={labelStyle}>No. Telepon</label>
            <input
              type="tel"
              placeholder="+62 812-xxxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* PASSWORD */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 40 }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#9ca3af",
                    display: "flex",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Konfirmasi Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 40 }}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#9ca3af",
                    display: "flex",
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* TERMS */}
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              style={{
                accentColor: "#072B50",
                width: 15,
                height: 15,
                marginTop: 2,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
              Saya menyetujui{" "}
              <a
                href="#"
                style={{
                  color: "#072B50",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Syarat & Ketentuan
              </a>{" "}
              dan{" "}
              <a
                href="#"
                style={{
                  color: "#072B50",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Kebijakan Privasi
              </a>
            </span>
          </label>

          {/* TOMBOL DAFTAR */}
          <button
            onClick={handleRegister}
            disabled={!agreeTerms}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              background: agreeTerms ? "#072B50" : "#e5e7eb",
              color: agreeTerms ? "#fff" : "#9ca3af",
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              cursor: agreeTerms ? "pointer" : "not-allowed",
              transition: "background 0.2s ease",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (agreeTerms) e.currentTarget.style.background = "#0e3d6e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = agreeTerms
                ? "#072B50"
                : "#e5e7eb";
            }}
          >
            Daftar Sekarang
          </button>

          {/* DIVIDER */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              atau daftar dengan
            </span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#6b7280",
              margin: 0,
            }}
          >
            Sudah punya akun?{" "}
            <a
              href="/login"
              style={{
                color: "#072B50",
                fontWeight: 700,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Masuk sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
