import { useRef, useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard.jsx";
import { useFavorit } from "../context/FavoritContext.jsx";
import api from "../utils/api.js";

const CARD_W = 240; // 220px card + 20px gap
const AUTO_MS = 3000;

const formatPrice = (price) =>
  "Rp " + Number(price).toLocaleString("id-ID").replace(/,/g, ".");

export default function NewProduct() {
  const { savedMap, toggleSave } = useFavorit();
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* ── infinite advance ── */
  const advance = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;

    if (dir > 0 && el.scrollLeft >= half) {
      // kanan: sudah di copy kedua → jump ke copy pertama
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= half;
    } else if (dir < 0 && el.scrollLeft < CARD_W) {
      // kiri: hampir di posisi 0 → jump ke copy kedua agar bisa scroll mundur
      el.style.scrollBehavior = "auto";
      el.scrollLeft += half;
    }

    requestAnimationFrame(() => {
      el.style.scrollBehavior = "smooth";
      el.scrollLeft += dir * CARD_W;
    });
  }, []);

  /* ── auto-rotate ── */
  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => advance(1), AUTO_MS);
    return () => clearInterval(timer);
  }, [products, advance]);

  /* ── drag ── */
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const stopDrag = () => { isDragging.current = false; };

  /* ── fetch ── */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api("/produk?sort=latest&per_page=8");
        const list = res?.data?.data || [];

        setProducts(list.map((p) => ({
          id: p.id,
          slug: p.slug, 
          name: p.nama,
          category: p.kategori?.nama || "-",
          brand: p.brand,
          spec: p.deskripsi || "-",
          price: formatPrice(p.harga),
          rating: p.rating || 0,

          image:
            Array.isArray(p.images) && p.images.length > 0
              ? `http://127.0.0.1:8000/storage/${p.images[0]}`
              : "/fallback.jpg",

          badge: "New",
        })));
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const looped = [...products, ...products];

  return (
    <section style={{ padding: "50px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 className="section-title" style={{ margin: 0, borderLeft: "5px solid #072B50", paddingLeft: 14 }}>
              Produk Terbaru
            </h2>
            <div style={{ paddingLeft: 19, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
              <span className="np-bounce">⟶</span> Geser untuk melihat lebih banyak
            </div>
          </div>
          <div className="flex gap-2">
            {[["‹", -1], ["›", 1]].map(([icon, dir]) => (
              <button
                key={dir}
                onClick={() => advance(dir)}
                className="flex items-center justify-center w-10 h-10 text-xl text-gray-600 transition-all duration-200 bg-white rounded-full cursor-pointer"
                style={{ border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", padding: 0 }}
                onMouseEnter={e => { e.currentTarget.style.background = "#072B50"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#072B50"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLL TRACK */}
        <div style={{ marginBottom: -8, paddingBottom: 8, overflow: "hidden" }}>
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto overflow-y-visible"
            style={{ scrollBehavior: "smooth", cursor: "default", padding: "8px 4px 16px", scrollbarWidth: "none" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {looped.map((product, i) => (
              <div key={`${product.id}-${i}`} style={{ flex: "0 0 220px", minWidth: 220 }}>
                <ProductCard
                  product={product}
                  saved={!!savedMap[product.id]}
                  onToggleSave={() => toggleSave(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
