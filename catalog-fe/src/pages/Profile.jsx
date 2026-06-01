import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getProfile, updateProfile } from "../utils/services/profileService";
import { getFavorit, removeFavorit } from "../utils/services/favoritService";
import { useFavorit } from "../context/FavoritContext.jsx";
import ProductCard from "../components/ProductCard";
import { successAlert, errorAlert, confirmAlert, toastSuccess } from "../utils/swal";

const NAVY = "#072B50";

const categories = {
  1: "Laptop",
  2: "Smartphone",
  3: "Aksesoris",
  4: "Audio & Headphone",
  5: "Kamera & Fotografi",
  6: "Rumah",
  7: "Gaming",
  8: "Networking",
};

/* ── Icons ── */
const IconUser = () => (
  <svg width="15" height="15" fill="none" stroke={NAVY} strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const IconMail = () => (
  <svg width="15" height="15" fill="none" stroke={NAVY} strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
  </svg>
);
const IconCal = () => (
  <svg width="15" height="15" fill="none" stroke={NAVY} strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IconLock = () => (
  <svg width="15" height="15" fill="none" stroke={NAVY} strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconEdit = () => (
  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconX = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconEye = ({ off = false }) =>
  off ? (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
const IconAlert = () => (
  <svg width="12" height="12" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
  </svg>
);
const IconCheckCircle = () => (
  <svg width="26" height="26" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);
const IconBookmark = () => (
  <svg width="20" height="20" fill="none" stroke={NAVY} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
const IconMailSend = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
  </svg>
);

/* ── Overlay wrapper ── */
function Overlay({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center p-4 justify-content-center"
      style={{ background: "rgba(7,43,80,0.42)", backdropFilter: "blur(5px)", display: open ? "flex" : "none", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        className="w-full bg-white shadow-2xl rounded-2xl p-7"
        style={{ maxWidth: 360, animation: "pop .22s cubic-bezier(.34,1.3,.64,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <style>{`@keyframes pop{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}

/* ── Edit Field Modal ── */
function EditFieldModal({ field, targetValue, onClose, onSave }) {
  const [val, setVal] = useState(targetValue);
  const [err, setErr] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const validate = () => {
    if (!val.trim()) { setErr(`${field} tidak boleh kosong`); return false; }
    if (field === "Email") {
      if (!val.includes("@")) { setErr('Email harus mengandung "@"'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setErr("Format email tidak valid"); return false; }
    }
    return true;
  };

  const handleSave = () => { setErr(""); if (!validate()) return; onSave(val.trim()); onClose(); };

  return (
    <Overlay open onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-extrabold" style={{ color: NAVY }}>Edit {field}</h3>
        <button onClick={onClose} className="flex items-center justify-center w-8 h-8 transition-colors border-0 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-500">
          <IconX />
        </button>
      </div>

      {/* Input */}
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
        {field === "Email" ? "Alamat Email" : "Nama Lengkap"}
      </label>
      <input
        ref={inputRef}
        type={field === "Email" ? "email" : "text"}
        value={val}
        onChange={(e) => { setVal(e.target.value); setErr(""); }}
        onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") onClose(); }}
        placeholder={field === "Email" ? "contoh@email.com" : "Masukkan nama lengkap"}
        className={`w-full px-4 py-2.5 rounded-xl text-sm text-slate-800 outline-none transition-all border-[1.5px] bg-slate-50 focus:bg-white ${err ? "border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-slate-200 focus:border-[#072B50] focus:shadow-[0_0_0_3px_rgba(7,43,80,0.09)]"}`}
      />

      {/* Error */}
      {err && (
        <div className="flex items-center gap-1.5 mt-2">
          <IconAlert /><span className="text-xs text-red-500">{err}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2.5 mt-5">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors">
          Batal
        </button>
        <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white border-0 cursor-pointer flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity" style={{ background: NAVY }}>
          <IconCheck /> Simpan
        </button>
      </div>
    </Overlay>
  );
}

/* ── Password Modal ── */
function PasswordModal({ onClose }) {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [oldErr, setOldErr] = useState("");
  const [newErr, setNewErr] = useState("");
  const [success, setSuccess] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const oldRef = useRef(null);

  const isOldFilled = oldPw.trim().length > 0;

  useEffect(() => { oldRef.current?.focus(); }, []);

  const savePw = async () => {
    setOldErr("");
    setNewErr("");

    if (!oldPw) {
      setOldErr("Password lama tidak boleh kosong");
      return;
    }

    if (!newPw) {
      setNewErr("Password baru tidak boleh kosong");
      return;
    }

    if (newPw.length < 8) {
      setNewErr("Password minimal 8 karakter");
      return;
    }

    try {
      await changePassword({
        old_password: oldPw,
        new_password: newPw,
      });

      setSuccess(true);

      // reset input biar bersih
      setOldPw("");
      setNewPw("");

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setOldErr(err.message || "Terjadi kesalahan");
    }
  };

  const sendForgot = () => { if (!forgotEmail.includes("@")) return; setForgotSent(true); };

  if (forgotMode) {
    return (
      <Overlay open onClose={onClose}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-extrabold" style={{ color: NAVY }}>Lupa Password</h3>
          <button onClick={onClose} className="flex items-center justify-center w-8 h-8 transition-colors border-0 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-500"><IconX /></button>
        </div>
        {!forgotSent ? (
          <>
            <p className="text-[13px] text-slate-500 leading-relaxed mb-4">Masukkan email yang terdaftar. Kami akan mengirimkan link reset password.</p>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Terdaftar</label>
            <input
              type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendForgot(); }}
              placeholder="contoh@email.com" autoFocus
              className="w-full px-4 py-2.5 rounded-xl text-sm text-slate-800 outline-none transition-all border-[1.5px] border-slate-200 bg-slate-50 focus:border-[#072B50] focus:bg-white focus:shadow-[0_0_0_3px_rgba(7,43,80,0.09)]"
            />
            <div className="flex gap-2.5 mt-5">
              <button onClick={() => setForgotMode(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">Kembali</button>
              <button onClick={sendForgot} disabled={!forgotEmail.includes("@")}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white border-0 cursor-pointer flex items-center justify-center gap-1.5 transition-opacity"
                style={{ background: NAVY, opacity: forgotEmail.includes("@") ? 1 : 0.45 }}>
                <IconMailSend /> Kirim Link
              </button>
            </div>
          </>
        ) : (
          <div className="py-3 text-center">
            <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-green-50"><IconCheckCircle /></div>
            <p className="mb-2 text-sm font-bold text-green-600">Email terkirim!</p>
            <p className="text-[12.5px] text-slate-500 leading-relaxed mb-4">Link reset password telah dikirim.<br />Cek inbox atau folder spam Anda.</p>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-bold text-white border-0 cursor-pointer" style={{ background: NAVY }}>Oke, Mengerti</button>
          </div>
        )}
      </Overlay>
    );
  }

  return (
    <Overlay open onClose={onClose}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-extrabold" style={{ color: NAVY }}>Ubah Password</h3>
        <button onClick={onClose} className="flex items-center justify-center w-8 h-8 transition-colors border-0 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-500"><IconX /></button>
      </div>

      {success ? (
        <div className="py-4 text-center">
          <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-green-50"><IconCheckCircle /></div>
          <p className="text-sm font-bold text-green-600">Password berhasil diperbarui!</p>
        </div>
      ) : (
        <>
          {/* Old password */}
          <div className="mb-4">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password Lama</label>
            <div className="relative">
              <input
                ref={oldRef} type={showOld ? "text" : "password"} 
                value={oldPw}
                onChange={(e) => { setOldPw(e.target.value); setOldErr(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") savePw(); }}
                placeholder="Masukkan password lama"
                className={`w-full px-4 py-2.5 pr-11 rounded-xl text-sm text-slate-800 outline-none transition-all border-[1.5px] bg-slate-50 focus:bg-white ${oldErr ? "border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-slate-200 focus:border-[#072B50] focus:shadow-[0_0_0_3px_rgba(7,43,80,0.09)]"}`}
              />
              <button type="button" onClick={() => setShowOld((v) => !v)} className="absolute flex p-0 -translate-y-1/2 bg-transparent border-0 cursor-pointer right-3 top-1/2 text-slate-400 hover:text-slate-600">
                <IconEye off={showOld} />
              </button>
            </div>
            {oldErr && <div className="flex items-center gap-1.5 mt-1.5"><IconAlert /><span className="text-xs text-red-500">{oldErr}</span></div>}
          </div>

          <hr className="my-4 border-0 border-t border-slate-100" />

          {/* New password */}
          <div className="mb-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password Baru</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"} 
                value={newPw}
                onChange={(e) => { setNewPw(e.target.value); setNewErr(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") savePw(); }}
                disabled={!isOldFilled}
                placeholder={
                  !isOldFilled
                    ? "Isi password lama dulu"
                    : "Minimal 8 karakter"
                }
                className={`w-full px-4 py-2.5 pr-11 rounded-xl text-sm text-slate-800 outline-none transition-all border-[1.5px] bg-slate-50 focus:bg-white ${!isOldFilled
      ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200" : newErr ? "border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-slate-200 focus:border-[#072B50] focus:shadow-[0_0_0_3px_rgba(7,43,80,0.09)]"}`}
              />    
              <button 
              type="button" 
              onClick={() => setShowNew((v) => !v)} 
              className="absolute flex p-0 -translate-y-1/2 bg-transparent border-0 cursor-pointer right-3 top-1/2 text-slate-400 hover:text-slate-600">
                <IconEye off={showNew} />
              </button>
            </div>
            {newErr && <div className="flex items-center gap-1.5 mt-1.5"><IconAlert /><span className="text-xs text-red-500">{newErr}</span></div>}
          </div>

          <div className="flex justify-end mt-2 mb-4">
            <button onClick={() => setForgotMode(true)} className="p-0 text-xs font-semibold bg-transparent border-0 cursor-pointer hover:underline" style={{ color: NAVY }}>
              Lupa password?
            </button>
          </div>

          <div className="flex gap-2.5">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors">Batal</button>
            <button onClick={savePw} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white border-0 cursor-pointer flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity" style={{ background: NAVY }}>
              <IconCheck /> Simpan
            </button>
          </div>
        </>
      )}
    </Overlay>
  );
}

/* ── Info Row ── */
function InfoRow({ icon, label, value, valueClass = "", onEdit, editLabel = "Edit" }) {
  return (
    <div className="flex items-center gap-3.5 px-5 py-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 transition-colors">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={`text-sm font-semibold text-slate-800 truncate ${valueClass}`}>{value}</p>
      </div>
      {onEdit && (
        <button onClick={onEdit} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-blue-50 hover:text-[#072B50] hover:border-blue-200 cursor-pointer transition-all shrink-0">
          <IconEdit /> {editLabel}
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════
   MAIN — Profile Page
═══════════════════════════════ */
export default function Profile() {
  const navigate = useNavigate();
  const { reload } = useFavorit();
  const [tab, setTab] = useState("userdata");
  const [saved, setSaved] = useState([]);
  const [user, setUser] = useState(null);
  const nama = user?.nama || "";
  const email = user?.email || "";
  const [editField, setEditField] = useState(null); // "Nama" | "Email" | null
  const [pwModal, setPwModal] = useState(false);

  const initials = nama.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res); // ⬅️ penting!
      } catch (err) {
        console.error("FETCH PROFILE ERROR:", err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateUser = async (field, value) => {
    try {
      const res = await updateProfile(user.id, { [field]: value });
      setUser(res);
      // sync ke localStorage agar navbar ikut update
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, [field]: value }));
      toastSuccess(`${field === "nama" ? "Nama" : "Email"} berhasil diperbarui`);
    } catch (err) {
      console.error(err);
      errorAlert("Gagal Menyimpan", err.message || "Gagal menyimpan perubahan");
    }
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };


  const formatPrice = (price) =>
    "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");

  const fetchSaved = async () => {
  try {
    const res = await getFavorit();
    // getFavorit() return raw res sekarang
    const data = Array.isArray(res?.data) ? res.data : [];

    const products = data
      .map((item) => {
        const p = item?.produk;
        if (!p) return null; // skip kalau data rusak

        return {
          id: p.id,
          category: p.kategori?.nama || categories[p.kategori_id] || "-",
          brand: p.brand,
          name: p.nama,
          spec: p.deskripsi || "-",
          price: formatPrice(p.harga),
          rating: p.rating || 0,
          image: p.gambar ? `/images/${p.gambar}` : "/fallback.jpg",
          badge: p.adalah_promo ? "Sale" : undefined,
        };
      })
      .filter(Boolean); // buang yang null

    setSaved(products);
  } catch (err) {
    console.error("fetchSaved error:", err);
    setSaved([]); // reset ke kosong kalau error
  }
};

  useEffect(() => {
    if (tab === "saved") {
      const load = async () => {
        await fetchSaved();
      };

      load();
    }
  }, [tab]);

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6">

        {/* Title */}
        <h1 className="text-[26px] font-extrabold tracking-tight mb-7" style={{ color: NAVY }}>Profil Saya</h1>

        {/* Top bar */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex gap-1 p-1 bg-slate-200 rounded-xl">
            {[{ key: "userdata", label: "User Data" }, { key: "saved", label: "Saved" }].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="px-5 py-2 rounded-[9px] text-[13px] font-semibold border-0 cursor-pointer transition-all duration-200"
                style={{
                  background: tab === t.key ? NAVY : "transparent",
                  color: tab === t.key ? "#fff" : "#64748b",
                  boxShadow: tab === t.key ? "0 2px 8px rgba(7,43,80,.25)" : "none",
                }}>
                {t.label}
              </button>
            ))}
          </div>
          {tab === "userdata" && (
            <button
              onClick={async () => {
                const result = await confirmAlert({
                  title: "Konfirmasi Logout",
                  text: "Apakah Anda yakin ingin keluar dari sesi ini?",
                  confirmText: "Ya, Keluar",
                  cancelText: "Batal",
                });
                if (result.isConfirmed) {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/login");
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[13px] font-bold border-0 cursor-pointer transition-colors">
              <IconLogout /> Logout
            </button>
          )}
        </div>

        {/* USER DATA TAB */}
        {tab === "userdata" && (
          <div>
            {/* Hero card */}
            <div className="flex items-center gap-5 mb-5 shadow-lg rounded-2xl p-7" style={{ background: NAVY }}>
              <div className="flex items-center justify-center w-16 h-16 text-2xl font-extrabold text-white border-2 rounded-full shrink-0 border-white/25" style={{ background: "rgba(255,255,255,0.15)" }}>
                {initials}
              </div>
              <div>
                <p className="mb-1 text-lg font-extrabold text-white">{nama}</p>
                <p className="text-sm text-white/65">{email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white/85 border border-white/20" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                </div>
              </div>
            </div>

            {/* Informasi Pribadi */}
            <div className="mb-5 overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
              <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50"><IconUser /></div>
                <h2 className="text-[13.5px] font-bold" style={{ color: NAVY }}>Informasi Pribadi</h2>
              </div>
              <InfoRow icon={<IconUser />} label="Nama Lengkap" value={nama} onEdit={() => setEditField("Nama")} />
              <InfoRow icon={<IconMail />} label="Email" value={email} onEdit={() => setEditField("Email")} />
              <InfoRow icon={<IconCal />} label="Tanggal Bergabung"   value={formatTanggal(user?.dibuat_pada)} />
            </div>

            {/* Keamanan */}
            <div className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
              <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50"><IconLock /></div>
                <h2 className="text-[13.5px] font-bold" style={{ color: NAVY }}>Keamanan Akun</h2>
              </div>
              <InfoRow icon={<IconLock />} label="Password" value="••••••••••" valueClass="tracking-widest text-slate-400" onEdit={() => setPwModal(true)} editLabel="Ubah" />
            </div>
          </div>
        )}

        {/* SAVED TAB */}
        {tab === "saved" && (
          <div>
            <div className="pt-6 pb-5 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 border rounded-2xl bg-slate-100 border-slate-200">
                <IconBookmark />
              </div>
              <h2 className="mb-1 text-lg font-extrabold" style={{ color: NAVY }}>Koleksi Saya</h2>
              <p className="text-sm text-slate-400">Item yang Anda simpan akan muncul di sini</p>
            </div>

            {saved.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mb-3 text-5xl">🔖</div>
                <h3 className="text-sm font-bold mb-1.5" style={{ color: NAVY }}>Belum ada item tersimpan</h3>
                <p className="mb-5 text-sm text-slate-400">Simpan produk favorit kamu dari halaman produk</p>
                <button
                  onClick={() => navigate("/product")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white border-0 cursor-pointer hover:opacity-90 transition-opacity" style={{ background: NAVY }}>
                  Jelajahi Produk
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {saved.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    saved={true}
                    onToggleSave={async () => {
                      try {
                        await removeFavorit(item.id);
                        setSaved((prev) => prev.filter((x) => x.id !== item.id));
                        reload();
                      } catch (err) {
                        console.error("Gagal hapus favorit:", err.message);
                      }
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {editField === "Nama" && (
        <EditFieldModal field="Nama" targetValue={nama} onClose={() => setEditField(null)} onSave={(val) => handleUpdateUser("nama", val)} />
      )}
      {editField === "Email" && (
        <EditFieldModal field="Email" targetValue={email} onClose={() => setEditField(null)} onSave={(val) => handleUpdateUser("email", val)} />
      )}
      {pwModal && <PasswordModal onClose={() => setPwModal(false)} />}
    </div>
  );
}