import { useRef, useState, useEffect } from "react";
import produkImg from "../assets/monitor.png";
import ProductCard from "./ProductCard.jsx";

const products = [
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 72, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 45, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 88, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 30, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 60, image: produkImg },
  { category: "Komputer (PC)", name: "PC Gaming Pro Ryzen Edition", spec: "Ryzen 7 • RTX 4060 • 16GB RAM • SSD 1TB", price: "Rp 17.499.000", originalPrice: "Rp 20.499.000", discount: 15, rating: 4.8, stock: 55, image: produkImg },
];

function useCountdown(targetSeconds) {
  const [seconds, setSeconds] = useState(targetSeconds);
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(n => String(n).padStart(2, "0"));
}

export default function PromoHariIni() {
  const scrollRef  = useRef(null);
  const [saved, setSaved] = useState(products.map(() => false));
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const [hours, minutes, secs] = useCountdown(6 * 3600 + 16 * 60 + 40);

  const onMouseDown = (e) => {
    const target = e.target;
    if (!target.closest(".ph-img-wrap")) return;
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
          <h2 className="section-title" style={{ margin: 0, borderLeft: "5px solid #072B50", paddingLeft: 14 }}>
            Promo Spesial Hari Ini
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* COUNTDOWN */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#6b7280" }}>End in</span>
              <div className="ph-countdown-box">{hours}</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 2px" }}>:</span>
              <div className="ph-countdown-box">{minutes}</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 2px" }}>:</span>
              <div className="ph-countdown-box">{secs}</div>
            </div>
            {/* ARROWS */}
            <div style={{ display: "flex", gap: 8 }}>
              {[["‹", -1], ["›", 1]].map(([icon, dir]) => (
                <button key={dir} onClick={() => scrollBy(dir)} style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#374151", transition: "all 0.2s ease", padding: 0 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#072B50"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#072B50"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
                >{icon}</button>
              ))}
            </div>
          </div>
        </div>

        {/* SCROLL TRACK — margin-bottom trick agar hover shadow tidak terpotong */}
        <div style={{ marginBottom: -8, paddingBottom: 8, overflow: "hidden" }}>
          <div
            ref={scrollRef}
            style={{ display: "flex", gap: 20, overflowX: "auto", overflowY: "visible", scrollBehavior: "smooth", cursor: "default", padding: "8px 4px 16px", scrollbarWidth: "none" }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
          >
            {products.map((product, index) => (
              <div key={index} style={{ flexShrink: 0 }}>
                <ProductCard
                  product={{ ...product, id: index + 1, badge: undefined }}
                  saved={saved[index]}
                  onToggleSave={() => setSaved(prev => { const u = [...prev]; u[index] = !u[index]; return u; })}
                  variant="promo"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
