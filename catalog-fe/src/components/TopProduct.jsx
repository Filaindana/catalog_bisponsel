import { useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import { useFavorit } from "../context/FavoritContext.jsx";
import api from "../utils/api.js";

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
  const trackRef     = useRef(null);
  const [products, setProducts] = useState([]);
  const isDragging   = useRef(false);
  const startX       = useRef(0);
  const scrollLeftRef = useRef(0);

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
  const move = (d) => { if (trackRef.current) trackRef.current.scrollLeft += d * 280; };

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
          image: p.gambar ? `http://localhost:8000/images/${p.gambar}` : "/fallback.jpg",
          badge: p.adalah_promo ? "Sale" : undefined,
        })));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

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
            onClick={() => move(-1)}
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
            {products.map((product) => (
              <div key={product.id} style={{ flex: "0 0 220px", minWidth: 220 }}>
                <ProductCard
                  product={product}
                  saved={!!savedMap[product.id]}
                  onToggleSave={() => toggleSave(product.id)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => move(1)}
            style={{ ...arrowStyle, right: -18 }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1e40af"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#374151"; }}
          >❯</button>
        </div>

      </div>
    </section>
  );
}
