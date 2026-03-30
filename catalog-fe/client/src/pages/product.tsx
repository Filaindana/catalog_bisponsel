import { useState } from "react";
import { useNavigate } from "react-router-dom";
import laptopImg from "../assets/laptop.png";
import mouseImg from "../assets/mouse.png";
import keyboardImg from "../assets/keyboard.png";
import soundImg from "../assets/sound.png";
import kabelImg from "../assets/kabel.png";
import monitorImg from "../assets/monitor.png";
import { Search } from "lucide-react";

const allProducts = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  category: "Komputer (PC)",
  name: "PC Gaming Pro Ryzen Edition",
  spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
  price: 17499000,
  rating: 4.8,
  badge: i % 3 === 0 ? "New" : i % 4 === 0 ? "Sale" : null,
  image: [laptopImg, mouseImg, keyboardImg, soundImg, kabelImg, monitorImg][
    i % 6
  ],
}));

const categories = [
  "Keyboard",
  "Kabel Lan",
  "Laptop",
  "Speaker",
  "Mouse",
  "Handphone",
  "Komputer (PC)",
];
const brands = ["MSI", "Lenovo", "HP", "Asus", "Acer"];
const discounts = ["Diskon", "Best Seller", "New Arrival"];

export default function Product() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState<boolean[]>(allProducts.map(() => false));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(10000000);
  const [sortBy, setSortBy] = useState("Terbaru");

  const productsPerPage = 12;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const toggleItem = (
    list: string[],
    setList: (v: string[]) => void,
    item: string,
  ) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };

  const formatPrice = (price: number) =>
    "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* HERO BANNER */}
      <div
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/src/assets/hero1.jpg') center/cover",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            maxWidth: "1100px",
            margin: "0 auto 20px auto",
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Cari produk..."
              style={{
                padding: "10px 44px 10px 16px",
                borderRadius: "10px",
                border: "none",
                fontSize: "14px",
                width: "240px",
                outline: "none",
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#072B50",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Search size={18} />
            </span>
          </div>
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 12px 0",
          }}
        >
          Catalog Product
        </h1>
        <p style={{ fontSize: "15px", color: "#d1d5db", margin: 0 }}>
          Jelajahi koleksi produk dengan informasi dan detail spesifikasi
          lengkap.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "30px 20px",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "24px",
        }}
      >
        {/* SIDEBAR FILTER */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            height: "fit-content",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 20px 0",
            }}
          >
            Filter Options
          </h3>

          {/* CATEGORY */}
          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 10px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Category <span>∧</span>
            </h4>
            {categories.map((cat) => (
              <label
                key={cat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#374151",
                  marginBottom: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() =>
                    toggleItem(selectedCategories, setSelectedCategories, cat)
                  }
                  style={{ accentColor: "#072B50" }}
                />
                {cat}
              </label>
            ))}
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          {/* BRAND */}
          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 10px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Brand <span>∧</span>
            </h4>
            {brands.map((brand) => (
              <label
                key={brand}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#374151",
                  marginBottom: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleItem(selectedBrands, setSelectedBrands, brand)
                  }
                  style={{ accentColor: "#072B50" }}
                />
                {brand}
              </label>
            ))}
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          {/* DISKON */}
          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 10px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Diskon <span>∧</span>
            </h4>
            {discounts.map((d) => (
              <label
                key={d}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#374151",
                  marginBottom: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedDiscounts.includes(d)}
                  onChange={() =>
                    toggleItem(selectedDiscounts, setSelectedDiscounts, d)
                  }
                  style={{ accentColor: "#072B50" }}
                />
                {d}
              </label>
            ))}
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          {/* HARGA */}
          <div style={{ marginBottom: "20px" }}>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 10px 0",
              }}
            >
              Harga
            </h4>
            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              4.000.069 - {formatPrice(priceRange)}
            </div>
            <input
              type="range"
              min={4000069}
              max={10000000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#ef4444" }}
            />
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          {/* STATUS PRODUK */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#111827",
                margin: "0 0 10px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Status Produk <span>∧</span>
            </h4>
            {["Tersedia", "Tidak Tersedia"].map((status) => (
              <label
                key={status}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#374151",
                  marginBottom: "8px",
                  cursor: "pointer",
                }}
              >
                <input type="checkbox" style={{ accentColor: "#072B50" }} />
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* PRODUK GRID */}
        <div>
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  margin: "0 0 4px 0",
                }}
              >
                Showing {(currentPage - 1) * productsPerPage + 1}-
                {Math.min(currentPage * productsPerPage, allProducts.length)} of{" "}
                {allProducts.length} results
              </p>
              <span
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setSelectedDiscounts([]);
                }}
                style={{
                  fontSize: "12px",
                  color: "#ef4444",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Clear all
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                Short By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                  color: "#374151",
                  outline: "none",
                }}
              >
                {["Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating"].map(
                  (opt) => (
                    <option key={opt}>{opt}</option>
                  ),
                )}
              </select>
            </div>
          </div>

          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {currentProducts.map((product, index) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow 0.2s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)")
                }
              >
                {/* IMAGE */}
                <div style={{ position: "relative", background: "#f9fafb" }}>
                  {product.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "2px 7px",
                        borderRadius: "4px",
                        zIndex: 1,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSaved((prev) => {
                        const updated = [...prev];
                        updated[index] = !updated[index];
                        return updated;
                      });
                    }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      zIndex: 1,
                      cursor: "pointer",
                      background: saved[index] ? "#e11d48" : "#fff",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={saved[index] ? "#fff" : "none"}
                      stroke={saved[index] ? "#fff" : "#374151"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "contain",
                      display: "block",
                      padding: "10px",
                    }}
                  />
                </div>

                {/* INFO */}
                <div style={{ padding: "12px" }}>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {product.category}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#111827",
                      margin: "0 0 4px 0",
                      lineHeight: 1.3,
                    }}
                  >
                    {product.name}
                  </p>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#9ca3af",
                      margin: "0 0 10px 0",
                      lineHeight: 1.4,
                    }}
                  >
                    {product.spec}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      borderTop: "1px solid #f3f4f6",
                      paddingTop: "8px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#9ca3af",
                          margin: "0 0 2px 0",
                        }}
                      >
                        Harga
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#ef4444",
                          margin: 0,
                        }}
                      >
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#9ca3af",
                          margin: "0 0 2px 0",
                        }}
                      >
                        Review
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#111827",
                          margin: 0,
                        }}
                      >
                        ⭐ {product.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontSize: "14px",
                color: currentPage === 1 ? "#d1d5db" : "#374151",
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
                  border: "1px solid #e5e7eb",
                  background: currentPage === page ? "#072B50" : "#fff",
                  color: currentPage === page ? "#fff" : "#374151",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: currentPage === page ? 700 : 400,
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
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontSize: "14px",
                color: currentPage === totalPages ? "#d1d5db" : "#374151",
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
