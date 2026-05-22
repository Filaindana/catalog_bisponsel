import { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  Mail,
  Lock,
  Upload,
  Trash2,
  Check,
  Building2,
  Clock,
  ChevronDown,
  Plus,
  X,
} from "lucide-react";

/* ── Font inject ── */
if (
  typeof document !== "undefined" &&
  !document.querySelector("[data-inter-pengaturan]")
) {
  const s = document.createElement("style");
  s.setAttribute("data-inter-pengaturan", "true");
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    .pengaturan-admin, .pengaturan-admin * { font-family:'Inter',sans-serif !important; box-sizing:border-box; }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
    @keyframes slideDown { from{opacity:0;max-height:0} to{opacity:1;max-height:600px} }
    .pengaturan-admin .stat-card  { transition: transform .2s, box-shadow .2s; }
    .pengaturan-admin .stat-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(7,43,80,.13); }
    .pengaturan-admin .input-field:focus { border-color:#072B50 !important; background:#fff !important; box-shadow:0 0 0 3px rgba(7,43,80,.08) !important; }
    .jam-accordion-body { animation: slideDown 0.25s ease; overflow:hidden; }
  `;
  document.head.appendChild(s);
}

const NAVY = "#072B50";

const inputCls =
  "input-field w-full px-3.5 py-3 rounded-xl border border-gray-200 text-[13.5px] outline-none text-gray-800 bg-gray-50 transition-all";
const labelCls =
  "block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider";

const Field = ({ label, children, hint }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-1.5">{hint}</p>}
  </div>
);

function getStatusBuka(jamKerja) {
  const now = new Date();
  const hari = now.getDay();
  const jam = now.getHours() + now.getMinutes() / 60;
  const hariIdx = hari === 0 ? 6 : hari - 1;

  if (hariIdx === 6) return { buka: false, label: "Libur Hari Ini" };

  const range = hariIdx < 5 ? jamKerja.senin_jumat : jamKerja.sabtu;
  if (!range || range.libur) return { buka: false, label: "Libur Hari Ini" };

  const [bukaH, bukaM] = range.buka.split(":").map(Number);
  const [tutupH, tutupM] = range.tutup.split(":").map(Number);
  const bukaDec = bukaH + bukaM / 60;
  const tutupDec = tutupH + tutupM / 60;

  if (jam >= bukaDec && jam < tutupDec) {
    return {
      buka: true,
      label: `Sedang Buka · Tutup ${range.tutup.replace(":", ".")} WIB`,
    };
  }
  return { buka: false, label: `Tutup · Buka ${range.buka.replace(":", ".")} WIB` };
}

function TimeInput({ value, onChange }) {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
      style={{ minWidth: 0 }}
    />
  );
}

export default function Pengaturan() {
  const [showPassword, setShowPassword] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedKontak, setSavedKontak] = useState(false);
  const [jamOpen, setJamOpen] = useState(false);

  const [profile, setProfile] = useState({
    nama: "Admin Bizponsel",
    email: "admin@bizponsel.com",
    password: "",
  });

  const [kontak, setKontak] = useState({
    whatsapp: "+62 81234567890",
    email: "support@bizponsel.com",
    alamat:
      "Jl. Sudirman No. 123, Gedung Bizponsel Lantai 15, Jakarta Pusat, 10220",
  });

  const [jamKerja, setJamKerja] = useState({
    senin_jumat: { buka: "08:30", tutup: "17:00", libur: false },
    sabtu: { buka: "08:00", tutup: "15:00", libur: false },
    minggu: { libur: true },
  });

  const [cabang, setCabang] = useState([
    {
      id: 1,
      nama: "Marina",
      shifts: [
        { label: "Shift 1", buka: "09:30", tutup: "16:00" },
        { label: "Shift 2", buka: "16:00", tutup: "21:30" },
      ],
    },
    {
      id: 2,
      nama: "Store Street",
      shifts: [
        { label: "Shift 1", buka: "07:30", tutup: "14:30" },
        { label: "Shift 2", buka: "15:00", tutup: "22:00" },
      ],
    },
  ]);

  const status = getStatusBuka(jamKerja);

  const updateJamKerja = (key, field, val) =>
    setJamKerja((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: val },
    }));

  const updateCabangShift = (cabangId, shiftIdx, field, val) =>
    setCabang((prev) =>
      prev.map((c) =>
        c.id === cabangId
          ? {
              ...c,
              shifts: c.shifts.map((s, i) =>
                i === shiftIdx ? { ...s, [field]: val } : s
              ),
            }
          : c
      )
    );

  const addShift = (cabangId) =>
    setCabang((prev) =>
      prev.map((c) =>
        c.id === cabangId
          ? {
              ...c,
              shifts: [
                ...c.shifts,
                { label: `Shift ${c.shifts.length + 1}`, buka: "08:00", tutup: "17:00" },
              ],
            }
          : c
      )
    );

  const removeShift = (cabangId, shiftIdx) =>
    setCabang((prev) =>
      prev.map((c) =>
        c.id === cabangId
          ? { ...c, shifts: c.shifts.filter((_, i) => i !== shiftIdx) }
          : c
      )
    );

  const addCabang = () =>
    setCabang((prev) => [
      ...prev,
      {
        id: Date.now(),
        nama: "Cabang Baru",
        shifts: [{ label: "Shift 1", buka: "08:00", tutup: "17:00" }],
      },
    ]);

  const removeCabang = (id) =>
    setCabang((prev) => prev.filter((c) => c.id !== id));

  const handleSaveProfile = () => {
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2000);
  };

  const handleSaveKontak = () => {
    setSavedKontak(true);
    setTimeout(() => setSavedKontak(false), 2000);
  };

  return (
    <div className="pengaturan-admin">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1
            className="text-[22px] font-extrabold m-0 tracking-tight"
            style={{ color: NAVY }}
          >
            Pengaturan
          </h1>
          <p className="text-[12.5px] text-gray-400 m-0 mt-0.5">
            Kelola profil admin dan informasi kontak website
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* ── PROFIL ADMIN ── */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <User size={14} color={NAVY} />
              <span
                className="text-[12.5px] font-bold uppercase tracking-wider"
                style={{ color: NAVY }}
              >
                Profil CEO
              </span>
            </div>
            <span className="text-[11px] text-gray-400">
              Informasi akun dan keamanan login
            </span>
          </div>

          <div className="flex flex-col gap-6 p-6">
            {/* Avatar */}
            <div className="flex items-center gap-5 p-5 border border-gray-100 rounded-xl bg-gray-50">
              <div
                className="flex items-center justify-center w-16 h-16 text-3xl border-2 rounded-2xl shrink-0"
                style={{
                  background: "rgba(7,43,80,0.08)",
                  borderColor: "rgba(7,43,80,0.15)",
                }}
              >
                👨
              </div>
              <div className="flex-1">
                <p className="text-[13.5px] font-bold m-0 mb-0.5" style={{ color: NAVY }}>
                  Foto Profil
                </p>
                <p className="text-[11.5px] text-gray-400 m-0 mb-3">
                  JPG, PNG atau GIF · Maks. 2MB
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1.5 text-white text-[12px] px-4 py-2 rounded-lg cursor-pointer border-none font-bold transition-all hover:opacity-90"
                    style={{ background: NAVY }}
                  >
                    <Upload size={12} /> Upload Foto
                  </button>
                  <button className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-[12px] px-4 py-2 rounded-lg cursor-pointer border-none font-bold transition-colors">
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            </div>

            {/* Nama + Email */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nama Lengkap">
                <div className="relative">
                  <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={profile.nama}
                    onChange={(e) => setProfile({ ...profile, nama: e.target.value })}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
              <Field label="Email Admin">
                <div className="relative">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
            </div>

            {/* Password */}
            <Field label="Password Baru" hint="Kosongkan jika tidak ingin mengubah password">
              <div className="relative">
                <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password baru"
                  value={profile.password}
                  onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                  className={`${inputCls} pl-9 pr-10`}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute p-0 text-gray-400 -translate-y-1/2 bg-transparent border-none cursor-pointer right-3 top-1/2 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer transition-all hover:opacity-90"
                style={
                  savedProfile
                    ? { background: "#10b981", boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }
                    : { background: NAVY, boxShadow: `0 4px 14px rgba(7,43,80,0.28)` }
                }
              >
                {savedProfile ? <><Check size={14} /> Tersimpan!</> : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>

        {/* ── KONTAK WEBSITE ── */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100" style={{ background: "#FDFDFD" }}>
            <div className="flex items-center gap-2">
              <Building2 size={14} color={NAVY} />
              <span className="text-[12.5px] font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                Kontak Website
              </span>
            </div>
            <span className="text-[11px] text-gray-400">Ditampilkan di footer dan halaman kontak</span>
          </div>

          <div className="flex flex-col gap-5 p-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nomor WhatsApp">
                <div className="relative">
                  <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={kontak.whatsapp}
                    onChange={(e) => setKontak({ ...kontak, whatsapp: e.target.value })}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
              <Field label="Email Perusahaan">
                <div className="relative">
                  <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={kontak.email}
                    onChange={(e) => setKontak({ ...kontak, email: e.target.value })}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
            </div>

            <Field label="Alamat Kantor">
              <div className="relative">
                <MapPin size={13} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                <textarea
                  rows={3}
                  value={kontak.alamat}
                  onChange={(e) => setKontak({ ...kontak, alamat: e.target.value })}
                  className={`${inputCls} pl-9 resize-none leading-relaxed`}
                />
              </div>
            </Field>

            {/* ── JAM OPERASIONAL ── */}
            <div className="overflow-hidden border border-gray-200 rounded-xl">
              <button
                onClick={() => setJamOpen(!jamOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 hover:bg-gray-100 transition-colors border-none cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Clock size={14} color={NAVY} />
                  <span className="text-[12.5px] font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    Jam Operasional
                  </span>
                  <span
                    className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={
                      status.buka
                        ? { background: "#d1fae5", color: "#065f46" }
                        : { background: "#fee2e2", color: "#991b1b" }
                    }
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: status.buka ? "#10b981" : "#ef4444" }}
                    />
                    {status.label}
                  </span>
                </div>
                <ChevronDown
                  size={15}
                  color="#9ca3af"
                  style={{
                    transform: jamOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform .25s",
                  }}
                />
              </button>

              {jamOpen && (
                <div className="flex flex-col gap-6 p-5 border-t border-gray-100 jam-accordion-body">

                  {/* Jam Kerja Pusat */}
                  <div>
                    <p className={labelCls}>Jam Kerja Pusat</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[12.5px] text-gray-600 w-28 shrink-0">Senin – Jumat</span>
                        <TimeInput value={jamKerja.senin_jumat.buka} onChange={(v) => updateJamKerja("senin_jumat", "buka", v)} />
                        <span className="text-gray-400 text-[12px] shrink-0">–</span>
                        <TimeInput value={jamKerja.senin_jumat.tutup} onChange={(v) => updateJamKerja("senin_jumat", "tutup", v)} />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[12.5px] text-gray-600 w-28 shrink-0">Sabtu</span>
                        <TimeInput value={jamKerja.sabtu.buka} onChange={(v) => updateJamKerja("sabtu", "buka", v)} />
                        <span className="text-gray-400 text-[12px] shrink-0">–</span>
                        <TimeInput value={jamKerja.sabtu.tutup} onChange={(v) => updateJamKerja("sabtu", "tutup", v)} />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[12.5px] text-gray-600 w-28 shrink-0">Minggu & Nasional</span>
                        <span className="text-[12px] font-bold px-3 py-1.5 rounded-lg" style={{ background: "#fee2e2", color: "#991b1b" }}>
                          Libur
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Jam Shift Cabang */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className={`${labelCls} mb-0`}>Jam Shift Cabang</p>
                      <button
                        onClick={addCabang}
                        className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all hover:opacity-80"
                        style={{ background: "rgba(7,43,80,0.08)", color: NAVY }}
                      >
                        <Plus size={11} /> Tambah Cabang
                      </button>
                    </div>

                    <div className="flex flex-col gap-6">
                      {cabang.map((c) => (
                        <div key={c.id}>
                          {/* Nama cabang + tombol hapus cabang */}
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="text"
                              value={c.nama}
                              onChange={(e) =>
                                setCabang((prev) =>
                                  prev.map((x) =>
                                    x.id === c.id ? { ...x, nama: e.target.value } : x
                                  )
                                )
                              }
                              className="text-[11.5px] font-bold uppercase tracking-wider text-gray-500 bg-transparent border-none outline-none p-0 cursor-text"
                              style={{ minWidth: 80 }}
                            />
                            <button
                              onClick={() => removeCabang(c.id)}
                              className="p-0 ml-auto text-red-400 transition-colors bg-transparent border-none cursor-pointer hover:text-red-600"
                              title="Hapus cabang"
                            >
                              <X size={13} />
                            </button>
                          </div>

                          {/* Shifts — layout sama seperti jam pusat */}
                          <div className="flex flex-col gap-3">
                            {c.shifts.map((sh, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <input
                                  type="text"
                                  value={sh.label}
                                  onChange={(e) =>
                                    updateCabangShift(c.id, idx, "label", e.target.value)
                                  }
                                  className="text-[12.5px] text-gray-600 bg-transparent border-none outline-none p-0 w-16 shrink-0"
                                />
                                <TimeInput
                                  value={sh.buka}
                                  onChange={(v) => updateCabangShift(c.id, idx, "buka", v)}
                                />
                                <span className="text-gray-400 text-[12px] shrink-0">–</span>
                                <TimeInput
                                  value={sh.tutup}
                                  onChange={(v) => updateCabangShift(c.id, idx, "tutup", v)}
                                />
                                {c.shifts.length > 1 && (
                                  <button
                                    onClick={() => removeShift(c.id, idx)}
                                    className="p-0 text-red-400 transition-colors bg-transparent border-none cursor-pointer hover:text-red-600 shrink-0"
                                    title="Hapus shift"
                                  >
                                    <X size={13} />
                                  </button>
                                )}
                              </div>
                            ))}

                            {/* Tambah Shift */}
                            <button
                              onClick={() => addShift(c.id)}
                              className="flex items-center gap-1.5 mt-1 text-[12px] font-semibold bg-transparent border-none cursor-pointer transition-opacity w-fit"
                              style={{ color: NAVY, opacity: 0.6 }}
                              onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                              onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
                            >
                              <Plus size={12} /> Tambah Shift
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
            {/* ── END JAM OPERASIONAL ── */}

            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                onClick={handleSaveKontak}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer transition-all hover:opacity-90"
                style={
                  savedKontak
                    ? { background: "#10b981", boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }
                    : { background: NAVY, boxShadow: `0 4px 14px rgba(7,43,80,0.28)` }
                }
              >
                {savedKontak ? <><Check size={14} /> Tersimpan!</> : "Simpan Pengaturan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}