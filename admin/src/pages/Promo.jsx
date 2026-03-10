import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  Search,
  Tag,
  Calendar,
  Zap,
  AlertTriangle,
  Check,
  Sparkles,
} from "lucide-react";

const initialPromos = [
  {
    id: 1,
    name: "Diskon Akhir Tahun",
    desc: "Potongan harga hingga 50%",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Aktif",
    bannerColor: "#3b82f6",
  },
  {
    id: 2,
    name: "Promo Gajian",
    desc: "Cashback khusus pengguna setia",
    startDate: "2024-02-25",
    endDate: "2024-02-28",
    status: "Segera",
    bannerColor: "#f59e0b",
  },
  {
    id: 3,
    name: "Flash Sale 12.12",
    desc: "Penawaran kilat hanya 24 jam",
    startDate: "2023-12-12",
    endDate: "2023-12-12",
    status: "Berakhir",
    bannerColor: "#ef4444",
  },
  {
    id: 4,
    name: "Cashback Spesial",
    desc: "Extra saldo untuk Top Up",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "Segera",
    bannerColor: "#0d9488",
  },
  {
    id: 5,
    name: "Mega Sale Harbolnas",
    desc: "Diskon besar-besaran se-Indonesia",
    startDate: "2024-04-01",
    endDate: "2024-04-07",
    status: "Aktif",
    bannerColor: "#8b5cf6",
  },
  {
    id: 6,
    name: "Promo Lebaran",
    desc: "Spesial Hari Raya Idul Fitri",
    startDate: "2024-04-10",
    endDate: "2024-04-20",
    status: "Segera",
    bannerColor: "#ec4899",
  },
  {
    id: 7,
    name: "Double Cashback",
    desc: "2x cashback untuk semua transaksi",
    startDate: "2024-05-01",
    endDate: "2024-05-05",
    status: "Segera",
    bannerColor: "#f97316",
  },
  {
    id: 8,
    name: "Flash Sale Weekend",
    desc: "Hanya Sabtu & Minggu",
    startDate: "2024-03-16",
    endDate: "2024-03-17",
    status: "Berakhir",
    bannerColor: "#06b6d4",
  },
];

const ITEMS_PER_PAGE = 4;
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const statusConfig = {
  Aktif: { bg: "#dcfce7", color: "#16a34a", dot: "#22c55e", label: "Aktif" },
  Segera: { bg: "#fef9c3", color: "#ca8a04", dot: "#eab308", label: "Segera" },
  Berakhir: {
    bg: "#fee2e2",
    color: "#dc2626",
    dot: "#ef4444",
    label: "Berakhir",
  },
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  border: "1.5px solid #e8eaf0",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
  color: "#1e2433",
  background: "#f8f9fc",
  transition: "border-color 0.2s, background 0.2s",
  fontFamily: "inherit",
};

