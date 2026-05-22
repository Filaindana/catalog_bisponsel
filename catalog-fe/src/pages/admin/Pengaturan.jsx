import { useState, useEffect, useMemo, useRef } from "react";
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
import Field from "../../components/form/Field";
import { getSettings, updateSettings } from "../../utils/services/settingsService";
import { getStatusBuka } from "../../utils/getStatusBuka";

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
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });
  const [error, setError] = useState(null);
  const [jamOpen, setJamOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    nama: "",
    email: "",
    avatar: null,
    jabatan: "",
    quote: "",
  });

  const [kontak, setKontak] = useState({
    whatsapp: "",
    email: "",
    alamat: "",
    telepon: "",
    maps_embed: "",
  });

  const [jamKerja, setJamKerja] = useState({
    senin_jumat: { buka: "08:30", tutup: "17:00", libur: false },
    sabtu: { buka: "08:00", tutup: "15:00", libur: false },
    minggu: { libur: true },
  });

  const [cabang, setCabang] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const status = useMemo(() => getStatusBuka({ pusat: jamKerja }), [jamKerja]);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (avatarFile) {
      const previewUrl = URL.createObjectURL(avatarFile);
      setAvatarPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
    setAvatarPreview(profile.avatar || null);
  }, [avatarFile, profile.avatar]);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getSettings();
      setProfile({
        nama: data.profile?.nama || "",
        email: data.profile?.email || "",
        avatar: data.profile?.avatar || null,
        jabatan: data.profile?.jabatan || "",
        quote: data.profile?.quote || "",
      });
      setKontak({
        whatsapp: data.kontak?.whatsapp || "",
        email: data.kontak?.email || "",
        alamat: data.kontak?.alamat || "",
        telepon: data.kontak?.telepon || "",
        maps_embed: data.kontak?.maps_embed || "",
      });
      setJamKerja({
        senin_jumat: {
          buka: data.jam_operasional?.pusat?.senin_jumat?.buka || "08:30",
          tutup: data.jam_operasional?.pusat?.senin_jumat?.tutup || "17:00",
          libur: data.jam_operasional?.pusat?.senin_jumat?.libur ?? false,
        },
        sabtu: {
          buka: data.jam_operasional?.pusat?.sabtu?.buka || "08:00",
          tutup: data.jam_operasional?.pusat?.sabtu?.tutup || "15:00",
          libur: data.jam_operasional?.pusat?.sabtu?.libur ?? false,
        },
        minggu: {
          libur: data.jam_operasional?.pusat?.minggu?.libur ?? true,
        },
      });
      setCabang(Array.isArray(data.jam_operasional?.cabang) ? data.jam_operasional.cabang : []);
      setSocialMedia(Array.isArray(data.social_media) ? data.social_media : []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Gagal memuat pengaturan.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast({ type: "", message: "" }), 3600);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleAddSocial = () => {
    setSocialMedia((prev) => [...prev, { label: "", url: "", icon: "" }]);
  };

  const handleUpdateSocial = (index, field, value) => {
    setSocialMedia((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveSocial = (index) => {
    setSocialMedia((prev) => prev.filter((_, i) => i !== index));
  };

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

  const removeCabang = (id) => setCabang((prev) => prev.filter((c) => c.id !== id));

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await updateSettings({
        profile,
        kontak,
        jam_operasional: { pusat: jamKerja, cabang },
        social_media: socialMedia,
        avatarFile,
      });
      showToast("success", "Pengaturan berhasil disimpan.");
      await fetchSettings();
    } catch (err) {
      console.error(err);
      showToast("error", err?.message || "Gagal menyimpan pengaturan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 pengaturan-admin">
        <div className="space-y-4">
          <div className="w-1/3 h-8 bg-gray-200 rounded-xl animate-pulse" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-40 bg-gray-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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

      {toast.message && (
        <div
          className={`px-5 py-4 rounded-2xl mb-6 text-sm font-medium ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}>
          {toast.message}
        </div>
      )}

      {error && (
        <div className="px-5 py-4 mb-6 text-sm font-medium text-red-700 rounded-2xl bg-red-50">
          {error}
        </div>
      )}

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
            <div className="flex flex-col items-center gap-5 p-5 border border-gray-100 md:flex-row rounded-xl bg-gray-50">
              <div className="relative w-24 h-24 overflow-hidden bg-white border-2 border-gray-200 shadow-sm rounded-3xl">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-4xl" style={{ background: "rgba(7,43,80,0.08)" }}>
                    👤
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-[13.5px] font-bold m-0 mb-0.5" style={{ color: NAVY }}>
                  Foto Profil
                </p>
                <p className="text-[11.5px] text-gray-400 m-0 mb-3">
                  JPG, PNG atau GIF · Maks. 2MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 text-white text-[12px] px-4 py-2 rounded-lg cursor-pointer border-none font-bold transition-all hover:opacity-90"
                    style={{ background: NAVY }}
                  >
                    <Upload size={12} /> Upload Foto
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarFile(null);
                      setProfile((prev) => ({ ...prev, avatar: null }));
                    }}
                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-[12px] px-4 py-2 rounded-lg cursor-pointer border-none font-bold transition-colors"
                  >
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

            <div className="grid grid-cols-2 gap-4">
              <Field label="Jabatan">
                <input
                  type="text"
                  value={profile.jabatan}
                  onChange={(e) => setProfile({ ...profile, jabatan: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Quote CEO">
                <textarea
                  rows={3}
                  value={profile.quote}
                  onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                  className={`${inputCls} resize-none leading-relaxed`}
                />
              </Field>
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

            <Field label="Embed Google Maps" hint="Tempel URL atau kode iframe Google Maps di sini">
              <textarea
                rows={3}
                value={kontak.maps_embed}
                onChange={(e) => setKontak({ ...kontak, maps_embed: e.target.value })}
                className={`${inputCls} resize-none leading-relaxed`}
              />
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
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: NAVY, boxShadow: `0 4px 14px rgba(7,43,80,0.28)` }}
              >
                {isSaving ? <><Check size={14} /> Menyimpan...</> : "Simpan Pengaturan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}