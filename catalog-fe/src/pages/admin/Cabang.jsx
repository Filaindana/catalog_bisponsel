import { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Plus,
  X,
  Upload,
  Building2,
  MapPin,
  Clock,
} from "lucide-react";

const inputCls =
  "w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)] text-[14px] outline-none text-[#1e2433] bg-[#f8f9fc] transition-all font-[inherit] focus:border-[rgba(7,43,80,0.35)] focus:bg-white";

const Field = ({ label, children, hint }) => (
  <div>
    <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.08em] mb-2.5">
      {label}
    </label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-1.5">{hint}</p>}
  </div>
);

// eslint-disable-next-line no-unused-vars

const Overlay = ({ onClose, children }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
    style={{ background: "rgba(10,15,30,0.6)", backdropFilter: "blur(4px)" }}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-7 h-7 rounded-[7px] bg-[rgba(7,43,80,0.08)] flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <span className="text-[11px] font-extrabold text-[#072B50] uppercase tracking-[0.08em]">
      {title}
    </span>
    <div className="flex-1 h-[1.5px] bg-[rgba(7,43,80,0.07)] ml-1" />
  </div>
);

function AddCabangModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    mapsLink: "",
    jamBuka: "",
    jamTutup: "",
  });
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className="w-[580px] bg-white rounded-[20px] max-h-[92vh] flex flex-col overflow-hidden border border-[#e8edf5]" style={{ boxShadow: "0 8px 40px rgba(7,43,80,0.18)" }}>

        {/* ── HEADER (navy) ── */}
        <div className="bg-[#072B50] px-7 py-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/20" style={{ background: "rgba(255,255,255,0.12)" }}>
              <Building2 size={20} color="white" />
            </div>
            <div>
              <p className="text-base font-extrabold text-white mb-0.5">Tambah Cabang Baru</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Lengkapi semua informasi cabang</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
              Draft
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/20 cursor-pointer transition-colors hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ── STEP BAR ── */}
        <div className="flex items-center px-7 py-3.5 bg-[#f8fafc] border-b border-slate-200 flex-shrink-0">
          {[
            { num: 1, label: "Foto & Identitas" },
            { num: 2, label: "Jam Operasional" },
            { num: 3, label: "Lokasi" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold ${i === 0 ? "bg-[#072B50] text-white" : "bg-slate-200 text-slate-400"}`}>
                  {s.num}
                </div>
                <span className={`text-xs font-${i === 0 ? "bold" : "medium"} ${i === 0 ? "text-[#072B50]" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="flex-1 h-px bg-slate-200 mx-3" />}
            </div>
          ))}
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 overflow-y-auto px-7 py-6">

          {/* Upload zone */}
          <div className="mb-6">
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-[0.07em] mb-2.5">
              Foto Cabang
            </label>
            {preview ? (
              <div className="relative rounded-[14px] overflow-hidden border border-slate-200" style={{ height: 140 }}>
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => setPreview(null)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-white/90 border border-slate-200 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-white transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <label
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleFileDrop}
                className={`flex items-center gap-5 border-2 border-dashed rounded-[14px] px-6 py-5 cursor-pointer transition-all ${
                  dragOver ? "border-[#072B50] bg-[rgba(7,43,80,0.05)]" : "border-slate-300 bg-[#f8fafc] hover:border-[#072B50] hover:bg-[rgba(7,43,80,0.03)]"
                }`}
              >
                <input type="file" accept="image/*" className="hidden" onChange={handleFileDrop} />
                <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0 transition-colors ${dragOver ? "bg-[#072B50]" : "bg-[#e8edf7]"}`}>
                  {dragOver
                    ? <Upload size={22} color="white" />
                    : <svg width="22" height="22" fill="none" stroke="#072B50" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700 mb-0.5">Seret foto ke sini atau klik untuk memilih</p>
                  <p className="text-xs text-slate-400">PNG, JPG hingga 2MB · Rekomendasi 1200×600px</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 bg-[#072B50] rounded-[9px] flex-shrink-0">
                  <Upload size={12} color="white" />
                  <span className="text-xs font-bold text-white">Pilih File</span>
                </div>
              </label>
            )}
          </div>

          {/* Nama + Kota */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <Field label="Nama Cabang">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Building2 size={14} />
                </div>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Cabang Jakarta Pusat"
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
            <Field label="Kota">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <MapPin size={14} />
                </div>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Jakarta"
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
          </div>

          {/* Jam Operasional — card */}
          <div className="rounded-xl border border-[#dce6f0] bg-[#f0f4fb] px-5 py-4 mb-5">
            <div className="flex items-center gap-2 mb-3.5">
              <Clock size={14} color="#072B50" />
              <span className="text-[11px] font-extrabold text-[#072B50] uppercase tracking-[0.07em]">Jam Operasional</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Jam Buka">
                <input
                  type="time"
                  value={form.jamBuka}
                  onChange={(e) => setForm({ ...form, jamBuka: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Jam Tutup">
                <input
                  type="time"
                  value={form.jamTutup}
                  onChange={(e) => setForm({ ...form, jamTutup: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          {/* Alamat */}
          <div className="mb-4">
            <Field label="Alamat Lengkap">
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Jl. Sudirman No. 123, Jakarta Pusat 10220"
                className={`${inputCls} h-[84px] resize-none leading-relaxed`}
              />
            </Field>
          </div>

          {/* Maps */}
          <Field
            label={
              <span>
                Link Google Maps{" "}
                <span className="normal-case font-medium tracking-normal text-slate-400">(opsional)</span>
              </span>
            }
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <MapPin size={14} />
              </div>
              <input
                value={form.mapsLink}
                onChange={(e) => setForm({ ...form, mapsLink: e.target.value })}
                placeholder="https://maps.google.com/..."
                className={`${inputCls} pl-9`}
              />
            </div>
            {form.mapsLink && (
              <div className="mt-2.5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-[rgba(7,43,80,0.12)] bg-[rgba(7,43,80,0.05)]">
                <MapPin size={13} color="#072B50" className="flex-shrink-0" />
                <span className="text-xs text-[#072B50] font-semibold truncate">{form.mapsLink}</span>
              </div>
            )}
          </Field>
        </div>

        {/* ── FOOTER ── */}
        <div className="px-7 py-4 border-t border-slate-100 bg-[#fafbff] flex items-center justify-between flex-shrink-0">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-slate-400 flex-shrink-0">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
            </svg>
            Semua field wajib diisi kecuali link maps
          </span>
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border-[1.5px] border-slate-200 bg-white text-sm font-bold text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors font-[inherit]"
            >
              Batal
            </button>
            <button
              onClick={() => { onSave(form); onClose(); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-0 bg-[#072B50] text-white text-sm font-bold hover:bg-[#0e3d6e] cursor-pointer transition-colors font-[inherit]"
            >
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Simpan Cabang
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

const initialCabang = [
  { id: 1, name: "Cabang Jakarta Pusat", branchId: "BIZ-JKT-001", city: "Jakarta",  address: "Jl. Jenderal Sudirman No. 123" },
  { id: 2, name: "Cabang Bandung",       branchId: "BIZ-BDG-002", city: "Bandung",  address: "Jl. Asia Afrika No. 45"        },
  { id: 3, name: "Cabang Surabaya",      branchId: "BIZ-SBY-003", city: "Surabaya", address: "Jl. Tunjungan No. 88"          },
];

export default function CabangPage() {
  const [cabangs, setCabangs]         = useState(initialCabang);
  const [search, setSearch]           = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [showModal, setShowModal]     = useState(false);

  const cities   = [...new Set(cabangs.map((c) => c.city))];
  const filtered = cabangs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCity === "All" || c.city === selectedCity)
  );

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[14px] bg-[#072B50] flex items-center justify-center">
            <Building2 size={22} color="#fff" />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-slate-900">Manajemen Cabang</h1>
            <p className="text-[13px] text-slate-400">Kelola semua cabang toko</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#072B50] hover:bg-[#0e4a8a] text-white px-6 py-3 rounded-xl border-0 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(7,43,80,0.3)] transition-all hover:-translate-y-px font-[inherit]"
        >
          <Plus size={16} /> Tambah Cabang
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { icon: <Building2 size={20} color="#fff" />, value: cabangs.length,  label: "Total Cabang" },
          { icon: <MapPin    size={20} color="#fff" />, value: cities.length,   label: "Kota"         },
          { icon: <Eye       size={20} color="#fff" />, value: filtered.length, label: "Ditampilkan"  },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border shadow-sm px-7 py-6 flex items-center gap-5">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-[#072B50] flex items-center justify-center flex-shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-[28px] font-extrabold text-slate-900 leading-none mb-0.5">{s.value}</p>
              <p className="text-[13px] text-slate-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl border shadow-sm flex justify-between items-center px-6 py-4 mb-6">
        <div className="relative w-[300px]">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Cari cabang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2.5 pl-10 pr-4 rounded-[10px] border-[1.5px] border-[#e8edf5] bg-[#f8faff] text-sm outline-none text-slate-800 focus:border-[#072B50] transition-colors"
          />
        </div>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="py-2.5 px-4 rounded-[10px] border-[1.5px] border-[#e8edf5] bg-[#f8faff] text-sm outline-none text-slate-800 cursor-pointer"
        >
          <option value="All">Semua Kota</option>
          {cities.map((city, i) => <option key={i}>{city}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        {/* Table header bar */}
        <div className="bg-[#072B50] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 size={16} color="rgba(255,255,255,0.7)" />
            <span className="text-[11px] font-extrabold text-white uppercase tracking-[0.1em]">
              Katalog Cabang
            </span>
          </div>
          <span className="text-[13px] text-white/60 font-medium">{filtered.length} total cabang</span>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-[#f8faff] border-b-[1.5px] border-slate-100">
              {["Nama", "Kota", "Alamat", "Aksi"].map((h, i) => (
                <th
                  key={i}
                  className={`px-6 py-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.08em] ${i === 3 ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-100 hover:bg-[#fafbff] transition-colors"
              >
                <td className="px-6 py-[18px]">
                  <p className="font-bold text-sm text-slate-900 mb-0.5">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.branchId}</p>
                </td>
                <td className="px-6 py-[18px]">
                  <span className="text-sm font-semibold text-[#072B50]">{item.city}</span>
                </td>
                <td className="px-6 py-[18px] text-sm text-slate-500">{item.address}</td>
                <td className="px-6 py-[18px] text-right">
                  <div className="inline-flex gap-2">
                    <button className="w-9 h-9 rounded-[10px] border-0 bg-[rgba(7,43,80,0.08)] text-[#072B50] cursor-pointer flex items-center justify-center hover:bg-[rgba(7,43,80,0.16)] transition-colors">
                      <Eye size={15} />
                    </button>
                    <button className="w-9 h-9 rounded-[10px] border-0 bg-yellow-100 text-amber-700 cursor-pointer flex items-center justify-center hover:bg-yellow-200 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button className="w-9 h-9 rounded-[10px] border-0 bg-red-100 text-red-600 cursor-pointer flex items-center justify-center hover:bg-red-200 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">
                  Tidak ada cabang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddCabangModal
          onClose={() => setShowModal(false)}
          onSave={(data) =>
            setCabangs([
              ...cabangs,
              {
                id: cabangs.length + 1,
                name: data.name,
                branchId: `BIZ-${data.city.slice(0, 3).toUpperCase()}-${String(cabangs.length + 1).padStart(3, "0")}`,
                city: data.city,
                address: data.address,
              },
            ])
          }
        />
      )}
    </div>
  );
}