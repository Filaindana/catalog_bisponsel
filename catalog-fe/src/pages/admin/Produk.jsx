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
  "w-full px-3.5 py-[11px] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)] text-[13px] outline-none text-[#1e2433] bg-[#f8f9fc] transition-all font-[inherit] focus:border-[#072B50] focus:bg-white";

const Field = ({ label, children, hint }) => (
  <div>
    <label className="block text-[11px] font-extrabold text-gray-500 mb-[7px] uppercase tracking-[0.8px]">
      {label}
    </label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-[5px] mb-0">{hint}</p>}
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
      <div className="bg-white rounded-3xl w-[580px] max-h-[90vh] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#072B50] px-8 py-7 relative">
          <div className="absolute -top-5 -right-5 w-[120px] h-[120px] rounded-full bg-white/5 z-0" />
          <div className="absolute -bottom-8 right-[60px] w-[80px] h-[80px] rounded-full bg-white/[0.04] z-0" />

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <Package size={20} color="#fff" />
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-white mb-0.5">
                  Tambah Produk Baru
                </h2>
                <p className="text-xs text-white/60 m-0">
                  Langkah {step} dari {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white/15 border-none rounded-[10px] w-9 h-9 cursor-pointer text-white flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          {/* Steps */}
          <div className="flex items-center relative z-10">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}
              >
                <div
                  onClick={() => step > s.id && setStep(s.id)}
                  className={`flex items-center gap-2 ${step > s.id ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${step >= s.id ? "bg-white border-white/60" : "bg-white/20 border-transparent"}`}
                  >
                    {step > s.id ? (
                      <Check size={14} color="#072B50" strokeWidth={3} />
                    ) : (
                      <span
                        className={`flex ${step === s.id ? "text-[#072B50]" : "text-white/50"}`}
                      >
                        {s.icon}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold whitespace-nowrap ${step >= s.id ? "text-white" : "text-white/45"}`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 rounded-sm ${step > s.id ? "bg-white/70" : "bg-white/20"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
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
              <div className="grid grid-cols-2 gap-4">
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
                  className={`${inputCls} h-[110px] resize-none leading-relaxed`}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-[11px] ${form.description.length >= 50 ? "text-emerald-500" : "text-gray-400"}`}
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
                  className={`${inputCls} h-[110px] resize-none font-mono text-xs leading-[1.7]`}
                />
              </Field>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
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
                className={`border-2 border-dashed rounded-2xl py-12 px-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${dragOver ? "border-[#072B50] bg-[rgba(7,43,80,0.07)]" : "border-[rgba(7,43,80,0.15)] bg-[#fafaff]"}`}
              >
                <div
                  className={`w-16 h-16 rounded-[18px] flex items-center justify-center ${dragOver ? "bg-[#072B50]" : "bg-[rgba(7,43,80,0.07)]"}`}
                >
                  <Upload size={26} color={dragOver ? "#fff" : "#072B50"} />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-bold text-[#1e2433] mb-1.5">
                    Drag & drop foto produk ke sini
                  </p>
                  <p className="text-[13px] text-gray-500 mb-4">atau</p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#072B50] rounded-[10px]">
                    <Upload size={14} color="#fff" />
                    <span className="text-[13px] font-bold text-white">
                      Pilih File
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 m-0">
                  PNG, JPG, WebP — Maks. 5MB per file • Min. 800×800px
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div>
                  <p className="text-[11px] font-extrabold text-gray-500 mb-3 uppercase tracking-[0.8px]">
                    File Terupload ({uploadedFiles.length})
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {uploadedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="bg-[#f8f9fc] rounded-xl px-4 py-3.5 flex items-center gap-3.5 border-[1.5px] border-[rgba(7,43,80,0.15)]"
                      >
                        <div
                          className={`w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 ${file.progress === 100 ? "bg-[#d1fae5]" : "bg-[rgba(7,43,80,0.07)]"}`}
                        >
                          {file.progress === 100 ? (
                            <Check size={18} color="#059669" strokeWidth={3} />
                          ) : (
                            <ImageIcon size={18} color="#072B50" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between mb-1.5">
                            <p className="text-[13px] font-bold text-[#1e2433] m-0 truncate max-w-[200px]">
                              {file.name}
                            </p>
                            <span
                              className={`text-xs font-bold ${file.progress === 100 ? "text-[#059669]" : "text-[#072B50]"}`}
                            >
                              {file.progress === 100
                                ? "✓ Selesai"
                                : `${file.progress}%`}
                            </span>
                          </div>
                          <div className="h-[5px] bg-[#e8eaf0] rounded-sm">
                            <div
                              className="h-full rounded-sm"
                              style={{
                                width: `${file.progress}%`,
                                background:
                                  file.progress === 100 ? "#10b981" : "#072B50",
                              }}
                            />
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1 mb-0">
                            {file.size}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setUploadedFiles(
                              uploadedFiles.filter((_, idx) => idx !== i),
                            )
                          }
                          className="bg-[#fee2e2] border-none rounded-lg w-[30px] h-[30px] cursor-pointer text-red-500 flex items-center justify-center shrink-0"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[rgba(7,43,80,0.07)] rounded-xl p-4 border-[1.5px] border-[rgba(7,43,80,0.15)]">
                <p className="text-xs font-extrabold text-[#072B50] mb-2 uppercase tracking-[0.5px]">
                  💡 Tips Foto Produk
                </p>
                {[
                  "Gunakan latar belakang putih atau netral",
                  "Pastikan pencahayaan merata dan cerah",
                  "Upload minimal 3 foto dari sudut berbeda",
                ].map((tip, i, arr) => (
                  <p
                    key={i}
                    className={`text-xs text-[#072B50] ${i < arr.length - 1 ? "mb-1" : "m-0"}`}
                  >
                    • {tip}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div className="bg-[rgba(7,43,80,0.07)] rounded-2xl p-5 border-[1.5px] border-[rgba(7,43,80,0.15)]">
                <p className="text-[11px] font-extrabold text-[#072B50] mb-4 uppercase tracking-[0.8px]">
                  💰 Informasi Harga
                </p>
                <div className="grid grid-cols-2 gap-3.5">
                  <Field label="Harga Jual (Rp)">
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-bold text-gray-500">
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
                      <p className="text-xs text-[#072B50] font-semibold mt-[5px] mb-0">
                        {formatPrice(Number(form.price))}
                      </p>
                    )}
                  </Field>
                  <Field label="Jumlah Stok">
                    <div className="relative">
                      <input
                        type="number"
                        value={form.stock}
                        onChange={(e) =>
                          setForm({ ...form, stock: e.target.value })
                        }
                        placeholder="0"
                        className={`${inputCls} pr-[50px]`}
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                        Unit
                      </span>
                    </div>
                    {form.stock && (
                      <p
                        className={`text-xs font-semibold mt-[5px] mb-0 ${Number(form.stock) < 10 ? "text-red-500" : "text-emerald-500"}`}
                      >
                        {Number(form.stock) < 10
                          ? "⚠ Stok hampir habis"
                          : "✓ Stok aman"}
                      </p>
                    )}
                  </Field>
                </div>
              </div>

              <div className="bg-[#f8f9fc] rounded-2xl p-5 border-[1.5px] border-[rgba(7,43,80,0.15)]">
                <p className="text-[11px] font-extrabold text-gray-500 mb-4 uppercase tracking-[0.8px]">
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
                  <div className="flex items-center gap-2 mt-3 px-3.5 py-2.5 bg-white rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)]">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-[#e8eaf0]"
                      style={{ background: warnaMap[form.warna] || "#e5e7eb" }}
                    />
                    <span className="text-[13px] font-semibold text-gray-700">
                      {form.warna}
                    </span>
                    <span className="text-xs text-gray-400">dipilih</span>
                  </div>
                )}
              </div>

              {(form.name || form.price || form.stock) && (
                <div className="bg-[#f0fdf4] rounded-2xl p-5 border-[1.5px] border-[#bbf7d0]">
                  <p className="text-[11px] font-extrabold text-[#059669] mb-3.5 uppercase tracking-[0.8px]">
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
                    <div key={label} className="flex justify-between mb-2">
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className="text-xs font-bold text-[#1e2433] max-w-[60%] text-right truncate">
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
        <div className="px-8 py-5 border-t-[1.5px] border-[rgba(7,43,80,0.15)] flex gap-3 shrink-0 bg-[#fafbff]">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
            >
              ← Kembali
            </button>
          )}
          {step === 1 && (
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
            >
              Batal
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3.5 rounded-xl border-none bg-[#072B50] text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_15px_rgba(7,43,80,0.3)] font-[inherit]"
            >
              Lanjut → {steps[step].label}
            </button>
          ) : (
            <button
              onClick={() => {
                onSave(form);
                onClose();
              }}
              className="flex-1 py-3.5 rounded-xl border-none bg-gradient-to-br from-emerald-500 to-emerald-600 text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_15px_rgba(16,185,129,0.35)] font-[inherit]"
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
      <div className="mb-7">
        <div className="flex justify-between items-start mb-6">
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
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#072B50] text-white border-none cursor-pointer text-[14px] font-bold shadow-[0_4px_16px_rgba(7,43,80,0.3)] font-[inherit]"
          >
            <Plus size={16} /> Tambah Produk
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-3 gap-4">
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
              className="bg-white rounded-2xl p-5 border-[1.5px] border-[rgba(7,43,80,0.15)] flex items-center gap-4"
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
        <div className="bg-[#072B50] px-5 py-4 flex items-center justify-between">
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
                    className={`px-[18px] py-3.5 text-[11px] font-extrabold text-gray-400 tracking-[0.8px] ${h === "AKSI" ? "text-right" : "text-left"}`}
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
                <td className="px-[18px] py-4">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(7,43,80,0.07)] flex items-center justify-center text-2xl border-[1.5px] border-[rgba(7,43,80,0.15)]">
                    {product.image}
                  </div>
                </td>
                <td className="px-[18px] py-4">
                  <p className="text-[14px] font-bold text-[#072B50] mb-0.5">
                    {product.name}
                  </p>
                  <span className="text-[11px] font-bold text-gray-400 bg-[#f1f3f8] px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </td>
                <td className="px-[18px] py-4 text-[14px] font-bold text-[#072B50]">
                  {formatPrice(product.price)}
                </td>
                <td className="px-[18px] py-4">
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
                <td className="px-[18px] py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${product.promo ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#fee2e2] text-[#dc2626]"}`}
                  >
                    {product.promo ? "Ya" : "Tidak"}
                  </span>
                </td>
                <td className="px-[18px] py-4 text-right">
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
        <div className="flex justify-between items-center px-5 py-4 border-t-[1.5px] border-[rgba(7,43,80,0.15)] bg-[#fafbff]">
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
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Pencil size={18} color="#fff" />
              </div>
              <div>
                <h2 className="text-[16px] font-extrabold text-white m-0">
                  Edit Produk
                </h2>
                <p className="text-xs text-white/70 m-0">{editProduct.name}</p>
              </div>
              <button
                onClick={() => setEditProduct(null)}
                className="ml-auto bg-white/15 border-none rounded-lg w-8 h-8 cursor-pointer text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-7 flex flex-col gap-4">
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
              <div className="flex gap-3">
                <button
                  onClick={() => setEditProduct(null)}
                  className="flex-1 py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-[2] py-3.5 rounded-xl border-none bg-[#072B50] text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_15px_rgba(7,43,80,0.3)] font-[inherit]"
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
            <div className="px-7 py-6 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3.5 rounded-xl border-none bg-gradient-to-br from-red-500 to-red-600 text-white cursor-pointer text-[14px] font-bold font-[inherit]"
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
