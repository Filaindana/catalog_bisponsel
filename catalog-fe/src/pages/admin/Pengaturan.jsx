import { useState } from "react";
import {
  Eye,
  EyeOff,
  Upload,
  Trash2,
  Shield,
  Phone,
  User,
  Save,
  CheckCircle,
} from "lucide-react";

const inputCls =
  "input-field w-full px-3.5 py-[11px] rounded-[10px] border-[1.5px] border-[#e8edf5] text-[14px] outline-none text-[#1e293b] bg-[#f8faff] font-[inherit] transition-all";

const labelCls =
  "block text-xs font-bold text-slate-500 mb-[7px] tracking-[0.06em] uppercase";

const tabs = [
  { id: "profile", label: "Profil Admin", icon: <User size={15} /> },
  { id: "kontak", label: "Kontak Website", icon: <Phone size={15} /> },
];

// ✅ Dipindah ke luar komponen agar tidak dibuat ulang setiap render
const SaveButton = ({ saved, onClick }) => (
  <button
    className="save-btn flex items-center gap-2 px-6 py-[11px] rounded-[11px] border-none cursor-pointer text-[14px] font-bold font-[inherit] shrink-0 text-white shadow-[0_4px_14px_rgba(7,43,80,0.25)] transition-all"
    style={{
      background: saved
        ? "#22c55e"
        : "linear-gradient(135deg, #072B50, #1a6ab1)",
      transition: "background 0.3s",
    }}
    onClick={onClick}
  >
    {saved ? (
      <>
        <CheckCircle size={16} className="check-pop" /> Tersimpan!
      </>
    ) : (
      <>
        <Save size={15} /> Simpan
      </>
    )}
  </button>
);

