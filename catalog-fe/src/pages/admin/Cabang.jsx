import { useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

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
  const [cabangs] = useState(initialCabang);
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Cabang</h1>
          <p className="text-gray-500 text-sm">Kelola semua cabang toko</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          <Plus size={16} />
          Tambah Cabang
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">Total Cabang</p>
          <h2 className="text-2xl font-bold">{cabangs.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">Kota</p>
          <h2 className="text-2xl font-bold">{cities.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">Ditampilkan</p>
          <h2 className="text-2xl font-bold">{filtered.length}</h2>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-xl border shadow-sm mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Cari cabang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="All">Semua Kota</option>
          {cities.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="text-left px-4 py-3">Nama</th>
              <th className="text-left">Kota</th>
              <th className="text-left">Alamat</th>
              <th className="text-right px-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">{item.branchId}</p>
                </td>

                <td className="text-blue-600 font-medium">{item.city}</td>

                <td className="text-gray-600">{item.address}</td>

                <td className="text-right px-4 space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Eye size={16} />
                  </button>

                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Pencil size={16} />
                  </button>

                  <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Tambah Cabang</h2>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-200 py-2 rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
