import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import heroBg from "../assets/hero1.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border 0.2s ease",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.9)" as const,
    display: "block" as const,
    marginBottom: "8px",
  };

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
            maxWidth: "420px",
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
            Buat Akun
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.7)",
              margin: "0 0 24px 0",
            }}
          >
            Daftar dan nikmati kemudahan berbelanja di BismarCatalog
          </p>

          {/* FORM */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {/* NAMA LENGKAP */}
            <div>
              <label style={labelStyle}>Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                style={inputStyle}
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

            {/* EMAIL */}
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="contoh@email.com"
                style={inputStyle}
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

            {/* NO TELEPON */}
            <div>
              <label style={labelStyle}>No. Telepon</label>
              <input
                type="tel"
                placeholder="+62 812-xxxx-xxxx"
                style={inputStyle}
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
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  style={{ ...inputStyle, padding: "12px 44px 12px 16px" }}
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

            {/* KONFIRMASI PASSWORD */}
            <div>
              <label style={labelStyle}>Konfirmasi Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  style={{ ...inputStyle, padding: "12px 44px 12px 16px" }}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </span>
              </div>
            </div>

            {/* AGREE TERMS */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                style={{
                  accentColor: "#3b82f6",
                  width: "15px",
                  height: "15px",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.5,
                }}
              >
                Saya menyetujui{" "}
                <a
                  href="#"
                  style={{
                    color: "#93c5fd",
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
                    color: "#93c5fd",
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
              onClick={() => navigate("/login")}
              disabled={!agreeTerms}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: "10px",
                background: agreeTerms ? "#072B50" : "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                border: "none",
                cursor: agreeTerms ? "pointer" : "not-allowed",
                transition: "background 0.2s ease, transform 0.1s ease",
                marginTop: "4px",
              }}
              onMouseEnter={(e) => {
                if (agreeTerms) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#0e3d6e";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  agreeTerms ? "#072B50" : "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              Daftar Sekarang
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
                atau daftar dengan
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
                  console.log("Daftar Google berhasil:", credentialResponse);
                  navigate("/");
                }}
                onError={() => console.log("Daftar Google gagal")}
                theme="filled_blue"
                shape="pill"
                size="large"
                text="signup_with"
              />
            </div>

            {/* LINK LOGIN */}
            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
              }}
            >
              Sudah punya akun?{" "}
              <a
                href="/login"
                style={{
                  color: "#93c5fd",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#93c5fd")}
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
