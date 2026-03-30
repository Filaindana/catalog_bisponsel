import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  Clock,
  MapPin,
  Building2,
  AlertTriangle,
  Check,
  Store,
  Map,
} from "lucide-react";

const NAVY = "#072B50";
const NAVY_LIGHT = "rgba(7,43,80,0.07)";
const NAVY_BORDER = "rgba(7,43,80,0.15)";

const initialCabang = [
  {
    id: 1,
    name: "Cabang Jakarta Pusat",
    branchId: "BIZ-JKT-001",
    city: "Jakarta",
    address: "Jl. Jenderal Sudirman No. 123, Tanah Abang",
    image: "🏪",
  },
  {
    id: 2,
    name: "Cabang Bandung",
    branchId: "BIZ-BND-002",
    city: "Bandung",
    address: "Jl. Asia Afrika No. 45, Sumur Bandung",
    image: "🏪",
  },
  {
    id: 3,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88, Genteng",
    image: "🏪",
  },
  {
    id: 4,
    name: "Cabang Surabaya Barat",
    branchId: "BIZ-SBY-004",
    city: "Surabaya",
    address: "Jl. Raya Darmo No. 12, Wonokromo",
    image: "🏪",
  },
  {
    id: 5,
    name: "Cabang Surabaya Timur",
    branchId: "BIZ-SBY-005",
    city: "Surabaya",
    address: "Jl. Ngagel No. 55, Gubeng",
    image: "🏪",
  },
  {
    id: 6,
    name: "Cabang Surabaya Utara",
    branchId: "BIZ-SBY-006",
    city: "Surabaya",
    address: "Jl. Pahlawan No. 7, Bubutan",
    image: "🏪",
  },
  {
    id: 7,
    name: "Cabang Surabaya Selatan",
    branchId: "BIZ-SBY-007",
    city: "Surabaya",
    address: "Jl. Ahmad Yani No. 100, Gayungan",
    image: "🏪",
  },
  {
    id: 8,
    name: "Cabang Sidoarjo",
    branchId: "BIZ-SDJ-008",
    city: "Sidoarjo",
    address: "Jl. Gajah Mada No. 33, Sidoarjo Kota",
    image: "🏪",
  },
  {
    id: 9,
    name: "Cabang Medan",
    branchId: "BIZ-MDN-009",
    city: "Medan",
    address: "Jl. Gatot Subroto No. 10, Medan Baru",
    image: "🏪",
  },
  {
    id: 10,
    name: "Cabang Makassar",
    branchId: "BIZ-MKS-010",
    city: "Makassar",
    address: "Jl. Sam Ratulangi No. 22, Makassar",
    image: "🏪",
  },
  {
    id: 11,
    name: "Cabang Yogyakarta",
    branchId: "BIZ-YGY-011",
    city: "Yogyakarta",
    address: "Jl. Malioboro No. 5, Gedongtengen",
    image: "🏪",
  },
  {
    id: 12,
    name: "Cabang Semarang",
    branchId: "BIZ-SMG-012",
    city: "Semarang",
    address: "Jl. Pemuda No. 30, Semarang Tengah",
    image: "🏪",
  },
];

const ITEMS_PER_PAGE = 4;

const cityColors = {
  Jakarta: { bg: "#eff6ff", color: "#3b82f6" },
  Bandung: { bg: "#f0fdf4", color: "#16a34a" },
  Surabaya: { bg: "#fdf4ff", color: "#9333ea" },
  Sidoarjo: { bg: "#fff7ed", color: "#ea580c" },
  Medan: { bg: "#fef9c3", color: "#ca8a04" },
  Makassar: { bg: "#fef2f2", color: "#dc2626" },
  Yogyakarta: { bg: "#ecfdf5", color: "#0d9488" },
  Semarang: { bg: "#fdf2f8", color: "#db2777" },
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  border: `1.5px solid ${NAVY_BORDER}`,
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
  color: "#1e2433",
  background: "#f8f9fc",
  transition: "border-color 0.2s, background 0.2s",
  fontFamily: "inherit",
};

