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

    .pengaturan-admin .stat-card  { transition: transform .2s, box-shadow .2s; }
    .pengaturan-admin .stat-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(7,43,80,.13); }
    .pengaturan-admin .input-field:focus { border-color:#072B50 !important; background:#fff !important; box-shadow:0 0 0 3px rgba(7,43,80,.08) !important; }
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

export default function Pengaturan() {
  const [showPassword, setShowPassword] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedKontak, setSavedKontak] = useState(false);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <User size={14} color={NAVY} />
              <span
                className="text-[12.5px] font-bold uppercase tracking-wider"
                style={{ color: NAVY }}
              >
                Profil Admin
              </span>
            </div>
            <span className="text-[11px] text-gray-400">
              Informasi akun dan keamanan login
            </span>
          </div>

          {/* ISI TETAP SAMA (tidak diubah) */}

          <div className="p-6 flex flex-col gap-6">
            {/* Avatar */}
            <div className="flex items-center gap-5 p-5 rounded-xl bg-gray-50 border border-gray-100">
              <div
                className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl shrink-0"
                style={{
                  background: "rgba(7,43,80,0.08)",
                  borderColor: "rgba(7,43,80,0.15)",
                }}
              >
                👨
              </div>
              <div className="flex-1">
                <p
                  className="text-[13.5px] font-bold m-0 mb-0.5"
                  style={{ color: NAVY }}
                >
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
                  <User
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={profile.nama}
                    onChange={(e) =>
                      setProfile({ ...profile, nama: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
              <Field label="Email Admin">
                <div className="relative">
                  <Mail
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
            </div>

            {/* Password */}
            <Field
              label="Password Baru"
              hint="Kosongkan jika tidak ingin mengubah password"
            >
              <div className="relative">
                <Lock
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password baru"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                  className={`${inputCls} pl-9 pr-10`}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0"
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
                    ? {
                        background: "#10b981",
                        boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                      }
                    : {
                        background: NAVY,
                        boxShadow: `0 4px 14px rgba(7,43,80,0.28)`,
                      }
                }
              >
                {savedProfile ? (
                  <>
                    <Check size={14} /> Tersimpan!
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── KONTAK WEBSITE ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Section Header */}
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
                Kontak Website
              </span>
            </div>
            <span className="text-[11px] text-gray-400">
              Ditampilkan di footer dan halaman kontak
            </span>
          </div>

          <div className="p-6 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nomor WhatsApp">
                <div className="relative">
                  <Phone
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={kontak.whatsapp}
                    onChange={(e) =>
                      setKontak({ ...kontak, whatsapp: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
              <Field label="Email Perusahaan">
                <div className="relative">
                  <Mail
                    size={13}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    type="email"
                    value={kontak.email}
                    onChange={(e) =>
                      setKontak({ ...kontak, email: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </Field>
            </div>

            <Field label="Alamat Kantor">
              <div className="relative">
                <MapPin
                  size={13}
                  className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none"
                />
                <textarea
                  rows={3}
                  value={kontak.alamat}
                  onChange={(e) =>
                    setKontak({ ...kontak, alamat: e.target.value })
                  }
                  className={`${inputCls} pl-9 resize-none leading-relaxed`}
                />
              </div>
            </Field>

            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                onClick={handleSaveKontak}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-none text-white text-[13.5px] font-bold cursor-pointer transition-all hover:opacity-90"
                style={
                  savedKontak
                    ? {
                        background: "#10b981",
                        boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                      }
                    : {
                        background: NAVY,
                        boxShadow: `0 4px 14px rgba(7,43,80,0.28)`,
                      }
                }
              >
                {savedKontak ? (
                  <>
                    <Check size={14} /> Tersimpan!
                  </>
                ) : (
                  "Simpan Pengaturan"
                )}
              </button>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}