import { useRef, useState } from "react";
import produkImg from "../assets/monitor.png";
import ProductCard from "./ProductCard.jsx";

const products = [
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", rating: 4.8, badge: "New", image: produkImg },
];

export default function NewProduct() {
  const scrollRef  = useRef(null);
  const cardsRef   = useRef(null);
  const [saved, setSaved] = useState(products.map(() => false));
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    const target = e.target;
    if (!target.closest(".np-img-wrap")) return;
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const stopDrag = () => { isDragging.current = false; };
  const scrollBy = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 280;
  };

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
                onClick={() => scrollBy(dir)}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl text-gray-600 cursor-pointer transition-all duration-200"
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
            ref={(el) => { scrollRef.current = el; cardsRef.current = el; }}
            className="flex gap-5 overflow-x-auto overflow-y-visible"
            style={{ scrollBehavior: "smooth", cursor: "default", padding: "8px 4px 16px", scrollbarWidth: "none" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {products.map((product, index) => (
              // ── sama persis dengan TopProduct: flex 0 0 220px, minWidth 220 ──
              <div key={index} style={{ flex: "0 0 220px", minWidth: 220 }}>
                <ProductCard
                  product={{ ...product, id: index + 1 }}
                  saved={saved[index]}
                  onToggleSave={() => setSaved(prev => { const u = [...prev]; u[index] = !u[index]; return u; })}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}