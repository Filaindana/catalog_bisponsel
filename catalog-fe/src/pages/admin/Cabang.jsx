import { useState } from "react";
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
} from "lucide-react";

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none text-slate-800 bg-slate-50 transition-all font-[inherit] focus:border-slate-400 focus:bg-white placeholder:text-slate-400";

const Field = ({ label, children, hint }) => (
  <div>
    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
      {label}
    </label>
    {children}
    {hint && <p className="text-[11px] text-slate-400 mt-1.5">{hint}</p>}
  </div>
);

const Overlay = ({ onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

function CabangFormModal({ onClose, onSave, initial = null }) {
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial ?? {
      name: "",
      city: "",
      address: "",
      mapsLink: "",
      jamBuka: "",
      jamTutup: "",
    },
  );
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(initial?.photo ?? null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file && file.type.startsWith("image/"))
      setPreview(URL.createObjectURL(file));
  };

  return (
    <Overlay onClose={onClose}>
      <div className="w-[560px] bg-white rounded-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-xl">
        <div className="bg-[#072B50] px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-base font-bold text-white">
              {isEdit ? "Edit Cabang" : "Tambah Cabang Baru"}
            </p>
            <p className="text-xs text-white/50 mt-0.5">
              {isEdit
                ? "Perbarui informasi cabang"
                : "Lengkapi informasi cabang"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 text-white/70 hover:bg-white/10 transition-colors cursor-pointer bg-transparent"
          >
            <X size={13} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <Field label="Foto Cabang">
            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 h-32">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setPreview(null)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white cursor-pointer"
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
                className={`flex items-center gap-4 border-2 border-dashed rounded-xl px-5 py-4 cursor-pointer transition-all ${dragOver ? "border-[#072B50]/40 bg-[#072B50]/5" : "border-slate-200 bg-slate-50 hover:border-slate-300"}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileDrop}
                />
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Upload size={18} className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-600">
                    Seret foto ke sini atau klik untuk memilih
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    PNG, JPG hingga 2MB
                  </p>
                </div>
              </label>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Cabang">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Cabang Jakarta Pusat"
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

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={13} className="text-slate-400" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Jam Operasional
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
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

          <Field label="Alamat Lengkap">
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Jl. Sudirman No. 123, Jakarta Pusat 10220"
              className={`${inputCls} h-20 resize-none`}
            />
          </Field>

          <Field label="Link Google Maps (opsional)">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <MapPin size={14} className="text-slate-400" />
              </div>
              <input
                value={form.mapsLink}
                onChange={(e) => setForm({ ...form, mapsLink: e.target.value })}
                placeholder="https://maps.google.com/..."
                className={`${inputCls} pl-9`}
              />
            </div>
            {form.mapsLink && (
              <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50">
                <MapPin size={12} className="text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-500 truncate">
                  {form.mapsLink}
                </span>
              </div>
            )}
          </Field>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between flex-shrink-0">
          <p className="text-xs text-slate-400">
            Semua field wajib diisi kecuali link maps
          </p>
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors font-[inherit]"
            >
              Batal
            </button>
            <button
              onClick={() => {
                onSave({ ...form, photo: preview });
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#072B50] text-white text-sm font-semibold hover:bg-[#0e3d6e] cursor-pointer transition-colors border-0 font-[inherit]"
            >
              {isEdit ? "Simpan Perubahan" : "Simpan Cabang"}
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function ViewCabangModal({ cabang, onClose, onEdit }) {
  return (
    <Overlay onClose={onClose}>
      <div className="w-[480px] bg-white rounded-2xl flex flex-col overflow-hidden border border-slate-200 shadow-xl">
        <div className="bg-[#072B50] px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-base font-bold text-white">Detail Cabang</p>
            <p className="text-xs text-white/50 mt-0.5">{cabang.branchId}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 text-white/70 hover:bg-white/10 transition-colors cursor-pointer bg-transparent"
          >
            <X size={13} />
          </button>
        </div>
        {cabang.photo ? (
          <div className="h-40 bg-slate-100 flex-shrink-0">
            <img
              src={cabang.photo}
              alt={cabang.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-32 bg-slate-50 flex items-center justify-center border-b border-slate-100 flex-shrink-0">
            <Building2 size={32} className="text-slate-200" />
          </div>
        )}
        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Nama Cabang</p>
            <p className="text-sm font-semibold text-slate-900">
              {cabang.name || "—"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Kota</p>
              <p className="text-sm font-semibold text-slate-900">
                {cabang.city || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Jam Operasional</p>
              <p className="text-sm font-semibold text-slate-900">
                {cabang.jamBuka && cabang.jamTutup
                  ? `${cabang.jamBuka} – ${cabang.jamTutup}`
                  : "—"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Alamat</p>
            <p className="text-sm font-semibold text-slate-900">
              {cabang.address || "—"}
            </p>
          </div>
          {cabang.mapsLink && (
            <div>
              <p className="text-xs text-slate-400 mb-1">Google Maps</p>
              <a
                href={cabang.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#072B50] font-semibold underline underline-offset-2 break-all"
              >
                {cabang.mapsLink}
              </a>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors font-[inherit]"
          >
            Tutup
          </button>
          <button
            onClick={onEdit}
            className="px-5 py-2.5 rounded-xl bg-[#072B50] text-white text-sm font-semibold hover:bg-[#0e3d6e] cursor-pointer transition-colors border-0 font-[inherit]"
          >
            Edit Cabang
          </button>
        </div>
      </div>
    </Overlay>
  );
}

function DeleteModal({ cabang, onClose, onConfirm }) {
  return (
    <Overlay onClose={onClose}>
      <div className="w-[400px] bg-white rounded-2xl flex flex-col overflow-hidden border border-slate-200 shadow-xl">
        <div className="px-6 pt-6 pb-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={22} className="text-red-400" />
          </div>
          <p className="text-base font-bold text-slate-900 mb-1.5">
            Hapus Cabang?
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Apakah kamu yakin ingin menghapus{" "}
            <span className="font-semibold text-slate-700">{cabang.name}</span>?
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div className="px-6 pb-5 flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors font-[inherit]"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm(cabang.id);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 cursor-pointer transition-colors border-0 font-[inherit]"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </Overlay>
  );
}

const initialCabang = [
  {
    id: 1,
    name: "Cabang Jakarta Pusat",
    branchId: "BIZ-JKT-001",
    city: "Jakarta",
    address: "Jl. Jenderal Sudirman No. 123",
    jamBuka: "08:00",
    jamTutup: "17:00",
    mapsLink: "",
    photo: null,
  },
  {
    id: 2,
    name: "Cabang Bandung",
    branchId: "BIZ-BDG-002",
    city: "Bandung",
    address: "Jl. Asia Afrika No. 45",
    jamBuka: "09:00",
    jamTutup: "18:00",
    mapsLink: "",
    photo: null,
  },
  {
    id: 3,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88",
    jamBuka: "08:30",
    jamTutup: "17:30",
    mapsLink: "",
    photo: null,
  },
];

export default function CabangPage() {
  const [cabangs, setCabangs] = useState(initialCabang);
  const [showAdd, setShowAdd] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const cities = [...new Set(cabangs.map((c) => c.city))];

  const handleAdd = (data) => {
    setCabangs([
      ...cabangs,
      {
        id: Date.now(),
        name: data.name,
        branchId: `BIZ-${data.city.slice(0, 3).toUpperCase()}-${String(cabangs.length + 1).padStart(3, "0")}`,
        city: data.city,
        address: data.address,
        jamBuka: data.jamBuka,
        jamTutup: data.jamTutup,
        mapsLink: data.mapsLink,
        photo: data.photo ?? null,
      },
    ]);
  };

  const handleEdit = (data) => {
    setCabangs(
      cabangs.map((c) =>
        c.id === editItem.id
          ? { ...c, ...data, photo: data.photo ?? c.photo }
          : c,
      ),
    );
  };

  const handleDelete = (id) => {
    setCabangs(cabangs.filter((c) => c.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-7">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Manajemen Cabang</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Kelola semua cabang toko
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#072B50] hover:bg-[#0e3d6e] text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-0 transition-colors font-[inherit]"
        >
          <Plus size={15} />
          Tambah Cabang
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            icon: <Building2 size={18} color="white" />,
            value: cabangs.length,
            label: "Total Cabang",
          },
          {
            icon: <MapPin size={18} color="white" />,
            value: cities.length,
            label: "Kota",
          },
          {
            icon: <Eye size={18} color="white" />,
            value: cabangs.length,
            label: "Ditampilkan",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 px-6 py-5 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-[#072B50] flex items-center justify-center flex-shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 leading-none">
                {s.value}
              </p>
              <p className="text-sm text-slate-400 mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#072B50] px-6 py-3.5 flex items-center justify-between">
          <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">
            Katalog Cabang
          </span>
          <span className="text-xs text-white/50">
            {cabangs.length} total cabang
          </span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Nama", "Kota", "Alamat", "Aksi"].map((h, i) => (
                <th
                  key={i}
                  className={`px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest ${i === 3 ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cabangs.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-sm text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.branchId}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-[#072B50]">
                    {item.city}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {item.address}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="inline-flex gap-1.5">
                    <button
                      onClick={() => setViewItem(item)}
                      className="w-8 h-8 rounded-lg border-0 bg-slate-100 text-slate-500 cursor-pointer flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      onClick={() => setEditItem(item)}
                      className="w-8 h-8 rounded-lg border-0 bg-amber-50 text-amber-500 cursor-pointer flex items-center justify-center hover:bg-amber-100 transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteItem(item)}
                      className="w-8 h-8 rounded-lg border-0 bg-red-50 text-red-400 cursor-pointer flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {cabangs.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-slate-400 text-sm"
                >
                  Tidak ada cabang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <CabangFormModal
          onClose={() => setShowAdd(false)}
          onSave={(data) => {
            handleAdd(data);
            setShowAdd(false);
          }}
        />
      )}
      {viewItem && (
        <ViewCabangModal
          cabang={viewItem}
          onClose={() => setViewItem(null)}
          onEdit={() => {
            setEditItem(viewItem);
            setViewItem(null);
          }}
        />
      )}
      {editItem && (
        <CabangFormModal
          initial={editItem}
          onClose={() => setEditItem(null)}
          onSave={(data) => {
            handleEdit(data);
            setEditItem(null);
          }}
        />
      )}
      {deleteItem && (
        <DeleteModal
          cabang={deleteItem}
          onClose={() => setDeleteItem(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
