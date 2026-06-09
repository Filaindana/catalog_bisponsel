import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";
import productService from "../../utils/services/productService";
import { getPromos } from "../../utils/services/promoService";
import { errorAlert, toastSuccess, confirmAlert } from "../../utils/swal";
import { getImageUrl } from "../../utils/imageHelper";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  Info,
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

const resolveImageUrl = (gambar) => {
  if (!gambar) return "/fallback.jpg";
  if (typeof gambar === "string") return getImageUrl(gambar);

  if (Array.isArray(gambar) && gambar.length > 0) {
    const first = gambar[0];
    if (!first) return "/fallback.jpg";
    if (typeof first === "string") return getImageUrl(first);
    if (first.path) return getImageUrl(first.path);
    if (first.url) return getImageUrl(first.url);
    if (first.url_gambar) return getImageUrl(first.url_gambar);
  }

  if (gambar.path) return getImageUrl(gambar.path);
  if (gambar.url) return getImageUrl(gambar.url);
  if (gambar.url_gambar) return getImageUrl(gambar.url_gambar);
  return "/fallback.jpg";
};

const renderDetailPreview = (text = "") => {
  if (!text?.trim()) {
    return (
      <p className="text-[13px] text-gray-500 m-0">
        Belum ada deskripsi detail.
      </p>
    );
  }

  return text.split(/\r?\n/).map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return null;

    const isBullet = /^[-*•]\s+/.test(trimmed);
    const content = trimmed.replace(/^[-*•]\s+/, "");

    return (
      <p
        key={idx}
        className="text-[13px] text-gray-700 leading-relaxed m-0"
      >
        {isBullet ? `• ${content}` : content}
      </p>
    );
  });
};

const defaultKategoriOptions = [
  { id: 1, nama: "Laptop & Komputer" },
  { id: 2, nama: "Smartphone" },
  { id: 3, nama: "Tablet" },
  { id: 4, nama: "Monitor" },
  { id: 5, nama: "Aksesoris" },
  { id: 6, nama: "Printer" },
  { id: 7, nama: "Kamera" },
];
const defaultBrandOptions = [
  { id: 1, nama: "ASUS" },
  { id: 2, nama: "Samsung" },
  { id: 3, nama: "Apple" },
  { id: 4, nama: "Lenovo" },
  { id: 5, nama: "HP" },
  { id: 6, nama: "Dell" },
  { id: 7, nama: "Acer" },
  { id: 8, nama: "Xiaomi" },
  { id: 9, nama: "Oppo" },
  { id: 10, nama: "Vivo" },
];
const normalizeOption = (option) => {
  if (typeof option === "string") {
    return { value: option, label: option };
  }

  if (option && typeof option === "object") {
    const value = option.value ?? option.id ?? option.nama ?? option.label;
    const label = option.label ?? option.nama ?? option.name ?? String(value);

    return { value, label };
  }

  return { value: option, label: String(option) };
};
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

