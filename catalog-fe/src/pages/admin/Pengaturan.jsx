import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Pengaturan() {
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pengaturan</h1>
          <p className="text-gray-500 mt-1">
            Kelola profil admin dan informasi kontak website
          </p>
        </div>

        {/* ================= PROFILE ================= */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Profile Admin
            </h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition">
              Simpan Perubahan
            </button>
          </div>

          {/* AVATAR */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center text-2xl shadow-inner">
              👨
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Foto CEO</p>
              <p className="text-xs text-gray-400 mb-2">
                JPG, PNG atau GIF (Maks. 2MB)
              </p>

              <div className="flex gap-3">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-1.5 rounded-md">
                  Upload
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-4 py-1.5 rounded-md">
                  Hapus
                </button>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Nama Lengkap</label>
              <input
                type="text"
                value={profile.nama}
                onChange={(e) =>
                  setProfile({ ...profile, nama: e.target.value })
                }
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email Admin</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600">Password Baru</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password baru"
                value={profile.password}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Kosongkan jika tidak ingin mengubah password
            </p>
          </div>
        </div>

        {/* ================= KONTAK ================= */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Kontak Website
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Ditampilkan di footer website
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Nomor WhatsApp</label>
              <input
                type="text"
                value={kontak.whatsapp}
                onChange={(e) =>
                  setKontak({ ...kontak, whatsapp: e.target.value })
                }
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email Perusahaan</label>
              <input
                type="email"
                value={kontak.email}
                onChange={(e) =>
                  setKontak({ ...kontak, email: e.target.value })
                }
                className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Alamat Kantor</label>
            <textarea
              rows={3}
              value={kontak.alamat}
              onChange={(e) => setKontak({ ...kontak, alamat: e.target.value })}
              className="w-full mt-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="flex justify-end">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm transition">
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
