import { useEffect, useState } from "react";
import {
  getCabangs,
  createCabang,
  updateCabang,
  deleteCabang,
} from "../../utils/services/cabangService";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  MapPin,
  Clock,
  Building2,
  AlertTriangle,
  Activity,
} from "lucide-react";

/* ── Font inject ── */
if (
  typeof document !== "undefined" &&
  !document.querySelector("[data-inter-cabang]")
) {
  const s = document.createElement("style");
  s.setAttribute("data-inter-cabang", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    .cabang-admin, .cabang-admin * { font-family:'Inter',sans-serif !important; box-sizing:border-box; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }

    .cabang-admin .modal-wrap { animation: scaleIn .22s cubic-bezier(.34,1.3,.64,1) both; }
    .cabang-admin .stat-card  { transition: transform .2s, box-shadow .2s; }
    .cabang-admin .stat-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(7,43,80,.13); }
    .cabang-admin .row-item   { transition: background .13s; }
    .cabang-admin .row-item:hover { background: rgba(7,43,80,.03); }
    .cabang-admin .action-btn { transition: transform .15s, background .15s; }
    .cabang-admin .action-btn:hover { transform: scale(1.1); }
    .cabang-admin .input-field:focus { border-color:#072B50 !important; background:#fff !important; box-shadow:0 0 0 3px rgba(7,43,80,.08) !important; }
  `;
  document.head.appendChild(s);
}

const NAVY = "#072B50";
const ITEMS_PER_PAGE = 5;

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

function BranchChip({ city }) {
  const colors = {
    Jakarta: "#3b82f6",
    Bandung: "#8b5cf6",
    Surabaya: "#0d9488",
    Yogyakarta: "#f59e0b",
    Medan: "#ef4444",
    Semarang: "#ec4899",
  };
  const color = colors[city] || NAVY;
  return (
    <div
      className="w-21.5 h-13 rounded-xl relative flex items-center justify-center overflow-hidden shrink-0"
      style={{
        background: `linear-gradient(135deg,${color}dd,${color}88)`,
        boxShadow: `0 4px 12px ${color}44`,
      }}
    >
      <div className="absolute w-8 h-8 rounded-full -top-2 -right-2 bg-white/15" />
      <Building2 size={16} color="#fff" />
    </div>
  );
}

function ViewModal({ cabang, onClose, onEdit }) {
  return (
    <Overlay onClose={onClose}>
      <div className="bg-[#FDFDFD] rounded-2xl w-110 overflow-hidden shadow-2xl">
        <div className="relative px-7 py-7 bg-[#072B50]">
          <div className="absolute rounded-full pointer-events-none -top-8 -right-8 w-36 h-36 bg-white/5" />
          <div className="absolute w-16 h-16 rounded-full pointer-events-none -bottom-4 left-4 bg-white/5" />
          <h2 className="text-[18px] font-extrabold text-white m-0 mb-1">
            {cabang.name}
          </h2>
          <p className="text-[12.5px] text-white/60 m-0">{cabang.branchId}</p>
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center w-8 h-8 text-white transition-colors border-none rounded-lg cursor-pointer top-4 right-4 bg-white/10 hover:bg-white/20"
          >
            <X size={14} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4 bg-[#FDFDFD]">
          <div className="rounded-xl bg-[#f0f4f9] border border-[#dce6f0] px-4 py-3.5">
            <p className="text-[10px] font-bold text-[#8a9bb0] uppercase tracking-wider mb-1.5">
              Alamat
            </p>
            <p className="text-[13px] text-[#374151] leading-relaxed m-0">
              {cabang.address || "—"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Kota", value: cabang.city },
              {
                label: "Jam Operasional",
                value:
                  cabang.jamBuka && cabang.jamTutup
                    ? `${cabang.jamBuka} – ${cabang.jamTutup}`
                    : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-[#dce6f0] bg-[#f0f4f9] px-4 py-3.5"
              >
                <p className="text-[10px] font-bold text-[#8a9bb0] uppercase tracking-wider mb-1.5">
                  {label}
                </p>
                <p className="text-[13.5px] font-bold text-[#072B50] m-0">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>
          {cabang.mapsLink && (
            <a
              href={cabang.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-100 no-underline"
            >
              <MapPin size={13} className="text-blue-500 shrink-0" />
              <span className="text-[12.5px] font-semibold text-blue-700 truncate">
                {cabang.mapsLink}
              </span>
            </a>
          )}
          <div className="flex gap-2.5 mt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13.5px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={onEdit}
              className="flex-2 py-2.5 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold transition-all hover:opacity-90"
              style={{
                background: NAVY,
                boxShadow: `0 4px 14px rgba(7,43,80,0.3)`,
              }}
            >
              Edit Cabang
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function CabangFormModal({ onClose, onSave, initial = null }) {
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial ?? {
      branchId: "",
      name: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      mapsLink: "",
      jamBuka: "",
      jamTutup: "",
    },
  );
  // keep form in sync if `initial` prop changes (edit flow)
  useEffect(() => {
    // normalize incoming `initial` which may be in backend (snake_case) or frontend shape
    const normalized = {
      branchId: initial?.kode ?? initial?.branchId ?? "",
      name: initial?.nama ?? initial?.name ?? "",
      city: initial?.kota ?? initial?.city ?? "",
      address: initial?.alamat ?? initial?.address ?? "",
      phone: initial?.telepon ?? initial?.phone ?? "",
      email: initial?.email ?? initial?.email ?? "",
      mapsLink: initial?.maps_link ?? initial?.mapsLink ?? "",
      jamBuka: initial?.jam_buka ?? initial?.jamBuka ?? "",
      jamTutup: initial?.jam_tutup ?? initial?.jamTutup ?? "",
    };

    setForm(initial ? normalized : {
      branchId: "",
      name: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      mapsLink: "",
      jamBuka: "",
      jamTutup: "",
    });
  }, [initial]);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(initial?.image ?? null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPreview(initial?.foto_url ?? initial?.image ?? initial?.foto ?? null);
  }, [initial]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

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
              <Building2 size={18} style={{ color: NAVY }} />
            </div>
            <div>
              <h2
                className="text-[16px] font-extrabold m-0 mb-0.5"
                style={{ color: NAVY }}
              >
                {isEdit ? "Edit Cabang" : "Tambah Cabang Baru"}
              </h2>
              <p className="text-[11.5px] text-gray-400 m-0">
                {isEdit
                  ? "Perbarui informasi cabang"
                  : "Lengkapi semua informasi cabang"}
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
          {/* Foto */}
          <div>
            <ModalSection
              icon={<Upload size={11} style={{ color: NAVY }} />}
              title="Foto Cabang"
            />
            {preview ? (
              <div className="relative h-32 overflow-hidden border border-gray-200 rounded-xl">
                <img
                  src={preview}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setPhotoFile(null);
                  }}
                  className="absolute flex items-center justify-center text-gray-500 border border-gray-200 rounded-lg cursor-pointer top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                className="flex items-center gap-4 px-5 py-4 transition-all border-2 border-dashed cursor-pointer rounded-xl"
                style={{
                  borderColor: dragOver ? NAVY : "#e2e8f0",
                  background: dragOver ? "rgba(7,43,80,0.04)" : "#fafaff",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileDrop}
                />
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl shrink-0">
                  <Upload size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-700 m-0">
                    Seret foto ke sini atau klik untuk memilih
                  </p>
                  <p className="text-[11px] text-gray-400 m-0 mt-0.5">
                    PNG, JPG — Maks. 2MB
                  </p>
                </div>
              </label>
            )}
          </div>

          {/* Info */}
          <div>
            <ModalSection
              icon={<Building2 size={11} style={{ color: NAVY }} />}
              title="Informasi Cabang"
            />
            <div className="flex flex-col gap-4">
              <Field label="Nama Cabang">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Cabang Surabaya"
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Kode Cabang">
                  <input
                    value={form.branchId}
                    onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                    placeholder="BIZ-JKT-001"
                    className={inputCls}
                  />
                </Field>
                <Field label="Telepon">
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+628112345678"
                    className={inputCls}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="cabang@bizponsel.com"
                    className={inputCls}
                  />
                </Field>
                <Field label="Kota">
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Jakarta"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Alamat Lengkap">
                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Jl. Sudirman No. 123, Jakarta Pusat 10220"
                  className={`${inputCls} h-20 resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Jam */}
          <div>
            <ModalSection
              icon={<Clock size={11} style={{ color: NAVY }} />}
              title="Jam Operasional"
            />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Jam Buka">
                <input
                  type="time"
                  value={form.jamBuka}
                  onChange={(e) =>
                    setForm({ ...form, jamBuka: e.target.value })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Jam Tutup">
                <input
                  type="time"
                  value={form.jamTutup}
                  onChange={(e) =>
                    setForm({ ...form, jamTutup: e.target.value })
                  }
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          {/* Maps */}
          <div>
            <ModalSection
              icon={<MapPin size={11} style={{ color: NAVY }} />}
              title="Google Maps"
            />
            <Field label="Link Google Maps (opsional)">
              <div className="relative">
                <MapPin
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={form.mapsLink}
                  onChange={(e) =>
                    setForm({ ...form, mapsLink: e.target.value })
                  }
                  placeholder="https://maps.google.com/..."
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-7 py-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer text-[13.5px] font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={async () => {
              setIsSaving(true);
              try {
                // send frontend-shaped payload: service will map to backend keys
                console.log("Submitting form:", form, "photoFile:", photoFile);
                await onSave({ ...form, foto: photoFile });
                onClose();
              } catch (err) {
                console.error(err);
              } finally {
                setIsSaving(false);
              }
            }}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl border-none text-white cursor-pointer text-[13.5px] font-bold transition-all hover:opacity-90"
            style={{
              background: NAVY,
              boxShadow: `0 4px 14px rgba(7,43,80,0.3)`,
            }}
          >
            {isSaving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Cabang"}
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export default function CabangPage() {
  const [cabangs, setCabangs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const totalPages = Math.ceil(cabangs.length / ITEMS_PER_PAGE);
  const paginated = cabangs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const cities = [...new Set(cabangs.map((c) => c.city))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCabangs();

        // mapping backend → frontend
        const mapped = data.map((c) => ({
          id: c.id,
          name: c.nama,
          branchId: c.kode,
          city: c.kota,
          address: c.alamat,
          phone: c.telepon || "",
          email: c.email || "",
          jamBuka: c.jam_buka || "",
          jamTutup: c.jam_tutup || "",
          mapsLink: c.maps_link || "",
          image: c.foto_url || null,
        }));

        setCabangs(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (data) => {
    try {
      console.log("handleAdd data:", data);
      const res = await createCabang(data);
      console.log("handleAdd response:", res);

      const newCabang = {
        id: res.data.id,
        name: res.data.nama,
        branchId: res.data.kode,
        city: res.data.kota,
        address: res.data.alamat,
        phone: res.data.telepon || "",
        email: res.data.email || "",
        jamBuka: res.data.jam_buka || "",
        jamTutup: res.data.jam_tutup || "",
        mapsLink: res.data.maps_link || "",
        image: res.data.foto_url || null,
      };

      setCabangs((prev) => [...prev, newCabang]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleEdit = async (data) => {
    try {
      console.log("handleEdit id:", editItem?.id, "data:", data);
      const res = await updateCabang(editItem.id, data);
      console.log("handleEdit response:", res);

      setCabangs((prev) =>
        prev.map((c) =>
          c.id === editItem.id
            ? {
                ...c,
                name: res.data.nama,
                branchId: res.data.kode,
                city: res.data.kota,
                address: res.data.alamat,
                phone: res.data.telepon || "",
                email: res.data.email || "",
                jamBuka: res.data.jam_buka || "",
                jamTutup: res.data.jam_tutup || "",
                mapsLink: res.data.maps_link || "",
                image: res.data.foto_url || null,
              }
            : c,
        ),
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCabang(deleteId);

      setCabangs((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const STAT_CARDS = [
    {
      label: "Total Cabang",
      value: cabangs.length,
      icon: <Building2 size={18} color={NAVY} />,
      bg: "#e6eef6",
    },
    {
      label: "Kota",
      value: cities.length,
      icon: <MapPin size={18} color={NAVY} />,
      bg: "#e6eef6",
    },
    {
      label: "Ditampilkan",
      value: cabangs.length,
      icon: <Activity size={18} color={NAVY} />,
      bg: "#e6eef6",
    },
  ];

  return (
    <div className="cabang-admin">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1
            className="text-[22px] font-extrabold m-0 tracking-tight"
            style={{ color: NAVY }}
          >
            Manajemen Cabang
          </h1>
          <p className="text-[12.5px] text-gray-400 m-0 mt-0.5">
            Kelola semua cabang toko aktif dan informasinya
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px shrink-0"
          style={{
            background: NAVY,
            boxShadow: `0 4px 14px rgba(7,43,80,0.28)`,
          }}
        >
          <Plus size={15} /> Tambah Cabang
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
            <Building2 size={14} color={NAVY} />
            <span
              className="text-[12.5px] font-bold uppercase tracking-wider"
              style={{ color: NAVY }}
            >
              Daftar Cabang
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-160">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Ikon", "Nama Cabang", "Kota & Jam", "Alamat", "Aksi"].map(
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
              {paginated.map((item, i) => (
                <tr
                  key={item.id}
                  className={`row-item ${i < paginated.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <td className="px-5 py-4">
                    <BranchChip city={item.city} />
                  </td>
                  <td className="px-5 py-4">
                    <p
                      className="text-[13.5px] font-bold m-0 mb-0.5"
                      style={{ color: NAVY }}
                    >
                      {item.name}
                    </p>
                    <p className="text-[11.5px] text-gray-400 m-0">
                      {item.branchId}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p
                      className="text-[13px] font-semibold m-0 mb-0.5"
                      style={{ color: NAVY }}
                    >
                      {item.city}
                    </p>
                    {item.jamBuka && item.jamTutup && (
                      <div className="flex items-center gap-1">
                        <Clock size={11} className="text-gray-300" />
                        <span className="text-[11.5px] text-gray-400">
                          {item.jamBuka} – {item.jamTutup}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-[12.5px] text-gray-600">
                      {item.address}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex gap-1.5 justify-end">
                      <button
                        onClick={() => setViewItem(item)}
                        className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer action-btn"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => setEditItem(item)}
                        className="flex items-center justify-center w-8 h-8 border-none rounded-lg cursor-pointer action-btn text-amber-600"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
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
            {Math.min(currentPage * ITEMS_PER_PAGE, cabangs.length)} dari{" "}
            {cabangs.length} cabang
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
      {viewItem && (
        <ViewModal
          cabang={viewItem}
          onClose={() => setViewItem(null)}
          onEdit={() => {
            setEditItem(viewItem);
            setViewItem(null);
          }}
        />
      )}
      {showAdd && (
        <CabangFormModal
          onClose={() => setShowAdd(false)}
          onSave={async (data) => {
            await handleAdd(data);
            setShowAdd(false);
          }}
        />
      )}
      {editItem && (
        <CabangFormModal
          initial={editItem}
          onClose={() => setEditItem(null)}
          onSave={async (data) => {
            await handleEdit(data);
            setEditItem(null);
          }}
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
                Hapus Cabang?
              </h3>
              <p className="text-[12.5px] text-white/80 m-0 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan.
                <br />
                Cabang akan dihapus permanen.
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
