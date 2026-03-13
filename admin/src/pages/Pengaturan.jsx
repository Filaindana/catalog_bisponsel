import { useState } from "react";
import {
  Eye,
  EyeOff,
  Upload,
  Trash2,
  Shield,
  Phone,
  User,
  Save,
  CheckCircle,
} from "lucide-react";

const NAVY = "#072B50";

export default function Pengaturan() {
  const [showPassword, setShowPassword] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedKontak, setSavedKontak] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    nama: "Admin Bizponsel",
    email: "admin@bizponsel.com",
    password: "",
  });
  const [kontakForm, setKontakForm] = useState({
    whatsapp: "81234567890",
    email: "support@bizponsel.com",
    alamat:
      "Jl. Sudirman No. 123, Gedung Bizponsel Lantai 15, Jakarta Pusat, 10220",
  });

  const handleSaveProfile = () => {
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2500);
  };
  const handleSaveKontak = () => {
    setSavedKontak(true);
    setTimeout(() => setSavedKontak(false), 2500);
  };

  const inputBase = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1.5px solid #e8edf5",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    color: "#1e293b",
    background: "#f8faff",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: 700,
    color: "#64748b",
    display: "block",
    marginBottom: "7px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  const tabs = [
    { id: "profile", label: "Profil Admin", icon: <User size={15} /> },
    { id: "kontak", label: "Kontak Website", icon: <Phone size={15} /> },
  ];

  return (
    <div
      style={{
        fontFamily: "'Sora', 'Segoe UI', sans-serif",
        minHeight: "100vh",
        background: "#f4f7fe",
        padding: "0",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        .input-field:focus { border-color: ${NAVY} !important; box-shadow: 0 0 0 3px rgba(7,43,80,0.10) !important; background: #fff !important; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { background: rgba(7,43,80,0.07) !important; }
        .save-btn { transition: all 0.2s; }
        .save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(7,43,80,0.28) !important; }
        .save-btn:active { transform: translateY(0); }
        .upload-btn:hover { opacity: 0.88; }
        .delete-btn:hover { background: #fef2f2 !important; }
        .avatar-wrap { transition: transform 0.2s; }
        .avatar-wrap:hover { transform: scale(1.04); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .card-anim { animation: fadeIn 0.4s ease; }
        @keyframes checkPop { 0% { transform: scale(0.7); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        .check-pop { animation: checkPop 0.35s ease forwards; }
      `}</style>

      {/* PAGE HEADER */}
      <div
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0e4a8a 60%, #1a6ab1 100%)`,
          padding: "36px 36px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "60px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "160px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "200px",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={22} color="#fff" />
          </div>
          <div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              Pengaturan
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.72)",
                margin: "2px 0 0 0",
              }}
            >
              Kelola profil admin & informasi kontak website
            </p>
          </div>
        </div>

        {/* TABS inside header */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginTop: "28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="tab-btn"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "inherit",
                background:
                  activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.13)",
                color: activeTab === tab.id ? NAVY : "rgba(255,255,255,0.85)",
                boxShadow:
                  activeTab === tab.id ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CARD PULL-UP */}
      <div
        style={{
          padding: "0 28px 40px",
          marginTop: "-36px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ===== PROFILE TAB ===== */}
        {activeTab === "profile" && (
          <div
            className="card-anim"
            style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 8px 40px rgba(7,43,80,0.10)",
              overflow: "hidden",
            }}
          >
            {/* Avatar Section */}
            <div
              style={{
                padding: "32px 32px 28px",
                borderBottom: "1.5px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                gap: "28px",
              }}
            >
              <div
                className="avatar-wrap"
                style={{
                  width: "88px",
                  height: "88px",
                  borderRadius: "18px",
                  background: "linear-gradient(135deg, #fde68a, #fbbf24)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "44px",
                  flexShrink: 0,
                  boxShadow: "0 6px 24px rgba(251,191,36,0.3)",
                }}
              >
                👨‍💼
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#111827",
                    margin: "0 0 3px 0",
                  }}
                >
                  Foto CEO
                </p>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#94a3b8",
                    margin: "0 0 14px 0",
                  }}
                >
                  Format JPG, PNG atau GIF · Maks. 2MB
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="upload-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "8px 18px",
                      borderRadius: "9px",
                      background: NAVY,
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "inherit",
                      boxShadow: "0 4px 10px rgba(7,43,80,0.2)",
                    }}
                  >
                    <Upload size={13} /> Upload Foto
                  </button>
                  <button
                    className="delete-btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "8px 18px",
                      borderRadius: "9px",
                      background: "#fff",
                      color: "#ef4444",
                      border: "1.5px solid #fecaca",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: "inherit",
                    }}
                  >
                    <Trash2 size={13} /> Hapus
                  </button>
                </div>
              </div>

              {/* Save button top-right */}
              <button
                className="save-btn"
                onClick={handleSaveProfile}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 24px",
                  borderRadius: "11px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  flexShrink: 0,
                  background: savedProfile
                    ? "#22c55e"
                    : `linear-gradient(135deg, ${NAVY}, #1a6ab1)`,
                  color: "#fff",
                  boxShadow: `0 4px 14px rgba(7,43,80,0.25)`,
                  transition: "background 0.3s",
                }}
              >
                {savedProfile ? (
                  <>
                    <CheckCircle size={16} className="check-pop" /> Tersimpan!
                  </>
                ) : (
                  <>
                    <Save size={15} /> Simpan
                  </>
                )}
              </button>
            </div>

            {/* Form Fields */}
            <div style={{ padding: "28px 32px 32px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label style={labelStyle}>Nama Lengkap</label>
                  <input
                    className="input-field"
                    value={profileForm.nama}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, nama: e.target.value })
                    }
                    style={inputBase}
                    placeholder="Nama lengkap admin"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Admin</label>
                  <input
                    className="input-field"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    style={inputBase}
                    placeholder="email@bisnis.com"
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Password Baru</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    value={profileForm.password}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        password: e.target.value,
                      })
                    }
                    style={{ ...inputBase, paddingRight: "46px" }}
                    placeholder="Biarkan kosong jika tidak diubah"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "13px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    margin: "7px 0 0 0",
                  }}
                >
                  Minimal 8 karakter dengan kombinasi huruf & angka
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== KONTAK TAB ===== */}
        {activeTab === "kontak" && (
          <div
            className="card-anim"
            style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 8px 40px rgba(7,43,80,0.10)",
              overflow: "hidden",
            }}
          >
            {/* Header section */}
            <div
              style={{
                padding: "28px 32px",
                borderBottom: "1.5px solid #f1f5f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#111827",
                    margin: "0 0 4px 0",
                  }}
                >
                  Kontak Website
                </h2>
                <p style={{ fontSize: "12.5px", color: "#94a3b8", margin: 0 }}>
                  Ditampilkan di footer · Klik produk diarahkan ke WhatsApp ini
                </p>
              </div>
              <button
                className="save-btn"
                onClick={handleSaveKontak}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 24px",
                  borderRadius: "11px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  background: savedKontak
                    ? "#22c55e"
                    : `linear-gradient(135deg, ${NAVY}, #1a6ab1)`,
                  color: "#fff",
                  boxShadow: `0 4px 14px rgba(7,43,80,0.25)`,
                  transition: "background 0.3s",
                }}
              >
                {savedKontak ? (
                  <>
                    <CheckCircle size={16} /> Tersimpan!
                  </>
                ) : (
                  <>
                    <Save size={15} /> Simpan
                  </>
                )}
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: "28px 32px 32px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label style={labelStyle}>Nomor WhatsApp</label>
                  <div style={{ display: "flex" }}>
                    <span
                      style={{
                        padding: "11px 13px",
                        background: "#f1f5f9",
                        border: "1.5px solid #e8edf5",
                        borderRight: "none",
                        borderRadius: "10px 0 0 10px",
                        fontSize: "14px",
                        color: "#64748b",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      🇮🇩 +62
                    </span>
                    <input
                      className="input-field"
                      value={kontakForm.whatsapp}
                      onChange={(e) =>
                        setKontakForm({
                          ...kontakForm,
                          whatsapp: e.target.value,
                        })
                      }
                      style={{
                        ...inputBase,
                        borderRadius: "0 10px 10px 0",
                        flex: 1,
                      }}
                      placeholder="8123456789"
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email Perusahaan</label>
                  <input
                    className="input-field"
                    value={kontakForm.email}
                    onChange={(e) =>
                      setKontakForm({ ...kontakForm, email: e.target.value })
                    }
                    style={inputBase}
                    placeholder="support@perusahaan.com"
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Alamat Kantor Pusat</label>
                <textarea
                  className="input-field"
                  value={kontakForm.alamat}
                  onChange={(e) =>
                    setKontakForm({ ...kontakForm, alamat: e.target.value })
                  }
                  style={{
                    ...inputBase,
                    height: "90px",
                    resize: "none",
                    lineHeight: "1.6",
                  }}
                  placeholder="Masukkan alamat lengkap kantor..."
                />
              </div>

              {/* Info banner */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px 18px",
                  background: "rgba(7,43,80,0.06)",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(7,43,80,0.12)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div style={{ fontSize: "18px", flexShrink: 0 }}>💡</div>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: NAVY,
                    margin: 0,
                    lineHeight: "1.6",
                    fontWeight: 500,
                  }}
                >
                  Nomor WhatsApp ini akan digunakan sebagai tautan langsung
                  ketika pengunjung mengklik produk di halaman katalog. Pastikan
                  nomor aktif dan dapat dihubungi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
