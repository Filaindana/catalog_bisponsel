import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  ImageIcon,
  Info,
  DollarSign,
  Package,
  AlertTriangle,
  Check,
  ChevronDown,
  Tag,
} from "lucide-react";

const NAVY = "#072B50";
const NAVY_LIGHT = "rgba(7,43,80,0.07)";
const NAVY_BORDER = "rgba(7,43,80,0.15)";

const initialProducts = [
  {
    id: 1,
    name: "Asus Vivo V14",
    category: "Laptop & Komputer",
    price: 8500000,
    stock: 24,
    promo: true,
    image: "💻",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    category: "Smartphone",
    price: 12000000,
    stock: 15,
    promo: false,
    image: "📱",
  },
  {
    id: 3,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 4,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 5,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 6,
    name: "Samsung Galaxy S21",
    category: "Smartphone",
    price: 12000000,
    stock: 15,
    promo: false,
    image: "📱",
  },
  {
    id: 7,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 8,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 9,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
];

const ITEMS_PER_PAGE = 3;
const formatPrice = (price) =>
  "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");

const kategoriOptions = [
  "Laptop & Komputer",
  "Smartphone",
  "Tablet",
  "Monitor",
  "Aksesoris",
  "Printer",
  "Kamera",
];
const brandOptions = [
  "ASUS",
  "Samsung",
  "Apple",
  "Lenovo",
  "HP",
  "Dell",
  "Acer",
  "Xiaomi",
  "Oppo",
  "Vivo",
];
const warnaOptions = [
  "Space Gray",
  "Silver",
  "Gold",
  "Black",
  "White",
  "Blue",
  "Green",
  "Red",
  "Purple",
];

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
const focusStyle = (e) => {
  e.target.style.borderColor = NAVY;
  e.target.style.background = "#fff";
};
const blurStyle = (e) => {
  e.target.style.borderColor = NAVY_BORDER;
  e.target.style.background = "#f8f9fc";
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

const CustomSelect = ({ value, onChange, options, placeholder }) => (
  <div style={{ position: "relative" }}>
    <select
      value={value}
      onChange={onChange}
      style={{
        ...inputStyle,
        appearance: "none",
        paddingRight: "36px",
        cursor: "pointer",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    <ChevronDown
      size={14}
      color="#9ca3af"
      style={{
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    />
  </div>
);

const Overlay = ({ onClose, children }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(10,15,30,0.6)",
      backdropFilter: "blur(4px)",
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

// ===================== MODAL LIHAT =====================
function ViewProductModal({ product, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "440px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            background: NAVY,
            padding: "28px 28px 48px",
            position: "relative",
            overflow: "hidden",
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
              background: "rgba(255,255,255,0.06)",
              zIndex: 0,
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
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
              zIndex: 1,
            }}
          >
            <X size={16} />
          </button>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>
              {product.image}
            </div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 6px 0",
              }}
            >
              {product.name}
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                margin: 0,
              }}
            >
              {product.category}
            </p>
          </div>
        </div>
        <div
          style={{
            margin: "-28px 24px 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                fontWeight: 700,
                margin: "0 0 6px 0",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Harga
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: NAVY,
                margin: 0,
              }}
            >
              {formatPrice(product.price)}
            </p>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                fontWeight: 700,
                margin: "0 0 6px 0",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Stok
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#059669",
                margin: 0,
              }}
            >
              {product.stock} Unit
            </p>
          </div>
        </div>
        <div style={{ padding: "24px 28px 28px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            {[
              {
                label: "ID Produk",
                value: `#PRD-${String(product.id).padStart(4, "0")}`,
              },
              { label: "Kategori", value: product.category },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "#f8f9fc",
                  borderRadius: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#1e2433",
                    fontWeight: 700,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: product.promo ? "#f0fdf4" : "#fff5f5",
                borderRadius: "10px",
                border: `1.5px solid ${product.promo ? "#bbf7d0" : "#fecaca"}`,
              }}
            >
              <span
                style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}
              >
                Status Promo
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  background: product.promo ? "#dcfce7" : "#fee2e2",
                  color: product.promo ? "#16a34a" : "#dc2626",
                }}
              >
                {product.promo ? "✓ Aktif" : "✗ Tidak"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              marginTop: "20px",
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
function AddProductModal({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
    warna: "",
    spesifikasi: "",
  });
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "product-main.jpg", progress: 100, size: "1.2 MB" },
    { name: "product-side.jpg", progress: 65, size: "0.9 MB" },
  ]);

  const steps = [
    { id: 1, label: "Info", icon: <Info size={13} /> },
    { id: 2, label: "Media", icon: <ImageIcon size={13} /> },
    { id: 3, label: "Harga", icon: <DollarSign size={13} /> },
  ];

  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          width: "580px",
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
            padding: "28px 32px ",
            position: "relative",
          }}
        >
          {/* Dekorasi */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              right: "60px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              zIndex: 0,
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
                  flexShrink: 0,
                }}
              >
                <Package size={20} color="#fff" />
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
                  Tambah Produk Baru
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
                          ? "2px solid rgba(255,255,255,0.6)"
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
          {/* STEP 1 */}
          {step === 1 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Field
                label="Nama Produk"
                hint="Gunakan nama yang jelas dan deskriptif"
              >
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: iPhone 15 Pro Max 256GB Natural Titanium"
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </Field>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <Field label="Kategori">
                  <CustomSelect
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    options={kategoriOptions}
                    placeholder="Pilih kategori..."
                  />
                </Field>
                <Field label="Brand">
                  <CustomSelect
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    options={brandOptions}
                    placeholder="Pilih brand..."
                  />
                </Field>
              </div>
              <Field
                label="Deskripsi Produk"
                hint="Min. 50 karakter untuk deskripsi yang baik"
              >
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Jelaskan fitur unggulan, keunggulan, dan detail penting produk ini..."
                  style={{
                    ...inputStyle,
                    height: "110px",
                    resize: "none",
                    lineHeight: 1.6,
                  }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color:
                        form.description.length >= 50 ? "#10b981" : "#9ca3af",
                    }}
                  >
                    {form.description.length} karakter
                  </span>
                </div>
              </Field>
              <Field label="Spesifikasi Lengkap">
                <textarea
                  value={form.spesifikasi}
                  onChange={(e) =>
                    setForm({ ...form, spesifikasi: e.target.value })
                  }
                  placeholder={
                    "- Chipset: A17 Pro Bionic\n- RAM: 8GB\n- Storage: 256GB NVMe"
                  }
                  style={{
                    ...inputStyle,
                    height: "110px",
                    resize: "none",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    lineHeight: 1.7,
                  }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </Field>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
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
                  padding: "48px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  cursor: "pointer",
                  background: dragOver ? NAVY_LIGHT : "#fafaff",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "18px",
                    background: dragOver ? NAVY : NAVY_LIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Upload size={26} color={dragOver ? "#fff" : NAVY} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1e2433",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Drag & drop foto produk ke sini
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      margin: "0 0 16px 0",
                    }}
                  >
                    atau
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      background: NAVY,
                      borderRadius: "10px",
                    }}
                  >
                    <Upload size={14} color="#fff" />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      Pilih File
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                  PNG, JPG, WebP — Maks. 5MB per file • Min. 800×800px
                </p>
              </div>

              {uploadedFiles.length > 0 && (
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
                    File Terupload ({uploadedFiles.length})
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {uploadedFiles.map((file, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#f8f9fc",
                          borderRadius: "12px",
                          padding: "14px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          border: `1.5px solid ${NAVY_BORDER}`,
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "10px",
                            background:
                              file.progress === 100 ? "#d1fae5" : NAVY_LIGHT,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {file.progress === 100 ? (
                            <Check size={18} color="#059669" strokeWidth={3} />
                          ) : (
                            <ImageIcon size={18} color={NAVY} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "6px",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#1e2433",
                                margin: 0,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "200px",
                              }}
                            >
                              {file.name}
                            </p>
                            <span
                              style={{
                                fontSize: "12px",
                                color: file.progress === 100 ? "#059669" : NAVY,
                                fontWeight: 700,
                              }}
                            >
                              {file.progress === 100
                                ? "✓ Selesai"
                                : `${file.progress}%`}
                            </span>
                          </div>
                          <div
                            style={{
                              height: "5px",
                              background: "#e8eaf0",
                              borderRadius: "3px",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${file.progress}%`,
                                background:
                                  file.progress === 100 ? "#10b981" : NAVY,
                                borderRadius: "3px",
                              }}
                            />
                          </div>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#9ca3af",
                              margin: "4px 0 0 0",
                            }}
                          >
                            {file.size}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setUploadedFiles(
                              uploadedFiles.filter((_, idx) => idx !== i),
                            )
                          }
                          style={{
                            background: "#fee2e2",
                            border: "none",
                            borderRadius: "8px",
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                            color: "#ef4444",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  background: NAVY_LIGHT,
                  borderRadius: "12px",
                  padding: "16px",
                  border: `1.5px solid ${NAVY_BORDER}`,
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: NAVY,
                    margin: "0 0 8px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  💡 Tips Foto Produk
                </p>
                {[
                  "Gunakan latar belakang putih atau netral",
                  "Pastikan pencahayaan merata dan cerah",
                  "Upload minimal 3 foto dari sudut berbeda",
                ].map((tip, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: "12px",
                      color: NAVY,
                      margin: i < 2 ? "0 0 4px 0" : 0,
                    }}
                  >
                    • {tip}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
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
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  💰 Informasi Harga
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <Field label="Harga Jual (Rp)">
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#6b7280",
                        }}
                      >
                        Rp
                      </span>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                        placeholder="0"
                        style={{ ...inputStyle, paddingLeft: "38px" }}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                    </div>
                    {form.price && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: NAVY,
                          fontWeight: 600,
                          margin: "5px 0 0 0",
                        }}
                      >
                        {formatPrice(Number(form.price))}
                      </p>
                    )}
                  </Field>
                  <Field label="Jumlah Stok">
                    <div style={{ position: "relative" }}>
                      <input
                        type="number"
                        value={form.stock}
                        onChange={(e) =>
                          setForm({ ...form, stock: e.target.value })
                        }
                        placeholder="0"
                        style={{ ...inputStyle, paddingRight: "50px" }}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#9ca3af",
                        }}
                      >
                        Unit
                      </span>
                    </div>
                    {form.stock && (
                      <p
                        style={{
                          fontSize: "12px",
                          color:
                            Number(form.stock) < 10 ? "#ef4444" : "#10b981",
                          fontWeight: 600,
                          margin: "5px 0 0 0",
                        }}
                      >
                        {Number(form.stock) < 10
                          ? "⚠ Stok hampir habis"
                          : "✓ Stok aman"}
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              <div
                style={{
                  background: "#f8f9fc",
                  borderRadius: "16px",
                  padding: "20px",
                  border: `1.5px solid ${NAVY_BORDER}`,
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#6b7280",
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  🎨 Varian Produk
                </p>
                <Field label="Pilihan Warna">
                  <CustomSelect
                    value={form.warna}
                    onChange={(e) =>
                      setForm({ ...form, warna: e.target.value })
                    }
                    options={warnaOptions}
                    placeholder="Pilih warna..."
                  />
                </Field>
                {form.warna && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "12px",
                      padding: "10px 14px",
                      background: "#fff",
                      borderRadius: "10px",
                      border: `1.5px solid ${NAVY_BORDER}`,
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background:
                          {
                            "Space Gray": "#6b7280",
                            Silver: "#d1d5db",
                            Gold: "#f59e0b",
                            Black: "#111827",
                            White: "#f9fafb",
                            Blue: "#3b82f6",
                            Green: "#10b981",
                            Red: "#ef4444",
                            Purple: "#8b5cf6",
                          }[form.warna] || "#e5e7eb",
                        border: "2px solid #e8eaf0",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      {form.warna}
                    </span>
                    <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                      dipilih
                    </span>
                  </div>
                )}
              </div>

              {(form.name || form.price || form.stock) && (
                <div
                  style={{
                    background: "#f0fdf4",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1.5px solid #bbf7d0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#059669",
                      margin: "0 0 14px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                    }}
                  >
                    ✓ Ringkasan Produk
                  </p>
                  {[
                    { label: "Nama", value: form.name || "-" },
                    { label: "Kategori", value: form.category || "-" },
                    {
                      label: "Harga",
                      value: form.price ? formatPrice(Number(form.price)) : "-",
                    },
                    {
                      label: "Stok",
                      value: form.stock ? `${form.stock} Unit` : "-",
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
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
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
          {step > 1 && (
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
          )}
          {step === 1 && (
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
              ✓ Simpan Produk
            </button>
          )}
        </div>
      </div>
    </Overlay>
  );
}

// ===================== MAIN =====================
export default function Produk() {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    promo: false,
  });

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginated = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const promoCount = products.filter((p) => p.promo).length;
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  const openEdit = (p) => {
    setEditProduct(p);
    setEditForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
      promo: p.promo,
    });
  };
  const handleSaveEdit = () => {
    if (editProduct)
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? {
                ...p,
                ...editForm,
                price: Number(editForm.price),
                stock: Number(editForm.stock),
              }
            : p,
        ),
      );
    setEditProduct(null);
  };
  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };
  const handleAddSave = (data) => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: data.name || "Produk Baru",
        category: data.category || "-",
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
        promo: false,
        image: "📦",
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
                <Package size={20} color="#fff" />
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
                Daftar Produk
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
              Kelola inventaris dan katalog produk Anda di sini.
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
            <Plus size={16} /> Tambah Produk
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
              label: "Total Produk",
              value: products.length,
              icon: <Package size={20} color="#fff" />,
              border: NAVY_BORDER,
              bg: "#fff",
              color: NAVY,
              iconBg: NAVY,
            },
            {
              label: "Produk Promo",
              value: promoCount,
              icon: <Tag size={20} color="#fff" />,
              border: NAVY_BORDER,
              bg: "#fff",
              color: NAVY,
              iconBg: NAVY,
            },
            {
              label: "Stok Menipis",
              value: lowStockCount,
              icon: <AlertTriangle size={20} color="#fff" />,
              border: NAVY_BORDER,
              bg: "#fff",
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
            <Package size={16} color="#fff" />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Katalog Produk
            </span>
          </div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {products.length} total produk
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
              {["FOTO", "NAMA PRODUK", "HARGA", "STOK", "PROMO", "AKSI"].map(
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
            {paginated.map((product, i) => (
              <tr
                key={product.id}
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
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: NAVY_LIGHT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      border: `1.5px solid ${NAVY_BORDER}`,
                    }}
                  >
                    {product.image}
                  </div>
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: NAVY,
                      margin: "0 0 3px 0",
                    }}
                  >
                    {product.name}
                  </p>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#9ca3af",
                      background: "#f1f3f8",
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {product.category}
                  </span>
                </td>
                <td
                  style={{
                    padding: "16px 18px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: NAVY,
                  }}
                >
                  {formatPrice(product.price)}
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: product.stock < 10 ? "#ef4444" : "#374151",
                    }}
                  >
                    {product.stock}
                  </span>
                  {product.stock < 10 && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#ef4444",
                        display: "block",
                        fontWeight: 600,
                      }}
                    >
                      Stok menipis
                    </span>
                  )}
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      background: product.promo ? "#dcfce7" : "#fee2e2",
                      color: product.promo ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {product.promo ? "Ya" : "Tidak"}
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
                        bg: NAVY_LIGHT,
                        color: NAVY,
                        action: () => setViewProduct(product),
                      },
                      {
                        icon: <Pencil size={14} />,
                        bg: "#fefce8",
                        color: "#ca8a04",
                        action: () => openEdit(product),
                      },
                      {
                        icon: <Trash2 size={14} />,
                        bg: "#fef2f2",
                        color: "#ef4444",
                        action: () => setDeleteId(product.id),
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
            ))}
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
            {Math.min(currentPage * ITEMS_PER_PAGE, products.length)} dari{" "}
            {products.length} produk
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
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
            ))}
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

      {viewProduct && (
        <ViewProductModal
          product={viewProduct}
          onClose={() => setViewProduct(null)}
        />
      )}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* MODAL EDIT */}
      {editProduct && (
        <Overlay onClose={() => setEditProduct(null)}>
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "460px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
              overflow: "hidden",
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
                  Edit Produk
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.7)",
                    margin: 0,
                  }}
                >
                  {editProduct.name}
                </p>
              </div>
              <button
                onClick={() => setEditProduct(null)}
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
                { label: "Nama Produk", key: "name" },
                { label: "Kategori", key: "category" },
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
                    onFocus={focusStyle}
                    onBlur={blurStyle}
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
                  { label: "Harga (Rp)", key: "price" },
                  { label: "Stok", key: "stock" },
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
                      type="number"
                      value={editForm[key]}
                      onChange={(e) =>
                        setEditForm({ ...editForm, [key]: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </div>
                ))}
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "14px 16px",
                  background: "#fafbff",
                  borderRadius: "12px",
                  border: `1.5px solid ${NAVY_BORDER}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={editForm.promo}
                  onChange={(e) =>
                    setEditForm({ ...editForm, promo: e.target.checked })
                  }
                  style={{ accentColor: NAVY, width: "16px", height: "16px" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#374151",
                      margin: 0,
                    }}
                  >
                    Tandai sebagai Promo
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    Produk akan tampil dengan label promo
                  </p>
                </div>
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setEditProduct(null)}
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
                Hapus Produk?
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Tindakan ini tidak dapat dibatalkan.
                <br />
                Produk akan dihapus permanen.
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