const Field = ({ label, children, hint }) => (
  <div>
    <label
      style={{
        fontSize: "11px",
        fontWeight: 800,
        color: "#6b7280",
        display: "block",
        marginBottom: "7px",
        textTransform: "uppercase",
        letterSpacing: "0.8px",
      }}
    >
      {label}
    </label>
    {children}
    {hint && (
      <p style={{ fontSize: "11px", color: "#9ca3af", margin: "5px 0 0 0" }}>
        {hint}
      </p>
    )}
  </div>
);

const focusNavy = (e) => {
  e.target.style.borderColor = NAVY;
  e.target.style.background = "#fff";
};
const blurDefault = (e) => {
  e.target.style.borderColor = NAVY_BORDER;
  e.target.style.background = "#f8f9fc";
};

const Overlay = ({ onClose, children }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(10,15,30,0.65)",
      backdropFilter: "blur(6px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    }}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

// ===================== MODAL VIEW =====================
function ViewCabangModal({ cabang, onClose }) {
  const cityStyle = cityColors[cabang.city] || {
    bg: "#f1f5f9",
    color: "#64748b",
  };
  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          width: "460px",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{ background: NAVY, position: "relative", overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "30px",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div
            style={{
              padding: "28px 28px 24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <Store size={28} color="#fff" />
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#fff",
                      margin: "0 0 4px 0",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {cabang.name}
                  </h2>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.75)",
                      background: "rgba(255,255,255,0.15)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {cabang.branchId}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "10px",
                  width: "34px",
                  height: "34px",
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                background: NAVY_LIGHT,
                borderRadius: "12px",
                border: `1.5px solid ${NAVY_BORDER}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <Map size={13} color={NAVY} />
                <p
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    fontWeight: 700,
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Kota
                </p>
              </div>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 700,
                  background: cityStyle.bg,
                  color: cityStyle.color,
                }}
              >
                {cabang.city}
              </span>
            </div>
            <div
              style={{
                padding: "14px 16px",
                background: NAVY_LIGHT,
                borderRadius: "12px",
                border: `1.5px solid ${NAVY_BORDER}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <Building2 size={13} color={NAVY} />
                <p
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    fontWeight: 700,
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  ID Cabang
                </p>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: NAVY,
                  margin: 0,
                  fontFamily: "monospace",
                }}
              >
                {cabang.branchId}
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "16px",
              background: NAVY_LIGHT,
              borderRadius: "12px",
              border: `1.5px solid ${NAVY_BORDER}`,
              marginBottom: "20px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: NAVY,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              <MapPin size={15} color="#fff" />
            </div>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  fontWeight: 700,
                  margin: "0 0 5px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Alamat Lengkap
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: NAVY,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {cabang.address}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "12px",
              border: `1.5px solid ${NAVY_BORDER}`,
              background: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              color: "#374151",
              fontFamily: "inherit",
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </Overlay>
  );
}

