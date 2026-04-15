import { useEffect, useState, useRef } from "react";
import {
  getProduk,
  deleteProduk,
  createProduk,
} from "../../utils/services/produkService";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  Info,
  DollarSign,
  Package,
  AlertTriangle,
  Check,
  ChevronDown,
  Tag,
  Sparkles,
  Layers,
  Camera,
} from "lucide-react";

if (
  typeof document !== "undefined" &&
  !document.querySelector("[data-inter-produk]")
) {
  const s = document.createElement("style");
  s.setAttribute("data-inter-produk", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    .produk-admin, .produk-admin * { font-family:'Inter',sans-serif !important; box-sizing:border-box; }
    @keyframes scaleIn { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
    .produk-admin .modal-wrap  { animation: scaleIn .22s cubic-bezier(.34,1.3,.64,1) both; }
    .produk-admin .stat-card   { transition: transform .2s, box-shadow .2s; }
    .produk-admin .stat-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(7,43,80,.13); }
    .produk-admin .row-item    { transition: background .13s; }
    .produk-admin .row-item:hover { background: rgba(7,43,80,.025); }
    .produk-admin .action-btn  { transition: transform .15s, background .15s, opacity .15s; }
    .produk-admin .action-btn:hover { transform: scale(1.12); opacity:.85; }
    .produk-admin .input-field:focus { border-color:#072B50 !important; background:#fff !important; box-shadow:0 0 0 3px rgba(7,43,80,.08) !important; }
  `;
  document.head.appendChild(s);
}

const ITEMS_PER_PAGE = 5;
const NAVY = "#072B50";
const formatPrice = (p) => "Rp " + p.toLocaleString("id-ID").replace(/,/g, ".");

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
  "input-field w-full px-3.5 py-3 rounded-xl border border-gray-200 text-[13.5px] outline-none text-gray-800 bg-gray-50 transition-all";
const labelCls =
  "block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider";
const hintCls = "text-[11px] text-gray-400 mt-1.5 mb-0";

const Field = ({ label, children }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
  </div>
);

/* ══════════════════════════
   CUSTOM SELECT — dipercantik
══════════════════════════ */
const CustomSelect = ({
  value,
  onChange,
  options = [],
  placeholder = "Pilih...",
}) => {
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const containerRef = useRef(null);

  const selected = options.find((o) => o === value);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleOpen = () => {
    setOpen((prev) => {
      if (prev === true) {
        setHoveredIdx(-1); // reset saat ditutup
      }
      return !prev;
    });
  };

  const select = (opt) => {
    onChange({ target: { value: opt } });
    setOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={toggleOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 14px",
          borderRadius: "12px",
          border: open ? `1.5px solid ${NAVY}` : "1.5px solid #e2e8f0",
          background: "#fff",
          boxShadow: open
            ? `0 0 0 3px rgba(7,43,80,0.07), 0 2px 8px rgba(7,43,80,0.08)`
            : "0 1px 2px rgba(0,0,0,0.04)",
          cursor: "pointer",
          outline: "none",
          textAlign: "left",
          transition: "border-color 0.18s, box-shadow 0.18s",
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: "13px",
            fontWeight: 600,
            color: selected ? NAVY : "#b0bec5",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selected || placeholder}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          style={{
            color: open ? NAVY : "#b0bec5",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s cubic-bezier(.4,0,.2,1), color 0.18s",
          }}
        />
      </button>

      {/* Dropdown panel */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "#fff",
          border: `1.5px solid rgba(7,43,80,0.11)`,
          borderRadius: "14px",
          boxShadow:
            "0 16px 48px rgba(7,43,80,0.16), 0 2px 8px rgba(0,0,0,0.06)",
          padding: "6px",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(-6px) scale(0.98)",
          pointerEvents: open ? "all" : "none",
          transition:
            "opacity 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1)",
          maxHeight: "220px",
          overflowY: "auto",
        }}
      >
        {options.map((opt, idx) => {
          const isSelected = opt === value;
          const isHovered = hoveredIdx === idx;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => select(opt)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(-1)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "9px",
                border: "none",
                cursor: "pointer",
                outline: "none",
                textAlign: "left",
                background: isSelected
                  ? "rgba(7,43,80,0.07)"
                  : isHovered
                    ? "rgba(7,43,80,0.04)"
                    : "transparent",
                transition: "background 0.12s",
              }}
            >
              {/* Active dot */}
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: isSelected ? NAVY : "transparent",
                  transition: "background 0.15s",
                }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: isSelected ? NAVY : "#4a5568",
                }}
              >
                {opt}
              </span>
              {isSelected && (
                <Check
                  size={12}
                  strokeWidth={3}
                  style={{ color: NAVY, flexShrink: 0 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Overlay = ({ onClose, children }) => (
  <div
    className="fixed inset-0 flex items-center justify-center p-4 z-1000"
    style={{ background: "rgba(5,12,30,0.6)", backdropFilter: "blur(10px)" }}
    onClick={onClose}
  >
    <div className="modal-wrap" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

function ProductChip({ emoji, color = "#e6eef6" }) {
  return (
    <div
      className="w-21.5 h-13 rounded-xl relative flex items-center justify-center overflow-hidden shrink-0"
      style={{ background: color, boxShadow: "0 2px 8px rgba(7,43,80,0.1)" }}
    >
      <div className="absolute w-8 h-8 rounded-full -top-2 -right-2 bg-white/30" />
      <span className="relative z-10 text-2xl">{emoji}</span>
    </div>
  );
}

const promoConfig = {
  Aktif: { bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
  Tidak: { bg: "#fee2e2", color: "#dc2626", dot: "#ef4444" },
};

function PromoBadge({ aktif }) {
  const status = aktif ? "Aktif" : "Tidak";
  const cfg = promoConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: cfg.dot }}
      />
      {status}
    </span>
  );
}

/* ══════════════════════════
   VIEW MODAL
══════════════════════════ */
function ViewProductModal({ product, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div className="bg-[#FDFDFD] rounded-2xl w-110 overflow-hidden shadow-2xl">
        <div className="relative px-7 py-7 bg-[#072B50]">
          <div className="absolute rounded-full pointer-events-none -top-8 -right-8 w-36 h-36 bg-white/5" />
          <div className="absolute w-16 h-16 rounded-full pointer-events-none -bottom-4 left-4 bg-white/5" />
          <h2 className="text-[18px] font-extrabold text-white m-0 mb-1">
            {product.name}
          </h2>
          <p className="text-[12.5px] text-white/60 m-0">{product.category}</p>
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center w-8 h-8 text-white transition-colors border-none rounded-lg cursor-pointer top-4 right-4 bg-white/10 hover:bg-white/20"
          >
            <X size={14} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4 bg-[#FDFDFD]">
          <div>
            <PromoBadge aktif={product.promo} />
          </div>
          <div className="rounded-xl bg-[#f0f4f9] border border-[#dce6f0] px-4 py-3.5">
            <p className="text-[10px] font-bold text-[#072B50] uppercase tracking-wider mb-1.5">
              Deskripsi
            </p>
            <p className="text-[13px] text-[#072B50] leading-relaxed m-0">
              {product.name} adalah produk dari kategori {product.category}{" "}
              dengan stok tersedia {product.stock} unit.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Harga", value: formatPrice(product.price) },
              { label: "Stok", value: `${product.stock} Unit` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-[#dce6f0] bg-[#f0f4f9] px-4 py-3.5"
              >
                <p className="text-[10px] font-bold text-[#072B50] uppercase tracking-wider mb-1.5">
                  {label}
                </p>
                <p className="text-[13.5px] font-bold text-[#072B50] m-0">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[#dce6f0] bg-[#f0f4f9] px-4 py-3.5">
            <p className="text-[10px] font-bold text-[#072B50] uppercase tracking-wider mb-1.5">
              ID Produk
            </p>
            <p className="text-[13.5px] font-bold text-[#072B50] m-0">
              #PRD-{String(product.id).padStart(4, "0")}
            </p>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════
   ADD MODAL
══════════════════════════ */
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
      <div className="w-[540px] bg-white rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(7,43,80,0.08)" }}
            >
              <Sparkles size={18} style={{ color: NAVY }} />
            </div>
            <div>
              <h2
                className="text-[16px] font-extrabold m-0 mb-0.5"
                style={{ color: NAVY }}
              >
                Tambah Produk Baru
              </h2>
              <p className="text-[11.5px] text-gray-400 m-0">
                Isi semua informasi produk di bawah ini
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 py-6 overflow-y-auto px-7 flex flex-col gap-6">
          {/* SECTION 1 */}
          <div>
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-blue-50 border border-blue-100 mb-4">
              <div
                className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0"
                style={{ background: NAVY }}
              >
                <Info size={13} color="#fff" />
              </div>
              <div>
                <p
                  className="text-[13px] font-bold m-0 mb-0.5"
                  style={{ color: NAVY }}
                >
                  Informasi Dasar Produk
                </p>
                <p className="text-[12px] text-blue-500 m-0">
                  Isi nama, kategori, brand, dan deskripsi produk Anda.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Field label="Nama Produk">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: iPhone 15 Pro Max 256GB"
                  className={inputCls}
                />
                <p className={hintCls}>
                  Gunakan nama yang jelas dan deskriptif
                </p>
              </Field>
              <div className="grid grid-cols-2 gap-3">
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
              <Field label="Deskripsi Produk">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Jelaskan fitur unggulan produk..."
                  className={`${inputCls} h-24 resize-none`}
                />
                <p className={hintCls}>
                  Min. 50 karakter untuk deskripsi yang baik
                </p>
              </Field>
              <Field label="Spesifikasi">
                <textarea
                  value={form.spesifikasi}
                  onChange={(e) =>
                    setForm({ ...form, spesifikasi: e.target.value })
                  }
                  placeholder={
                    "- Chipset: A17 Pro\n- RAM: 8GB\n- Storage: 256GB"
                  }
                  className={`${inputCls} h-20 resize-none font-mono text-xs`}
                />
              </Field>
            </div>
          </div>

          {/* SECTION 2 */}
          <div>
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-purple-50 border border-purple-100 mb-4">
              <div className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0 bg-violet-600">
                <Camera size={13} color="#fff" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-violet-800 m-0 mb-0.5">
                  Foto & Media Produk
                </p>
                <p className="text-[12px] text-violet-500 m-0">
                  Upload minimal 1 foto berkualitas tinggi.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
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
                className="flex flex-col items-center gap-3 p-8 transition-all duration-200 border-2 border-dashed cursor-pointer rounded-xl"
                style={{
                  borderColor: dragOver ? NAVY : "#e2e8f0",
                  background: dragOver ? "rgba(7,43,80,0.04)" : "#fafaff",
                }}
              >
                <div
                  className="flex items-center justify-center transition-all duration-200 w-14 h-14 rounded-2xl"
                  style={{ background: dragOver ? NAVY : "rgba(7,43,80,0.07)" }}
                >
                  <Upload size={24} color={dragOver ? "#fff" : NAVY} />
                </div>
                <div className="text-center">
                  <p className="text-[14px] font-bold text-gray-800 m-0 mb-1">
                    Drag & drop foto di sini
                  </p>
                  <p className="text-[12.5px] text-gray-400 m-0 mb-4">
                    atau klik tombol di bawah
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-[13px] font-bold"
                    style={{ background: NAVY }}
                  >
                    <Upload size={13} /> Pilih File
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 m-0">
                  PNG, JPG · Maks. 5MB · Min. 800×800px
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <label className={labelCls}>
                    File Terupload ({uploadedFiles.length})
                  </label>
                  {uploadedFiles.map((file, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-xl flex items-center gap-3 p-3.5 border border-gray-100"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${file.progress === 100 ? "bg-green-50" : "bg-gray-100"}`}
                      >
                        {file.progress === 100 ? (
                          <Check
                            size={16}
                            className="text-emerald-600"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <Info size={16} style={{ color: NAVY }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1.5">
                          <p className="text-[13px] font-bold text-gray-800 m-0 truncate max-w-50">
                            {file.name}
                          </p>
                          <span
                            className={`text-[12px] font-bold shrink-0 ${file.progress === 100 ? "text-emerald-600" : ""}`}
                            style={file.progress !== 100 ? { color: NAVY } : {}}
                          >
                            {file.progress === 100
                              ? "✓ Selesai"
                              : `${file.progress}%`}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${file.progress === 100 ? "bg-emerald-500" : ""}`}
                            style={{
                              width: `${file.progress}%`,
                              background:
                                file.progress !== 100 ? NAVY : undefined,
                            }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 m-0">
                          {file.size}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setUploadedFiles(
                            uploadedFiles.filter((_, idx) => idx !== i),
                          )
                        }
                        className="flex items-center justify-center text-red-500 border-none rounded-lg cursor-pointer w-7 h-7 bg-red-50 shrink-0"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3 */}
          <div>
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-green-50 border border-green-100 mb-4">
              <div className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0 bg-emerald-600">
                <DollarSign size={13} color="#fff" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-emerald-900 m-0 mb-0.5">
                  Harga, Stok & Varian
                </p>
                <p className="text-[12px] text-emerald-600 m-0">
                  Tetapkan harga jual, stok, dan pilihan warna.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Harga Jual (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-gray-400">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      placeholder="0"
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                  {form.price && (
                    <div
                      className="mt-2 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5"
                      style={{ background: "rgba(7,43,80,0.06)" }}
                    >
                      <Layers size={11} style={{ color: NAVY }} />
                      <span
                        className="text-[12px] font-bold"
                        style={{ color: NAVY }}
                      >
                        {formatPrice(Number(form.price))}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Jumlah Stok</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.stock}
                      onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                      }
                      placeholder="0"
                      className={`${inputCls} pr-12`}
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] font-bold text-gray-400">
                      Unit
                    </span>
                  </div>
                  {form.stock && (
                    <div
                      className={`mt-2 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 ${Number(form.stock) < 10 ? "bg-red-50" : "bg-emerald-50"}`}
                    >
                      {Number(form.stock) < 10 ? (
                        <AlertTriangle size={11} className="text-red-500" />
                      ) : (
                        <Check size={11} className="text-emerald-500" />
                      )}
                      <span
                        className={`text-[12px] font-bold ${Number(form.stock) < 10 ? "text-red-500" : "text-emerald-600"}`}
                      >
                        {Number(form.stock) < 10
                          ? "Stok hampir habis"
                          : "Stok aman"}
                      </span>
                    </div>
                  )}
                </div>
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
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-xl bg-gray-50">
                  <div
                    className="w-5 h-5 border-2 rounded-full shadow-sm border-black/10 shrink-0"
                    style={{ background: warnaMap[form.warna] || "#e5e7eb" }}
                  />
                  <span className="text-[13px] font-bold text-gray-700">
                    {form.warna}
                  </span>
                  <div className="ml-auto bg-green-100 px-2.5 py-0.5 rounded-full">
                    <span className="text-[11px] font-bold text-green-700">
                      ✓ Siap
                    </span>
                  </div>
                </div>
              )}

              {(form.name || form.price || form.stock) && (
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg,#072B50,#0e4a8a)`,
                  }}
                >
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">
                    Ringkasan Produk
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Nama", value: form.name || "—" },
                      { label: "Kategori", value: form.category || "—" },
                      {
                        label: "Harga",
                        value: form.price
                          ? formatPrice(Number(form.price))
                          : "—",
                      },
                      {
                        label: "Stok",
                        value: form.stock ? `${form.stock} Unit` : "—",
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-[12px] text-white/50 font-medium">
                          {label}
                        </span>
                        <span className="text-[12.5px] text-white font-bold truncate max-w-55 text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-7 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13.5px] font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold transition-all hover:opacity-90"
            style={{
              background: NAVY,
              boxShadow: `0 4px 14px rgba(7,43,80,0.3)`,
            }}
          >
            Simpan Produk
          </button>
        </div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════
   MAIN PAGE
══════════════════════════ */
export default function Produk() {
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
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const paginated = products;
  const promoCount = products.filter((p) => p.promo).length;
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await getProduk(currentPage);
        const mapped = res.data.map((item) => ({
          id: item.id,
          name: item.nama,
          category: item.kategori?.nama || "-",
          price: item.harga,
          stock: item.stok,
          promo: item.adalah_promo,
          image: "📦",
        }));
        setProducts(mapped);
        setTotalPages(res.last_page);
      } catch (err) {
        console.error("Gagal ambil produk:", err);
      }
    };
    fetchProduk();
  }, [currentPage]);

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

  const handleDelete = async () => {
    try {
      await deleteProduk(deleteId);
      setDeleteId(null);
      const res = await getProduk(currentPage);
      setProducts(
        res.data.map((item) => ({
          id: item.id,
          name: item.nama,
          category: item.kategori?.nama || "-",
          price: item.harga,
          stock: item.stok,
          promo: item.adalah_promo,
          image: "📦",
        })),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSave = async (data) => {
    try {
      await createProduk({
        nama: data.name,
        kategori_id: 1,
        harga: Number(data.price),
        stok: Number(data.stock),
        deskripsi: data.description,
      });
      const res = await getProduk(currentPage);
      setProducts(
        res.data.map((item) => ({
          id: item.id,
          name: item.nama,
          category: item.kategori?.nama || "-",
          price: item.harga,
          stock: item.stok,
          promo: item.adalah_promo,
          image: "📦",
        })),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const chipColors = [
    "#e6eef6",
    "#eef3fb",
    "#e8f0fa",
    "#ddeaf6",
    "#e0ecf8",
    "#e3edf8",
    "#dce8f5",
    "#e5eef8",
    "#e1ebf7",
  ];

  const STAT_CARDS = [
    {
      label: "Total Produk",
      value: products.length,
      icon: <Package size={18} color={NAVY} />,
      bg: "#e6eef6",
    },
    {
      label: "Produk Promo",
      value: promoCount,
      icon: <Tag size={18} color={NAVY} />,
      bg: "#e6eef6",
    },
    {
      label: "Stok Menipis",
      value: lowStockCount,
      icon: <AlertTriangle size={18} color={NAVY} />,
      bg: "#e6eef6",
    },
  ];

  return (
    <div className="produk-admin">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1
            className="text-[22px] font-extrabold m-0 tracking-tight"
            style={{ color: NAVY }}
          >
            Daftar Produk
          </h1>
          <p className="text-[12.5px] text-gray-400 m-0 mt-0.5">
            Kelola inventaris dan katalog produk Anda di sini
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer hover:opacity-90 hover:-translate-y-px transition-all shrink-0"
          style={{
            background: NAVY,
            boxShadow: `0 4px 14px rgba(7,43,80,0.28)`,
          }}
        >
          <Plus size={15} /> Tambah Produk
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-7">
        {STAT_CARDS.map(({ label, value, icon, bg }) => (
          <div
            key={label}
            className="flex items-center gap-4 px-6 py-5 bg-white border border-gray-100 shadow-sm stat-card rounded-2xl"
          >
            <div
              className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
              style={{ background: bg }}
            >
              {icon}
            </div>
            <div>
              <p
                className="text-[26px] font-extrabold m-0 leading-none"
                style={{ color: NAVY }}
              >
                {value}
              </p>
              <p className="text-[12px] font-semibold text-gray-400 mt-1 m-0">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-gray-100"
          style={{ background: "#FDFDFD" }}
        >
          <div className="flex items-center gap-2">
            <Package size={14} color={NAVY} />
            <span
              className="text-[12.5px] font-bold uppercase tracking-wider"
              style={{ color: NAVY }}
            >
              Katalog Produk
            </span>
          </div>
          <span className="text-[11.5px] font-medium text-gray-400">
            {products.length} total produk
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-160">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Foto", "Nama Produk", "Harga", "Stok", "Promo", "Aksi"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`text-[11px] font-bold text-gray-400 tracking-widest uppercase px-5 py-4 ${h === "Aksi" ? "text-right" : "text-left"}`}
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
                  className={`row-item ${i < paginated.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <td className="px-5 py-4">
                    <ProductChip
                      emoji={product.image}
                      color={chipColors[product.id % chipColors.length]}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <p
                      className="text-[13.5px] font-bold m-0 mb-0.5"
                      style={{ color: NAVY }}
                    >
                      {product.name}
                    </p>
                    <p className="text-[11.5px] text-gray-400 m-0">
                      {product.category}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="text-[13px] font-bold"
                      style={{ color: NAVY }}
                    >
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[13px] font-bold ${product.stock < 10 ? "text-red-500" : "text-gray-700"}`}
                    >
                      {product.stock} unit
                    </span>
                    {product.stock < 10 && (
                      <span className="text-[10px] text-red-400 block font-semibold">
                        Menipis
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <PromoBadge aktif={product.promo} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex gap-1.5 justify-end">
                      <button
                        onClick={() => setViewProduct(product)}
                        className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer action-btn"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => openEdit(product)}
                        className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer action-btn text-amber-600"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="flex items-center justify-center w-8 h-8 text-red-500 border-none rounded-lg cursor-pointer action-btn"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-3 px-6 py-4 border-t border-gray-100 sm:flex-row sm:items-center bg-gray-50">
          <p className="text-[12.5px] text-gray-400 m-0">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, products.length)} dari{" "}
            {products.length} produk
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white cursor-pointer text-[13px] text-gray-600 disabled:opacity-40 hover:border-gray-300 transition-colors"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8 rounded-lg cursor-pointer text-[12.5px] font-bold border transition-all"
                style={
                  currentPage === page
                    ? {
                        background: NAVY,
                        color: "#fff",
                        borderColor: NAVY,
                        boxShadow: `0 4px 10px rgba(7,43,80,0.25)`,
                      }
                    : {
                        background: "#fff",
                        color: "#6b7280",
                        borderColor: "#e5e7eb",
                      }
                }
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white cursor-pointer text-[13px] text-gray-600 disabled:opacity-40 hover:border-gray-300 transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
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

      {/* Edit Modal */}
      {editProduct && (
        <Overlay onClose={() => setEditProduct(null)}>
          <div className="overflow-hidden bg-white shadow-2xl modal-wrap rounded-2xl w-115">
            <div
              className="flex items-center gap-3 px-6 py-5"
              style={{ background: NAVY }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <Pencil size={16} color="#fff" />
              </div>
              <div className="flex-1">
                <h2 className="text-[15px] font-extrabold text-white m-0">
                  Edit Produk
                </h2>
                <p className="text-[11px] text-white/60 m-0">
                  {editProduct.name}
                </p>
              </div>
              <button
                onClick={() => setEditProduct(null)}
                className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex flex-col gap-4 p-6">
              {[
                { label: "Nama Produk", key: "name" },
                { label: "Kategori", key: "category" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
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
                    <label className={labelCls}>{label}</label>
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
              <label className="flex items-center gap-2.5 cursor-pointer px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <input
                  type="checkbox"
                  checked={editForm.promo}
                  onChange={(e) =>
                    setEditForm({ ...editForm, promo: e.target.checked })
                  }
                  className="w-4 h-4"
                  style={{ accentColor: NAVY }}
                />
                <div>
                  <p className="text-[13px] font-bold text-gray-700 m-0">
                    Tandai sebagai Promo
                  </p>
                  <p className="text-[11px] text-gray-400 m-0">
                    Produk akan tampil dengan label promo
                  </p>
                </div>
              </label>
              <div className="flex gap-2.5 mt-1">
                <button
                  onClick={() => setEditProduct(null)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-2 py-3 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold hover:opacity-90 transition-all"
                  style={{
                    background: NAVY,
                    boxShadow: `0 4px 14px rgba(7,43,80,0.28)`,
                  }}
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </Overlay>
      )}

      {/* Delete Modal */}
      {deleteId !== null && (
        <Overlay onClose={() => setDeleteId(null)}>
          <div className="overflow-hidden bg-white shadow-2xl modal-wrap rounded-2xl w-90">
            <div className="py-8 text-center px-7 bg-linear-to-br from-red-500 to-red-600">
              <div className="flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-2xl bg-white/20">
                <AlertTriangle size={26} color="#fff" />
              </div>
              <h3 className="text-[18px] font-extrabold text-white mb-2 m-0">
                Hapus Produk?
              </h3>
              <p className="text-[12.5px] text-white/80 m-0 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan.
                <br />
                Produk akan dihapus permanen.
              </p>
            </div>
            <div className="px-6 py-5 flex gap-2.5">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl border-none bg-linear-to-br from-red-500 to-red-600 text-white cursor-pointer text-[13.5px] font-bold"
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