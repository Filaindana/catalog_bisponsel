import { useState } from "react";
import { Eye, EyeOff, Upload, Trash2 } from "lucide-react";

export default function Pengaturan() {
  const [showPassword, setShowPassword] = useState(false);
  const [profileForm, setProfileForm] = useState({
    nama: "Admin Bizponsel",
    email: "admin@bizponsel.com",
    password: "••••••••",
  });
  const [kontakForm, setKontakForm] = useState({
    whatsapp: "81234567890",
    email: "support@bizponsel.com",
    alamat:
      "Jl. Sudirman No. 123, Gedung Bizponsel Lantai 15, Jakarta Pusat, 10220",
  });

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    color: "#374151",
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 6px 0",
          }}
        >
          Pengaturan
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
          Kelola profil admin dan informasi kontak website
        </p>
      </div>

      {/* PROFILE ADMIN */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          border: "1px solid #f1f5f9",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
            }}
          >
            Profile Admin
          </h2>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={() => alert("Perubahan disimpan!")}
          >
            Simpan Perubahan
          </button>
        </div>

        {/* FOTO CEO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "28px",
            padding: "20px",
            background: "#f8fafc",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "12px",
              background: "#fde68a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              flexShrink: 0,
            }}
          >
            👨‍💼
          </div>
          <div>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 4px 0",
              }}
            >
              Foto CEO
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                margin: "0 0 12px 0",
              }}
            >
              Gunakan foto formal dengan format JPG, PNG atau GIF (Maks. 2MB).
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "#4f46e5",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <Upload size={14} /> Upload New
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "#fff",
                  color: "#ef4444",
                  border: "1px solid #fecaca",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <Trash2 size={14} /> Delete Photo
              </button>
            </div>
          </div>
        </div>

        {/* FORM PROFILE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Nama Lengkap
            </label>
            <input
              value={profileForm.nama}
              onChange={(e) =>
                setProfileForm({ ...profileForm, nama: e.target.value })
              }
              style={inputStyle}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Email Admin
            </label>
            <input
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Password Baru
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={profileForm.password}
              onChange={(e) =>
                setProfileForm({ ...profileForm, password: e.target.value })
              }
              style={{ ...inputStyle, paddingRight: "44px" }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9ca3af",
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p
            style={{ fontSize: "12px", color: "#9ca3af", margin: "6px 0 0 0" }}
          >
            Biarkan kosong jika tidak ingin mengubah password.
          </p>
        </div>
      </div>

      {/* KONTAK WEBSITE */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "28px",
          border: "1px solid #f1f5f9",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 6px 0",
            }}
          >
            Kontak Website
          </h2>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            Informasi ini akan ditampilkan di footer website. Klik produk pada
            katalog akan diarahkan langsung ke nomor WhatsApp yang terdaftar di
            sini.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Nomor WhatsApp
            </label>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  padding: "10px 12px",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  borderRight: "none",
                  borderRadius: "8px 0 0 8px",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                +62
              </span>
              <input
                value={kontakForm.whatsapp}
                onChange={(e) =>
                  setKontakForm({ ...kontakForm, whatsapp: e.target.value })
                }
                style={{ ...inputStyle, borderRadius: "0 8px 8px 0" }}
              />
            </div>
          </div>
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Email Perusahaan
            </label>
            <input
              value={kontakForm.email}
              onChange={(e) =>
                setKontakForm({ ...kontakForm, email: e.target.value })
              }
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Alamat Kantor Pusat
          </label>
          <textarea
            value={kontakForm.alamat}
            onChange={(e) =>
              setKontakForm({ ...kontakForm, alamat: e.target.value })
            }
            style={{ ...inputStyle, height: "80px", resize: "none" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={() => alert("Pengaturan kontak disimpan!")}
          >
            Simpan Pengaturan Kontak
          </button>
        </div>
      </div>
    </div>
  );
}
