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
  Activity,
  Clock,
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
const presetColors = [
  "#072B50",
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

const inputCls =
  "w-full px-3.5 py-[11px] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)] text-[13px] outline-none text-[#1e2433] bg-[#f8f9fc] transition-all font-[inherit] focus:border-[#072B50] focus:bg-white";
const labelCls =
  "block text-[11px] font-extrabold text-gray-500 mb-[7px] uppercase tracking-[0.8px]";
const labelSmCls =
  "block text-[11px] font-extrabold text-gray-400 mb-1.5 uppercase tracking-[0.8px]";

const Field = ({ label, children, hint }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-[5px] mb-0">{hint}</p>}
  </div>
);

const Overlay = ({ onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-[rgba(10,15,30,0.65)] backdrop-blur-md z-[1000] flex items-center justify-center p-4"
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

// ===================== MODAL VIEW =====================
function ViewPromoModal({ promo, onClose }) {
  const cfg = statusConfig[promo.status] || statusConfig.Berakhir;
  return (
    <Overlay onClose={onClose}>
      <div className="bg-white rounded-3xl w-[460px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="h-[140px] bg-[#072B50] relative flex items-center justify-center overflow-hidden">
          <div className="absolute -top-8 -right-8 w-[140px] h-[140px] rounded-full bg-white/[0.06]" />
          <div className="absolute -bottom-5 left-5 w-[80px] h-[80px] rounded-full bg-white/[0.04]" />
          <div className="text-center relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-2.5">
              <Tag size={24} color="#fff" />
            </div>
            <span className="text-xs font-extrabold text-white/90 uppercase tracking-[2px] bg-black/15 px-3 py-1 rounded-full">
              PROMO
            </span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 bg-white/15 border-none rounded-[10px] w-[34px] h-[34px] cursor-pointer text-white flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-7 pt-6 pb-7">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-[20px] font-extrabold text-[#1e2433] mb-1.5">
                {promo.name}
              </h2>
              <p className="text-[13px] text-gray-500 m-0">{promo.desc}</p>
            </div>
            <span
              className="flex items-center gap-1.5 px-3.5 py-[5px] rounded-full text-xs font-bold shrink-0 ml-3"
              style={{ background: cfg.bg, color: cfg.color }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: cfg.dot }}
              />
              {cfg.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              {
                label: "Tanggal Mulai",
                value: formatDate(promo.startDate),
                icon: <Calendar size={14} color="#072B50" />,
              },
              {
                label: "Tanggal Selesai",
                value: formatDate(promo.endDate),
                icon: <Clock size={14} color="#072B50" />,
              },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="px-4 py-3.5 bg-[rgba(7,43,80,0.07)] rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)]"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {icon}
                  <p className="text-[11px] text-gray-400 font-bold m-0 uppercase tracking-[0.5px]">
                    {label}
                  </p>
                </div>
                <p className="text-[14px] font-bold text-[#072B50] m-0">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="px-4 py-3.5 bg-[rgba(7,43,80,0.07)] rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] mb-5 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-[10px] shrink-0"
              style={{ background: promo.bannerColor }}
            />
            <div>
              <p className="text-[11px] text-gray-400 font-bold mb-0.5 uppercase tracking-[0.5px]">
                Warna Banner
              </p>
              <p className="text-[13px] font-bold text-[#072B50] m-0">
                {promo.bannerColor.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] bg-white cursor-pointer text-[14px] font-bold text-gray-700 font-[inherit]"
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
    bannerColor: "#072B50",
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

  const durasi =
    form.startDate && form.endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(form.endDate) - new Date(form.startDate)) /
              (1000 * 60 * 60 * 24) +
              1,
          ),
        )
      : null;

  return (
    <Overlay onClose={onClose}>
      <div className="bg-white rounded-3xl w-[540px] max-h-[90vh] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#072B50] px-8 pt-7 pb-6 relative overflow-hidden">
          <div className="absolute -top-5 -right-5 w-[120px] h-[120px] rounded-full bg-white/5 z-0" />
          <div className="absolute -bottom-8 right-20 w-[80px] h-[80px] rounded-full bg-white/[0.04] z-0" />

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center">
                <Zap size={20} color="#fff" />
              </div>
              <div>
                <h2 className="text-[18px] font-extrabold text-white mb-0.5">
                  Tambah Promo Baru
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
            <div className="flex flex-col gap-[18px]">
              <Field label="Nama Promo">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Flash Sale Akhir Tahun 50%"
                  className={inputCls}
                />
              </Field>
              <Field label="Deskripsi Promo">
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Jelaskan detail penawaran promo ini..."
                  className={`${inputCls} h-[90px] resize-none leading-relaxed`}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3.5">
                <Field label="Tanggal Mulai">
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className={inputCls}
                  />
                </Field>
                <Field label="Tanggal Selesai">
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className={inputCls}
                  />
                </Field>
              </div>
              {durasi !== null && (
                <div className="px-4 py-3 bg-[rgba(7,43,80,0.07)] rounded-xl border-[1.5px] border-[rgba(7,43,80,0.15)] flex items-center gap-2.5">
                  <Calendar size={16} color="#072B50" />
                  <span className="text-[13px] font-semibold text-[#072B50]">
                    Durasi: {durasi} hari
                  </span>
                </div>
              )}
              <div className="px-4 py-4 bg-[#f8f9fc] rounded-2xl border-[1.5px] border-[rgba(7,43,80,0.15)] flex justify-between items-center">
                <div>
                  <p className="text-[13px] font-bold text-[#1e2433] mb-0.5">
                    Aktifkan Langsung
                  </p>
                  <p className="text-xs text-gray-400 m-0">
                    Promo langsung tampil setelah disimpan
                  </p>
                </div>
                <div
                  onClick={() => setForm({ ...form, isAktif: !form.isAktif })}
                  className="relative w-12 h-[26px] rounded-full cursor-pointer shrink-0 transition-colors duration-250"
                  style={{ background: form.isAktif ? "#072B50" : "#e2e8f0" }}
                >
                  <div
                    className="absolute top-[3px] w-5 h-5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-250"
                    style={{ left: form.isAktif ? "25px" : "3px" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <p className={labelCls}>Preview Banner</p>
                <div
                  className="h-[100px] rounded-2xl relative flex items-center justify-center overflow-hidden border-[1.5px] border-[rgba(7,43,80,0.15)]"
                  style={{
                    background: `linear-gradient(135deg, ${form.bannerColor}ee, ${form.bannerColor}88)`,
                  }}
                >
                  <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-full bg-white/10" />
                  <p className="text-[16px] font-extrabold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.2)] m-0">
                    {form.name || "Nama Promo"}
                  </p>
                </div>
              </div>

              <div>
                <p className={labelCls}>Pilih Warna Banner</p>
                <div className="flex flex-wrap gap-2.5 mb-3.5">
                  {presetColors.map((c) => (
                    <div
                      key={c}
                      onClick={() => setForm({ ...form, bannerColor: c })}
                      className="w-9 h-9 rounded-[10px] cursor-pointer transition-transform hover:scale-[1.15]"
                      style={{
                        background: c,
                        border:
                          form.bannerColor === c
                            ? "3px solid #1e2433"
                            : "3px solid transparent",
                        boxShadow:
                          form.bannerColor === c ? `0 0 0 2px ${c}55` : "none",
                      }}
                    />
                  ))}
                  <div className="w-9 h-9 rounded-[10px] overflow-hidden border-[1.5px] border-[rgba(7,43,80,0.15)] cursor-pointer relative">
                    <input
                      type="color"
                      value={form.bannerColor}
                      onChange={(e) =>
                        setForm({ ...form, bannerColor: e.target.value })
                      }
                      className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer border-none p-0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className={labelCls}>Upload Gambar Banner (Opsional)</p>
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
                  className={`border-2 border-dashed rounded-2xl py-8 px-5 flex flex-col items-center gap-2.5 cursor-pointer transition-all ${dragOver ? "border-[#072B50] bg-[rgba(7,43,80,0.07)]" : "border-[rgba(7,43,80,0.15)] bg-[#fafaff]"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dragOver ? "bg-[#072B50]" : "bg-[rgba(7,43,80,0.07)]"}`}
                  >
                    <Upload size={22} color={dragOver ? "#fff" : "#072B50"} />
                  </div>
                  <p className="text-[14px] font-bold text-[#1e2433] m-0">
                    Drag & drop atau{" "}
                    <span className="text-[#072B50]">klik upload</span>
                  </p>
                  <p className="text-xs text-gray-400 m-0">
                    PNG, JPG — Maks. 2MB • Rekomendasi 1200×400px
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <p className={labelCls}>Cari & Tambah Produk</p>
                <div className="relative">
                  <Search
                    size={14}
                    color="#9ca3af"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  />
                  <input
                    value={produkSearch}
                    onChange={(e) => setProdukSearch(e.target.value)}
                    placeholder="Ketik nama produk..."
                    className={`${inputCls} pl-[38px]`}
                  />
                  {produkSearch && filteredProduk.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border-[1.5px] border-[rgba(7,43,80,0.15)] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-10 mt-1.5 overflow-hidden">
                      {filteredProduk.map((p, i) => (
                        <div
                          key={p}
                          onClick={() => addProduk(p)}
                          className="px-4 py-[11px] text-[13px] text-gray-700 cursor-pointer font-semibold hover:bg-[rgba(7,43,80,0.07)] hover:text-[#072B50]"
                          style={{
                            borderBottom:
                              i < filteredProduk.length - 1
                                ? "1px solid rgba(7,43,80,0.07)"
                                : "none",
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
                  <p className={labelCls}>
                    Produk Terpilih ({selectedProduk.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduk.map((p) => (
                      <span
                        key={p}
                        className="flex items-center gap-2 px-3 py-[7px] bg-[rgba(7,43,80,0.07)] rounded-[10px] text-[13px] font-bold text-[#072B50] border-[1.5px] border-[rgba(7,43,80,0.15)]"
                      >
                        {p}
                        <button
                          onClick={() => removeProduk(p)}
                          className="bg-[rgba(7,43,80,0.15)] border-none rounded-md w-[18px] h-[18px] cursor-pointer text-[#072B50] flex items-center justify-center p-0 shrink-0"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {form.name && (
                <div className="bg-[rgba(7,43,80,0.07)] rounded-2xl p-5 border-[1.5px] border-[rgba(7,43,80,0.15)]">
                  <p className="text-[11px] font-extrabold text-[#072B50] mb-3.5 uppercase tracking-[0.8px]">
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
                    <div key={label} className="flex justify-between mb-2">
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className="text-xs font-bold text-[#072B50] max-w-[60%] text-right">
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
              className="flex-1 py-3.5 rounded-xl border-none bg-gradient-to-br from-emerald-500 to-emerald-600 text-white cursor-pointer text-[14px] font-bold shadow-[0_4px_15px_rgba(16,185,129,0.35)] font-[inherit]"
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
    bannerColor: "#072B50",
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
      <div className="mb-7">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-10 h-10 rounded-xl bg-[#072B50] flex items-center justify-center shadow-[0_4px_12px_rgba(7,43,80,0.3)]">
                <Zap size={20} color="#fff" />
              </div>
              <h1 className="text-[26px] font-extrabold text-[#072B50] m-0 tracking-[-0.5px]">
                Manajemen Promo
              </h1>
            </div>
            <p className="text-[14px] text-gray-500 m-0 pl-[52px]">
              Kelola semua penawaran promo aktif dan mendatang.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#072B50] text-white border-none cursor-pointer text-[14px] font-bold shadow-[0_4px_16px_rgba(7,43,80,0.3)] font-[inherit]"
          >
            <Plus size={16} /> Tambah Promo
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "Promo Aktif",
              value: aktifCount,
              icon: <Activity size={20} color="#fff" />,
            },
            {
              label: "Segera Mulai",
              value: segeraCount,
              icon: <Clock size={20} color="#fff" />,
            },
            {
              label: "Berakhir",
              value: berakhirCount,
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
            <Tag size={16} color="#fff" />
            <span className="text-[13px] font-bold text-white uppercase tracking-[0.8px]">
              Daftar Promo
            </span>
          </div>
          <span className="text-xs font-semibold text-white/70">
            {promos.length} total promo
          </span>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#fafbff] border-b-[1.5px] border-[rgba(7,43,80,0.15)]">
              {["BANNER", "NAMA PROMO", "PERIODE", "STATUS", "AKSI"].map(
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
            {paginated.map((promo, i) => {
              const cfg = statusConfig[promo.status] || statusConfig.Berakhir;
              return (
                <tr
                  key={promo.id}
                  className={`transition-colors hover:bg-[rgba(7,43,80,0.07)] ${i < paginated.length - 1 ? "border-b border-[#f8f9fc]" : ""}`}
                >
                  <td className="px-[18px] py-4">
                    <div
                      className="w-[88px] h-[54px] rounded-xl relative flex items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${promo.bannerColor}ee, ${promo.bannerColor}77)`,
                        boxShadow: `0 4px 12px ${promo.bannerColor}44`,
                      }}
                    >
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/15" />
                      <Tag size={18} color="#fff" />
                    </div>
                  </td>
                  <td className="px-[18px] py-4">
                    <p className="text-[14px] font-bold text-[#072B50] mb-1">
                      {promo.name}
                    </p>
                    <p className="text-xs text-gray-400 m-0">{promo.desc}</p>
                  </td>
                  <td className="px-[18px] py-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} color="#9ca3af" />
                      <span className="text-[13px] text-gray-700 font-medium">
                        {formatDate(promo.startDate)} –{" "}
                        {formatDate(promo.endDate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-[18px] py-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-xs font-bold"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ background: cfg.dot }}
                      />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-[18px] py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setViewPromo(promo)}
                        className="w-[34px] h-[34px] rounded-[10px] border-none bg-[rgba(7,43,80,0.07)] text-[#072B50] cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => openEdit(promo)}
                        className="w-[34px] h-[34px] rounded-[10px] border-none bg-yellow-50 text-yellow-600 cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(promo.id)}
                        className="w-[34px] h-[34px] rounded-[10px] border-none bg-red-50 text-red-500 cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-5 py-4 border-t-[1.5px] border-[rgba(7,43,80,0.15)] bg-[#fafbff]">
          <p className="text-[13px] text-gray-400 m-0">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, promos.length)} dari{" "}
            {promos.length} promo
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
          <div className="bg-white rounded-[20px] w-[480px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
            <div className="bg-[#072B50] px-7 py-6 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Pencil size={18} color="#fff" />
              </div>
              <div>
                <h2 className="text-[16px] font-extrabold text-white m-0">
                  Edit Promo
                </h2>
                <p className="text-xs text-white/70 m-0">{editPromo.name}</p>
              </div>
              <button
                onClick={() => setEditPromo(null)}
                className="ml-auto bg-white/15 border-none rounded-lg w-8 h-8 cursor-pointer text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-7 flex flex-col gap-4">
              {[
                { label: "Nama Promo", key: "name" },
                { label: "Deskripsi", key: "desc" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className={labelSmCls}>{label}</label>
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
                  { label: "Tanggal Mulai", key: "startDate", type: "date" },
                  { label: "Tanggal Selesai", key: "endDate", type: "date" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className={labelSmCls}>{label}</label>
                    <input
                      type={type}
                      value={editForm[key]}
                      onChange={(e) =>
                        setEditForm({ ...editForm, [key]: e.target.value })
                      }
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelSmCls}>Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Segera">Segera</option>
                    <option value="Berakhir">Berakhir</option>
                  </select>
                </div>
                <div>
                  <label className={labelSmCls}>Warna Banner</label>
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-[#f8f9fc] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)]">
                    <input
                      type="color"
                      value={editForm.bannerColor}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          bannerColor: e.target.value,
                        })
                      }
                      className="w-9 h-9 rounded-lg border-none cursor-pointer p-0 bg-transparent"
                    />
                    <span className="text-[13px] font-bold text-gray-700">
                      {editForm.bannerColor.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  onClick={() => setEditPromo(null)}
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
                Hapus Promo?
              </h3>
              <p className="text-[13px] text-white/85 m-0 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan.
                <br />
                Promo akan dihapus permanen.
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
