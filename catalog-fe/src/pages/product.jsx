import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import productService from "../utils/services/productService.js";
import { useFavorit } from "../context/FavoritContext.jsx";

const categories = [
  "Laptop & Komputer",
  "Smartphone & Tablet",
  "Aksesoris Elektronik",
  "Audio & Headphone",
  "Kamera & Fotografi",
  "Peralatan Rumah",
  "Gaming",
  "Networking",
];
const discounts = ["Diskon"];

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
  const { savedMap, toggleSave } = useFavorit();

  // ── baca query param ?category=xxx dari URL ──
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const cat = searchParams.get("category");
    return cat ? [cat] : [];
  });
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [sortBy, setSortBy] = useState("Terbaru");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(50000000);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await productService.getProducts({
        page: currentPage,
        search: searchQuery,
        sortBy: sortBy,
        categories: selectedCategories.join(","),
        discounts: selectedDiscounts.join(","),
        maxPrice: priceRange < 50000000 ? priceRange : undefined,
      });

      console.log("RES:", res);

      // 🔥 FIX FLEXIBLE RESPONSE
      // const list = res?.products || res?.data || [];
      const list = res?.data?.data || [];
      
      // 🔥 INI YANG KAMU TAMBAH
      console.log("🔥 ALL PRODUCTS:", list);
      console.log("🔥 FIRST PRODUCT:", list?.[0]);

      setProducts(list);
      // setTotalPages(res?.totalPages || 1);
      setTotalPages(res?.data?.last_page || 1);

    } catch (err) {
      console.error(err);
      setProducts([]); // safety fallback
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    searchQuery,
    sortBy,
    selectedCategories,
    selectedDiscounts,
    priceRange,
  ]);

  // ── scroll ke konten saat ada category di URL ──
  useEffect(() => {
    if (searchParams.get("category")) {
      setTimeout(() => {
        document.getElementById("product-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

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
    selectedDiscounts.length > 0 ||
    priceRange !== 50000000,
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
        {/* SEARCH BAR */}
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

        {/* JUDUL */}
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
            Jelajahi koleksi produk dengan informasi dan detail spesifikasi lengkap.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        id="product-content"
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
          <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: "0 0 20px 0" }} />

          <FilterSection title="Diskon">
            {discounts.map((d) =>
              checkboxLabel(d, selectedDiscounts.includes(d), () =>
                toggleItem(selectedDiscounts, setSelectedDiscounts, d),
              ),
            )}
          </FilterSection>
          <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: "0 0 20px 0" }} />

          <FilterSection title="Harga">
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
              Rp 0 – {formatPrice(priceRange)}
            </div>
            <input
              type="range"
              min={0}
              max={50000000}
              step={500000}
              value={priceRange}
              onChange={(e) => {
                setPriceRange(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ width: "100%", accentColor: "#072B50" }}
            />
          </FilterSection>
        </div>

        {/* PRODUK GRID */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: "800px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div>
              <p style={{ fontSize: "14px", color: "#374151", margin: "0 0 4px 0" }}>
                Showing{" "}
                {(products?.length ?? 0) === 0 ? 0 : (currentPage - 1) * 15 + 1}
                –{Math.min(currentPage * 15, products.length)}{" "}
                of {products.length} results
              </p>
              {hasActiveFilters && (
                <span
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedDiscounts([]);
                    setSearchQuery("");
                    setSearchInput("");
                    setPriceRange(50000000);
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
              <span style={{ fontSize: "13px", color: "#6b7280" }}>Sort By:</span>
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
                  {["Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating"].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false); }}
                      style={{
                        padding: "10px 14px",
                        fontSize: "13px",
                        cursor: "pointer",
                        color: sortBy === opt ? "#fff" : "#374151",
                        background: sortBy === opt ? "#072B50" : "#fff",
                        fontWeight: sortBy === opt ? 600 : 400,
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => { if (sortBy !== opt) e.currentTarget.style.background = "#f3f4f6"; }}
                      onMouseLeave={(e) => { if (sortBy !== opt) e.currentTarget.style.background = "#fff"; }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GRID */}
          {isFirstLoad && loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: "15px" }}>
              Memuat produk...
            </div>
          ) : !loading && products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: "15px" }}>
              Produk tidak ditemukan.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "14px",
                opacity: loading ? 0.4 : 1,
                pointerEvents: loading ? "none" : "auto",
                transition: "opacity 0.2s ease",
              }}
            >
              {products.map((product) => (
                <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  slug: product.slug, // 🔥 TAMBAH INI
                  category: product.kategori?.nama || "-",
                  name: product.nama,
                  spec: product.deskripsi || "-",
                  price: formatPrice(product.harga),
                  rating: product.rating || 0,
                  image:
                  Array.isArray(product.images) && product.images.length > 0
                    ? `http://127.0.0.1:8000/storage/${product.images[0]}`
                    : "/fallback.jpg",
                  badge: product.adalah_promo ? "Sale" : undefined,
                }}
                saved={!!savedMap[product.id]}
                compact
                onToggleSave={() => toggleSave(product.id)}
                  />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "auto", paddingTop: "30px" }}>
            {paginationBtn("‹", () => setCurrentPage((p) => Math.max(1, p - 1)), false, currentPage === 1)}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div key={page}>
                {paginationBtn(page, () => setCurrentPage(page), currentPage === page)}
              </div>
            ))}
            {paginationBtn("›", () => setCurrentPage((p) => Math.min(totalPages, p + 1)), false, currentPage === totalPages)}
          </div>
        </div>
      </div>
    </div>
  );
}