// ===================== MODAL TAMBAH =====================
function AddCabangModal({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    city: "",
    jamOperasional: "",
    address: "",
    googleMaps: "",
  });
  const [dragOver, setDragOver] = useState(false);

  const steps = [
    { id: 1, label: "Info", icon: <Building2 size={13} /> },
    { id: 2, label: "Lokasi", icon: <MapPin size={13} /> },
    { id: 3, label: "Media", icon: <Upload size={13} /> },
  ];

  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          width: "520px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: NAVY,
            padding: "28px 32px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              right: "80px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />

          {/* Title row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Building2 size={20} color="#fff" />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#fff",
                    margin: "0 0 3px 0",
                  }}
                >
                  Tambah Cabang Baru
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                  }}
                >
                  Langkah {step} dari {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Steps */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: i < steps.length - 1 ? 1 : "none",
                }}
              >
                <div
                  onClick={() => step > s.id && setStep(s.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: step > s.id ? "pointer" : "default",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background:
                        step >= s.id ? "#fff" : "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border:
                        step === s.id
                          ? "2px solid rgba(255,255,255,0.5)"
                          : "2px solid transparent",
                    }}
                  >
                    {step > s.id ? (
                      <Check size={14} color={NAVY} strokeWidth={3} />
                    ) : (
                      <span
                        style={{
                          color: step === s.id ? NAVY : "rgba(255,255,255,0.5)",
                          display: "flex",
                        }}
                      >
                        {s.icon}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: step >= s.id ? "#fff" : "rgba(255,255,255,0.45)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background:
                        step > s.id
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.2)",
                      margin: "0 12px",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {/* STEP 1 - Info */}
          {step === 1 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <Field label="Nama Cabang">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Cabang Jakarta Pusat"
                  style={inputStyle}
                  onFocus={focusNavy}
                  onBlur={blurDefault}
                />
              </Field>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <Field label="Kota">
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Contoh: Surabaya"
                    style={inputStyle}
                    onFocus={focusNavy}
                    onBlur={blurDefault}
                  />
                </Field>
                <Field label="Jam Operasional">
                  <div style={{ position: "relative" }}>
                    <Clock
                      size={14}
                      color="#9ca3af"
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <input
                      value={form.jamOperasional}
                      onChange={(e) =>
                        setForm({ ...form, jamOperasional: e.target.value })
                      }
                      placeholder="08:00 - 21:00"
                      style={{ ...inputStyle, paddingLeft: "36px" }}
                      onFocus={focusNavy}
                      onBlur={blurDefault}
                    />
                  </div>
                </Field>
              </div>
              {form.name && form.city && (
                <div
                  style={{
                    padding: "14px 16px",
                    background: NAVY_LIGHT,
                    borderRadius: "12px",
                    border: `1.5px solid ${NAVY_BORDER}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Building2 size={16} color={NAVY} />
                  <span
                    style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}
                  >
                    ID Cabang akan dibuat otomatis untuk{" "}
                    <strong>{form.city}</strong>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 - Lokasi */}
          {step === 2 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <Field label="Alamat Lengkap">
                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Masukkan alamat lengkap cabang..."
                  style={{
                    ...inputStyle,
                    height: "100px",
                    resize: "none",
                    lineHeight: 1.6,
                  }}
                  onFocus={focusNavy}
                  onBlur={blurDefault}
                />
              </Field>
              <Field
                label="Link Google Maps"
                hint="Salin link dari Google Maps → Share → Copy Link"
              >
                <div style={{ position: "relative" }}>
                  <MapPin
                    size={14}
                    color="#9ca3af"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    value={form.googleMaps}
                    onChange={(e) =>
                      setForm({ ...form, googleMaps: e.target.value })
                    }
                    placeholder="https://maps.app.goo.gl/..."
                    style={{ ...inputStyle, paddingLeft: "36px" }}
                    onFocus={focusNavy}
                    onBlur={blurDefault}
                  />
                </div>
              </Field>
              {form.googleMaps && (
                <div
                  style={{
                    padding: "14px 16px",
                    background: NAVY_LIGHT,
                    borderRadius: "12px",
                    border: `1.5px solid ${NAVY_BORDER}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <MapPin size={16} color={NAVY} />
                  <span
                    style={{ fontSize: "13px", fontWeight: 600, color: NAVY }}
                  >
                    Link Google Maps terdeteksi ✓
                  </span>
                </div>
              )}
              {form.address && (
                <div
                  style={{
                    background: NAVY_LIGHT,
                    borderRadius: "14px",
                    padding: "16px",
                    border: `1.5px solid ${NAVY_BORDER}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: NAVY,
                      margin: "0 0 10px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                    }}
                  >
                    📍 Preview Lokasi
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: NAVY,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Store size={18} color="#fff" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: NAVY,
                          margin: "0 0 3px 0",
                        }}
                      >
                        {form.name || "Nama Cabang"}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {form.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 - Media */}
          {step === 3 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#6b7280",
                    margin: "0 0 12px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Upload Banner Cabang
                </p>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                  }}
                  style={{
                    border: `2px dashed ${dragOver ? NAVY : NAVY_BORDER}`,
                    borderRadius: "16px",
                    padding: "36px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    background: dragOver ? NAVY_LIGHT : "#fafaff",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      background: dragOver ? NAVY : NAVY_LIGHT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Upload size={24} color={dragOver ? "#fff" : NAVY} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#1e2433",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Drag & drop atau{" "}
                      <span style={{ color: NAVY }}>klik upload</span>
                    </p>
                    <p
                      style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}
                    >
                      PNG, JPG — Maks. 10MB • Rekomendasi 1200×400px
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div
                style={{
                  background: NAVY_LIGHT,
                  borderRadius: "16px",
                  padding: "20px",
                  border: `1.5px solid ${NAVY_BORDER}`,
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: NAVY,
                    margin: "0 0 14px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  ✓ Ringkasan Cabang
                </p>
                {[
                  { label: "Nama", value: form.name || "-" },
                  { label: "Kota", value: form.city || "-" },
                  {
                    label: "Jam Operasional",
                    value: form.jamOperasional || "-",
                  },
                  {
                    label: "Alamat",
                    value: form.address
                      ? form.address.slice(0, 50) +
                        (form.address.length > 50 ? "..." : "")
                      : "-",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: NAVY,
                        maxWidth: "60%",
                        textAlign: "right",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div
          style={{
            padding: "20px 32px",
            borderTop: `1.5px solid ${NAVY_BORDER}`,
            display: "flex",
            gap: "12px",
            flexShrink: 0,
            background: "#fafbff",
          }}
        >
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                padding: "13px 20px",
                borderRadius: "12px",
                border: `1.5px solid ${NAVY_BORDER}`,
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                color: "#374151",
                fontFamily: "inherit",
              }}
            >
              ← Kembali
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                padding: "13px 20px",
                borderRadius: "12px",
                border: `1.5px solid ${NAVY_BORDER}`,
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                color: "#374151",
                fontFamily: "inherit",
              }}
            >
              Batal
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "12px",
                border: "none",
                background: NAVY,
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(7,43,80,0.3)",
                fontFamily: "inherit",
              }}
            >
              Lanjut → {steps[step].label}
            </button>
          ) : (
            <button
              onClick={() => {
                onSave(form);
                onClose();
              }}
              style={{
                flex: 1,
                padding: "13px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(16,185,129,0.35)",
                fontFamily: "inherit",
              }}
            >
              ✓ Simpan Cabang
            </button>
          )}
        </div>
      </div>
    </Overlay>
  );
}

// ===================== MAIN =====================
export default function Cabang() {
  const [cabangs, setCabangs] = useState(initialCabang);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewCabang, setViewCabang] = useState(null);
  const [editCabang, setEditCabang] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    branchId: "",
    city: "",
    address: "",
  });

  const totalPages = Math.ceil(cabangs.length / ITEMS_PER_PAGE);
  const paginated = cabangs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const uniqueCities = [...new Set(cabangs.map((c) => c.city))].length;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push("...");
      if (currentPage > 3 && currentPage < totalPages - 1)
        pages.push(currentPage);
      if (totalPages > 3) pages.push("...", totalPages);
    }
    return [...new Set(pages)];
  };

  const openEdit = (c) => {
    setEditCabang(c);
    setEditForm({
      name: c.name,
      branchId: c.branchId,
      city: c.city,
      address: c.address,
    });
  };
  const handleSaveEdit = () => {
    if (editCabang)
      setCabangs((prev) =>
        prev.map((c) => (c.id === editCabang.id ? { ...c, ...editForm } : c)),
      );
    setEditCabang(null);
  };
  const handleDelete = () => {
    setCabangs((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };
  const handleAddSave = (data) => {
    const newId = Date.now();
    setCabangs((prev) => [
      ...prev,
      {
        id: newId,
        branchId: `BIZ-NEW-${String(newId).slice(-3)}`,
        image: "🏪",
        ...data,
      },
    ]);
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: NAVY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(7,43,80,0.3)",
                }}
              >
                <Building2 size={20} color="#fff" />
              </div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: NAVY,
                  margin: 0,
                  letterSpacing: "-0.5px",
                }}
              >
                Manajemen Cabang
              </h1>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
                paddingLeft: "52px",
              }}
            >
              Kelola daftar toko dan outlet Bizponsel di seluruh wilayah.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 24px",
              borderRadius: "14px",
              background: NAVY,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(7,43,80,0.3)",
              fontFamily: "inherit",
            }}
          >
            <Plus size={16} /> Tambah Cabang
          </button>
        </div>

        {/* STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
          }}
        >
          {[
            {
              label: "Total Cabang",
              value: cabangs.length,
              icon: <Store size={20} color="#fff" />,
              bg: "#fff",
              border: NAVY_BORDER,
              color: NAVY,
              iconBg: NAVY,
            },
            {
              label: "Kota Terjangkau",
              value: uniqueCities,
              icon: <Map size={20} color="#fff" />,
              bg: "#fff",
              border: NAVY_BORDER,
              color: NAVY,
              iconBg: NAVY,
            },
            {
              label: "Cabang Baru",
              value: 2,
              icon: <Building2 size={20} color="#fff" />,
              bg: "#fff",
              border: NAVY_BORDER,
              color: NAVY,
              iconBg: NAVY,
            },
          ].map(({ label, value, icon, bg, border, color, iconBg }) => (
            <div
              key={label}
              style={{
                background: bg,
                borderRadius: "16px",
                padding: "20px",
                border: `1.5px solid ${border}`,
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color,
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color,
                    margin: "4px 0 0 0",
                    opacity: 0.8,
                  }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: `1.5px solid ${NAVY_BORDER}`,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(7,43,80,0.08)",
        }}
      >
        {/* Table header bar */}
        <div
          style={{
            background: NAVY,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Building2 size={16} color="#fff" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Daftar Cabang
            </span>
          </div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {cabangs.length} total cabang
          </span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#fafbff",
                borderBottom: `1.5px solid ${NAVY_BORDER}`,
              }}
            >
              {["BANNER", "NAMA CABANG", "KOTA", "ALAMAT", "AKSI"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 18px",
                    textAlign: h === "AKSI" ? "right" : "left",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#9ca3af",
                    letterSpacing: "0.8px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((cabang, i) => {
              const cs = cityColors[cabang.city] || {
                bg: "#f1f5f9",
                color: "#64748b",
              };
              return (
                <tr
                  key={cabang.id}
                  style={{
                    borderBottom:
                      i < paginated.length - 1 ? `1.5px solid #f8f9fc` : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = NAVY_LIGHT)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={{ padding: "16px 18px" }}>
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "14px",
                        background: NAVY_LIGHT,
                        border: `1.5px solid ${NAVY_BORDER}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Store size={24} color={NAVY} />
                    </div>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: NAVY,
                        margin: "0 0 4px 0",
                      }}
                    >
                      {cabang.name}
                    </p>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#9ca3af",
                        background: "#f1f3f8",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontFamily: "monospace",
                      }}
                    >
                      {cabang.branchId}
                    </span>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 700,
                        background: cs.bg,
                        color: cs.color,
                      }}
                    >
                      {cabang.city}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px 18px",
                      fontSize: "13px",
                      color: "#374151",
                      maxWidth: "240px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                      }}
                    >
                      <MapPin
                        size={13}
                        color="#9ca3af"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span style={{ lineHeight: 1.5 }}>{cabang.address}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 18px", textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end",
                      }}
                    >
                      {[
                        {
                          icon: <Eye size={14} />,
                          bg: NAVY_LIGHT,
                          color: NAVY,
                          action: () => setViewCabang(cabang),
                        },
                        {
                          icon: <Pencil size={14} />,
                          bg: "#fefce8",
                          color: "#ca8a04",
                          action: () => openEdit(cabang),
                        },
                        {
                          icon: <Trash2 size={14} />,
                          bg: "#fef2f2",
                          color: "#ef4444",
                          action: () => setDeleteId(cabang.id),
                        },
                      ].map(({ icon, bg, color, action }, idx) => (
                        <button
                          key={idx}
                          onClick={action}
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "10px",
                            border: "none",
                            background: bg,
                            color,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderTop: `1.5px solid ${NAVY_BORDER}`,
            background: "#fafbff",
          }}
        >
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, cabangs.length)} dari{" "}
            {cabangs.length} cabang
          </p>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                border: `1.5px solid ${NAVY_BORDER}`,
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              ‹
            </button>
            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span
                  key={i}
                  style={{
                    width: "34px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#9ca3af",
                  }}
                >
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => setCurrentPage(Number(page))}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 700,
                    background: currentPage === page ? NAVY : "#fff",
                    color: currentPage === page ? "#fff" : "#374151",
                    border:
                      currentPage === page
                        ? "none"
                        : `1.5px solid ${NAVY_BORDER}`,
                    boxShadow:
                      currentPage === page
                        ? "0 4px 10px rgba(7,43,80,0.25)"
                        : "none",
                  }}
                >
                  {page}
                </button>
              ),
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                border: `1.5px solid ${NAVY_BORDER}`,
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {viewCabang && (
        <ViewCabangModal
          cabang={viewCabang}
          onClose={() => setViewCabang(null)}
        />
      )}
      {showAddModal && (
        <AddCabangModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* MODAL EDIT */}
      {editCabang && (
        <Overlay onClose={() => setEditCabang(null)}>
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "480px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                background: NAVY,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pencil size={18} color="#fff" />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  Edit Cabang
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                  }}
                >
                  {editCabang.name}
                </p>
              </div>
              <button
                onClick={() => setEditCabang(null)}
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "8px",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {[
                { label: "Nama Cabang", key: "name" },
                { label: "ID Cabang", key: "branchId" },
                { label: "Kota", key: "city" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#9ca3af",
                      display: "block",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    value={editForm[key]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [key]: e.target.value })
                    }
                    style={inputStyle}
                    onFocus={focusNavy}
                    onBlur={blurDefault}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#9ca3af",
                    display: "block",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Alamat
                </label>
                <textarea
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({ ...editForm, address: e.target.value })
                  }
                  style={{ ...inputStyle, height: "80px", resize: "none" }}
                  onFocus={focusNavy}
                  onBlur={blurDefault}
                />
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={() => setEditCabang(null)}
                  style={{
                    flex: 1,
                    padding: "13px",
                    borderRadius: "12px",
                    border: `1.5px solid ${NAVY_BORDER}`,
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#374151",
                    fontFamily: "inherit",
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  style={{
                    flex: 2,
                    padding: "13px",
                    borderRadius: "12px",
                    border: "none",
                    background: NAVY,
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                    boxShadow: "0 4px 15px rgba(7,43,80,0.3)",
                    fontFamily: "inherit",
                  }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </Overlay>
      )}

      {/* MODAL HAPUS */}
      {deleteId !== null && (
        <Overlay onClose={() => setDeleteId(null)}>
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "380px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                padding: "32px 28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <AlertTriangle size={30} color="#fff" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 8px 0",
                }}
              >
                Hapus Cabang?
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Tindakan ini tidak dapat dibatalkan.
                <br />
                Cabang akan dihapus permanen.
              </p>
            </div>
            <div style={{ padding: "24px 28px", display: "flex", gap: "12px" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: "12px",
                  border: `1.5px solid ${NAVY_BORDER}`,
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#374151",
                  fontFamily: "inherit",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}
