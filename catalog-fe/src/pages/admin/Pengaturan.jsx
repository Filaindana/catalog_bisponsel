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
} from "lucide-react";

const inputCls =
  "w-full px-4 py-[11px] rounded-xl border border-slate-200 text-sm outline-none text-slate-800 bg-slate-50 transition-all font-[inherit] focus:border-[#072B50] focus:bg-white placeholder:text-slate-400";

const labelCls =
  "block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2";

const SectionHeader = ({ title, subtitle }) => (
  <div className="bg-[#072B50] px-6 py-4 flex items-center justify-between">
    <div>
      <p className="text-sm font-bold text-white">{title}</p>
      {subtitle && <p className="text-xs text-white/50 mt-0.5">{subtitle}</p>}
    </div>
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
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#072B50] m-0 tracking-tight">
            Pengaturan
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Kelola profil admin dan informasi kontak website.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* ─── PROFILE ADMIN ─── */}
        <div className="bg-white rounded-[16px] border border-slate-200 overflow-hidden shadow-[0_4px_24px_rgba(7,43,80,0.06)]">
          <SectionHeader
            title="Profil Admin"
            subtitle="Informasi akun dan keamanan login"
          />

          <div className="p-6 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-[#072B50]/10 border-2 border-[#072B50]/15 flex items-center justify-center text-3xl flex-shrink-0">
                👨
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700 mb-0.5">
                  Foto Profil
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  JPG, PNG atau GIF · Maks. 2MB
                </p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 bg-[#072B50] hover:bg-[#0e3d6e] text-white text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer border-0 font-[inherit] font-semibold">
                    <Upload size={12} /> Upload Foto
                  </button>
                  <button className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer border-0 font-[inherit] font-semibold">
                    <Trash2 size={12} /> Hapus
                  </button>
                </div>
              </div>
            </div>

            {/* Nama + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <User size={14} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={profile.nama}
                    onChange={(e) =>
                      setProfile({ ...profile, nama: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Email Admin</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail size={14} className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={labelCls}>Password Baru</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock size={14} className="text-slate-400" />
                </div>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-0"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Kosongkan jika tidak ingin mengubah password
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={handleSaveProfile}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-0 font-[inherit] transition-all ${
                  savedProfile
                    ? "bg-emerald-500 text-white"
                    : "bg-[#072B50] hover:bg-[#0e3d6e] text-white"
                }`}
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

        {/* ─── KONTAK WEBSITE ─── */}
        <div className="bg-white rounded-[16px] border border-slate-200 overflow-hidden shadow-[0_4px_24px_rgba(7,43,80,0.06)]">
          <SectionHeader
            title="Kontak Website"
            subtitle="Ditampilkan di footer dan halaman kontak website"
          />

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Nomor WhatsApp</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Phone size={14} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={kontak.whatsapp}
                    onChange={(e) =>
                      setKontak({ ...kontak, whatsapp: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Email Perusahaan</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Mail size={14} className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={kontak.email}
                    onChange={(e) =>
                      setKontak({ ...kontak, email: e.target.value })
                    }
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelCls}>Alamat Kantor</label>
              <div className="relative">
                <div className="absolute left-3 top-3.5 pointer-events-none">
                  <MapPin size={14} className="text-slate-400" />
                </div>
                <textarea
                  rows={3}
                  value={kontak.alamat}
                  onChange={(e) =>
                    setKontak({ ...kontak, alamat: e.target.value })
                  }
                  className={`${inputCls} pl-9 resize-none leading-relaxed`}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={handleSaveKontak}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer border-0 font-[inherit] transition-all ${
                  savedKontak
                    ? "bg-emerald-500 text-white"
                    : "bg-[#072B50] hover:bg-[#0e3d6e] text-white"
                }`}
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
