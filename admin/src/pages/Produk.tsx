import { useState } from "react";
import { Eye, Pencil, Trash2, Plus, X, Upload, ImageIcon } from "lucide-react";

type ProductForm = {
  name: string;
  category: string;
  brand: string;
  description: string;
  price: string;
  stock: string;
  warna: string;
  spesifikasi: string;
};
const initialProducts = [
  {
    id: 1,
    name: "Asus Vivo V14",
    category: "Laptop & Komputer",
    price: 8500000,
    stock: 24,
    promo: true,
    image: "💻",
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    category: "Smartphone",
    price: 12000000,
    stock: 15,
    promo: false,
    image: "📱",
  },
  {
    id: 3,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 4,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 5,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 6,
    name: "Samsung Galaxy S21",
    category: "Smartphone",
    price: 12000000,
    stock: 15,
    promo: false,
    image: "📱",
  },
  {
    id: 7,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 8,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
  {
    id: 9,
    name: "iPad Air 5",
    category: "Tablet",
    price: 10200000,
    stock: 8,
    promo: true,
    image: "📟",
  },
];

const ITEMS_PER_PAGE = 3;
const formatPrice = (price: number) =>
  "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");
type Product = (typeof initialProducts)[0];

const kategoriOptions = [
  "Laptop & Komputer",
  "Smartphone",
  "Tablet",
  "Monitor",
  "Aksesoris",
  "Printer",
  "Kamera",
];
const brandOptions = [
  "ASUS",
  "Samsung",
  "Apple",
  "Lenovo",
  "HP",
  "Dell",
  "Acer",
  "Xiaomi",
  "Oppo",
  "Vivo",
];

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box" as const,
  color: "#374151",
  background: "#fff",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",
};

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "14px",
        paddingBottom: "8px",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>
        {title}
      </span>
    </div>
  );
}

function AddProductModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: ProductForm) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
    warna: "",
    spesifikasi: "",
  });
  const [uploadedFiles] = useState([
    { name: "iphone-15-front.jpg", progress: 80 },
    { name: "iphone-15-front.jpg", progress: 80 },
    { name: "iphone-15-front.jpg", progress: 80 },
    { name: "iphone-15-front.jpg", progress: 80 },
  ]);

  return (
    <div
      onClick={onClose}
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
          width: "560px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111827",
              margin: 0,
            }}
          >
            Tambah Produk Baru
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY - SCROLLABLE */}
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {/* INFORMASI DASAR */}
          <div style={{ marginBottom: "20px" }}>
            <SectionTitle icon="ℹ️" title="Informasi Dasar" />
            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: "5px",
                }}
              >
                Nama Produk
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: iPhone 15 Pro Max 256GB Titanium"
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
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Kategori
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  style={selectStyle}
                >
                  <option value="">Pilih Kategori</option>
                  {kategoriOptions.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Brand
                </label>
                <select
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  style={selectStyle}
                >
                  <option value="">Pilih Brand</option>
                  {brandOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* DESKRIPSI */}
          <div style={{ marginBottom: "20px" }}>
            <SectionTitle icon="📝" title="Deskripsi Produk" />
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Jelaskan detail produk secara singkat..."
              style={{ ...inputStyle, height: "80px", resize: "none" }}
            />
          </div>

          {/* UPLOAD GAMBAR */}
          <div style={{ marginBottom: "20px" }}>
            <SectionTitle icon="🖼️" title="Upload Gambar" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {/* DROPZONE */}
              <div
                style={{
                  border: "2px dashed #e2e8f0",
                  borderRadius: "10px",
                  padding: "24px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  background: "#f8fafc",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#4f46e5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#e2e8f0")
                }
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#ede9fe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Upload size={18} color="#4f46e5" />
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  Tarik gambar ke sini atau{" "}
                  <span style={{ color: "#4f46e5", fontWeight: 600 }}>
                    klik untuk upload
                  </span>
                </p>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                  JPG, PNG, GIF (Maks. 2MB)
                </p>
              </div>

              {/* FILE LIST */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {uploadedFiles.map((file, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#f8fafc",
                      borderRadius: "8px",
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "6px",
                        background: "#e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <ImageIcon size={14} color="#6b7280" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#374151",
                          margin: "0 0 4px 0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {file.name}
                      </p>
                      <div
                        style={{
                          height: "4px",
                          background: "#e2e8f0",
                          borderRadius: "2px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${file.progress}%`,
                            background: "#4f46e5",
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        flexShrink: 0,
                      }}
                    >
                      {file.progress}%
                    </span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9ca3af",
                        display: "flex",
                        padding: 0,
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VARIAN & HARGA */}
          <div style={{ marginBottom: "20px" }}>
            <SectionTitle icon="💰" title="Varian & Harga" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                  style={inputStyle}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Stok
                </label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="0"
                  style={inputStyle}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Warna
                </label>
                <input
                  value={form.warna}
                  onChange={(e) => setForm({ ...form, warna: e.target.value })}
                  placeholder="Contoh: Space Gray"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* SPESIFIKASI */}
          <div style={{ marginBottom: "8px" }}>
            <SectionTitle icon="⚙️" title="Spesifikasi Lengkap" />
            <textarea
              value={form.spesifikasi}
              onChange={(e) =>
                setForm({ ...form, spesifikasi: e.target.value })
              }
              placeholder={`Contoh:\n- Chipset: A17 Pro\n- RAM: 8GB\n- Layar: 6.1 inch Super Retina XDR OLED`}
              style={{
                ...inputStyle,
                height: "90px",
                resize: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#fff",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Batal
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Simpan Produk
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Produk() {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    promo: false,
  });

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginated = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setEditForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
      promo: p.promo,
    });
  };

  const handleSaveEdit = () => {
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? {
                ...p,
                ...editForm,
                price: Number(editForm.price),
                stock: Number(editForm.stock),
              }
            : p,
        ),
      );
    }
    setEditProduct(null);
  };

  const handleDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const handleAddSave = (data: ProductForm) => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: data.name || "Produk Baru",
        category: data.category || "-",
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
        promo: false,
        image: "📦",
      },
    ]);
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
            Daftar Produk
          </h1>
          <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
            Kelola inventaris dan katalog produk Anda di sini.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
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
          <Plus size={16} /> Tambah Produk
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
              {["FOTO", "NAMA PRODUK", "HARGA", "STOK", "PROMO", "AKSI"].map(
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
            {paginated.map((product, i) => (
              <tr
                key={product.id}
                style={{
                  borderBottom:
                    i < paginated.length - 1 ? "1px solid #f1f5f9" : "none",
                }}
              >
                <td style={{ padding: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    {product.image}
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
                    {product.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                    {product.category}
                  </p>
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {formatPrice(product.price)}
                </td>
                <td
                  style={{
                    padding: "16px",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {product.stock}
                </td>
                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: product.promo ? "#dcfce7" : "#fee2e2",
                      color: product.promo ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {product.promo ? "Ya" : "Tidak"}
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
                      onClick={() => openEdit(product)}
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
                      onClick={() => setDeleteId(product.id)}
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
            {Math.min(currentPage * ITEMS_PER_PAGE, products.length)} dari{" "}
            {products.length} produk
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
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: currentPage === page ? "#4f46e5" : "#fff",
                  color: currentPage === page ? "#fff" : "#374151",
                  border: currentPage === page ? "none" : "1px solid #e2e8f0",
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

      {/* MODAL TAMBAH PRODUK */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* MODAL EDIT */}
      {editProduct && (
        <div
          onClick={() => setEditProduct(null)}
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
              width: "460px",
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
              Edit Produk
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
                  Nama Produk
                </label>
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  style={{ ...inputStyle, padding: "10px 12px" }}
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
                  Kategori
                </label>
                <input
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  style={{ ...inputStyle, padding: "10px 12px" }}
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
                    Harga
                  </label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    style={{ ...inputStyle, padding: "10px 12px" }}
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
                    Stok
                  </label>
                  <input
                    type="number"
                    value={editForm.stock}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: e.target.value })
                    }
                    style={{ ...inputStyle, padding: "10px 12px" }}
                  />
                </div>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={editForm.promo}
                  onChange={(e) =>
                    setEditForm({ ...editForm, promo: e.target.checked })
                  }
                  style={{
                    accentColor: "#4f46e5",
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span style={{ fontSize: "13px", color: "#374151" }}>
                  Tandai sebagai Promo
                </span>
              </label>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              <button
                onClick={() => setEditProduct(null)}
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
                onClick={handleSaveEdit}
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
                Simpan
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
              Hapus Produk?
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 24px 0",
              }}
            >
              Produk yang dihapus tidak dapat dikembalikan.
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