const defaultProductForm = {
  name: "",
  slug: "",
  category: "",
  kategori_id: null,
  brand_id: null,
  brand: "",
  description: "",
  deskripsi: "",
  deskripsi_detail: "",
  price: "",
  stock: "",
  rating: "",
  promo: false,
  promoRelation: [],
  warna: "",
  colorLabel: [],
  gambar: [],
  spesifikasi: [],
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

  const normalizedOptions = options.map(normalizeOption);
  const selected = normalizedOptions.find(
    (option) => String(option.value) === String(value),
  );

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
        setHoveredIdx(-1);
      }
      return !prev;
    });
  };

  const select = (opt) => {
    onChange({ target: { value: opt.value } });
    setOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
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
          {selected?.label || placeholder}
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
        {normalizedOptions.map((opt, idx) => {
          const isSelected = String(opt.value) === String(value);
          const isHovered = hoveredIdx === idx;
          return (
            <button
              key={String(opt.value)}
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
                {opt.label}
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

// function ProductChip({ emoji, color = "#e6eef6" }) {
function ProductChip({ image, color = "#e6eef6" }) {
  return (
    // <div
    //   className="w-21.5 h-13 rounded-xl relative flex items-center justify-center overflow-hidden shrink-0"
    //   style={{ background: color, boxShadow: "0 2px 8px rgba(7,43,80,0.1)" }}
    // >
    //   <div className="absolute w-8 h-8 rounded-full -top-2 -right-2 bg-white/30" />
    //   <span className="relative z-10 text-2xl">{emoji}</span>
    // </div>
    <div
      className="flex items-center justify-center w-12 h-12 overflow-hidden rounded-xl"
      style={{ background: color }}
    >
      <img
        src={image}
        alt="product"
        className="object-cover w-full h-full"
        onError={(e) => {
          e.target.src = "/fallback.jpg";
        }}
      />
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
          <p className="text-[12.5px] text-white/60 m-0">
            {product.category}
            {product.brand && product.brand !== "-" ? ` • ${product.brand}` : ""}
          </p>
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

function ProductFormModal({
  mode = "create",
  onClose,
  onSave,
  brandOptions,
  kategoriOptions,
  promoOptions = [],
  initialData = null,
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => ({
    ...defaultProductForm,
    ...(initialData || {}),
  }));
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(() =>
    (initialData?.gambar || []).map((url, idx) => ({
      id: `existing-${idx}`,
      name: url.split("/").pop() || "image",
      size: "",
      progress: 100,
      preview: url,
      url,
      isExisting: true,
    })),
  );
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [promoSearch, setPromoSearch] = useState("");
  const fileInputRef = useRef(null);
  const progressTimers = useRef({});

  useEffect(() => {
    setForm({ ...defaultProductForm, ...(initialData || {}) });
    setUploadedFiles(
      (initialData?.gambar || []).map((url, idx) => ({
        id: `existing-${idx}`,
        name: url.split("/").pop() || "image",
        size: "",
        progress: 100,
        preview: url,
        url,
        isExisting: true,
      })),
    );
    setImageFiles([]);
    setStep(1);
  }, [initialData]);

  useEffect(() => {
    return () => {
      Object.values(progressTimers.current).forEach((timer) =>
        clearInterval(timer),
      );
    };
  }, []);

  const stepLabels = [
    "Informasi Dasar",
    "Detail Produk",
    "Media Produk",
    "Spesifikasi",
  ];

  const startUploadSimulation = (fileId) => {
    let currentProgress = 0;
    if (progressTimers.current[fileId]) {
      clearInterval(progressTimers.current[fileId]);
    }

    progressTimers.current[fileId] = setInterval(() => {
      currentProgress = Math.min(
        currentProgress + Math.floor(Math.random() * 16) + 10,
        100,
      );

      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId ? { ...file, progress: currentProgress } : file,
        ),
      );

      if (currentProgress >= 100) {
        clearInterval(progressTimers.current[fileId]);
        delete progressTimers.current[fileId];
      }
    }, 120);
  };

  const formatFileSize = (size) =>
    size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(size / 1024)} KB`;

  const handleFiles = (fileList) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const files = Array.from(fileList);
    const validFiles = [];
    let invalidFound = false;

    files.forEach((file) => {
      const isValidType = allowedTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isValidType || !isValidSize) {
        invalidFound = true;
        return;
      }

      const fileId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      validFiles.push({
        id: fileId,
        name: file.name,
        size: formatFileSize(file.size),
        progress: 0,
        file,
        preview: URL.createObjectURL(file),
      });
    });

    if (!validFiles.length) {
      if (invalidFound) {
        setUploadError("Hanya JPG/PNG/WEBP maksimal 5MB.");
      }
      return;
    }

    setUploadError("");
    setUploadedFiles((prev) => [...prev, ...validFiles]);
    setImageFiles((prev) => [...prev, ...validFiles.map((item) => ({ id: item.id, file: item.file }))]);
    validFiles.forEach((item) => startUploadSimulation(item.id));
  };

  const removeFile = (id) => {
    const target = uploadedFiles.find((file) => file.id === id);
    if (target) {
      if (!target.isExisting && target.preview) {
        URL.revokeObjectURL(target.preview);
      }
      if (target.isExisting) {
        setForm((prev) => ({
          ...prev,
          gambar: prev.gambar.filter((url) => url !== target.url),
        }));
      }
    }
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    setImageFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const openFilePicker = () => fileInputRef.current?.click();
  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    handleFiles(event.dataTransfer.files);
  };

  const updateSpec = (idx, key, value) => {
    setForm((prev) => ({
      ...prev,
      spesifikasi: prev.spesifikasi.map((spec, index) =>
        index === idx ? { ...spec, [key]: value } : spec,
      ),
    }));
  };

  const addSpec = () => {
    setForm((prev) => ({
      ...prev,
      spesifikasi: [...prev.spesifikasi, { atribut: "", detail: "" }],
    }));
  };

  const removeSpec = (idx) => {
    setForm((prev) => ({
      ...prev,
      spesifikasi: prev.spesifikasi.filter((_, index) => index !== idx),
    }));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));

  const handleSubmit = async () => {
    try {
      await onSave({ ...form, imageFiles });
      onClose();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className="w-135 bg-white rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between py-5 border-b border-gray-100 px-7">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: "rgba(7,43,80,0.08)" }}
            >
              {mode === "edit" ? (
                <Pencil size={18} style={{ color: NAVY }} />
              ) : (
                <Sparkles size={18} style={{ color: NAVY }} />
              )}
            </div>
            <div>
              <h2 className="text-[16px] font-extrabold m-0 mb-0.5" style={{ color: NAVY }}>
                {mode === "edit" ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>
              <p className="text-[11.5px] text-gray-400 m-0">
                {mode === "edit"
                  ? "Perbarui informasi produk dalam langkah yang terstruktur."
                  : "Isi data produk secara bertahap untuk pengalaman terbaik."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-gray-400 transition-colors border border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>

        <div className="pt-5 pb-4 px-7">
          <div className="flex gap-2 mb-3">
            {stepLabels.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index + 1)}
                className={`flex-1 rounded-2xl border px-3 py-2 text-left transition-all ${step === index + 1
                  ? "border-[#072B50] bg-[#e6eef6]"
                  : "border-gray-200 bg-white"
                  }`}
              >
                <p className={`text-[11px] font-bold ${step === index + 1 ? "text-[#072B50]" : "text-gray-500"}`}>
                  {index + 1}. {label}
                </p>
              </button>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#072B50] transition-all"
              style={{ width: `${(step / stepLabels.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 pb-6 overflow-y-auto px-7">
          {step === 1 && (
            <div className="flex flex-col gap-6 pb-2">
              <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-blue-50 border border-blue-100">
                <div
                  className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0"
                  style={{ background: NAVY }}
                >
                  <Info size={13} color="#fff" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#072B50] m-0 mb-0.5">
                    Informasi Dasar Produk
                  </p>
                  <p className="text-[12px] text-blue-500 m-0">
                    Lengkapi nama, kategori, harga, dan stok.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <Field label="Nama Produk">
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Contoh: iPhone 15 Pro Max 256GB"
                    className={inputCls}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Kategori">
                    <CustomSelect
                      value={form.kategori_id}
                      onChange={(e) => {
                        const selected = kategoriOptions.find(
                          (option) =>
                            String(option.value ?? option.id ?? option.nama) ===
                            String(e.target.value),
                        );

                        setForm({
                          ...form,
                          kategori_id: e.target.value
                            ? Number(e.target.value)
                            : null,
                          category: selected?.label || selected?.nama || "",
                        });
                      }}
                      options={kategoriOptions}
                      placeholder="Pilih kategori..."
                    />
                  </Field>
                  <Field label="Brand">
                    <CustomSelect
                      value={form.brand_id}
                      onChange={(e) => {
                        const selected = brandOptions.find(
                          (option) =>
                            String(option.value ?? option.id ?? option.nama) ===
                            String(e.target.value),
                        );

                        const selectedBrand = selected;
                        console.log("SELECTED BRAND", selectedBrand);

                        setForm({
                          ...form,
                          brand_id: e.target.value ? Number(e.target.value) : null,
                          brand: selected?.label || selected?.nama || "",
                        });
                      }}
                      options={brandOptions}
                      placeholder="Pilih brand..."
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Harga Jual (Rp)">
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="0"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Jumlah Stok">
                    <input
                      type="number"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      placeholder="0"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Rating">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={form.rating}
                      onChange={(e) => setForm({ ...form, rating: e.target.value })}
                      placeholder="0.0"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Status Promo">
                    <label className="flex items-center gap-3 px-4 py-3 border border-gray-200 cursor-pointer rounded-xl bg-gray-50">
                      <input
                        type="checkbox"
                        checked={form.promo}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            promo: e.target.checked,
                            promoRelation: e.target.checked ? prev.promoRelation : [],
                          }))
                        }
                        className="w-4 h-4"
                        style={{ accentColor: NAVY }}
                      />
                      <span className="text-[13px] font-semibold text-gray-700">
                        Tandai sebagai promo
                      </span>
                    </label>
                  </Field>
                </div>

                <Field label="Deskripsi Singkat">
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Jelaskan fitur unggulan produk..."
                    className={`${inputCls} h-24 resize-none`}
                  />
                  <p className={hintCls}>
                    Ringkas, mudah dibaca, gunakan 1-2 kalimat.
                  </p>
                </Field>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6 pb-2">
              <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-purple-50 border border-purple-100">
                <div className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0 bg-violet-600">
                  <Info size={13} color="#fff" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-violet-800 m-0 mb-0.5">
                    Detail Produk
                  </p>
                  <p className="text-[12px] text-violet-500 m-0">
                    Tambahkan deskripsi panjang dan informasi warna.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-4">
                <div className="flex flex-col gap-4">
                  <Field label="Deskripsi Detail">
                    <textarea
                      value={form.deskripsi_detail}
                      onChange={(e) =>
                        setForm({ ...form, deskripsi_detail: e.target.value })
                      }
                      placeholder={
                        "Tuliskan deskripsi panjang. Gunakan paragraf, bullet, dan enter untuk struktur yang baik."
                      }
                      className={`${inputCls} min-h-55 resize-vertical`}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Warna Produk">
                      <div className="flex flex-wrap gap-2">
                        {warnaOptions.map((w) => {
                          const selected = (form.colorLabel || []).includes(w);
                          return (
                            <button
                              key={w}
                              type="button"
                              onClick={() => {
                                setForm((prev) => {
                                  const list = Array.isArray(prev.colorLabel) ? prev.colorLabel.slice() : [];
                                  if (list.includes(w)) {
                                    return { ...prev, colorLabel: list.filter((c) => c !== w) };
                                  }
                                  list.push(w);
                                  return { ...prev, colorLabel: list };
                                });
                              }}
                              className={`px-3 py-2 rounded-full border ${selected ? "bg-[#072B50] text-white" : "bg-white text-gray-700"}`}
                            >
                              {w}
                            </button>
                          );
                        })}
                      </div>
                      <p className={hintCls}>Opsional — pilih satu atau lebih label warna.</p>
                    </Field>
                  </div>
                </div>
                <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50 min-h-55">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Preview Deskripsi
                  </p>
                  <div className="space-y-2">
                    {renderDetailPreview(form.deskripsi_detail)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6 pb-2">
              <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0" style={{ background: NAVY }}>
                  <Camera size={13} color="#fff" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#072B50] m-0 mb-0.5">
                    Media Produk
                  </p>
                  <p className="text-[12px] text-blue-600 m-0">
                    Upload gambar produk dengan preview dan progress.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleFiles(e.target.files);
                    e.target.value = null;
                  }}
                />
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
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
                    <button
                      type="button"
                      onClick={openFilePicker}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-[13px] font-bold"
                      style={{ background: NAVY }}
                    >
                      <Upload size={13} /> Pilih File
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 m-0">
                    PNG, JPG, WEBP · Maks. 5MB · Min. 800×800px
                  </p>
                  {uploadError && (
                    <p className="text-[11px] text-red-500 mt-2 m-0">
                      {uploadError}
                    </p>
                  )}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="flex flex-col gap-2.5">
                    <label className={labelCls}>
                      File Terupload ({uploadedFiles.length})
                    </label>
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="bg-gray-50 rounded-xl flex items-center gap-3 p-3.5 border border-gray-100"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${file.progress === 100 ? "bg-green-50" : "bg-gray-100"
                            }`}
                        >
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="object-cover w-full h-full rounded-lg"
                            />
                          ) : file.progress === 100 ? (
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
                              className={`text-[12px] font-bold shrink-0 ${file.progress === 100 ? "text-emerald-600" : ""
                                }`}
                              style={file.progress !== 100 ? { color: NAVY } : {}}
                            >
                              {file.progress === 100
                                ? "✓ Selesai"
                                : `${file.progress}%`}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${file.progress === 100 ? "bg-emerald-500" : ""
                                }`}
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
                          type="button"
                          onClick={() => removeFile(file.id)}
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
          )}

          {step === 4 && (
            <div className="flex flex-col gap-6 pb-2">
              <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-green-50 border border-green-100">
                <div className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0 bg-emerald-600">
                  <Layers size={13} color="#fff" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-emerald-900 m-0 mb-0.5">
                    Spesifikasi & Relasi
                  </p>
                  <p className="text-[12px] text-emerald-600 m-0">
                    Tambahkan detail spesifikasi dan relasi promo.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {form.spesifikasi.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-gray-100 rounded-xl bg-gray-50"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Atribut</label>
                        <input
                          value={spec.atribut}
                          onChange={(e) =>
                            updateSpec(idx, "atribut", e.target.value)
                          }
                          placeholder="Contoh: Chipset"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Detail</label>
                        <input
                          value={spec.detail}
                          onChange={(e) =>
                            updateSpec(idx, "detail", e.target.value)
                          }
                          placeholder="Contoh: A17 Pro, 8GB RAM"
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(idx)}
                      className="mt-3 px-3 py-2 rounded-xl text-[12px] font-semibold text-red-500 bg-red-50 hover:bg-red-100"
                    >
                      Hapus Spesifikasi
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSpec}
                  className="inline-flex items-center justify-center w-full py-3 rounded-xl border border-dashed border-gray-200 bg-white text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
                >
                  + Tambah Spesifikasi
                </button>

                <div>
                  <label className={labelCls}>Promo Aktif (opsional)</label>
                  <div className="relative">
                    <input
                      value={promoSearch}
                      onChange={(e) => setPromoSearch(e.target.value)}
                      placeholder="Cari promo..."
                      className={`${inputCls} pl-4`}
                    />
                    {promoSearch && (
                      <div className="absolute left-0 right-0 z-10 mt-1 overflow-hidden bg-white border border-gray-200 shadow-xl rounded-xl">
                        {promoOptions
                          .filter(
                            (promo) =>
                              promo.name
                                .toLowerCase()
                                .includes(promoSearch.toLowerCase()) &&
                              !form.promoRelation.includes(promo.id),
                          )
                          .slice(0, 8)
                          .map((promo) => (
                            <button
                              key={promo.id}
                              type="button"
                              onClick={() => {
                                setForm((prev) => ({
                                  ...prev,
                                  promoRelation: [...prev.promoRelation, promo.id],
                                  promo: true,
                                }));
                                setPromoSearch("");
                              }}
                              className="w-full px-4 py-3 text-left bg-white border-b border-gray-100 hover:bg-gray-50"
                            >
                              {promo.name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  {form.promoRelation.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {form.promoRelation.map((promoId) => {
                        const promo = promoOptions.find((p) => p.id === promoId);
                        return (
                          <span
                            key={promoId}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[12px] font-semibold text-blue-900"
                          >
                            {promo ? promo.name : `Promo #${promoId}`}
                            <button
                              type="button"
                              onClick={() =>
                                setForm((prev) => ({
                                  ...prev,
                                  promoRelation: prev.promoRelation.filter(
                                    (id) => id !== promoId,
                                  ),
                                }))
                              }
                              className="inline-flex items-center justify-center w-5 h-5 text-blue-700 bg-white rounded-full"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <p className={hintCls}>
                    Pilih promo untuk menghubungkan produk ke kampanye.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between gap-2.5 px-7 py-4 border-t border-gray-100 bg-gray-50">
          <button
            type="button"
            onClick={step > 1 ? handleBack : onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13.5px] font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {step > 1 ? "Kembali" : "Batal"}
          </button>
          <div className="flex gap-2.5">
            {step < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold transition-all hover:opacity-90"
                style={{
                  background: NAVY,
                  boxShadow: `0 4px 14px rgba(7,43,80,0.3)`,
                }}
              >
                Selanjutnya
              </button>
            )}
            {step === 4 && (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold transition-all hover:opacity-90"
                style={{
                  background: NAVY,
                  boxShadow: `0 4px 14px rgba(7,43,80,0.3)`,
                }}
              >
                Simpan Produk
              </button>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function AddProductModal(props) {
  return <ProductFormModal mode="create" {...props} />;
}

/* ══════════════════════════════════════════
   ADD BRAND & KATEGORI MODAL — dengan upload logo
══════════════════════════════════════════ */
function AddBrandKategoriModal({ onClose, brands, setBrands, kategoris, setKategoris }) {
  const [tab, setTab] = useState("brand");
  const [inputBrand, setInputBrand] = useState("");
  const [inputKategori, setInputKategori] = useState("");
  
  // Brand Logo States
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Kategori Gambar States
  const [kategoriPreview, setKategoriPreview] = useState(null);
  const [kategoriFile, setKategoriFile] = useState(null);
  const [kategoriDragOver, setKategoriDragOver] = useState(false);
  const kategoriFileInputRef = useRef(null);

  // Editing State
  const [editingKategori, setEditingKategori] = useState(null);

  // Local Category list (with detailed attributes like gambar_url and produk_count)
  const [localKategoris, setLocalKategoris] = useState([]);

  // Fetch full category details from backend
  const fetchKategoriDetails = async () => {
    try {
      const res = await api("/kategori");
      const items = res?.data || [];
      setLocalKategoris(items);
      // Keep parent dropdown synchronized with basic list format
      setKategoris(items.map(item => ({ id: item.id, nama: item.nama })));
    } catch (err) {
      console.error("Gagal mengambil detail kategori:", err);
    }
  };

  useEffect(() => {
    fetchKategoriDetails();
  }, []);

  const handleLogoChange = (file) => {
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setLogoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleKategoriImageChange = (file) => {
    if (!file) return;
    setKategoriFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setKategoriPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const addBrand = async () => {
    if (!inputBrand.trim()) return;
    try {
      const res = await api("/brand", {
        method: "POST",
        body: JSON.stringify({
          nama: inputBrand.trim(),
          logo: logoPreview || null
        })
      });
      console.log("BRANDS API POST RESPONSE", res);
      const newBrand = res.data;
      setBrands([...brands, newBrand]);
      setInputBrand("");
      setLogoPreview(null);
      setLogoFile(null);
      toastSuccess("Brand berhasil ditambahkan");
    } catch (err) {
      console.error("Error creating brand:", err);
      errorAlert("Gagal Menyimpan Brand", err.message || "Gagal menyimpan brand.");
    }
  };

  const addKategori = async () => {
    if (!inputKategori.trim()) return;
    try {
      const res = await api("/kategori", {
        method: "POST",
        body: JSON.stringify({
          nama: inputKategori.trim(),
          gambar: kategoriPreview || null
        })
      });
      console.log("KATEGORI API POST RESPONSE", res);
      const newKategori = res.data;
      
      const updated = [...localKategoris, newKategori];
      setLocalKategoris(updated);
      setKategoris(updated.map(item => ({ id: item.id, nama: item.nama })));

      setInputKategori("");
      setKategoriPreview(null);
      setKategoriFile(null);
      toastSuccess("Kategori berhasil ditambahkan");
    } catch (err) {
      console.error("Error creating kategori:", err);
      errorAlert("Gagal Menyimpan Kategori", err.message || "Gagal menyimpan kategori.");
    }
  };

  const startEditKategori = (kategori) => {
    setEditingKategori(kategori);
    setInputKategori(kategori.nama);
    setKategoriPreview(kategori.gambar_url);
    setKategoriFile(null);
  };

  const cancelEditKategori = () => {
    setEditingKategori(null);
    setInputKategori("");
    setKategoriPreview(null);
    setKategoriFile(null);
  };

  const updateKategori = async () => {
    if (!inputKategori.trim() || !editingKategori) return;
    try {
      const res = await api(`/kategori/${editingKategori.id}`, {
        method: "PUT",
        body: JSON.stringify({
          nama: inputKategori.trim(),
          gambar: kategoriPreview || null
        })
      });
      console.log("KATEGORI API PUT RESPONSE", res);
      const updatedKategori = res.data;

      const updated = localKategoris.map(item => 
        item.id === editingKategori.id ? { ...item, ...updatedKategori } : item
      );
      setLocalKategoris(updated);
      setKategoris(updated.map(item => ({ id: item.id, nama: item.nama })));

      setEditingKategori(null);
      setInputKategori("");
      setKategoriPreview(null);
      setKategoriFile(null);
      toastSuccess("Kategori berhasil diperbarui");
    } catch (err) {
      console.error("Error updating kategori:", err);
      errorAlert("Gagal Memperbarui Kategori", err.message || "Gagal memperbarui kategori.");
    }
  };

  const deleteKategori = async (id, name, productCount = 0) => {
    const message = productCount > 0 
      ? `Kategori "${name}" memiliki ${productCount} produk aktif. Menghapus kategori ini juga akan MENGHAPUS SEMUA PRODUK di dalamnya (Cascade Delete)! Apakah Anda yakin?`
      : `Apakah Anda yakin ingin menghapus kategori "${name}"?`;

    const confirm = await confirmAlert({
      title: "Hapus Kategori?",
      text: message,
      confirmText: "Ya, Hapus Kategori",
      cancelText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api(`/kategori/${id}`, {
        method: "DELETE"
      });

      const updated = localKategoris.filter(item => item.id !== id);
      setLocalKategoris(updated);
      setKategoris(updated.map(item => ({ id: item.id, nama: item.nama })));

      toastSuccess("Kategori berhasil dihapus");
    } catch (err) {
      console.error("Error deleting kategori:", err);
      errorAlert("Gagal Menghapus Kategori", err.message || "Gagal menghapus kategori.");
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className="overflow-hidden bg-white shadow-2xl rounded-2xl w-120 modal-wrap">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ background: NAVY }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Layers size={16} color="#fff" />
            </div>
            <div>
              <p className="text-[15px] font-extrabold text-white m-0 mb-0.5">Tambah Brand & Kategori</p>
              <p className="text-[11px] text-white/55 m-0">Kelola referensi data produk</p>
            </div>
          </div>
          <button onClick={onClose} className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
            <X size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-[#fdfdfd]">
          {["brand", "kategori"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-3.5 border-none bg-transparent cursor-pointer text-[12.5px] font-bold capitalize transition-all"
              style={{ color: tab === t ? NAVY : "#9ca3af", borderBottom: tab === t ? `2.5px solid ${NAVY}` : "2.5px solid transparent" }}>
              {t === "brand" ? "Brand" : "Kategori"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {tab === "brand" ? (
            <>
              {/* Input nama brand */}
              <div>
                <label className={labelCls}>Nama Brand</label>
                <input
                  value={inputBrand}
                  onChange={(e) => setInputBrand(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addBrand()}
                  placeholder="Contoh: Sony, Realme, Toshiba..."
                  className={inputCls}
                />
              </div>

              {/* Upload logo */}
              <div>
                <label className={labelCls}>Logo Brand</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => handleLogoChange(e.target.files[0])}
                />

                {!logoPreview ? (
                  /* Drop zone */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleLogoChange(e.dataTransfer.files[0]);
                    }}
                    className="flex flex-col items-center gap-2 py-6 transition-all border-2 border-dashed cursor-pointer rounded-xl"
                    style={{
                      borderColor: dragOver ? NAVY : "#e2e8f0",
                      background: dragOver ? "rgba(7,43,80,0.04)" : "#fafaff",
                    }}
                  >
                    <div
                      className="flex items-center justify-center transition-all w-11 h-11 rounded-xl"
                      style={{ background: dragOver ? NAVY : "rgba(7,43,80,0.07)" }}
                    >
                      <Upload size={20} color={dragOver ? "#fff" : NAVY} />
                    </div>
                    <div className="text-center">
                      <p className="text-[13px] font-bold text-gray-700 m-0 mb-0.5">
                        Drag & drop logo di sini
                      </p>
                      <p className="text-[11.5px] text-gray-400 m-0">
                        PNG, SVG, JPG · Maks. 2MB · Transparan lebih baik
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-lg text-white text-[12px] font-bold" style={{ background: NAVY }}>
                      Pilih File
                    </div>
                  </div>
                ) : (
                  /* Preview logo */
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                    <div
                      className="flex items-center justify-center w-16 h-16 border border-gray-200 rounded-xl shrink-0"
                      style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 10px 10px" }}
                    >
                      <img src={logoPreview} alt="preview" className="object-contain w-12 h-12" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-gray-800 m-0 mb-0.5 truncate">{logoFile?.name}</p>
                      <p className="text-[11.5px] text-gray-400 m-0">
                        {logoFile ? (logoFile.size / 1024).toFixed(1) + " KB" : ""}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                        <Check size={10} strokeWidth={3} /> Siap diupload
                      </span>
                    </div>
                    <button
                      onClick={() => { setLogoPreview(null); setLogoFile(null); }}
                      className="flex items-center justify-center text-red-500 transition-colors border-none rounded-lg cursor-pointer w-7 h-7 bg-red-50 shrink-0 hover:bg-red-100"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Tombol tambah */}
              <button
                onClick={addBrand}
                className="w-full py-2.5 rounded-xl border-none text-white text-[13px] font-bold cursor-pointer transition-all hover:opacity-90"
                style={{
                  background: NAVY,
                  boxShadow: "0 4px 14px rgba(7,43,80,0.2)",
                  opacity: inputBrand.trim() ? 1 : 0.45,
                }}
                disabled={!inputBrand.trim()}
              >
                Simpan Brand
              </button>

              {/* Daftar brand */}
              <div>
                <label className={labelCls}>Daftar Brand ({brands.length})</label>
                <div className="flex flex-col gap-2">
                  {brands.map((b, i) => {
                    const nama = typeof b === "string" ? b : b.nama;
                    const logo = typeof b === "string" ? null : b.logo;
                    return (
                      <div key={i} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#dce6f0] bg-[#f0f4f9]">
                        <div className="flex items-center gap-3">
                          {logo ? (
                            <div
                              className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-lg shrink-0"
                              style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 8px 8px" }}
                            >
                              <img src={logo} alt={nama} className="object-contain w-6 h-6" />
                            </div>
                          ) : (
                            <div
                              className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                              style={{ background: "rgba(7,43,80,0.08)" }}
                            >
                              <span className="text-[10px] font-extrabold" style={{ color: NAVY }}>
                                {nama.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="text-[13px] font-semibold" style={{ color: NAVY }}>{nama}</span>
                        </div>
                        <button
                          onClick={() => setBrands(brands.filter((_, idx) => idx !== i))}
                          className="flex items-center justify-center w-6 h-6 text-red-500 transition-colors border-none rounded-md cursor-pointer bg-red-50 hover:bg-red-100"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Form Input Nama Kategori */}
              <div>
                <label className={labelCls}>
                  {editingKategori ? "Ubah Nama Kategori" : "Nama Kategori Baru"}
                </label>
                <input
                  value={inputKategori}
                  onChange={(e) => setInputKategori(e.target.value)}
                  placeholder="Contoh: Laptop, Smartwatch, Aksesoris..."
                  className={inputCls}
                />
              </div>

              {/* Upload Gambar Kategori */}
              <div>
                <label className={labelCls}>Gambar Kategori</label>
                <input
                  ref={kategoriFileInputRef}
                  type="file"
                  accept="image/png,image/svg+xml,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => handleKategoriImageChange(e.target.files[0])}
                />

                {!kategoriPreview ? (
                  /* Drop zone */
                  <div
                    onClick={() => kategoriFileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setKategoriDragOver(true); }}
                    onDragLeave={() => setKategoriDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setKategoriDragOver(false);
                      handleKategoriImageChange(e.dataTransfer.files[0]);
                    }}
                    className="flex flex-col items-center gap-2 py-6 transition-all border-2 border-dashed cursor-pointer rounded-xl"
                    style={{
                      borderColor: kategoriDragOver ? NAVY : "#e2e8f0",
                      background: kategoriDragOver ? "rgba(7,43,80,0.04)" : "#fafaff",
                    }}
                  >
                    <div
                      className="flex items-center justify-center transition-all w-11 h-11 rounded-xl"
                      style={{ background: kategoriDragOver ? NAVY : "rgba(7,43,80,0.07)" }}
                    >
                      <Upload size={20} color={kategoriDragOver ? "#fff" : NAVY} />
                    </div>
                    <div className="text-center">
                      <p className="text-[13px] font-bold text-gray-700 m-0 mb-0.5">
                        Drag & drop gambar di sini
                      </p>
                      <p className="text-[11.5px] text-gray-400 m-0">
                        PNG, SVG, JPG · Maks. 2MB
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-lg text-white text-[12px] font-bold" style={{ background: NAVY }}>
                      Pilih File
                    </div>
                  </div>
                ) : (
                  /* Preview Gambar */
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                    <div
                      className="flex items-center justify-center w-16 h-16 overflow-hidden bg-white border border-gray-200 rounded-xl shrink-0"
                      style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 10px 10px" }}
                    >
                      <img src={kategoriPreview} alt="preview" className="object-cover w-full h-full" onError={(e) => { e.target.src = "/fallback-category.jpg"; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-gray-800 m-0 mb-0.5 truncate">
                        {kategoriFile ? kategoriFile.name : (editingKategori ? "Gambar Kategori Saat Ini" : "Gambar Terpilih")}
                      </p>
                      <p className="text-[11.5px] text-gray-400 m-0">
                        {kategoriFile ? (kategoriFile.size / 1024).toFixed(1) + " KB" : ""}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                        <Check size={10} strokeWidth={3} /> Siap disimpan
                      </span>
                    </div>
                    <button
                      onClick={() => { setKategoriPreview(null); setKategoriFile(null); }}
                      className="flex items-center justify-center text-red-500 transition-colors border-none rounded-lg cursor-pointer w-7 h-7 bg-red-50 shrink-0 hover:bg-red-100"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Action buttons (Tambah / Update) */}
              <div className="flex gap-2.5">
                {editingKategori && (
                  <button
                    onClick={cancelEditKategori}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] font-bold cursor-pointer text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Batal Edit
                  </button>
                )}
                <button
                  onClick={editingKategori ? updateKategori : addKategori}
                  className="flex-1 py-2.5 rounded-xl border-none text-white text-[13px] font-bold cursor-pointer transition-all hover:opacity-90"
                  style={{
                    background: NAVY,
                    boxShadow: "0 4px 14px rgba(7,43,80,0.2)",
                    opacity: inputKategori.trim() ? 1 : 0.45,
                  }}
                  disabled={!inputKategori.trim()}
                >
                  {editingKategori ? "Simpan Perubahan" : "Simpan Kategori"}
                </button>
              </div>

              {/* Daftar Kategori */}
              <div>
                <label className={labelCls}>Daftar Kategori ({localKategoris.length})</label>
                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {localKategoris.map((k) => {
                    const id = k.id;
                    const nama = k.nama || "";
                    const imgUrl = k.gambar_url || "/fallback-category.jpg";
                    const produkCount = k.produk_count || 0;

                    return (
                      <div key={id} className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#dce6f0] bg-[#f0f4f9] hover:bg-[#e4ecf5] transition-all">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex items-center justify-center overflow-hidden bg-white border border-gray-200 rounded-full shadow-sm w-9 h-9 shrink-0 animate-fade-in"
                          >
                            <img src={imgUrl} alt={nama} onError={(e) => { e.target.src = "/fallback-category.jpg"; }} className="object-cover w-full h-full" />
                          </div>
                          <div>
                            <p className="text-[13px] font-bold m-0" style={{ color: NAVY }}>{nama}</p>
                            <p className="text-[11px] text-gray-500 m-0">{produkCount} produk</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => startEditKategori(k)}
                            className="flex items-center justify-center text-indigo-600 transition-colors border-none rounded-md cursor-pointer w-7 h-7 bg-indigo-50 hover:bg-indigo-100"
                            title="Edit Kategori"
                          >
                            <Pencil size={11} />
                          </button>
                          <button
                            onClick={() => deleteKategori(id, nama, produkCount)}
                            className="flex items-center justify-center text-red-500 transition-colors border-none rounded-md cursor-pointer w-7 h-7 bg-red-50 hover:bg-red-100"
                            title="Hapus Kategori"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13px] font-semibold text-gray-600 hover:bg-gray-100 transition-colors">Batal</button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border-none text-white cursor-pointer text-[13px] font-bold hover:opacity-90 transition-all" style={{ background: NAVY, boxShadow: `0 4px 14px rgba(7,43,80,0.28)` }}>Simpan</button>
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
  const [showBrandKategoriModal, setShowBrandKategoriModal] = useState(false);
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

  const [brandOptions, setBrandOptions] = useState(defaultBrandOptions);
  const [kategoriOptions, setKategoriOptions] = useState(defaultKategoriOptions);
  const [promoOptions, setPromoOptions] = useState([]);

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState({
    promo_count: 0,
    low_stock_count: 0,
  });

  const [totalPages, setTotalPages] = useState(1);
  const paginated = products;
  const promoCount = meta.promo_count;
  const lowStockCount = meta.low_stock_count;

  // Fetch products function
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: currentPage,
        per_page: 15,
      };

      const response = await productService.getProducts(params);

      console.log("API Response:", response);

      const raw = response.data?.data || [];

      const mapped = raw.map((item) => ({
        id: item.id,
        slug: item.slug,
        name: item.nama,
        category: item.kategori?.nama || "-",
        brand: item.brand?.nama || "-",
        price: item.harga,
        stock: item.stok,
        promo:
          item.adalah_promo ||
          (Array.isArray(item.promo) && item.promo.length > 0),
        image: "📦",
        imageUrl: resolveImageUrl(item.gambar?.map((g) => g.url_gambar) || []),
        fullData: item,
      }));

      setProducts(mapped);
      // setTotalPages(response.data?.last_page || 1);
      // setTotalProducts(response.data?.total || 0);
      // setMeta(response.meta || {
      //   promo_count: 0,
      //   low_stock_count: 0,
      // });
      setTotalPages(response.data?.last_page || 1);

      setTotalProducts(response.data?.total || 0);

      setMeta(response.meta || {
        total: 0,
        promo_count: 0,
        low_stock_count: 0,
      });

    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const fetchPromoOptions = async () => {
      try {
        const res = await getPromos({ page: 1, limit: 100 });
        const options = Array.isArray(res.data)
          ? res.data.map((promo) => ({ id: promo.id, name: promo.name }))
          : [];
        setPromoOptions(options);
      } catch (error) {
        console.error("Error fetching promo options:", error);
      }
    };

    const fetchSelectOptions = async () => {
      try {
        const [kategoriRes, brandRes] = await Promise.allSettled([
          api("/kategori"),
          api("/brand"),
          api("/brands"),
        ]);

        if (kategoriRes.status === "fulfilled") {
          const resData = kategoriRes.value;
          const items = Array.isArray(resData) ? resData : (resData?.data?.data || resData?.data || []);
          setKategoriOptions(
            items.map((item) => ({ id: item.id, nama: item.nama })),
          );
        }

        if (brandRes.status === "fulfilled") {
          const resData = brandRes.value;
          const items = Array.isArray(resData) ? resData : (resData?.data?.data || resData?.data || []);
          const brands = items;
          console.log("BRANDS API", brands);
          setBrandOptions(items.map((item) => ({ id: item.id, nama: item.nama })));
        }
      } catch (error) {
        console.error("Error fetching brand/category options:", error);
      }
    };

    fetchPromoOptions();
    fetchSelectOptions();
  }, []);

  const handleUpdate = async (slug, data) => {
    try {
      setLoading(true);
      setError("");

      const productData = {
        kategori_id: data.kategori_id ?? null,
        brand_id: data.brand_id ?? null,
        brand: data.brand || "",
        nama: data.name,
        slug: data.slug || undefined,
        deskripsi: data.deskripsi || "",
        deskripsi_detail: data.deskripsi_detail || "",
        harga: Number(data.price),
        stok: Number(data.stock),
        rating: Number(data.rating) || 0,
        adalah_promo: Boolean(data.promoRelation?.length || data.promo),
        gambar: data.gambar || [],
        spesifikasi: data.spesifikasi || [],
        colors: Array.isArray(data.colors)
          ? data.colors
          : data.warna
            ? [data.warna]
            : [],
        color_labels: data.colorLabel || [],
      };

      if (data.imageFiles?.length) {
        const formPayload = new FormData();
        data.imageFiles.forEach((item) => {
          const fileObject = item?.file || item;
          if (fileObject instanceof File) {
            formPayload.append("images[]", fileObject);
          }
        });

        if (formPayload.has("images[]")) {
          const uploadResponse = await productService.uploadProductImages(formPayload);
          const uploadedImages = Array.isArray(uploadResponse.data)
            ? uploadResponse.data.map((item) => item.url)
            : [];
          productData.gambar = [...productData.gambar, ...uploadedImages];
        }
      }

      const payload = productData;
      console.log("PRODUCT PAYLOAD", payload);
      console.log("[Produk admin] update payload", productData);
      await productService.updateProduct(slug, productData);

      await fetchProducts();
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      setError(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      promo: product.promo,
      promoRelation: product.fullData?.promo?.map((promo) => promo.id) || [],
      slug: product.slug,
      deskripsi: product.fullData?.deskripsi || "",
      deskripsi_detail: product.fullData?.deskripsi_detail || "",
      rating: product.fullData?.rating || 0,
      gambar: product.fullData?.gambar?.map((g) => g.url_gambar) || [],
      spesifikasi: product.fullData?.spesifikasi?.map((s) => ({
        atribut: s.atribut,
        detail: s.detail,
      })) || [],
      kategori_id: product.fullData?.kategori?.id ?? null,
      brand_id: product.fullData?.brand?.id ?? null,
      brand: product.fullData?.brand?.nama || "",
    });
  };

  const handleSaveEdit = () => {
    if (editProduct) {
      handleUpdate(editProduct.slug, {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);
      setError("");

      await productService.deleteProduct(deleteId);

      // Refresh products after delete
      await fetchProducts();

      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const productData = {
        kategori_id: formData.kategori_id ?? null,
        brand_id: formData.brand_id ?? null,
        brand: formData.brand || "",
        nama: formData.name,
        slug: undefined,
        deskripsi: formData.description,
        deskripsi_detail: formData.deskripsi_detail || "",
        harga: Number(formData.price),
        stok: Number(formData.stock),
        rating: Number(formData.rating) || 0,
        adalah_promo: Boolean(formData.promoRelation?.length || formData.promo),
        gambar: [],
        spesifikasi: formData.spesifikasi || [],
        colors: Array.isArray(formData.colors)
          ? formData.colors
          : formData.warna
            ? [formData.warna]
            : [],
        color_labels: formData.colorLabel || [],
      };

      const payload = productData;
      console.log("PRODUCT PAYLOAD", payload);
      console.log("[Produk admin] create payload", productData);

      if (formData.imageFiles?.length) {
        const formPayload = new FormData();
        formData.imageFiles.forEach((item) => {
          const fileObject = item?.file || item;
          if (fileObject instanceof File) {
            formPayload.append("images[]", fileObject);
          }
        });

        const uploadResponse = await productService.uploadProductImages(formPayload);
        const uploadedImages = Array.isArray(uploadResponse.data)
          ? uploadResponse.data.map((item) => ({
            path: item.path,
            url: item.url,
          }))
          : [];

        productData.gambar = uploadedImages.map((item) => item.url);
      }

      await productService.createProduct(productData);
      await fetchProducts();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating product:", error);
      setError(error.message || "Failed to create product");
    } finally {
      setLoading(false);
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
      value: totalProducts,
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
        <div className="flex gap-2.5 shrink-0">
          <button
            onClick={() => setShowBrandKategoriModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer hover:opacity-90 hover:-translate-y-px transition-all"
            style={{
              background: "#0e4a8a",
              boxShadow: `0 4px 14px rgba(7,43,80,0.2)`,
            }}
          >
            <Layers size={15} /> Brand & Kategori
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer hover:opacity-90 hover:-translate-y-px transition-all"
            style={{
              background: NAVY,
              boxShadow: `0 4px 14px rgba(7,43,80,0.28)`,
            }}
          >
            <Plus size={15} /> Tambah Produk
          </button>
        </div>
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

      {/* Error Display */}
      {error && (
        <div className="p-4 mb-4 border border-red-200 bg-red-50 rounded-xl">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} color="#dc2626" />
            <span className="font-medium text-red-700">Error: {error}</span>
          </div>
        </div>
      )}

      {/* Loading Display */}
      {loading && (
        <div className="p-4 mb-4 border border-blue-200 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <span className="font-medium text-blue-700">Loading...</span>
          </div>
        </div>
      )}

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
                      image={product.imageUrl}
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
                      {product.brand && product.brand !== "-" ? ` • ${product.brand}` : ""}
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
                        onClick={() => setDeleteId(product.slug)}
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
          onSave={handleCreate}
          brandOptions={brandOptions}
          kategoriOptions={kategoriOptions}
          promoOptions={promoOptions}
        />
      )}
      {showBrandKategoriModal && (
        <AddBrandKategoriModal
          onClose={() => setShowBrandKategoriModal(false)}
          brands={brandOptions}
          setBrands={setBrandOptions}
          kategoris={kategoriOptions}
          setKategoris={setKategoriOptions}
        />
      )}

      {/* Edit Modal */}
      {editProduct && (
        <ProductFormModal
          mode="edit"
          initialData={{
            name: editProduct.name,
            slug: editProduct.slug,
            category: editProduct.category,
            kategori_id: editProduct.fullData?.kategori?.id || 1,
            brand_id: editProduct.fullData?.brand?.id ?? null,
            brand: editProduct.fullData?.brand?.nama || "",
            description: editProduct.fullData?.deskripsi || "",
            deskripsi: editProduct.fullData?.deskripsi || "",
            deskripsi_detail: editProduct.fullData?.deskripsi_detail || "",
            price: String(editProduct.price),
            stock: String(editProduct.stock),
            rating: editProduct.fullData?.rating || 0,
            promo: editProduct.promo,
            promoRelation: editProduct.fullData?.promo?.map((promo) => promo.id) || [],
            colors: editProduct.fullData?.colors || (editProduct.fullData?.warna ? [editProduct.fullData.warna] : []),
            warna: Array.isArray(editProduct.fullData?.colors) ? (editProduct.fullData.colors[0] ?? "") : (editProduct.fullData?.warna || ""),
            colorLabel: editProduct.fullData?.color_labels || [],
            gambar: editProduct.fullData?.gambar?.map((g) => g.url_gambar) || [],
            spesifikasi:
              editProduct.fullData?.spesifikasi?.map((s) => ({
                atribut: s.atribut,
                detail: s.detail,
              })) || [],
          }}
          onClose={() => setEditProduct(null)}
          onSave={(data) => handleUpdate(editProduct.slug, data)}
          brandOptions={brandOptions}
          kategoriOptions={kategoriOptions}
          promoOptions={promoOptions}
        />
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