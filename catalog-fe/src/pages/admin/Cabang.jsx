import { useState } from "react";
import { Eye, Pencil, Trash2, Plus, X, Upload, Building2, MapPin, Clock } from "lucide-react";

const inputCls =
  "w-full px-4 py-[13px] rounded-[10px] border-[1.5px] border-[rgba(7,43,80,0.15)] text-[14px] outline-none text-[#1e2433] bg-[#f8f9fc] transition-all font-[inherit] focus:border-[#072B50] focus:bg-white";

const Field = ({ label, children, hint }) => (
  <div>
    <label style={{ display: "block", fontSize: "11px", fontWeight: 800, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
      {label}
    </label>
    {children}
    {hint && <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "6px", marginBottom: 0 }}>{hint}</p>}
  </div>
);

const Overlay = ({ onClose, children }) => (
  <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,15,30,0.6)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

function AddCabangModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", city: "", address: "", mapsLink: "", jamBuka: "", jamTutup: "" });
  const [dragOver, setDragOver] = useState(false);

  const SectionTitle = ({ icon, title }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
      <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "rgba(7,43,80,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ fontSize: "11px", fontWeight: 800, color: "#072B50", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</span>
      <div style={{ flex: 1, height: "1.5px", background: "rgba(7,43,80,0.07)", marginLeft: "4px" }} />
    </div>
  );

  return (
    <Overlay onClose={onClose}>
      <div style={{ width: "560px", background: "#fff", borderRadius: "20px", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 40px 100px rgba(0,0,0,0.3)", overflow: "hidden" }}>

        {/* HEADER */}
        <div style={{ padding: "24px 32px", borderBottom: "1.5px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(7,43,80,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={20} color="#072B50" />
            </div>
            <div>
              <h2 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", margin: "0 0 3px" }}>Tambah Cabang Baru</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>Isi semua informasi cabang di bawah ini</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: "34px", height: "34px", borderRadius: "8px", border: "1.5px solid #e8edf5", background: "#f8faff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
            <X size={16} />
          </button>
        </div>

        {/* BODY */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>

          {/* Upload Banner */}
          <SectionTitle icon={<Upload size={13} color="#072B50" />} title="Foto Cabang" />
          <div style={{ marginBottom: "28px" }}>
            <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
              style={{ border: `2px dashed ${dragOver ? "#072B50" : "rgba(7,43,80,0.2)"}`, borderRadius: "14px", padding: "24px", background: dragOver ? "rgba(7,43,80,0.05)" : "#fafaff", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: dragOver ? "#072B50" : "rgba(7,43,80,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Upload size={20} color={dragOver ? "#fff" : "#072B50"} />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e2433", margin: "0 0 4px" }}>Drag & drop foto cabang di sini</p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: "0 0 10px" }}>atau</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", background: "#072B50", borderRadius: "9px" }}>
                  <Upload size={13} color="#fff" />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>Pilih File</span>
                </div>
              </div>
              <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>PNG, JPG — Maks. 2MB · Rekomendasi 1200×600px</p>
            </div>
          </div>

          {/* Informasi Cabang */}
          <SectionTitle icon={<Building2 size={13} color="#072B50" />} title="Informasi Cabang" />
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Nama Cabang">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Cabang Jakarta Pusat" className={inputCls} />
              </Field>
              <Field label="Kota">
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Contoh: Jakarta" className={inputCls} />
              </Field>
            </div>
          </div>

          {/* Jam Operasional */}
          <SectionTitle icon={<Clock size={13} color="#072B50" />} title="Jam Operasional" />
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field label="Jam Buka">
                <input type="time" value={form.jamBuka} onChange={(e) => setForm({ ...form, jamBuka: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Jam Tutup">
                <input type="time" value={form.jamTutup} onChange={(e) => setForm({ ...form, jamTutup: e.target.value })} className={inputCls} />
              </Field>
            </div>
          </div>

          {/* Lokasi */}
          <SectionTitle icon={<MapPin size={13} color="#072B50" />} title="Lokasi" />
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <Field label="Alamat Lengkap">
              <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Contoh: Jl. Sudirman No. 123, Gedung XYZ Lantai 5, Jakarta Pusat 10220" className={`${inputCls} h-[88px] resize-none leading-relaxed`} />
            </Field>
            <Field label="Link Google Maps (Opsional)">
              <input value={form.mapsLink} onChange={(e) => setForm({ ...form, mapsLink: e.target.value })} placeholder="https://maps.google.com/..." className={inputCls} />
            </Field>
            {form.mapsLink && (
              <div style={{ padding: "12px 16px", background: "rgba(7,43,80,0.06)", borderRadius: "10px", border: "1.5px solid rgba(7,43,80,0.12)", display: "flex", alignItems: "center", gap: "10px" }}>
                <MapPin size={15} color="#072B50" />
                <span style={{ fontSize: "12px", color: "#072B50", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{form.mapsLink}</span>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ padding: "20px 32px", borderTop: "1.5px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: "12px", background: "#fafbff", flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "12px 24px", borderRadius: "12px", border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 700, color: "#64748b", fontFamily: "inherit" }}>
            Batal
          </button>
          <button onClick={() => { onSave(form); onClose(); }} style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: "#072B50", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 700, boxShadow: "0 4px 14px rgba(7,43,80,0.3)", fontFamily: "inherit" }}>
            Simpan Cabang
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
  },
  {
    id: 2,
    name: "Cabang Bandung",
    branchId: "BIZ-BDG-002",
    city: "Bandung",
    address: "Jl. Asia Afrika No. 45",
  },
  {
    id: 3,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88",
  },
];

export default function CabangPage() {
  const [cabangs, setCabangs] = useState(initialCabang);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = cabangs.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCity === "All" || c.city === selectedCity)
    );
  });

  const cities = [...new Set(cabangs.map((c) => c.city))];

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center" style={{ marginBottom: "48px" }}>
        <div>
          <h1 className="text-2xl font-bold">Manajemen Cabang</h1>
          <p className="text-gray-500 text-sm">Kelola semua cabang toko</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#072B50", color: "#fff",
            padding: "12px 24px", borderRadius: "12px", border: "none",
            fontSize: "14px", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(7,43,80,0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#0e4a8a"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#072B50"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <Plus size={16} />
          Tambah Cabang
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6" style={{ marginBottom: "36px" }}>
        <div className="bg-white rounded-2xl border shadow-sm" style={{ padding: "28px" }}>
          <p className="text-gray-500 text-sm" style={{ marginBottom: "12px" }}>Total Cabang</p>
          <h2 className="text-3xl font-bold">{cabangs.length}</h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm" style={{ padding: "28px" }}>
          <p className="text-gray-500 text-sm" style={{ marginBottom: "12px" }}>Kota</p>
          <h2 className="text-3xl font-bold">{cities.length}</h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm" style={{ padding: "28px" }}>
          <p className="text-gray-500 text-sm" style={{ marginBottom: "12px" }}>Ditampilkan</p>
          <h2 className="text-3xl font-bold">{filtered.length}</h2>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl border shadow-sm flex justify-between items-center" style={{ padding: "20px 28px", marginBottom: "28px" }}>
        <div style={{ position: "relative", width: "300px" }}>
          <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            placeholder="Cari cabang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "11px 16px 11px 42px", borderRadius: "10px", border: "1.5px solid #e8edf5", background: "#f8faff", fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#1e293b" }}
          />
        </div>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{ padding: "11px 16px", borderRadius: "10px", border: "1.5px solid #e8edf5", background: "#f8faff", fontSize: "14px", outline: "none", color: "#1e293b", cursor: "pointer" }}
        >
          <option value="All">Semua Kota</option>
          {cities.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="text-left" style={{ padding: "18px 24px" }}>Nama</th>
              <th className="text-left" style={{ padding: "18px 24px" }}>Kota</th>
              <th className="text-left" style={{ padding: "18px 24px" }}>Alamat</th>
              <th className="text-right" style={{ padding: "18px 24px" }}>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                <td style={{ padding: "20px 24px" }}>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400" style={{ marginTop: "4px" }}>{item.branchId}</p>
                </td>

                <td style={{ padding: "20px 24px" }} className="font-medium" style={{ color: "#072B50", padding: "20px 24px" }}>{item.city}</td>

                <td style={{ padding: "20px 24px" }} className="text-gray-600">{item.address}</td>

                <td style={{ padding: "20px 24px", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "8px" }}>
                    <button style={{ width: "36px", height: "36px", borderRadius: "10px", border: "none", background: "rgba(7,43,80,0.08)", color: "#072B50", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(7,43,80,0.16)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(7,43,80,0.08)"}
                    ><Eye size={15} /></button>
                    <button style={{ width: "36px", height: "36px", borderRadius: "10px", border: "none", background: "#fef9c3", color: "#b45309", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#fef08a"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#fef9c3"}
                    ><Pencil size={15} /></button>
                    <button style={{ width: "36px", height: "36px", borderRadius: "10px", border: "none", background: "#fee2e2", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#fecaca"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#fee2e2"}
                    ><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH */}
      {showModal && (
        <AddCabangModal
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            setCabangs([...cabangs, { id: cabangs.length + 1, name: data.name, branchId: `BIZ-${data.city.slice(0,3).toUpperCase()}-${String(cabangs.length + 1).padStart(3,"0")}`, city: data.city, address: data.address }]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
