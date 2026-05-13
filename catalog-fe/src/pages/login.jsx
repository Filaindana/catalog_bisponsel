import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import heroBg from "../assets/hero1.jpg";
import logo from "../assets/logo.png";
import { login } from "../utils/services/authService";

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

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const passwordRef = useRef(null);

  // browser kadang auto-clear password field saat login gagal — restore manual
  useEffect(() => {
    if (errorMsg && passwordRef.current && passwordRef.current.value !== password) {
      passwordRef.current.value = password;
    }
  }, [errorMsg, password]);

  const isReady = email.trim() !== "" && password.trim() !== "";

  // const handleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     await login(email, password);
  //     navigate("/");
  //   } catch (err) {
  //     alert(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await login(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      const redirectPath = res.user?.peran === "admin" ? "/admin" : "/";
      navigate(redirectPath);
    } catch (err) {
      setErrorMsg(err.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
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
        {/* Decorative circles */}
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
            Selamat datang
            <br />
            kembali!
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
            Masuk untuk menggunakan fitur simpan produk dan mengakses profilmu.
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
          Selamat Datang
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 32px 0" }}>
          Masuk ke akun BizPonsel Anda
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* ERROR BANNER */}
          {errorMsg && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "11px 14px", borderRadius: 10,
              background: "#fff1f2", border: "1px solid #fecdd3",
              animation: "fadeIn .2s ease",
            }}>
              <svg width="16" height="16" fill="none" stroke="#e11d48" strokeWidth="2" viewBox="0 0 24 24" style={{ shrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              <span style={{ fontSize: 13, color: "#be123c", fontWeight: 500 }}>{errorMsg}</span>
              <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrorMsg(""); }}
              onKeyDown={(e) => { if (e.key === "Enter" && isReady && !loading) handleLogin(); }}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid #072B50";
                e.currentTarget.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1px solid #e5e7eb";
                e.currentTarget.style.background = "#f9fafb";
              }}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => { setPassword(e.target.value); setErrorMsg(""); }}
                onKeyDown={(e) => { if (e.key === "Enter" && isReady && !loading) handleLogin(); }}
                style={{ ...inputStyle, paddingRight: 40 }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1px solid #072B50";
                  e.currentTarget.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid #e5e7eb";
                  e.currentTarget.style.background = "#f9fafb";
                }}
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

          {/* REMEMBER ME & LUPA PASSWORD */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                style={{ accentColor: "#072B50", width: 15, height: 15 }}
              />
              <span style={{ fontSize: 13, color: "#6b7280" }}>Ingat saya</span>
            </label>
            <a
              href="#"
              style={{
                fontSize: 13,
                color: "#072B50",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Lupa password?
            </a>
          </div>

          {/* TOMBOL MASUK */}
          <button
            onClick={handleLogin}
            disabled={!isReady || loading}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              background: isReady ? "#072B50" : "#e5e7eb",
              color: isReady ? "#fff" : "#9ca3af",
              fontSize: 14,
              fontWeight: 700,
              border: "none",
              cursor: isReady ? "pointer" : "not-allowed",
              transition: "background 0.2s ease, transform 0.1s ease",
              marginTop: 4,
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (isReady) {
                e.currentTarget.style.background = "#0e3d6e";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isReady
                ? "#072B50"
                : "#e5e7eb";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Masuk
          </button>

          {/* DIVIDER */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              atau masuk dengan
            </span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          {/* LINK DAFTAR */}
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#6b7280",
              margin: 0,
            }}
          >
            Belum punya akun?{" "}
            <a
              href="/register"
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
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
