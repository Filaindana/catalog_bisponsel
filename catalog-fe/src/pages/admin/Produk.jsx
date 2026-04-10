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

const warnaMap = {
  "Space Gray": "#6b7280",
  Silver: "#d1d5db",
  Gold: "#f59e0b",
  Black: "#111827",
  White: "#f9fafb",
  Blue: "#3b82f6",
  Green: "#10b981",
  Red: "#ef4444",
  Purple: "#8b5cf6",
};

const inputCls =
  "w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)] text-[14px] outline-none text-[#1e2433] bg-[#f8f9fc] transition-all font-[inherit] focus:border-[#072B50] focus:bg-white";

const Field = ({ label, children, hint }) => (
  <div>
    <label
      className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.8px]"
      style={{ marginBottom: "10px" }}
    >
      {label}
    </label>
    {children}
    {hint && (
      <p
        className="text-[11px] text-gray-400 mb-0"
        style={{ marginTop: "8px" }}
      >
        {hint}
      </p>
    )}
  </div>
);

// ✅ DIPINDAHKAN KE LUAR — tidak lagi di dalam AddProductModal
const SectionTitle = ({ icon, title }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "16px",
    }}
  >
    <div
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "7px",
        background: "rgba(7,43,80,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontSize: "11px",
        fontWeight: 800,
        color: "#072B50",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {title}
    </span>
    <div
      style={{
        flex: 1,
        height: "1.5px",
        background: "rgba(7,43,80,0.07)",
        marginLeft: "4px",
      }}
    />
  </div>
);

const CustomSelect = ({ value, onChange, options, placeholder }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className={`${inputCls} appearance-none pr-9 cursor-pointer`}
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
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
    />
  </div>
);

