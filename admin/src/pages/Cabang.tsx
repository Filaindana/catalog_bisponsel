import { useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

type Cabang = {
  id: number;
  name: string;
  branchId: string;
  city: string;
  address: string;
  image: string;
};

const initialCabang: Cabang[] = [
  {
    id: 1,
    name: "Cabang Jakarta Pusat",
    branchId: "BIZ-JKT-001",
    city: "Jakarta",
    address: "Jl. Jenderal Sudirman No. 123, Tanah Abang",
    image: "🏪",
  },
  {
    id: 2,
    name: "Cabang Bandung",
    branchId: "BIZ-BND-002",
    city: "Bandung",
    address: "Jl. Asia Afrika No. 45, Sumur Bandung",
    image: "🏪",
  },
  {
    id: 3,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88, Genteng",
    image: "🏪",
  },
  {
    id: 4,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88, Genteng",
    image: "🏪",
  },
  {
    id: 5,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88, Genteng",
    image: "🏪",
  },
  {
    id: 6,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88, Genteng",
    image: "🏪",
  },
  {
    id: 7,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88, Genteng",
    image: "🏪",
  },
  {
    id: 8,
    name: "Cabang Surabaya",
    branchId: "BIZ-SBY-003",
    city: "Surabaya",
    address: "Jl. Tunjungan No. 88, Genteng",
    image: "🏪",
  },
  {
    id: 9,
    name: "Cabang Medan",
    branchId: "BIZ-MDN-004",
    city: "Medan",
    address: "Jl. Gatot Subroto No. 10, Medan Baru",
    image: "🏪",
  },
  {
    id: 10,
    name: "Cabang Makassar",
    branchId: "BIZ-MKS-005",
    city: "Makassar",
    address: "Jl. Sam Ratulangi No. 22, Makassar",
    image: "🏪",
  },
  {
    id: 11,
    name: "Cabang Yogyakarta",
    branchId: "BIZ-YGY-006",
    city: "Yogyakarta",
    address: "Jl. Malioboro No. 5, Gedongtengen",
    image: "🏪",
  },
  {
    id: 12,
    name: "Cabang Semarang",
    branchId: "BIZ-SMG-007",
    city: "Semarang",
    address: "Jl. Pemuda No. 30, Semarang Tengah",
    image: "🏪",
  },
];

const ITEMS_PER_PAGE = 4;

export default function Cabang() {
  const [cabangs, setCabangs] = useState(initialCabang);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editCabang, setEditCabang] = useState<Cabang | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    branchId: "",
    city: "",
    address: "",
  });

  const totalPages = Math.ceil(cabangs.length / ITEMS_PER_PAGE);
  const paginated = cabangs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Pagination range with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 4) pages.push("...");
      if (currentPage > 3 && currentPage < totalPages - 1)
        pages.push(currentPage);
      if (totalPages > 3) pages.push("...", totalPages);
    }
    return [...new Set(pages)];
  };

  const openAdd = () => {
    setEditCabang(null);
    setForm({ name: "", branchId: "", city: "", address: "" });
    setShowModal(true);
  };

  const openEdit = (c: Cabang) => {
    setEditCabang(c);
    setForm({
      name: c.name,
      branchId: c.branchId,
      city: c.city,
      address: c.address,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editCabang) {
      setCabangs((prev) =>
        prev.map((c) => (c.id === editCabang.id ? { ...c, ...form } : c)),
      );
    } else {
      setCabangs((prev) => [...prev, { id: Date.now(), ...form, image: "🏪" }]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setCabangs((prev) => prev.filter((c) => c.id !== deleteId));
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
            Manajemen Cabang
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Kelola daftar toko dan outlet Bizponsel di seluruh wilayah.
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
          <Plus size={16} /> Tambah Cabang
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
              {["BANNER", "NAMA CABANG", "KOTA", "ALAMAT", "AKSI"].map((h) => (
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
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((cabang, i) => (
              <tr
                key={cabang.id}
                style={{
                  borderBottom:
                    i < paginated.length - 1 ? "1px solid #f1f5f9" : "none",
                }}
              >
                <td style={{ padding: "16px" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "10px",
                      background: "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                    }}
                  >
                    {cabang.image}
                  </div>
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
                    {cabang.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    ID: {cabang.branchId}
                  </p>
                </td>
                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: "#eff6ff",
                      color: "#3b82f6",
                    }}
                  >
                    {cabang.city}
                  </span>
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontSize: "13px",
                    color: "#374151",
                    maxWidth: "260px",
                  }}
                >
                  {cabang.address}
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
                      onClick={() => openEdit(cabang)}
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
                      onClick={() => setDeleteId(cabang.id)}
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
            Menampilkan {ITEMS_PER_PAGE} dari {cabangs.length} cabang
          </p>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
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
            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span
                  key={i}
                  style={{
                    width: "32px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#9ca3af",
                  }}
                >
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => setCurrentPage(Number(page))}
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
              ),
            )}
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
              {editCabang ? "Edit Cabang" : "Tambah Cabang"}
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
                  Nama Cabang
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama cabang"
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
                  ID Cabang
                </label>
                <input
                  value={form.branchId}
                  onChange={(e) =>
                    setForm({ ...form, branchId: e.target.value })
                  }
                  placeholder="BIZ-XXX-000"
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
                  Kota
                </label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Kota"
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
                  Alamat
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Alamat lengkap"
                  style={{ ...inputStyle, height: "80px", resize: "none" }}
                />
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
                {editCabang ? "Simpan" : "Tambah"}
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
              Hapus Cabang?
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 24px 0",
              }}
            >
              Cabang yang dihapus tidak dapat dikembalikan.
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
