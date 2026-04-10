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
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Camera,
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
const labelCls =
  "block text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.08em] mb-2";
const hintCls = "text-[11px] text-gray-400 mt-1.5 mb-0";

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
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
    />
  </div>
);

const Overlay = ({ onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-[rgba(4,10,24,0.72)] backdrop-blur-[6px] z-[1000] flex items-center justify-center p-4"
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
              cls: "text-[#072B50]",
            },
            {
              label: "Stok",
              value: `${product.stock} Unit`,
              cls: "text-emerald-600",
            },
          ].map(({ label, value, cls }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.12)] text-center"
            >
              <p className="text-[11px] text-gray-400 font-bold mb-1.5 uppercase tracking-[0.8px]">
                {label}
              </p>
              <p className={`text-[15px] font-extrabold m-0 ${cls}`}>{value}</p>
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
              className={`flex justify-between items-center px-4 py-3 rounded-[10px] border-[1.5px] ${product.promo ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
            >
              <span className="text-[13px] text-gray-500 font-medium">
                Status Promo
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${product.promo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
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
const STEPS = [
  { id: 1, label: "Info Produk", icon: Info },
  { id: 2, label: "Foto & Media", icon: Camera },
  { id: 3, label: "Harga & Stok", icon: DollarSign },
];

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

  return (
    <Overlay onClose={onClose}>
      <div className="w-[640px] bg-white rounded-3xl max-h-[92vh] flex flex-col shadow-[0_48px_120px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-br from-[#072B50] via-[#0e4a8a] to-[#1a6fc4] px-8 pt-7 pb-6 relative overflow-hidden shrink-0">
          {/* decorative circles */}
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/[0.05]" />
          <div className="absolute -bottom-5 left-[40%] w-20 h-20 rounded-full bg-white/[0.04]" />

          {/* Title row */}
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-[46px] h-[46px] rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-white m-0 tracking-tight">
                  Tambah Produk Baru
                </h2>
                <p className="text-[12px] text-white/60 mt-0.5 m-0">
                  Langkah {step} dari {STEPS.length} — {STEPS[step - 1].label}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-[10px] border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Step indicators */}
          <div className="relative z-10 flex items-center">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div
                  key={s.id}
                  className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
                      ${done ? "bg-emerald-500" : active ? "bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.2)]" : "bg-white/15 border-[1.5px] border-white/25"}`}
                    >
                      {done ? (
                        <Check
                          size={16}
                          className="text-white"
                          strokeWidth={3}
                        />
                      ) : (
                        <Icon
                          size={15}
                          className={
                            active ? "text-[#072B50]" : "text-white/70"
                          }
                        />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold whitespace-nowrap tracking-wide
                      ${active ? "text-white" : done ? "text-emerald-300" : "text-white/45"}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-0.5 bg-white/15 mx-2 mb-5 rounded overflow-hidden">
                      <div
                        className={`h-full bg-emerald-500 transition-all duration-400 ${done ? "w-full" : "w-0"}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border-[1.5px] border-blue-200 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#072B50] flex items-center justify-center shrink-0">
                  <Info size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#072B50] m-0 mb-0.5">
                    Informasi Dasar Produk
                  </p>
                  <p className="text-[12px] text-blue-500 m-0">
                    Isi nama, kategori, brand, dan deskripsi produk Anda.
                  </p>
                </div>
              </div>

              <div>
                <label className={labelCls}>Nama Produk</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: iPhone 15 Pro Max 256GB Natural Titanium"
                  className={inputCls}
                />
                <p className={hintCls}>
                  Gunakan nama yang jelas dan deskriptif
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Kategori</label>
                  <CustomSelect
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    options={kategoriOptions}
                    placeholder="Pilih kategori..."
                  />
                </div>
                <div>
                  <label className={labelCls}>Brand</label>
                  <CustomSelect
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    options={brandOptions}
                    placeholder="Pilih brand..."
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Deskripsi Produk</label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Jelaskan fitur unggulan, keunggulan, dan detail penting produk ini..."
                  className={`${inputCls} resize-none leading-relaxed h-[100px]`}
                />
                <p className={hintCls}>
                  Min. 50 karakter untuk deskripsi yang baik
                </p>
              </div>

              <div>
                <label className={labelCls}>Spesifikasi</label>
                <textarea
                  value={form.spesifikasi}
                  onChange={(e) =>
                    setForm({ ...form, spesifikasi: e.target.value })
                  }
                  placeholder={
                    "- Chipset: A17 Pro Bionic\n- RAM: 8GB\n- Storage: 256GB NVMe"
                  }
                  className={`${inputCls} resize-none font-mono text-xs leading-[1.7] h-[88px]`}
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-4 border-[1.5px] border-purple-200 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
                  <Camera size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-violet-800 m-0 mb-0.5">
                    Foto & Media Produk
                  </p>
                  <p className="text-[12px] text-violet-500 m-0">
                    Upload minimal 1 foto berkualitas tinggi untuk produk ini.
                  </p>
                </div>
              </div>

              {/* Upload zone */}
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
                className={`rounded-2xl border-2 border-dashed px-6 py-10 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200
                  ${dragOver ? "border-violet-500 bg-violet-50/50" : "border-[rgba(7,43,80,0.18)] bg-[#fafaff]"}`}
              >
                <div
                  className={`w-16 h-16 rounded-[18px] flex items-center justify-center transition-all duration-200
                  ${dragOver ? "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_8px_24px_rgba(124,58,237,0.3)]" : "bg-[rgba(7,43,80,0.07)]"}`}
                >
                  <Upload
                    size={26}
                    className={dragOver ? "text-white" : "text-[#072B50]"}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-bold text-[#1e2433] m-0 mb-1">
                    Drag & drop foto produk di sini
                  </p>
                  <p className="text-[13px] text-gray-400 m-0 mb-4">
                    atau klik tombol di bawah untuk memilih file
                  </p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#072B50] to-[#0e4a8a] rounded-[10px] shadow-[0_4px_14px_rgba(7,43,80,0.25)]">
                    <Upload size={14} className="text-white" />
                    <span className="text-[13px] font-bold text-white">
                      Pilih File
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 m-0">
                  PNG, JPG, WebP · Maks. 5MB per file · Min. 800×800px
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.08em] mb-1">
                    File Terupload ({uploadedFiles.length})
                  </p>
                  {uploadedFiles.map((file, i) => (
                    <div
                      key={i}
                      className="bg-[#f8f9fc] rounded-2xl flex items-center gap-3.5 p-4 border-[1.5px] border-[rgba(7,43,80,0.1)] transition-all"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                        ${file.progress === 100 ? "bg-gradient-to-br from-green-100 to-emerald-100" : "bg-[rgba(7,43,80,0.07)]"}`}
                      >
                        {file.progress === 100 ? (
                          <Check
                            size={18}
                            className="text-emerald-600"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <ImageIcon size={18} className="text-[#072B50]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-2">
                          <p className="text-[13px] font-bold text-[#1e2433] m-0 truncate max-w-[200px]">
                            {file.name}
                          </p>
                          <span
                            className={`text-[12px] font-bold shrink-0 ${file.progress === 100 ? "text-emerald-600" : "text-[#072B50]"}`}
                          >
                            {file.progress === 100
                              ? "✓ Selesai"
                              : `${file.progress}%`}
                          </span>
                        </div>
                        <div className="h-[5px] bg-[#e8eaf0] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${file.progress === 100 ? "bg-gradient-to-r from-emerald-500 to-green-600" : "bg-gradient-to-r from-[#072B50] to-[#1a6fc4]"}`}
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1.5 m-0">
                          {file.size}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setUploadedFiles(
                            uploadedFiles.filter((_, idx) => idx !== i),
                          )
                        }
                        className="w-[30px] h-[30px] rounded-lg border-none bg-red-100 cursor-pointer text-red-600 flex items-center justify-center shrink-0"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-[1.5px] border-green-200 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                  <DollarSign size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-emerald-900 m-0 mb-0.5">
                    Harga, Stok & Varian
                  </p>
                  <p className="text-[12px] text-emerald-600 m-0">
                    Tetapkan harga jual, stok, dan pilihan warna produk.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      className={`${inputCls} pl-10`}
                    />
                  </div>
                  {form.price && (
                    <div className="mt-2 px-3 py-2 bg-[rgba(7,43,80,0.06)] rounded-lg inline-flex items-center gap-1.5">
                      <Layers size={12} className="text-[#072B50]" />
                      <span className="text-[12px] text-[#072B50] font-bold">
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
                      className={`mt-2 px-3 py-2 rounded-lg inline-flex items-center gap-1.5 ${Number(form.stock) < 10 ? "bg-red-50" : "bg-emerald-50"}`}
                    >
                      {Number(form.stock) < 10 ? (
                        <AlertTriangle size={12} className="text-red-500" />
                      ) : (
                        <Check size={12} className="text-emerald-500" />
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

              <div>
                <label className={labelCls}>Pilihan Warna</label>
                <CustomSelect
                  value={form.warna}
                  onChange={(e) => setForm({ ...form, warna: e.target.value })}
                  options={warnaOptions}
                  placeholder="Pilih warna..."
                />
              </div>

              {form.warna && (
                <div className="flex items-center gap-3 bg-[#f8f9fc] rounded-xl border-[1.5px] border-[rgba(7,43,80,0.12)] px-4 py-3.5">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-black/10 shadow-md shrink-0"
                    style={{ background: warnaMap[form.warna] || "#e5e7eb" }}
                  />
                  <span className="text-[13px] font-bold text-gray-700">
                    {form.warna}
                  </span>
                  <span className="text-[12px] text-gray-400">dipilih</span>
                  <div className="ml-auto bg-green-100 px-2.5 py-1 rounded-full">
                    <span className="text-[11px] font-bold text-green-700">
                      ✓ Siap
                    </span>
                  </div>
                </div>
              )}

              {(form.name || form.price || form.stock) && (
                <div className="bg-gradient-to-br from-[#072B50] to-[#0e4a8a] rounded-2xl p-5">
                  <p className="text-[11px] font-extrabold text-white/50 uppercase tracking-[0.08em] mb-3.5">
                    Ringkasan Produk
                  </p>
                  <div className="flex flex-col gap-2.5">
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
                        className="flex justify-between items-center"
                      >
                        <span className="text-[12px] text-white/50 font-semibold">
                          {label}
                        </span>
                        <span className="text-[13px] text-white font-bold max-w-[220px] text-right truncate">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 border-t-[1.5px] border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl border-[1.5px] border-slate-200 bg-white cursor-pointer text-[14px] font-bold text-slate-500 font-[inherit]"
          >
            <ArrowLeft size={15} />
            {step === 1 ? "Batal" : "Kembali"}
          </button>

          <div className="flex gap-1.5">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${step === s.id ? "w-5 bg-[#072B50]" : step > s.id ? "w-1.5 bg-[#072B50]" : "w-1.5 bg-slate-200"}`}
              />
            ))}
          </div>

          {step < STEPS.length ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-6 py-3 rounded-xl border-none bg-gradient-to-r from-[#072B50] to-[#0e4a8a] text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_14px_rgba(7,43,80,0.3)] font-[inherit]"
            >
              Lanjut <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => {
                onSave(form);
                onClose();
              }}
              className="flex items-center gap-1.5 px-6 py-3 rounded-xl border-none bg-gradient-to-r from-emerald-600 to-green-700 text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_14px_rgba(5,150,105,0.35)] font-[inherit]"
            >
              <Check size={15} strokeWidth={3} /> Simpan Produk
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
      <div className="mb-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-10 h-10 rounded-xl bg-[#072B50] flex items-center justify-center shadow-[0_4px_12px_rgba(7,43,80,0.3)]">
                <Package size={20} className="text-white" />
              </div>
              <h1 className="text-[26px] font-extrabold text-[#072B50] m-0 tracking-tight">
                Daftar Produk
              </h1>
            </div>
            <p className="text-[14px] text-gray-500 m-0 pl-[52px]">
              Kelola inventaris dan katalog produk Anda di sini.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#072B50] text-white px-6 py-3 rounded-xl border-none text-[14px] font-bold cursor-pointer shadow-[0_4px_14px_rgba(7,43,80,0.3)] hover:bg-[#0e4a8a] hover:-translate-y-px transition-all"
          >
            <Plus size={16} /> Tambah Produk
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            {
              label: "Total Produk",
              value: products.length,
              icon: <Package size={20} className="text-white" />,
            },
            {
              label: "Produk Promo",
              value: promoCount,
              icon: <Tag size={20} className="text-white" />,
            },
            {
              label: "Stok Menipis",
              value: lowStockCount,
              icon: <AlertTriangle size={20} className="text-white" />,
            },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border-[1.5px] border-[rgba(7,43,80,0.15)] flex items-center gap-5 p-7"
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
        <div className="bg-[#072B50] flex items-center justify-between px-7 py-5">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-white" />
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
                    className={`text-[11px] font-extrabold text-gray-400 tracking-[0.8px] px-6 py-[18px] ${h === "AKSI" ? "text-right" : "text-left"}`}
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
                className={`transition-colors hover:bg-[rgba(7,43,80,0.04)] ${i < paginated.length - 1 ? "border-b border-[#f8f9fc]" : ""}`}
              >
                <td className="px-6 py-5">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(7,43,80,0.07)] flex items-center justify-center text-2xl border-[1.5px] border-[rgba(7,43,80,0.15)]">
                    {product.image}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-[14px] font-bold text-[#072B50] mb-0.5 m-0">
                    {product.name}
                  </p>
                  <span className="text-[11px] font-bold text-gray-400 bg-[#f1f3f8] px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-5 text-[14px] font-bold text-[#072B50]">
                  {formatPrice(product.price)}
                </td>
                <td className="px-6 py-5">
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
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${product.promo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                  >
                    {product.promo ? "Ya" : "Tidak"}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
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

        <div className="flex justify-between items-center border-t-[1.5px] border-[rgba(7,43,80,0.15)] bg-[#fafbff] px-7 py-[18px]">
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
            <div className="bg-[#072B50] px-7 py-6 flex items-center gap-3.5">
              <div className="w-[42px] h-[42px] rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Pencil size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-[16px] font-extrabold text-white m-0">
                  Edit Produk
                </h2>
                <p className="text-[12px] text-white/65 mt-0.5 m-0">
                  {editProduct.name}
                </p>
              </div>
              <button
                onClick={() => setEditProduct(null)}
                className="bg-white/15 border-none rounded-[10px] w-[34px] h-[34px] cursor-pointer text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-8 flex flex-col gap-5">
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
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setEditProduct(null)}
                  className="flex-1 py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-[2] py-3.5 rounded-xl border-none bg-[#072B50] text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_14px_rgba(7,43,80,0.3)] font-[inherit]"
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
                <AlertTriangle size={30} className="text-white" />
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
            <div className="flex gap-3 p-7">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3.5 rounded-xl border-none bg-gradient-to-r from-red-500 to-red-600 text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_14px_rgba(239,68,68,0.35)] font-[inherit]"
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