const Overlay = ({ onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-[rgba(10,15,30,0.6)] backdrop-blur-[4px] z-[1000] flex items-center justify-center p-4"
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

// ===================== MODAL LIHAT =====================
function ViewProductModal({ product, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div className="bg-white rounded-[20px] w-[440px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
        <div className="bg-[#072B50] px-7 pt-7 pb-12 relative overflow-hidden">
          <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-full bg-white/[0.06] z-0" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/15 border-none rounded-lg w-8 h-8 cursor-pointer text-white flex items-center justify-center z-10"
          >
            <X size={16} />
          </button>
          <div className="relative z-10">
            <div className="text-5xl mb-3">{product.image}</div>
            <h2 className="text-[20px] font-extrabold text-white mb-1.5">
              {product.name}
            </h2>
            <p className="text-[13px] text-white/70 m-0">{product.category}</p>
          </div>
        </div>

        <div className="-mt-7 mx-6 grid grid-cols-2 gap-3 relative z-10">
          {[
            {
              label: "Harga",
              value: formatPrice(product.price),
              color: "#072B50",
            },
            { label: "Stok", value: `${product.stock} Unit`, color: "#059669" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.12)] text-center"
            >
              <p className="text-[11px] text-gray-400 font-bold mb-1.5 uppercase tracking-[0.8px]">
                {label}
              </p>
              <p className="text-[15px] font-extrabold m-0" style={{ color }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="px-7 pt-6 pb-7">
          <div className="flex flex-col gap-2.5 mt-2">
            {[
              {
                label: "ID Produk",
                value: `#PRD-${String(product.id).padStart(4, "0")}`,
              },
              { label: "Kategori", value: product.category },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center px-4 py-3 bg-[#f8f9fc] rounded-[10px]"
              >
                <span className="text-[13px] text-gray-500 font-medium">
                  {label}
                </span>
                <span className="text-[13px] text-[#1e2433] font-bold">
                  {value}
                </span>
              </div>
            ))}
            <div
              className={`flex justify-between items-center px-4 py-3 rounded-[10px] border-[1.5px] ${product.promo ? "bg-[#f0fdf4] border-[#bbf7d0]" : "bg-[#fff5f5] border-[#fecaca]"}`}
            >
              <span className="text-[13px] text-gray-500 font-medium">
                Status Promo
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${product.promo ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#fee2e2] text-[#dc2626]"}`}
              >
                {product.promo ? "✓ Aktif" : "✗ Tidak"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full mt-5 py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
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

  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          width: "620px",
          background: "#fff",
          borderRadius: "20px",
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
            padding: "24px 32px",
            borderBottom: "1.5px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "rgba(7,43,80,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Package size={20} color="#072B50" />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: "0 0 3px",
                }}
              >
                Tambah Produk Baru
              </h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                Isi semua informasi produk di bawah ini
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: "1.5px solid #e8edf5",
              background: "#f8faff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* BODY */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
          {/* Informasi Dasar */}
          <SectionTitle
            icon={<Info size={13} color="#072B50" />}
            title="Informasi Dasar"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginBottom: "28px",
            }}
          >
            <Field
              label="Nama Produk"
              hint="Gunakan nama yang jelas dan deskriptif"
            >
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: iPhone 15 Pro Max 256GB Natural Titanium"
                className={inputCls}
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
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  options={brandOptions}
                  placeholder="Pilih brand..."
                />
              </Field>
            </div>
          </div>

          {/* Deskripsi & Spesifikasi */}
          <SectionTitle
            icon={<Tag size={13} color="#072B50" />}
            title="Deskripsi & Spesifikasi"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginBottom: "28px",
            }}
          >
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
                className={`${inputCls} h-[100px] resize-none leading-relaxed`}
              />
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
                className={`${inputCls} h-[90px] resize-none font-mono text-xs leading-[1.7]`}
              />
            </Field>
          </div>

          {/* Foto Produk */}
          <SectionTitle
            icon={<ImageIcon size={13} color="#072B50" />}
            title="Foto Produk"
          />
          <div style={{ marginBottom: "28px" }}>
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
                border: `2px dashed ${dragOver ? "#072B50" : "rgba(7,43,80,0.2)"}`,
                borderRadius: "14px",
                padding: "28px 24px",
                background: dragOver ? "rgba(7,43,80,0.05)" : "#fafaff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "all 0.2s",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  background: dragOver ? "#072B50" : "rgba(7,43,80,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Upload size={22} color={dragOver ? "#fff" : "#072B50"} />
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1e2433",
                    margin: "0 0 4px",
                  }}
                >
                  Drag & drop foto produk di sini
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    margin: "0 0 12px",
                  }}
                >
                  atau
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 18px",
                    background: "#072B50",
                    borderRadius: "9px",
                  }}
                >
                  <Upload size={13} color="#fff" />
                  <span
                    style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}
                  >
                    Pilih File
                  </span>
                </div>
              </div>
              <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                PNG, JPG, WebP — Maks. 5MB per file · Min. 800×800px
              </p>
            </div>

            {uploadedFiles.length > 0 && (
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
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      border: "1.5px solid rgba(7,43,80,0.12)",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background:
                          file.progress === 100
                            ? "#d1fae5"
                            : "rgba(7,43,80,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {file.progress === 100 ? (
                        <Check size={16} color="#059669" strokeWidth={3} />
                      ) : (
                        <ImageIcon size={16} color="#072B50" />
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
                            fontWeight: 700,
                            color:
                              file.progress === 100 ? "#059669" : "#072B50",
                          }}
                        >
                          {file.progress === 100
                            ? "✓ Selesai"
                            : `${file.progress}%`}
                        </span>
                      </div>
                      <div
                        style={{
                          height: "4px",
                          background: "#e8eaf0",
                          borderRadius: "2px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "2px",
                            width: `${file.progress}%`,
                            background:
                              file.progress === 100 ? "#10b981" : "#072B50",
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setUploadedFiles(
                          uploadedFiles.filter((_, idx) => idx !== i),
                        )
                      }
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "7px",
                        border: "none",
                        background: "#fee2e2",
                        cursor: "pointer",
                        color: "#dc2626",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Harga & Varian */}
          <SectionTitle
            icon={<DollarSign size={13} color="#072B50" />}
            title="Harga & Varian"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
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
                      color: "#9ca3af",
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
                    className={`${inputCls} pl-[38px]`}
                  />
                </div>
                {form.price && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#072B50",
                      fontWeight: 600,
                      marginTop: "5px",
                      marginBottom: 0,
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
                    className={`${inputCls} pr-[50px]`}
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
                      fontWeight: 600,
                      marginTop: "5px",
                      marginBottom: 0,
                      color: Number(form.stock) < 10 ? "#ef4444" : "#10b981",
                    }}
                  >
                    {Number(form.stock) < 10
                      ? "⚠ Stok hampir habis"
                      : "✓ Stok aman"}
                  </p>
                )}
              </Field>
            </div>
            <Field label="Pilihan Warna">
              <CustomSelect
                value={form.warna}
                onChange={(e) => setForm({ ...form, warna: e.target.value })}
                options={warnaOptions}
                placeholder="Pilih warna..."
              />
            </Field>
            {form.warna && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#f8f9fc",
                  borderRadius: "10px",
                  border: "1.5px solid rgba(7,43,80,0.12)",
                  padding: "12px 16px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: warnaMap[form.warna] || "#e5e7eb",
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
        </div>

        {/* FOOTER */}
        <div
          style={{
            padding: "20px 32px",
            borderTop: "1.5px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            background: "#fafbff",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1.5px solid #e2e8f0",
              background: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              color: "#64748b",
              fontFamily: "inherit",
            }}
          >
            Batal
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            style={{
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              background: "#072B50",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 700,
              boxShadow: "0 4px 14px rgba(7,43,80,0.3)",
              fontFamily: "inherit",
            }}
          >
            Simpan Produk
          </button>
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
      <div style={{ marginBottom: "48px" }}>
        <div
          className="flex justify-between items-start"
          style={{ marginBottom: "32px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-10 h-10 rounded-xl bg-[#072B50] flex items-center justify-center shadow-[0_4px_12px_rgba(7,43,80,0.3)]">
                <Package size={20} color="#fff" />
              </div>
              <h1 className="text-[26px] font-extrabold text-[#072B50] m-0 tracking-[-0.5px]">
                Daftar Produk
              </h1>
            </div>
            <p className="text-[14px] text-gray-500 m-0 pl-[52px]">
              Kelola inventaris dan katalog produk Anda di sini.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#072B50",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(7,43,80,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0e4a8a";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#072B50";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Plus size={16} /> Tambah Produk
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              label: "Total Produk",
              value: products.length,
              icon: <Package size={20} color="#fff" />,
            },
            {
              label: "Produk Promo",
              value: promoCount,
              icon: <Tag size={20} color="#fff" />,
            },
            {
              label: "Stok Menipis",
              value: lowStockCount,
              icon: <AlertTriangle size={20} color="#fff" />,
            },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border-[1.5px] border-[rgba(7,43,80,0.15)] flex items-center gap-5"
              style={{ padding: "28px" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#072B50] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
                {icon}
              </div>
              <div>
                <p className="text-[28px] font-extrabold text-[#072B50] m-0 leading-none">
                  {value}
                </p>
                <p className="text-[13px] font-semibold text-[#072B50]/80 mt-1 mb-0">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[20px] border-[1.5px] border-[rgba(7,43,80,0.15)] overflow-hidden shadow-[0_4px_24px_rgba(7,43,80,0.08)]">
        <div
          className="bg-[#072B50] flex items-center justify-between"
          style={{ padding: "20px 28px" }}
        >
          <div className="flex items-center gap-2">
            <Package size={16} color="#fff" />
            <span className="text-[13px] font-bold text-white uppercase tracking-[0.8px]">
              Katalog Produk
            </span>
          </div>
          <span className="text-xs font-semibold text-white/70">
            {products.length} total produk
          </span>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#fafbff] border-b-[1.5px] border-[rgba(7,43,80,0.15)]">
              {["FOTO", "NAMA PRODUK", "HARGA", "STOK", "PROMO", "AKSI"].map(
                (h) => (
                  <th
                    key={h}
                    className={`text-[11px] font-extrabold text-gray-400 tracking-[0.8px] ${h === "AKSI" ? "text-right" : "text-left"}`}
                    style={{ padding: "18px 24px" }}
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
                className={`transition-colors hover:bg-[rgba(7,43,80,0.07)] ${i < paginated.length - 1 ? "border-b border-[#f8f9fc]" : ""}`}
              >
                <td style={{ padding: "20px 24px" }}>
                  <div className="w-12 h-12 rounded-xl bg-[rgba(7,43,80,0.07)] flex items-center justify-center text-2xl border-[1.5px] border-[rgba(7,43,80,0.15)]">
                    {product.image}
                  </div>
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <p className="text-[14px] font-bold text-[#072B50] mb-0.5">
                    {product.name}
                  </p>
                  <span className="text-[11px] font-bold text-gray-400 bg-[#f1f3f8] px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </td>
                <td
                  style={{ padding: "20px 24px" }}
                  className="text-[14px] font-bold text-[#072B50]"
                >
                  {formatPrice(product.price)}
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <span
                    className={`text-[14px] font-bold ${product.stock < 10 ? "text-red-500" : "text-gray-700"}`}
                  >
                    {product.stock}
                  </span>
                  {product.stock < 10 && (
                    <span className="text-[10px] text-red-500 block font-semibold">
                      Stok menipis
                    </span>
                  )}
                </td>
                <td style={{ padding: "20px 24px" }}>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${product.promo ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#fee2e2] text-[#dc2626]"}`}
                  >
                    {product.promo ? "Ya" : "Tidak"}
                  </span>
                </td>
                <td style={{ padding: "20px 24px", textAlign: "right" }}>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setViewProduct(product)}
                      className="w-[34px] h-[34px] rounded-[10px] border-none bg-[rgba(7,43,80,0.07)] text-[#072B50] cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => openEdit(product)}
                      className="w-[34px] h-[34px] rounded-[10px] border-none bg-yellow-50 text-yellow-600 cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="w-[34px] h-[34px] rounded-[10px] border-none bg-red-50 text-red-500 cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div
          className="flex justify-between items-center border-t-[1.5px] border-[rgba(7,43,80,0.15)] bg-[#fafbff]"
          style={{ padding: "18px 28px" }}
        >
          <p className="text-[13px] text-gray-400 m-0">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, products.length)} dari{" "}
            {products.length} produk
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-[34px] h-[34px] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] text-gray-700 disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-[34px] h-[34px] rounded-[10px] cursor-pointer text-[13px] font-bold border transition-all ${currentPage === page ? "bg-[#072B50] text-white border-transparent shadow-[0_4px_10px_rgba(7,43,80,0.25)]" : "bg-white text-gray-700 border-[rgba(7,43,80,0.15)]"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-[34px] h-[34px] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] text-gray-700 disabled:opacity-40"
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
          <div className="bg-white rounded-[20px] w-[460px] shadow-[0_32px_80px_rgba(0,0,0,0.25)] overflow-hidden">
            <div
              style={{
                background: "#072B50",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Pencil size={18} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
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
                    color: "rgba(255,255,255,0.65)",
                    margin: "3px 0 0",
                  }}
                >
                  {editProduct.name}
                </p>
              </div>
              <button
                onClick={() => setEditProduct(null)}
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
            <div
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {[
                { label: "Nama Produk", key: "name" },
                { label: "Kategori", key: "category" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-[11px] font-extrabold text-gray-400 mb-1.5 uppercase tracking-[0.8px]">
                    {label}
                  </label>
                  <input
                    value={editForm[key]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [key]: e.target.value })
                    }
                    className={inputCls}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Harga (Rp)", key: "price" },
                  { label: "Stok", key: "stock" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-extrabold text-gray-400 mb-1.5 uppercase tracking-[0.8px]">
                      {label}
                    </label>
                    <input
                      type="number"
                      value={editForm[key]}
                      onChange={(e) =>
                        setEditForm({ ...editForm, [key]: e.target.value })
                      }
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer px-4 py-3.5 bg-[#fafbff] rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)]">
                <input
                  type="checkbox"
                  checked={editForm.promo}
                  onChange={(e) =>
                    setEditForm({ ...editForm, promo: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#072B50]"
                />
                <div>
                  <p className="text-[13px] font-bold text-gray-700 m-0">
                    Tandai sebagai Promo
                  </p>
                  <p className="text-xs text-gray-400 m-0">
                    Produk akan tampil dengan label promo
                  </p>
                </div>
              </label>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button
                  onClick={() => setEditProduct(null)}
                  style={{
                    flex: 1,
                    padding: "13px 20px",
                    borderRadius: "12px",
                    border: "1.5px solid rgba(7,43,80,0.15)",
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
                    padding: "13px 20px",
                    borderRadius: "12px",
                    border: "none",
                    background: "#072B50",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                    boxShadow: "0 4px 14px rgba(7,43,80,0.3)",
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
          <div className="bg-white rounded-[20px] w-[380px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
            <div className="bg-gradient-to-br from-red-500 to-red-600 py-8 px-7 text-center">
              <div className="w-16 h-16 rounded-[20px] bg-white/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={30} color="#fff" />
              </div>
              <h3 className="text-[20px] font-extrabold text-white mb-2">
                Hapus Produk?
              </h3>
              <p className="text-[13px] text-white/80 m-0 leading-relaxed">
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
                  padding: "13px 20px",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(7,43,80,0.15)",
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
                  padding: "13px 20px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(239,68,68,0.35)",
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