const produkOptions = [
  "PC Gaming",
  "Hp Samsung",
  "iPhone 15",
  "iPad Air",
  "Laptop Asus",
  "Samsung S24",
  "Xiaomi 14",
  "ASUS ROG",
  "MacBook Pro",
];

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
function ViewPromoModal({ promo, onClose }) {
  const cfg = statusConfig[promo.status] || statusConfig.Berakhir;
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
        <div
          style={{
            height: "140px",
            background: `linear-gradient(135deg, ${promo.bannerColor}dd, ${promo.bannerColor}88)`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "20px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎉</div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "rgba(255,255,255,0.9)",
                textTransform: "uppercase",
                letterSpacing: "2px",
                background: "rgba(0,0,0,0.15)",
                padding: "4px 12px",
                borderRadius: "20px",
              }}
            >
              PROMO
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "rgba(255,255,255,0.2)",
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
        <div style={{ padding: "24px 28px 28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#1e2433",
                  margin: "0 0 6px 0",
                }}
              >
                {promo.name}
              </h2>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                {promo.desc}
              </p>
            </div>
            <span
              style={{
                padding: "5px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                background: cfg.bg,
                color: cfg.color,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
                marginLeft: "12px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: cfg.dot,
                  display: "inline-block",
                }}
              />
              {cfg.label}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {[
              {
                label: "Tanggal Mulai",
                value: formatDate(promo.startDate),
                icon: "📅",
              },
              {
                label: "Tanggal Selesai",
                value: formatDate(promo.endDate),
                icon: "🏁",
              },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                style={{
                  padding: "14px 16px",
                  background: "#f8f9fc",
                  borderRadius: "12px",
                  border: "1.5px solid #eef0f8",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    color: "#9ca3af",
                    fontWeight: 700,
                    margin: "0 0 6px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {icon} {label}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1e2433",
                    margin: 0,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "14px 16px",
              background: "#f8f9fc",
              borderRadius: "12px",
              border: "1.5px solid #eef0f8",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: promo.bannerColor,
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  fontWeight: 700,
                  margin: "0 0 3px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Warna Banner
              </p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#1e2433",
                  margin: 0,
                }}
              >
                {promo.bannerColor.toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "12px",
              border: "1.5px solid #e8eaf0",
              background: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              color: "#374151",
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
function AddPromoModal({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    desc: "",
    isAktif: true,
    bannerColor: "#4f46e5",
  });
  const [produkSearch, setProdukSearch] = useState("");
  const [selectedProduk, setSelectedProduk] = useState([
    "PC Gaming",
    "Hp Samsung",
  ]);
  const [dragOver, setDragOver] = useState(false);

  const filteredProduk = produkOptions.filter(
    (p) =>
      p.toLowerCase().includes(produkSearch.toLowerCase()) &&
      !selectedProduk.includes(p),
  );
  const addProduk = (p) => {
    setSelectedProduk([...selectedProduk, p]);
    setProdukSearch("");
  };
  const removeProduk = (p) =>
    setSelectedProduk(selectedProduk.filter((s) => s !== p));

  const steps = [
    { id: 1, label: "Info", icon: <Tag size={13} /> },
    { id: 2, label: "Banner", icon: <Zap size={13} /> },
    { id: 3, label: "Produk", icon: <Sparkles size={13} /> },
  ];
  const presetColors = [
    "#4f46e5",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#0d9488",
    "#f97316",
    "#06b6d4",
  ];

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

  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          width: "540px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
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
              background: "rgba(255,255,255,0.08)",
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
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "24px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={20} color="#fff" />
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
                  Tambah Promo Baru
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.75)",
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
                background: "rgba(255,255,255,0.2)",
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
          <div style={{ display: "flex", alignItems: "center" }}>
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
                      transition: "all 0.3s",
                      flexShrink: 0,
                    }}
                  >
                    {step > s.id ? (
                      <Check size={14} color="#f59e0b" strokeWidth={3} />
                    ) : (
                      <span
                        style={{
                          color:
                            step === s.id ? "#f59e0b" : "rgba(255,255,255,0.6)",
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
                      color: step >= s.id ? "#fff" : "rgba(255,255,255,0.5)",
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
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,255,255,0.2)",
                      margin: "0 12px",
                      borderRadius: "2px",
                      transition: "background 0.3s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {step === 1 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <Field label="Nama Promo">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Flash Sale Akhir Tahun 50%"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#f59e0b";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8eaf0";
                    e.target.style.background = "#f8f9fc";
                  }}
                />
              </Field>
              <Field label="Deskripsi Promo">
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Jelaskan detail penawaran promo ini..."
                  style={{
                    ...inputStyle,
                    height: "90px",
                    resize: "none",
                    lineHeight: 1.6,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#f59e0b";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8eaf0";
                    e.target.style.background = "#f8f9fc";
                  }}
                />
              </Field>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <Field label="Tanggal Mulai">
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#f59e0b";
                      e.target.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e8eaf0";
                      e.target.style.background = "#f8f9fc";
                    }}
                  />
                </Field>
                <Field label="Tanggal Selesai">
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#f59e0b";
                      e.target.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e8eaf0";
                      e.target.style.background = "#f8f9fc";
                    }}
                  />
                </Field>
              </div>
              {form.startDate && form.endDate && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "linear-gradient(135deg, #fffbeb, #fef3c7)",
                    borderRadius: "12px",
                    border: "1.5px solid #fde68a",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Calendar size={16} color="#f59e0b" />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#92400e",
                    }}
                  >
                    Durasi:{" "}
                    {Math.max(
                      0,
                      Math.ceil(
                        (new Date(form.endDate) - new Date(form.startDate)) /
                          (1000 * 60 * 60 * 24) +
                          1,
                      ),
                    )}{" "}
                    hari
                  </span>
                </div>
              )}
              <div
                style={{
                  padding: "16px",
                  background: "#f8f9fc",
                  borderRadius: "14px",
                  border: "1.5px solid #eef0f8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1e2433",
                      margin: "0 0 3px 0",
                    }}
                  >
                    Aktifkan Langsung
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    Promo langsung tampil setelah disimpan
                  </p>
                </div>
                <div
                  onClick={() => setForm({ ...form, isAktif: !form.isAktif })}
                  style={{
                    width: "48px",
                    height: "26px",
                    borderRadius: "13px",
                    background: form.isAktif ? "#f59e0b" : "#e2e8f0",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.25s",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: form.isAktif ? "25px" : "3px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.25s",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#6b7280",
                    margin: "0 0 10px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  Preview Banner
                </p>
                <div
                  style={{
                    height: "100px",
                    borderRadius: "14px",
                    background: `linear-gradient(135deg, ${form.bannerColor}ee, ${form.bannerColor}88)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    border: "1.5px solid #eef0f8",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-20px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#fff",
                      textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      margin: 0,
                    }}
                  >
                    {form.name || "Nama Promo"}
                  </p>
                </div>
              </div>
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
                  Pilih Warna Banner
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  {presetColors.map((c) => (
                    <div
                      key={c}
                      onClick={() => setForm({ ...form, bannerColor: c })}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: c,
                        cursor: "pointer",
                        border:
                          form.bannerColor === c
                            ? "3px solid #1e2433"
                            : "3px solid transparent",
                        transition: "transform 0.15s, border 0.15s",
                        boxShadow:
                          form.bannerColor === c ? `0 0 0 2px ${c}55` : "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.15)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  ))}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1.5px solid #e8eaf0",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <input
                      type="color"
                      value={form.bannerColor}
                      onChange={(e) =>
                        setForm({ ...form, bannerColor: e.target.value })
                      }
                      style={{
                        position: "absolute",
                        inset: "-4px",
                        width: "calc(100% + 8px)",
                        height: "calc(100% + 8px)",
                        cursor: "pointer",
                        border: "none",
                        padding: 0,
                      }}
                    />
                  </div>
                </div>
              </div>
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
                  Upload Gambar Banner (Opsional)
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
                    border: `2px dashed ${dragOver ? "#f59e0b" : "#fde68a"}`,
                    borderRadius: "14px",
                    padding: "32px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    background: dragOver ? "#fffbeb" : "#fffdf5",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: dragOver
                        ? "linear-gradient(135deg, #f59e0b, #f97316)"
                        : "linear-gradient(135deg, #fef3c7, #fde68a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Upload size={22} color={dragOver ? "#fff" : "#f59e0b"} />
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#1e2433",
                      margin: 0,
                    }}
                  >
                    Drag & drop atau{" "}
                    <span style={{ color: "#f59e0b" }}>klik upload</span>
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    PNG, JPG — Maks. 2MB • Rekomendasi 1200×400px
                  </p>
                </div>
              </div>
            </div>
          )}

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
                  Cari & Tambah Produk
                </p>
                <div style={{ position: "relative" }}>
                  <Search
                    size={14}
                    color="#9ca3af"
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    value={produkSearch}
                    onChange={(e) => setProdukSearch(e.target.value)}
                    placeholder="Ketik nama produk..."
                    style={{ ...inputStyle, paddingLeft: "38px" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#f59e0b";
                      e.target.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e8eaf0";
                      e.target.style.background = "#f8f9fc";
                    }}
                  />
                  {produkSearch && filteredProduk.length > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1.5px solid #e8eaf0",
                        borderRadius: "12px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        zIndex: 10,
                        marginTop: "6px",
                        overflow: "hidden",
                      }}
                    >
                      {filteredProduk.map((p, i) => (
                        <div
                          key={p}
                          onClick={() => addProduk(p)}
                          style={{
                            padding: "11px 16px",
                            fontSize: "13px",
                            color: "#374151",
                            cursor: "pointer",
                            fontWeight: 600,
                            borderBottom:
                              i < filteredProduk.length - 1
                                ? "1px solid #f1f3f8"
                                : "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#fffbeb";
                            e.currentTarget.style.color = "#f59e0b";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#fff";
                            e.currentTarget.style.color = "#374151";
                          }}
                        >
                          + {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {selectedProduk.length > 0 && (
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
                    Produk Terpilih ({selectedProduk.length})
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {selectedProduk.map((p) => (
                      <span
                        key={p}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "7px 12px",
                          background:
                            "linear-gradient(135deg, #fffbeb, #fef3c7)",
                          borderRadius: "10px",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#92400e",
                          border: "1.5px solid #fde68a",
                        }}
                      >
                        {p}
                        <button
                          onClick={() => removeProduk(p)}
                          style={{
                            background: "#fde68a",
                            border: "none",
                            borderRadius: "6px",
                            width: "18px",
                            height: "18px",
                            cursor: "pointer",
                            color: "#92400e",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            flexShrink: 0,
                          }}
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {form.name && (
                <div
                  style={{
                    background: "linear-gradient(135deg, #fffbeb, #fff7ed)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1.5px solid #fde68a",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#f59e0b",
                      margin: "0 0 14px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                    }}
                  >
                    ✓ Ringkasan Promo
                  </p>
                  {[
                    { label: "Nama", value: form.name },
                    {
                      label: "Periode",
                      value:
                        form.startDate && form.endDate
                          ? `${formatDate(form.startDate)} – ${formatDate(form.endDate)}`
                          : "-",
                    },
                    {
                      label: "Status",
                      value: form.isAktif ? "Langsung Aktif" : "Segera",
                    },
                    {
                      label: "Produk",
                      value: `${selectedProduk.length} produk`,
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
                          color: "#1e2433",
                          maxWidth: "60%",
                          textAlign: "right",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "20px 32px",
            borderTop: "1.5px solid #f1f3f8",
            display: "flex",
            gap: "12px",
            flexShrink: 0,
            background: "#fafbff",
          }}
        >
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                padding: "13px 20px",
                borderRadius: "12px",
                border: "1.5px solid #e8eaf0",
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                color: "#374151",
              }}
            >
              ← Kembali
            </button>
          )}
          {step === 1 && (
            <button
              onClick={onClose}
              style={{
                padding: "13px 20px",
                borderRadius: "12px",
                border: "1.5px solid #e8eaf0",
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                color: "#374151",
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
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(245,158,11,0.4)",
              }}
            >
              Lanjut → {steps[step].label}
            </button>
          ) : (
            <button
              onClick={() => {
                onSave({
                  name: form.name,
                  desc: form.desc,
                  startDate: form.startDate,
                  endDate: form.endDate,
                  status: form.isAktif ? "Aktif" : "Segera",
                  bannerColor: form.bannerColor,
                });
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
              }}
            >
              ✓ Simpan Promo
            </button>
          )}
        </div>
      </div>
    </Overlay>
  );
}

// ===================== MAIN =====================
export default function Promo() {
  const [promos, setPromos] = useState(initialPromos);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewPromo, setViewPromo] = useState(null);
  const [editPromo, setEditPromo] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    desc: "",
    startDate: "",
    endDate: "",
    status: "Aktif",
    bannerColor: "#3b82f6",
  });

  const totalPages = Math.ceil(promos.length / ITEMS_PER_PAGE);
  const paginated = promos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const aktifCount = promos.filter((p) => p.status === "Aktif").length;
  const segeraCount = promos.filter((p) => p.status === "Segera").length;
  const berakhirCount = promos.filter((p) => p.status === "Berakhir").length;

  const openEdit = (p) => {
    setEditPromo(p);
    setEditForm({
      name: p.name,
      desc: p.desc,
      startDate: p.startDate,
      endDate: p.endDate,
      status: p.status,
      bannerColor: p.bannerColor,
    });
  };
  const handleSaveEdit = () => {
    if (editPromo)
      setPromos((prev) =>
        prev.map((p) => (p.id === editPromo.id ? { ...p, ...editForm } : p)),
      );
    setEditPromo(null);
  };
  const handleDelete = () => {
    setPromos((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };
  const handleAddSave = (data) => {
    setPromos((prev) => [...prev, { id: Date.now(), ...data }]);
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
                  background: "linear-gradient(135deg, #f59e0b, #f97316)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(245,158,11,0.3)",
                }}
              >
                <Zap size={20} color="#fff" />
              </div>
              <h1
                style={{
                  fontSize: "26px",
                  fontWeight: 800,
                  color: "#1e2433",
                  margin: 0,
                  letterSpacing: "-0.5px",
                }}
              >
                Manajemen Promo
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
              Kelola semua penawaran promo aktif dan mendatang.
            </p>
          </div>
          {/* TOMBOL BIRU */}
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 24px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
            }}
          >
            <Plus size={16} /> Tambah Promo
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
              label: "Promo Aktif",
              value: aktifCount,
              icon: "⚡",
              bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
              border: "#6ee7b7",
              color: "#065f46",
              iconBg: "#10b981",
            },
            {
              label: "Segera Mulai",
              value: segeraCount,
              icon: "⏳",
              bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
              border: "#fcd34d",
              color: "#78350f",
              iconBg: "#f59e0b",
            },
            {
              label: "Berakhir",
              value: berakhirCount,
              icon: "🏁",
              bg: "linear-gradient(135deg, #fee2e2, #fecaca)",
              border: "#fca5a5",
              color: "#7f1d1d",
              iconBg: "#ef4444",
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
                  fontSize: "20px",
                  flexShrink: 0,
                  boxShadow: `0 4px 12px ${iconBg}55`,
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
          border: "1.5px solid #f1f3f8",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #fffbeb, #fff7ed)",
            padding: "16px 20px",
            borderBottom: "1.5px solid #fde68a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Tag size={16} color="#f59e0b" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#92400e",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Daftar Promo
            </span>
          </div>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>
            {promos.length} total promo
          </span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#fafbff",
                borderBottom: "1.5px solid #f1f3f8",
              }}
            >
              {["BANNER", "NAMA PROMO", "PERIODE", "STATUS", "AKSI"].map(
                (h) => (
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
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.map((promo, i) => {
              const cfg = statusConfig[promo.status] || statusConfig.Berakhir;
              return (
                <tr
                  key={promo.id}
                  style={{
                    borderBottom:
                      i < paginated.length - 1 ? "1.5px solid #f8f9fc" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fffdf5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={{ padding: "16px 18px" }}>
                    <div
                      style={{
                        width: "88px",
                        height: "54px",
                        borderRadius: "12px",
                        background: `linear-gradient(135deg, ${promo.bannerColor}ee, ${promo.bannerColor}77)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: `0 4px 12px ${promo.bannerColor}44`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.15)",
                        }}
                      />
                      <span style={{ fontSize: "20px" }}>🎉</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#1e2433",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {promo.name}
                    </p>
                    <p
                      style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}
                    >
                      {promo.desc}
                    </p>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Calendar size={13} color="#9ca3af" />
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#374151",
                          fontWeight: 500,
                        }}
                      >
                        {formatDate(promo.startDate)} –{" "}
                        {formatDate(promo.endDate)}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 18px" }}>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 700,
                        background: cfg.bg,
                        color: cfg.color,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: cfg.dot,
                          display: "inline-block",
                        }}
                      />
                      {cfg.label}
                    </span>
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
                          bg: "#eff6ff",
                          color: "#3b82f6",
                          action: () => setViewPromo(promo),
                        },
                        {
                          icon: <Pencil size={14} />,
                          bg: "#fefce8",
                          color: "#ca8a04",
                          action: () => openEdit(promo),
                        },
                        {
                          icon: <Trash2 size={14} />,
                          bg: "#fef2f2",
                          color: "#ef4444",
                          action: () => setDeleteId(promo.id),
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
            borderTop: "1.5px solid #f1f3f8",
            background: "#fafbff",
          }}
        >
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, promos.length)} dari{" "}
            {promos.length} promo
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                border: "1.5px solid #e8eaf0",
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                  background:
                    currentPage === page
                      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                      : "#fff",
                  color: currentPage === page ? "#fff" : "#374151",
                  border: currentPage === page ? "none" : "1.5px solid #e8eaf0",
                  boxShadow:
                    currentPage === page
                      ? "0 4px 10px rgba(79,70,229,0.3)"
                      : "none",
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "10px",
                border: "1.5px solid #e8eaf0",
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

      {viewPromo && (
        <ViewPromoModal promo={viewPromo} onClose={() => setViewPromo(null)} />
      )}
      {showAddModal && (
        <AddPromoModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* MODAL EDIT */}
      {editPromo && (
        <Overlay onClose={() => setEditPromo(null)}>
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
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
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
                  background: "rgba(255,255,255,0.25)",
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
                  Edit Promo
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.8)",
                    margin: 0,
                  }}
                >
                  {editPromo.name}
                </p>
              </div>
              <button
                onClick={() => setEditPromo(null)}
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.2)",
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
                { label: "Nama Promo", key: "name" },
                { label: "Deskripsi", key: "desc" },
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
                  />
                </div>
              ))}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {[
                  { label: "Tanggal Mulai", key: "startDate", type: "date" },
                  { label: "Tanggal Selesai", key: "endDate", type: "date" },
                ].map(({ label, key, type }) => (
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
                      type={type}
                      value={editForm[key]}
                      onChange={(e) =>
                        setEditForm({ ...editForm, [key]: e.target.value })
                      }
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
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
                    Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Segera">Segera</option>
                    <option value="Berakhir">Berakhir</option>
                  </select>
                </div>
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
                    Warna Banner
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      background: "#f8f9fc",
                      borderRadius: "10px",
                      border: "1.5px solid #e8eaf0",
                    }}
                  >
                    <input
                      type="color"
                      value={editForm.bannerColor}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          bannerColor: e.target.value,
                        })
                      }
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        background: "none",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#374151",
                      }}
                    >
                      {editForm.bannerColor.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button
                  onClick={() => setEditPromo(null)}
                  style={{
                    flex: 1,
                    padding: "13px",
                    borderRadius: "12px",
                    border: "1.5px solid #e8eaf0",
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#374151",
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
                    background: "linear-gradient(135deg, #f59e0b, #f97316)",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                    boxShadow: "0 4px 15px rgba(245,158,11,0.35)",
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
                Hapus Promo?
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
                Promo akan dihapus permanen.
              </p>
            </div>
            <div style={{ padding: "24px 28px", display: "flex", gap: "12px" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1.5px solid #e8eaf0",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#374151",
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
                  boxShadow: "0 4px 15px rgba(239,68,68,0.35)",
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