export default function Pengaturan() {
  const [showPassword, setShowPassword] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedKontak, setSavedKontak] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    nama: "Admin Bizponsel",
    email: "admin@bizponsel.com",
    password: "",
  });
  const [kontakForm, setKontakForm] = useState({
    whatsapp: "81234567890",
    email: "support@bizponsel.com",
    alamat:
      "Jl. Sudirman No. 123, Gedung Bizponsel Lantai 15, Jakarta Pusat, 10220",
  });

  const handleSaveProfile = () => {
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 2500);
  };
  const handleSaveKontak = () => {
    setSavedKontak(true);
    setTimeout(() => setSavedKontak(false), 2500);
  };

  return (
    <div className="font-['Sora','Segoe_UI',sans-serif] min-h-screen bg-[#f4f7fe]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        .input-field:focus { border-color: #072B50 !important; box-shadow: 0 0 0 3px rgba(7,43,80,0.10) !important; background: #fff !important; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { background: rgba(7,43,80,0.07) !important; }
        .save-btn { transition: all 0.2s; }
        .save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(7,43,80,0.28) !important; }
        .save-btn:active { transform: translateY(0); }
        .upload-btn:hover { opacity: 0.88; }
        .delete-btn:hover { background: #fef2f2 !important; }
        .avatar-wrap { transition: transform 0.2s; }
        .avatar-wrap:hover { transform: scale(1.04); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .card-anim { animation: fadeIn 0.4s ease; }
        @keyframes checkPop { 0% { transform: scale(0.7); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        .check-pop { animation: checkPop 0.35s ease forwards; }
      `}</style>

      {/* PAGE HEADER */}
      <div
        className="px-9 pt-9 pb-[72px] relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #072B50 0%, #0e4a8a 60%, #1a6ab1 100%)",
        }}
      >
        <div className="absolute -top-8 right-[60px] w-[140px] h-[140px] rounded-full bg-white/[0.07]" />
        <div className="absolute top-5 right-[160px] w-[60px] h-[60px] rounded-full bg-white/10" />
        <div className="absolute -bottom-5 left-[200px] w-[90px] h-[90px] rounded-full bg-white/[0.06]" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-11 h-11 rounded-xl bg-white/[0.18] flex items-center justify-center">
            <Shield size={22} color="#fff" />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-white m-0 tracking-[-0.3px]">
              Pengaturan
            </h1>
            <p className="text-[13px] text-white/[0.72] mt-0.5 mb-0">
              Kelola profil admin & informasi kontak website
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-1.5 mt-7 relative z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="tab-btn flex items-center gap-[7px] px-5 py-[9px] rounded-[10px] border-none cursor-pointer text-[13px] font-semibold font-[inherit]"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background:
                  activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.13)",
                color:
                  activeTab === tab.id ? "#072B50" : "rgba(255,255,255,0.85)",
                boxShadow:
                  activeTab === tab.id ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CARD PULL-UP */}
      <div className="px-7 pb-10 -mt-9 relative z-[2]">
        {/* ===== PROFILE TAB ===== */}
        {activeTab === "profile" && (
          <div className="card-anim bg-white rounded-[18px] shadow-[0_8px_40px_rgba(7,43,80,0.10)] overflow-hidden">
            <div className="px-8 pt-8 pb-7 border-b border-[#f1f5f9] flex items-center gap-7">
              <div
                className="avatar-wrap w-[88px] h-[88px] rounded-[18px] flex items-center justify-center text-[44px] shrink-0 shadow-[0_6px_24px_rgba(251,191,36,0.3)]"
                style={{
                  background: "linear-gradient(135deg, #fde68a, #fbbf24)",
                }}
              >
                👨‍💼
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-gray-900 mb-0.5">
                  Foto CEO
                </p>
                <p className="text-[12.5px] text-slate-400 mb-3.5">
                  Format JPG, PNG atau GIF · Maks. 2MB
                </p>
                <div className="flex gap-2.5">
                  <button className="upload-btn flex items-center gap-[7px] px-[18px] py-2 rounded-[9px] bg-[#072B50] text-white border-none cursor-pointer text-[13px] font-semibold font-[inherit] shadow-[0_4px_10px_rgba(7,43,80,0.2)]">
                    <Upload size={13} /> Upload Foto
                  </button>
                  <button className="delete-btn flex items-center gap-[7px] px-[18px] py-2 rounded-[9px] bg-white text-red-500 border-[1.5px] border-red-200 cursor-pointer text-[13px] font-semibold font-[inherit]">
                    <Trash2 size={13} /> Hapus
                  </button>
                </div>
              </div>
              <SaveButton saved={savedProfile} onClick={handleSaveProfile} />
            </div>

            <div className="px-8 pt-7 pb-8">
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={labelCls}>Nama Lengkap</label>
                  <input
                    className={inputCls}
                    value={profileForm.nama}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, nama: e.target.value })
                    }
                    placeholder="Nama lengkap admin"
                  />
                </div>
                <div>
                  <label className={labelCls}>Email Admin</label>
                  <input
                    className={inputCls}
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    placeholder="email@bisnis.com"
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Password Baru</label>
                <div className="relative">
                  <input
                    className={`${inputCls} pr-[46px]`}
                    type={showPassword ? "text" : "password"}
                    value={profileForm.password}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        password: e.target.value,
                      })
                    }
                    placeholder="Biarkan kosong jika tidak diubah"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[13px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 flex items-center"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-[7px] mb-0">
                  Minimal 8 karakter dengan kombinasi huruf & angka
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== KONTAK TAB ===== */}
        {activeTab === "kontak" && (
          <div className="card-anim bg-white rounded-[18px] shadow-[0_8px_40px_rgba(7,43,80,0.10)] overflow-hidden">
            <div className="px-8 py-7 border-b border-[#f1f5f9] flex justify-between items-center">
              <div>
                <h2 className="text-[16px] font-extrabold text-gray-900 mb-1">
                  Kontak Website
                </h2>
                <p className="text-[12.5px] text-slate-400 m-0">
                  Ditampilkan di footer · Klik produk diarahkan ke WhatsApp ini
                </p>
              </div>
              <SaveButton saved={savedKontak} onClick={handleSaveKontak} />
            </div>

            <div className="px-8 pt-7 pb-8">
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <label className={labelCls}>Nomor WhatsApp</label>
                  <div className="flex">
                    <span className="px-3.5 py-[11px] bg-[#f1f5f9] border-[1.5px] border-[#e8edf5] border-r-0 rounded-l-[10px] text-[14px] text-slate-500 font-semibold flex items-center gap-1.5">
                      🇮🇩 +62
                    </span>
                    <input
                      className={`${inputCls} rounded-l-none flex-1`}
                      value={kontakForm.whatsapp}
                      onChange={(e) =>
                        setKontakForm({
                          ...kontakForm,
                          whatsapp: e.target.value,
                        })
                      }
                      placeholder="8123456789"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Email Perusahaan</label>
                  <input
                    className={inputCls}
                    value={kontakForm.email}
                    onChange={(e) =>
                      setKontakForm({ ...kontakForm, email: e.target.value })
                    }
                    placeholder="support@perusahaan.com"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Alamat Kantor Pusat</label>
                <textarea
                  className={`${inputCls} h-[90px] resize-none leading-relaxed`}
                  value={kontakForm.alamat}
                  onChange={(e) =>
                    setKontakForm({ ...kontakForm, alamat: e.target.value })
                  }
                  placeholder="Masukkan alamat lengkap kantor..."
                />
              </div>

              <div className="mt-5 px-[18px] py-3.5 bg-[rgba(7,43,80,0.06)] rounded-xl border-[1.5px] border-[rgba(7,43,80,0.12)] flex items-start gap-3">
                <div className="text-[18px] shrink-0">💡</div>
                <p className="text-[12.5px] text-[#072B50] m-0 leading-relaxed font-medium">
                  Nomor WhatsApp ini akan digunakan sebagai tautan langsung
                  ketika pengunjung mengklik produk di halaman katalog. Pastikan
                  nomor aktif dan dapat dihubungi.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
