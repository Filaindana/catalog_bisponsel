import { useEffect, useState } from "react";
import {
  getPromos,
  createPromo,
  updatePromo,
  deletePromo,
} from "../../utils/services/promoService";
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
  Sparkles,
  Activity,
  Clock,
} from "lucide-react";

/* ── Font inject ── */
if (
  typeof document !== "undefined" &&
  !document.querySelector("[data-inter-promo]")
) {
  const s = document.createElement("style");
  s.setAttribute("data-inter-promo", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    .promo-admin, .promo-admin * { font-family:'Inter',sans-serif !important; box-sizing:border-box; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }

    .promo-admin .modal-wrap { animation: scaleIn .22s cubic-bezier(.34,1.3,.64,1) both; }
    .promo-admin .stat-card  { transition: transform .2s, box-shadow .2s; }
    .promo-admin .stat-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(7,43,80,.13); }
    .promo-admin .row-item   { transition: background .13s; }
    .promo-admin .row-item:hover { background: rgba(7,43,80,.03); }
    .promo-admin .action-btn { transition: transform .15s, background .15s; }
    .promo-admin .action-btn:hover { transform: scale(1.1); }
    .promo-admin .input-field:focus { border-color:#072B50 !important; background:#fff !important; box-shadow:0 0 0 3px rgba(7,43,80,.08) !important; }
  `;
  document.head.appendChild(s);
}

const ITEMS_PER_PAGE = 5;
const NAVY = "#072B50";
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
  NAVY,
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

const statusConfig = {
  Aktif: { bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
  Segera: { bg: "#fef9c3", color: "#ca8a04", dot: "#eab308" },
  Berakhir: { bg: "#fee2e2", color: "#dc2626", dot: "#ef4444" },
};

// const fmt = (d) =>
//   new Date(d).toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
const fmt = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
  });
};

const inputCls =
  "input-field w-full px-3.5 py-3 rounded-xl border border-gray-200 text-[13.5px] outline-none text-gray-800 bg-gray-50 transition-all";
const labelCls =
  "block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider";

const Field = ({ label, children }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
  </div>
);

const ModalSection = ({ icon, title }) => (
  <div className="flex items-center gap-2 mt-1 mb-4">
    <div
      className="flex items-center justify-center w-6 h-6 rounded-lg shrink-0"
      style={{ background: "rgba(7,43,80,0.08)" }}
    >
      {icon}
    </div>
    <span
      className="text-[11px] font-extrabold uppercase tracking-widest"
      style={{ color: NAVY }}
    >
      {title}
    </span>
    <div className="flex-1 h-px ml-1 bg-gray-100" />
  </div>
);

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

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.Berakhir;
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

function BannerChip({ color }) {
  return (
    <div
      className="w-21.5 h-13 rounded-xl relative flex items-center justify-center overflow-hidden shrink-0"
      style={{
        background: `linear-gradient(135deg,${color}dd,${color}88)`,
        boxShadow: `0 4px 12px ${color}44`,
      }}
    >
      <div className="absolute w-8 h-8 rounded-full -top-2 -right-2 bg-white/15" />
      <Tag size={16} color="#fff" />
    </div>
  );
}

/* ── Color Picker ── */
function ColorPicker({ value, onChange }) {
  return (
    <div>
      <label className={labelCls}>Warna Banner</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {presetColors.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="w-6 h-6 transition-all duration-150 border-2 rounded-full cursor-pointer"
            style={{
              backgroundColor: c,
              borderColor: value === c ? "#fff" : c,
              boxShadow: value === c ? `0 0 0 2px ${c}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ViewModal({ promo, onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div className="bg-[#FDFDFD] rounded-2xl w-110 overflow-hidden shadow-2xl">
        <div className="relative px-7 py-7 bg-[#072B50]">
          <div className="absolute rounded-full pointer-events-none -top-8 -right-8 w-36 h-36 bg-white/5" />
          <div className="absolute w-16 h-16 rounded-full pointer-events-none -bottom-4 left-4 bg-white/5" />
          <h2 className="text-[18px] font-extrabold text-white m-0 mb-1">
            {promo.name}
          </h2>
          <p className="text-[12.5px] text-white/60 m-0">{promo.desc}</p>
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center w-8 h-8 text-white transition-colors border-none rounded-lg cursor-pointer top-4 right-4 bg-white/10 hover:bg-white/20"
          >
            <X size={14} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4 bg-[#FDFDFD]">
          <div>
            <StatusBadge status={promo.status} />
          </div>
          <div className="rounded-xl bg-[#f0f4f9] border border-[#dce6f0] px-4 py-3.5">
            <p className="text-[10px] font-bold text-[#8a9bb0] uppercase tracking-wider mb-1.5">
              Deskripsi
            </p>
            <p className="text-[13px] text-[#374151] leading-relaxed m-0">
              {promo.fullDesc ||
                promo.desc ||
                "Tidak ada deskripsi tersedia untuk promo ini."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Mulai", value: fmt(promo.startDate) },
              { label: "Selesai", value: fmt(promo.endDate) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-[#dce6f0] bg-[#f0f4f9] px-4 py-3.5"
              >
                <p className="text-[10px] font-bold text-[#8a9bb0] uppercase tracking-wider mb-1.5">
                  {label}
                </p>
                <p className="text-[13.5px] font-bold text-[#072B50] m-0">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function AddModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    desc: "",
    isAktif: true,
    bannerColor: NAVY,
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

  const durasi =
    form.startDate && form.endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(form.endDate) - new Date(form.startDate)) / 86400000 + 1,
          ),
        )
      : null;

  return (
    <Overlay onClose={onClose}>
      <div className="w-135 bg-white rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between py-5 border-b border-gray-100 px-7">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: "rgba(7,43,80,0.08)" }}
            >
              <Zap size={18} style={{ color: NAVY }} />
            </div>
            <div>
              <h2
                className="text-[16px] font-extrabold m-0 mb-0.5"
                style={{ color: NAVY }}
              >
                Tambah Promo Baru
              </h2>
              <p className="text-[11.5px] text-gray-400 m-0">
                Isi semua informasi promo di bawah ini
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

        {/* Body */}
        <div className="flex flex-col flex-1 gap-6 py-6 overflow-y-auto px-7">
          {/* Info */}
          <div>
            <ModalSection
              icon={<Tag size={11} style={{ color: NAVY }} />}
              title="Informasi Promo"
            />
            <div className="flex flex-col gap-4">
              <Field label="Nama Promo">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Flash Sale Akhir Tahun 50%"
                  className={inputCls}
                />
              </Field>
              <Field label="Deskripsi">
                <textarea
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Jelaskan detail penawaran promo..."
                  className={`${inputCls} h-20 resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Periode */}
          <div>
            <ModalSection
              icon={<Calendar size={11} style={{ color: NAVY }} />}
              title="Periode & Status"
            />
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
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
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-100">
                  <Calendar size={13} className="text-blue-500" />
                  <span className="text-[12.5px] font-semibold text-blue-700">
                    Durasi: {durasi} hari
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <p className="text-[13px] font-bold text-gray-800 m-0">
                    Aktifkan Langsung
                  </p>
                  <p className="text-[11px] text-gray-400 m-0 mt-0.5">
                    Promo langsung tampil setelah disimpan
                  </p>
                </div>
                <div
                  onClick={() => setForm({ ...form, isAktif: !form.isAktif })}
                  className="relative h-6 transition-colors duration-200 rounded-full cursor-pointer w-11 shrink-0"
                  style={{ background: form.isAktif ? NAVY : "#e2e8f0" }}
                >
                  <div
                    className="absolute top-0.75 w-4.5 h-4.5 rounded-full bg-white shadow-md transition-all duration-200"
                    style={{ left: form.isAktif ? "22px" : "3px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div>
            <ModalSection
              icon={<Zap size={11} style={{ color: NAVY }} />}
              title="Banner Promo"
            />
            <div className="flex flex-col gap-3.5">
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
                className="flex flex-col items-center gap-2 p-5 transition-all duration-200 border-2 border-dashed cursor-pointer rounded-xl"
                style={{
                  borderColor: dragOver ? NAVY : "#e2e8f0",
                  background: dragOver ? "rgba(7,43,80,0.04)" : "#fafaff",
                }}
              >
                <Upload size={18} color={dragOver ? NAVY : "#9ca3af"} />
                <p className="text-[12.5px] font-semibold text-gray-700 m-0">
                  Upload gambar banner{" "}
                  <span style={{ color: NAVY }}>(opsional)</span>
                </p>
                <p className="text-[11px] text-gray-400 m-0">
                  PNG, JPG — Maks. 2MB · 1200×400px
                </p>
              </div>

              {/* ── Color Picker ── */}
              <ColorPicker
                value={form.bannerColor}
                onChange={(c) => setForm({ ...form, bannerColor: c })}
              />

              {/* Preview */}
              <div className="flex items-center gap-3">
                <BannerChip color={form.bannerColor} />
                <p className="text-[12px] text-gray-400 m-0">
                  Preview warna banner
                </p>
              </div>
            </div>
          </div>

          {/* Produk Terkait */}
          <div>
            <ModalSection
              icon={<Sparkles size={11} style={{ color: NAVY }} />}
              title="Produk Terkait"
            />
            <div className="flex flex-col gap-3">
              <Field label="Cari & Tambah Produk">
                <div className="relative">
                  <Search
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    value={produkSearch}
                    onChange={(e) => setProdukSearch(e.target.value)}
                    placeholder="Ketik nama produk..."
                    className={`${inputCls} pl-9`}
                  />
                  {produkSearch && filteredProduk.length > 0 && (
                    <div className="absolute left-0 right-0 z-10 mt-1 overflow-hidden bg-white border border-gray-100 shadow-xl top-full rounded-xl">
                      {filteredProduk.map((p, i) => (
                        <div
                          key={p}
                          onClick={() => addProduk(p)}
                          className="px-4 py-2.5 text-[13px] text-gray-700 cursor-pointer font-medium hover:bg-gray-50 transition-colors"
                          style={{
                            borderBottom:
                              i < filteredProduk.length - 1
                                ? "1px solid #f1f5f9"
                                : "none",
                          }}
                        >
                          + {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
              {selectedProduk.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedProduk.map((p) => (
                    <span
                      key={p}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-semibold border"
                      style={{
                        background: "rgba(7,43,80,0.06)",
                        color: NAVY,
                        borderColor: "rgba(7,43,80,0.12)",
                      }}
                    >
                      {p}
                      <button
                        onClick={() => removeProduk(p)}
                        className="flex items-center justify-center w-4 h-4 border-none rounded cursor-pointer"
                        style={{
                          background: "rgba(7,43,80,0.12)",
                          color: NAVY,
                        }}
                      >
                        <X size={9} />
                      </button>
                    </span>
                  ))}
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
            className="px-5 py-2.5 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold transition-all hover:opacity-90"
            style={{
              background: NAVY,
              boxShadow: `0 4px 14px rgba(7,43,80,0.3)`,
            }}
          >
            Simpan Promo
          </button>
        </div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════
   MAIN PAGE
══════════════════════════ */
export default function Promo() {
  const [promos, setPromos] = useState([]);
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
    bannerColor: NAVY,
  });

  const totalPages = Math.ceil(promos.length / ITEMS_PER_PAGE);
  const paginated = promos;
  const aktifCount = promos.filter((p) => p.status === "aktif").length;
  const segeraCount = promos.filter((p) => p.status === "segera").length;
  const berakhirCount = promos.filter((p) => p.status === "berakhir").length;

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

  const handleSaveEdit = async () => {
    const updated = await updatePromo(editPromo.id, editForm);

    setPromos((prev) =>
      prev.map((p) => (editPromo && p.id === editPromo.id ? updated : p)),
    );

    setEditPromo(null);
  };

  const handleDelete = async () => {
    await deletePromo(deleteId);
    setPromos((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const handleAddSave = async (data) => {
    const newPromo = await createPromo(data);
    setPromos((prev) => [newPromo, ...prev]);
  };

  const STAT_CARDS = [
    {
      label: "Promo Aktif",
      value: aktifCount,
      icon: <Activity size={18} color="#072B50" />,
      bg: "#e6eef6",
    },
    {
      label: "Segera Mulai",
      value: segeraCount,
      icon: <Clock size={18} color="#072B50" />,
      bg: "#e6eef6",
    },
    {
      label: "Berakhir",
      value: berakhirCount,
      icon: <AlertTriangle size={18} color="#072B50" />,
      bg: "#e6eef6",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPromos();
        setPromos(data); // ⬅️ ini penting
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="promo-admin">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3.5">
          <div>
            <h1
              className="text-[22px] font-extrabold m-0 tracking-tight"
              style={{ color: NAVY }}
            >
              Manajemen Promo
            </h1>
            <p className="text-[12.5px] text-gray-400 m-0 mt-0.5">
              Kelola semua penawaran promo aktif dan mendatang
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px shrink-0"
          style={{
            background: NAVY,
            boxShadow: `0 4px 14px rgba(7,43,80,0.28)`,
          }}
        >
          <Plus size={15} /> Tambah Promo
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
            <Tag size={14} color={NAVY} />
            <span
              className="text-[12.5px] font-bold uppercase tracking-wider"
              style={{ color: NAVY }}
            >
              Daftar Promo
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-160">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Banner", "Nama Promo", "Periode", "Status", "Aksi"].map(
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
              {Array.isArray(paginated) &&
                paginated.map((promo, i) => (
                  <tr
                    key={promo.id}
                    className={`row-item ${i < paginated.length - 1 ? "border-b border-gray-50" : ""}`}
                  >
                    <td className="px-5 py-4">
                      <BannerChip color={promo.bannerColor} />
                    </td>
                    <td className="px-5 py-4">
                      <p
                        className="text-[13.5px] font-bold m-0 mb-0.5"
                        style={{ color: NAVY }}
                      >
                        {promo.name}
                      </p>
                      <p className="text-[11.5px] text-gray-400 m-0">
                        {promo.desc}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar
                          size={12}
                          className="text-gray-300 shrink-0"
                        />
                        <span className="text-[12.5px] text-gray-600 font-medium">
                          {fmt(promo.startDate)} – {fmt(promo.endDate)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={promo.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => setViewPromo(promo)}
                          className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer action-btn"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => openEdit(promo)}
                          className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer action-btn text-amber-600"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteId(promo.id)}
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
            {Math.min(currentPage * ITEMS_PER_PAGE, promos.length)} dari{" "}
            {promos.length} promo
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
      {viewPromo && (
        <ViewModal promo={viewPromo} onClose={() => setViewPromo(null)} />
      )}
      {showAddModal && (
        <AddModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* Edit Modal */}
      {editPromo && (
        <Overlay onClose={() => setEditPromo(null)}>
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
                  Edit Promo
                </h2>
                <p className="text-[11px] text-white/60 m-0">
                  {editPromo.name}
                </p>
              </div>
              <button
                onClick={() => setEditPromo(null)}
                className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-6">
              {[
                { label: "Nama Promo", key: "name" },
                { label: "Deskripsi", key: "desc" },
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
                  { label: "Tanggal Mulai", key: "startDate" },
                  { label: "Tanggal Selesai", key: "endDate" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className={labelCls}>{label}</label>
                    <input
                      type="date"
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
                  <label className={labelCls}>Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                    className={`${inputCls} cursor-pointer`}
                  >
                    <option>Aktif</option>
                    <option>Segera</option>
                    <option>Berakhir</option>
                  </select>
                </div>
                <div>
                  {/* ── Color Picker ── */}
                  <ColorPicker
                    value={editForm.bannerColor}
                    onChange={(c) =>
                      setEditForm({ ...editForm, bannerColor: c })
                    }
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="flex items-center gap-3">
                <BannerChip color={editForm.bannerColor} />
                <p className="text-[12px] text-gray-400 m-0">
                  Preview warna banner
                </p>
              </div>

              <div className="flex gap-2.5 mt-1">
                <button
                  onClick={() => setEditPromo(null)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-2 py-3 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold transition-all hover:opacity-90"
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
                Hapus Promo?
              </h3>
              <p className="text-[12.5px] text-white/80 m-0 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan.
                <br />
                Promo akan dihapus permanen.
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
