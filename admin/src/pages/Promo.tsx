import { useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

type Promo = {
  id: number;
  name: string;
  desc: string;
  startDate: string;
  endDate: string;
  status: "Aktif" | "Segera" | "Berakhir";
  bannerColor: string;
};

const initialPromos: Promo[] = [
  {
    id: 1,
    name: "Diskon Akhir Tahun",
    desc: "Potongan harga hingga 50%",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Aktif",
    bannerColor: "#3b82f6",
  },
  {
    id: 2,
    name: "Promo Gajian",
    desc: "Cashback khusus pengguna setia",
    startDate: "2024-02-25",
    endDate: "2024-02-28",
    status: "Segera",
    bannerColor: "#f59e0b",
  },
  {
    id: 3,
    name: "Flash Sale 12.12",
    desc: "Penawaran kilat hanya 24 jam",
    startDate: "2023-12-12",
    endDate: "2023-12-12",
    status: "Berakhir",
    bannerColor: "#ef4444",
  },
  {
    id: 4,
    name: "Cashback Spesial",
    desc: "Extra saldo untuk Top Up",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "Segera",
    bannerColor: "#0d9488",
  },
  {
    id: 5,
    name: "Cashback Spesial",
    desc: "Extra saldo untuk Top Up",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "Segera",
    bannerColor: "#0d9488",
  },
  {
    id: 6,
    name: "Cashback Spesial",
    desc: "Extra saldo untuk Top Up",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "Segera",
    bannerColor: "#0d9488",
  },
  {
    id: 7,
    name: "Cashback Spesial",
    desc: "Extra saldo untuk Top Up",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "Segera",
    bannerColor: "#0d9488",
  },
  {
    id: 8,
    name: "Cashback Spesial",
    desc: "Extra saldo untuk Top Up",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "Segera",
    bannerColor: "#0d9488",
  },
];

const ITEMS_PER_PAGE = 4;

const statusStyle = (status: string) => {
  if (status === "Aktif") return { background: "#dcfce7", color: "#16a34a" };
  if (status === "Segera") return { background: "#fef9c3", color: "#ca8a04" };
  return { background: "#fee2e2", color: "#dc2626" };
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Promo() {
  const [promos, setPromos] = useState(initialPromos);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editPromo, setEditPromo] = useState<Promo | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    startDate: "",
    endDate: "",
    status: "Aktif" as Promo["status"],
    bannerColor: "#3b82f6",
  });

  const totalPages = Math.ceil(promos.length / ITEMS_PER_PAGE);
  const paginated = promos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const openAdd = () => {
    setEditPromo(null);
    setForm({
      name: "",
      desc: "",
      startDate: "",
      endDate: "",
      status: "Aktif",
      bannerColor: "#3b82f6",
    });
    setShowModal(true);
  };

  const openEdit = (p: Promo) => {
    setEditPromo(p);
    setForm({
      name: p.name,
      desc: p.desc,
      startDate: p.startDate,
      endDate: p.endDate,
      status: p.status,
      bannerColor: p.bannerColor,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editPromo) {
      setPromos((prev) =>
        prev.map((p) => (p.id === editPromo.id ? { ...p, ...form } : p)),
      );
    } else {
      setPromos((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setPromos((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "28px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 6px 0",
            }}
          >
            Manajemen Promo
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Kelola semua penawaran promo aktif dan mendatang.
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 20px",
            borderRadius: "10px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          <Plus size={16} /> Tambah Promo
        </button>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          border: "1px solid #f1f5f9",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              {["BANNER", "NAMA PROMO", "PERIODE", "STATUS", "AKSI"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 16px",
                      textAlign: h === "AKSI" ? "right" : "left",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6b7280",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {paginated.map((promo, i) => (
              <tr
                key={promo.id}
                style={{
                  borderBottom:
                    i < paginated.length - 1 ? "1px solid #f1f5f9" : "none",
                }}
              >
                <td style={{ padding: "16px" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "50px",
                      borderRadius: "8px",
                      background: promo.bannerColor,
                    }}
                  />
                </td>
                <td style={{ padding: "16px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111827",
                      margin: "0 0 3px 0",
                    }}
                  >
                    {promo.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    {promo.desc}
                  </p>
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontSize: "13px",
                    color: "#374151",
                  }}
                >
                  {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                </td>
                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      ...statusStyle(promo.status),
                    }}
                  >
                    {promo.status}
                  </span>
                </td>
                <td style={{ padding: "16px", textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#eff6ff",
                        color: "#3b82f6",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => openEdit(promo)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#fefce8",
                        color: "#ca8a04",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(promo.id)}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "none",
                        background: "#fef2f2",
                        color: "#ef4444",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, promos.length)} dari{" "}
            {promos.length} promo
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: currentPage === page ? "none" : "1px solid #e2e8f0",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: currentPage === page ? "#4f46e5" : "#fff",
                  color: currentPage === page ? "#fff" : "#374151",
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                background: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH/EDIT */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "28px",
              width: "480px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 24px 0",
              }}
            >
              {editPromo ? "Edit Promo" : "Tambah Promo"}
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Nama Promo
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama promo"
                  style={inputStyle}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Deskripsi
                </label>
                <input
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  placeholder="Deskripsi promo"
                  style={inputStyle}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as Promo["status"],
                      })
                    }
                    style={inputStyle}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Segera">Segera</option>
                    <option value="Berakhir">Berakhir</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Warna Banner
                  </label>
                  <input
                    type="color"
                    value={form.bannerColor}
                    onChange={(e) =>
                      setForm({ ...form, bannerColor: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      padding: "6px",
                      height: "42px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#4f46e5",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {editPromo ? "Simpan" : "Tambah"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {deleteId !== null && (
        <div
          onClick={() => setDeleteId(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "28px",
              width: "380px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#fef2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Trash2 size={24} color="#ef4444" />
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 8px 0",
              }}
            >
              Hapus Promo?
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 24px 0",
              }}
            >
              Promo yang dihapus tidak dapat dikembalikan.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#ef4444",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
