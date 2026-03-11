import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import heroBg from "../assets/hero1.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBg}) center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px",
        }}
      >
        {/* FORM CARD */}
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(16px)",
            borderRadius: "20px",
            padding: "40px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* JUDUL */}
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 6px 0",
            }}
          >
            Selamat Datang
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.7)",
              margin: "0 0 28px 0",
            }}
          >
            Masuk ke akun BismarCatalog Anda
          </p>

          {/* FORM */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* EMAIL */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="contoh@email.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border 0.2s ease",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.8)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.3)")
                }
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.9)",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 16px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border 0.2s ease",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border =
                      "1px solid rgba(255,255,255,0.8)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border =
                      "1px solid rgba(255,255,255,0.3)")
                  }
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  style={{
                    accentColor: "#3b82f6",
                    width: "15px",
                    height: "15px",
                  }}
                />
                <span
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}
                >
                  Ingat saya
                </span>
              </label>
              <a
                href="#"
                style={{
                  fontSize: "13px",
                  color: "#93c5fd",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#93c5fd")}
              >
                Lupa password?
              </a>
            </div>

            {/* TOMBOL MASUK */}
            <button
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "10px",
                background: "#072B50",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s ease, transform 0.1s ease",
                marginTop: "4px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#0e3d6e";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#072B50";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              Masuk
            </button>

            {/* DIVIDER */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              <span
                style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}
              >
                atau masuk dengan
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </div>

            {/* GOOGLE LOGIN */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log("Login Google berhasil:", credentialResponse);
                  navigate("/");
                }}
                onError={() => {
                  console.log("Login Google gagal");
                }}
                theme="filled_blue"
                shape="pill"
                size="large"
                text="signin_with"
              />
            </div>

            {/* LINK DAFTAR */}
            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
              }}
            >
              Belum punya akun?{" "}
              <a
                href="/register"
                style={{
                  color: "#93c5fd",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#93c5fd")}
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
