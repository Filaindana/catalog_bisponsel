import { useRef, useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard.jsx";
import { useFavorit } from "../context/FavoritContext.jsx";
import api from "../utils/api.js";

const CARD_W = 234; // 220px card + 14px gap
const AUTO_MS = 3000;

const arrowStyle = {
  position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 10,
  width: 36, height: 36, borderRadius: "50%",
  background: "#fff", border: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 15, color: "#374151", padding: 0, transition: "all 0.2s ease",
};

const formatPrice = (price) =>
  "Rp " + Number(price).toLocaleString("id-ID").replace(/,/g, ".");

export default function TopProduct() {
  const { savedMap, toggleSave } = useFavorit();
  const trackRef      = useRef(null);
  const [products, setProducts] = useState([]);
  const isDragging    = useRef(false);
  const startX        = useRef(0);
  const scrollLeftRef = useRef(0);

  /* ── infinite advance ── */
  const advance = useCallback((dir) => {
    const el = trackRef.current;
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
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeftRef.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current) * 1.5;
  };
  const stopDrag = () => { isDragging.current = false; };

  /* ── fetch ── */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api("/produk?sort=rating&per_page=8");
        const list = res?.data?.data || [];
        setProducts(list.map((p) => ({
          id: p.id,
          name: p.nama,
          category: p.kategori?.nama || "-",
          spec: p.deskripsi || "-",
          price: formatPrice(p.harga),
          rating: p.rating || 0,
          image: p.gambar ? `/images/${p.gambar}` : "/fallback.jpg",
          badge: p.adalah_promo ? "Sale" : undefined,
        })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const looped = [...products, ...products];

  return (
    <section style={{ background: "#072B50", padding: "60px 40px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 32 }}>

        {/* KIRI */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <h2 className="section-title" style={{ color: "#fff", margin: "0 0 16px 0", lineHeight: 1.2, textTransform: "uppercase", letterSpacing: "1px" }}>
            Top Product
          </h2>
          <p style={{ fontSize: 14, color: "#93c5fd", margin: 0, lineHeight: 1.7 }}>
            Pilihan produk terbaik dengan kualitas terjamin
          </p>
        </div>

        {/* KANAN */}
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          <button
            onClick={() => advance(-1)}
            style={{ ...arrowStyle, left: -18 }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1e40af"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#374151"; }}
          >❮</button>

          <div
            ref={trackRef}
            style={{ display: "flex", gap: 14, overflowX: "auto", overflowY: "visible", scrollBehavior: "smooth", cursor: "default", padding: "8px 4px 12px", scrollbarWidth: "none" }}
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

          <button
            onClick={() => advance(1)}
            style={{ ...arrowStyle, right: -18 }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1e40af"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#374151"; }}
          >❯</button>
        </div>

      </div>
    </section>
  );
}
