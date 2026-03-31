import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import laptopImg from "../assets/laptop.png";
import mouseImg from "../assets/mouse.png";
import keyboardImg from "../assets/keyboard.png";
import soundImg from "../assets/sound.png";
import kabelImg from "../assets/kabel.png";
import monitorImg from "../assets/monitor.png";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCardCompact.jsx";

const allProducts = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  category: "Komputer (PC)",
  name: "PC Gaming Pro Ryzen Edition",
  spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB",
  price: 17499000,
  rating: 4.8,
  badge: i % 3 === 0 ? "New" : i % 4 === 0 ? "Sale" : null,
  brand: ["Asus", "MSI", "HP", "Lenovo", "Acer"][i % 5],
  discount: i % 4 === 0 ? 15 : null,
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

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0 0 10px 0",
          outline: "none",
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: 600, color: "#111827" }}>
          {title}
        </span>
        {open ? (
          <ChevronDown
            size={16}
            color="#6b7280"
            style={{ transform: "rotate(180deg)" }}
          />
        ) : (
          <ChevronDown size={16} color="#6b7280" />
        )}
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "500px" : "0px",
          transition: "max-height 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Product() {
  const [saved, setSaved] = useState(allProducts.map(() => false));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [sortBy, setSortBy] = useState("Terbaru");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(20000000);

  const productsPerPage = 15;

  const filteredProducts = allProducts
    .filter((p) => {
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (p.price > priceRange) return false;
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      )
        return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand))
        return false;
      if (selectedDiscounts.length > 0) {
        const hasDiskon =
          selectedDiscounts.includes("Diskon") && p.discount !== null;
        const hasBestSeller =
          selectedDiscounts.includes("Best Seller") && p.rating >= 4.7;
        const hasNewArrival =
          selectedDiscounts.includes("New Arrival") && p.badge === "New";
        if (!hasDiskon && !hasBestSeller && !hasNewArrival) return false;
      }
      if (selectedStatus.includes("Tidak Tersedia")) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Harga Terendah") return a.price - b.price;
      if (sortBy === "Harga Tertinggi") return b.price - a.price;
      if (sortBy === "Rating") return b.rating - a.rating;
      return b.id - a.id;
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
    setCurrentPage(1);
  };

  const formatPrice = (price) =>
    "Rp " + price.toLocaleString("id-ID").replace(/,/g, ".");

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedDiscounts.length > 0 ||
    selectedStatus.length > 0 ||
    priceRange !== 20000000,
  );

  const checkboxLabel = (label, checked, onChange) => (
    <label
      key={label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        color: "#374151",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      <div
        onClick={onChange}
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "4px",
          flexShrink: 0,
          border: checked ? "none" : "1.5px solid #d1d5db",
          background: checked ? "#072B50" : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1.5 5L4 7.5L8.5 2.5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span onClick={onChange}>{label}</span>
    </label>
  );

  const paginationBtn = (label, onClick, active = false, disabled = false) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        background: active ? "#072B50" : "#fff",
        color: active ? "#fff" : disabled ? "#d1d5db" : "#374151",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "13px",
        fontWeight: active ? 700 : 400,
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {sortOpen && (
        <div
          onClick={() => setSortOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
        />
      )}

      {/* HERO BANNER */}
      <div
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/src/assets/hero1.jpg') center/cover",
          minHeight: "320px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* SEARCH BAR - absolute kanan atas */}
        <div style={{ position: "absolute", top: "20px", right: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#D5D7DA",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #D5D7DA",
              backdropFilter: "blur(6px)",
            }}
          >
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{
                padding: "10px 16px",
                border: "none",
                fontSize: "14px",
                width: "220px",
                outline: "none",
                background: "transparent",
                color: "#111827",
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: "10px 14px",
                border: "none",
                background: "transparent",
                color: "#111827",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                outline: "none",
              }}
            >
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* JUDUL & DESKRIPSI - tepat di tengah */}
        <div>
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
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "30px 40px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "24px",
        }}
      >
        {/* SIDEBAR FILTER */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            height: "fit-content",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 20px 0",
            }}
          >
            Filter Options
          </h3>

          <FilterSection title="Category">
            {categories.map((cat) =>
              checkboxLabel(cat, selectedCategories.includes(cat), () =>
                toggleItem(selectedCategories, setSelectedCategories, cat),
              ),
            )}
          </FilterSection>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          <FilterSection title="Brand">
            {brands.map((brand) =>
              checkboxLabel(brand, selectedBrands.includes(brand), () =>
                toggleItem(selectedBrands, setSelectedBrands, brand),
              ),
            )}
          </FilterSection>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          <FilterSection title="Diskon">
            {discounts.map((d) =>
              checkboxLabel(d, selectedDiscounts.includes(d), () =>
                toggleItem(selectedDiscounts, setSelectedDiscounts, d),
              ),
            )}
          </FilterSection>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          <FilterSection title="Harga">
            <div
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "8px",
              }}
            >
              Rp 4.000.069 - {formatPrice(priceRange)}
            </div>
            <input
              type="range"
              min={4000069}
              max={20000000}
              value={priceRange}
              onChange={(e) => {
                setPriceRange(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: "100%", accentColor: "#072B50" }}
            />
          </FilterSection>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #f3f4f6",
              margin: "0 0 20px 0",
            }}
          />

          <FilterSection title="Status Produk">
            {["Tersedia", "Tidak Tersedia"].map((status) =>
              checkboxLabel(status, selectedStatus.includes(status), () =>
                toggleItem(selectedStatus, setSelectedStatus, status),
              ),
            )}
          </FilterSection>
        </div>

        {/* PRODUK GRID */}
        <div>
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
                Showing{" "}
                {filteredProducts.length === 0
                  ? 0
                  : (currentPage - 1) * productsPerPage + 1}
                –
                {Math.min(
                  currentPage * productsPerPage,
                  filteredProducts.length,
                )}{" "}
                of {filteredProducts.length} results
                {searchQuery && (
                  <span style={{ color: "#6b7280" }}>
                    {" "}
                    untuk &quot;<strong>{searchQuery}</strong>&quot;
                  </span>
                )}
              </p>
              {hasActiveFilters && (
                <span
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setSelectedDiscounts([]);
                    setSelectedStatus([]);
                    setSearchQuery("");
                    setSearchInput("");
                    setPriceRange(20000000);
                    setCurrentPage(1);
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
              )}
            </div>

            {/* SORT DROPDOWN */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                position: "relative",
              }}
            >
              <span style={{ fontSize: "13px", color: "#6b7280" }}>
                Sort By:
              </span>
              <div
                onClick={() => setSortOpen(!sortOpen)}
                style={{
                  padding: "7px 36px 7px 12px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                  color: "#374151",
                  cursor: "pointer",
                  background: "#fff",
                  userSelect: "none",
                  position: "relative",
                  minWidth: "150px",
                  boxShadow: sortOpen ? "0 0 0 2px #bfdbfe" : "none",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {sortBy}
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: `translateY(-50%) rotate(${sortOpen ? 180 : 0}deg)`,
                    transition: "transform 0.2s ease",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ChevronDown size={14} />
                </span>
              </div>
              {sortOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    zIndex: 100,
                    background: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                    minWidth: "160px",
                  }}
                >
                  {[
                    "Terbaru",
                    "Harga Terendah",
                    "Harga Tertinggi",
                    "Rating",
                  ].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSortOpen(false);
                      }}
                      style={{
                        padding: "10px 14px",
                        fontSize: "13px",
                        cursor: "pointer",
                        color: sortBy === opt ? "#fff" : "#374151",
                        background: sortBy === opt ? "#072B50" : "#fff",
                        fontWeight: sortBy === opt ? 600 : 400,
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (sortBy !== opt)
                          e.currentTarget.style.background = "#f3f4f6";
                      }}
                      onMouseLeave={(e) => {
                        if (sortBy !== opt)
                          e.currentTarget.style.background = "#fff";
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GRID - 5 kolom */}
          {currentProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "#9ca3af",
                fontSize: "15px",
              }}
            >
              Produk tidak ditemukan.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "14px",
              }}
            >
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    category: product.category,
                    name: product.name,
                    spec: product.spec,
                    price: formatPrice(product.price),
                    rating: product.rating,
                    image: product.image,
                    badge: product.badge ?? undefined,
                  }}
                  saved={saved[index]}
                  onCategoryClick={() => {
                    toggleItem(
                      selectedCategories,
                      setSelectedCategories,
                      product.category,
                    );
                    setCurrentPage(1);
                  }}
                  compact
                  onToggleSave={() =>
                    setSaved((prev) => {
                      const u = [...prev];
                      u[index] = !u[index];
                      return u;
                    })
                  }
                />
              ))}
            </div>
          )}

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
            {paginationBtn(
              "‹",
              () => setCurrentPage((p) => Math.max(1, p - 1)),
              false,
              currentPage === 1,
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div key={page}>
                {paginationBtn(
                  page,
                  () => setCurrentPage(page),
                  currentPage === page,
                )}
              </div>
            ))}
            {paginationBtn(
              "›",
              () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
              false,
              currentPage === totalPages,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
